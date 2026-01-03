
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async generateTasks() {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate 5 professional micro-tasks for a freelance platform. Each task should have a title, a short description, and a verification question.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                reward: { type: Type.NUMBER },
                category: { type: Type.STRING },
                timeEstimate: { type: Type.STRING },
                verificationQuestion: { type: Type.STRING }
              },
              required: ["id", "title", "description", "reward", "category", "timeEstimate", "verificationQuestion"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Error generating tasks:", error);
      return [];
    }
  },

  async verifyTaskCompletion(taskDescription: string, userAnswer: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Task: ${taskDescription}\nUser Answer: ${userAnswer}\nIs this answer sufficient and correct for the task? Answer YES or NO with a brief explanation.`,
        config: {
          temperature: 0.1
        }
      });
      const text = response.text.toUpperCase();
      return text.includes("YES");
    } catch (error) {
      console.error("Error verifying task:", error);
      return false;
    }
  }
};
