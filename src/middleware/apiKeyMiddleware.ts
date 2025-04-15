import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

export default apiKeyMiddleware;
