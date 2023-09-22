import express from "express";
import {
    addToWhishlist,
    getToWhishlist,
    removeToWhishlist
} from "../controllers/whishlist.controller.js";

const router = express.Router();

router.post('/whishlist', addToWhishlist);
router.get('/whishlist/:id', getToWhishlist);
router.delete('/whishlist/:userId/:gigId',removeToWhishlist)


export default router;