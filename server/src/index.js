import express from "express";
import mongoose from "mongoose"
import cors from "cors"
import { userRouter } from "./routes/user.js";
import dotenv from "dotenv"
import recipeRouter from "./routes/recipes.js"
import cookierParser from "cookie-parser"
import path from "path"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cookierParser())
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}))
app.use(express.urlencoded({extended: true}))
app.use("/uploads", express.static(path.resolve('./public/uploads')));

mongoose.connect(process.env.MONGO_CONNECTION).then(()=>{
    console.log("mongo connected");
})

app.use("/auth", userRouter);
app.use("/recipe", recipeRouter)

app.listen(PORT, ()=>{
    console.log("Server started!");
})