# ☁️ Cloud-Native Note Taker & Downtime Impact Analyzer

### Project Overview

This project is a full-stack cloud application designed to demonstrate **High Availability (HA)** and **Cloud Monitoring** principles. It consists of a "Target App" (Note Management) and a secondary "Monitor Service" that tracks system health, latency, and downtime impact in real-time.

---

## 🚀 Cloud Architecture

The project follows a **Decoupled 3-Tier Architecture** to ensure that if the application server fails, the monitoring service remains alive to record the failure.

* **Presentation Layer**: A React-based dashboard hosted on **Vercel** (Static Cloud Hosting).
* **Application Layer**: A Node.js/Express API and a background "Heartbeat" monitor hosted on **Render** (PaaS).
* **Data Layer**: A managed NoSQL database hosted on **MongoDB Atlas** (DBaaS).

---

## 🛠 Tech Stack

* **Frontend**: React.js, Vite, Chart.js (for impact visualization), Axios.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB Atlas.
* **Monitoring**: Custom Node.js Heartbeat Engine using Axios and Mongoose.

---

## 📊 Key Features

1. **CRUD Operations**: Create, Read, Update, and Delete notes with real-time database persistence.
2. **Health Monitoring**: A separate service pings the API every 10 seconds to check for "Liveness".
3. **Impact Analysis Dashboard**: A wide-screen graph visualizing:
* **Latency (ms)**: Real-time response time tracking.
* **Uptime %**: Mathematical calculation of system reliability.
* **System Status**: Instant visual feedback (🟢 Healthy / 🔴 Downtime Detected).


4. **Failure Simulation**: Built-in debug routes (`/slow` and `/error`) to simulate cloud network latency and server crashes.

---

## ☁️ Deployment Details

### 1. Database (MongoDB Atlas)

* The database is configured with **Network Access (0.0.0.0/0)** to allow secure connections from various cloud IPs.

### 2. Backend & Monitor (Render)

* **Environment Variables** configured on Render:
* `MONGO_URI`: Connection string for Atlas.
* `PORT`: Dynamic port assignment (10000).


* **Monitor Script**: Runs as a background task to ensure continuous logging even when the main API is idle.

### 3. Frontend (Vercel)

* Built and deployed using the **Vite Build Pipeline**.
* Connected to the production Backend URL via **Environment Variables** to prevent CORS issues.

---

## 🛠 Local Setup Instructions

1. **Clone the Repo**: `git clone <repository-url>`
2. **Install Dependencies**: Run `npm install` in the `frontend`, `backend`, and `monitor` folders.
3. **Environment Setup**: Create a `.env` file in the `backend` and `monitor` folders with your `MONGO_URI`.
4. **Run All Layers**:
* Terminal 1 (Backend): `cd backend && npm run dev`
* Terminal 2 (Monitor): `cd monitor && npm start`
* Terminal 3 (Frontend): `cd frontend && npm run dev`



---

## 🧪 Simulation Scenarios (For Evaluation)

* **Latency Test**: Visit `/api/notes/debug/slow` to see a spike in the dashboard graph.
* **Outage Test**: Shut down the Backend server. The dashboard will instantly switch to "🔴 System Downtime Detected" and record the exact duration of the failure.

---

**Would you like me to help you create a "Cloud Impact Report" template to include as a PDF alongside this project?**
