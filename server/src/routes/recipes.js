import {Router} from "express"
import Recipe from "../models/recipe.js"
import User from "../models/user.js"
import { verifyJWT } from "../middlewares/authentication.js";

const router = Router()

router.get("/", async(req, res)=>{
    try {
        const recipes = await Recipe.find({})
        return res.json(recipes)
    } catch (error) {
        return res.json(err)
    }
})

router.post("/", verifyJWT, async(req, res)=>{
    try {
        const {recipeName, ingredients, instructions, cookingTime, recipeOwner} = req.body
        const newRecipe = await Recipe.create({recipeName, ingredients, instructions, cookingTime, recipeOwner})
        await newRecipe.save()
        return res.json({message: "Recipe created successfully"})
    } catch (error) {
        console.log("error: ", error)
    }
})

router.put("/", verifyJWT, async(req, res)=>{
    try {
        const recipe = await Recipe.findById(req.body.recipeId)
        const user = await User.findById(req.body.userId)
        user.savedRecipes.push(recipe)
        await user.save()
        return res.json({savedRecipes: user.savedRecipes})
    } catch (error) {
        return res.json(error)
    }
})

router.get("/savedRecipes/ids/:userId", verifyJWT, async(req, res)=>{
    try {
        const user = await User.findById(req.params.userId)
        return res.json({savedRecipes: user?.savedRecipes})
    } catch (error) {
        return res.json(error)
    }
})

router.get("/savedRecipes/:userId", verifyJWT, async(req, res)=>{
    try {
        const user = await User.findById(req.params.userId)
        const savedRecipes = await Recipe.find({
            _id: {$in: user.savedRecipes}
        })
        return res.json({savedRecipes})
    } catch (error) {
        return res.json(error)
    }
})



export default router