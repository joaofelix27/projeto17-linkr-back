import { Router } from "express";
import { getUserById, searchUser } from "../controllers/searchController.js";

const searchRouter = Router();

searchRouter.get("/user/:id", getUserById);
searchRouter.post("/timeline/user", searchUser);

export default searchRouter;
