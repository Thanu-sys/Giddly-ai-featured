import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interests: [String],
  categories: [String],
  priceRange: { type: String, enum: ['free', 'under_20', 'under_50', 'any'], default: 'any' },
  locationRadius: { type: Number, default: 10 },
  notificationSettings: {
    eventReminders: { type: Boolean, default: true },
    newRecommendations: { type: Boolean, default: true }
  },
  learningData: {
    clickedEvents: [mongoose.Schema.Types.ObjectId],
    attendedEvents: [mongoose.Schema.Types.ObjectId],
    searchHistory: [String]
  }
});

export const UserPreferences = mongoose.model('UserPreferences', preferenceSchema);