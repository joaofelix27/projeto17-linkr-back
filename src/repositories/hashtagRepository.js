import connection from "../dbStrategy/postgres.js";

// export function getHashtag (name) {
//     return connection.query(`SELECT * FROM posts WHERE body LIKE '%#${name}'`)
// }

export function getHashtag (name) {
    return connection.query(`SELECT p.* FROM "hashtagPost" hp JOIN posts p ON hp."postId"=p.id WHERE hp."hashtagId"=(SELECT id FROM hashtag WHERE name='${name}') ;
    `)
}