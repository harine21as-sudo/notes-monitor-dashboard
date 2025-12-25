import express from "express";
import mongoose from "mongoose";
import {
    getAllNotes,
    createNote,
    deleteNote,
    updateNote
} from "../controllers/notesController.js";

const router = express.Router();

/* ================================
   DOWNTIME LOG SCHEMA (INLINE)
================================ */
const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    targetUrl: String,
    statusCode: Number,
    responseTimeMs: Number,
    isUp: Boolean,
    errorMessage: String
});

// Use existing model if already compiled
const DowntimeLog =
    mongoose.models.DowntimeLog ||
    mongoose.model("DowntimeLog", logSchema);

/* ================================
   STANDARD NOTES ROUTES
================================ */
router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

/* ================================
   CHAOS / DEBUG ROUTES
================================ */

// Simulated server error
router.get("/debug/error", (req, res) => {
    res.status(500).json({ message: "Simulated Server Crash" });
});

// Simulated slow response
router.get("/debug/slow", (req, res) => {
    setTimeout(() => {
        res.status(200).json({ message: "Simulated Latency" });
    }, 4000);
});

// Fetch monitor logs
router.get("/debug/logs", async (req, res) => {
    try {
        const logs = await DowntimeLog.find()
            .sort({ timestamp: -1 }) // newest first
            .limit(20);

        res.json(logs);
    } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        res.status(500).json({ error: "Database query failed" });
    }
});

export default router;
