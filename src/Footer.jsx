import { useNavigate } from "react-router-dom";

export default function Footer() {

  const navigate = useNavigate();

  return (
    <footer className="relative bg-[#0b0b0f] text-white  border-t border-white/10 overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[140px] top-[-120px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[140px] bottom-[-120px] right-[-120px]" />

      <div className="relative max-w-7xl mx-auto px-8 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Career Assistant
            </h2>

            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Discover your ideal career path using AI-powered assessments,
              skill analysis, and expert mentorship.
            </p>

            <div className="flex gap-4 mt-6 text-xl">

              <span className="hover:text-purple-400 cursor-pointer">🌐</span>
              <span className="hover:text-purple-400 cursor-pointer">🐦</span>
              <span className="hover:text-purple-400 cursor-pointer">💼</span>
              <span className="hover:text-purple-400 cursor-pointer">📸</span>

            </div>
          </div>


          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>

            <ul className="space-y-3 text-gray-400 text-sm">

              <li onClick={()=>navigate("/")} className="hover:text-white cursor-pointer">Home</li>
              <li onClick={()=>navigate("/psychometric")} className="hover:text-white cursor-pointer">Psychometric Test</li>
              <li onClick={()=>navigate("/chat")} className="hover:text-white cursor-pointer">AI Career Chat</li>
              <li className="hover:text-white cursor-pointer">Mentorship</li>

            </ul>
          </div>


          {/* RESOURCES */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>

            <ul className="space-y-3 text-gray-400 text-sm">

              <li className="hover:text-white cursor-pointer">Career Guides</li>
              <li className="hover:text-white cursor-pointer">AI Insights</li>
              <li className="hover:text-white cursor-pointer">Learning Roadmaps</li>
              <li className="hover:text-white cursor-pointer">Blog</li>

            </ul>
          </div>


          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>

            <p className="text-gray-400 text-sm mb-4">
              Get career tips and AI insights directly to your inbox.
            </p>

            <div className="flex">

              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 bg-white/5 border border-white/10 rounded-l-xl px-4 py-2 text-sm outline-none focus:border-purple-500"
              />

              <button className="px-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-r-xl text-sm">
                Join
              </button>

            </div>
          </div>

        </div>


        {/* bottom line */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">

          <p>© 2026 AI Career Assistant. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">

            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Contact</span>

          </div>

        </div>

      </div>
    </footer>
  );
}