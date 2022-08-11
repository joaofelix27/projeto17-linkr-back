import urlMetadata from "url-metadata";
import { insertHashtag, insertHashtagPosts, matchHashtag, updateHashtag } from "../repositories/hashtagRepository.js";

import { postRepository } from "../repositories/postRepository.js";

export async function createPost(req, res) {
  const { link, body, hashtags } = req.body;
  const session = res.locals.session;
  try {
    // const userId = session.userId;

    // const { rows: user } = await postRepository.getUserById(userId);

    // if (user.length === 0) return res.status(404).send("User not found");

    const {rows:postId} =await postRepository.insertPost(1, link, body);
    const id1=postId[0]?.id
    let hashtagId=0
    if (hashtags.length !== 0) {
      await Promise.all(
        hashtags.map(async (value) => {
          const withoutHash = value.replace("#", "");
          const { rows: hashtagExists } = await matchHashtag(withoutHash);
          const hashtagExistsLength = hashtagExists.length;
          hashtagId=hashtagExists?.id
          if (hashtagExistsLength === 0) {
          const {rows:hashtag2} = await insertHashtag(withoutHash);
          hashtagId=hashtag2[0]?.id
        
          } else {
            await updateHashtag(hashtagExists[0]?.usedCount,withoutHash);
          }
          await insertHashtagPosts(id1,hashtagId);
        })
      );
    }

    res.sendStatus(201);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
}

export async function getAllPostsController(req, res) {
  try {
    const { rows: posts } = await postRepository.getAllPosts();

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
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
