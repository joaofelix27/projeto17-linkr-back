import { Router } from "express";
import { followUser,getFollower, getFollowed } from "../controllers/followController.js";
import getUserData from "../middlewares/getUserData.js";

const followRouter = Router();

followRouter.post("/follow", getUserData,followUser);
followRouter.get("/followed/:id", getUserData,getFollower);
followRouter.get("/followed", getUserData,getFollowed);

export default followRouter;
