import { commentRepository } from "../repositories/commentsRepository/commentRepository.js";

export async function createComment(req, res) {
    const {userId} = res.locals.userInfo;
    const {postId} = req.params;
    const {text} = req.body
    try {
        await commentRepository.createComment(postId, userId, text);
        res.sendStatus(201);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    };
};

export async function getComments(req, res) {
    const {postId} = req.params;
    try {
        const {rows: comments} = await commentRepository.getComments(postId);

        res.status(200).send(comments);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}