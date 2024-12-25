import express from "express"
import { loginUser, myProfile, register, verifyUser } from "../controllers/user.js"
import { isAuth } from "../Middlewares/isAuth.js"
const userRouter=express.Router()
userRouter.post("/user/register",register)
userRouter.post("/user/verify",verifyUser)
userRouter.post("/user/login",loginUser)
userRouter.get("/user/me",isAuth,myProfile)
export default userRouter