
import dotenv from"dotenv"
dotenv.config()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendMail from "../Middlewares/sendMail.js"
import tryCatch from "../Middlewares/tryCatch.js"
import { User } from "../models/User.js"

export const register=tryCatch(async(req,res)=>{
        const {email,name,password}=req.body
        let user=await User.findOne({
            email
        })
        if(user){
            return res.status(400).json({
                message:"User Already Exists"
            })
        }
        const hashPassword=await bcrypt.hash(password,10);
        user={
            name,
            email,
            password:hashPassword
        }
        const otp=Math.floor(Math.random()*1000000);
        const activationToken=jwt.sign({
            user,otp

        },process.env.Activation_secret,{
            expiresIn:"5m"
        })
        const data={
            name,otp
        }
        await sendMail(
            email,
            "E-learning",
            data

        )
        res.status(200).json({
            message:"Otp send to your email",
            activationToken
        })
}
)
export const verifyUser=tryCatch(async(req,res)=>{
    const {otp,activationToken}=req.body
    const verify=jwt.verify(activationToken,process.env.Activation_secret)
    if(!verify){
        return res.json({
            message:"OTP Expired"
        })
    }
    if(verify.otp!==otp){
        return res.json({
            message:"Wrong OTP"
        })   
    }
    await User.create({
        name: verify.user.name,       // Access `name` directly
        email: verify.user.email,   // Use the email from the request body
        password:verify.user.password,
    })
    res.json({
        message:"User Registered"
    })
})