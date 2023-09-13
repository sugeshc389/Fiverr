import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";


export const createOrder = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.gigId)
        const neworder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            buyerId: req.userId,
            sellerId: gig.userId,
            price: gig.price,
            payment_intent: "temporary"

        })

        await neworder.save()
        res.send(200).send("Successful")

    } catch (error) {
        next(error)

    }

}

export const getOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            isCompleted: true
        })

    } catch (error) {
        next(error)

    }

}