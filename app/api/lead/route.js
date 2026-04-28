export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { email, name, url, goal, timeline } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Gültige E-Mail erforderlich.' }, { status: 400 });
  }

  const today = new Date().toISOString().split('T')[0];
  const displayName = name?.trim() || email;

  const notizen = [
    'Phase-0-Anfrage über Website-Formular.',
    url      ? `URL: ${url}`          : null,
    goal     ? `Ziel: ${goal}`        : null,
    timeline ? `Timeline: ${timeline}` : null,
  ].filter(Boolean).join('\n');

  // ── 1. Notion: Lead-Eintrag anlegen ──────────────────────────────
  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: 'b78d0329-c73a-492d-b0a9-1088327a0f8c' },
        properties: {
          'Name / Firma': {
            title: [{ text: { content: displayName } }],
          },
          'E-Mail': { email },
          'Status': { select: { name: '🆕 New' } },
          'Kanal': { select: { name: 'Website' } },
          'Kontaktdatum': { date: { start: today } },
          'Notizen': {
            rich_text: [{ text: { content: notizen } }],
          },
        },
      }),
    });

    if (!notionRes.ok) {
      const err = await notionRes.text();
      console.error('[Lead] Notion error:', err);
    }
  } catch (err) {
    console.error('[Lead] Notion fetch failed:', err);
  }

  // ── 2. EmailJS: Benachrichtigung an Leon ─────────────────────────
  if (
    process.env.EMAILJS_SERVICE_ID &&
    process.env.EMAILJS_TEMPLATE_ID &&
    process.env.EMAILJS_PUBLIC_KEY
  ) {
    try {
      const ejRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          ...(process.env.EMAILJS_PRIVATE_KEY
            ? { accessToken: process.env.EMAILJS_PRIVATE_KEY }
            : {}),
          template_params: {
            from_email: email,
            lead_name: displayName,
            lead_date: today,
            lead_url: url || '—',
            lead_goal: goal || '—',
            lead_timeline: timeline || '—',
          },
        }),
      });

      if (!ejRes.ok) {
        const err = await ejRes.text();
        console.error('[Lead] EmailJS error:', err);
      }
    } catch (err) {
      console.error('[Lead] EmailJS fetch failed:', err);
    }
  }

  return Response.json({ success: true });
}
