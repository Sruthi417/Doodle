import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes.js";
import passport from "./config/passport.js";

const app = express(); //An app object with methods like:app.use() , app.get()  ,  app.post()  , app.listen()  Create an Express app instance and store it in app
app.use(express.json()); //express.json() lets Express read JSON request bodies.
app.use(express.urlencoded({ extended: false })); //express.urlencoded() lets Express read data submitted from forms (URL-encoded format).
app.use(cookieParser()); //cookieParser() lets Express read cookies sent by the browser in the request.

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173",
  "https://doodle-xi-two.vercel.app",
].filter(Boolean);

/*app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);*/


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(passport.initialize());

app.use("/api", router);
app.set("trust proxy", 1);
app.get("/", (req, res) => {
  res.send("Welcome to doodling");
});

export default app;
