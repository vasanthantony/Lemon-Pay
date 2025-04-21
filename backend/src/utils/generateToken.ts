// utils/generateToken.ts
import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: string,  rememberMe: boolean) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: rememberMe ? '7d' : '1h',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 7 days for rememberMe, 1 hour otherwise
  });
};

export default generateToken;
