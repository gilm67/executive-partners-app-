// lib/redis.ts
// Hybrid Redis client that supports:
// 1) Vercel KV / Upstash via REST (KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN)
// 2) Fallback to node-redis via REDIS_URL
//
// Exposes a lowercase API compatible with your routes:
//   hgetall, hset, smembers, sadd, get, set, scan
//
// Notes for REST backends:
// - "Hashes" are stored as a JSON string at the key.
//   hset(key, map) => set key => JSON.stringify(map)
//   hgetall(key)   => JSON.parse(get key) || {}
// - Sets: try native /sadd and /smembers; otherwise emulate with JSON under "<name>:__set__".
// - Upstash/Vercel KV REST responses are wrapped as { "result": <value> } — we unwrap on reads.

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

/* ------------------------ Helpers ------------------------ */

function trimSlash(s: string) {
  return s.replace(/\/+$/, "");
}

function hasKV(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function hasUpstashRedisRest(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function hasNodeRedis(): boolean {
  return Boolean(process.env.REDIS_URL);
}

// Unwrap Upstash/Vercel KV REST wrapper.
// If text is JSON like {"result": ...} return String(result) or null.
// Otherwise return the original text (string literal stored by /set).
function unwrapResult(text: string | null): string | null {
  if (!text) return null;
  try {
    const obj = JSON.parse(text);
    if (obj && typeof obj === "object" && "result" in obj) {
      const v = (obj as any).result;
      if (v === null || v === undefined) return null;
      // If the stored value was an object/array, upstream returns it as raw JSON.
      // We return it stringified so callers can JSON.parse as needed.
      return typeof v === "string" ? v : JSON.stringify(v);
    }
  } catch {
    // not JSON, that's fine (plain string path-encoded set)
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

  if (!base || !token) {
    throw new Error("Missing KV/Upstash REST config (URL/TOKEN).");
  }

  // Use Web Fetch (Next.js provides DOM lib types)
  async function restGet(
    path: string,
    init?: RequestInit & { headers?: Record<string, string> }
  ) {
    const res = await fetch(`${base}${path}`, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return res;
  }

  return {
    // Hash emulated as a JSON string at key
    async hgetall(key) {
      const res = await restGet(`/get/${encodeURIComponent(key)}`);
      if (!res.ok) return {};
      const raw = await res.text();
      const val = unwrapResult(raw);
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
      } catch {
        // not JSON — treat as empty hash
      }
      return {};
    },

    async hset(key, map) {
      const payload = JSON.stringify(map);
      // Prefer short path encoding
      let ok = false;
      const res = await restGet(
        `/set/${encodeURIComponent(key)}/${encodeURIComponent(payload)}`,
        { method: "POST" }
      );
      ok = res.ok;
      if (!ok) {
        // Fallback: send body (handles long values)
        const res2 = await restGet(`/set/${encodeURIComponent(key)}`, {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "text/plain" },
        });
        ok = res2.ok;
      }
      if (!ok) throw new Error(`KV hset failed for ${key}`);
      return 1;
    },

    async smembers(key) {
      // Try native SMEMBERS first
      const res = await restGet(`/smembers/${encodeURIComponent(key)}`);
      if (res.ok) {
        // Upstash returns { "result": [...] }
        try {
          const asText = await res.text();
          const unwrapped = unwrapResult(asText);
          if (!unwrapped) return [];
          const parsed = JSON.parse(unwrapped);
          return Array.isArray(parsed) ? parsed.map(String) : [];
        } catch {
          // fall through to emulation
        }
      }

      // Emulated set under "<key>:__set__"
      const alt = await this.get(`${key}:__set__`);
      if (!alt) return [];
      try {
        const parsed = JSON.parse(alt);
        return Array.isArray(parsed) ? parsed.map(String) : [];
      } catch {
        return [];
      }
    },

    async sadd(key, ...members) {
      // Try native SADD one-by-one (simple and reliable)
      if (members.length > 0) {
        let added = 0;
        for (const m of members) {
          const res = await restGet(
            `/sadd/${encodeURIComponent(key)}/${encodeURIComponent(m)}`,
            { method: "POST" }
          );
          if (res.ok) added += 1;
        }
        if (added) return added;
      }

      // Emulated set under "<key>:__set__"
      const curr = await this.get(`${key}:__set__`);
      let arr: string[] = [];
      if (curr) {
        try {
          const parsed = JSON.parse(curr);
          if (Array.isArray(parsed)) arr = parsed.map(String);
        } catch {
          // ignore and reset
        }
      }
      const set = new Set<string>(arr);
      for (const m of members) set.add(String(m));
      await this.set(`${key}:__set__`, JSON.stringify(Array.from(set)));
      return members.length || 1;
    },

    async get(key) {
      const res = await restGet(`/get/${encodeURIComponent(key)}`);
      if (!res.ok) return null;
      const raw = await res.text();
      return unwrapResult(raw);
    },

    async set(key, value) {
      // Try path encoding
      let ok = false;
      const res = await restGet(
        `/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`,
        { method: "POST" }
      );
      ok = res.ok;
      if (!ok) {
        // Fallback to body for long values
        const res2 = await restGet(`/set/${encodeURIComponent(key)}`, {
          method: "POST",
          body: value,
          headers: { "Content-Type": "text/plain" },
        });
        ok = res2.ok;
      }
      if (!ok) throw new Error(`KV set failed for ${key}`);
      return "OK";
    },

    async scan(_cursor, _opts) {
      // Not generically supported by REST; return empty.
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
      const result = (await (client as any).scan(cursor, {
        MATCH: match,
        COUNT: count,
      })) as [string, string[]];
      return result;
    },
  };
}

/* ---------------- Public factory ------------------------- */

export async function getRedis(): Promise<RedisCompat> {
  if (hasKV() || hasUpstashRedisRest()) {
    return restBackend();
  }
  if (hasNodeRedis()) {
    return nodeBackend();
  }
  throw new Error("No Redis/KV configuration found. Set KV_REST_API_* or REDIS_URL.");
}