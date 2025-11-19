import express from 'express';
import { chatController } from '../../services/ai/chatController.js';

const router = express.Router();

// Main chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, userLocation, userPreferences, chatHistory } = req.body;
    
    const result = await chatController.processMessage({
      message,
      userLocation,
      userPreferences,
      chatHistory
    });
    
    res.json(result);
  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({
      text: "I'm having trouble connecting right now. Please try again.",
      type: 'error'
    });
  }
});

export default router;