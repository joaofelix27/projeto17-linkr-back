import connection from "../dbStrategy/postgres.js";

// export function getHashtag (name) {
//     return connection.query(`SELECT * FROM posts WHERE body LIKE '%#${name}'`)
// }

export function getPostsByHashtag (name) {
    return connection.query(`SELECT p.id,u.username,u.picture,p.link,p.body FROM "hashtagPost" hp JOIN posts p ON hp."postId"=p.id JOIN users u ON p."userId"=u.id WHERE hp."hashtagId"=(SELECT id FROM hashtag WHERE name='${name}');`)
    // SELECT p.* FROM "hashtagPost" hp JOIN posts p ON hp."postId"=p.id WHERE hp."hashtagId"=(SELECT id FROM hashtag WHERE name='${name}'
}
export function getTrendingHashtags () {
    return connection.query (`SELECT id,name, "usedCount" FROM hashtag ORDER BY "usedCount" DESC LIMIT 10;`)
}