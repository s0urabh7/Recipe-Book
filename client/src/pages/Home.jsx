import React, { useState, useEffect} from 'react'
import axios from "axios"
import AuthContext from '../context/authContext'
import { useContext } from 'react'

function Home() {

  const [recipes, setRecipes]= useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const {userId} = useContext(AuthContext)
  const {user} = useContext(AuthContext)

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

  const deleteRecipe = async(recipeId) => {
    try {
      await axios.delete(`http://localhost:3001/recipe/${recipeId}`)
      setRecipes((prev) => prev.filter(recipe => recipe._id !== recipeId))
      setSavedRecipes((prev)=> prev.filter(recipe => recipe._id !== recipeId))
    } catch (error) {
      console.error("Failed to delete recipe", error)
    }
  }

  const isRecipeSaved = (id) => Array.isArray(savedRecipes) && savedRecipes.includes(id)

return (!user) ? ( 
  <div className='m-10 text-5xl font-bold text-center'>
    Login to see recipes
  </div> ) : (
  <div className="p-8 h-auto bg-gray-100">
      <h2 className="text-5xl font-bold mb-6 text-center">Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
            <li key={recipe._id}>
            <div className='flex flex-col gap-4 w-2xl p-6 border-4 mx-auto mt-5 mb-14 justify-center bg-white shadow-gray-600 shadow-2xl'>
              <h3 className='text-4xl font-semibold text-blue-700'>{recipe.recipeName}</h3>

              <div className='flex gap-1 mt-3'>
                <button onClick={()=>saveRecipe(recipe._id, userId )} disabled={isRecipeSaved(recipe._id)}  className='text-white px-3 py-1 rounded-lg cursor-pointer bg-green-400 text-xl hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold'>
                {isRecipeSaved(recipe._id) ? "Saved" : "save"}
                </button>
                <button onClick={()=>deleteRecipe(recipe._id )} className='text-white px-3 py-1 rounded-lg cursor-pointer bg-red-500 text-xl hover:bg-red-600 font-semibold '>
                  Delete
                </button>
              </div>

              <img src={`http://localhost:3001${recipe.recipeImage}`} className="max-w-md max-h-md  rounded-md shadow-sm m-auto mt-5 mb-5" alt="recipeImage" />
              <p className='text-gray-700 text-xl'>Instructions: {recipe.instructions}</p>
              <p className='text-gray-700 text-xl'>Cooking Time: {recipe.cookingTime}mins</p>
            </div>
            </li>
        ))}
      </ul>
    </div>
)}

export default Home