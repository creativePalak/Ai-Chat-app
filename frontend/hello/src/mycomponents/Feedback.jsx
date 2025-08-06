// src/components/FeedbackForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/store/User';

function Feedback() {
  const { darkMode } = useUser();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    rating: '5',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', form);
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 py-12 transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-xl rounded-2xl shadow-2xl p-8 space-y-6 transition-all duration-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <h2 className="text-3xl font-bold text-center mb-2">📝 We'd Love Your Feedback</h2>
        <p className="text-center text-gray-400 text-sm">
          Help us improve EchoCare. Your thoughts are valuable. 💙
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-green-500 text-lg font-semibold"
          >
            🎉 Thank you for your feedback!
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Alex"
                className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none transition ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400'
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400'
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none transition ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400'
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400'
                }`}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block mb-1 text-sm font-medium">How would you rate your experience?</label>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none transition ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-cyan-400'
                    : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-400'
                }`}
              >
                <option value="5">🌟🌟🌟🌟🌟 - Excellent</option>
                <option value="4">🌟🌟🌟🌟 - Good</option>
                <option value="3">🌟🌟🌟 - Okay</option>
                <option value="2">🌟🌟 - Poor</option>
                <option value="1">🌟 - Terrible</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-sm font-medium">Any comments or suggestions?</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Share your thoughts..."
                className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none resize-none transition ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-400'
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400'
                }`}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`px-6 py-2 rounded-full text-white font-semibold shadow-md transition ${
                  darkMode
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                }`}
              >
                Submit Feedback
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default Feedback;
