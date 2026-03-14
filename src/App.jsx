import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Chatbot from "./Chat";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;