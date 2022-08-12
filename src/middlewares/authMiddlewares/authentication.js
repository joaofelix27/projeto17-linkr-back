export default async function authentication(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send("You're not sending authentication token!");
    const token = authorization.replace("Bearer", "").trim();
    res.locals.token = token;
    next();
}


export async function getUserData(req, res, next) {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).send("You're not sending authentication token!");
    }
    const token = authorization?.replace("Bearer ", "");

    try {
        const { sessionId } = jwt.verify(token, process.env.JWT_SECRET);

        const { rows: userInfo } = await sessionRepository.searchSession(
            sessionId
        );

        if (userInfo.length !== 1) {
            return res.status(401).send("Token invalid or expired");
        }

        res.locals.userInfo = userInfo[0];

        next();
    } catch (e) {
        console.log(e);

        res.sendStatus(500);
    }
}