import express from 'express';

import { getTasks, createTask, updateTask, deleteTask, clearCache } from '../controllers/taskController';
import { protect } from '../middleware/authMiddleware';
import { taskValidationRules } from '../middleware/validateTask';
import { validateRequest } from '../middleware/validateRequest';


const taskRoutes = express.Router();

taskRoutes.use(protect);

taskRoutes.get('/', getTasks);
taskRoutes.post('/', taskValidationRules, validateRequest, createTask);
taskRoutes.put('/:id', taskValidationRules, validateRequest, updateTask);
taskRoutes.delete('/:id', deleteTask);
taskRoutes.post('/clear-cache', clearCache);

export default taskRoutes;
