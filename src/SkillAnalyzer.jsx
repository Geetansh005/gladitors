import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SkillAnalyzer() {

  const navigate = useNavigate();

  const [scores, setScores] = useState({
    math: 75,
    science: 75,
    social: 75,
    english: 75
  });

  const updateScore = (subject, value) => {
    setScores({ ...scores, [subject]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white flex">

      {/* SIDEBAR */}
      <div className="w-72 border-r border-gray-800 p-10 hidden md:flex flex-col">

        <div className="mb-12 text-xl font-semibold">
          Career Assessment
        </div>

        {/* STEP 1 */}
        <div className="flex items-center gap-4 mb-8">

          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            📘
          </div>

          <div>
            <p className="text-xs text-gray-400">STEP 01</p>
            <p className="font-semibold">Academics</p>
          </div>

        </div>

        {/* STEP 2 */}
        <div className="flex items-center gap-4 mb-8 opacity-50">

          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            ⭐
          </div>

          <div>
            <p className="text-xs text-gray-400">STEP 02</p>
            <p>Interests</p>
          </div>

        </div>

        {/* STEP 3 */}
        <div className="flex items-center gap-4 opacity-50">

          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            🧠
          </div>

          <div>
            <p className="text-xs text-gray-400">STEP 03</p>
            <p>Analysis</p>
          </div>

        </div>

      </div>


      {/* MAIN AREA */}
      <div className="flex-1 p-14">

        <h1 className="text-4xl font-bold mb-3">
          How are your grades looking?
        </h1>

        <p className="text-gray-400 mb-12">
          Use the sliders to set your approximate percentage in key subjects.
        </p>


        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">

          {/* MATH */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

            <div className="flex justify-between mb-4">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center">
                  🧮
                </div>
                <span className="font-semibold">Mathematics</span>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">{scores.math}%</p>
                <p className="text-xs text-gray-400">Score</p>
              </div>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={scores.math}
              onChange={(e) => updateScore("math", e.target.value)}
              className="w-full accent-blue-500"
            />

          </div>


          {/* SCIENCE */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

            <div className="flex justify-between mb-4">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600/20 text-green-400 rounded-lg flex items-center justify-center">
                  ⚛️
                </div>
                <span className="font-semibold">Science</span>
              </div>

              <div>
                <p className="text-2xl font-bold">{scores.science}%</p>
                <p className="text-xs text-gray-400">Score</p>
              </div>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={scores.science}
              onChange={(e) => updateScore("science", e.target.value)}
              className="w-full accent-green-500"
            />

          </div>


          {/* SOCIAL */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

            <div className="flex justify-between mb-4">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-600/20 text-yellow-400 rounded-lg flex items-center justify-center">
                  🌍
                </div>
                <span className="font-semibold">Social Science</span>
              </div>

              <div>
                <p className="text-2xl font-bold">{scores.social}%</p>
                <p className="text-xs text-gray-400">Score</p>
              </div>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={scores.social}
              onChange={(e) => updateScore("social", e.target.value)}
              className="w-full accent-yellow-500"
            />

          </div>


          {/* ENGLISH */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

            <div className="flex justify-between mb-4">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600/20 text-purple-400 rounded-lg flex items-center justify-center">
                  📖
                </div>
                <span className="font-semibold">English</span>
              </div>

              <div>
                <p className="text-2xl font-bold">{scores.english}%</p>
                <p className="text-xs text-gray-400">Score</p>
              </div>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={scores.english}
              onChange={(e) => updateScore("english", e.target.value)}
              className="w-full accent-purple-500"
            />

          </div>

        </div>


        {/* CONTINUE BUTTON */}
        <div className="mt-14">

          <button
            onClick={() => navigate("/interests")}
            className="px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:scale-105 transition shadow-lg"
          >
            Continue to Interests →
          </button>

        </div>

      </div>

    </div>
  );
}