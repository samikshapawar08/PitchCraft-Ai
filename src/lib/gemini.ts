
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generatePitch(
  apiKey: string,
  startupName: string,
  problem: string,
  targetAudience: string
): Promise<string> {
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    return "Error: API key is missing. Please add your Google Gemini API key in `src/components/PitchGenerator.tsx`.";
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are PitchCraft AI, an expert at creating concise and powerful elevator pitches for startups.
      Your tone is confident, futuristic, and exciting.
      Generate a single, compelling paragraph (3-4 sentences) for the following startup.
      Do not use markdown, just plain text.

      Startup Name: "${startupName}"
      Problem it solves: "${problem}"
      Target Audience: "${targetAudience}"

      Craft the perfect elevator pitch:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating pitch:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        return "Error: The provided API key is not valid. Please check your key and try again.";
    }
    return "Error: Could not generate pitch. Please check the console for details.";
  }
}

