import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes.js";

const app=express();  //An app object with methods like:app.use() , app.get()  ,  app.post()  , app.listen()  Create an Express app instance and store it in app
app.use(express.json()); //express.json() lets Express read JSON request bodies.
app.use(express.urlencoded({extended:false}));//express.urlencoded() lets Express read data submitted from forms (URL-encoded format).
app.use(cookieParser());//cookieParser() lets Express read cookies sent by the browser in the request.

app.use("/api",router);

app.get('/',(req,res)=>{
    res.send("Welcome to doodling");
});

export default app;