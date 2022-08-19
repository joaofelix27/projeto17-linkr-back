import {
  postFollowUser,
  postUnfollowUser,
  getFollowerDB,
} from "../repositories/followRepositories/followRepository.js";
import { followRepository } from "../repositories/followRepositories/followRepository.js";

export async function followUser(req, res) {
  const { followedUserId } = req.body;
  const {
    userInfo: { userId },
  } = res.locals;
  try {
    const { rows: ifFollowed } = await getFollowerDB(userId, followedUserId);
    const ifFollowedLength = ifFollowed.length;
    if (ifFollowedLength === 0) {
      await postFollowUser(userId, followedUserId);
    } else {
      await postUnfollowUser(userId, followedUserId);
    }
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function getFollower(req,res) {
  const { id: followedUserId } = req.params;
  const {
    userInfo: { userId },
  } = res.locals;
  try {
    const { rows: ifFollowed } = await getFollowerDB(userId, followedUserId);
    const ifFollowedLength = ifFollowed.length;
    if (ifFollowedLength === 0) {
      res.status(200).send({message:"Follow",userId:userId});
    } else {
        res.status(200).send({message:"Unfollow",userId:userId});
    }
  } catch {
    res.sendStatus(500);
  }
}
export async function getFollowed(req,res) {
  const {
    userInfo: { userId },
  } = res.locals;
  try {
    const { rows:followers } = await followRepository.getFollowers(userId);
      res.status(200).send(followers);
  } catch {
    res.sendStatus(500);
  }
}
