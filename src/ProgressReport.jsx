import { useState } from "react";

export default function ProgressReport() {

  const [data] = useState({
    name: "Geetansh",
    assessments: 4,
    chats: 21,
    resume: true,
    career: "AI Engineer",
    skills: [
      { name: "Logic", value: 80 },
      { name: "Communication", value: 65 },
      { name: "Creativity", value: 72 },
      { name: "Technical", value: 88 }
    ]
  });

  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="min-h-screen bg-[#07070a] text-white flex justify-center p-10">

      <div className="w-full max-w-5xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">

          <h1 className="text-3xl font-[Electrolize] font-bold text-cyan-400 flex items-center gap-3">
             Student Progress
          </h1>

          <div className="text-gray-400 text-sm">
            AI Career Assistant
          </div>

        </div>


        {/* STUDENT INFO */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-[#0f0f14] border border-cyan-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Assessments</p>
            <h2 className="text-2xl text-cyan-400 font-bold">
              {data.assessments}
            </h2>
          </div>

          <div className="bg-[#0f0f14] border border-purple-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm">AI Chats</p>
            <h2 className="text-2xl text-purple-400 font-bold">
              {data.chats}
            </h2>
          </div>

          <div className="bg-[#0f0f14] border border-green-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Resume</p>
            <h2 className="text-2xl text-green-400 font-bold">
              {data.resume ? "Uploaded" : "Missing"}
            </h2>
          </div>

        </div>


        {/* SKILL GRAPH + DETAILS */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">

          {/* CIRCULAR GRAPH */}
          <div className="bg-[#0f0f14] border border-cyan-500/20 rounded-xl p-8 flex flex-col items-center">

            <h2 className="text-lg text-cyan-400 mb-6">
              Skill Overview
            </h2>

            <svg width="220" height="220">

              {data.skills.map((skill, i) => {

                const offset =
                  circumference - (skill.value / 100) * circumference;

                return (
                  <circle
                    key={i}
                    cx="110"
                    cy="110"
                    r={radius - i * 10}
                    stroke="url(#grad)"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 110 110)"
                  />
                );
              })}

              <defs>
                <linearGradient id="grad">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

            </svg>

            <p className="text-gray-400 mt-4 text-sm">
              AI skill evaluation
            </p>

          </div>


          {/* SKILL LIST */}
          <div className="bg-[#0f0f14] border border-gray-800 rounded-xl p-8">

            <h2 className="text-lg text-purple-400 mb-6">
              Skill Breakdown
            </h2>

            <div className="space-y-4">

              {data.skills.map((skill, i) => (

                <div
                  key={i}
                  className="flex justify-between border-b border-gray-800 pb-2"
                >

                  <span className="text-gray-300">
                    {skill.name}
                  </span>

                  <span className="text-cyan-400">
                    {skill.value}%
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* CAREER RESULT */}
        <div className="bg-[#0f0f14] border border-purple-500/20 rounded-xl p-8 mb-10">

          <h2 className="text-gray-400 text-sm mb-2">
            AI Career Prediction
          </h2>

          <h3 className="text-3xl font-bold text-purple-400">
            {data.career}
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Based on your assessments, interests, and skills.
          </p>

        </div>


        {/* AI SUGGESTIONS */}
        <div className="bg-[#0f0f14] border border-cyan-500/20 rounded-xl p-8">

          <h2 className="text-cyan-400 mb-4">
            AI Improvement Suggestions
          </h2>

          <ul className="text-gray-300 space-y-2 text-sm">

            <li>• Improve communication through presentations.</li>
            <li>• Practice coding challenges weekly.</li>
            <li>• Build 2 real-world projects.</li>
            <li>• Explore AI/ML fundamentals.</li>

          </ul>

        </div>

      </div>

    </div>
  );
}