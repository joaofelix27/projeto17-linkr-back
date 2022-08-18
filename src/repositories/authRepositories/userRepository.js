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

async function searchUsers(name,id) {
  return connection.query(`
    SELECT u.id,username,picture, fu."userId" as userId  FROM  users u 
    LEFT JOIN "followedUsers" fu ON u.id=fu."followedUserId" AND  fu."userId"=${id}
    WHERE username ILIKE '%${name}%' ORDER BY userId;
    
    `);
}
//
async function getUserById(id) {
  return connection.query(
    `
    SELECT username FROM users 
    WHERE id = $1`,
    [id]
  );
}

export const userRepository = {
  getUser,
  newUser,
  searchUsers,
  getUserById,
};
