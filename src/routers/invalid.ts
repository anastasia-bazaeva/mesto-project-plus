import { Router } from 'express';
import invalidUrlHandler from '../controllers/invalid';

const invalidUrl = Router();

invalidUrl.all('/', invalidUrlHandler);
export default invalidUrl;
