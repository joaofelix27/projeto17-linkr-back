
import { Router } from "express";
import {
    createHashtag,
    getHashtagByName,
    getTrending,
} from "../controllers/hashtagController.js";

const hashtagRouter = Router();

// hashtagRouter.post('/hashtags',createHashtag);

hashtagRouter.get("/hashtags/:name", getHashtagByName);
hashtagRouter.get("/trending", getTrending);
hashtagRouter.post("/hashtags/create", createHashtag);

export default hashtagRouter;

