import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// The site imports the app's own pure modules (services/prompt.ts, components/parseReview.ts, constants.ts)
// and the source files themselves at build time, so every number on the page is generated, never typed.
export default defineConfig({
  base: '/Code-Inspector/',
  plugins: [react()],
  server: { fs: { allow: ['..'] } },
});
