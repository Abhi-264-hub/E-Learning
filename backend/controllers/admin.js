import tryCatch from "../Middlewares/tryCatch.js";
import { Course } from "../models/Course.js";
import { Lecture } from "../models/Lecture.js";
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
export const addLectures=tryCatch(async(req,res)=>{
    const course =await Course.findById(req.params.id)
    if(!course){
        return res.status(404).json({
            message:"No Course avaliable with this id"
        })
    }
    const {title,description}=req.body
    const file=req.file
    const lecture=await Lecture.create({
        title,
        description,
        video: file?.path,
        course:course._id
    })
    res.status(201).json({
        message:"Lecture Added",
        lecture
    })
})