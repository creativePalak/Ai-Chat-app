import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaDice, FaMoon, FaSun } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/store/User';
import { motion } from 'framer-motion';

function Login() {
  const navigate = useNavigate();
  const { username, setUsername, setLogin, darkMode, setDarkMode } = useUser();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setError('');
      setLogin(true);
      navigate('/');
    } else {
      setError('Username cannot be empty');
    }
  };

  const fetchRandomUsername = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      setUsername(data.results[0].login.username);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ${darkMode ? 'bg-[#0D1117]' : 'bg-white'}`}>
      
      {/* Dark/Light Mode Toggle */}
      <div className="absolute top-5 right-5 z-10">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 transition"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-900" />}
        </button>
      </div>

      {/* Left Panel */}
      <div className={`flex-1 flex flex-col justify-center items-center text-center px-6 py-12 ${darkMode ? 'bg-[#161B22] text-white' : 'bg-gradient-to-b from-[#E0F7FA] to-white text-gray-800'}`}>
        
        <motion.h1
          className="text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          EchoCare
        </motion.h1>

        <motion.p
          className="text-lg max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your feelings matter. EchoCare listens, understands, and supports — one message at a time.
        </motion.p>

        <motion.img
          src="/image.png"
          alt="Mental wellness"
          className="w-64 md:w-80 mt-10 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [30, 20, 30] }}
          transition={{ delay: 0.5, duration: 4 }}
        />

        <motion.footer
          className="mt-10 text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          © {new Date().getFullYear()} EchoCare · You are not alone 💙
        </motion.footer>
      </div>

      {/* Right Panel – Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#000000] via-[#190b31] to-[#1d0825] p-8">
        <motion.div
          className={`w-full max-w-md p-8 rounded-3xl shadow-2xl border backdrop-blur-md transition-all duration-300 ${
            darkMode
              ? 'bg-[#0D1117]/70 border-[#30363d] text-white'
              : 'bg-white/10 border-white/20 text-white'
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ✨ Join the Journey
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Username</label>
              <div className="flex items-center gap-3">
                <Input
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-zinc-400 ${
                    darkMode
                      ? 'bg-[#161B22] text-white border-[#30363d] focus:ring-cyan-400'
                      : 'bg-white text-black border-zinc-300 focus:ring-cyan-500'
                  }`}
                  placeholder="e.g. tyler_durden"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={fetchRandomUsername}
                  className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg shadow hover:scale-110 transition-transform"
                >
                  <FaDice />
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
            >
              Enter
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
