
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const newsService = {
  async generateTrendingHeadlines() {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate 5 ultra-futuristic tech news headlines for the year 2026. Categories should include AI, Quantum, NeuroTech, and CyberSec. Include a brief one-sentence summary for each.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                summary: { type: Type.STRING },
                category: { type: Type.STRING }
              },
              required: ["headline", "summary", "category"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Error generating news headlines:", error);
      return [];
    }
  }
};
