import { GoogleGenAI, Type } from "@google/genai";
import { DreamAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Analyzes the dream text to extract meaning, mood, and symbols.
 */
export const analyzeDream = async (dreamText: string): Promise<DreamAnalysis> => {
  if (!apiKey) throw new Error("API Key is missing");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Analyze this dream psychologically and mystically: "${dreamText}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A mystical title for the dream" },
          interpretation: { type: Type.STRING, description: "A 2-3 sentence psychological and mystical interpretation" },
          mood: { type: Type.STRING, description: "The overall emotional atmosphere (e.g., Ethereal, Ominous)" },
          symbols: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of 3 key symbols found in the dream"
          },
          luckyNumber: { type: Type.INTEGER, description: "A generated lucky number derived from the dream essence" }
        },
        required: ["title", "interpretation", "mood", "symbols", "luckyNumber"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No analysis generated");
  
  return JSON.parse(text) as DreamAnalysis;
};

/**
 * Generates a visual representation of the dream.
 */
export const visualizeDream = async (dreamText: string, mood: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  // Enhancing the prompt for the image model
  const imagePrompt = `A surreal, artistic, and high-quality digital painting of a dream: ${dreamText}. Mood: ${mood}. Style: Ethereal, detailed, fantasy art, cinematic lighting, 8k resolution.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [{ text: imagePrompt }],
    },
    config: {
        // Nano banana models do not support responseMimeType or responseSchema
        // We just get the image part from the response
    }
  });

  // Extract the image from the parts
  if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
              return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
      }
  }

  throw new Error("No image generated");
};