# Kurukshetra

Kurukshetra is a premium study planner designed to help students and professionals manage their focus time, track study sessions, and generate AI-powered summaries from lecture notes.

## Features
- Pomodoro timer with preset focus lengths
- Study session planner with local persistence
- Progress dashboard with weekly focus overview
- AI notes summarizer using a secure serverless API route
- Clean, responsive UI with a premium dark theme

## Tech stack
- React + Vite + TypeScript
- Tailwind CSS
- Serverless AI route for OpenAI (optional)

## Quick start

```bash
npm install
npm run dev
```

## AI setup
The app tries to call `/api/summarize` on the server. In production, deploy on Vercel and add:

```bash
OPENAI_API_KEY=your_key_here
```

If no API key is present, the app falls back to a local summary generator.

## Deploy
- Recommended: Vercel
- Connect this repository
- Set `OPENAI_API_KEY` in project environment variables
