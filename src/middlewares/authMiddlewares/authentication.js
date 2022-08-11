export default async function authentication(req,res,next){
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).send("You're not sending authentication token!");
    const token = authorization.replace("Bearer","").trim();
    res.locals.token = token;
    next();
}