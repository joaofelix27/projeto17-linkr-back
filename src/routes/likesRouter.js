import { Router } from "express";
import { getUserData } from "../controllers/authController.js";
import {
    likePostController,
    likeRemoveController,
    likeGetController,
} from "../controllers/likesController.js";
import { alreadyLiked } from "../middlewares/likesValidator.js";

const likesRouter = Router();

likesRouter.get("/like/:id", getUserData, alreadyLiked, likeGetController);
likesRouter.post("/like/:id", getUserData, alreadyLiked, likePostController);
likesRouter.delete(
    "/like/:id",
    getUserData,
    alreadyLiked,
    likeRemoveController
);

export default likesRouter;
