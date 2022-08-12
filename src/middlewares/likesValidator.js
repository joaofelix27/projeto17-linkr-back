import { searchAlreadyLiked } from "../repositories/likesRepositories.js/likesRepository.js";

/* verifica se o usuario já curtiu, por segurança */
export async function alreadyLiked(req, res, next) {
    const { id: postId } = req.params;
    const { userInfo } = res.locals;

    try {
        const { rows: like } = await searchAlreadyLiked(
            userInfo.userId,
            postId
        );

        if (req.route?.methods?.post === true) {
            if (like.length !== 0) {
                return res
                    .status(404)
                    .send("This post has already been liked by the user");
            }

            next();
        } else if (req.route?.methods?.delete === true) {
            if (like.length !== 1) {
                return res
                    .status(404)
                    .send("It's not possible to delete a non-existent like");
            }

            next();
        } else if (req.route?.methods?.get === true) {
            if (like.length === 1) {
                res.locals.isLiked = true;
            } else {
                res.locals.isLiked = false;
            }

            next();
        }
    } catch (e) {
        console.log(e);

        return res.sendStatus(500);
    }
}
