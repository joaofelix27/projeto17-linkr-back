import urlMetadata from "url-metadata";
import dayjs from "dayjs"
import { postRepository } from "../repositories/postsRepositories/postRepository.js";
import {
    insertHashtag,
    insertHashtagPosts,
    matchHashtag
} from "../repositories/hashtagRepositories/hashtagRepository.js";
import { followRepository } from "../repositories/followRepositories/followRepository.js";

export async function createPost(req, res) {
    const { link, body, hashtags } = req.body;
    const session = res.locals.userInfo;
    try {
        const userId = session.userId;

        const { rows: user } = await postRepository.getUserById(userId);

        if (user.length === 0) return res.status(404).send("User not found");

        const { rows: post } = await postRepository.insertPost(
            userId,
            link,
            body
        );

        const postId = post[0]?.id;

        if (hashtags.length !== 0) {
            await Promise.all(
                hashtags.map(async (value) => {
                    const withoutHash = value.replace("#", "");
                    const { rows: hashtagExists } = await matchHashtag(
                        withoutHash
                    );
                    const hashtagExistsLength = hashtagExists.length;
                    const hashtagId = hashtagExists[0]?.id;
                    if (hashtagExistsLength === 0) {
                        const { rows: newHashtag } = await insertHashtag(
                            withoutHash
                        );
                        const newHashtagId = newHashtag[0]?.id;
                        await insertHashtagPosts(postId, newHashtagId);
                    } else {
                        await insertHashtagPosts(postId, hashtagId);
                    }
                })
            );
        }

        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getAllPostsController(req, res) {
    const { page } = req.query
    try {
        const { userInfo } = res.locals;
        const userId = userInfo.userId
        const { rows: posts } = await postRepository.getAllPosts(userId, page);
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
                    comments,
                    reposts,
                    createdAt,
                    isRepost,
                    reposter,
                    reposterId
                }) => {
                    const like = parseInt(likes);
                    const comment = parseInt(comments);
                    const metadata = await urlMetadata(link);
                    return {
                        id,
                        username,
                        picture,
                        link,
                        comment,
                        body,
                        userId,
                        like,
                        reposts,
                        createdAt,
                        isRepost,
                        reposter,
                        reposterId,
                        title: metadata.title,
                        image: metadata.image,
                        description: metadata.description,
                    };
                }
            )
        );
        const resData = {
            postsMetadata,
            userInfo,
        };

        res.status(200).send(resData);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
export async function getPostById(req, res) {
    const { page } = req.query
    const { id } = req.params;
    const { userInfo } = res.locals;
    try {
        const { rows: posts } = await postRepository.getUserPosts(id, page);

        const postsMetadata = await Promise.all(
            posts.map(async ({ id, likes, comments, username, picture, link, body, userId,reposts }) => {
                const like = parseInt(likes);
                const comment = parseInt(comments);
                const metadata = await urlMetadata(link);
                return {
                    id,
                    username,
                    picture,
                    link,
                    body,
                    like,
                    comment,
                    userId,
                    reposts,
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

export async function putPost(req, res) {
    const { id } = req.params;
    const { bodyValue: body, hashtags} = req.body
    const { userInfo } = res.locals;
    const postId = parseInt(id);

    try {
        const { rowCount } = await postRepository.putPostQuery(body,
            userInfo.userId,
            postId
        );

        if (rowCount !== 1) {
            return res.sendStatus(404);
        }

        if (hashtags.length !== 0) {
            await Promise.all(
                hashtags.map(async (value) => {
                    const withoutHash = value.replace("#", "");
                    const { rows: hashtagExists } = await matchHashtag(
                        withoutHash
                    );
                    const hashtagExistsLength = hashtagExists.length;
                    const hashtagId = hashtagExists[0]?.id;
                    if (hashtagExistsLength === 0) {
                        const { rows: newHashtag } = await insertHashtag(
                            withoutHash
                        );
                        const newHashtagId = newHashtag[0]?.id;
                        await insertHashtagPosts(postId, newHashtagId);
                    } else {
                        await insertHashtagPosts(postId, hashtagId);
                    }
                })
            );
        }

 
        res.sendStatus(200);
    } catch (e) {
        console.log(e);

        return res.sendStatus(500);
    }
}

export async function deletePost(req, res) {
    const { id } = req.params;
    const { userInfo } = res.locals;
    const postId = parseInt(id);
    try {
        const { rowCount } = await postRepository.deletingPostQuery(
            userInfo.userId,
            postId
        );

        if (rowCount !== 1) {
            return res.sendStatus(404);
        }

        res.sendStatus(200);
    } catch (e) {
        console.log(e);

        return res.sendStatus(500);
    }
}

export async function repost(req,res){
    const { userInfo } =  res.locals;
    const { id } = req.params;
    const postId = parseInt(id);
    const { userId } = userInfo;
    
    try {
        await postRepository.repost(postId,userId)
        await postRepository.repostCount(postId,userId)

        res.status(200).send('OK')
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export async function getReposts(req,res){
    const { userInfo } =  res.locals;
    const { userId } = userInfo;
    let reposts = [];
    
    try {
        const { rows:followers } = await followRepository.getFollowers(userId);
        const ids = followers.map( e => e.followedUserId)
        for(let i = 0; i < ids.length;i++){
            const { rows:repost } = await postRepository.getReposts(ids[i]);
            reposts = [...reposts,...repost]
        }

        const RepostsMetadata = await Promise.all(
            reposts.map(async ({ id, likes, comments, username, picture, link, body, userId,postId,reposts,reposter,reposterId,createdAt }) => {
                const like = parseInt(likes);
                const comment = parseInt(comments);
                const metadata = await urlMetadata(link);
                return {
                    id,
                    username,
                    picture,
                    link,
                    body,
                    like,
                    comment,
                    userId,
                    postId,
                    reposts,
                    reposter,
                    reposterId,
                    createdAt,
                    title: metadata.title,
                    image: metadata.image,
                    description: metadata.description,
                };
            })
        );

        res.status(200).send(RepostsMetadata)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export async function checkNewPosts (req, res) {
    const {reqTime} = req.body
    let newPost = 0
    const { userInfo } = res.locals;
    const userId = userInfo.userId
    const reqTimeStr = `${reqTime}`
    try{
        const { rows: posts } = await postRepository.getAllPosts(userId, 1);
        posts.map((post) => {

            const isAfter = dayjs(post.createdAt).isAfter(reqTime)
            console.log(isAfter)
            if(isAfter){
                ++newPost
            }
        })

        return res.status(200).send({newPost})
    } catch (e){
        console.log(e)
        return res.sendStatus(500);
    }
    

}
