import { Router } from 'express';
import { createPost, getAllPostsController } from '../controllers/postController.js';
import { authValidator } from '../middlewares/authValidator.js';
import { userValidator } from '../middlewares/userValidator.js';
import { postSchema } from '../schemas/postSchema.js';

const postRouter = Router();

postRouter.post("/timeline/create",  createPost);
postRouter.get("/timeline", getAllPostsController); 

export default postRouter;