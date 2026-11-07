// Pure line classifier behind SimpleMarkdownRenderer (ReviewOutput.tsx). Moved out of the
// component unchanged so it can be tested and reused; the rules run one line at a time, in order.

export type ReviewBlock =
  | { kind: 'h1' | 'h2' | 'h3' | 'li' | 'pre' | 'p'; text: string }
  | { kind: 'label'; label: string; text: string }
  | { kind: 'hr' };

export const parseReview = (content: string): ReviewBlock[] =>
  content.split('\n').map((line): ReviewBlock => {
    if (line.startsWith('### ')) return { kind: 'h3', text: line.substring(4) };
    if (line.startsWith('## ')) return { kind: 'h2', text: line.substring(3) };
    if (line.startsWith('# ')) return { kind: 'h1', text: line.substring(2) };
    if (line.startsWith('- **')) {
      const boldEnd = line.indexOf('**:', 3);
      if (boldEnd !== -1) return { kind: 'label', label: line.substring(2, boldEnd + 2), text: line.substring(boldEnd + 2) };
    }
    if (line.startsWith('- ')) return { kind: 'li', text: line.substring(2) };
    if (line.trim() === '---') return { kind: 'hr' };
    if (line.startsWith('```')) return { kind: 'pre', text: line.replace(/```/g, '') };
    return { kind: 'p', text: line };
  });
