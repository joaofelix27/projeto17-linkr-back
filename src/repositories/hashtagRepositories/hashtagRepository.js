import connection from "../../dbStrategy/postgres.js";

// export function getHashtag (name) {
//     return connection.query(`SELECT * FROM posts WHERE body LIKE '%#${name}'`)
//

//COLOCAR BIND PARAMS

export function getPostsByHashtag(name) {
  return connection.query(
    `SELECT p.*,u.username,u.picture FROM "hashtagPost" hp JOIN posts p ON hp."postId"=p.id JOIN users u ON p."userId"=u.id WHERE hp."hashtagId"=(SELECT id FROM hashtag WHERE name='${name}');`
  );
  // SELECT p.* FROM "hashtagPost" hp JOIN posts p ON hp."postId"=p.id WHERE hp."hashtagId"=(SELECT id FROM hashtag WHERE name='${name}'
}
export function getTrendingHashtags() {
  return connection.query(
    `SELECT id,name, "usedCount" FROM hashtag ORDER BY "usedCount" DESC LIMIT 10;`
  );
}

export function matchHashtag(name) {
  return connection.query(`SELECT * FROM  hashtag WHERE name='${name}';`);
}
export function insertHashtag(name) {
  return connection.query(
    ` INSERT INTO hashtag (name)
    VALUES ($1) returning id`,
    [name]
  );
}
export function insertHashtagPosts(postId,hashtagId) {
  return connection.query(
    ` INSERT INTO "hashtagPost" ("postId","hashtagId")
    VALUES ($1,$2)`,
    [postId,hashtagId]
  );
}
export function updateHashtag(usedCount,name) {
  return connection.query(
    `UPDATE hashtag SET "usedCount"=$1 WHERE name=$2;`,[usedCount+1,name]
  );
}
