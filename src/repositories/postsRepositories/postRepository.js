import connection from "../../dbStrategy/postgres.js";

async function getSessionByToken(token) {
    return connection.query(
        `
            SELECT *
            FROM sessions
            WHERE token = $1
        `,
        [token]
    );
}

async function getUserById(id) {
    return connection.query(
        `
            SELECT * 
            FROM users
            WHERE id = $1
        `,
        [id]
    );
}

async function insertPost(userId, link, body) {
    return connection.query(
        `
            INSERT 
            INTO posts
            ("userId", link, body,"createdAt")
            VALUES
            ($1, $2, $3, NOW()) RETURNING id
        `,
        [userId, link, body]
    );
}

async function getAllPosts() {
    return connection.query(
        `
        SELECT posts."createdAt",COUNT(DISTINCT r.id) as reposts,posts.id, users.username, users.picture, posts.link, posts.body, posts."userId" as "userId", COUNT (DISTINCT likes.id) as likes
        FROM posts
        JOIN users
        ON posts."userId" = users.id
        LEFT JOIN likes
        ON likes."postId" = posts.id
        LEFT JOIN reposts r
        ON r."postId" = posts.id
        GROUP BY ( posts.id, users.username, users.picture, posts.link, posts.body, posts."userId", posts."createdAt")
        ORDER BY id DESC
        LIMIT 20
        `
    );
}

async function getUserPosts(id) {
    return connection.query(
        `
        SELECT COUNT(DISTINCT r.id) as reposts, COUNT(DISTINCT l.id) as likes,p.id, u.username, u.picture, p.link, p.body, p."userId" as "userId" 
        FROM posts p
        JOIN users u
        ON p."userId" = u.id
        LEFT JOIN likes l
        ON l."postId" = p.id
        LEFT JOIN reposts r
        ON r."postId" = p.id
        WHERE p."userId" = $1
        GROUP BY ( p.id, u.username, u.picture, p.link, p.body, p."userId")
        ORDER BY id DESC
        LIMIT 20;
        `,
        [id]
    );
}

function deletingPostQuery(userId, postId) {
    return connection.query(
        `
        DELETE FROM posts 
        WHERE "userId" = $1
        AND id = $2
        `,
        [userId, postId]
    );
}

function putPostQuery(body, userId, postId) {
    return connection.query(
        `
    UPDATE posts 
    SET body = $1
    WHERE "userId" = $2
    AND id = $3
    `,
        [body, userId, postId]
    );
}

async function repost(postId,userId){
    return connection.query(`
    insert into reposts 
    ("postId","userId","createdAt") 
    values ($1,$2,NOW());`,[postId,userId])
}

async function getReposts(userId){
    return connection.query(`
    SELECT p."createdAt",u.id as "userId",r."userId" as "reposterId",userR.username as reposter, COUNT(DISTINCT r.id) as reposts,COUNT(DISTINCT l.id) as likes,u.username,u.picture,p.link,p.body from reposts r
    JOIN posts p ON p.id = r."postId"
    JOIN users u ON u.id = p."userId"
    JOIN users userR ON userR.id = r."userId"
     
    LEFT JOIN likes l ON l."postId" = p.id
    WHERE r."userId" = $1
    GROUP BY u.username,u.picture,p.link,p.body,r."userId",p."createdAt",userR.username,u.id
    `,[userId])
}

export const postRepository = {
    getSessionByToken,
    getUserById,
    insertPost,
    getAllPosts,
    getUserPosts,
    deletingPostQuery,
    putPostQuery,
    getReposts,
    repost
};
