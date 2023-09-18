import express from "express";
import { addToWhishlist,getToWhishlist } from "../controllers/whishlist.controller.js";



const router = express.Router();


router.put('/whishlist',  addToWhishlist)
router.get('/whishlist/:id',getToWhishlist)


export default router;