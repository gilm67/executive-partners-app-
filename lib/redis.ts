import { createClient, type RedisClientType } from "redis";

let _client: RedisClientType | null = null;

export async function getRedis(): Promise<RedisClientType> {
  if (_client) return _client;
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("Missing REDIS_URL env");

  _client = createClient({ url });

  _client.on("error", (err) => {
    console.error("Redis error:", err);
  });

  if (!_client.isOpen) {
    await _client.connect();
  }
  return _client;
}
