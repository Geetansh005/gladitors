import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mode, setMode] = useState("login"); // login | signup | forgot | otp | reset
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();

  // Form states (controlled inputs) - ALL YOUR ORIGINAL STATES KEPT
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // === NEW STATES FOR FORGOT PASSWORD (added only) ===
  const [newPassword, setNewPassword] = useState("");
  const [isResetFlow, setIsResetFlow] = useState(false);

  const CLIENT_ID =
    "1072374566517-gk20td2ha6m61d76d1u3bprd0973rtql.apps.googleusercontent.com";

  // ==================== GOOGLE LOGIN (YOUR ORIGINAL CODE - UNCHANGED) ====================
  const handleCredentialResponse = async (response) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setGoogleUser(data.user);
        alert(`Welcome ${data.user.name}!`);
        navigate("/chat");
      } else {
        setMessage("Google login failed: " + data.message);
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize Google button - YOUR ORIGINAL CODE - UNCHANGED
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

  // ==================== EMAIL SIGNUP - YOUR ORIGINAL CODE - UNCHANGED ====================
  const handleSignup = async () => {
    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("OTP sent to your email! Please check inbox.");
        setMode("otp");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== OTP VERIFICATION (YOUR ORIGINAL + MINIMAL ADDITION FOR RESET) ====================
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setMessage("Please enter 6-digit OTP");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        if (isResetFlow) {
          // === ONLY THIS SMALL ADDITION FOR RESET FLOW ===
          setMode("reset");
          setMessage("OTP verified! Now create new password.");
        } else {
          // YOUR ORIGINAL SUCCESS LOGIC - 100% UNCHANGED
          localStorage.setItem("token", data.token);
          alert("Account verified successfully!");
          navigate("/chat");
        }
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== EMAIL LOGIN - YOUR ORIGINAL CODE - UNCHANGED ====================
  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        alert(`Welcome back!`);
        navigate("/chat");
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== NEW: FORGOT PASSWORD (send OTP) ====================
  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Email is required");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setIsResetFlow(true);
        setMessage("Reset OTP sent to your email!");
        setMode("otp");
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== NEW: RESET PASSWORD ====================
  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setMessage("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        alert("Password reset successfully! Welcome back.");
        navigate("/chat");
      } else {
        setMessage(data.message || "Reset failed");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== RENDER (YOUR ORIGINAL UI + NEW MODES ADDED) ====================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* LEFT SIDE - YOUR ORIGINAL CODE - UNCHANGED */}
        <div className="hidden md:flex w-1/2 bg-blue-600 text-white flex-col justify-center items-center p-12">
          <h1 className="text-4xl font-bold mb-6">AI Career Assistant</h1>
          <p className="text-lg text-center max-w-md leading-relaxed">
            Get career guidance, AI insights, and smarter learning paths to accelerate your future.
          </p>
          <div className="mt-10 text-sm opacity-80">Built for developers & students</div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">
            {mode === "login" && "Welcome Back"}
            {mode === "signup" && "Create your account"}
            {mode === "forgot" && "Reset Password"}
            {mode === "otp" && "Verify Your Email"}
            {mode === "reset" && "Create New Password"}
          </h2>

          <p className="text-gray-500 mb-8">
            {mode === "login" && "Login to continue"}
            {mode === "signup" && "Start your journey"}
            {mode === "forgot" && "We'll send an OTP to reset your password"}
            {mode === "otp" && `Enter the 6-digit OTP sent to ${email}`}
            {mode === "reset" && "Enter your new password"}
          </p>

          {message && (
            <div className={`mb-4 p-3 rounded-md text-sm ${message.includes("success") || message.includes("sent") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          {/* NAME (only signup) - ORIGINAL */}
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* EMAIL - UPDATED TO INCLUDE forgot */}
          {(mode === "login" || mode === "signup" || mode === "otp" || mode === "forgot") && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={mode === "otp"}
              className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* PASSWORD (hide in OTP & forgot) - ORIGINAL */}
          {mode !== "forgot" && mode !== "otp" && mode !== "reset" && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* OTP INPUT - ORIGINAL */}
          {mode === "otp" && (
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl tracking-widest"
            />
          )}

          {/* NEW PASSWORD FIELD (only in reset mode) */}
          {mode === "reset" && (
            <input
              type="password"
              placeholder="New Password (min 6 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* FORGOT LINK - ORIGINAL */}
          {mode === "login" && (
            <p
              className="text-sm text-blue-600 mb-5 cursor-pointer hover:underline"
              onClick={() => { setMode("forgot"); setMessage(""); setIsResetFlow(true); }}
            >
              Forgot password?
            </p>
          )}

          {/* MAIN BUTTON - UPDATED TO SUPPORT NEW MODES */}
          <button
            onClick={() => {
              if (mode === "login") handleLogin();
              if (mode === "signup") handleSignup();
              if (mode === "forgot") handleForgotPassword();
              if (mode === "otp") handleVerifyOtp();
              if (mode === "reset") handleResetPassword();
            }}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-md mb-6 hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Processing..." : ""}
            {!loading && mode === "login" && "Login"}
            {!loading && mode === "signup" && "Sign Up"}
            {!loading && mode === "forgot" && "Send Reset OTP"}
            {!loading && mode === "otp" && "Verify OTP"}
            {!loading && mode === "reset" && "Reset Password"}
          </button>

          {/* DIVIDER + GOOGLE - YOUR ORIGINAL CODE - UNCHANGED */}
          {mode !== "forgot" && mode !== "otp" && mode !== "reset" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <span className="text-gray-400 text-sm">or</span>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
              </div>

              <div id="google-button" className="w-full mb-4 flex justify-center"></div>

              {googleUser && (
                <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
                  <img src={googleUser.picture} alt="profile" className="w-16 h-16 rounded-full mx-auto mb-3" />
                  <p className="font-semibold text-lg">{googleUser.name}</p>
                  <p className="text-sm text-gray-600">{googleUser.email}</p>
                </div>
              )}
            </>
          )}

          {/* SWITCH MODES - YOUR ORIGINAL + NEW ONES */}
          {mode === "login" && (
            <p className="text-sm text-gray-500 mt-8">
              Don't have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => { setMode("signup"); setMessage(""); }}>
                Sign up
              </span>
            </p>
          )}

          {mode === "signup" && (
            <p className="text-sm text-gray-500 mt-8">
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => { setMode("login"); setMessage(""); }}>
                Login
              </span>
            </p>
          )}

          {mode === "otp" && (
            <p className="text-sm text-gray-500 mt-8">
              Didn't receive OTP?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => {
                  setMode("signup");
                  setOtp("");
                  setMessage("");
                }}
              >
                Resend
              </span>
            </p>
          )}

          {mode === "forgot" && (
            <p className="text-sm text-gray-500 mt-8">
              Remember your password?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => setMode("login")}>
                Login
              </span>
            </p>
          )}

          {mode === "reset" && (
            <p className="text-sm text-gray-500 mt-8">
              Remember your old password?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => { setMode("login"); setIsResetFlow(false); }}>
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