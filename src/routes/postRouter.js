import { Router } from 'express';
import { createPost, getAllPostsController,getPostById} from '../controllers/postController.js';
import { authValidator } from '../middlewares/authMiddlewares/authValidator.js';
import { userValidator } from '../middlewares/userValidator.js';
import { postSchema } from '../schemas/postSchema.js';

const postRouter = Router();

postRouter.post("/timeline/create", authValidator(postSchema), userValidator, createPost);
postRouter.get("/timeline", getAllPostsController); 
postRouter.get("/timeline/user/:id", getPostById); 

export default postRouter;