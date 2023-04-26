import { invalidUrlHandler } from '../controllers/invalid';
import { Router } from 'express';

export const invalidUrl = Router()

invalidUrl.get('/', invalidUrlHandler);
invalidUrl.post('/', invalidUrlHandler);
invalidUrl.put('/', invalidUrlHandler);
invalidUrl.delete('/', invalidUrlHandler);
invalidUrl.patch('/', invalidUrlHandler);