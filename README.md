# FAXX - Unified Student Complaint Portal

![FAXX Banner](https://img.shields.io/badge/FAXX-Unified_Portal-7b61ff?style=for-the-badge&logo=appveyor)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

**FAXX** is a comprehensive, modern, and unified portal designed to streamline the student complaint and grievance reporting process. Designed with premium visual aesthetics (dark mode, glassmorphism, responsive UI) and robust backend architecture, FAXX makes lodging complaints about hostel, mess, academics, and infrastructure fast and transparent.

---

## 🎨 Key Features

- **Quick & Transparent Submission**: File granular complaints logically categorized under Mess, Hostel, Academics, Infrastructure, etc.
- **Premium Gen Z UI**: Crafted with dynamic hover effects, smooth transitions, and a stunning "dark mode" aesthetic utilizing glassmorphism and deep neon accents.
- **Dual Portal Access**: Dedicated login ecosystems for both **Students** (submitting/tracking) and **Admins** (managing/resolving).
- **Responsive Navigation**: A dynamic sidebar/hamburger menu scheme ensures flawless experiences on any device.
- **Live Analytics Dashboard**: Visualizes institutional data regarding complaint volumes, resolution speeds, and satisfaction indicators.
- **Real-Time Tracking**: Students can actively monitor the status of their reported issues.

---

## 🏗️ Technology Stack

FAXX utilizes a full-stack JavaScript environment with the following core technologies:

### **Frontend**
- **HTML5 & CSS3**: Semantic elements paired with a massive custom design system (`global.css`, `index.css`, `neumorphism.css`).
- **Vanilla JavaScript**: Lightweight and powerful DOM manipulation, form handling, and API integration.

### **Backend**
- **Node.js**: Asynchronous JavaScript runtime environment.
- **Express.js**: Minimalist web framework for handling routing, static asset serving, and RESTful API endpoints.
- **Authentication**: Custom implemented authentication using `bcryptjs` and `jsonwebtoken` (JWT).
- **Storage**: Mongoose/MongoDB schemas built into the architecture. *(Note: Currently configured to utilize an **In-Memory Database** for rapid horizontal testing/deployment without requiring a live MongoDB instance).*

---

## 📁 Project Structure

```text
📁 cssHacks
├── 📄 server.js               # Entry point for the Node.js Express server
├── 📄 package.json            # Project dependencies and script configurations
├── 📁 routes/                 # Express API router endpoints (Auth, etc.)
├── 📁 controllers/            # Core business logic processing
├── 📁 models/                 # Mongoose database schemas
├── 📁 middlewares/            # Custom logic (Auth verification)
├── 📁 css/                    # Global and component-specific stylesheets
├── 📁 js/                     # Client-side routing, interactions, and data rendering
├── 📁 assets/                 # Icons, backgrounds, fonts, and images
└── 📄 index.html              # Main Landing Page / Root file
```

---

## 🚀 Getting Started (Run Locally)

Follow these steps to deploy and test the FAXX portal from your local terminal:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Navigate directly into the project directory and install the required dependencies:

```bash
cd cssHacks
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (or use the one already provided) to configure your server setup:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Start the Application
Start the Node.js server. By default, this will expose the app on `http://localhost:3000`.

```bash
node server.js
```

### 5. Access the Portal
Open up your browser and visit:
```text
http://localhost:3000
```
- Navigate to `/login-student.html` to experience the student dashboard.
- Navigate to `/login-admin.html` to view the administrative environment.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome to make FAXX even better.
1. Fork the repository
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **ISC License**.

> **Built with ❤️ for Students.** Elevating campus infrastructure through transparent feedback.
> -------------------------------------TEAM ARDITECHS--------------------------------------------
