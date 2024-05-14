import { Router } from 'express';
import { addTextToImageHandler } from '../Handlers/image.handler';
import { verifySecretKey } from '../Middleware/image.middleware';

export const router = Router();

router.post('/text-to-image', verifySecretKey, addTextToImageHandler);
