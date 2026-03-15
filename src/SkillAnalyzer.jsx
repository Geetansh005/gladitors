import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SkillAnalyzer() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [scores, setScores] = useState({
    math: 75,
    science: 75,
    social: 75,
    english: 75,
  });

  const [selected, setSelected] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const interests = [
    { id: 1, label: "Logic & Puzzles", icon: "🧠" },
    { id: 2, label: "Literature", icon: "📖" },
    { id: 3, label: "Coding & Tech", icon: "💻" },
    { id: 4, label: "Art & Design", icon: "🎨" },
    { id: 5, label: "Leadership", icon: "👔" },
    { id: 6, label: "Public Speaking", icon: "🎤" },
    { id: 7, label: "Finance", icon: "💰" },
    { id: 8, label: "Social Service", icon: "❤️" },
    { id: 9, label: "Experiments", icon: "🧪" },
    { id: 10, label: "Gaming", icon: "🎮" },
    { id: 11, label: "History", icon: "🏛️" },
    { id: 12, label: "Astronomy", icon: "🚀" },
  ];

  const updateScore = (subject, value) => {
    setScores({ ...scores, [subject]: parseInt(value) });
  };

  const toggleInterest = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const goToNext = async () => {

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {

      if (selected.length < 3) {
        alert("Please select at least 3 interests");
        return;
      }

      setStep(3);
      setLoadingAI(true);

      try {

        const res = await fetch("http://localhost:3000/api/assessment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            answers: scores,
            interests: selected.map(
              (id) => interests.find((i) => i.id === id).label
            ),
          }),
        });

        const data = await res.json();
        setAnalysis(data.analysis || "AI analysis completed!");

      } catch {
        setAnalysis(
          "Analysis completed! Based on your skills and interests, we will recommend the best career path for you."
        );
      } finally {
        setLoadingAI(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center p-8 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[160px] top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[160px] bottom-[-150px] right-[-150px]" />

      <div className="relative w-full max-w-6xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-xl overflow-hidden">

        <div className="flex">

          {/* SIDEBAR */}
          <div className="w-72 border-r border-white/10 p-10 hidden md:block">

            <div className="mb-6 inline-block px-4 py-1 text-xs font-medium bg-purple-500/20 text-purple-400 rounded-full">
              CLASS 10 SPECIAL
            </div>

            <h1 className="text-3xl font-bold mb-12">
              Find Your Perfect Stream
            </h1>

            <div className="space-y-10">

              {[1, 2, 3].map((num) => {
                const labels = ["Academics", "Interests", "Analysis"];

                return (
                  <div
                    key={num}
                    className={`flex items-center gap-4 transition ${
                      step === num ? "text-white" : "opacity-40"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${
                        step === num
                          ? "bg-gradient-to-br from-purple-500 to-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {num}
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">STEP 0{num}</p>
                      <p className="font-medium">{labels[num - 1]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 p-12">

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="text-3xl font-semibold mb-2">
                  How are your grades looking?
                </h2>

                <p className="text-gray-400 mb-10">
                  Use the sliders to set your approximate percentage in key subjects.
                </p>

                <div className="grid md:grid-cols-2 gap-6">

                  {Object.keys(scores).map((subject) => (
                    <div
                      key={subject}
                      className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:border-purple-500/40 transition"
                    >
                      <div className="flex justify-between mb-5">

                        <div className="flex items-center gap-3">
                          <div className="text-3xl">
                            {subject === "math"
                              ? "🧮"
                              : subject === "science"
                              ? "⚗️"
                              : subject === "social"
                              ? "🌍"
                              : "📖"}
                          </div>

                          <span className="capitalize text-lg font-medium">
                            {subject}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-3xl font-bold text-purple-400">
                            {scores[subject]}
                          </span>
                          <span className="text-xs block text-gray-500">
                            SCORE
                          </span>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={scores[subject]}
                        onChange={(e) =>
                          updateScore(subject, e.target.value)
                        }
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={goToNext}
                    className="px-10 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:scale-105 transition"
                  >
                    Continue to Interests →
                  </button>
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h2 className="text-3xl font-semibold mb-2">
                  What sparks your curiosity?
                </h2>

                <p className="text-gray-400 mb-8">
                  Select at least 3 topics that you naturally gravitate towards.
                </p>

                <div className="flex justify-end mb-6">
                  <div className="px-5 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {selected.length} Selected
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                  {interests.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      className={`p-6 rounded-xl border cursor-pointer transition hover:scale-105 ${
                        selected.includes(item.id)
                          ? "bg-purple-500/20 border-purple-500"
                          : "bg-white/[0.04] border-white/10 hover:border-purple-400"
                      }`}
                    >
                      <div className="text-3xl mb-3 text-center">
                        {item.icon}
                      </div>

                      <p className="text-center font-medium">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex justify-between">

                  <button
                    onClick={() => setStep(1)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    ← Back
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={selected.length < 3}
                    className={`px-10 py-3 rounded-xl ${
                      selected.length >= 3
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105"
                        : "bg-gray-700 cursor-not-allowed"
                    }`}
                  >
                    Analyze My Profile →
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="text-center py-10">

                <h2 className="text-3xl font-semibold mb-6">
                  Your Personalized Career Analysis
                </h2>

                <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto">

                  {loadingAI ? (
                    <p className="animate-pulse text-purple-400">
                      AI is generating your roadmap...
                    </p>
                  ) : (
                    <div className="text-lg whitespace-pre-line">
                      {analysis}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate("/chat")}
                  className="mt-10 px-10 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:scale-105 transition"
                >
                  Go to AI Chat →
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}