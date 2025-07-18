import React from 'react'
import axios from 'axios'
import AuthContext from '../context/authContext'
import { useContext } from 'react'

function LogoutBtn() {

    const {setUser} = useContext(AuthContext)

    const handleLogout = async()=>{
        try {
            await axios.post("http://localhost:3001/auth/logout",{},{
                withCredentials: true
            })
            setUser(null)
        } catch (error) {
            console.log("Logout error: ", error)
        }
    }

  return (
    <div>
        <button onClick={handleLogout} className='cursor-pointer'>
            Logout
        </button>
    </div>
  )
}

export default LogoutBtn