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

    // Dynamic cookie policy: Support both production (cross-origin) and localhost
    const isLocalhost = req.get('host')?.includes('localhost');
    const isProd = process.env.NODE_ENV?.toLowerCase() === "production" || process.env.SERVER_URL?.includes("render.com");

    const cookieOptions = {
      httpOnly: true,
      secure: !isLocalhost, // Secure must be true for SameSite: 'None'
      sameSite: isLocalhost ? "Lax" : "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    console.log("Setting cookie - options:", { ...cookieOptions, value: "HIDDEN" });

    res.cookie("token", token, cookieOptions);

    // Ensure no trailing slash in CLIENT_URL for redirect
    const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, "");
    console.log("Redirecting to:", `${clientUrl}/home`);
    res.redirect(`${clientUrl}/home`);
  },
);
// LOGOUT
authrouter.get("/logout", (req, res) => {
  const isLocalhost = req.get('host')?.includes('localhost');
  res.clearCookie("token", {
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: isLocalhost ? "Lax" : "None",
    path: "/",
  });
  res.json({ message: "Logged out" });
});

export default authrouter;
