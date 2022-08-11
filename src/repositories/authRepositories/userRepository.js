import connection from "../../dbStrategy/postgres.js";

async function getUser(email) {
    return connection.query(
        `
    SELECT * FROM users 
    WHERE users.email = $1`,
        [email]
    );
}

async function newUser(name, email, password, picture) {
    return connection.query(
        `
    INSERT INTO users (username,email,password,picture)
    VALUES ($1,$2,$3,$4)`,
        [name, email, password, picture]
    );
}

async function searchUsers(name) {
    return connection.query(`
    SELECT id,username,picture FROM users
    WHERE username ILIKE '%${name}%'
    `);
}

export const userRepository = {
    getUser,
    newUser,
    searchUsers,
};
