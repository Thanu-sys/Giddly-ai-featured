import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: String,
    type: { type: String, enum: ['text', 'event_cards', 'summary'], default: 'text' },
    metadata: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
  }],
  sessionId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);