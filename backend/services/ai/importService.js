import axios from 'axios';
import { eventProcessor } from '../events/eventProcessor.js';

export const importService = {
  async importEventFromSource(source) {
    // Accepts either a URL string or an object describing the source
    try {
      let eventData = {};

      if (typeof source === 'string') {
        // Treat as URL: try to fetch JSON metadata
        const resp = await axios.get(source, { timeout: 5000 }).catch(() => null);
        if (resp && resp.data && typeof resp.data === 'object') {
          eventData = {
            title: resp.data.title || `Imported event from ${source}`,
            date: resp.data.date || new Date().toISOString().slice(0,10),
            location: resp.data.location || 'Unknown',
            description: resp.data.description || '',
            price: resp.data.price || 'Free'
          };
        } else {
          // Fallback minimal record
          eventData = {
            title: `Imported event from ${source}`,
            date: new Date().toISOString().slice(0,10),
            location: 'Unknown',
            description: `Imported from ${source}`,
            price: 'Free'
          };
        }
      } else if (source && typeof source === 'object') {
        // If the caller passes structured data, prefer its fields
        eventData = {
          title: source.title || source.name || `Imported event`,
          date: source.date || source.eventDate || new Date().toISOString().slice(0,10),
          location: source.location || source.venue || 'Unknown',
          description: source.description || source.summary || '',
          price: source.price || 'Free'
        };
      } else {
        throw new Error('Unsupported import source');
      }

      // Validate and enrich using eventProcessor
      const result = await eventProcessor.processEvent(eventData);
      return result;
    } catch (err) {
      console.error('importService error:', err?.message || err);
      throw new Error('Failed to import event');
    }
  }
};
