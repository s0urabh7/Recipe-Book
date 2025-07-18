import {Router} from "express"
import Recipe from "../models/recipe.js"
import User from "../models/user.js"

const router = Router()

router.get("/", async(req, res)=>{
    try {
        const recipes = await Recipe.find({})
        return res.json(recipes)
    } catch (error) {
        return res.json(err)
    }
})

router.post("/", async(req, res)=>{
    const {recipeName, ingredients, instructions, cookingTime, recipeOwner} = req.body
    const newRecipe = await Recipe.create({recipeName, ingredients, instructions, cookingTime, recipeOwner})
    await newRecipe.save()
    return res.json({message: "Recipe created successfully"})
})

router.put("/", async(req, res)=>{
    try {
        const recipe = await Recipe.findById(req.body.recipeId)
        const user = await User.findById(req.body.recipeId)
        user.savedRecipes.push(recipe)
        await user.save()
        return res.json({savedRecipes: user.savedRecipes})
    } catch (error) {
        return res.json(error)
    }
})

router.get("/savedRecipes/ids", async(req, res)=>{
    try {
        const user = await User.findById(req.body.userId)
        return res.json({savedRecipes: user?.savedRecipes})
    } catch (error) {
        return res.json(error)
    }
})

router.get("/savedRecipes", async(req, res)=>{
    try {
        const user = await User.findById(req.body.userID)
        const savedRecipes = await Recipe.find({
            _id: {$in: user.savedRecipes}
        })
        return res.json({savedRecipes})
    } catch (error) {
        return res.json(error)
    }
})



export default router