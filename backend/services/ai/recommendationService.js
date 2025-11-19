import { recommendationEngine } from '../events/recommendationEngine.js';

export const recommendationService = {
  async getPersonalizedRecommendations(userId, location, limit = 10, preferences = {}) {
    // Use the recommendation engine to get scored events
    const recs = await recommendationEngine.getRecommendations(userId, location, preferences);
    // Respect the requested limit
    return recs.slice(0, Number(limit));
  }
};
