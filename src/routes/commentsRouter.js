import { Router } from "express";
import { createComment, getComments } from "../controllers/commentsController.js";
import { authValidator } from "../middlewares/authMiddlewares/authValidator.js";
import getUserData from "../middlewares/getUserData.js";
import { commentSchema } from "../schemas/commentSchema.js";

const commentsRouter = Router();

commentsRouter.post("/comments/:postId", authValidator(commentSchema), getUserData, createComment);
commentsRouter.get("/comments/:postId",getUserData, getComments);

export default commentsRouter;