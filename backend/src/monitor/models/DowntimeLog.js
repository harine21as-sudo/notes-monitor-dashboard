import mongoose from 'mongoose';

const downtimeLogSchema = new mongoose.Schema({
  targetUrl: String,
  statusCode: Number,
  responseTimeMs: Number,
  isUp: Boolean,
  errorMessage: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Check if model exists, otherwise define it
const DowntimeLog = mongoose.models.DowntimeLog || mongoose.model('DowntimeLog', downtimeLogSchema);

export default DowntimeLog;
