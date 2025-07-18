import React from 'react'
import AuthContext from './authContext'
import { useState } from 'react'

const AuthContextProvider = ({children})=> {

    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)

  return (
    <AuthContext.Provider value={{user, setUser, userId, setUserId}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider