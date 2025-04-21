import { Router } from 'express';
import { handleTranslateRequest } from '../controllers/translationController';
import { apiKeyMiddleware } from '../middleware/apiKeyMiddleware';

const router = Router();

// Apply API key middleware to all translation routes (or specific ones)
// In this case, we apply it to the /translate route
router.post('/translate', apiKeyMiddleware, handleTranslateRequest);

export default router;