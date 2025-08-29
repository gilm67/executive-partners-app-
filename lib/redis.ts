// lib/redis.ts
// Node-Redis v4 client with a small compatibility wrapper that exposes
// lowercase methods (hgetall, hset, smembers, sadd, scan, get, set)
// so existing routes keep working without changes.

import { createClient, type RedisClientType } from "redis";

let raw: RedisClientType | null = null;

async function connect(): Promise<RedisClientType> {
  if (raw) return raw;

  const url = process.env.REDIS_URL;
  if (!url) throw new Error("Missing REDIS_URL");

  raw = createClient({ url });

  raw.on("error", (err) => {
    console.error("[redis] error", err);
  });

  await raw.connect();
  return raw;
}

type RedisCompat = {
  hgetall: (key: string) => Promise<Record<string, string>>;
  hset: (key: string, map: Record<string, string>) => Promise<number>;
  smembers: (key: string) => Promise<string[]>;
  sadd: (key: string, ...members: string[]) => Promise<number>;
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<"OK">;
  scan: (
    cursor: string,
    opts?: { match?: string; count?: number }
  ) => Promise<[string, string[]]>;
};

export async function getRedis(): Promise<RedisCompat> {
  const client = await connect();

  return {
    async hgetall(key) {
      // node-redis returns Record<string, string>
      return (await client.hGetAll(key)) as Record<string, string>;
    },
    async hset(key, map) {
      // node-redis accepts Record<string, string | number>
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
      // node-redis returns "OK" | null
      return (res ?? "OK") as "OK";
    },
    async scan(cursor, opts) {
      // node-redis uses uppercase option keys
      const { match, count } = opts || {};
      const result = (await (client as any).scan(cursor, {
        MATCH: match,
        COUNT: count,
      })) as [string, string[]];
      return result;
    },
  };
}