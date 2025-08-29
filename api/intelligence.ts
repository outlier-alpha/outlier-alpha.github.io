// Vercel Function: /api/intelligence
import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_ORIGINS = new Set([
  'https://outlieralphaventures.com',
  'http://localhost:1313',
  'http://127.0.0.1:1313'
]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = String(req.headers.origin || '');
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS.has(origin) ? origin : '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { apiKey: userApiKey, provider: rawProvider, model, max_tokens, messages, prompt } = req.body || {};
    const provider = String(rawProvider || 'anthropic').toLowerCase();
    const apiKey = (userApiKey && String(userApiKey).trim()) || (provider === 'openai' ? process.env.OPENAI_API_KEY : process.env.ANTHROPIC_API_KEY);
    if (!apiKey) return res.status(400).json({ error: 'Missing API key' });

    const finalModel = model || (provider === 'openai' ? 'gpt-4o-mini' : 'claude-3-5-sonnet-20240620');
    const finalMax = max_tokens || 1500;
    const finalMessages = messages || [{ role: 'user', content: prompt || '' }];

    if (provider === 'openai') {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: finalModel, max_tokens: finalMax, messages: finalMessages })
      });
      const data = await r.json();
      if (!r.ok) return res.status(r.status).json({ error: 'Upstream error', details: data });
      const text = data?.choices?.[0]?.message?.content || '';
      return res.status(200).json({ text });
    } else {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: finalModel, max_tokens: finalMax, messages: finalMessages })
      });
      const data = await r.json();
      if (!r.ok) return res.status(r.status).json({ error: 'Upstream error', details: data });
      const text = data?.content?.[0]?.text || '';
      return res.status(200).json({ text });
    }
  } catch (e: any) {
    res.status(500).json({ error: 'Proxy error', details: String(e?.message || e) });
  }
}


