import connection from "../../dbStrategy/postgres.js";

export function getPostsByHashtag(name, page) {
    const offset = --page * 10;
    return connection.query(
        `SELECT 
            p.id,
            u.username,
            u.picture,
            p.link,
            p.body,
            p."userId" as "userId",
            COUNT (likes."postId") as likes,
            COUNT (DISTINCT comments.id) as comments,
            COUNT (DISTINCT reposts.id) as reposts
        FROM "hashtagPost" hp 
        JOIN posts p 
        ON hp."postId"=p.id 
        JOIN users u 
        ON p."userId"=u.id 
        LEFT JOIN likes
        ON likes."postId" = hp."postId"
        LEFT JOIN comments
        ON comments."postId" = hp."postId" 
        LEFT JOIN reposts 
        ON reposts."postId" = hp."postId" 
        WHERE hp."hashtagId"=(SELECT id FROM hashtag WHERE name=$1)
        GROUP BY ( p.id, u.username, u.picture, p.link, p.body)
        ORDER BY id DESC
        LIMIT 10
        OFFSET $2
        ;`,
        [name, offset]
    );
}
export function getTrendingHashtags() {
    return connection.query(
        `SELECT h.id,h.name,COUNT(hp.id) as "usedCount" from "hashtagPost" hp JOIN hashtag h ON hp."hashtagId"=h.id GROUP BY h.id ORDER BY "usedCount" DESC LIMIT 10;`
    );
}

export function matchHashtag(name) {
    return connection.query(`SELECT * FROM  hashtag WHERE name=$1;`, [name]);
}
export function insertHashtag(name) {
    return connection.query(
        ` INSERT INTO hashtag (name)
    VALUES ($1) returning id`,
        [name]
    );
}
export function insertHashtagPosts(postId, hashtagId) {
    return connection.query(
        ` INSERT INTO "hashtagPost" ("postId","hashtagId")
    VALUES ($1,$2)`,
        [postId, hashtagId]
    );
}
