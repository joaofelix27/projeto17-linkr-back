import { v4 } from 'uuid';
import { stripHtml } from "string-strip-html";
import bcrypt from 'bcrypt';
import { userRepository } from "../repositories/userRepository.js";
import { sessionRepository } from '../repositories/sessionRepository.js';

export async function signUp(req,res){
    const { username,email,password,picture } = req.body;
    const passwordHash = bcrypt.hashSync(password,10);

    const cleansedName = stripHtml(username).result;
    const cleansedEmail = stripHtml(email).result;
    try {
        await userRepository.newUser(cleansedName.trim(),cleansedEmail.trim(),passwordHash,picture.trim());

        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
    }
}

export async function signIn(req,res){
    const { email,password } = req.body;
    try {

        const { rows:checkUser } = await userRepository.getUser(email);

        if(checkUser.length > 0 && bcrypt.compareSync(password,checkUser[0].password)){
            const token = v4();

            await sessionRepository.newSession(checkUser[0].id,token);

            return res.status(200).send(token);
        }else{
            return res.sendStatus(401);
        }
        
    } catch (error) {
        res.sendStatus(500);
    }
}