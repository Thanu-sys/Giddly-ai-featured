import express from 'express';
import { importService } from '../../services/ai/importService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { source } = req.body;
    const result = await importService.importEventFromSource(source);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to import event" });
  }
});

export default router;