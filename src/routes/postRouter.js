import { Router } from "express";
import  getUserData  from "../middlewares/getUserData.js";

import {
  createPost,
  deletePost,
  getAllPostsController,
  getPostById,
  putPost,
  getReposts,
  repost,
  checkNewPosts
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

postRouter.post("/timeline/repost/:id",getUserData,repost);
postRouter.get("/timeline/reposts",getUserData,getReposts);
postRouter.post("/timeline/checkPosts", getUserData, checkNewPosts)
postRouter.get("/timeline", getUserData, getAllPostsController);
postRouter.get("/timeline/user/:id", getUserData, getPostById);
postRouter.delete("/timeline/:id", getUserData, deletePost)
postRouter.put("/timeline/:id", getUserData, putPost)

export default postRouter;
