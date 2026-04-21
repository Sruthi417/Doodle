import express from "express";
import passport from "../../config/passport.js";
import { generateToken } from "../../utils/generateToken.js";

const authrouter = express.Router();

// STEP 1 → Redirect to Google
authrouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

// STEP 2 → Callback
authrouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log("User authenticated via Google:", req.user);
    const token = generateToken(req.user);

    // Determine if we are in production based on NODE_ENV or if we are not on localhost (more robust)
    const isProd = process.env.NODE_ENV?.toLowerCase() === "production" || process.env.SERVER_URL?.includes("render.com");
    console.log("Setting cookie - isProd:", isProd);

    const cookieOptions = {
      httpOnly: true,
      secure: isProd, // Must be true for SameSite: 'None'
      sameSite: isProd ? "None" : "Lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);

    // Ensure no trailing slash in CLIENT_URL for redirect
    const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, "");
    console.log("Redirecting to:", `${clientUrl}/home`);
    res.redirect(`${clientUrl}/home`);
  },
);
// LOGOUT
authrouter.get("/logout", (req, res) => {
  const isProd = process.env.NODE_ENV === "production" || process.env.SERVER_URL?.includes("render.com");
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
    path: "/",
  });
  res.json({ message: "Logged out" });
});

export default authrouter;
