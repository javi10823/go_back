import { Router } from 'express';
import { addTextToImageHandler } from '../Handlers/image.handler';
import { verifySecretKey } from '../Middleware/image.middleware';

export const router = Router();

router.get('/text-to-image', verifySecretKey, addTextToImageHandler);
