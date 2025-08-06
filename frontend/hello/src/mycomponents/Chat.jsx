import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'; // fixed typo from 'motion/react'
import { InputAnimation, ButtonAnimation } from './Animation';
import { useUser } from '@/store/User';

function Chat({ messages, onClick, InputRef, socketID, roomID, randomChat = false }) {
  const { darkMode } = useUser();

  const bgGradient = darkMode
    ? 'from-[#1e1f21] via-[#111827] to-[#0f172a]'
    : 'from-[#f0f4f8] via-[#e2e8f0] to-[#f8fafc]';

  const inputBg = darkMode ? 'bg-zinc-800/60 text-white' : 'bg-white text-gray-900';
  const placeholderColor = darkMode ? 'placeholder-gray-400' : 'placeholder-gray-500';
  const inputBorder = darkMode ? 'border-zinc-700' : 'border-gray-300';
  const userMsgBg = darkMode
    ? 'from-blue-500 to-indigo-600 text-white'
    : 'from-blue-100 to-indigo-200 text-black';
  const otherMsgBg = darkMode
    ? 'from-gray-700 to-gray-600 text-white'
    : 'from-gray-200 to-gray-100 text-black';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} text-${darkMode ? 'white' : 'black'} flex flex-col px-5 lg:px-20 py-10 relative overflow-hidden`}>

      {/* Welcome Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl lg:text-4xl font-bold text-center mb-6"
      >
        {randomChat ? '💬 Welcome to the Anonymous Chatroom' : '💬 Welcome to Chatroom'}
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-4 py-4">
        {
          !roomID ? (
            <div className="text-center text-xl opacity-70 mt-24 animate-pulse">
              ⏳ Searching for a match...
            </div>
          ) : (
            messages &&
            messages.map((msg, index) => {
              const isCurrentUser = msg.sender === socketID;
              const senderName = isCurrentUser ? 'You' : (randomChat ? 'Anonymous' : msg.username);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[75%]">
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                      {senderName}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl shadow-md text-sm break-words transition-all bg-gradient-to-br ${isCurrentUser ? userMsgBg : otherMsgBg
                      }`}>
                      {msg.message}
                    </div>
                  </div>
                </motion.div>
              )
            })
          )
        }
      </div>

      {/* Input Box */}
      <div className={`mt-auto z-10 backdrop-blur-md ${darkMode ? 'bg-white/5' : 'bg-white/70'} border-t ${darkMode ? 'border-white/10' : 'border-gray-300'} p-4 rounded-t-xl shadow-lg`}>
        <form onSubmit={onClick} className="flex items-center gap-3">
          <motion.div {...InputAnimation} className="flex-1">
            <Input
              ref={InputRef}
              placeholder="Type your message..."
              className={`${inputBg} ${placeholderColor} ${inputBorder} rounded-xl px-4 py-2 focus:ring-2 focus:ring-cyan-500`}
            />
          </motion.div>
          <motion.div {...ButtonAnimation}>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition-all">
              Send
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
