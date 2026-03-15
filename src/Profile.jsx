import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);

  const [newName, setNewName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUser({
          ...data.user,
          plan: "Free",
          chats: 12,
          model: "Llama 3",
        });

        setNewName(data.user.name);
      } else {
        setError(data.message || "Failed to load profile");

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateName = async () => {
    if (!newName.trim()) return;

    setModalLoading(true);
    setModalMessage("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await res.json();

      if (data.success) {
        setUser((prev) => ({ ...prev, name: data.user.name }));

        setModalMessage("Name updated successfully ✅");

        setTimeout(() => {
          setShowEditModal(false);
          setModalMessage("");
        }, 1500);
      } else {
        setModalMessage(data.message || "Failed to update name");
      }
    } catch {
      setModalMessage("Network error");
    } finally {
      setModalLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setModalMessage("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setModalMessage("Password must be at least 6 characters");
      return;
    }

    setModalLoading(true);
    setModalMessage("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        setModalMessage("Password changed successfully ✅");

        setTimeout(() => {
          setShowChangePassModal(false);
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setModalMessage("");
        }, 2000);
      } else {
        setModalMessage(data.message || "Failed to change password");
      }
    } catch {
      setModalMessage("Network error");
    } finally {
      setModalLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white">
        <div className="text-red-500 text-xl">{error || "Profile not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex justify-center items-start p-8">

      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl relative">

        <button
          onClick={() => navigate("/chat")}
          className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-md text-sm transition"
        >
          ← Back
        </button>

        <div className="flex flex-col items-center">

          {user.picture ? (
            <img
              src={user.picture}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}

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

        {/* AI Usage */}
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

        {/* SETTINGS */}
        <div className="mt-8 space-y-3">

          <h3 className="text-lg font-semibold">Settings</h3>

          <button
            onClick={() => setShowEditModal(true)}
            className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={() => setShowChangePassModal(true)}
            className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            Change Password
          </button>

          <button className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition">
            Download Chat Data
          </button>

          {/* NEW FEATURE */}
          <button
            onClick={() => navigate("/progress")}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg hover:scale-105 transition shadow-lg shadow-purple-500/20"
          >
            📊 Progress Dashboard
          </button>

          <button
            onClick={() => navigate("/parent-dashboard")}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg hover:scale-105 transition shadow-lg shadow-cyan-500/20"
          >
            👨‍👩‍👧 Parent Dashboard
          </button>

        </div>

        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-lg hover:scale-105 transition"
          >
            Logout
          </button>
        </div>

      </div>

      {/* EDIT NAME MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">

            <h3 className="text-xl mb-4">Edit Name</h3>

            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-gray-800 p-3 rounded mb-4"
            />

            <button
              onClick={handleUpdateName}
              className="bg-purple-600 px-6 py-2 rounded"
            >
              Save
            </button>

          </div>

        </div>
      )}

    </div>
  );
}