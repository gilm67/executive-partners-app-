// lib/redis.ts
// Hybrid Redis client that supports:
// 1) Vercel KV / Upstash via REST (KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN)
// 2) Fallback to node-redis via REDIS_URL
//
// Exposes a lowercase API compatible with your routes:
//   hgetall, hset, smembers, sadd, get, set, scan
//
// Implementation notes:
// - For the REST backends we store "hashes" as a JSON string at the key.
//   hset(key, map) => set key => JSON.stringify(map)
//   hgetall(key)   => JSON.parse(get key) || {}
// - Sets use REST endpoints /sadd and /smembers when available; if not, we emulate with JSON under key "<name>:__set__".
// - scan is a no-op on REST (returns ["0", []]) unless you later add an index to iterate.

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

/* ---------------- REST client (KV / Upstash) ------------- */

function restBackend(): RedisCompat {
  // Prefer Vercel KV first; else Upstash Redis REST
  const base =
    (process.env.KV_REST_API_URL && trimSlash(process.env.KV_REST_API_URL)) ||
    (process.env.UPSTASH_REDIS_REST_URL && trimSlash(process.env.UPSTASH_REDIS_REST_URL));

  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

  if (!base || !token) {
    throw new Error("Missing KV/Upstash REST config (URL/TOKEN).");
  }

  // Use the built-in Web Fetch types (Next.js supplies DOM lib)
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

  // Emulate hash via JSON
  return {
    async hgetall(key) {
      const res = await restGet(`/get/${encodeURIComponent(key)}`);
      if (!res.ok) return {};
      const text = await res.text();
      if (!text) return {};
      try {
        const obj = JSON.parse(text);
        if (obj && typeof obj === "object") {
          const out: Record<string, string> = {};
          for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
            out[String(k)] = String(v ?? "");
          }
          return out;
        }
        return {};
      } catch {
        return {};
      }
    },

    async hset(key, map) {
      // overwrite whole doc (simpler + safe for your use)
      const payload = JSON.stringify(map);
      // try path-encoded first
      const res = await restGet(
        `/set/${encodeURIComponent(key)}/${encodeURIComponent(payload)}`,
        { method: "POST" }
      );
      if (!res.ok) {
        // attempt body POST for long values
        const res2 = await restGet(`/set/${encodeURIComponent(key)}`, {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "text/plain" },
        });
        if (!res2.ok) throw new Error(`KV hset failed for ${key}`);
      }
      return 1;
    },

    async smembers(key) {
      // Prefer native SMEMBERS when supported
      const res = await restGet(`/smembers/${encodeURIComponent(key)}`);
      if (res.ok) {
        try {
          const arr = await res.json();
          return Array.isArray(arr) ? arr.map(String) : [];
        } catch {
          // fall through to emulation
        }
      }
      // Fallback: emulate set via JSON array under "<key>:__set__"
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
      // Try native SADD
      if (members.length === 1) {
        const res = await restGet(
          `/sadd/${encodeURIComponent(key)}/${encodeURIComponent(members[0])}`,
          { method: "POST" }
        );
        if (res.ok) return 1;
      } else if (members.length > 1) {
        // No multi-member endpoint via simple path; loop
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

      // Fallback: emulate via JSON array under "<key>:__set__"
      const curr = await this.get(`${key}:__set__`);
      let arr: string[] = [];
      if (curr) {
        try {
          const parsed = JSON.parse(curr);
          if (Array.isArray(parsed)) arr = parsed.map(String);
        } catch {
          // ignore corrupt value; reset below
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
      const text = await res.text();
      return text || null;
    },

    async set(key, value) {
      const res = await restGet(
        `/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`,
        { method: "POST" }
      );
      if (!res.ok) {
        // try body POST for long values
        const res2 = await restGet(`/set/${encodeURIComponent(key)}`, {
          method: "POST",
          body: value,
          headers: { "Content-Type": "text/plain" },
        });
        if (!res2.ok) throw new Error(`KV set failed for ${key}`);
      }
      return "OK";
    },

    async scan(_cursor, _opts) {
      // Not supported via REST in a generic way. Return empty.
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
  // Prefer KV REST, then Upstash Redis REST, else node-redis
  if (hasKV() || hasUpstashRedisRest()) {
    return restBackend();
  }
  if (hasNodeRedis()) {
    return nodeBackend();
  }
  throw new Error("No Redis/KV configuration found. Set KV_REST_API_* or REDIS_URL.");
}