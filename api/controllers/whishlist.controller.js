import User from "../models/user.model.js"
// import createError from "../utils/createError";


export const addToWhishlist = async (req, res, next) => {
    const userId = req.body.item.userId;
    const gigId = req.body.item._id;

    console.log('This is wishlist', userId);

    try {
        const user = await User.findById(userId);


        const alreadyIn = user.whishList.some((id) => id.toString() === gigId);

        if (alreadyIn) {

            await User.updateOne(
                { _id: userId },
                { $pull: { whishList: gigId } }
            );
            
        } else {

            await User.updateOne(
                { _id: userId },
                { $push: { whishList: gigId } }
            );
            
        }


        const updatedUser = await User.findById(userId);
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error in addToWhishlist:", error);
        next(error);
    }
    
};
export const getToWhishlist = async (req, res, next) =>{

    const user = await User.findById(req.params.id)
    try {
        res.send(user)
        console.log('this is get whishlist',user.whishList);
        
    } catch (error) {
        next(error)
        
    }

   
    
}
