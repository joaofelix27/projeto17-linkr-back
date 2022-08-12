import jwt from "jsonwebtoken";
import { sessionRepository } from "../repositories/authRepositories/sessionRepository.js";

export default async function getUserData(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const { sessionId } = jwt.verify(token, process.env.JWT_SECRET);

        const { rows: userInfo } = await sessionRepository.searchSession(
            sessionId
        );

        if (userInfo.length !== 1) {
            return res.status(401).send("Token invalid or expired");
        }

        res.locals.userInfo = userInfo[0];

        next();
    } catch (e) {
        console.log(e);

        res.sendStatus(500);
    }
}
