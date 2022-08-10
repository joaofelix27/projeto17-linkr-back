import connection from "../dbStrategy/postgres.js";
import { postRepository } from "../repositories/postRepository.js";

export async function createPost(req,res){
    const {link, body} = req.body;
    const session = res.locals.session;
    try {  
        const userId= session.userId;

        const {rows:user} = await postRepository.getUserById(userId);

        if(user.length === 0) return res.status(404).send("User not found");
        
        await postRepository.insertPost(userId, link, body);
        res.sendStatus(201);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};