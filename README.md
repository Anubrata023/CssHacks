<div align="center">

# ⚡ FAXX — Unified Student Grievance Portal

![FAXX Banner](https://img.shields.io/badge/FAXX-Unified_Portal-910A67?style=for-the-badge&logo=appveyor)
![Version](https://img.shields.io/badge/version-2.1.0-910A67.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Auth](https://img.shields.io/badge/Auth-OTP%20%2B%20JWT-720455.svg)

**FAXX** is a full-stack student grievance portal that lets students file, track, upvote, and comment on campus complaints — while admins manage issues prioritized by community escalation. Built with glassmorphic UI, terminal-based OTP authentication, an AI-powered chatbot assistant, and real-time notification systems.

</div>

---

## 🎯 What It Does

| Role | What they can do |
|------|-----------------|
| **🎓 Student** | File categorized complaints, track status, upvote others' issues, add comments |
| **🛡️ Admin** | View all complaints sorted by community upvotes (highest priority first), resolve/reject with terminal notifications |
| **👀 Public** | Browse the live feed, see trending issues, search & filter by category |

---

## ✨ Key Features

### 🔐 Authentication
- **Terminal-Based OTP** — OTP codes print directly to the server terminal (no email service needed)
- **30-Second Verification Window** — Strict time-limited OTP with 3-attempt lockout
- **JWT Sessions** — Secure token-based authentication with 1-hour expiry
- **Dual Login** — Separate portals for Students (`/login-student.html`) and Admins (`/login-admin.html`)

### 📋 Complaint System
- **Categorized Filing** — Organized under Hostel, Mess & Food, Academics, Infrastructure, Administration
- **Subcategory Drill-Down** — Each category has granular subcategories with specific complaint types
- **File Attachments** — Upload area for supporting documents
- **Real-Time Tracking** — Status updates: Pending → In Progress → Resolved/Rejected

### 🔥 Community Escalation
- **Upvote System** — Users upvote complaints they agree with
- **Priority Sorting** — Most upvoted issues float to the top of the admin's stack
- **Escalation Badges** — `📢 Rising` (10+) → `⚠️ High` (20+) → `🚨 ESCALATED` (50+ upvotes)
- **💬 Comment Threads** — Users can discuss and add context to complaints

### 🌐 Public Feed
- **Live Feed** — All complaints visible to the community
- **Sort Toggle** — Switch between 🔥 Most Upvoted and 🕐 Newest First
- **Search & Filter** — Full-text search with category filtering
- **Trending Section** — Highlights the week's most upvoted issue

### 🎨 Premium UI/UX
- **Dark Mode** — Deep indigo palette (`#030637`, `#3C0753`, `#720455`, `#910A67`)
- **Light Mode** — Elegant palette (`#F3F4F4`, `#853953`, `#612D53`, `#2C2C2C`)
- **Theme Toggle** — Persisted in localStorage, instant switch via sidebar or chatbot command
- **Glassmorphism & Neumorphism** — Frosted glass cards, soft shadows, blur effects
- **Micro-Animations** — Hover effects, reveal animations, loading transitions

### 🤖 Smart Chatbot Assistant
- **FAXX Bot** — Interactive AI-powered assistant on the homepage
- **Feature Guide** — Explains all platform capabilities to new users
- **Navigation** — "Guide me to..." / "Take me to..." commands for instant page navigation
- **Live Data** — "Most upvoted issue" fetches real-time data from complaints
- **Stats on Demand** — "Show stats" displays total complaints, resolution rate, upvotes
- **Theme Control** — "Switch to light mode" / "Dark mode" toggles the theme via chat
- **Transparency Messaging** — Reassures users that filing complaints is safe and democratic
- **Smart Matching** — Fuzzy keyword matching for natural language queries
- **Quick Replies** — Pre-built suggestion buttons for common questions

### ⚡ API Test Console
- Built-in interactive API testing page at `/api-test.html`
- Test all endpoints: Send OTP, Verify OTP, Submit Complaint, Update Status
- Live request history log with response codes and latency

### 📊 Analytics Dashboard
- Visual complaint statistics
- Resolution speed tracking
- Category distribution insights

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3 (Custom Design System), Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Auth** | bcryptjs (password hashing), jsonwebtoken (JWT), In-memory OTP store |
| **Storage** | In-memory (`app.locals`) + localStorage — Ready for MongoDB migration |
| **Design** | CSS Variables, Glassmorphism, Neumorphism, CSS Animations |

---

## 📁 Project Structure

```
📁 cssHacks/
├── 📄 server.js                  # Express server entry point (port 3000)
├── 📄 package.json               # Dependencies & scripts
├── 📄 .gitignore                 # Excludes node_modules, .env, logs
│
├── 📁 routes/
│   ├── authRoutes.js             # POST /api/auth/send-otp, verify-otp
│   ├── complaintRoutes.js        # GET/POST /api/complaints, PATCH status
│   ├── analyticsRoutes.js        # Analytics API endpoints
│   └── userRoutes.js             # User management routes
│
├── 📁 controllers/               # Business logic handlers
├── 📁 models/                    # Mongoose schemas (User, Complaint, OTP)
├── 📁 middlewares/               # JWT auth middleware
│
├── 📁 css/
│   ├── global.css                # Design system tokens & theme variables
│   ├── neumorphism.css           # Glassmorphic component library
│   ├── index.css                 # Homepage styles
│   ├── category.css              # Category page styles
│   ├── profile.css               # Profile & complaint management styles
│   ├── public-feed.css           # Feed, comments, escalation styles
│   ├── login.css                 # Auth page styles
│   ├── analytics.css             # Dashboard styles
│   ├── api-test.css              # API console styles
│   └── chatbot.css              # Chatbot widget styles
│
├── 📁 js/
│   ├── global.js                 # Theme toggle, UserSession, showToast, nav
│   ├── data.js                   # COMPLAINT_CATEGORIES & FORM_FIELDS
│   ├── index.js                  # Homepage interactions
│   ├── category.js               # Category drill-down & form submission
│   ├── login.js                  # OTP flow (send → verify → redirect)
│   ├── profile.js                # Profile rendering & admin complaint mgmt
│   ├── public-feed.js            # Feed rendering, upvotes, comments, sort
│   ├── analytics.js              # Dashboard data visualization
│   ├── api-test.js               # API console logic
│   └── chatbot.js               # Smart chatbot assistant
│
├── 📁 assets/                    # Logo, images
│
├── 📄 index.html                 # Landing page
├── 📄 category.html              # Category drill-down page
├── 📄 login-student.html         # Student login + OTP modal
├── 📄 login-admin.html           # Admin login + OTP modal
├── 📄 profile.html               # User profile & complaint management
├── 📄 public-feed.html           # Community feed with upvotes & comments
├── 📄 analytics.html             # Analytics dashboard
└── 📄 api-test.html              # API testing console
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Anubrata023/CssHacks.git
cd CssHacks/cssHacks

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the `cssHacks/` directory:

```env
PORT=3000
JWT_SECRET=your_secret_key_here
```

### Start the Server

```bash
node server.js
```

```
🚀 FAXX Portal is LIVE!
Click to open: http://localhost:3000
```

> **Important:** Keep the terminal visible — OTP codes and grievance notifications print here.

---

## 🔐 Authentication Flow

```
Student/Admin fills login form
        │
        ▼
POST /api/auth/send-otp
        │
        ▼
┌─────────────────────────────────┐
│  🔑 OTP printed in terminal    │
│  ⏱️  30-second window           │
│  🔒 3 attempts max             │
└─────────────────────────────────┘
        │
        ▼
POST /api/auth/verify-otp
        │
        ▼
✅ JWT token issued → Session created → Redirect to profile
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/send-otp` | Register & generate OTP (prints to terminal) |
| `POST` | `/api/auth/verify-otp` | Verify OTP → returns JWT + user profile |
| `GET` | `/api/complaints` | List all complaints with count |
| `POST` | `/api/complaints` | Submit a new grievance (triggers terminal notification) |
| `PATCH` | `/api/complaints/:id/status` | Admin updates status (triggers resolution notification) |

Test all endpoints interactively at **`/api-test.html`**

---

## 🔔 Terminal Notifications

All key actions produce formatted terminal output:

| Event | Terminal Output |
|-------|----------------|
| **OTP Generated** | User details + 6-digit OTP code |
| **Login Success** | User credentials + JWT token preview |
| **Complaint Filed** | Complaint ID, title, category, urgency |
| **Status Updated** | Complaint ID, old → new status, admin name |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **ISC License**.

---

<div align="center">

**Built with ❤️ for Students**

Elevating campus infrastructure through transparent feedback.

**— TEAM ARDITECHS —**

</div>
