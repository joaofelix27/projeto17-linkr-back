import { Router } from "express";
import { authValidator } from "../middlewares/authMiddlewares/authValidator.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";
import { signUp, signIn, getUserDataById } from "../controllers/authController.js";
import getUserData from "../middlewares/getUserData.js";

const authRouter = Router();

authRouter.post("/signup", authValidator(signUpSchema), signUp);
authRouter.post("/", authValidator(signInSchema), signIn);
authRouter.get("/data",getUserData, getUserDataById)

export default authRouter;
