import { Router } from "express";
import {
    getHashtagByName,
    getTrending,
} from "../controllers/hashtagController.js";
import getUserData from "../middlewares/getUserData.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtags/:name", getUserData, getHashtagByName);
hashtagRouter.get("/trending", getTrending);

export default hashtagRouter;
