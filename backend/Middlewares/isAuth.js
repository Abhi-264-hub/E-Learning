import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
import tryCatch from "./tryCatch.js";

export const isAuth = tryCatch(async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            message: "Please Login",
        });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user details to the request
    req.user = await User.findById(verifyToken._id)
    next();
})
export const isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=="admin"){
            return res.status(403).json({
                message:"You are not Admin"
            })
        }
        next()
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}