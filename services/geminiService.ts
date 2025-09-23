
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const reviewCode = async (code: string, language: string): Promise<string> => {
  const prompt = `
    You are an expert code reviewer and a senior software engineer with decades of experience in ${language}. 
    Your task is to provide a comprehensive, constructive, and friendly code review.

    Analyze the following ${language} code snippet for potential bugs, style violations, performance issues, security vulnerabilities, and adherence to best practices.

    Code to review:
    \`\`\`${language}
    ${code}
    \`\`\`

    Please provide your feedback in Markdown format. Organize your feedback into the following sections:
    - **:sparkles: Overall Summary:** A brief, high-level summary of the code's quality.
    - **:bug: Potential Bugs:** Identify any potential bugs or logical errors.
    - **:art: Style & Readability:** Comment on coding style, naming conventions, and code clarity.
    - **:rocket: Performance Suggestions:** Highlight any potential performance bottlenecks and suggest optimizations.
    - **:shield: Security Concerns:** Point out any security vulnerabilities.
    
    If a section has no issues, state "No issues found." in that section. For each point, provide a brief explanation, the line number if applicable, and a suggested correction.
    Be encouraging and professional in your tone.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.2, // Lower temperature for more deterministic and factual reviews
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to get review from Gemini. Please check your API key and network connection.");
    }
};
