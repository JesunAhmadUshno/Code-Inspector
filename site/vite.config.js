import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { lineCount } from './src/inspector.js';

// Line counts of the app's own files, computed here so only the numbers ship, never the source text.
// Excludes this dashboard, docs/ and node_modules.
const root = path.resolve(import.meta.dirname, '..');
const inventory = fs.globSync('**/*.{ts,tsx,json,html,md}', { cwd: root, exclude: (f) => /^(site|docs|node_modules)$/.test(f) })
  .map((f) => ({ path: f.split(path.sep).join('/'), lines: lineCount(fs.readFileSync(path.join(root, f), 'utf8')) }));

// The site imports the app's own pure modules (services/prompt.ts, components/parseReview.ts, constants.ts),
// so every number on the page is generated, never typed.
export default defineConfig({
  base: '/Code-Inspector/',
  plugins: [react()],
  define: { __INVENTORY__: JSON.stringify(inventory) },
  server: { fs: { allow: ['..'] } },
});
