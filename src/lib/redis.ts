/**
 * Stub Redis client; replace with real Upstash/Redis later.
 * Implements minimal string, set, and hash ops used by your routes.
 */
export interface RedisLike {
  // string ops
  get(key: string): Promise<string | null>;
  set(key: string, value: string, opts?: any): Promise<"OK">;
  del(key: string): Promise<number>;

  // set ops
  smembers(key: string): Promise<string[]>;
  sadd(key: string, ...members: string[]): Promise<number>;
  srem(key: string, ...members: string[]): Promise<number>;

  // hash ops
  hgetall(key: string): Promise<Record<string, string>>;
  hget(key: string, field: string): Promise<string | null>;
  hset(key: string, field: string, value: string): Promise<number>;
  hset(key: string, map: Record<string, any>): Promise<number>;  // object form
  hmset(key: string, map: Record<string, string>): Promise<"OK">;
}

class RedisStub implements RedisLike {
  private store = new Map<string, string>();
  private sets = new Map<string, Set<string>>();
  private hashes = new Map<string, Map<string, string>>();

  // string ops
  async get(key: string) { return this.store.has(key) ? this.store.get(key)! : null; }
  async set(key: string, value: string, _opts?: any) { this.store.set(key, value); return "OK" as const; }
  async del(key: string) {
    const existed = this.store.delete(key);
    const existedSet = this.sets.delete(key);
    const existedHash = this.hashes.delete(key);
    return (existed ? 1 : 0) + (existedSet ? 1 : 0) + (existedHash ? 1 : 0);
  }

  // set ops
  async smembers(key: string) { const s = this.sets.get(key); return s ? Array.from(s) : []; }
  async sadd(key: string, ...members: string[]) {
    let s = this.sets.get(key); if (!s) { s = new Set(); this.sets.set(key, s); }
    const before = s.size; members.forEach((m) => s!.add(m)); return s.size - before;
  }
  async srem(key: string, ...members: string[]) {
    const s = this.sets.get(key); if (!s) return 0;
    let removed = 0; members.forEach((m) => { if (s!.delete(m)) removed++; });
    if (s.size === 0) this.sets.delete(key); return removed;
  }

  // hash ops
  async hgetall(key: string) {
    const h = this.hashes.get(key); if (!h) return {};
    const out: Record<string, string> = {}; for (const [k, v] of h.entries()) out[k] = v; return out;
  }
  async hget(key: string, field: string) {
    const h = this.hashes.get(key); if (!h) return null;
    return h.has(field) ? h.get(field)! : null;
  }
  // overload impl: field/value OR map object
  async hset(key: string, fieldOrMap: string | Record<string, any>, value?: string) {
    let h = this.hashes.get(key); if (!h) { h = new Map(); this.hashes.set(key, h); }
    let added = 0;

    if (typeof fieldOrMap === "string") {
      const field = fieldOrMap;
      const val = value ?? "";
      if (!h.has(field)) added++;
      h.set(field, String(val));
      return added;
    } else {
      const map = fieldOrMap;
      for (const [k, v] of Object.entries(map)) {
        if (!h.has(k)) added++;
        h.set(k, String(v));
      }
      return added;
    }
  }
  async hmset(key: string, map: Record<string, string>) {
    let h = this.hashes.get(key); if (!h) { h = new Map(); this.hashes.set(key, h); }
    for (const [k, v] of Object.entries(map)) h.set(k, v);
    return "OK" as const;
  }
}

/** Factory (some routes import { getRedis }) */
export async function getRedis(): Promise<RedisLike> { return new RedisStub(); }

/** Default export (some routes import redis from "@/lib/redis") */
const redis: RedisLike = new RedisStub();
export default redis;
