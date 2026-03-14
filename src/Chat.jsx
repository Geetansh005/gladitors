import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello Geetansh 👋 Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();


  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "This is an AI response 🤖" }
      ]);
    }, 700);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">

      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-6">AI Assistant</h1>

        <button className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg hover:scale-105 transition">
          + New Chat
        </button>

        <div className="mt-6 text-gray-400 text-sm">
          Recent Chats
        </div>

        <div className="mt-3 space-y-2 text-sm">
          <div className="p-2 hover:bg-gray-800 rounded cursor-pointer">
            AI detection
          </div>
          <div className="p-2 hover:bg-gray-800 rounded cursor-pointer">
            Coding help
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1">

       <div className="border-b border-gray-800 p-4 text-lg font-semibold backdrop-blur flex justify-between items-center">

  <span>AI Chat</span>

  {/* Profile Icon */}
  <div
    onClick={() => navigate("/profile")}
    className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer hover:scale-110 transition"
  >
    G
  </div>

</div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xl p-4 rounded-xl shadow-md ${
                  msg.role === "user"
                    ? "bg-blue-600"
                    : "bg-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800 flex gap-3">

          <input
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="px-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:scale-105 transition"
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
}