import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseReview } from './parseReview.ts';

const kinds = (s: string) => parseReview(s).map((b) => b.kind);

test('classifies each supported line type', () => {
  assert.deepEqual(kinds('# a\n## b\n### c\n- **Bugs**: none\n- item\n---\n```js\nplain'),
    ['h1', 'h2', 'h3', 'label', 'li', 'hr', 'pre', 'p']);
  assert.deepEqual(parseReview('- **Bugs**: none')[0], { kind: 'label', label: '**Bugs**', text: ': none' });
});

test('known gap: the header format the prompt requests is not matched as a label', () => {
  // The prompt asks for "- **:bug: Potential Bugs:**" (colon inside the bold); the label rule wants "**:" after index 3.
  assert.deepEqual(parseReview('- **:bug: Potential Bugs:** none')[0], { kind: 'li', text: '**:bug: Potential Bugs:** none' });
});

test('a bold bullet without "**:" falls back to a list item', () => {
  assert.deepEqual(parseReview('- **bold** text')[0], { kind: 'li', text: '**bold** text' });
});

test('known limits: line-at-a-time fences, numbered lists and inline marks', () => {
  assert.deepEqual(kinds('```js\nconst a = 1;\n```'), ['pre', 'p', 'pre']);
  assert.deepEqual(kinds('1. first'), ['p']);
  assert.equal((parseReview('use `x` and **y**')[0] as { text: string }).text, 'use `x` and **y**');
});
