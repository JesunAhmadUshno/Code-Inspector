// Pure helpers for the dashboard. The prompt and parser themselves come from the app's own modules.

export const FENCE = '```';
export const countFences = (s) => s.split(FENCE).length - 1;

// Lines as an editor shows them: a trailing newline does not start a new line.
export const lineCount = (text) => (text === '' ? 0 : text.replace(/\n$/, '').split('\n').length);

// The prompt opens ```<language> right before the user's code. Every ``` inside the code toggles
// whether the following text is still inside that fence. Text outside it reaches the model as prose.
export function fenceSegments(code) {
  const parts = code.split(FENCE);
  const segments = parts.map((text, i) => ({ text, inside: i % 2 === 0 }));
  const escaped = segments.filter((s) => !s.inside).reduce((n, s) => n + s.text.length, 0);
  const markers = parts.length - 1;
  // With an odd count, the template's own closing ``` opens a new block and swallows the section instructions.
  return { segments, markers, escaped, swallowsInstructions: markers % 2 === 1 };
}
