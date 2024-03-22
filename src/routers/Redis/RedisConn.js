import Redis from "ioredis";
import config from "../../config";

let redis_client;

export async function initRedis() {
  redis_client = new Redis(config.redisPort);
  console.log("redis connected");
}

// await redis_client.disconnect();

export { redis_client };
