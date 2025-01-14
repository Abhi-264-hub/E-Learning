import tryCatch from "../Middlewares/tryCatch.js";
import { Course } from "../models/Course.js";
import { Lecture } from "../models/Lecture.js";
import {rm} from "fs"
import { promisify } from "util";
import fs from "fs"
import { User } from "../models/User.js";
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
export const deleteLecture=tryCatch(async(req,res)=>{
    const lecture=await Lecture.findById(req.params.id)
    rm(lecture.video,()=>{
        console.log("Video Deleted")
    })
    await lecture.deleteOne()
    res.json({
        message:"Lecture Deleted"
    })

})
const unlinkAsync=promisify(fs.unlink)
export const deleteCourse=tryCatch(async(req,res)=>{
    const course=await Course.findById(req.params.id)
    const lectures=await Lecture.find({course:course._id})
    await Promise.all(
         lectures.map(async(lecture)=>{
            await unlinkAsync(lecture.video);
            console.log("video deleted")
        })
    )
    rm(course.image,()=>{
        console.log("image Deleted")
    })
    await Lecture.find({course:req.params.id}).deleteMany()
    await course.deleteOne()
    await User.updateMany({},{$pull:{subscription:req.params,id}})
    res.json({
        message:"Course Deleted"
    })
})
export const getAllStats=tryCatch(async(req,res)=>{
    const totalCourses=(await Course.find()).length
    const totalLecrures=(await Lecture.find()).length
    const totalUsers=(await User.find()).length
    const stats={
        totalCourses,
        totalLecrures,
        totalUsers
    }
    res.json({
        stats,
    })
})