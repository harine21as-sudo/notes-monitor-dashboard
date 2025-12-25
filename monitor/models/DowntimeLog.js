import mongoose from 'mongoose';

const downtimeLogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    targetUrl: String,
    statusCode: Number,
    responseTimeMs: Number,
    isUp: Boolean,
    errorMessage: { type: String, default: null }
});

const DowntimeLog = mongoose.model('DowntimeLog', downtimeLogSchema);
export default DowntimeLog;