const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config(); // Add this for .env support

// ==================== RAG IMPORTS (NEW) ====================
const { MongoClient } = require("mongodb");
const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");
const { VoyageEmbeddings } = require("@langchain/community/embeddings/voyage");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

// ==================== SAFE FORMAT FUNCTION (fixes old error) ====================
const formatDocumentsAsString = (documents) => 
  documents.map((doc) => doc.pageContent || "").join("\n\n");

// ==================== ORIGINAL GROQ ====================
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//  SECURITY: DNS FIX + ENV VALIDATION 
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
if (!process.env.VOYAGEAI_API_KEY) {
  console.error("❌ VOYAGEAI_API_KEY is missing in .env (get free at voyageai.com)");
  process.exit(1);
}

const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// ==================== MONGO DB + RAG VECTOR STORES ====================
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/authapp")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Atlas Vector Client
const mongoClient = new MongoClient(process.env.MONGO_URI);
const db = mongoClient.db();

const embeddings = new VoyageEmbeddings({
  apiKey: process.env.VOYAGEAI_API_KEY,
  model: "voyage-3-large"
});

const globalVectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection: db.collection("careerKnowledge"),
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding"
});

const userResumeStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection: db.collection("userResumes"),
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding"
});

// User Schema (exactly as you had)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  name: String,
  picture: String,
  googleId: { type: String, sparse: true },
  password: String,
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,

  chatHistory: [{
    role: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
  }],

  assessmentResults: [{
    timestamp: { type: Date, default: Date.now },
    answers: Object,
    analysis: String,
    score: Number
  }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// EMAIL SERVICE (exactly as you had)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

// MIDDLEWARE 
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// MULTER for resume upload
const upload = multer({ dest: "uploads/" });

// ====================== ALL YOUR ORIGINAL ROUTES (100% UNCHANGED) ======================
app.post("/api/signup", async (req, res) => { /* your exact code */ 
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

app.post("/api/verify-otp", async (req, res) => { /* your exact code */ 
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

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, message: "Account verified successfully", token, user: { email: user.email, name: user.name, picture: user.picture } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => { /* your exact code */ 
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, isVerified: true });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: "Invalid credentials or account not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token, user: { email: user.email, name: user.name, picture: user.picture } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/forgot-password", async (req, res) => { /* your exact code */ 
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

app.post("/api/reset-password", async (req, res) => { /* your exact code */ 
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

    res.json({ success: true, message: "Password reset successfully", token, user: { email: user.email, name: user.name, picture: user.picture } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/token", async (req, res) => { /* your exact code */ 
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ success: false, message: "No credential received" });

  try {
    const ticket = await client.verifyIdToken({ idToken: credential, audience: CLIENT_ID });
    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = new User({ email: payload.email, name: payload.name, picture: payload.picture, googleId: payload.sub, isVerified: true });
    } else {
      user.name = payload.name;
      user.picture = payload.picture;
      user.googleId = payload.sub;
      if (!user.isVerified) user.isVerified = true;
    }

    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("✅ Google user verified & saved to MongoDB:", payload.email);

    res.json({ success: true, token, user: { email: payload.email, name: payload.name, picture: payload.picture, googleId: payload.sub } });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

const authenticateToken = (req, res, next) => { /* your exact code */ 
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-super-secret-key-change-in-production", (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

app.get("/api/profile", authenticateToken, async (req, res) => { /* your exact code */ 
  try {
    const dbUser = await User.findById(req.user.userId).select("-password -otp -otpExpiry");
    if (!dbUser) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user: { name: dbUser.name, email: dbUser.email, picture: dbUser.picture, joined: dbUser.createdAt.toISOString().split("T")[0] } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.patch("/api/profile", authenticateToken, async (req, res) => { /* your exact code */ 
  const { name } = req.body;
  if (!name) return res.status(400).json({ success: false, message: "Name is required" });

  try {
    const dbUser = await User.findByIdAndUpdate(req.user.userId, { name }, { new: true, runValidators: true }).select("-password -otp -otpExpiry");
    res.json({ success: true, user: { name: dbUser.name } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/change-password", authenticateToken, async (req, res) => { /* your exact code */ 
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ success: false, message: "Old and new password required" });
  }
  try {
    const dbUser = await User.findById(req.user.userId);
    if (!dbUser || !dbUser.password) {
      return res.status(400).json({ success: false, message: "Password change only for email accounts" });
    }
    const isMatch = await bcrypt.compare(oldPassword, dbUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Old password is incorrect" });
    }
    dbUser.password = await bcrypt.hash(newPassword, 10);
    await dbUser.save();
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/chat-history", authenticateToken, async (req, res) => { /* your exact code */ 
  const user = await User.findById(req.user.userId).select("chatHistory");
  res.json({ success: true, history: user.chatHistory || [] });
});

// ====================== NEW RESUME UPLOAD (RAG) ======================
app.post("/api/upload-resume", authenticateToken, upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const loader = new PDFLoader(req.file.path);
    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 800, chunkOverlap: 100 });
    const chunks = await splitter.splitDocuments(docs);

    const chunksWithMetadata = chunks.map(chunk => ({ ...chunk, metadata: { userId: req.user.userId.toString() } }));

    await userResumeStore.addDocuments(chunksWithMetadata);
    fs.unlinkSync(req.file.path);

    res.json({ success: true, message: "✅ Resume uploaded & indexed! AI now knows your profile." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Resume processing failed" });
  }
});

app.post("/api/chat", authenticateToken, async (req, res) => {
  let { messages } = req.body;

  try {
    // 🔥 READS ANY DATA FROM MONGO
    const dbUser = await User.findById(req.user.userId)
      .select("name email chatHistory assessmentResults");

    messages = messages.map(msg => ({ role: msg.role, content: msg.content }));
    const lastUserMessage = messages[messages.length - 1].content;

    // Existing RAG (resume + knowledge base)
    const resumeDocs = await userResumeStore.similaritySearch(lastUserMessage, 4, {
      preFilter: { userId: { $eq: req.user.userId.toString() } }
    });
    const globalDocs = await globalVectorStore.similaritySearch(lastUserMessage, 5);
    const ragContext = formatDocumentsAsString([...resumeDocs, ...globalDocs]);

    const systemPrompt = `You are CareerRoad AI.

User Profile:
Name: ${dbUser.name}
Email: ${dbUser.email}
Joined: ${dbUser.createdAt?.toISOString().split("T")[0] || "recently"}

Past Assessments:
${dbUser.assessmentResults?.slice(-3).map(a => a.analysis).join("\n\n") || "None yet"}

Recent Chat History:
${dbUser.chatHistory?.slice(-8).map(m => `${m.role}: ${m.content}`).join("\n") || "None"}

=== USER RESUME + KNOWLEDGE BASE ===
${ragContext}

Rules:
- Use ALL the above data to give super-personalized advice.
- Only career related.
- Max 5 bullets or 4 sentences.
- Always motivational.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      max_tokens: 700,
    });

    const aiReply = completion.choices[0].message.content;

    // Save history (your old logic)
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { chatHistory: [
        { role: "user", content: lastUserMessage },
        { role: "assistant", content: aiReply }
      ]}
    });

    res.json({ success: true, reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, reply: "AI is busy!" });
  }
});

app.post("/api/assessment", authenticateToken, async (req, res) => {
  const { answers } = req.body;

  try {
    const dbUser = await User.findById(req.user.userId)
      .select("name assessmentResults");

    const query = JSON.stringify(answers);
    const resumeDocs = await userResumeStore.similaritySearch(query, 4, {
      preFilter: { userId: { $eq: req.user.userId.toString() } }
    });
    const globalDocs = await globalVectorStore.similaritySearch(query, 5);
    const ragContext = formatDocumentsAsString([...resumeDocs, ...globalDocs]);

    const prompt = `You are a career assessment expert.

User: ${dbUser.name}
Previous Assessments: 
${dbUser.assessmentResults?.slice(-2).map(a => a.analysis).join("\n\n") || "None"}

Answers: ${JSON.stringify(answers)}

=== USER RESUME + KNOWLEDGE ===
${ragContext}

Give exact same format for same answers:
1. Overall Score (0-100)
2. Top 3 Career Paths (% match)
3. Personalized 4-Step Roadmap

Keep short & motivational.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      max_tokens: 800,
    });

    const analysis = completion.choices[0].message.content;

    await User.findByIdAndUpdate(req.user.userId, {
      $push: { assessmentResults: { answers, analysis, score: 85 } }
    });

    res.json({ success: true, analysis, score: 85 });
  } catch (err) {
    res.status(500).json({ success: false, message: "Assessment failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
  console.log("✅ FULL RAG + Resume Upload ACTIVE");
});