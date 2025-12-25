import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DowntimeLog from './models/DowntimeLog.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Monitor connected to MongoDB Atlas"))
    .catch(err => console.error("❌ Monitor DB Connection Error:", err));

// TARGET_URLS can be multiple URLs separated by commas in env
const TARGET_URLS = process.env.TARGET_URLS
    ? process.env.TARGET_URLS.split(",").map(url => url.trim())
    : [process.env.TARGET_URL]; // fallback single URL

const INTERVAL = parseInt(process.env.PING_INTERVAL) || 10000; // default 10 seconds

// Function to run health check for a single URL
async function runHealthCheck(url) {
    const startTime = Date.now();
    
    try {
        const response = await axios.get(url, { timeout: 5000 });
        const duration = Date.now() - startTime;

        await DowntimeLog.create({
            targetUrl: url,
            statusCode: response.status,
            responseTimeMs: duration,
            isUp: true
        });

        console.log(`[${new Date().toLocaleTimeString()}] ✅ UP - ${url} (${duration}ms)`);
    } catch (error) {
        const duration = Date.now() - startTime;
        const status = error.response ? error.response.status : 503; // 503 if unreachable

        await DowntimeLog.create({
            targetUrl: url,
            statusCode: status,
            responseTimeMs: duration,
            isUp: false,
            errorMessage: error.message
        });

        console.log(`[${new Date().toLocaleTimeString()}] ❌ DOWN - ${url} - Error: ${error.message}`);
    }
}

// Start monitoring loop for all URLs
export const startMonitor = () => {
    console.log(`🚀 Monitoring started for: ${TARGET_URLS.join(", ")}`);
    console.log(`⏱️ Interval: ${INTERVAL / 1000} seconds`);

    TARGET_URLS.forEach(url => {
        // Run immediately first
        runHealthCheck(url);
        // Then start interval
        setInterval(() => runHealthCheck(url), INTERVAL);
    });
};
