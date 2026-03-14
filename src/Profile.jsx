import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user] = useState({
    name: "Geetansh Singh",
    email: "geetansh@email.com",
    joined: "March 2026",
    plan: "Free",
    chats: 12,
    model: "Llama 3"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex justify-center items-start p-8">

      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl relative">

        {/* Back Button */}
        <button
          onClick={() => navigate("/chat")}
          className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-md text-sm transition"
        >
          ← Back
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold">
            G
          </div>

          <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>

        {/* Account Info */}
        <div className="mt-8 space-y-4">

          <h3 className="text-lg font-semibold">Account</h3>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Joined</span>
            <span>{user.joined}</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Plan</span>
            <span>{user.plan}</span>
          </div>

        </div>

        {/* AI Stats */}
        <div className="mt-8 space-y-4">

          <h3 className="text-lg font-semibold">AI Usage</h3>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Total Chats</span>
            <span>{user.chats}</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">AI Model</span>
            <span>{user.model}</span>
          </div>

        </div>

        {/* Settings */}
        <div className="mt-8 space-y-3">

          <h3 className="text-lg font-semibold">Settings</h3>

          <button className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition">
            Edit Profile
          </button>

          <button className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition">
            Change Password
          </button>

          <button className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition">
            Download Chat Data
          </button>

        </div>

        {/* Logout */}
        <div className="mt-8">
          <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-lg hover:scale-105 transition">
            Logout
          </button>
        </div>

      </div>

    </div>
  );
}
