import React, { useState, useEffect} from 'react'
import axios from "axios"
import AuthContext from '../context/authContext'
import { useContext } from 'react'

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([])
  const {userId} = useContext(AuthContext)

  useEffect(() => {
    const fetchSavedRecipes = async()=>{
      const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/${userId}`)
      setSavedRecipes(response.data.savedRecipes)
      console.log(response.data.savedRecipes)
      console.log("succesfully fetched recipes saved by user")
    }
    fetchSavedRecipes()
  }, [])
  

  return (
    <div>
      <h2>Saved Recipes</h2>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            {recipe.recipeName}
            {recipe.instructions}
            {recipe.cookingTime}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SavedRecipes