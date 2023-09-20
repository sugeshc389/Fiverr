import User from "../models/user.model.js"
// import createError from "../utils/createError";




export const addToWhishlist = async (req, res, next) => {

    const { userId, gig_id } = req.body

    try {
        const user = await User.findById(userId);
        const alreadyIn = user.whishList.some((id) => id.toString() === gig_id);

        if (alreadyIn) {

            await User.updateOne(
                { _id: userId },
                { $pull: { whishList: gig_id } }
            );

        } else {

            await User.updateOne(
                { _id: userId },
                { $push: { whishList: gig_id } }
            );

        }


        const updatedUser = await User.findById(userId);
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error in addToWhishlist:", error);
        next(error);
    }

};
export const getToWhishlist = async (req, res, next) => {

    const user = await User.findById(req.params.id).populate('whishList')
       console.log(user);
    
    try {
        res.status(200).send(user)
        
        

    } catch (error) {
        next(error)

    }



}
