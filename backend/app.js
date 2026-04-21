import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes.js";
import passport from "./config/passport.js";

const app = express(); //An app object with methods like:app.use() , app.get()  ,  app.post()  , app.listen()  Create an Express app instance and store it in app

app.set("trust proxy", 1);


app.use(express.json()); //express.json() lets Express read JSON request bodies.
app.use(express.urlencoded({ extended: false })); //express.urlencoded() lets Express read data submitted from forms (URL-encoded format).
app.use(cookieParser()); //cookieParser() lets Express read cookies sent by the browser in the request.




const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://doodle-xi-two.vercel.app",
].filter(Boolean).map(url => url.replace(/\/$/, ""));

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const normalizedOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.log("Origin not allowed by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Cookie"],
  })
);

app.use(passport.initialize());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to doodling");
});

export default app;
