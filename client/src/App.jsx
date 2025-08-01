import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import AuthContextProvider from './context/ContextProvider'

function App() {
  
  return (
    <AuthContextProvider>
      <Navbar/>
      <Outlet/>
    </AuthContextProvider>
  )
}

export default App
