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
            ("userId", link, body)
            VALUES
            ($1, $2, $3)
        `,
        [userId, link, body]
    );
}

async function getAllPosts() {
    return connection.query(
        `
        SELECT posts.id, users.username, users.picture, posts.link, posts.body, posts."userId" as "userId", COUNT (likes."postId") as likes
        FROM posts
        JOIN users
        ON posts."userId" = users.id
        LEFT JOIN likes
        ON likes."postId" = posts.id
        GROUP BY ( posts.id, users.username, users.picture, posts.link, posts.body, posts."userId")
        ORDER BY id DESC
        LIMIT 20
        `
    );
}

async function getUserPosts(id) {
    return connection.query(
        `
        SELECT p.id,p.link,p.body,u.username,u.picture FROM posts p
        JOIN users u
        ON u.id = $1
        WHERE p."userId" = $1
        ORDER BY id DESC
        LIMIT 20;
        `,
        [id]
    );
}

export const postRepository = {
    getSessionByToken,
    getUserById,
    insertPost,
    getAllPosts,
    getUserPosts,
};
