import { Request, Response } from 'express';
import Task from '../models/Task';
import redis, { cacheKeyForTask, cacheKeyForUser, clearUserCache } from '../utils/cache';

export const getTasks = async (req: Request, res: Response):Promise<any> => {
  const userId = req.user;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const page = parseInt(req.query.page as string) || 1;
  const cacheKey = `${cacheKeyForUser(userId)}:page:${page}`;

  const cached = await redis.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const limit = 10;
  const skip = (page - 1) * limit;
  const tasks = await Task.find({ userId }).skip(skip).limit(limit);

  await redis.set(cacheKey, JSON.stringify(tasks), 'EX', 300); // 5 min TTL
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response):Promise<any> => {
    console.log("createTask")
  const userId = req.user;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { taskName, description, dueDate } = req.body;

  const task = await Task.create({ userId, taskName, description, dueDate });
  await clearUserCache(userId);

  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  const userId = req.user;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const task = await Task.findOneAndUpdate({ _id: id, userId }, req.body, { new: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  await redis.del(cacheKeyForTask(id));
  await clearUserCache(userId);
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response):Promise<any> => {
  const { id } = req.params;
  const userId = req.user;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const task = await Task.findOneAndDelete({ _id: id, userId });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  await redis.del(cacheKeyForTask(id));
  await clearUserCache(userId);
  res.json({ message: 'Task deleted' });
};

export const clearCache = async (_req: Request, res: Response) => {
  await redis.flushall(); // or selectively clear
  res.json({ message: 'Cache cleared' });
};
