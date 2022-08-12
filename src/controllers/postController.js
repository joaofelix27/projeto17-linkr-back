import urlMetadata from "url-metadata";
import { sessionRepository } from "../repositories/authRepositories/sessionRepository.js";
import { postRepository } from "../repositories/postsRepositories/postRepository.js";
import {
  insertHashtag,
  insertHashtagPosts,
  matchHashtag,
  updateHashtag,
} from "../repositories/hashtagRepositories/hashtagRepository.js";


export async function createPost(req, res) {
  const { link, body, hashtags } = req.body;
  const session = res.locals.userInfo;
  try {
    const userId = session.userId;

    const { rows: user } = await postRepository.getUserById(userId);

    if (user.length === 0) return res.status(404).send("User not found");

    const { rows: post } = await postRepository.insertPost(userId, link, body);

    const postId = post[0]?.id;
    
    if (hashtags.length !== 0) {
      
      await Promise.all(
        hashtags.map(async (value) => {
          const withoutHash = value.replace("#", "");
          const { rows: hashtagExists } = await matchHashtag(withoutHash);
          const hashtagExistsLength = hashtagExists.length;
          const hashtagId = hashtagExists[0]?.id;
          if (hashtagExistsLength === 0) {
            const { rows: newHashtag } = await insertHashtag(withoutHash);
            const newHashtagId = newHashtag[0]?.id;
            await insertHashtagPosts(postId, newHashtagId);
          } else {
            await updateHashtag(hashtagExists[0]?.usedCount, withoutHash);
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
  try {
    const { userInfo } = res.locals;
    const { rows: posts } = await postRepository.getAllPosts();

    const postsMetadata = await Promise.all(
      posts.map(async ({ id, username, picture, link, body, userId, likes }) => {
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
      })
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


