import { Request, Response, NextFunction } from 'express';
import config from '../utils/config';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey || apiKey !== config.apiKey) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
  }

  next();
};