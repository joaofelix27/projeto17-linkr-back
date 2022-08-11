//import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userRepository } from "../repositories/authRepositories/userRepository.js";
import { sessionRepository } from "../repositories/authRepositories/sessionRepository.js";

dotenv.config();

export async function signUp(req, res) {
    const { username, email, password, picture } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    //const cleansedName = stripHtml(username).result;
    //const cleansedEmail = stripHtml(email).result;

    const cleansedName = username;
    const cleansedEmail = email;

    try {
        await userRepository.newUser(
            cleansedName.trim(),
            cleansedEmail.trim(),
            passwordHash,
            picture.trim()
        );

        res.sendStatus(201);
    } catch (error) {
        if (error.constraint === "users_email_key") return res.sendStatus(409);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const { rows: checkUser } = await userRepository.getUser(email);


        if (
            checkUser.length > 0 &&
            bcrypt.compareSync(password, checkUser[0].password)
        ) {
            const { rows: session } = await sessionRepository.newSession(
                checkUser[0].id
            );

            const sessionId = session[0].id;
            const token = jwt.sign({ sessionId }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });


            return res.status(200).send({
                token,
                image: checkUser[0].picture,
                name: checkUser[0].username,
            });
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);

        res.sendStatus(500);
    }
}

export async function getUserData(req, res, next) {
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
        console.log(e, "parei aqui");

        res.sendStatus(500);
    }
}
