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
            ($1, $2, $3)
        `,
        [userId, link, body ]
    );
};

export const postRepository = {
    getSessionByToken,
    getUserById,
    insertPost
};