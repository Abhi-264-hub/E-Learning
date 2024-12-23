import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Database/db.js";
const app=express();
dotenv.config();
const port=process.env.PORT;
app.get("/",(req,res)=>{
    res.send("Hello");
})
app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port}`);
    connectDb();
});