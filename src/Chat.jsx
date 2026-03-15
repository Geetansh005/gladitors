import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Aurora from "./Aurora";

export default function Chatbot() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load user + fresh chat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("http://localhost:3000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
          setMessages([{
            role: "assistant",
            content: `Hello ${data.user.name} 👋 Starting a fresh chat! Ask me anything about careers or skills.`
          }]);
        } else {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Network error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const startNewChat = () => {
    setMessages([{
      role: "assistant",
      content: `Hello ${user?.name} 👋 Fresh chat started!`
    }]);
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black text-white">

      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
          amplitude={1.0}
          blend={0.6}
          speed={0.9}
        />
      </div>

      <div className="relative h-full flex z-10 overflow-hidden">

        {/* Sidebar */}
        <div className="w-72 hidden md:flex flex-col border-r border-white/10 p-6 backdrop-blur-2xl bg-black/40 overflow-hidden z-10">
          <h1 className="text-3xl font-bold tracking-tighter mb-10">AI Assistant</h1>

          <button
            onClick={startNewChat}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl font-medium text-lg hover:scale-105 transition-all shadow-2xl"
          >
            + New Chat
          </button>

          <div className="mt-auto text-xs uppercase tracking-widest text-gray-400">All chats saved</div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="h-16 border-b border-white/10 px-8 flex items-center justify-between backdrop-blur-2xl bg-black/50">
            <div className="font-semibold text-xl">AI Career Assistant</div>

            <div
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 cursor-pointer hover:ring-2 hover:ring-purple-500 transition"
            >
              {user?.picture ? (
                <img src={user.picture} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xl">
                  {user?.name?.[0]}
                </div>
              )}
            </div>
          </div>

          {/* Messages - ONLY this scrolls (scrollbar hidden) */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-2xl ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white/10 backdrop-blur-2xl border border-white/10 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-2xl px-6 py-3 rounded-3xl text-sm">AI is thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/10 bg-black/50 backdrop-blur-2xl">
            <div className="max-w-4xl mx-auto flex gap-3">
              <textarea
                rows="1"
                value={input}
                placeholder="Ask about careers, skills, jobs..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                className="flex-1 bg-white/5 border border-white/20 rounded-3xl px-6 py-4 resize-none outline-none focus:border-purple-500 placeholder-gray-400"
              />
              <button
                onClick={sendMessage}
                disabled={isTyping}
                className="px-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl hover:scale-105 transition-all disabled:opacity-50 font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}