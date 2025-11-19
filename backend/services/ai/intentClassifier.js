import GoogleAIService from './googleAiService.js';

class IntentClassifier {
  constructor() {
    this.googleAI = new GoogleAIService();
  }

  async classify(message, context = {}) {
    try {
      const intent = await this.googleAI.classifyIntent(message, context);
      return this.validateIntent(intent.trim());
    } catch (err) {
      console.error("Intent classification failed:", err);
      return "general_query";
    }
  }

  validateIntent(intent) {
    const valid = [
      'find_events',
      'get_recommendations',
      'summarize_event',
      'general_query'
    ];

    return valid.includes(intent) ? intent : "general_query";
  }
}

export const intentClassifier = new IntentClassifier();
