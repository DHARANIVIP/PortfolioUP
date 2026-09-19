import crypto from "crypto";
import { Redis } from "@upstash/redis";

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

// In-memory sliding window cache for local development
const memoryStore = new Map<string, { count: number; resetAt: number }>();

// Periodic cleanup of expired memory entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    memoryStore.forEach((value, key) => {
      if (now > value.resetAt) {
        memoryStore.delete(key);
      }
    });
  }, 5 * 60 * 1000).unref?.();
}

function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      return new Redis({ url, token });
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Hash IP address for privacy — never store or log raw IPs
 */
export function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip + "dharani_salt").digest("hex").slice(0, 16);
}

/**
 * Extract client IP from incoming request headers
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (ip) return ip;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  return "127.0.0.1";
}

/**
 * Rate limit check per key (IP hash + action)
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const redis = getRedisClient();
  const now = Date.now();

  if (redis) {
    try {
      const redisKey = `rl:${key}`;
      const count = await redis.incr(redisKey);
      if (count === 1) {
        await redis.expire(redisKey, windowSeconds);
      }
      const ttl = await redis.ttl(redisKey);
      return {
        success: count <= limit,
        remaining: Math.max(0, limit - count),
        reset: now + (ttl > 0 ? ttl * 1000 : windowSeconds * 1000),
      };
    } catch (err) {
      console.warn("Upstash Redis error, falling back to memory:", err);
    }
  }

  // Memory fallback
  const existing = memoryStore.get(key);
  if (!existing || now > existing.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return {
      success: true,
      remaining: limit - 1,
      reset: now + windowSeconds * 1000,
    };
  }

  existing.count += 1;
  const success = existing.count <= limit;
  return {
    success,
    remaining: Math.max(0, limit - existing.count),
    reset: existing.resetAt,
  };
}

/**
 * Check global daily request cap for Ask Dharani
 */
export async function checkGlobalDailyCap(dailyCap = 250): Promise<{ success: boolean; count: number }> {
  const today = new Date().toISOString().slice(0, 10);
  const key = `global:daily:ask:${today}`;
  const redis = getRedisClient();

  if (redis) {
    try {
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, 86400); // 24 hours
      }
      return {
        success: count <= dailyCap,
        count,
      };
    } catch {
      // Fallback
    }
  }

  const existing = memoryStore.get(key);
  const now = Date.now();
  if (!existing || now > existing.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + 86400 * 1000 });
    return { success: true, count: 1 };
  }

  existing.count += 1;
  return {
    success: existing.count <= dailyCap,
    count: existing.count,
  };
}
