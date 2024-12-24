import { User } from "../Models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Activation_secret from "./env"

export const register=async(req,res)=>{
    try{
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
            name,otp

        },process.env.Activation_secret,{
            expiresIn:"5m"
        })
        const data={
            name,otp
        }

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }

}