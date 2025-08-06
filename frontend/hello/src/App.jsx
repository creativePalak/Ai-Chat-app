
import Select from './mycomponents/Select'
import { Routes, Route } from 'react-router-dom'
import Login from './mycomponents/Login'
import Home from './mycomponents/Home'
import AuthMiddleware from './mycomponents/AuthMiddleware'
import Random from './mycomponents/Random'
import AiChat from './mycomponents/AiChat'
import MentalHealthResources from './mycomponents/MentalHealthResources'
import Feedback from './mycomponents/Feedback'

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
        <AuthMiddleware>
          <Select />
        </AuthMiddleware>
      } />
      <Route path='/random' element={
        <AuthMiddleware>
          <Random />
        </AuthMiddleware>
      } />
      <Route path='/chatbot' element={
        <AuthMiddleware>
          <Select />
        </AuthMiddleware>
      } />
      <Route path='/ai-chat' element={
        <AuthMiddleware>
          <AiChat />
        </AuthMiddleware>
      } />
      <Route path="/feedback" element={
        <AuthMiddleware>
          <Feedback />
        </AuthMiddleware>
      } />
      <Route path="/resources" element={
        <AuthMiddleware>
          <MentalHealthResources />
        </AuthMiddleware>
      } />

    </Routes>
  )
}

export default App