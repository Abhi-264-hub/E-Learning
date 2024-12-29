import express from "express"
import { isAuth,isAdmin } from "../Middlewares/isAuth.js"

import { uploadFiles } from "../Middlewares/multer.js"
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllStats } from "../controllers/admin.js"

const router=express.Router()

router.post("/course/new",isAuth,isAdmin,uploadFiles,createCourse)
router.post("/course/:id",isAuth,isAdmin,uploadFiles,addLectures)
router.delete("/lecture/:id",isAuth,isAdmin,deleteLecture)
router.get("/stats",isAuth,isAdmin,getAllStats)
router.delete("/course/:id",isAuth,isAdmin,deleteCourse)
export default router