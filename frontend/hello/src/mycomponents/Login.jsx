import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaDice } from "react-icons/fa";
import { Input } from '@/components/ui/input'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/store/User';
import { useRef } from 'react';

function Login() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const { username, setUsername , setLogin } = useUser()
  const [error, setError] = useState({ username: '', password: '' });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (username !== '' && password !== '') {
      setError({ username: '', password: '' });
      console.log('Form submitted');
      setLogin(true)
      navigate('/')
    } else {
      const newError = { username: '', password: '' };

      if (username === '') {
        newError.username = 'Username cannot be empty';
      }
      if (password === '') {
        newError.password = 'Password cannot be empty';
      }

      setError(newError);
    }
  };

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
    console.log(username)
  }

  return (
    <div className=' dark min-h-screen flex justify-center items-center bg-background text-gray-100 dark:text-white'>
      <div>
        <div className='text-4xl my-5' >
          CREATE YOUR ACCOUNT
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <div className='text-lg my-2 text-gray-200' >
              Username
            </div>
            <div className='flex items-center gap-5 my-2 '  >
              <Input className={`text-lg`} placeholder={`tyler durlin`} value={username} onChange={(current) => setUsername(current.target.value)} />
              <Button className={`cursor-pointer`} onClick={toggleUsername} type='button' >
                <FaDice size={34} />
              </Button>
            </div>
            {error.username && <div className='my-1 text-red-600 text-sm' > {error.username} </div>}
          </div>
          <div>
            <div className='text-lg my-2 text-gray-200' >
              Password
            </div>
            <div className='flex items-center gap-5 my-2 '  >
              <Input
                placeholder='******'
                value={password}
                onChange={(current) => setPassword(current.target.value)}
                type={showPassword ? 'text' : 'password'}
                className={`text-lg`} />
              <Button className={`cursor-pointer`} onClick={togglePasswordVisibility} type='button' >
                {
                  showPassword ? <FaEye size={34} /> : <FaEyeSlash size={34} />
                }
              </Button>
            </div>
            {error.password && <div className='my-1 text-red-600 text-sm' > {error.password} </div>}
          </div>
          <Button type='submit' className={`text-lg w-full my-2 cursor-pointer `} >
            Enter
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login