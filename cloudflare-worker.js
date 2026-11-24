// Cloudflare Worker — پروکسی امن وکیل‌یار
// کلید Gemini فقط داخل Secret ورکر می‌ماند، نه در گیت‌هاب نه در فرانت.
//
// نصب:
// 1) https://dash.cloudflare.com > Workers & Pages > Create Worker > Deploy
// 2) Settings > Variables > Secret: GEMINI_API_KEY = کلید AIza... از aistudio.google.com
// 3) این فایل را در ورکر Paste و Deploy کن
// 4) آدرس ورکر مثلا https://vakil-yar.XXXX.workers.dev را در vakil-yar.js جای YOUR-SUBDOMAIN بگذار

const ALLOWED_ORIGINS = [
  'https://vekalatvand-ir.github.io',
  'https://vekalatvand-ir.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:5500',
];

const RATE = new Map(); // ip -> [timestamps]

function cors(origin) {
  const allow = ALLOWED_ORIGINS.some(o => origin && origin.startsWith(o)) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

function rateLimited(ip) {
  const now = Date.now();
  const arr = (RATE.get(ip) || []).filter(t => now - t < 60_000);
  if (arr.length >= 12) return true;
  arr.push(now);
  RATE.set(ip, arr);
  return false;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = cors(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'فقط POST' }), { status: 405, headers });
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (rateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'زیادی پرسیدی، یک دقیقه صبر کن' }), { status: 429, headers });
    }

    const KEY = env.GEMINI_API_KEY;
    if (!KEY) {
      return new Response(JSON.stringify({ error: 'کلید روی ورکر تنظیم نشده' }), { status: 500, headers });
    }

    let body;
    try { body = await request.json(); }
    catch { return new Response(JSON.stringify({ error: 'بدنه نامعتبر' }), { status: 400, headers }); }

    const q = String(body.q || '').trim().slice(0, 1500);
    if (!q) return new Response(JSON.stringify({ error: 'سوال خالی است' }), { status: 400, headers });

    const sys = String(body.sys || 'تو وکیل‌یار هستی، دستیار حقوقی فارسی.').slice(0, 2000);
    const history = Array.isArray(body.history) ? body.history.slice(-8).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: String(m.text || '').slice(0, 1500) }],
    })) : [];

    const payload = {
      system_instruction: { parts: [{ text: sys }] },
      contents: [...history, { role: 'user', parts: [{ text: q }] }],
      generationConfig: { temperature: 0.6, maxOutputTokens: 700 },
    };

    const g = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + encodeURIComponent(KEY),
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );

    if (!g.ok) {
      // خطای گوگل را لو نده
      return new Response(JSON.stringify({ error: 'هوش مصنوعی فعلا جواب نداد' }), { status: 502, headers });
    }
    const data = await g.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) {
      return new Response(JSON.stringify({ error: 'پاسخ خالی' }), { status: 502, headers });
    }
    return new Response(JSON.stringify({ text }), { headers });
  },
};
