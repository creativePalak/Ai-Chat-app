import ChatBot from './ChatBot.jsx';
import { motion } from 'framer-motion';
import { Bot} from 'lucide-react';

function AiChat() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#e0f2f1] dark:from-[#0f172a] dark:via-[#1f2937] dark:to-[#111827] text-gray-900 dark:text-white flex flex-col items-center px-4 py-8 transition-all">


            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-6"
            >
                <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-semibold">
                    <Bot className="text-blue-500 w-7 h-7" />
                    AI Health Assistant 🤖
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Ask your health-related questions or just have a friendly chat!
                </p>
            </motion.div>

            {/* Chat container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="w-full max-w-2xl bg-white dark:bg-[#1f2937] border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden"
            >
                <ChatBot />
            </motion.div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6"
            >
                Your messages are private and secure. Stay safe 💙
            </motion.footer>
        </div>
    );
}

export default AiChat;
