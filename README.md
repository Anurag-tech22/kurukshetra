# Kurukshetra

Kurukshetra is a Smart Study Planner focused on helping students manage focus sessions, track progress, and get AI-powered study insights.

This repo contains a high-quality starter scaffold using React + Vite + TypeScript + Tailwind. It includes a serverless API template for AI features (OpenAI) that can be deployed on Vercel.

Features (MVP):
- Pomodoro timer with presets
- Session list UI (placeholder)
- AI Insights: paste notes and get summaries (calls /api/summarize or falls back to a local summarizer)
- Tailwind styling and responsive layout
- Public repo — ready for Vercel

Quick start:

1) Install

npm install

2) Local dev

npm run dev

3) AI (optional)
- To enable AI summarization, deploy to Vercel and set environment variable OPENAI_API_KEY in your project settings.
- A serverless function is provided at /api/summarize for Vercel (see api/summarize.js).

4) Deploy
- Recommended: connect this GitHub repo to Vercel and deploy. Vercel will automatically detect the project and provide the serverless endpoint.

Security:
- Do NOT commit API keys. Use Vercel / Netlify env vars.

Contributing:
- If you want, I can continue by adding features: persistent storage (Firestore), analytics, PWA manifest, or a React-native companion.
