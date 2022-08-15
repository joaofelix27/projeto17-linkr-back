import connection from "../../dbStrategy/postgres.js";

function getLikes(postId) {
    return connection.query(
        `SELECT username, "userId" FROM likes JOIN users u ON "userId" = u.id WHERE "postId" = $1`, [postId]
    );
}

function postLike(userId, postId) {
    return connection.query(
        `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`,
        [userId, postId]
    );
}

function searchAlreadyLiked(userId, postId) {
    return connection.query(
        `SELECT * FROM likes WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]
    );
}

function removeLike(userId, postId) {
    return connection.query(
        `DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]
    );
}
export { getLikes, postLike, searchAlreadyLiked, removeLike };
