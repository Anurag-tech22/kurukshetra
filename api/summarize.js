// serverless function for Vercel / Netlify (Node)
// Save as api/summarize.js — deployment platforms like Vercel will expose this at /api/summarize

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Only POST' })
  const { text } = req.body || {}
  if (!text) return res.status(400).send({ error: 'Missing text' })

  const key = process.env.OPENAI_API_KEY
  if (!key) {
    const summary = text.split(/(?<=[.!?])\s+/).slice(0, 3).join(' ')
    return res.status(200).json({ summary, note: 'local-fallback' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that summarizes study notes into concise summary lines and 3 action items.',
          },
          {
            role: 'user',
            content: `Summarize the following study notes and list 3 concise action items:\n\n${text}`,
          },
        ],
        temperature: 0.2,
        max_tokens: 400,
      }),
    })

    const data = await response.json()
    const summary = data?.choices?.[0]?.message?.content || 'No summary returned.'
    res.status(200).json({ summary })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'AI request failed' })
  }
}
