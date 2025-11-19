import express from 'express';
import { eventProcessor } from '../../services/events/eventProcessor.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const eventData = req.body;
    const result = await eventProcessor.processEvent(eventData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Event processing failed" });
  }
});

export default router;