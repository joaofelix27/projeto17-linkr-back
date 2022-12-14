import { Router } from "express";
import authRouter from "./authRouter.js";

import commentsRouter from "./commentsRouter.js";
import followRouter from "./followRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import likesRouter from "./likesRouter.js";
import postRouter from "./postRouter.js";
import searchRouter from "./searchRouter.js";

const router = Router();

router.use(authRouter);
router.use(hashtagRouter);
router.use(postRouter);
router.use(searchRouter);
router.use(likesRouter);
router.use(hashtagRouter);
router.use(commentsRouter);
router.use(followRouter)


export default router;
