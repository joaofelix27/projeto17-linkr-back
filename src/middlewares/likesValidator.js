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

export function tooltipGenerator(likes, isLiked, userId) {
    let tooltip = ``;

    if (likes.length === 0) {
        return tooltip;
    }

    if (isLiked) {
        tooltip = `You`;
    }

    if (likes.length === 1 && isLiked) {
        return tooltip;
    }

    if (likes.length === 2 && isLiked && likes[1].userId !== userId) {
        return (tooltip += ` and ${likes[1].username}`);
    } 
    
    if ( likes.length === 2 && isLiked && likes[1].userId === userId ){
        return (tooltip += ` and ${likes[0].username}`);
    }

    if (likes.length === 2 && !isLiked) {
        return (tooltip += `${likes[0].username} and ${likes[1].username}`);
    }

    loop: for (let i = 0; i < likes.length; i++) {
        const analisado = likes[i];

        if (i > 1 && isLiked) {
            tooltip += ` and ${likes.length - 2} others like`;
            break;
        } else if (i >= 2) {
            tooltip += ` and ${likes.length - 2} others like`;
            break;
        } else if (
            analisado.userId !== userId &&
            (isLiked || tooltip !== ``) &&
            i < 2
        ) {
            tooltip += `, ${analisado.username}`;
        } else if (analisado.userId !== userId && i < 2) {
            tooltip += `${analisado.username}`;
        }
    }
    return tooltip;
}
