// src/pages/Chatbot.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/store/User";
import { GoogleGenAI } from "@google/genai";

// Gemini API Setup


function Chatbot() {
  const GEMINI_API_KEY = "AIzaSyDeZEHhlpts4zzLkcsPsHg9WtJe44CrZ8U"; // Store securely in production!

  const [typingDots, setTypingDots] = useState(".");

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  async function main(prompt) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  }

  async function callGemini(prompt) {

    try {
      setLoading(true);
      const response = await main(prompt);
      setLoading(false);
      return response;
    } catch {
      setLoading(false);
      return "⚠ I'm facing a glitch. Please try again later.";
    }
  }
  const { username } = useUser();
  console.log("Username from context:", username);
  const [nameUsed, setNameUsed] = useState(false);
  const [preferredLang, setPreferredLang] = useState(null);
  const [chatLog, setChatLog] = useState([]);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setTypingDots((prev) =>
        prev.length >= 3 ? "." : prev + "."
      );
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);


  useEffect(() => {
    addBotMessage("👋 Hi! I'm your AI health assistant. How can I help you today?");
  }, []);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [chatLog]);

  const addBotMessage = (msg) => setChatLog((log) => [...log, { from: "bot", text: msg }]);
  const addUserMessage = (msg) => setChatLog((log) => [...log, { from: "user", text: msg }]);

  const needsFirstAidCheck = async (userInput, username) => {
    const prompt = `You are a compassionate and emotionally intelligent professional health care doctor designed to support users going through emotional or mental stress. Your role is to deeply understand the user's emotional state from their message, and respond in a way that brings comfort, clarity, and hope.

Here’s what the user said: "${userInput}"

The user's name is: ${username}

Your response should:
- Gently interpret the user's emotional state based on what they said.
- Offer validation (let them know it’s okay to feel how they feel).
- Provide comforting, uplifting, and calming words — like a kind friend would.
- Share practical, gentle suggestions that may help them feel even a little bit better.
- Use natural, human-like tone with warmth and empathy.
- Keep your response short (max 5-6 lines).
- Do **not** recommend therapy, professional help, or say "I'm not a professional".
- Do **not** say "I understand how you feel" — instead, reflect and respond to their emotion sincerely.
- If appropriate, use soft emojis to enhance emotional support.

⚠ Only respond with your empathetic message. Do not explain your reasoning or break character.

`;

    const result = await callGemini(prompt);
    return result.trim().toLowerCase().includes("yes");
  };


  const handleSubmit = async () => {
    const user_input = inputRef.current.value.trim();
    if (!user_input) return;

    addUserMessage(user_input);
    inputRef.current.value = "";
    const lowerInput = user_input.toLowerCase();

    // Detect language
    let languageToUse = preferredLang;
    if (!preferredLang) {
      const langDetectPrompt = `Detect the language of this message: '${user_input}'. Reply with the language name only.`;
      const detected = await callGemini(langDetectPrompt);
      const lang = detected.trim().toLowerCase();
      languageToUse = lang === "hinglish" ? "Hindi" : lang.charAt(0).toUpperCase() + lang.slice(1);
      setPreferredLang(languageToUse);
    }

    // First aid check before name
    if (!username) {
      const needsAid = await needsFirstAidCheck(user_input, languageToUse);
      if (needsAid) {
        const aidPrompt = `
You are a multilingual AI health assistant. The user said: "${user_input}"

Your goals:
1. Reply *only* in this language: *${languageToUse}*.
2. Use bullet points or tables if helpful.
3. Provide basic first aid instructions.
4. Keep reply short and clear.
`;
        const reply = await callGemini(aidPrompt);
        addBotMessage(reply);
        addBotMessage("👋 By the way, may I know your name?");
        return;
      }
    }

    // Name extraction
    if (!username) {
      const namePrompt = `Extract the user's first name from this input: '${user_input}'. Reply with only the name.`;
      let name = await callGemini(namePrompt);
      name = name.trim().split(" ").pop() || "Unknown";
      setUsername(name);
      setNameUsed(false);
      const nameDisplay = ["unknown", "input"].includes(name.toLowerCase()) ? "friend" : name;
      addBotMessage(`Nice to meet you, ${nameDisplay}! 😊 How are you feeling today?`);
      return;
    }

    // First aid check mid-chat
    const isFirstAid = await needsFirstAidCheck(user_input, languageToUse);
    let modifiedInput = user_input;
    if (isFirstAid && !lowerInput.includes("first aid")) {
      modifiedInput += ". Please provide basic first aid instructions first, then recommend seeing a doctor.";
    }

    const prompt = `
You are a multilingual AI health assistant. The user said: "${modifiedInput}"

Your goals:
1. Reply *only* in this language: *${languageToUse}*. Do NOT translate or mix English unless it's Hinglish.
2. Use bullet points or tables if it helps – avoid long paragraphs.
3. Keep replies short (3–6 lines max).
4. Add emojis naturally unless user asks not to.
5. Use the name "${username}" only once per session.
6. If user asks “what’s my name?”, answer correctly.
7. Provide basic first aid info or over-the-counter medicine when relevant, but suggest seeing a doctor.
8. Fix typos and handle misspellings smartly.
9. Don't say “Oops hiccup” – just recover smartly.
`;

    const reply = await callGemini(prompt);
    if (reply.toLowerCase().includes(username?.toLowerCase())) setNameUsed(true);
    addBotMessage(reply);
  };

  return (
    <div className="h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col px-4 py-6 transition-colors duration-500">

      <div className="w-full max-w-2xl mx-auto flex flex-col h-full flex-grow">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
          >
            ← Back
          </button>
          <h1 className="text-xl font-semibold">🩺 AI Health Assistant</h1>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {chatLog.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`my-2 flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs text-sm ${msg.from === "bot"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    : "bg-blue-600 text-white"
                  }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg text-gray-500 italic ml-2 animate-pulse"
            >
              typing{typingDots}
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
              placeholder="Type your message..."
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Send
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>

  );
}

export default Chatbot;
