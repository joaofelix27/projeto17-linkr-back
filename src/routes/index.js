import { Router } from "express";
import authRouter from "./authRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import likesRouter from "./likesRouter.js";
import postRouter from "./postRouter.js";
import searchRouter from "./searchRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(searchRouter);
router.use(likesRouter);
router.use(hashtagRouter);

export default router;
