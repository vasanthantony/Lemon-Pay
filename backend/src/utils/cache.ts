import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: 6379,
  }); // configure if needed

export const cacheKeyForUser = (userId: string) => `tasks:user:${userId}`;
export const cacheKeyForTask = (taskId: string) => `task:${taskId}`;

export const clearUserCache = async (userId: string) => {
  await redis.del(cacheKeyForUser(userId));
};

export default redis;
