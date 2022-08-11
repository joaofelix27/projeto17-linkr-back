import connection from "../dbStrategy/postgres.js";

async function getSessionByToken(token) {
    return connection.query(
        `
            SELECT *
            FROM sessions
            WHERE token = $1
        `,
        [token]
    );
};

async function getUserById(id) {
    return connection.query(
        `
            SELECT * 
            FROM users
            WHERE id = $1
        `,
        [id]
    );
};

async function insertPost(userId, link, body){
    return connection.query(
        `
            INSERT 
            INTO posts
            ("userId", link, body)
            VALUES
            ($1, $2, $3) RETURNING id
        `,
        [userId, link, body ]
    );
};

async function getAllPosts(){
    return connection.query(
        `
            SELECT posts.id, users.username, users.picture, posts.link, posts.body
            FROM posts
            JOIN users
            ON posts."userId" = users.id
            ORDER BY id DESC
            LIMIT 20
        `
    );
}

export const postRepository = {
    getSessionByToken,
    getUserById,
    insertPost,
    getAllPosts
};