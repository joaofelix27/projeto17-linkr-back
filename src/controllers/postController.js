import jwt from "jsonwebtoken";
import urlMetadata from "url-metadata";
import { sessionRepository } from "../repositories/authRepositories/sessionRepository.js";
import { postRepository } from "../repositories/postsRepositories/postRepository.js";

export async function createPost(req, res) {
    const { link, body } = req.body;
    const session = res.locals.session;
    try {
        const userId = session.userId;

        const { rows: user } = await postRepository.getUserById(userId);

        if (user.length === 0) return res.status(404).send("User not found");

        await postRepository.insertPost(userId, link, body);
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getAllPostsController(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const { sessionId } = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const { rows: userInfo } = await sessionRepository.searchSession(
            sessionId
        );

        const { rows: posts } = await postRepository.getAllPosts();

        const postsMetadata = await Promise.all(
            posts.map(
                async ({
                    id,
                    username,
                    picture,
                    link,
                    body,
                    userId,
                    likes,
                }) => {
                    const like = parseInt(likes);
                    const metadata = await urlMetadata(link);
                    return {
                        id,
                        username,
                        picture,
                        link,
                        body,
                        userId,
                        like,
                        title: metadata.title,
                        image: metadata.image,
                        description: metadata.description,
                    };
                }
            )
        );

        const resData = {
            postsMetadata,
            userInfo
        }

        res.status(200).send(resData);
    } catch (e) {
        console.log(e);

        res.sendStatus(500);
    }
}

export async function getPostById(req, res) {
    const { id } = req.params;
    try {
        const { rows: posts } = await postRepository.getUserPosts(id);

        const postsMetadata = await Promise.all(
            posts.map(async ({ id, username, picture, link, body }) => {
                const metadata = await urlMetadata(link);
                return {
                    id,
                    username,
                    picture,
                    link,
                    body,
                    title: metadata.title,
                    image: metadata.image,
                    description: metadata.description,
                };
            })
        );

        res.status(200).send(postsMetadata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
