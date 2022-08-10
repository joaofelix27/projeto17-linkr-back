import { Router } from 'express';
import { createPost } from '../controllers/postController.js';
import { authValidator } from '../middlewares/authValidator.js';
import { userValidator } from '../middlewares/userValidator.js';
import { postSchema } from '../schemas/postSchema.js';

const postRouter = Router();

postRouter.post('/post/create',authValidator(postSchema), userValidator, createPost);

export default postRouter;