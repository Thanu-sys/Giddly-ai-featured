import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  time: String,
  location: {
    venue: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  price: String,
  category: String,
  organizer: String,
  image: String,
  capacity: Number,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export const Event = mongoose.model('Event', eventSchema);