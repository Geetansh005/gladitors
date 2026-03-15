import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SelfAssessment() {
  const navigate = useNavigate();

  // ✅ FULL QUESTION POOL (13 questions)
  const questionPool = [
    {
      question: "Which activity do you enjoy the most?",
      options: [
        "Solving math problems",
        "Designing posters or graphics",
        "Helping people with problems",
        "Managing events"
      ]
    },
    {
      question: "Which subject do you enjoy most?",
      options: [
        "Mathematics",
        "Biology",
        "Computer Science",
        "Business Studies"
      ]
    },
    {
      question: "If money didn't matter, what would you do daily?",
      options: [
        "Build technology or apps",
        "Create art or design",
        "Help people solve problems",
        "Start businesses"
      ]
    },
    {
      question: "What type of YouTube/videos do you watch most?",
      options: [
        "Technology / Programming",
        "Business / Entrepreneurship",
        "Design / Creative content",
        "Science / Education"
      ]
    },
    {
      question: "Do you enjoy coding or building software?",
      options: [
        "Yes, very much",
        "Sometimes",
        "Not really",
        "Never tried"
      ]
    },
    {
      question: "Are you more:",
      options: [
        "Creative",
        "Analytical",
        "Balanced",
        "Unsure"
      ]
    },
    {
      question: "Do you prefer working:",
      options: [
        "In a team",
        "Alone",
        "Both",
        "Depends on project"
      ]
    },
    {
      question: "What motivates you the most?",
      options: [
        "High salary",
        "Creativity",
        "Helping people",
        "Innovation"
      ]
    },
    {
      question: "Do you like solving complex problems?",
      options: [
        "Yes",
        "Sometimes",
        "Rarely",
        "No"
      ]
    },
    {
      question: "What kind of work environment do you prefer?",
      options: [
        "Office",
        "Remote",
        "Hybrid",
        "Outdoor"
      ]
    },
    {
      question: "How do you usually approach a difficult task?",
      options: [
        "Analyze it step-by-step",
        "Ask others for help",
        "Experiment with solutions",
        "Avoid it"
      ]
    },
    {
      question: "Do you enjoy learning new technologies?",
      options: [
        "Yes, always",
        "Sometimes",
        "Rarely",
        "No"
      ]
    },
    {
      question: "What type of work excites you most?",
      options: [
        "Building software",
        "Designing creative things",
        "Running businesses",
        "Helping communities"
      ]
    }
  ];

  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Randomize and pick 10 questions
  useEffect(() => {
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
  }, []);

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading questions...</div>;
  }

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleSelect = (option) => {
    setAnswers({ ...answers, [step]: option });
  };

  const next = () => {
    if (answers[step]) setStep(step + 1);
  };

  const prev = () => {
    setStep(step - 1);
  };

  const submit = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch("http://localhost:3000/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.analysis);
        setSubmitted(true);
      } else {
        alert("AI analysis failed. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please check your connection.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex justify-center items-center p-6">

      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-10 shadow-xl">

        {/* Progress bar */}
        <div className="w-full bg-gray-800 h-2 rounded mb-6">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-400 text-sm mb-2">
          Question {step + 1} / {questions.length}
        </p>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-semibold mb-8">
              {current.question}
            </h2>

            <div className="space-y-4">
              {current.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    answers[step] === option
                      ? "bg-purple-600 border-purple-400 scale-[1.02]"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-10">
              <button
                onClick={prev}
                disabled={step === 0}
                className="px-5 py-2 bg-gray-700 rounded-lg disabled:opacity-40"
              >
                Previous
              </button>

              {step === questions.length - 1 ? (
                <button
                  onClick={submit}
                  disabled={!answers[step] || loadingAI}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg disabled:opacity-40"
                >
                  {loadingAI ? "AI is analyzing..." : "Submit & Get Roadmap"}
                </button>
              ) : (
                <button
                  onClick={next}
                  disabled={!answers[step]}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg disabled:opacity-40"
                >
                  Next
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Your Personalized Career Roadmap</h2>
            <div className="bg-gray-800 p-8 rounded-2xl text-left whitespace-pre-line text-sm leading-relaxed">
              {result}
            </div>

            <button
              onClick={() => navigate("/chat")}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:scale-105 transition"
            >
              Continue to AI Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}