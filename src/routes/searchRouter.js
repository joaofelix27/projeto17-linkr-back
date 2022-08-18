import { Router } from "express";
import getUserData from "../middlewares/getUserData.js";
import { getUserById, searchUser } from "../controllers/searchController.js";

const searchRouter = Router();

searchRouter.get("/user/:id", getUserById);
searchRouter.post("/timeline/user",getUserData, searchUser);

export default searchRouter;
