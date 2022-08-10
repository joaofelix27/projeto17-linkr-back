import { Router } from "express";
import authRouter from "./authRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import timelineRouter from "./timelineRouter.js";
import postRouter from "./postRouter.js";

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(hashtagRouter);
router.use(postRouter);

export default router;