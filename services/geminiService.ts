
import { GoogleGenAI } from "@google/genai";
import { buildReviewPrompt, MODEL, TEMPERATURE } from "./prompt";

let ai: GoogleGenAI | null = null;

export const reviewCode = async (code: string, language: string): Promise<string> => {
    // Checked per call, not at import, so a missing key shows the app's error panel instead of a blank page.
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set. Add GEMINI_API_KEY to .env.local and restart the dev server.");
    }
    ai ??= new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = buildReviewPrompt(code, language);

    try {
        const response = await ai.models.generateContent({
            model: MODEL,
            contents: prompt,
            config: {
                temperature: TEMPERATURE,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to get review from Gemini. Please check your API key and network connection.");
    }
};
