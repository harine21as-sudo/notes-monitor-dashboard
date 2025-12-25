import mongoose from 'mongoose';

const downtimeLogSchema = new mongoose.Schema({
  targetUrl: {
    type: String,
    required: true
  },
  statusCode: {
    type: Number
  },
  responseTimeMs: {
    type: Number
  },
  isUp: {
    type: Boolean,
    required: true
  },
  errorMessage: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ SAFE MODEL DEFINITION (prevents OverwriteModelError)
const DowntimeLog =
  mongoose.models.DowntimeLog ||
  mongoose.model('DowntimeLog', downtimeLogSchema);

export default DowntimeLog;
