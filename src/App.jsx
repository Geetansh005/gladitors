import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Chatbot from "./Chat";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import SelfAssessment from "./SelfAssessment";
import ProgressReport from "./ProgressReport";
import Navbar from "./Navbar";
import ParentDashboard from "./ParentDashboard";


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

        <Route
  path="/assessment"
  element={
    <ProtectedRoute>
      <SelfAssessment />
    </ProtectedRoute>
  }
/>
<Route
  path="/parent-dashboard"
  element={
    <ProtectedRoute>
      <ParentDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/progress"
  element={
    <ProtectedRoute>
      <ProgressReport />
    </ProtectedRoute>
  }
/>
      </Routes>
    </>
  );
}

export default App;