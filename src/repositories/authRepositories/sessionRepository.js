import connection from "../../dbStrategy/postgres.js";

async function newSession(userId,token){
    return connection.query(`
    INSERT INTO sessions ("userId",token)
    VALUES ($1,$2)`,[userId,token]);
}

export const sessionRepository = {
    newSession
}