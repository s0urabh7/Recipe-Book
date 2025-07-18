import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/authContext'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const {setUser, setUserId} = useContext(AuthContext)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                username,
                password
            }, {
              withCredentials: true,
              headers: { 'Content-Type': 'application/json' }
            })
            console.log("Login successfully", response.data)
            setUser({username})
            setUserId(response.data.userId)
            console.log(response.data.userId)
            navigate('/')

        } catch (error) {
            console.error("Error sending data:", error);
        }
    }

  return (
    <div>
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-md w-full max-w-sm p-6' >
                <h2 className='text-3xl font-bold mb-6 text-center'>Sign In</h2>
                
                <div className='mb-6'>
                    <label htmlFor="username" className='block text-lg font-medium text-gray-700 mb-1 text-center'>Enter Username :</label>
                    <input type="text" name='username'
                     value={username}
                     onChange={(event)=>setUsername(event.target.value)}
                     id='username' className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                <div className='mb-6'>
                    <label htmlFor="password" className='block text-lg font-medium text-gray-700 mb-1 text-center'>Enter Password:</label>
                    <input type="password" name='password' id='password'
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
               
                <button type='submit' className='px-4 py-2 bg-blue-600 text-white font-bold border-blue-300 rounded-md cursor-pointer w-full hover:bg-blue-700 transition'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login