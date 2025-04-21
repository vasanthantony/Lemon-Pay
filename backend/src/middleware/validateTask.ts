import { body } from 'express-validator';

export const taskValidationRules = [
  body('taskName').notEmpty().withMessage('Task name is required'),
  body('dueDate').isISO8601().toDate().withMessage('Valid due date required'),
];
