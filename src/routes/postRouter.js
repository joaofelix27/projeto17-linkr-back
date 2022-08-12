import { Router } from "express";
import  getUserData  from "../middlewares/getUserData.js";
import {
  createPost,
  getAllPostsController,
  getPostById,
} from "../controllers/postController.js";
import { authValidator } from "../middlewares/authMiddlewares/authValidator.js";
import { postSchema } from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.post(
  "/timeline/create",
  authValidator(postSchema),
  getUserData,
  createPost
);
postRouter.get("/timeline", getUserData, getAllPostsController);
postRouter.get("/timeline/user/:id", getPostById);

export default postRouter;
