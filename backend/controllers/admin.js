import tryCatch from "../Middlewares/tryCatch.js";
import { Course } from "../models/Course.js";
export const createCourse=tryCatch(async(req,res)=>{
    const {title,description,category,createdBy,duration,price}=req.body
    const image =req.file
    await Course.create({
        title,
        description,
        category,
        createdBy,
        image:image?.path,
        duration,
        price

    })
    res.status(201).json({
        message:"Course created successfully"
    })


})