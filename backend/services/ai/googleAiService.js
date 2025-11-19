import { GoogleGenerativeAI } from "@google/generative-ai";

class GoogleAIService {
  constructor() {
    this.client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    this.model = this.client.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });
  }

  async generateText(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.error("Gemini Error:", err);
      return "I couldn't process that right now.";
    }
  }

  async classifyIntent(message, context = {}) {
    const prompt = `
      Classify this message into one intent:
      - find_events
      - get_recommendations
      - summarize_event
      - general_query

      Message: "${message}"
      Context: ${JSON.stringify(context)}

      Return ONLY the intent name.
    `;

    return await this.generateText(prompt);
  }

  async generateResponse(intent, message, context = {}) {
    const prompt = `
      USER INTENT: ${intent}
      USER MESSAGE: "${message}"
      CONTEXT: ${JSON.stringify(context)}

      Based on the intent, give the best possible response.
      Respond ONLY with the final text response.
    `;

    return await this.generateText(prompt);
  }
}

export default GoogleAIService;
