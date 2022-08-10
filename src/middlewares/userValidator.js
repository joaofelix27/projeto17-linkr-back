import { postRepository } from "../repositories/postRepository.js";

export const userValidator = async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) return res.sendStatus(401);
    try {
        const token = authorization.replace("Bearer ", "");
        if(!token) return res.sendStatus(401);
        
        const {rows:session} = await postRepository.getSessionByToken(token);
    
        if(session.length === 0) return res.sendStatus(401);
        
        res.locals.session = session[0];
        next();

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
   
    
}