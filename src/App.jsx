import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Chatbot from "./Chat";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      {/* Protected pages */}

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
  );
}

export default App;
