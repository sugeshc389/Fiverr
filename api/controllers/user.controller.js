import User from "../models/user.model.js";
import createError from "../utils/createError.js";


export const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated "))


    if (req.userId !== user._id.toString()) {
        return next(createError(403, "You can delete only your account"))

    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send("Deleted")


}

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)

    res.status(200).send(user)


}
export const getProfile = async (req, res, next) =>{
    const user = await User.findById(req.params.id)

   

   res.status(200).send(user)

}
export const getUsers = async (req,res,next)=>{
    try {
        const users =await User.find()

    res.status(200).send(users)
        
    } catch (error) {
        console.log(error);
        
    }
    
}




