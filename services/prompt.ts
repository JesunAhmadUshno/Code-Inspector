// Pure prompt module: no SDK import and no API key, so the app, the tests and the
// dashboard in site/ all use the exact same template. Moved verbatim from geminiService.ts.

export const MODEL = 'gemini-2.5-flash';
// Lower temperature for more deterministic and factual reviews
export const TEMPERATURE = 0.2;

// The five sections the prompt asks the model to fill, in prompt order.
export const REVIEW_SECTIONS = [
  { emoji: ':sparkles:', title: 'Overall Summary' },
  { emoji: ':bug:', title: 'Potential Bugs' },
  { emoji: ':art:', title: 'Style & Readability' },
  { emoji: ':rocket:', title: 'Performance Suggestions' },
  { emoji: ':shield:', title: 'Security Concerns' },
];

export const buildReviewPrompt = (code: string, language: string): string => {
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
  return prompt;
};
