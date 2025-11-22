import { GoogleGenAI, Type } from "@google/genai";
import { FlashcardResponse } from "../types";

const apiKey = process.env.API_KEY;
// Initialize safe AI instance
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateFlashcardsFromTopic = async (topic: string, count: number = 5): Promise<FlashcardResponse[]> => {
  if (!ai) {
    console.warn("API Key not found. Returning mock data.");
    // Fallback mock data if no API key for demo purposes
    return [
      { front: "Mock Card 1", back: "This is a mock response because no API key was found." },
      { front: "Mongolian Hello", back: "Сайн байна уу (Sain baina uu)" },
    ];
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `Create ${count} flashcards about the following topic: "${topic}". 
    The content should be suitable for learning. 
    If the topic implies a language (e.g., "Mongolian"), ensure the text is in that language/script (Cyrillic for Mongolian) with translations if necessary.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              front: { type: Type.STRING, description: "Text for the front of the card" },
              back: { type: Type.STRING, description: "Text for the back of the card" }
            },
            required: ["front", "back"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as FlashcardResponse[];
      return data;
    }
    
    return [];
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw new Error("Failed to generate flashcards. Please try again.");
  }
};