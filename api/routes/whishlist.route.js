import express from "express";
import {
    addToWhishlist,
    getToWhishlist
} from "../controllers/whishlist.controller.js";



const router = express.Router();

router.post('/whishlist', addToWhishlist);
router.get('/whishlist', getToWhishlist);


export default router;