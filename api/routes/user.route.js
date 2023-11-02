import express from "express";
import { deleteUser, getUser, getProfile,getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";




const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);
router.get("/profile/:id", getProfile);
router.get("/",getUsers)

export default router;
