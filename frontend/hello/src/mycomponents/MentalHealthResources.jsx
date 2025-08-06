import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/store/User';

function MentalHealthResources() {
  const { darkMode } = useUser();

  const exercises = [
    {
      title: "🌬️ Deep Breathing",
      description: "Inhale slowly for 4 seconds, hold for 4, exhale for 6. Repeat 5 times. Focus only on your breath.",
    },
    {
      title: "🧘 Grounding (5-4-3-2-1)",
      description: "Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.",
    },
    {
      title: "📝 Journaling Prompt",
      description: "Write down: 'What emotion am I feeling right now? What do I need most today?'",
    },
  ];

  const contacts = [
    {
      name: "iCall – TISS",
      number: "+91 9152987821",
      info: "Free, confidential mental health support from trained counselors.",
      hours: "Available 24x7",
    },
    {
      name: "AASRA",
      number: "+91 9820466726",
      info: "Crisis intervention for suicidal thoughts and emotional distress.",
      hours: "Available 24x7",
    },
    {
      name: "Vandrevala Foundation Helpline",
      number: "1860 266 2345",
      info: "Professional mental health support in multiple languages.",
      hours: "Available 24x7",
    },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-900 dark:text-gray-100 px-6 py-12 transition-all duration-300 ease-in-out">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Header */}
          <motion.h1
            className="text-4xl font-bold text-center text-teal-700 dark:text-cyan-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🧘 Mental Health Exercises & Helplines
          </motion.h1>

          {/* Exercises Section */}
          <motion.section
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-teal-600 dark:text-cyan-200">Gentle Exercises</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {exercises.map((ex, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 bg-white/90 dark:bg-slate-800 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.15, duration: 0.4 }}
                >
                  <h3 className="text-lg font-bold text-teal-700 dark:text-cyan-300">{ex.title}</h3>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{ex.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Helplines Section */}
          <motion.section
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-teal-600 dark:text-cyan-200">Mental Health Helplines</h2>
            <div className="space-y-4">
              {contacts.map((c, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 bg-white/90 dark:bg-slate-800 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all transform hover:scale-[1.015]"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-teal-700 dark:text-cyan-300">{c.name}</h3>
                  <p className="text-sm dark:text-gray-300">{c.info}</p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                    📞 <span className="font-medium">{c.number}</span> – <em>{c.hours}</em>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Reminder */}
          <motion.p
            className="text-center text-sm text-gray-600 dark:text-gray-400 italic pt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You are not alone. There's always someone willing to listen. 💛
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default MentalHealthResources;
