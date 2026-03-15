import { useState } from "react";

export default function ParentDashboard() {

  const [chatEnabled, setChatEnabled] = useState(true);

  const child = {
    name: "Rahul Sharma",
    age: 16,
    grade: "Class 10",
    school: "Delhi Public School",
    screenTime: "1h 24m",
    lastAssessment: "12 March 2026",
    interests: ["Coding", "Astronomy", "Logic"],
    skills: {
      Math: 82,
      Science: 76,
      Communication: 65,
      Creativity: 71
    },
    careers: [
      "AI Engineer",
      "Data Scientist",
      "Software Developer"
    ],
    recentChats: [
      "How do I become an AI engineer?",
      "Best programming languages to learn",
      "What skills do data scientists need?"
    ]
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white p-10">

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Parent Control Center
        </h1>

        <p className="text-gray-400 mt-2">
          Monitor learning progress and manage AI guidance safely.
        </p>

      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* CHILD PROFILE */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

          <h2 className="text-xl font-semibold mb-6">
            Child Profile
          </h2>

          <div className="space-y-3 text-gray-300">

            <p><strong>Name:</strong> {child.name}</p>
            <p><strong>Age:</strong> {child.age}</p>
            <p><strong>Grade:</strong> {child.grade}</p>
            <p><strong>School:</strong> {child.school}</p>

          </div>

          <div className="mt-6 text-sm text-gray-400">
            Last assessment: {child.lastAssessment}
          </div>

        </div>


        {/* AI CONTROLS */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

          <h2 className="text-xl font-semibold mb-6">
            AI Permissions
          </h2>

          <div className="flex justify-between items-center mb-4">

            <span>Allow AI Chat</span>

            <button
              onClick={() => setChatEnabled(!chatEnabled)}
              className={`px-4 py-2 rounded-lg transition ${
                chatEnabled ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {chatEnabled ? "Enabled" : "Disabled"}
            </button>

          </div>

          <div className="flex justify-between items-center">

            <span>Content Safety Level</span>

            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-md text-sm">
              Moderate
            </span>

          </div>

        </div>


        {/* USAGE */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

          <h2 className="text-xl font-semibold mb-6">
            Usage Insights
          </h2>

          <div className="space-y-4 text-gray-300">

            <p>Daily AI Usage: {child.screenTime}</p>

            <p>Active Interests:</p>

            <div className="flex flex-wrap gap-2">

              {child.interests.map((item,i)=>(
                <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-md text-sm">
                  {item}
                </span>
              ))}

            </div>

          </div>

        </div>

      </div>


      {/* SKILL ANALYTICS */}
      <div className="mt-12 bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">

        <h2 className="text-2xl font-semibold mb-8">
          Skill Strength Analysis
        </h2>

        <div className="space-y-6">

          {Object.entries(child.skills).map(([skill,value])=>(
            <div key={skill}>

              <div className="flex justify-between mb-2">
                <span>{skill}</span>
                <span className="text-purple-400">{value}%</span>
              </div>

              <div className="w-full bg-gray-800 rounded-full h-3">

                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                  style={{width:`${value}%`}}
                />

              </div>

            </div>
          ))}

        </div>

      </div>


      {/* CAREER SUGGESTIONS */}
      <div className="mt-12">

        <h2 className="text-2xl font-semibold mb-6">
          Recommended Careers
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {child.careers.map((career,i)=>(
            <div
              key={i}
              className="p-6 border border-white/10 rounded-xl bg-white/[0.03] hover:border-purple-400 transition"
            >

              <h3 className="text-lg font-semibold mb-2">
                {career}
              </h3>

              <p className="text-gray-400 text-sm">
                Suggested by AI based on skills and interests.
              </p>

            </div>
          ))}

        </div>

      </div>


      {/* CHAT ACTIVITY */}
      <div className="mt-12 bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">

        <h2 className="text-2xl font-semibold mb-6">
          Recent AI Chat Activity
        </h2>

        <ul className="space-y-4 text-gray-300">

          {child.recentChats.map((chat,i)=>(
            <li key={i} className="border-b border-white/10 pb-2">
              {chat}
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}