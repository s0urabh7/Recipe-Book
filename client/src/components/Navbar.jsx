import React from 'react'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import { useContext } from 'react'
import AuthContext from '../context/authContext'


function Navbar() {

  const {user} = useContext(AuthContext)

  return (!user) ? (
    <div>
        <nav className='bg-gray-800 text-gray-200 px-4 py-6'>
          <div className='container flex justify-between items-center mx-auto'>
            <div className='space-x-12 font-bold text-4xl'>
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </div>
          </div>
        </nav>
    </div>
  ) : (
  <div>
      <nav className='bg-gray-800 text-gray-300 px-4 py-6'>
        <div className='container flex justify-between items-center mx-auto'>
          <div className='space-x-12 font-bold text-4xl'>
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/createRecipe" className="hover:text-gray-300">Create Recipe</Link>
            <Link to="/savedRecipes" className="hover:text-gray-300">Saved Recipes</Link>
            <div className='inline-block'><LogoutBtn /></div>
          </div>
        </div>
      </nav>
  </div>  
  )
}

export default Navbar