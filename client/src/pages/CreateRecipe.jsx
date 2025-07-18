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
        cookingTime: null,
        recipeOwner: userId
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setRecipe({...recipe, [name]: value})
    }

    const handleAddIngredients = () =>{
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    }

    const handleIngredientChange = (event, index) => {
        const {value} = event.target
        const ingredients =  recipe.ingredients
        ingredients[index] = value
        setRecipe({...recipe, ingredients})
    }

    const handleOnSubmit = async(event) => {
        event.preventDefault()
        try {
            await axios.post('http://localhost:3001/recipe/', recipe)
            navigate("/")
            alert("recipe created")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="recipeName">Recipe Name:</label>
            <input type="text" name='recipeName' id='recipeName' onChange={handleChange}/>

            <label htmlFor="ingredients">Ingredients: </label>
            {recipe.ingredients.map((ingredient, index)=>(
                <input key={index} type='text' id="ingredients" name='ingredients' value={ingredient} onChange={(event)=>handleIngredientChange(event, index)}/>
            ))}
            <button type='button' onClick={handleAddIngredients}>Add Ingredient </button>

            <label htmlFor="instructions">Instructions: </label>
            <input type="text" name='instructions' id='instructions' onChange={handleChange}/>

            <label htmlFor="cookingTime">Cooking Time: </label>
            <input type="text" name='cookingTime' id='cookingTime'  onChange={handleChange}/>

            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default CreateRecipe