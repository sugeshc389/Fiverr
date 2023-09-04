import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";



export const register = async (req, res, next) => {

    try {
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User({
            ...req.body,
            password: hash
        })

        await newUser.save()
        res.status(201).send("User has been created")

    } catch (error) {
        next(error)

    }

}

export const login = async (req, res) => {
    try {

        const user = await User.findOne({ userName: req.body.userName });


        if (!user) {
            return next(createError);
        }

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrect) {
            return res.status(401).send("Incorrect Password");
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
        res.status(500).send("Something Went Wrong");
    }
};
export const logout = async (req, res) => {

}
