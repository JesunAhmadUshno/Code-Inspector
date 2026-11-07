# Jesun Code Inspector

Paste code, pick one of 12 languages, and get a five-section review (summary, bugs, style, performance, security) from Gemini (`gemini-2.5-flash`, temperature 0.2).

Live dashboard: https://jesunahmadushno.github.io/Code-Inspector/

The dashboard runs the app's own prompt builder and Markdown parser in your browser, shows where pasted code can break out of the prompt's code fence, and lists the open engineering gaps. It makes no model calls.

> **Warning: local use only.** `vite.config.ts` compiles `GEMINI_API_KEY` into the browser bundle, so anyone who loads a deployed build can read the key. Do not deploy the app until the call goes through a server that holds the key.

## How it works

| Step | File |
|---|---|
| Code and language input | `components/CodeInput.tsx`, `components/LanguageSelector.tsx`, `constants.ts` |
| Prompt template, model id, temperature, section list | `services/prompt.ts` (pure, no SDK) |
| Gemini call | `services/geminiService.ts` |
| Reply parsing, one block per line | `components/parseReview.ts` (pure) |
| Rendering | `components/ReviewOutput.tsx` |

## Run locally

Prerequisite: Node.js 22.

1. `npm install`
2. Put your Gemini key in `.env.local` as `GEMINI_API_KEY=...`
3. `npm run dev` and open http://localhost:3000

Without a key, the key check now runs when you press Review, so the error appears in the review panel instead of the page failing to load (not yet verified in a browser run).

## Tests

`npm test` runs the `node:test` suite for the prompt builder and parser (Node 22 runs the TypeScript files directly, no install needed).

## Dashboard

`cd site && npm ci && npm run build` checks every computed number against the source (`site/src/inspector.check.mjs`) and builds the page. `.github/workflows/pages.yml` publishes it.

## Known limits

See `docs/research-review.md`. In short: the key is exposed client side, code containing triple backticks is not escaped, the parser handles one line at a time, and review quality has never been measured.
