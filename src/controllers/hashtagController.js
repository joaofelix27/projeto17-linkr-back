import {
    getPostsByHashtag,
    getTrendingHashtags,
} from "../repositories/hashtagRepositories/hashtagRepository.js";
import urlMetadata from "url-metadata";

export async function getHashtagByName(req, res) {
    const { name } = req.params;
    const { userInfo } = res.locals;
    try {
        const { rows: findHashtag } = await getPostsByHashtag(name);

        const findHashtagLength = findHashtag.length;
        if (findHashtagLength > 0) {
            const postsMetadata = await Promise.all(
                findHashtag.map(async (value) => {
                    const like = parseInt(value.likes);
                    delete value.likes
                    const metadata = await urlMetadata(value.link);
                    return {
                        ...value,
                        title: metadata.title,
                        image: metadata.image,
                        description: metadata.description,
                        like
                    };
                })
            );

            const resData = {
                postsMetadata,
                userInfo,
            };

            return res.status(200).send(resData);
        } else {
            return res.sendStatus(404);
        }
    } catch (e) {
        res.status(500).send(e.message), "aq";
    }
}
export async function getTrending(req, res) {
    try {
        const { rows: findHashtags } = await getTrendingHashtags();
        const findHashtagsLength = findHashtags.length;
        if (findHashtagsLength > 0) {
            return res.status(200).send(findHashtags);
        } else {
            return res.sendStatus(404);
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
}
