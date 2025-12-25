import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DowntimeLog from './models/DowntimeLog.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Monitor connected to MongoDB Atlas"))
    .catch(err => console.error("❌ Monitor DB Connection Error:", err));

const TARGET_URL = process.env.TARGET_URL;
const INTERVAL = parseInt(process.env.PING_INTERVAL) || 10000;

async function runHealthCheck() {
    const startTime = Date.now();
    
    try {
        const response = await axios.get(TARGET_URL);
        const duration = Date.now() - startTime;

        await DowntimeLog.create({
            targetUrl: TARGET_URL,
            statusCode: response.status,
            responseTimeMs: duration,
            isUp: true
        });

        console.log(`[${new Date().toLocaleTimeString()}] ✅ UP - ${duration}ms`);
    } catch (error) {
        const duration = Date.now() - startTime;
        const status = error.response ? error.response.status : 503; // 503 if unreachable

        await DowntimeLog.create({
            targetUrl: TARGET_URL,
            statusCode: status,
            responseTimeMs: duration,
            isUp: false,
            errorMessage: error.message
        });

        console.log(`[${new Date().toLocaleTimeString()}] ❌ DOWN - Error: ${error.message}`);
    }
}

// Start the monitoring loop
console.log(`🚀 Monitoring started for: ${TARGET_URL}`);
console.log(`⏱️  Interval: ${INTERVAL / 1000} seconds`);

setInterval(runHealthCheck, INTERVAL);