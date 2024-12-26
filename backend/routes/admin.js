import express from "express"
import { isAuth,isAdmin } from "../Middlewares/isAuth.js"

import { uploadFiles } from "../Middlewares/multer.js"
import { createCourse } from "../controllers/admin.js"
const router=express.Router()

router.post("/course/new",isAuth,isAdmin,uploadFiles,createCourse)
export default router