import {Router} from "express"
import Recipe from "../models/recipe.js"
import User from "../models/user.js"
import { verifyJWT } from "../middlewares/authentication.js";
import multer from "multer"
import path from "path"

const router = Router()

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, path.resolve('./public/uploads'))
    },
    filename: (req, file, cb)=>{
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})

const upload = multer({storage: storage})

router.get("/", async(req, res)=>{
    try {
        const recipes = await Recipe.find({})
        return res.json(recipes)
    } catch (error) {
        return res.json(err)
    }
})

router.post("/", verifyJWT, upload.single('recipeImage'), async(req, res)=>{
    try {
        const {recipeName, ingredients, instructions, cookingTime, recipeOwner} = req.body
        const newRecipe = new Recipe({
            recipeName,
            ingredients,
            instructions,
            cookingTime,
            recipeImage: `/uploads/${req.file.filename}`,
            recipeOwner
        });
        await newRecipe.save()
        return res.json({message: "Recipe created successfully"})
    } catch (error) {
        console.log("error: ", error)
    }
})

router.put("/", async(req, res)=>{
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

router.patch("/unsaveRecipes", async(req, res)=>{
    try {
        const {recipeId, userId} = req.body
        const user = await User.findById(userId)
        user.savedRecipes = user.savedRecipes.filter(srecipe=> srecipe.toString() !== recipeId)
        await user.save()
        return res.json({savedRecipes: user.savedRecipes})
    } catch (error) {
        return res.json(error)
    }
})

router.get("/savedRecipes/ids/:userId", async(req, res)=>{
    try {
        const user = await User.findById(req.params.userId)
        return res.json({savedRecipes: user?.savedRecipes})
    } catch (error) {
        return res.json(error)
    }
})

router.get("/savedRecipes/:userId", async(req, res)=>{
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

router.delete("/:id", async(req, res)=>{
    try {
        const id = req.params.id
        const deletedRecipe = await Recipe.findByIdAndDelete(id)
        if(!deletedRecipe){
            return res.status(404).json({message: "recipe not found"})
        }
        res.status(200).json({message: "recipe deleted successfully"})
    } catch (error) {
        console.err(error)
        res.status(500).json({message: "server error"})
    }
})



export default router