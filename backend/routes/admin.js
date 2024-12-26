import express from "express"
import { isAuth,isAdmin } from "../Middlewares/isAuth.js"

import { uploadFiles } from "../Middlewares/multer.js"
import { addLectures, createCourse } from "../controllers/admin.js"
const router=express.Router()

router.post("/course/new",isAuth,isAdmin,uploadFiles,createCourse)
router.post("/course/:id",isAuth,isAdmin,uploadFiles,addLectures)
export default router