import React from 'react'
import AuthContext from './authContext'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const AuthContextProvider = ({children})=> {

    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      
      const fetchUser = async() => {
        try {
          const response = await axios.get("http://localhost:3001/auth/me", {
            withCredentials: true
          })
          setUserId(response.data.id)
          setUser({ id: response.data.id });
        } catch (error) {
          console.log("No active session found");
          setUser(null);
          setUserId(null);
        } finally {
          setLoading(false);
        }
      }
      fetchUser()
    }, [])
  
  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{user, setUser, userId, setUserId}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider