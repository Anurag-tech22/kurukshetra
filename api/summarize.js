module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { text } = req.body || {}
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing text' })
  }

  const key = process.env.OPENAI_API_KEY
  if (!key) {
    const summary = text
      .split(/(?<=[.!?])\s+/)
      .slice(0, 3)
      .join(' ')
    return res.status(200).json({ summary })
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
              'You are a study assistant. Summarize the user content in a concise, actionable way and include 3 bullet action items.',
          },
          {
            role: 'user',
            content: text,
          },
        ],
        max_tokens: 350,
        temperature: 0.2,
      }),
    })

    const data = await response.json()
    const summary = data?.choices?.[0]?.message?.content || 'Summary unavailable.'
    return res.status(200).json({ summary })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'AI summarization failed.' })
  }
}
