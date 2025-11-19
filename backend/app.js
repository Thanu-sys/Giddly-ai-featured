import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Giddly AI with Google Gemini!' });
});

// AI Chat endpoint with SMART mock responses
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;

    console.log('📨 User asked:', message);

    // Try real Google API first
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [{ text: `You are EventGenius AI for event discovery. Respond helpfully to: "${message}"` }]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const aiText = response.data.candidates[0].content.parts[0].text;
      
      console.log('✅ Real AI Response');
      
      res.json({
        text: aiText,
        type: 'text',
        quickActions: ['Find more events', 'Get recommendations']
      });

    } catch (googleError) {
      // If Google API fails, use SMART mock responses
      console.log('🔄 Using smart mock data');
      const smartResponse = generateSmartResponse(message);
      res.json(smartResponse);
    }

  } catch (err) {
    console.error('❌ Server error:', err.message);
    res.json({
      text: "I'm here to help you discover amazing events! What type of events are you looking for?",
      type: 'text',
      quickActions: ['Tech events', 'Music concerts', 'Art exhibitions']
    });
  }
});

// SMART response generator
function generateSmartResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Event database
  const events = {
    tech: [
      { id: 1, title: "AI & Machine Learning Workshop", date: "2025-11-22", location: "Tech Campus", price: "Free", category: "technology" },
      { id: 2, title: "Startup Networking Night", date: "2025-11-25", location: "Innovation Hub", price: "$15", category: "business" },
      { id: 3, title: "Web Development Bootcamp", date: "2025-11-28", location: "Code Academy", price: "Free", category: "technology" }
    ],
    yoga: [
      { id: 4, title: "Sunrise Yoga in the Park", date: "2025-11-20", location: "Central Park", price: "Free", category: "wellness" },
      { id: 5, title: "Evening Meditation Class", date: "2025-11-21", location: "Wellness Center", price: "$10", category: "wellness" },
      { id: 6, title: "Hot Yoga Session", date: "2025-11-23", location: "Yoga Studio", price: "$20", category: "wellness" }
    ],
    music: [
      { id: 7, title: "Live Jazz Night", date: "2025-11-23", location: "Downtown Club", price: "$20", category: "music" },
      { id: 8, title: "Electronic Music Festival", date: "2025-11-26", location: "City Stadium", price: "$35", category: "music" },
      { id: 9, title: "Indie Band Concert", date: "2025-11-29", location: "Music Hall", price: "$25", category: "music" }
    ],
    business: [
      { id: 10, title: "Entrepreneur Summit", date: "2025-11-24", location: "Convention Center", price: "$50", category: "business" },
      { id: 11, title: "Digital Marketing Conference", date: "2025-11-27", location: "Business Tower", price: "$30", category: "business" }
    ],
    art: [
      { id: 12, title: "Modern Art Exhibition", date: "2025-11-22", location: "Art Museum", price: "Free", category: "arts" },
      { id: 13, title: "Photography Workshop", date: "2025-11-25", location: "Gallery Space", price: "$15", category: "arts" }
    ]
  };

  // Smart category detection
  if (lowerMessage.includes('tech') || lowerMessage.includes('ai') || lowerMessage.includes('programming') || lowerMessage.includes('software')) {
    return {
      text: `I found ${events.tech.length} tech events for you! 🚀`,
      type: 'event_cards',
      events: events.tech,
      quickActions: ['More tech events', 'Coding workshops', 'Startup events']
    };
  } else if (lowerMessage.includes('yoga') || lowerMessage.includes('meditation') || lowerMessage.includes('wellness') || lowerMessage.includes('fitness')) {
    return {
      text: `Here are ${events.yoga.length} wellness activities! 🧘`,
      type: 'event_cards',
      events: events.yoga,
      quickActions: ['More wellness events', 'Gym classes', 'Meditation sessions']
    };
  } else if (lowerMessage.includes('music') || lowerMessage.includes('concert') || lowerMessage.includes('dj') || lowerMessage.includes('band')) {
    return {
      text: `Discover ${events.music.length} music events! 🎵`,
      type: 'event_cards',
      events: events.music,
      quickActions: ['Upcoming concerts', 'Live music', 'Festivals']
    };
  } else if (lowerMessage.includes('business') || lowerMessage.includes('network') || lowerMessage.includes('startup') || lowerMessage.includes('entrepreneur')) {
    return {
      text: `Found ${events.business.length} business events! 💼`,
      type: 'event_cards',
      events: events.business,
      quickActions: ['Networking events', 'Conferences', 'Workshops']
    };
  } else if (lowerMessage.includes('art') || lowerMessage.includes('exhibition') || lowerMessage.includes('gallery') || lowerMessage.includes('museum')) {
    return {
      text: `Explore ${events.art.length} art events! 🎨`,
      type: 'event_cards',
      events: events.art,
      quickActions: ['Art exhibitions', 'Gallery openings', 'Workshops']
    };
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      text: "Hello! I'm EventGenius 🎯 I can help you find events, get recommendations, or import event details. What type of events are you looking for?",
      type: 'text',
      quickActions: ['Tech events', 'Music concerts', 'Art exhibitions', 'Business networking']
    };
  } else {
    return {
      text: "I'd love to help you discover amazing events! 🎉 Try asking about specific categories like 'tech events', 'yoga classes', 'music concerts', or 'art exhibitions'.",
      type: 'text',
      quickActions: ['Show all events', 'Get recommendations', 'Import event']
    };
  }
}

export default app;