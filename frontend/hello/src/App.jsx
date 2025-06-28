import React from 'react'
import Select from './mycomponents/Select'
import { Routes, Route } from 'react-router-dom'
import Chat from './mycomponents/Chat'
import Login from './mycomponents/Login'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Chat/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/select' element={<Select/>} />
    </Routes>
  )
}

export default App