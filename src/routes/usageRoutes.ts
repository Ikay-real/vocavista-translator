import { Router } from 'express';

import { apiKeyMiddleware } from '../middleware/apiKeyMiddleware';
import { getUsageStats } from '../controllers/usageController';

const router = Router();

// Apply API key middleware to the usage route
router.get('/usage', apiKeyMiddleware, getUsageStats);

export default router;