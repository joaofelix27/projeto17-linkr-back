import connection from "../../dbStrategy/postgres.js";

export function postFollowUser (userId,followedUserId){
    return connection.query(`INSERT INTO "followedUsers" ("userId","followedUserId") VALUES ($1,$2) `,[userId,followedUserId])
}
export function postUnfollowUser (userId,followedUserId){
    return connection.query(`DELETE FROM "followedUsers" WHERE "userId"=$1 AND "followedUserId"=$2 `,[userId,followedUserId])
}

export function getFollowerDB (userId,followedUserId){
    return connection.query(`SELECT * FROM "followedUsers" WHERE "userId"=$1 AND "followedUserId"=$2 `,[userId,followedUserId])
}