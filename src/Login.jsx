import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mode, setMode] = useState("login");
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();

  const CLIENT_ID =
    "1072374566517-gk20td2ha6m61d76d1u3bprd0973rtql.apps.googleusercontent.com";

  // Google login handler
  const handleCredentialResponse = async (response) => {
    console.log("Google token received");

    const res = await fetch("http://localhost:3000/api/verify-google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: response.credential }),
    });

    const data = await res.json();

    if (data.success) {
  setGoogleUser(data.user);
  alert(`Welcome ${data.user.name}!`);

  // redirect to chat page
  navigate("/chat");

} else {
  alert("Login failed: " + data.message);
}
  };

  // Initialize Google button
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-button"),
          {
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
          }
        );
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Container */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex overflow-hidden">

        {/* LEFT SIDE */}
        <div className="hidden md:flex w-1/2 bg-blue-600 text-white flex-col justify-center items-center p-12">

          <h1 className="text-4xl font-bold mb-6">
            AI Career Assistant
          </h1>

          <p className="text-lg text-center max-w-md leading-relaxed">
            Get career guidance, AI insights, and smarter learning paths
            to accelerate your future.
          </p>

          <div className="mt-10 text-sm opacity-80">
            Built for developers & students
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          <h2 className="text-2xl font-semibold mb-2">
            {mode === "login" && "Welcome Back"}
            {mode === "signup" && "Create your account"}
            {mode === "forgot" && "Reset Password"}
          </h2>

          <p className="text-gray-500 mb-8">
            {mode === "login" && "Login to continue"}
            {mode === "signup" && "Start your journey"}
            {mode === "forgot" && "We'll send you a reset link"}
          </p>

          {/* NAME */}
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* PASSWORD */}
          {mode !== "forgot" && (
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* FORGOT PASSWORD */}
          {mode === "login" && (
            <p
              className="text-sm text-blue-600 mb-5 cursor-pointer hover:underline"
              onClick={() => setMode("forgot")}
            >
              Forgot password?
            </p>
          )}

          {/* MAIN BUTTON */}
          <button className="w-full bg-blue-600 text-white p-3 rounded-md mb-6 hover:bg-blue-700 transition">
            {mode === "login" && "Login"}
            {mode === "signup" && "Sign Up"}
            {mode === "forgot" && "Send Reset Link"}
          </button>

          {/* DIVIDER */}
          {mode !== "forgot" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <span className="text-gray-400 text-sm">or</span>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
              </div>

              {/* GOOGLE BUTTON */}
              <div id="google-button" className="w-full mb-4 flex justify-center"></div>

              {/* GOOGLE USER INFO */}
              {googleUser && (
                <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
                  <img
                    src={googleUser.picture}
                    alt="profile"
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                  />
                  <p className="font-semibold text-lg">{googleUser.name}</p>
                  <p className="text-sm text-gray-600">{googleUser.email}</p>
                  <p className="text-xs text-green-600 mt-2">
                    Successfully logged in with Google
                  </p>
                </div>
              )}
            </>
          )}

          {/* SWITCH MODES */}

          {mode === "login" && (
            <p className="text-sm text-gray-500 mt-8">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setMode("signup")}
              >
                Sign up
              </span>
            </p>
          )}

          {mode === "signup" && (
            <p className="text-sm text-gray-500 mt-8">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </p>
          )}

          {mode === "forgot" && (
            <p className="text-sm text-gray-500 mt-8">
              Remember your password?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default Login;