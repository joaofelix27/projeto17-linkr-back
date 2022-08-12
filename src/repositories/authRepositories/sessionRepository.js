import connection from "../../dbStrategy/postgres.js";

async function newSession(userId) {
    return connection.query(
        `
    INSERT INTO sessions ("userId")
    VALUES ($1) RETURNING id`,
        [userId]
    );
}

async function searchSession(sessionId) {
    return connection.query(
        `
            SELECT picture, username, "userId" 
            FROM sessions s 
            JOIN users 
            ON users.id = "userId" 
            WHERE s.id = $1
        `,
        [sessionId]
    );
}

export const sessionRepository = {
    newSession,
    searchSession,
};
