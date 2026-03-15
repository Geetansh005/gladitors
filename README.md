# 🚀 AI Career Assistant

<div align="center">

### 🎯 Find Your Perfect Stream After Class 10

An **AI-powered career guidance platform** that helps students discover the best academic stream based on **marks, interests, and AI analysis**.

Built using **Groq Llama AI + Flux Image Generation** with a **modern dark UI**.

<br>

![GitHub stars](https://img.shields.io/github/stars/yourusername/ai-career-assistant?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/yourusername/ai-career-assistant?style=for-the-badge)
![License](https://img.shields.io/github/license/yourusername/ai-career-assistant?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-darkgreen?style=for-the-badge)

</div>

---

# ✨ Features

## 🔐 Smart Authentication

* Google **OAuth 2.0 login**
* Email signup with **OTP verification**
* Secure **JWT authentication**
* Password hashing using **bcrypt**

---

## 📊 AI Career Assessment

A **3-step intelligent career evaluation system**.

### 1️⃣ Academic Performance

Interactive sliders for subjects:

* Math
* Science
* English
* Social Studies

### 2️⃣ Interest Discovery

Choose from **12 career interest cards**:

* Coding
* Design
* Medicine
* Business
* Research
* Teaching
* Writing
* Marketing
* Gaming
* Robotics
* Psychology
* Law

### 3️⃣ AI Career Analysis

Groq **Llama-3.3-70B** generates:

* Personalized career stream recommendation
* Skill development roadmap
* Future career suggestions

---

## 🖼 AI Generated Career Roadmap

Using **Flux-1-Schnell Image Generation**

The AI instantly generates a **visual career roadmap image** showing:

* Learning path
* Skill progression
* Career milestones

Example:

```
Student → Skills → College → Career → Future Growth
```

---

## 🤖 AI Career Chatbot

A **persistent AI mentor chatbot**.

Features:

* Powered by **Groq Llama**
* Remembers user's assessment
* Stores chat history in **MongoDB**
* Gives career advice & learning guidance

---

## 👤 User Profile System

Each user has a **personal dashboard** containing:

* Profile information
* Career assessment results
* Generated roadmap images
* Full AI chat history

All data stored securely in **MongoDB Atlas**.

---

# 🎨 UI Design

Modern **Dark Mode Glassmorphism UI**

Features:

* Aurora animated background
* Smooth hover animations
* Neon glow effects
* Fully responsive layout
* Mobile friendly

Built with:

* **Tailwind CSS**
* **React animations**
* **Modern UI components**

---

# 🛠 Tech Stack

| Layer                | Technology               |
| -------------------- | ------------------------ |
| **Frontend**         | React 18 + Vite          |
| **Styling**          | Tailwind CSS             |
| **Routing**          | React Router             |
| **Backend**          | Node.js + Express        |
| **Database**         | MongoDB Atlas + Mongoose |
| **Authentication**   | JWT + Google OAuth2      |
| **AI Models**        | Groq Llama-3.3-70B       |
| **Image Generation** | Flux-1-Schnell           |
| **Email Service**    | Nodemailer OTP           |
| **API Client**       | Axios                    |

---

# 📂 Project Structure

```
ai-career-assistant
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── SkillAnalyzer.jsx
│   │   │   └── Chat.jsx
│   │   │
│   │   └── Aurora.jsx
│
├── server
│   ├── server.js
│   ├── models
│   │   └── User.js
│   └── routes
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ai-career-assistant.git

cd ai-career-assistant
```

---

## 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env`

```
GROQ_API_KEY=your_groq_key
JWT_SECRET=super_secret_key
MONGO_URI=mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=app_password
CLIENT_ID=google_client_id
```

Run server:

```
npm run dev
```

---

## 3️⃣ Frontend Setup

```
cd client
npm install
```

Create `.env`

```
VITE_API_URL=http://localhost:3000
```

Run frontend:

```
npm run dev
```

---

## 🚀 Open Application

```
http://localhost:5173
```

---

# 🔗 API Endpoints

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | `/api/token`      | Google OAuth login |
| POST   | `/api/signup`     | Create account     |
| POST   | `/api/verify-otp` | Verify email OTP   |
| POST   | `/api/assessment` | AI career analysis |
| POST   | `/api/chat`       | AI chatbot         |
| GET    | `/api/profile`    | Get user profile   |

---

# 🧠 AI Workflow

```
User completes assessment
        ↓
Data sent to backend
        ↓
Groq Llama generates analysis
        ↓
Flux generates roadmap image
        ↓
Saved in MongoDB
        ↓
Chatbot uses this data for guidance
```

---

# 📈 Future Improvements

* PDF export of career report
* AI counselor booking
* Multiple AI model fallback
* Mobile app version
* School integration system
* Student progress tracking

---

# 🤝 Contributing

Contributions are welcome.

Steps:

1. Fork repository
2. Create feature branch
3. Commit changes
4. Open Pull Request

---

# ⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork it
📢 Share it with students

---

# 📄 License

MIT License

Free to use for **learning and personal projects**.

---

<div align="center">

### ❤️ Built to help students choose the right future

**AI Career Assistant**

</div>
