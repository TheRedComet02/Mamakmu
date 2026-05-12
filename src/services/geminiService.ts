import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface GazeResult {
  challenge: string;
  physics: string;
  muse: string;
}

export async function generateGaze(): Promise<GazeResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Initiate Observation. Generate a Gaze.",
    config: {
      systemInstruction: `You are a 'Cybernetic Philosopher.' Your tone is cold, industrial, and mysterious. 
      When asked for a 'Gaze', generate a 3-part response:
      1. The Challenge: A bizarre engineering constraint (e.g., 'Design an antenna that only resonates in a vacuum.')
      2. The Physics: A brief mention of a real semiconductor or RF principle (e.g., 'Consider the tunneling effect in a 2nm gate.')
      3. The Muse: A cryptic, 'antimainstream' piece of advice.
      
      Output ONLY valid JSON.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          challenge: {
            type: Type.STRING,
            description: "A bizarre engineering constraint.",
          },
          physics: {
            type: Type.STRING,
            description: "A brief mention of a real semiconductor or RF principle.",
          },
          muse: {
            type: Type.STRING,
            description: "A cryptic piece of advice.",
          },
        },
        required: ["challenge", "physics", "muse"],
      },
    },
  });

  try {
    const result = JSON.parse(response.text);
    return result as GazeResult;
  } catch (error) {
    console.error("Failed to parse Gaze response:", error);
    throw new Error("VOID_CORRUPTION: Failed to parse signal.");
  }
}
