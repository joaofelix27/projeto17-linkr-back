
import {
    getPostsByHashtag,
    getTrendingHashtags,
    insertHashtag,
    matchHashtag,
} from "../repositories/hashtagRepositories/hashtagRepository.js";
import urlMetadata from "url-metadata";

export async function getHashtagByName(req, res) {
    const { name } = req.params;
    try {
        const { rows: findHashtag } = await getPostsByHashtag(name);
        const findHashtagLength = findHashtag.length;
        if (findHashtagLength > 0) {
            const postsMetadata = await Promise.all(
                findHashtag.map(async (value) => {
                    const metadata = await urlMetadata(value.link);
                    return {
                        ...value,
                        title: metadata.title,
                        image: metadata.image,
                        description: metadata.description,
                    };
                })
            );
            return res.status(200).send(postsMetadata);
        } else {
            return res.sendStatus(404);
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
}
export async function createHashtag(req, res) {
    const { hashtags } = req.body;
    let created = false;
    try {
        await Promise.all(
            hashtags.map(async (value) => {
                const withoutHash = value.replace("#", "");
                const { rows: hashtagExists } = await matchHashtag(withoutHash);
                const hashtagExistsLength = hashtagExists.length;
                if (hashtagExistsLength === 0) {
                    created = true;
                    await insertHashtag(withoutHash);
                }
            })
        );
        if (created) {
            return res.sendStatus(201);
        } else {
            return res.sendStatus(404);
        }
    } catch (e) {
        res.status(500).send(e.message);
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