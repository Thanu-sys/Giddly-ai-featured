import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: {
    city: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  preferences: {
    interests: [String],
    categories: [String],
    priceRange: { type: String, enum: ['free', 'under_20', 'under_50', 'any'], default: 'any' }
  },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);