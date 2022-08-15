import { tooltipGenerator } from "../middlewares/likesValidator.js";
import {
    postLike,
    removeLike,
    getLikes,
} from "../repositories/likesRepositories.js/likesRepository.js";

export async function likeGetController(req, res) {
    const { id: postId } = req.params;
    const { userId } = res.locals.userInfo;
    const { isLiked } = res.locals;

    try {
        const { rows: likes } = await getLikes(postId);

        const tooltip = tooltipGenerator(likes, isLiked, userId)

        const resData = {
            likes,
            isLiked,
            userId,
            tooltip
        };

        return res.status(200).send(resData);
    } catch (e) {
        console.log(e);

        return res.status(500).send("Error querying likes in database");
    }
}

export async function likePostController(req, res) {
    const { userInfo } = res.locals;
    const { id: postId } = req.params;

    try {
        await postLike(userInfo.userId, postId);

        res.status(200).send();
    } catch (e) {
        console.log(e);

        res.status(500).send("Error into inserting like in database");
    }
}

export async function likeRemoveController(req, res) {
    const { userInfo } = res.locals;
    const { id: postId } = req.params;

    try {
        await removeLike(userInfo.userId, postId);

        res.status(200).send();
    } catch (e) {
        console.log(e);

        res.status(500).send("Error into inserting like in database");
    }
}
