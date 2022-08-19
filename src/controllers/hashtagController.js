import {
    getPostsByHashtag,
    getTrendingHashtags,
} from "../repositories/hashtagRepositories/hashtagRepository.js";
import urlMetadata from "url-metadata";

export async function getHashtagByName(req, res) {
    const { page } = req.query;
    const { name } = req.params;
    const { userInfo } = res.locals;

    try {
        const { rows: findHashtag } = await getPostsByHashtag(name, page);
        const findHashtagLength = findHashtag.length;
           const postsMetadata = await Promise.all(
                findHashtag.map(async (value) => {
                    const like = parseInt(value.likes);
                    const comment = parseInt(value.comments);
                    const repost = parseInt(value.reposts);
                    delete value.likes;
                    delete value.comments;
                    delete value.reposts;
                    const metadata = await urlMetadata(value.link);
                    return {
                        ...value,
                        title: metadata.title,
                        image: metadata.image,
                        description: metadata.description,
                        like,
                        comment,
                        repost
                    };
                })
            );

        const resData = {
            postsMetadata,
            userInfo,
        };


        return res.status(200).send(resData);
    } catch (e) {
        console.log(e)

        res.status(500).send(e.message);
    }
}
export async function getTrending(req, res) {
    try {
        const { rows: findHashtags } = await getTrendingHashtags();

        return res.status(200).send(findHashtags);
    } catch (e) {
        res.status(500).send(e.message);
    }
}
