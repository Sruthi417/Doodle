import express from "express";
import { getProfile, updateProfile } from "./user.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";
import multer from "multer";

const userrouter = express.Router();

const upload = multer({ dest: "uploads/" });

// 👤 Profile
userrouter.get("/profile", verifyToken,getProfile);
userrouter.put("/profile",verifyToken, upload.single("image"), updateProfile);

export default userrouter;