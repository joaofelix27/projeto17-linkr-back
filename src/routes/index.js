import { Router } from "express";
import authRouter from "./authRouter.js";
import postRouter from "./postRouter.js";
import searchRouter from "./searchRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(searchRouter);

export default router;