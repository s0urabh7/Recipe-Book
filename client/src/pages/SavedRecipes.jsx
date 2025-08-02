import React, { useState, useEffect} from 'react'
import axios from "axios"
import AuthContext from '../context/authContext'
import { useContext } from 'react'

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([])
  const {userId} = useContext(AuthContext)
  
  const fetchSavedRecipes = async()=>{
      const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/${userId}`,{
        withCredentials: true
      })
      setSavedRecipes(response.data.savedRecipes)
      console.log(response.data.savedRecipes)
      console.log("succesfully fetched recipes saved by user")
    }

  useEffect(() => {
    fetchSavedRecipes() 
  }, [])
  
  const unsaveRecipe = async(recipeId, userId)=>{
    try {
      const response  = await axios.patch("http://localhost:3001/recipe/unsaveRecipes", {recipeId, userId})
     // console.log(response) 
      await fetchSavedRecipes();   
      console.log("recipe saved succesfully by user in db")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-8 h-screen bg-gray-100">
      <h2 className="text-5xl font-bold mb-6 text-center">Saved Recipes</h2>
      <ul>
        {savedRecipes.map((recipe, index) => (
          <li key={recipe._id || index}>
            <div className='flex flex-col gap-4 w-2xl p-6 border-4 mx-auto mt-5 mb-14 justify-center bg-white shadow-gray-600 shadow-2xl'>
              <h3 className='text-4xl font-semibold text-blue-700'>{recipe.recipeName}</h3>
              <img src={`http://localhost:3001${recipe.recipeImage}`} className="max-w-md max-h-md  rounded-md shadow-sm m-auto mt-5 mb-5" alt="recipeImage" />
              <p className='text-gray-700 text-xl'>Instructions: {recipe.instructions}</p>
              <p className='text-gray-700 text-xl'>Cooking Time: {recipe.cookingTime}mins</p>
              <button type='button' onClick={()=>unsaveRecipe(recipe._id, userId)} className='text-gray-200 px-3 py-1 rounded-md cursor-pointer bg-gray-500 text-xl hover:bg-gray-600 font-semibold '>Unsave</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SavedRecipes