import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Chatbot from "./Chat";
import Profile from "./Profile";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Chatbot />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
