'use strict';

// Netlify Function: /.netlify/functions/intelligence
// Proxies requests to Anthropic Messages API securely.

const ALLOWED_ORIGINS = [
  'https://outlieralphaventures.com',
  'http://localhost:1313',
  'http://127.0.0.1:1313'
];

exports.handler = async function (event) {
  const origin = event.headers.origin || '';
  const corsHeaders = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const provider = (body.provider || 'anthropic').toLowerCase();
    const userApiKey = body.apiKey && String(body.apiKey).trim();
    const apiKey = userApiKey || (provider === 'openai' ? process.env.OPENAI_API_KEY : process.env.ANTHROPIC_API_KEY);
    if (!apiKey) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Missing API key' }) };
    }

    const model = body.model || (provider === 'openai' ? 'gpt-4o-mini' : 'claude-3-5-sonnet-20240620');
    const maxTokens = body.max_tokens || 1500;
    const messages = body.messages || [{ role: 'user', content: body.prompt || '' }];

    let upstream;
    if (provider === 'openai') {
      upstream = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model, max_tokens: maxTokens, messages })
      });
      const data = await upstream.json();
      if (!upstream.ok) {
        return { statusCode: upstream.status, headers: corsHeaders, body: JSON.stringify({ error: 'Upstream error', details: data }) };
      }
      const text = data?.choices?.[0]?.message?.content || '';
      return { statusCode: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) };
    } else {
      upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({ model, max_tokens: maxTokens, messages })
      });
      const data = await upstream.json();
      if (!upstream.ok) {
        return { statusCode: upstream.status, headers: corsHeaders, body: JSON.stringify({ error: 'Upstream error', details: data }) };
      }
      const text = data?.content?.[0]?.text || '';
      return { statusCode: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) };
    }
  } catch (err) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Proxy error', details: String(err) }) };
  }
};


