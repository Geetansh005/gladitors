import { useState } from "react";

export default function Assessment() {

  const questions = [
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
      question: "Are you comfortable working with numbers and data?",
      options: [
        "Yes",
        "Somewhat",
        "Not really",
        "No"
      ]
    },
    {
      question: "Do you enjoy coding or building software?",
      options: [
        "Yes, a lot",
        "Sometimes",
        "Not much",
        "No"
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
      question: "Are you more:",
      options: [
        "Creative",
        "Analytical",
        "Balanced",
        "Unsure"
      ]
    },
    {
      question: "Would you rather work:",
      options: [
        "In an office",
        "Outdoors",
        "Remotely",
        "Hybrid"
      ]
    },
    {
      question: "Do you prefer:",
      options: [
        "Stable routine work",
        "New challenges every day",
        "Flexible tasks",
        "Not sure"
      ]
    },
    {
      question: "What is your main career goal?",
      options: [
        "High salary",
        "Creativity",
        "Helping society",
        "Job security"
      ]
    },
    {
      question: "If a project fails, what do you do?",
      options: [
        "Analyze the problem",
        "Ask for help",
        "Try a new approach",
        "Move to another task"
      ]
    }
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleSelect = (option) => {
    setAnswers({
      ...answers,
      [step]: option
    });
  };

  const next = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const submit = () => {
    console.log("User Answers:", answers);
    alert("Assessment submitted! AI will analyze your career path.");
  };

  const current = questions[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex justify-center items-center p-6">

      <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-xl p-8">

        <h2 className="text-xl font-semibold mb-6">
          Question {step + 1} / {questions.length}
        </h2>

        <p className="text-lg mb-6">{current.question}</p>

        <div className="space-y-3">

          {current.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-3 rounded-lg border ${
                answers[step] === option
                  ? "bg-purple-600 border-purple-500"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700"
              }`}
            >
              {option}
            </button>
          ))}

        </div>

        <div className="flex justify-between mt-8">

          <button
            onClick={prev}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            Previous
          </button>

          {step === questions.length - 1 ? (
            <button
              onClick={submit}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={next}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            >
              Next
            </button>
          )}

        </div>

      </div>

    </div>
  );
}