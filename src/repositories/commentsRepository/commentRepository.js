import connection from "../../dbStrategy/postgres.js";

async function createComment(postId, userId, text) {
    return connection.query(
        `
            INSERT 
            INTO comments
            ("postId", "userId", text)
            VALUES ($1, $2, $3)
        `,
        [postId, userId, text]
    );
};

async function getComments(postId) {
    return connection.query(
        `
            SELECT 
                comments."userId" as "userIdComment", 
                posts."userId" as "userIdPost", 
                users.username, 
                users.picture, 
                comments.text
            FROM comments
            JOIN users
            ON comments."userId" = users.id
            LEFT JOIN posts
            ON comments."postId" = posts.id
            WHERE comments."postId" = $1
        `,
        [postId]
    );
};

export const commentRepository = {
    createComment,
    getComments
};