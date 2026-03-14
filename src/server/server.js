const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Add this for .env support

// ====================== SECURITY: DNS FIX + ENV VALIDATION ======================
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Required environment variables check
if (!process.env.GOOGLE_CLIENT_ID) {
  console.error("❌ GOOGLE_CLIENT_ID is missing in .env");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in .env");
  process.exit(1);
}

const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// ====================== MONGO DB SETUP ======================
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/authapp")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema (stores everything - Google + Email users)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  name: String,
  picture: String,
  googleId: { type: String, sparse: true },
  password: String, // only for email/password users
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// ====================== EMAIL SERVICE ======================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper to send OTP
const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Verification OTP",
    html: `
      <h2>Your OTP is: <strong>${otp}</strong></h2>
      <p>This code expires in 10 minutes.</p>
      <p>If you didn't request this, ignore the email.</p>
    `,
  });
};

// ====================== MIDDLEWARE ======================
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// ====================== ROUTES (unchanged) ======================
// ... (all your /api/signup, /api/verify-otp, /api/login, /api/token routes stay exactly the same)

app.post("/api/signup", async (req, res) => {
  // [your existing signup code - unchanged]
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  try {
    let user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ success: false, message: "User already exists and is verified" });
      }
      user.password = hashedPassword;
      user.name = name || user.name;
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    } else {
      user = new User({
        email,
        name,
        password: hashedPassword,
        otp,
        otpExpiry,
        isVerified: false,
      });
    }

    await user.save();
    await sendOTPEmail(email, otp);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/verify-otp", async (req, res) => {
  // [your existing verify-otp code - unchanged]
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.otp || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Account verified successfully",
      token,
      user: { email: user.email, name: user.name, picture: user.picture }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  // [your existing login code - unchanged]
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, isVerified: true });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: "Invalid credentials or account not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: { email: user.email, name: user.name, picture: user.picture }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ====================== FORGOT PASSWORD (send OTP) ======================
app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "No account found with this email" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ success: true, message: "Reset OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ====================== RESET PASSWORD ======================
app.post("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ success: false, message: "Email and new password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      message: "Password reset successfully",
      token,
      user: { email: user.email, name: user.name, picture: user.picture }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/token", async (req, res) => {
  // [your existing Google token code - unchanged]
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ success: false, message: "No credential received" });

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = new User({
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        googleId: payload.sub,
        isVerified: true,
      });
    } else {
      user.name = payload.name;
      user.picture = payload.picture;
      user.googleId = payload.sub;
      if (!user.isVerified) user.isVerified = true;
    }

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Google user verified & saved to MongoDB:", payload.email);

    res.json({
      success: true,
      token,
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        googleId: payload.sub,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
});