import { commentRepository } from "../repositories/commentsRepository/commentRepository.js";
import { followRepository } from "../repositories/followRepositories/followRepository.js";

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
    const {userId} = res.locals.userInfo;
    try {
        const {rows: comments} = await commentRepository.getComments(postId);
        const {rows: followsList} = await followRepository.getFollowersId(userId);
        const newComments = comments.map(({userIdComment, userIdPost, username, picture, text})=>{
            
            return {
                follow: followsList[0].array.includes(userIdComment),
                isPostAuthor: userIdPost === userIdComment,
                username,
                picture,
                text
        }});
        res.status(200).send(newComments);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}