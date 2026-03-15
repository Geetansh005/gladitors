import { useNavigate } from "react-router-dom";
import SkillAnalyzer from "./SkillAnalyzer";
import Footer from "./Footer";

export default function PsychometricTest() {

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">

      {/* animated glow background */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[160px] top-[-200px] left-[-200px] animate-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[160px] bottom-[-200px] right-[-200px] animate-pulse" />

      {/* HERO */}
      <section className="relative py-32 text-center px-6">

        {/* badge */}
        <div className="inline-block mb-6 px-6 py-2 border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 rounded-full text-sm backdrop-blur-lg">
          Scientific Career Assessment
        </div>

        {/* title */}
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          Psychometric Test
        </h1>

        {/* description */}
        <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
          Discover your true potential with an AI-powered scientific career
          assessment designed to match your personality, interests, and
          abilities with the most suitable career path.
        </p>

        {/* BUTTONS */}
        <div className="mt-12 flex flex-col items-center gap-6">

          {/* Chat with AI */}
          <button
            onClick={() => navigate("/chat")}
            className="px-12 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-110 transition duration-300 shadow-xl shadow-purple-500/30"
          >
            Chat with AI
          </button>

          {/* Take Test */}
          <button
            onClick={() => navigate("/assessment")}
            className="px-12 py-3 rounded-xl border border-purple-500 text-purple-400 hover:bg-purple-500/10 transition"
          >
            Take the Psychometric Test
          </button>

        </div>

      </section>


      {/* WHAT IS TEST */}
      <section className="text-center px-6 pb-16">

        <h2 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          What is the Psychometric Test?
        </h2>

        <p className="max-w-2xl mx-auto text-gray-400">
          A scientifically validated AI assessment that measures your
          cognitive abilities, personality traits, interests, and aptitude
          to recommend the most suitable career path.
        </p>

      </section>


      {/* FEATURE CARDS */}
      <section className="pb-28 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="group p-8 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-xl hover:border-purple-500 hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-4 text-purple-400 group-hover:scale-110 transition">
              🧠
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Personality Assessment
            </h3>

            <p className="text-gray-400 text-sm">
              Analyze your personality traits and behavior patterns
              to understand environments where you perform best.
            </p>
          </div>


          {/* CARD 2 */}
          <div className="group p-8 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-xl hover:border-blue-500 hover:-translate-y-2 transition duration-300">

            <div className="text-4xl mb-4 text-blue-400 group-hover:scale-110 transition">
              🎯
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Interest Mapping
            </h3>

            <p className="text-gray-400 text-sm">
              Discover what excites and motivates you so your career
              aligns with your passions.
            </p>

          </div>


          {/* CARD 3 */}
          <div className="group p-8 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-xl hover:border-cyan-400 hover:-translate-y-2 transition duration-300">

            <div className="text-4xl mb-4 text-cyan-400 group-hover:scale-110 transition">
              📈
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Aptitude Analysis
            </h3>

            <p className="text-gray-400 text-sm">
              Measure your analytical ability, reasoning, and problem
              solving skills to match career opportunities.
            </p>

          </div>

        </div>

      </section>


      {/* VIDEO SECTION */}
      <section className="py-24 px-6 border-t border-gray-800">

        <h2 className="text-4xl text-center font-semibold mb-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          See How AI Guides Your Career
        </h2>

        <div className="max-w-6xl mx-auto">

          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-xl shadow-purple-500/10">

            <video
              className="w-full h-[420px] object-cover"
              controls
              autoPlay
              muted
              loop
            >
              <source src="video.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

          </div>

        </div>

      </section>


      {/* NEXT STEPS */}
      <section className="py-24 px-6 border-t border-gray-800">

        <h2 className="text-4xl text-center font-semibold mb-14 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Explore More Career Guidance
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          {/* AI CHAT CARD */}
          <div
            onClick={() => navigate("/chat")}
            className="group cursor-pointer p-10 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-xl hover:border-purple-500 hover:-translate-y-2 transition duration-300 shadow-xl shadow-purple-500/10"
          >

            <div className="text-5xl mb-6 text-purple-400 group-hover:scale-110 transition">
              🤖
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              AI Career Chatbot
            </h3>

            <p className="text-gray-400">
              Talk with our AI assistant to get instant guidance on
              careers, skills, learning paths, and job opportunities.
            </p>

            <div className="mt-6 text-purple-400 font-semibold group-hover:underline">
              Start Chat →
            </div>

          </div>


          {/* MENTORSHIP CARD */}
          <div
            className="group cursor-pointer p-10 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-xl hover:border-cyan-400 hover:-translate-y-2 transition duration-300 shadow-xl shadow-cyan-500/10"
          >

            <div className="text-5xl mb-6 text-cyan-400 group-hover:scale-110 transition">
              🎓
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Expert Mentorship
            </h3>

            <p className="text-gray-400">
              Learn directly from industry mentors through curated
              videos, guidance sessions, and real career insights.
            </p>

            <div className="mt-6 text-cyan-400 font-semibold group-hover:underline">
              Explore Mentors →
            </div>

          </div>

        </div>

      </section>


      {/* SKILL ANALYZER */}
      <SkillAnalyzer />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}