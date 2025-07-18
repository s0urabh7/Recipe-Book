import express from "express";
import mongoose from "mongoose"
import cors from "cors"
import { userRouter } from "./routes/user.js";
import dotenv from "dotenv"
import recipeRouter from "./routes/recipes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_CONNECTION).then(()=>{
    console.log("mongo connected");
})

app.use("/auth", userRouter);
app.use("/recipe", recipeRouter)

app.listen(3001, ()=>{
    console.log("Server started!");
})