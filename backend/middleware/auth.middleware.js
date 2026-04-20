import jwt from "jsonwebtoken";
import User from "../modules/users/user.model.js";

export const verifyToken = async (req, res, next) => {
  console.log("--- Auth Middleware Debug ---");
  console.log("Cookies:", req.cookies);
  console.log("Headers Cookie:", req.headers.cookie);
  
  try {
    const token = req.cookies.token;
    
    if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Token verified for user:", decoded.id);

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};