import { userRepository } from "../repositories/authRepositories/userRepository.js";

export async function searchUser(req, res) {
    const { name } = req.body;
    try {
        const { rows: users } = await userRepository.searchUsers(name);
        res.status(200).send(users);
    } catch (error) {
        res.sendStatus(500);
    }
};

export async function getUserById(req,res) {
    const {id} = req.params;
    try {
        const {rows: users} = await userRepository.getUserById(id);
        if(users.length === 0) return res.sendStatys(404);
        res.status(200).send(users[0]);
    }catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
