import Jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated "))


    Jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
        if (!token) return next(createError(403, "Token is not valid"))
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next()
    })


};