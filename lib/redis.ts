// lib/redis.ts
import { Redis } from "@upstash/redis";

let client: Redis | null = null;

export function getRedis() {
  if (client) return client;
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("Missing REDIS_URL");
  client = new Redis({ url });
  return client;
}
