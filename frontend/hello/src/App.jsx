import React from 'react'
import Select from './mycomponents/Select'
import { Routes, Route } from 'react-router-dom'
import Chat from './mycomponents/Chat'
import Login from './mycomponents/Login'
import Home from './mycomponents/Home'
import AuthMiddleware from './mycomponents/AuthMiddleware'
import Random from './mycomponents/Random'

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <AuthMiddleware>
          <Home />
        </AuthMiddleware>
      } />
      <Route path='/login' element={<Login />} />
      <Route path='/select' element={
        // <AuthMiddleware>
          <Select />
        // </AuthMiddleware>
      } />
      <Route path='/random' element={
        // <AuthMiddleware>
          <Random />
        // </AuthMiddleware>
      } />
    </Routes>
  )
}

export default App