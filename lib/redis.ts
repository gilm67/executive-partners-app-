// lib/redis.ts
import { createClient, type RedisClientType } from "redis";

type RedisCompat = {
  hgetall: (key: string) => Promise<Record<string, string>>;
  hset: (key: string, map: Record<string, string>) => Promise<number>;
  smembers: (key: string) => Promise<string[]>;
  sadd: (key: string, ...members: string[]) => Promise<number>;
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<"OK">;
  scan: (cursor: string, opts?: { match?: string; count?: number }) => Promise<[string, string[]]>;
};

function trimSlash(s: string) {
  return s.replace(/\/+$/, "");
}
function hasKV() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}
function hasUpstashRedisRest() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}
function hasNodeRedis() {
  return Boolean(process.env.REDIS_URL);
}

/* ---------- unwrap Upstash/Vercel KV { "result": ... } ---------- */
function unwrapResult(text: string | null): string | null {
  if (!text) return null;
  try {
    const obj = JSON.parse(text);
    if (obj && typeof obj === "object" && "result" in obj) {
      const v = (obj as any).result;
      if (v === null || v === undefined) return null;
      return typeof v === "string" ? v : JSON.stringify(v);
    }
  } catch {
    // not JSON → raw string already
  }
  return text;
}

/* ---------------- REST client (KV / Upstash) ------------- */
function restBackend(): RedisCompat {
  const base =
    (process.env.KV_REST_API_URL && trimSlash(process.env.KV_REST_API_URL)) ||
    (process.env.UPSTASH_REDIS_REST_URL && trimSlash(process.env.UPSTASH_REDIS_REST_URL));
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
  if (!base || !token) throw new Error("Missing KV/Upstash REST config (URL/TOKEN).");

  async function rest(
    path: string,
    init?: RequestInit & { headers?: Record<string, string> }
  ) {
    return fetch(`${base}${path}`, {
      ...init,
      headers: { ...(init?.headers || {}), Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  }

  // Try UPPERCASE first, then lowercase fallback for each command.
  async function cmd(pathUpper: string, pathLower: string, init?: RequestInit) {
    let r = await rest(pathUpper, init);
    if (r.ok) return r;
    return rest(pathLower, init);
  }

  return {
    // Hash emulated as JSON blob
    async hgetall(key) {
      const r = await cmd(`/GET/${encodeURIComponent(key)}`, `/get/${encodeURIComponent(key)}`);
      if (!r.ok) return {};
      const val = unwrapResult(await r.text());
      if (!val) return {};
      try {
        const obj = JSON.parse(val);
        if (obj && typeof obj === "object") {
          const out: Record<string, string> = {};
          for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
            out[String(k)] = String(v ?? "");
          }
          return out;
        }
      } catch {}
      return {};
    },

    async hset(key, map) {
      const payload = JSON.stringify(map);
      // path-encoded first
      let r = await cmd(
        `/SET/${encodeURIComponent(key)}/${encodeURIComponent(payload)}`,
        `/set/${encodeURIComponent(key)}/${encodeURIComponent(payload)}`,
        { method: "POST" }
      );
      if (!r.ok) {
        // body fallback (long values)
        r = await cmd(
          `/SET/${encodeURIComponent(key)}`,
          `/set/${encodeURIComponent(key)}`,
          { method: "POST", body: payload, headers: { "Content-Type": "text/plain" } }
        );
        if (!r.ok) throw new Error(`KV hset failed for ${key}`);
      }
      return 1;
    },

    async smembers(key) {
      // Native SMEMBERS
      let r = await cmd(
        `/SMEMBERS/${encodeURIComponent(key)}`,
        `/smembers/${encodeURIComponent(key)}`
      );
      if (r.ok) {
        try {
          const unwrapped = unwrapResult(await r.text());
          if (unwrapped) {
            const arr = JSON.parse(unwrapped);
            if (Array.isArray(arr)) return arr.map(String);
          }
        } catch {}
      }
      // Emulated set under "<key>:__set__"
      const alt = await this.get(`${key}:__set__`);
      if (!alt) return [];
      try {
        const arr = JSON.parse(alt);
        return Array.isArray(arr) ? arr.map(String) : [];
      } catch {
        return [];
      }
    },

    async sadd(key, ...members) {
      // Native SADD (one-by-one)
      let added = 0;
      for (const m of members) {
        const r = await cmd(
          `/SADD/${encodeURIComponent(key)}/${encodeURIComponent(m)}`,
          `/sadd/${encodeURIComponent(key)}/${encodeURIComponent(m)}`,
          { method: "POST" }
        );
        if (r.ok) added += 1;
      }
      if (added) return added;

      // Emulation: JSON array under "<key>:__set__"
      const curr = await this.get(`${key}:__set__`);
      let arr: string[] = [];
      if (curr) {
        try {
          const parsed = JSON.parse(curr);
          if (Array.isArray(parsed)) arr = parsed.map(String);
        } catch {/* reset */}
      }
      const set = new Set<string>(arr);
      for (const m of members) set.add(String(m));
      await this.set(`${key}:__set__`, JSON.stringify(Array.from(set)));
      return members.length || 1;
    },

    async get(key) {
      const r = await cmd(`/GET/${encodeURIComponent(key)}`, `/get/${encodeURIComponent(key)}`);
      if (!r.ok) return null;
      return unwrapResult(await r.text());
    },

    async set(key, value) {
      // path-encoded
      let r = await cmd(
        `/SET/${encodeURIComponent(key)}/${encodeURIComponent(value)}`,
        `/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`,
        { method: "POST" }
      );
      if (!r.ok) {
        // body fallback
        r = await cmd(
          `/SET/${encodeURIComponent(key)}`,
          `/set/${encodeURIComponent(key)}`,
          { method: "POST", body: value, headers: { "Content-Type": "text/plain" } }
        );
        if (!r.ok) throw new Error(`KV set failed for ${key}`);
      }
      return "OK";
    },

    async scan(_cursor) {
      return ["0", []];
    },
  };
}

/* ---------------- Node Redis client (REDIS_URL) ---------- */
let nodeClient: RedisClientType | null = null;

async function nodeBackend(): Promise<RedisCompat> {
  if (!nodeClient) {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("Missing REDIS_URL");
    nodeClient = createClient({ url });
    nodeClient.on("error", (err) => console.error("[redis] error", err));
    await nodeClient.connect();
  }

  const client = nodeClient;
  return {
    async hgetall(key) {
      return (await client.hGetAll(key)) as Record<string, string>;
    },
    async hset(key, map) {
      return (await client.hSet(key, map)) as number;
    },
    async smembers(key) {
      return (await client.sMembers(key)) as string[];
    },
    async sadd(key, ...members) {
      return (await client.sAdd(key, members)) as number;
    },
    async get(key) {
      return client.get(key);
    },
    async set(key, value) {
      const res = await client.set(key, value);
      return (res ?? "OK") as "OK";
    },
    async scan(cursor, opts) {
      const { match, count } = opts || {};
      const result = (await (client as any).scan(cursor, { MATCH: match, COUNT: count })) as [
        string,
        string[]
      ];
      return result;
    },
  };
}

/* ---------------- Public factory ------------------------- */
export async function getRedis(): Promise<RedisCompat> {
  if (hasKV() || hasUpstashRedisRest()) return restBackend();
  if (hasNodeRedis()) return nodeBackend();
  throw new Error("No Redis/KV configuration found. Set KV_REST_API_* or REDIS_URL.");
}