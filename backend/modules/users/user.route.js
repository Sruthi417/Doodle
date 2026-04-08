import express from "express";
import { getProfile, updateProfile } from "./user.controller.js";
import multer from "multer";

const userrouter = express.Router();

const upload = multer({ dest: "uploads/" });

// 👤 Profile
userrouter.get("/profile", getProfile);
userrouter.put("/profile", upload.single("image"), updateProfile);

export default userrouter;