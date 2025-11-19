import { intentClassifier } from './intentClassifier.js';
import { responseGenerator } from './responseGenerator.js';

export const chatController = {
  async processMessage({ message, userLocation, userPreferences, chatHistory }) {
    try {
      // 1. Detect user intent
      const intent = await intentClassifier.classify(message, {
        userLocation,
        userPreferences,
        chatHistory
      });

      // 2. Generate response
      const aiResponse = await responseGenerator.generate(
        intent,
        message,
        { userLocation, userPreferences, chatHistory }
      );

      return aiResponse;

    } catch (error) {
      console.error("chatController error:", error);
      return {
        text: "Something went wrong while processing your request.",
        type: "error"
      };
    }
  }
};
