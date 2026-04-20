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

    const isProd = process.env.NODE_ENV?.toLowerCase() === "production";
    console.log("Setting cookie - isProd:", isProd);

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Ensure no trailing slash in CLIENT_URL for redirect
    const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, "");
    console.log("Redirecting to:", `${clientUrl}/home`);
    res.redirect(`${clientUrl}/home`);
  },
);
// LOGOUT
authrouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export default authrouter;
