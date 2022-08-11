import { Router } from 'express';
import { getHashtagByName, getTrending } from '../controllers/hashtagController.js';

const hashtagRouter = Router();

hashtagRouter.get('/hashtags/:name',getHashtagByName);
hashtagRouter.get('/trending',getTrending);

export default hashtagRouter;