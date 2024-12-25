import jwt from "jsonwebtoken"
import { User } from "../models/User"
export const isAuth = tryCatch(async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            message: "Please Login",
        });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: verifyToken._id }; // Only attach the user ID
    next();
})