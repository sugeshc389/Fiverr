import User from "../models/user.model.js";
import createError from "../utils/createError.js"
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
    try {
        
        if (!req.body.userName || !req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).send('User has been created');
    } catch (error) {
        next(error);
    }
};



export const login = async (req, res, next) => {
    try {
        
        const user = await User.findOne({ userName: req.body.username });

console.log(user);

        if (!user) {

            return next(createError(404, "User not found"));
        }

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrect) {
            return next(createError(400, "Wrong password or username"));
        }

        const token = Jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JWT_KEY)
        
        const { password, ...info } = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).send(info)


    } catch (error) {
        console.error(error);
        res.status(500).json({
            error:error
        });
    }
};
export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    }).status(200).send("User has been logged out");

}