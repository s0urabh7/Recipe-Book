import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateRecipe() {

    const {userId} = useContext(AuthContext)
    // console.log(userId);
    const navigate = useNavigate()

    const [recipe, setRecipe] = useState({
        recipeName: "",
        ingredients: [],
        instructions: "",
        cookingTime: undefined ,
        recipeOwner: userId
    })
    const [recipeImage, setRecipeImage] = useState(null)

    const handleChange = (event) => {
        const {name, value} = event.target
        setRecipe({...recipe, [name]: value})
    }

    const handleAddIngredients = () =>{
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    }

    const handleIngredientChange = (event, index) => {
        const {value} = event.target
        const ingredients =  [...recipe.ingredients]
        ingredients[index] = value
        setRecipe({...recipe, ingredients})
    }

    const handleOnSubmit = async(event) => {
        event.preventDefault()
        try {
            const data = new FormData()
            data.append('recipeImage', recipeImage);
            data.append('recipeName', recipe.recipeName);
            data.append('instructions', recipe.instructions);
            data.append('cookingTime', recipe.cookingTime);
            data.append('recipeOwner', recipe.recipeOwner);
            recipe.ingredients.forEach((ing) => data.append('ingredients', ing));
            await axios.post('http://localhost:3001/recipe/', data, {
                withCredentials: true
            })
            navigate("/")
            alert("recipe created")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='p-8 h-auto bg-gray-100'>

        <h2 className="text-5xl font-bold mb-6 text-center">Create Recipe</h2>

        <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 w-2xl p-6 border-4 mx-auto mt-5 mb-14 justify-center bg-white shadow-gray-600 shadow-2xl'>

            <label htmlFor="recipeName" className='text-2xl font-semibold'>Recipe Name:</label>
            <input type="text" name='recipeName' id='recipeName' value={recipe.recipeName} onChange={handleChange} className='px-4 py-1 text-xl border-gray-500 border-2 rounded-md mb-5 bg-white'/>

            <label htmlFor="recipeImage" className='text-2xl font-semibold'>Recipe Image: </label>
            <input type="file" id='recipeImage' name='recipeImage' onChange={(e)=>setRecipeImage(e.target.files[0])} className='border px-3 py-1 rounded-md cursor-pointer' />
            {recipeImage && <img src={URL.createObjectURL(recipeImage)} alt="Preview" className="w-48 h-48 mt-4 object-cover" />}

            <label className='text-2xl font-semibold'>Ingredients: </label>
            {recipe.ingredients.map((ingredient, index)=>(
                <input key={index} type='text' name='ingredients' value={ingredient} onChange={(event)=>handleIngredientChange(event, index)} className='px-4 py-1 text-xl border-gray-500 border-2 rounded-md'/>
            ))}
            <button type='button' onClick={handleAddIngredients} className='px-4 py-2 bg-blue-600 text-white font-bold border-blue-300 rounded-md cursor-pointer w-full hover:bg-blue-700 transition mb-5'>Add Ingredient </button>

            <label htmlFor="instructions" className='text-2xl font-semibold'>Instructions: </label>
            <input type="text" name='instructions' value={recipe.instructions} id='instructions' onChange={handleChange} className='px-4 py-1 text-xl border-gray-500 border-2 rounded-md mb-5'/>

            <label htmlFor="cookingTime" className='text-2xl font-semibold'>Cooking Time: </label>
            <input type="text" name='cookingTime' id='cookingTime' value={recipe.cookingTime}  onChange={handleChange} className='px-4 py-1 text-xl border-gray-500 border-2 rounded-md'/>

            <button type='submit' className='px-4 py-2 bg-blue-600 text-white font-bold border-blue-300 rounded-md cursor-pointer w-full hover:bg-blue-700 transition'>Create</button>
        </form>
    </div>
  )
}

export default CreateRecipe