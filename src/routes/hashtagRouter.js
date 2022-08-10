import { Router } from 'express';
import { createHashtag, getHashtagByName } from '../controllers/hashtagController.js';

const hashtagRouter = Router();

hashtagRouter.post('/hashtags',createHashtag);
hashtagRouter.get('/hashtags/:name',getHashtagByName);

export default hashtagRouter;