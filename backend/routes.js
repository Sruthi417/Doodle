import { Router } from "express";
import noterouter from "./modules/notes/note.route.js";
import userrouter from "./modules/users/user.route.js";
import authrouter from "./modules/auth/auth.route.js";

const router = Router();
router.use("/notes", noterouter);
router.use("/user",userrouter);
router.use("/auth",authrouter)
export default router;
