import express from "express";
import {verifyToken} from "../middleware/jwt.js";
import {createOrder,getOrder} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/checkout",createOrder)
router.get("/",verifyToken,getOrder)

export default router;