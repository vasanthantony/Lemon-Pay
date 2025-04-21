import { Request, Response, NextFunction } from 'express';
import verifyToken from '../utils/verifyToken';

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.jwt;

  if (!token) {
     res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded: any = verifyToken(token);
    req.user = decoded.userId; // Attach userId to request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
