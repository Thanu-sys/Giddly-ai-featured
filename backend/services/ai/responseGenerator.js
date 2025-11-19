import GoogleAIService from './googleAiService.js';

class ResponseGenerator {
  constructor() {
    this.googleAI = new GoogleAIService();
  }

  async generate(intent, message, context = {}) {
    try {
      const text = await this.googleAI.generateResponse(intent, message, context);

      return {
        text,
        type: "text"
      };

    } catch (err) {
      console.error("Response generation failed:", err);

      return {
        text: "I'm having trouble generating a response right now.",
        type: "error"
      };
    }
  }
}

export const responseGenerator = new ResponseGenerator();
