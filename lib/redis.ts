import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://welcome-warthog-50609.upstash.io",
  token: process.env.REDIS_KEY!,
});
