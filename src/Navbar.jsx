import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Real user data from MongoDB
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch real profile picture + name from MongoDB
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    setLoading(true);
    fetch("http://localhost:3000/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // Hide navbar on login page
  if (location.pathname === "/login") return null;

  return (
    <nav className="w-full bg-black border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo - Static App Name (unchanged) */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer font-[Electrolize]"
        >
          MENTORA.AI

        </h1>

        {/* Links */}
        <div className="flex items-center gap-6">

          <button
            onClick={() => navigate("/")}
            className="hover:text-purple-400"
          >
            Home
          </button>

          {token && (
            <button
              onClick={() => navigate("/chat")}
              className="hover:text-purple-400"
            >
              Chat
            </button>
          )}

          {/* NOT LOGGED IN */}
          {!token && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-purple-400"
              >
                Sign In
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:scale-105 transition"
              >
                Sign Up
              </button>
            </>
          )}

          {/* LOGGED IN - Real Profile Picture from MongoDB */}
          {token && (
            <>
              {/* Profile Icon - Now from MongoDB */}
              <div
                onClick={() => navigate("/profile")}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-purple-500 cursor-pointer hover:scale-105 transition"
              >
                {loading ? (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-xs">...</span>
                  </div>
                ) : user?.picture ? (
                  <img
                    src={user.picture}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-lg font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}