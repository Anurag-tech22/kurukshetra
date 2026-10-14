# Kurukshetra

Kurukshetra is a premium study planner designed to help students manage focus time, track study sessions, and generate local summaries from notes.

Important deployment note
- You asked not to deploy to GitHub Pages, so this repo is not configured for GitHub Pages deployment.
- The project is ready for other hosting options like Vercel, Netlify, or a static host.

How to run locally

1. Install dependencies

   npm install

2. Start local dev server

   npm run dev

3. Build for production

   npm run build

Recommended deployment

- Vercel (recommended): Connect the repo and Vercel will detect the Vite app and deploy automatically. No further changes are required.
- Netlify: Use the build command `npm run build` and publish the `dist/` folder.

Notes

- The AI summarizer is client-side only and does not require any API key.
- If you'd like automated deployment (CI) to Vercel or Netlify, I can add GitHub Actions or deployment instructions.
