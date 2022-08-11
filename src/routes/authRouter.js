import { Router } from "express";
import { authValidator } from "../middlewares/authMiddlewares/authValidator.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";
import { signUp, signIn } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", authValidator(signUpSchema), signUp);
authRouter.post("/", authValidator(signInSchema), signIn);

export default authRouter;
