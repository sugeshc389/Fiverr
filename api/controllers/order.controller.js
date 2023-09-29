import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";






export const createOrder = async (req, res, next) => {
    const user = req.body.user;
    const payment = req.body.payment;
    const gig = req.body.gig;
    const gigDetail = JSON.parse(gig)
    const paymentDetail = JSON.parse(payment)
    const userDetail = JSON.parse(user)

    try {
        const neworder = new Order({
            gigId: gigDetail._id,
            img: gigDetail.cover,
            title: gigDetail.title,
            buyerId: userDetail._id,
            price: paymentDetail.amount,
            isCompleted:true,
            sellerId:gigDetail.userId,

        });


        await neworder.save();


        res.status(200).json({ data: neworder });
        console.log(neworder);
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            isCompleted: true
        })
        res.status(200).send(orders)

    } catch (error) {
        next(error)

    }

}