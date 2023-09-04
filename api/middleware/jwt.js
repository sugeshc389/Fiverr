export const verifyToken = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("You are not authenticated ");

    Jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
        if (!token) return res.status(403).send("Token is not valid");
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
    })

};