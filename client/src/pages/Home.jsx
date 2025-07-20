import React, { useState, useEffect} from 'react'
import axios from "axios"
import AuthContext from '../context/authContext'
import { useContext } from 'react'

function Home() {

  const [recipes, setRecipes]= useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const {userId} = useContext(AuthContext)

  useEffect(() => {
    const fetchRecipe  = async()=>{
      try {
        const response  = await axios.get("http://localhost:3001/recipe")
        setRecipes(response.data) 
        //console.log(response.data)
        console.log("succesfully fetched all recipes")        
      } catch (error) {
        console.error(error)
      }
    }
    const fetchSavedRecipes = async()=>{
      const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/ids/${userId}`)
      setSavedRecipes(response.data.savedRecipes)
      console.log(response.data.savedRecipes)
      console.log("succesfully fetched recipes saved by user")
    }
    fetchRecipe()
    fetchSavedRecipes()
  }, [])
  
  const saveRecipe = async(recipeId, userId)=>{
    try {
      const response  = await axios.put("http://localhost:3001/recipe", {recipeId, userId})
     // console.log(response) 
      setSavedRecipes((prev)=> [...prev, recipeId])   
      console.log("recipe saved succesfully by user in db")
    } catch (error) {
      console.error(error)
    }
  }

  const isRecipeSaved = (id) => Array.isArray(savedRecipes) && savedRecipes.includes(id)
  
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {}
            {recipe.recipeName}
            <button onClick={()=>saveRecipe(recipe._id, userId )} disabled={isRecipeSaved(recipe._id)}  className='border disabled:bg-gray-400 disabled:cursor-not-allowed'>
              {isRecipeSaved(recipe._id) ? "Saved" : "save"}
            </button>
            {recipe.instructions}
            {recipe.cookingTime}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home