import express from 'express';
import { searchService } from '../../services/events/searchService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { query, location, category, date } = req.query;
    const events = await searchService.searchEvents({ query, location, category, date });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;