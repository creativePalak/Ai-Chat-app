import React, { useState, useEffect } from 'react';
import MyCard from './MyCard';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/store/User';
import socket from '@/socket/socket';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useUser();
  const [waitingRandom, setWaitingRandom] = useState(0);

  const Options = [
    {
      id: 1,
      title: 'Connect with Someone',
      description: 'Anonymously share your thoughts in a calm space.',
      Active: `Currently Available: ${waitingRandom}`,
      onClick: () => navigate('/random'),
      type: 'join',
    },
    {
      id: 2,
      title: 'Talk to Your Assistant',
      description: 'Get gentle advice from our AI mental health assistant.',
      Active: 'Always Here for You 🤖',
      onClick: () => navigate('/ai-chat'),
      type: 'ai',
    },
  ];

  const thoughts = [
    "You deserve to be heard.",
    "It's okay to pause and breathe.",
    "You're doing the best you can.",
    "Let your mind rest for a moment.",
    "Every feeling is valid.",
    "You're not alone in this journey.",
    "Gentleness is powerful.",
    "Hope begins with a small step.",
  ];

  const [thought, setThought] = useState('');

  useEffect(() => {
    const random = thoughts[Math.floor(Math.random() * thoughts.length)];
    setThought(random);
  }, []);

  useEffect(() => {
    socket.emit('waiting:users');
    if (!socket.connected) socket.connect();

    socket.on('random:waiting', (length) => {
      setWaitingRandom(length);
    });

    return () => {
      socket.off('random:waiting');
      setWaitingRandom(0);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f0f4f8] to-[#e8f5e9] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#111827] px-4 py-16 flex flex-col items-center justify-start text-gray-800 dark:text-white transition-all">

      {/* Toggle Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white/20 dark:bg-white/10 p-2 rounded-full hover:bg-white/30 transition"
        >
          {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-blue-800" />}
        </button>
      </div>

      {/* Intro Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-[0_0_40px_#a7ffeb50] p-10 text-center space-y-6 mb-14"
      >
        <motion.h1 className="text-4xl md:text-5xl font-semibold text-teal-700 dark:text-cyan-300">
          Welcome to <span className="text-cyan-700 dark:text-white">EchoCare</span> 🌸
        </motion.h1>

        <motion.p className="text-lg md:text-xl italic text-gray-600 dark:text-gray-300">
          “{thought}”
        </motion.p>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col md:flex-row gap-10 items-center justify-center w-full max-w-5xl mb-10"
      >
        {Options.map(({ id, title, description, Active, onClick, type }) => (
          <motion.div
            key={id}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 10px 30px rgba(0, 150, 136, 0.2)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="transition-transform duration-300"
          >
            <MyCard
              title={title}
              Description={description}
              Active={Active}
              onClick={onClick}
              type={type}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Feedback Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/feedback')}
        className="px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
      >
        💬 Give Feedback
      </motion.button>
      {/* Mental Health Resources Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <button
          onClick={() => navigate('/resources')}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-green-500 text-white font-medium shadow-md hover:from-teal-600 hover:to-green-600 transition-all"
        >
          🧘 View Mental Health Resources
        </button>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 w-full border-t border-gray-300 dark:border-gray-700 pt-8 pb-4 text-center text-sm text-gray-600 dark:text-gray-400 transition-all">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="text-base font-medium text-gray-700 dark:text-gray-200">
            🌿 EchoCare – A gentle place to rest your mind.
          </p>



          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} MindEase. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
