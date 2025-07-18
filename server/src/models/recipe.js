import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    instructions: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
    
    },
    recipeOwner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

const Recipe = mongoose.model("Recipe", recipeSchema)

export default Recipe