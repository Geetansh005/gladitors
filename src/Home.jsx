import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Smart redirect: Logged out → Login → then back to /chat
  const handleStartTest = () => {
  if (isLoggedIn) {
    navigate("/assessment"); // go to career test
  } else {
    navigate("/login", {
      state: { from: { pathname: "/assessment" } }
    });
  }
};

  const careers = [
    "Artificial Intelligence",
    "Web Development",
    "Data Science",
    "Cybersecurity",
    "UI / UX Design",
    "Digital Marketing",
  ];

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl font-bold mb-6">
          Find Your Perfect Career Path with AI
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our AI analyzes your interests, skills, and academic background to recommend the best career path and learning roadmap.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleStartTest}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:scale-105 transition"
          >
           {isLoggedIn ? "Continue Assessment" : "Start Career Test"}  </button>

          <button
            onClick={handleStartTest}
            className="px-8 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            Get AI Guidance
          </button>
        </div>
      </section>

      {/* AI CAREER TEST */}
      <section className="py-20 text-center px-6 border-t border-gray-800">
        <h2 className="text-3xl font-semibold mb-6">AI Career Assessment</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Answer a few questions about your interests, personality, and skills. Our AI will analyze your responses and suggest the best career options for you.
        </p>

        <button
          onClick={handleStartTest}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:scale-105 transition"
        >
          {isLoggedIn ? "Continue to AI Chat" : "Take the Test"}
        </button>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 border-t border-gray-800 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-semibold">Take AI Test</h3>
            <p className="text-gray-400 text-sm mt-2">Answer questions about your skills and interests.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-semibold">AI Analysis</h3>
            <p className="text-gray-400 text-sm mt-2">AI evaluates your personality and abilities.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-semibold">Career Suggestions</h3>
            <p className="text-gray-400 text-sm mt-2">Get personalized career recommendations.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-3xl mb-3">4️⃣</div>
            <h3 className="font-semibold">Learning Roadmap</h3>
            <p className="text-gray-400 text-sm mt-2">Follow courses and skill paths to reach your goal.</p>
          </div>
        </div>
      </section>

      {/* CAREER PATHS */}
      <section className="py-20 border-t border-gray-800 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Popular Career Paths</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {careers.map((career, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-2">{career}</h3>
              <p className="text-gray-400 text-sm">Explore roadmap, required skills, and career opportunities.</p>
              <button 
                onClick={handleStartTest}
                className="mt-4 text-purple-400 hover:underline"
              >
                View Roadmap →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* AI CHATBOT SECTION */}
      <section className="py-20 border-t border-gray-800 text-center px-6">
        <h2 className="text-3xl font-semibold mb-6">Ask the AI Career Assistant</h2>
        <p className="text-gray-400">Ask questions about careers, skills, and learning paths.</p>
        <button
          onClick={handleStartTest}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:scale-105 transition"
        >
          {isLoggedIn ? "Open AI Chat" : "Start Career Test"}
        </button>
      </section>

      {/* SIGNUP CTA - ONLY SHOW IF NOT LOGGED IN */}
      {!isLoggedIn && (
        <section className="py-20 border-t border-gray-800 text-center px-6">
          <h2 className="text-3xl font-semibold mb-6">Create Your Free Account</h2>
          <p className="text-gray-400">Save your career reports and track your progress.</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:scale-105 transition"
          >
            Sign Up Free
          </button>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-10 text-center text-gray-500">
        © 2026 AI Career Assistant
      </footer>
    </div>
  );
}