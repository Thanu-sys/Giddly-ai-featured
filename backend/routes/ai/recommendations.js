import express from 'express';
import { recommendationService } from '../../services/ai/recommendationService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { userId, location, limit = 10 } = req.query;
    const recommendations = await recommendationService.getPersonalizedRecommendations(userId, location, limit);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: "Failed to get recommendations" });
  }
});

export default router;