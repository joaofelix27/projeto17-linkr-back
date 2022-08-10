import { Router } from 'express';
import { createHashtag, getHashtagById } from '../controllers/hashtagController';

const hashtagRouter = Router();

hashtagRouter.post('/hashtags',createHashtag);
hashtagRouter.get('/hashtags/:name',getHashtagById);

export default hashtagRouter;