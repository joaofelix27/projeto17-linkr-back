import { Router } from "express";
import { searchUser } from "../controllers/searchController.js";

const searchRouter = Router();

searchRouter.post("/timeline/user", searchUser);

export default searchRouter;
