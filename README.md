Kurukshetra — Smart Study Planner

This repository now contains a full client-only implementation of the study planner with a local "AI" summarizer.

Changes made for GitHub Pages deployment and API removal:
- The OpenAI/serverless API dependency was removed from the active UI flow.
- The AI summarizer now runs fully client-side with a local summarizer and action-item generator (no API key required).
- Vite base was set to "/kurukshetra/" so the app can be deployed to GitHub Pages.
- package.json includes a deploy script using gh-pages: `npm run deploy` builds and publishes the `dist` to the gh-pages branch.

How to run locally:
1. npm install
2. npm run dev

How to deploy to GitHub Pages (automatic method using gh-pages):
1. npm install --save-dev gh-pages
2. npm run build
3. npm run deploy

Alternatively, connect this repo to GitHub Pages from Settings > Pages and set the source to the `gh-pages` branch after running the deploy script once.

Notes:
- Because the summarization and "AI" features are local now, they do not require any API keys and are fully offline-capable.
- If you later want to re-enable remote AI features (OpenAI), we can re-introduce a secure serverless function and environment variable guidance.
