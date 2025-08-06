import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { ButtonAnimation } from './Animation'
import { motion } from "framer-motion"
import { useState } from 'react'
import { useUser } from '@/store/User'
import { useNavigate } from 'react-router-dom'

function MyCard({ onClick, title, Description, Active, type = "join" }) {
  const navigate = useNavigate()
  const [showChatbot, setShowChatbot] = useState(false)
  const { darkMode } = useUser()

  const handleTalkToAI = () => {
    navigate('/ai-chat')
    setShowChatbot(true)
  }

  const handleCloseChatbot = () => {
    setShowChatbot(false)
  }

  return (
    <motion.div
      className="w-80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Card className={`
        hover:cursor-pointer
        text-base
        border shadow-xl rounded-2xl transition-all duration-700 ease-in-out
        px-4 py-6 space-y-4
        ${darkMode
          ? `bg-gradient-to-br from-[#0f1a2e] via-[#182444] to-[#0f3460] 
             hover:from-[#830f72] hover:via-[#41295a] hover:to-[#0f2027]
             text-white border-white/10`
          : `bg-gradient-to-br from-white via-gray-50 to-gray-100
             hover:from-pink-100 hover:via-purple-100 hover:to-blue-100
             text-black border-gray-300`
        }
      `}>
        <CardHeader>
          <CardTitle className={`text-2xl font-extrabold font-serif tracking-wide 
            ${darkMode ? 'text-white' : 'text-blue-900'}`}>
            {type === "ai" ? '🤖' : '💬'} {title}
          </CardTitle>

          <CardDescription className={`text-sm italic font-light ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {Description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className={`text-md font-medium ${
            darkMode ? 'text-cyan-100' : 'text-blue-600'
          }`}>
            {Active}
          </p>
        </CardContent>

        <div className="flex justify-center items-center gap-4 mt-2">
          {type === "join" && (
            <motion.div {...ButtonAnimation}>
              <Button
                onClick={onClick}
                className={`w-fit font-bold py-2 px-5 rounded-full shadow-md transition-all
                  ${darkMode
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white'
                    : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white'}
                `}
              >
                🚀 Join
              </Button>
            </motion.div>
          )}

          {type === "ai" && (
            <motion.div {...ButtonAnimation}>
              <Button
                onClick={handleTalkToAI}
                className={`w-fit font-semibold py-2 px-5 rounded-full shadow-md transition-all
                  ${darkMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                    : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white'}
                `}
              >
                🤖 Talk to AI
              </Button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default MyCard
