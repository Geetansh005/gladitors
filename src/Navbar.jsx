import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // hide navbar on login page
  if (location.pathname === "/login") return null;

  return (
    <nav className="w-full bg-black border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          AI Career Assistant
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

          {/* LOGGED IN */}
          {token && (
            <>
              {/* Profile Icon */}
              <div
                onClick={() => navigate("/profile")}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer hover:scale-105 transition"
              >
                👤
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