import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Hero Section */}
      <div className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-6">
          AI Career Assistant
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Get career guidance, coding help, and AI-powered learning support
          designed for developers and students.
        </p>

        <button
          onClick={() => navigate("/chat")}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:scale-105 transition"
        >
          Start Chatting
        </button>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-semibold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">💻 Coding Help</h3>
            <p className="text-gray-400">
              Ask coding questions, debug errors, and learn programming faster
              with AI assistance.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">🎓 Career Guidance</h3>
            <p className="text-gray-400">
              Get advice on learning paths, internships, and career growth
              in tech.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">⚡ Instant Answers</h3>
            <p className="text-gray-400">
              AI powered responses in seconds to help you learn and build faster.
            </p>
          </div>

        </div>
      </div>

      {/* How it Works */}
      <div className="bg-black border-t border-gray-800 py-20">

        <h2 className="text-3xl font-semibold text-center mb-12">
          How It Works
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">

          <div className="text-center">
            <div className="text-4xl mb-4">1️⃣</div>
            <h3 className="text-lg font-semibold">Create an Account</h3>
            <p className="text-gray-400 mt-2">
              Sign up quickly using email or Google login.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">2️⃣</div>
            <h3 className="text-lg font-semibold">Ask Your Questions</h3>
            <p className="text-gray-400 mt-2">
              Chat with AI about coding, projects, or career advice.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">3️⃣</div>
            <h3 className="text-lg font-semibold">Get Smart Answers</h3>
            <p className="text-gray-400 mt-2">
              Receive AI-powered responses instantly.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
