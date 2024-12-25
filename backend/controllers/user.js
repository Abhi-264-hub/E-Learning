
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
export const loginUser=tryCatch(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message:"Wrong Email"
        })
    }
    const mathPassword=await bcrypt.compare(password,user.password)
    if(!mathPassword){
        return res.status(400).json({
            message:"Wrong Password"
        })
    }
    const token=await jwt.sign({_id:user._id},process.env.JWT_Secret,{expiresIn:"15d"})
    res.json({
        message:`Welcome Back ${user.name}`,
        user,
        token
    })
})
export const myProfile=tryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id); // Fetch user details
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    res.json({ user });
})