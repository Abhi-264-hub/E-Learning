import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Database/db.js";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import courseRouter from "./routes/course.js";
const app=express();
app.use(express.json())
app.use("/uploads",express.static("uploads"))
dotenv.config();
const port=process.env.PORT;
app.use("/api",userRouter)
app.use("/api",adminRouter)
app.use("/api",courseRouter)

app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port}`);
    connectDb();
});