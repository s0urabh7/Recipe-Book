import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { verifyJWT } from "../middlewares/authentication.js";


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
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message: "Both fields are required"})
        }
        const user = await User.findOne({username});
        if(!user){
            return res.json({message: "Username or Password is incorrect"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.json({message: "Invalid password"})
        }
        console.log({ username, isPasswordValid, userExists: !!user });
        const token = jwt.sign({
            id: user._id
        }, process.env.ACCESS_TOKEN_SECRET)
        const options = {
            httpOnly: true,
            secure: false
        }
        res.cookie("accessToken", token, options).json({userId: user._id});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
})

router.post("/logout", async(req, res)=>{
    const options = {
        httpOnly: true,
        secure: true
    }
    res.clearCookie("accessToken", options).json({message: "logged out successfully"})
})

router.get("/me", verifyJWT, async(req, res)=>{
    res.status(200).json({ id: req.user.id });
})

export { router as userRouter };