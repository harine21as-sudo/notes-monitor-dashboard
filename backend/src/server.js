import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/notes", notesRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Unexpected Server Error", error: err.message });
});

// Add a simple landing route
app.get("/", (req, res) => {
    res.send("Target App Backend is Running Successfully!");
});

app.listen(PORT, () => {
    console.log(`🚀 Target App running at http://localhost:${PORT}`);
});