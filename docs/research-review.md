# Research and engineering review

Reviewed 2026-11-07 on branch `site/live-dashboard`. Code Inspector is a product app, not a study, so it is graded on the research rubric where that applies and on engineering rigor throughout. Grades: A (strong), B (adequate), C (weak), D (missing).

## Summary

The app is a thin, working wrapper: one fixed prompt to `gemini-2.5-flash` at temperature 0.2 and a line-by-line Markdown renderer. Its main weaknesses are a client-side API key, an unescaped code fence in the prompt, and no evidence at all that the reviews are correct. This pass fixed the cheap gaps (tests, import-time crash, naming, accessibility basics, README) and refactored the prompt and parser into pure modules so they can be tested and shown live. Nothing here measures review quality.

## Rubric

| Criterion | Grade | Evidence | Status |
|---|---|---|---|
| Question / product claim | C | The claim is "instant, intelligent feedback on quality, style, and potential issues" (`metadata.json`). It is not stated as anything testable. | Open: write the claim as a measurable target, for example bug-detection recall on a seeded set. |
| Hypotheses | D | None. A natural one: the five-section prompt at temperature 0.2 finds seeded bugs more often than a one-line prompt. | Open: needs the evaluation set below. |
| Method | C | One prompt template (`services/prompt.ts`), one model, one temperature. Choices are not justified or compared. | Open. |
| Baselines | D | No comparison with a plain prompt, another model, a linter (ESLint, Ruff) or a human reviewer. | Open: see compute needs. |
| Statistics and uncertainty | D | No measurements, so no intervals. Temperature 0.2 is not deterministic, and repeatability was never checked. | Open. |
| Reproducibility | C → B | Was: no tests, no lockfile, caret ranges, two dependency sources (importmap CDN and npm). Now: `npm test` (8 tests) runs in CI, the dashboard has an exact-pinned lockfile and a known-answer build check. The app still has caret ranges, no lockfile and the importmap. | Partly fixed. |
| Threats to validity / failure modes | C | Found and pinned by tests: (1) code containing ``` closes the prompt's fence early, so pasted text can act as instructions; (2) the section header format the prompt requests (`- **:bug: Potential Bugs:**`) does not match the renderer's label rule, so it shows as a bullet with literal asterisks; (3) multi-line code blocks render as one `<pre>` per fence line with the body as paragraphs; numbered lists, inline bold, inline code and links are not parsed; `<li>` has no `<ul>` parent. | Documented; fixes open. |
| Related work | D | None cited. Relevant: LLM-assisted code review studies and tools, static analysers as a baseline, prompt-injection literature. | Open: a short related-work note, no compute needed. |
| Limitations stated | D → B | Was: unedited template README. Now: README warns about the key and links this review; the dashboard lists every open gap. | Fixed. |

## Engineering rigor

| Area | Finding | Status |
|---|---|---|
| Security (critical) | `vite.config.ts` `define` writes `GEMINI_API_KEY` into the browser bundle. Any deployed build leaks the key. | Open. Needs a server proxy (for example a small serverless function) that holds the key; an architecture decision for the owner. Until then: local use only. |
| Prompt integrity | No escaping of ``` and no input size or token limit (`services/prompt.ts`). | Open. Fix: fence with more backticks than the longest run in the input, cap input length. Changes prompt text, so left for a deliberate release. |
| Robustness | `geminiService.ts` threw at import when the key was missing, blanking the page. | Fixed: the check runs inside `reviewCode`. |
| Tests | None. | Fixed: `services/prompt.test.ts`, `components/parseReview.test.ts`, run by `npm test` and CI. |
| Renderer | Line-at-a-time classifier (see threats). | Open: replace with a block parser or a pinned Markdown library plus sanitisation. |
| Dependencies | Importmap from a CDN plus npm deps; Tailwind Play CDN (not for production); caret ranges; no lockfile. | Open: one source (npm), built Tailwind, committed lockfile, exact pins. Needs a working local build to verify, no paid compute. |
| Identity and docs | Three names, "Power by" typo, missing `/vite.svg`, template README. | Fixed. |
| Accessibility | No live region; hover scale ignores reduced motion. | Fixed: `aria-live` and `aria-busy` on the review panel, `motion-safe:` scale. Not audited with a screen reader. |

## What the remaining gaps need

1. **Evaluation set.** About 100 short snippets across the 12 languages, each with one or more seeded bugs and known labels (style, performance, security), plus clean controls. Free to build by hand or from public bug datasets (for example Defects4J for Java, BugsInPy for Python); licence must be checked.
2. **Model runs.** Each snippet reviewed 5 times at temperature 0.2 (repeatability) and once at 0 and 0.7, for this prompt and a one-line baseline prompt: roughly 100 × 8 = 800 `gemini-2.5-flash` calls. This is paid API usage and needs the owner's approval and a key budget.
3. **Scoring.** Per-section precision and recall against the seeded labels, with bootstrap 95% intervals over snippets, and a linter baseline (free) for the languages that have one.
4. **Security fix.** A server endpoint holding the key, with rate limiting. Needs a hosting choice; no paid compute beyond hosting.

## Verification of this review

- `npm test`: 8 passing.
- `cd site && npm ci && npm run build`: `inspector.check.mjs` asserts 12 languages, the model id, temperature 0.2, 5 sections, 2 fence markers in a clean prompt and 4 with an injected pair, the parser classifications above, and the line count of `constants.ts`.
- The template text in `services/prompt.ts` was compared against the original literal for three inputs and is identical.
