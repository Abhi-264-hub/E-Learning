import tryCatch from "../Middlewares/tryCatch.js";
import { Course } from "../models/Course.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

export const getAllCourses=tryCatch(async(req,res)=>{
    const courses =await Courses.find()
    res.json({
        courses
    })

})

export const getSingleCourse=tryCatch(async(req,res)=>{
    const course=await Course.findById(req.params.id)
    res.json({
        course
    })
})
export const fetchLectures=tryCatch(async(req,res)=>{
    const lectures=await Lecture.find({course:req.params.id})
    const user=await User.findById(req.user._id)
    if(user.role==="admin"){
        return res.json({lectures})
    }
    if(!user.subscription.includes(req.params.id)) return res.status(400).json({message:"You have not subscriped to this course"})
        res.json({lectures})
})
export const fetchLecture=tryCatch(async(req,res)=>{
    const lecture=await Lecture.findById(req.params.id)
    const user=await User.findById(req.user._id)
    if(user.role==="admin"){
        return res.json({lectures})
    }
    if(!user.subscription.includes(req.params.id)) return res.status(400).json({message:"You have not subscriped to this course"})
        res.json({lecture})
})
export const getMyCourses=tryCatch(async(req,res)=>{
    const courses=await Course.find({_id:req.user.subscription})
    res.json({
        courses
    })

})
