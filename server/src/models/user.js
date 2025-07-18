import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    savedRecipes: [{type: Schema.Types.ObjectId, ref: "Recipe"}]
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User;
