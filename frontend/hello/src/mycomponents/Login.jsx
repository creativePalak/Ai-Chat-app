import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaDice } from "react-icons/fa";
import { Input } from '@/components/ui/input'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Login() {
  const [username , setUsername ] = useState('')
  const [password , setPassword ] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword( (prev) => !prev )
  }

  const randomUserName = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/')
      if (response.ok) {
        const jsonFormat = await response.json()
        const name = jsonFormat.results[0].login.username
        return name
      } 
    } catch (error) {
      console.log(error)
    } 
  }

  const toggleUsername = async () => {
    const name = await randomUserName()
    setUsername(name)
  }

  return (
    <div className=' dark min-h-screen flex justify-center items-center bg-background text-gray-100 dark:text-white'>
      <div>
        <div className='text-4xl my-5' >
          CREATE YOUR ACCOUNT
        </div>
        <div>
          <div className='text-lg my-2 text-gray-200' >
            Username
          </div>
          <div className='flex items-center gap-5 my-2 '  >
          <Input className={`text-lg`} placeholder={`tyler durlin`} value={username} onChange={(current) => setUsername(current.target.value)} />
          <Button onClick={toggleUsername} >
            <FaDice size={34} />
          </Button>
          </div>
        </div>
        <div>
          <div className='text-lg my-2 text-gray-200' >
            Password
          </div>
          <div className='flex items-center gap-5 my-2 '  >
          <Input 
          placeholder='******' 
          value={password} 
          onChange={ (current) => setPassword(current.target.value) }
          type={ showPassword ? 'text' : 'password' } 
          className={`text-lg`} />
          <Button className={`cursor-pointer`} onClick={togglePasswordVisibility} >
            {
              showPassword ? <FaEye size={34} /> : <FaEyeSlash size={34} />
            }
          </Button>
          </div>
        </div>
        <Button className={`text-lg w-full my-2 cursor-pointer `} >
          Enter 
        </Button>
    </div>
    </div>
  )
}

export default Login