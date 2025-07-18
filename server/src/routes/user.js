import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router();

router.post("/register", async(req, res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.json({message: "Both fields are required"})
    }
    const user = await User.findOne({username})
    if(user){
        return res.json({message: "user already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        password: hashedPassword
    })
    await newUser.save()
    res.json({message: "User created successfully"})
})

router.post("/login", async(req, res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.json({message: "Both fields are required"})
    }
    const user = await User.findOne({username});
    if(!user){
        return res.json({message: "Username or Password is incorrect"})
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({message: "Invalid password"})
    }
    const token = jwt.sign({
        id: user._id
    }, process.env.ACCESS_TOKEN_SECRET)
    const options = {
        httpOnly: true,
        secure: true
    }
    res.cookie("accessToken", token, options).json({userId: user._id});
})

router.post("/logout", async(req, res)=>{
    const options = {
        httpOnly: true,
        secure: true
    }
    res.clearCookie("accessToken", options).json({message: "logged out successfully"})
})

export { router as userRouter };