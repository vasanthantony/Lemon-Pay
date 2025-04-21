// src/types/express/index.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: string;  // Adding the user property to the Request interface
    }
  }
}
