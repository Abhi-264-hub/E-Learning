import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Database/db.js";
import userRouter from "./routes/user.js";
const app=express();
dotenv.config();
const port=process.env.PORT;
app.use("/api",userRouter)

app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port}`);
    connectDb();
});