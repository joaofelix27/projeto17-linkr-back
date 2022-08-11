import { userRepository } from "../repositories/userRepository.js";

export async function searchUser(req,res){
    const { name } = req.body;
    try {
        const { rows:users } = await userRepository.searchUsers(name);
        res.status(200).send(users);
    } catch (error) {
        res.sendStatus(500);
    }
}