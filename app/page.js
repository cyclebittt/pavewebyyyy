'use client';
import {
  ArrowDown, ArrowRight, CheckCircle2,
  Play, Monitor, Film, BookOpen, Mail,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/* ─── TOKENS ─── */
const B = {
  yellow: '#E8A800', ocker: '#C68F00',
  black:  '#0E0C08', cream: '#F5F2EB', dark: '#2A2720',
};

/* ─── HOOKS ─── */
function useReveal(ref, threshold = 0.08) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      e => { if (e.some(x => x.isIntersecting)) setShown(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return shown;
}
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setP(d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight));
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return p;
}
function useCountUp({ target, durationMs = 1200 }) {
  const [v, setV] = useState(0);
  const raf = useRef(null);
  const start = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const tick = t => {
      const e = 1 - Math.pow(1 - Math.min(1, (t - t0) / durationMs), 3);
      setV(Math.round(target * e));
      if (e < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [target, durationMs]);
  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);
  return { v, start };
}

/* ─── PRIMITIVES ─── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(18px)',
      transition: `opacity .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}
function Tag({ children, light = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 13px', borderRadius: 100, fontSize: 11,
      fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      background: light ? B.black : B.yellow,
      color: light ? B.cream : B.black,
    }}>
      {children}
    </span>
  );
}
function SerifAccent({ children, col }) {
  return (
    <em style={{
      fontFamily: "'DM Serif Display',Georgia,serif",
      fontStyle: 'italic', fontWeight: 400,
      color: col || 'inherit',
    }}>
      {children}
    </em>
  );
}
function Underline({ children, active }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg aria-hidden style={{ position: 'absolute', left: 0, bottom: -3, width: '100%', height: 6, overflow: 'visible' }}>
        <line x1="0" y1="4" x2="100%" y2="4"
          stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="100%" strokeDashoffset={active ? '0' : '100%'}
          style={{ transition: active ? 'stroke-dashoffset .65s cubic-bezier(.4,0,.2,1) .25s' : 'none' }}
        />
      </svg>
    </span>
  );
}

/* ─── CUSTOM SVG ICONS ─── */
const Icon = {
  Analyse: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
      <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
  Entwurf: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/><line x1="7" y1="16" x2="10" y2="16"/>
    </svg>
  ),
  Review: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  Launch: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L12 22M2 12L22 12" opacity="0.3"/>
      <path d="M5 19L12 2L19 19L12 15L5 19Z"/>
    </svg>
  ),
  Anfrage: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Brandbook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Motion: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Web: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Video: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/>
    </svg>
  ),
  WA: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
};

/* ─── SCROLL BAR ─── */
function ScrollBar() {
  const p = useScrollProgress();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, pointerEvents: 'none' }}>
      <div style={{ height: 3, background: 'rgba(232,168,0,0.12)' }}>
        <div style={{ height: '100%', width: `${Math.round(p * 100)}%`, background: B.yellow, transition: 'width 80ms linear' }} />
      </div>
    </div>
  );
}

/* ─── BTNS ─── */
function BtnPrimary({ label, href, lg }) {
  const [h, setH] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: lg ? '16px 36px' : '12px 26px',
        borderRadius: 100, background: h ? B.ocker : B.yellow,
        color: B.black, fontWeight: 800,
        fontSize: lg ? 16 : 14, textDecoration: 'none',
        transition: 'background .18s cubic-bezier(0.4,0,0.2,1)',
        letterSpacing: '-0.01em',
        boxShadow: h ? '0 4px 20px rgba(232,168,0,0.28)' : '0 2px 10px rgba(232,168,0,0.15)',
      }}>
      {label} <ArrowRight size={lg ? 18 : 15} />
    </a>
  );
}
function BtnGhost({ label, href, dark = true }) {
  const [h, setH] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 24px', borderRadius: 100,
        border: `1px solid ${h
          ? (dark ? 'rgba(245,242,235,.45)' : 'rgba(14,12,8,.40)')
          : (dark ? 'rgba(245,242,235,.18)' : 'rgba(14,12,8,.16)')}`,
        color: dark ? B.cream : B.black,
        fontWeight: 600, fontSize: 14, textDecoration: 'none',
        transition: 'border-color .18s cubic-bezier(0.4,0,0.2,1)',
      }}>
      {label}
    </a>
  );
}

/* ─── SECTION ─── */
function Sec({ id, dark = true, children, pad = '80px 20px' }) {
  return (
    <section id={id} style={{
      background: dark ? B.black : B.cream,
      color: dark ? B.cream : B.black,
      padding: pad, position: 'relative',
      overflowX: 'hidden', width: '100%',
    }}>
      <div style={{ maxWidth: 920, margin: '0 auto', width: '100%', textAlign: 'center' }}>
        {children}
      </div>
    </section>
  );
}

/* ─── DIVIDER ─── */
function Div({ from }) {
  return (
    <div style={{
      background: from ? B.black : B.cream,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{
        width: 1, height: 48,
        background: from
          ? 'linear-gradient(to bottom,rgba(232,168,0,0),rgba(232,168,0,.35))'
          : 'linear-gradient(to bottom,rgba(14,12,8,0),rgba(14,12,8,.18))',
      }} />
      <ArrowDown size={17} style={{ color: from ? 'rgba(232,168,0,.45)' : 'rgba(14,12,8,.25)', marginTop: -2 }} />
    </div>
  );
}

/* ─── INTAKE FORM (Phase 0) ─── */
function LeadForm() {
  const [fields, setFields] = useState({ url: '', goal: '', timeline: '', email: '' });
  const [status, setStatus] = useState('idle');

  const set = key => e => setFields(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        marginTop: 18, display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px', borderRadius: 12,
        background: 'rgba(232,168,0,0.08)',
        border: '1px solid rgba(232,168,0,0.22)',
      }}>
        <CheckCircle2 size={16} color={B.yellow} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: 'rgba(245,242,235,0.72)', lineHeight: 1.5 }}>
          Erhalten. Ich melde mich innerhalb von 24 Stunden.
        </span>
      </div>
    );
  }

  const inp = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1px solid rgba(232,168,0,0.20)',
    background: 'rgba(245,242,235,0.05)',
    color: '#F5F2EB', fontSize: 13, outline: 'none',
    fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif",
    boxSizing: 'border-box',
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <style>{`
        .intake-select option { background: #1a1812; color: #F5F2EB; }
        .intake-input::placeholder { color: rgba(245,242,235,0.32); }
        .intake-select:invalid { color: rgba(245,242,235,0.32); }
      `}</style>
      <div style={{ display: 'grid', gap: 8 }}>
        <input
          className="intake-input"
          type="url"
          placeholder="Website-URL — welche Seite soll analysiert werden?"
          value={fields.url}
          onChange={set('url')}
          style={inp}
        />
        <textarea
          className="intake-input"
          placeholder="Was ist dein Ziel? (z.B. mehr Anfragen, besseres Branding, neuer Auftritt…)"
          value={fields.goal}
          onChange={set('goal')}
          rows={2}
          style={{ ...inp, resize: 'none', lineHeight: 1.6 }}
        />
        <select
          className="intake-select"
          value={fields.timeline}
          onChange={set('timeline')}
          required
          style={{ ...inp, color: fields.timeline ? '#F5F2EB' : 'rgba(245,242,235,0.32)' }}
        >
          <option value="" disabled>Wann kann es losgehen?</option>
          <option value="So bald wie möglich">So bald wie möglich</option>
          <option value="In 1–2 Wochen">In 1–2 Wochen</option>
          <option value="In etwa 1 Monat">In etwa 1 Monat</option>
          <option value="Noch offen">Noch offen / nach Absprache</option>
        </select>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            className="intake-input"
            type="email"
            required
            placeholder="E-Mail — wohin soll die Phase-0-Analyse?"
            value={fields.email}
            onChange={set('email')}
            style={{ ...inp, flex: '1 1 180px', minWidth: 0 }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              flexShrink: 0,
              padding: '10px 22px', borderRadius: 100,
              background: status === 'loading' ? 'rgba(232,168,0,0.5)' : B.yellow,
              color: B.black, border: 'none',
              cursor: status === 'loading' ? 'default' : 'pointer',
              fontWeight: 800, fontSize: 13,
              fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif",
              transition: 'background .18s cubic-bezier(0.4,0,0.2,1)',
              alignSelf: 'flex-start',
            }}
          >
            {status === 'loading' ? 'Wird gesendet…' : 'Phase 0 anfragen →'}
          </button>
        </div>
      </div>
      {status === 'error' && (
        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(245,242,235,0.40)' }}>
          Etwas hat nicht geklappt. Bitte direkt an hello@leonseitz.com schreiben.
        </p>
      )}
    </form>
  );
}

/* ──────────────────────────────────────────
   VERTICAL ROADMAP
────────────────────────────────────────── */
function RoadMap() {
  const ref = useRef(null);
  const shown = useReveal(ref, 0.04);
  const steps = [
    {
      n: '0', label: 'Phase 0',
      sub: 'Analyse',
      badge: 'Kostenlos',
      desc: 'Ich schaue mir deinen gesamten Auftritt an — Website, Print, Social, Prozesse, Ladenauftritt. Du bekommst eine ehrliche Einschätzung, wo Potenzial liegt.',
      highlight: true,
    },
    {
      n: '1', label: 'Phase 1',
      sub: 'Erste Umsetzung',
      badge: 'Zahlung nur wenn es dir gefällt',
      desc: 'Ich setze den ersten konkreten Schritt um. Du siehst das fertige Ergebnis — und entscheidest dann ob du zahlst.',
      highlight: false,
    },
    {
      n: '2+', label: 'Phase 2+',
      sub: 'Weiteres nach Bedarf',
      badge: 'Immer erst nach Fertigstellung',
      desc: 'Jede weitere Phase baut auf der vorherigen auf. Kein Vertrag, kein Paket — wir arbeiten so lange wie es sinnvoll ist.',
      highlight: false,
    },
  ];
  return (
    <div ref={ref} style={{ width: '100%', maxWidth: 640, margin: '52px auto 0' }}>
      <div style={{ position: 'relative' }}>
        {/* Vertical connecting line */}
        <div style={{
          position: 'absolute',
          left: 29, top: 58, bottom: 58,
          width: 2,
          background: `linear-gradient(to bottom, ${B.yellow} 0%, rgba(232,168,0,0.18) 60%, rgba(245,242,235,0.03) 100%)`,
          opacity: shown ? 1 : 0,
          transition: 'opacity 1.1s cubic-bezier(0.4,0,0.2,1) .3s',
          borderRadius: 2,
        }} />
        {steps.map((s, i) => (
          <div key={i} style={{
            display: 'flex', gap: 20, alignItems: 'flex-start',
            marginBottom: i < steps.length - 1 ? 16 : 0,
            opacity: shown ? 1 : 0,
            transform: shown ? 'none' : 'translateY(18px)',
            transition: `opacity .7s cubic-bezier(0.4,0,0.2,1) ${i * 130}ms, transform .7s cubic-bezier(0.4,0,0.2,1) ${i * 130}ms`,
          }}>
            {/* Node */}
            <div style={{ flexShrink: 0, zIndex: 1 }}>
              <div style={{
                width: 58, height: 58, borderRadius: '50%',
                background: s.highlight ? B.yellow : '#0e0e18',
                border: s.highlight ? 'none' : '1.5px solid rgba(245,242,235,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: s.n === '2+' ? 13 : 19,
                color: s.highlight ? B.black : 'rgba(245,242,235,0.32)',
                fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif",
                boxShadow: s.highlight
                  ? `0 0 0 7px rgba(232,168,0,0.12), 0 0 0 16px rgba(232,168,0,0.05), 0 8px 28px rgba(232,168,0,0.28)`
                  : 'none',
                position: 'relative',
              }}>
                {s.n}
              </div>
            </div>
            {/* Card */}
            <div style={{
              flex: 1, minWidth: 0,
              padding: '20px 24px 24px',
              borderRadius: 20, marginBottom: 4,
              border: s.highlight
                ? '1.5px solid rgba(232,168,0,0.28)'
                : '1px solid rgba(245,242,235,0.06)',
              background: s.highlight
                ? 'linear-gradient(145deg, rgba(232,168,0,0.09) 0%, rgba(232,168,0,0.025) 100%)'
                : 'rgba(245,242,235,0.015)',
              boxShadow: s.highlight
                ? '0 4px 48px rgba(232,168,0,0.07), inset 0 1px 0 rgba(232,168,0,0.16)'
                : '0 1px 12px rgba(0,0,0,0.18)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Top accent stripe for Phase 0 */}
              {s.highlight && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(to right, ${B.yellow} 0%, rgba(232,168,0,0.20) 100%)`,
                }} />
              )}
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', gap: 10,
                flexWrap: 'wrap', marginBottom: 14,
              }}>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.11em',
                    textTransform: 'uppercase',
                    color: s.highlight ? B.yellow : 'rgba(245,242,235,0.20)',
                    marginBottom: 5,
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontSize: 17, fontWeight: 800,
                    color: s.highlight ? B.cream : 'rgba(245,242,235,0.68)',
                    letterSpacing: '-0.015em', lineHeight: 1.2,
                  }}>
                    {s.sub}
                  </div>
                </div>
                <span style={{
                  flexShrink: 0, marginTop: 2,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '5px 12px', borderRadius: 999,
                  fontSize: 10.5, fontWeight: 700, letterSpacing: '0.025em',
                  background: s.highlight ? B.yellow : 'rgba(245,242,235,0.04)',
                  border: s.highlight ? 'none' : '1px solid rgba(245,242,235,0.08)',
                  color: s.highlight ? B.black : 'rgba(245,242,235,0.28)',
                  whiteSpace: 'nowrap',
                }}>
                  {s.highlight && (
                    <svg width="8" height="8" viewBox="0 0 10 10" fill={B.black}>
                      <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.6 1.9,10 3.1,6.2 0,3.8 3.8,3.8" />
                    </svg>
                  )}
                  {s.badge}
                </span>
              </div>
              {/* Divider */}
              <div style={{
                height: 1, marginBottom: 14,
                background: s.highlight
                  ? 'rgba(232,168,0,0.14)'
                  : 'rgba(245,242,235,0.045)',
              }} />
              {/* Description */}
              <p style={{
                fontSize: 13.5, lineHeight: 1.75, margin: 0,
                color: s.highlight
                  ? 'rgba(245,242,235,0.55)'
                  : 'rgba(245,242,235,0.38)',
              }}>
                {s.desc}
              </p>
              {/* E-Mail-Formular nur für Phase 0 */}
              {s.highlight && <LeadForm />}
            </div>
          </div>
        ))}
        {/* End node */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20, paddingTop: 8,
          opacity: shown ? 1 : 0,
          transition: 'opacity .7s cubic-bezier(0.4,0,0.2,1) 500ms',
        }}>
          <div style={{ width: 58, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              border: `2px solid ${B.yellow}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0.75,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: B.yellow }} />
            </div>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: B.yellow, opacity: 0.75,
          }}>
            Dein Auftritt ist fertig.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── PROOF CARD 21K ─── */
function ProofCard() {
  const ref = useRef(null);
  const shown = useReveal(ref);
  const { v, start } = useCountUp({ target: 21000, durationMs: 1400 });
  useEffect(() => { if (shown) start(); }, [shown, start]);
  const fmt = n => n >= 1000
    ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, '0')}`
    : String(n);
  return (
    <div ref={ref} style={{
      borderRadius: 22, overflow: 'hidden',
      border: '1px solid rgba(232,168,0,0.25)',
      background: '#E0DDD4', padding: 32,
      textAlign: 'left', position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: B.yellow }} />
      <div style={{ marginBottom: 14 }}><Tag light>Echtes Ergebnis</Tag></div>
      <div style={{
        fontSize: 'clamp(1.8rem,6vw,3.5rem)', fontWeight: 900,
        color: B.ocker, lineHeight: 1, letterSpacing: '-0.03em',
      }}>
        {fmt(v)} €
      </div>
      <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, color: B.black }}>
        In 2 Monaten — <SerifAccent col={B.ocker}>durch eine Fundraising-Kampagne.</SerifAccent>
      </div>
      <p style={{ marginTop: 10, fontSize: 13, color: 'rgba(14,12,8,0.58)', lineHeight: 1.68, maxWidth: 360 }}>
        Kein Werbebudget. Nur Konzept, Branding, Landing Page und eine klare Botschaft.
      </p>
      <a href="https://kfa-fundraising.vercel.app/"
      target="_blank"
      rel="noopener noreferrer" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        marginTop: 20, fontSize: 13, fontWeight: 700,
        color: B.ocker, textDecoration: 'none',
      }}>
        Vollständiges Projekt ansehen <ArrowRight size={14} />
      </a>
    </div>
  );
}

/* ─── STAT ROW ─── */
function StatBox({ target, suffix, label, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  const { v, start } = useCountUp({ target, durationMs: 1100 });
  useEffect(() => { if (shown) start(); }, [shown, start]);
  const fmt = n => n >= 1000
    ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, '0')}`
    : String(n);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateX(-10px)',
      transition: `opacity .55s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .55s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      display: 'flex', alignItems: 'baseline', gap: 14, textAlign: 'left',
      paddingLeft: 16, borderLeft: `2px solid ${B.ocker}`,
    }}>
      <div style={{
        fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900,
        color: B.ocker, lineHeight: 1, letterSpacing: '-0.04em',
      }}>
        {fmt(v)}{suffix}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(14,12,8,0.52)', lineHeight: 1.4, maxWidth: 140 }}>{label}</div>
    </div>
  );
}

/* ─── LEISTUNG CARD ─── */
function LeistungCard({ n, icon, kicker, title, desc, accent }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: '36px 32px',
        border: `1px solid ${h ? 'rgba(232,168,0,0.22)' : 'rgba(245,242,235,0.06)'}`,
        background: h ? 'rgba(232,168,0,0.04)' : B.dark,
        textAlign: 'left', position: 'relative', overflow: 'hidden',
        transition: 'border-color .22s cubic-bezier(0.4,0,0.2,1), background .22s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
      }}>
      {/* Large faint number */}
      <div style={{
        position: 'absolute', top: 20, right: 24,
        fontSize: 72, fontWeight: 900, lineHeight: 1,
        color: h ? 'rgba(232,168,0,0.09)' : 'rgba(245,242,235,0.04)',
        letterSpacing: '-0.04em', userSelect: 'none',
        transition: 'color .22s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif",
      }}>
        {n}
      </div>
      {/* Yellow top line on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: B.yellow,
        opacity: h ? 1 : 0,
        transition: 'opacity .22s cubic-bezier(0.4,0,0.2,1)',
      }} />
      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, marginBottom: 24,
        background: h ? 'rgba(232,168,0,0.13)' : 'rgba(245,242,235,0.05)',
        border: `1px solid ${h ? 'rgba(232,168,0,0.22)' : 'rgba(245,242,235,0.09)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: h ? B.yellow : 'rgba(245,242,235,0.45)',
        transition: 'all .22s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {icon}
      </div>
      {/* Kicker */}
      <div style={{
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.09em', color: B.yellow,
        marginBottom: 10, opacity: h ? 1 : 0.65,
        transition: 'opacity .22s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {kicker}
      </div>
      {/* Title */}
      <div style={{
        fontSize: 18, fontWeight: 800, color: B.cream,
        lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: 14,
      }}>
        {title}
      </div>
      {/* Desc */}
      <p style={{
        fontSize: 13, color: 'rgba(245,242,235,0.48)',
        lineHeight: 1.72, maxWidth: 340,
      }}>
        {desc}
      </p>
      {/* Bottom link */}
      <div style={{
        marginTop: 24, display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 12, fontWeight: 700, color: B.yellow,
        opacity: h ? 1 : 0, transition: 'opacity .22s cubic-bezier(0.4,0,0.2,1)',
      }}>
        Anfrage schicken
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke={B.yellow} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

/* ─── SERVICE CARD LARGE ─── */
function ServiceCardLarge({ icon, kicker, title, desc, num, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  const [h, setH] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(20px)',
        transition: `opacity .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, border-color .2s cubic-bezier(0.4,0,0.2,1), background .2s cubic-bezier(0.4,0,0.2,1)`,
        borderRadius: 22, padding: '32px 28px',
        border: h ? '1px solid rgba(232,168,0,0.28)' : '1px solid rgba(245,242,235,0.07)',
        background: h ? 'rgba(232,168,0,0.05)' : B.dark,
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}>
      {/* Large number watermark */}
      <div style={{
        position: 'absolute', top: -8, right: 16,
        fontSize: 80, fontWeight: 900, lineHeight: 1,
        color: 'rgba(245,242,235,0.04)',
        letterSpacing: '-0.04em',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {num}
      </div>
      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: h ? 'rgba(232,168,0,0.15)' : 'rgba(232,168,0,0.09)',
        border: `1px solid rgba(232,168,0,${h ? '0.28' : '0.14'})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: B.yellow, marginBottom: 20,
        transition: 'all .2s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {icon}
      </div>
      {/* Kicker */}
      <div style={{
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.08em', color: B.yellow, marginBottom: 10,
      }}>
        {kicker}
      </div>
      {/* Title */}
      <div style={{
        fontSize: 20, fontWeight: 800, color: B.cream,
        letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 12,
      }}>
        {title}
      </div>
      {/* Desc */}
      <p style={{
        fontSize: 13, color: 'rgba(245,242,235,0.50)',
        lineHeight: 1.72, maxWidth: 320,
      }}>
        {desc}
      </p>
      {/* CTA link */}
      <a href="/#request" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        marginTop: 22, fontSize: 13, fontWeight: 700,
        color: h ? B.yellow : 'rgba(232,168,0,0.50)',
        textDecoration: 'none', transition: 'color .18s cubic-bezier(0.4,0,0.2,1)',
      }}>
        Anfragen <ArrowRight size={14} />
      </a>
    </div>
  );
}

/* ─── SERVICE CARD COMPACT ─── */
function ServiceCardCompact({ icon, kicker, title, desc, num, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  const [h, setH] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(20px)',
        transition: `opacity .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, border-color .2s cubic-bezier(0.4,0,0.2,1), background .2s cubic-bezier(0.4,0,0.2,1)`,
        borderRadius: 20, padding: '24px 24px',
        border: h ? '1px solid rgba(232,168,0,0.22)' : '1px solid rgba(245,242,235,0.06)',
        background: h ? 'rgba(232,168,0,0.04)' : B.dark,
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}>
      {/* Number watermark */}
      <div style={{
        position: 'absolute', top: -6, right: 14,
        fontSize: 60, fontWeight: 900, lineHeight: 1,
        color: 'rgba(245,242,235,0.04)',
        letterSpacing: '-0.04em',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {num}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {/* Icon */}
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: h ? 'rgba(232,168,0,0.14)' : 'rgba(232,168,0,0.08)',
          border: `1px solid rgba(232,168,0,${h ? '0.25' : '0.12'})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: B.yellow, transition: 'all .2s cubic-bezier(0.4,0,0.2,1)',
          marginTop: 2,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: B.yellow, marginBottom: 6,
          }}>
            {kicker}
          </div>
          <div style={{
            fontSize: 16, fontWeight: 800, color: B.cream,
            letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: 8,
          }}>
            {title}
          </div>
          <p style={{
            fontSize: 12, color: 'rgba(245,242,235,0.46)',
            lineHeight: 1.68,
          }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── SERVICE CARD ─── */
function ServiceCard({ icon, kicker, title, desc, dark }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        borderRadius: 20, textAlign: 'left', padding: '22px 24px',
        border: h
          ? '1px solid rgba(232,168,0,0.28)'
          : `1px solid ${dark ? 'rgba(245,242,235,0.06)' : 'rgba(14,12,8,0.08)'}`,
        background: h
          ? (dark ? 'rgba(232,168,0,0.05)' : 'rgba(232,168,0,0.04)')
          : (dark ? 'rgba(245,242,235,0.03)' : '#E8E5DC'),
        transition: 'border-color .2s cubic-bezier(0.4,0,0.2,1), background .2s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'pointer',
      }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: 'rgba(232,168,0,0.11)',
        border: '1px solid rgba(232,168,0,0.16)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: B.yellow, marginBottom: 14,
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.07em', color: B.yellow, marginBottom: 6,
      }}>
        {kicker}
      </div>
      <div style={{
        fontSize: 16, fontWeight: 800,
        color: dark ? B.cream : B.black,
        marginBottom: 8, letterSpacing: '-0.01em',
      }}>
        {title}
      </div>
      <p style={{ fontSize: 13, color: dark ? 'rgba(245,242,235,0.52)' : 'rgba(14,12,8,0.52)', lineHeight: 1.68 }}>
        {desc}
      </p>
    </div>
  );
}

/* ─── TESTIMONIAL CARD ─── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Stars = () => (
  <div style={{ display: 'flex', gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC05">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

function TestimonialCard({ quote, name, company, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(16px)',
      transition: `opacity .6s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .6s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      padding: '26px 28px 24px',
      borderRadius: 20,
      background: '#fff',
      boxShadow: '0 2px 16px rgba(14,12,8,0.08), 0 0 0 1px rgba(14,12,8,0.05)',
      textAlign: 'left', position: 'relative',
    }}>
      {/* Google badge top-right */}
      <div style={{
        position: 'absolute', top: 22, right: 24,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <GoogleIcon />
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(14,12,8,0.35)', letterSpacing: '0.04em' }}>
          Google Rezension
        </span>
      </div>
      {/* Stars */}
      <Stars />
      {/* Quote */}
      <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(14,12,8,0.72)', margin: '14px 0 0' }}>
        {quote}
      </p>
      {/* Author */}
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: `linear-gradient(135deg, ${B.yellow} 0%, ${B.ocker} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 900, color: B.black, flexShrink: 0,
        }}>
          {name[0]}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: B.black }}>{name}</div>
          {company && <div style={{ fontSize: 12, color: 'rgba(14,12,8,0.42)' }}>{company}</div>}
        </div>
      </div>
    </div>
  );
}

/* ─── REFERENZ CARD ─── */
const PROJEKTE = [
  {
    id: 'kfa',
    img: '/projekte/kfa.png',
    kategorie: 'Fundraising-Kampagne',
    name: 'KFA Aschaffenburg',
    desc: '21.000 € in 2 Monaten. Konzept, Branding und Landing Page — komplett ohne Werbebudget.',
    url: 'https://kfa-fundraising.vercel.app/',
  },
  {
    id: 'angelo',
    img: '/projekte/angelo.png',
    kategorie: 'Booking & Branding',
    name: 'Angelo DJ',
    desc: 'Moderne Booking-Seite für einen DJ. Keine Formulare, direkte Anfrage, klares Auftreten.',
    url: 'https://angelo-site.vercel.app/',
  },
  {
    id: 'star-doener',
    img: '/projekte/star-doener.png',
    kategorie: 'Restaurant & Gastronomie',
    name: 'Star Döner',
    desc: 'Moderner Webauftritt für ein Döner-Restaurant. Speisekarte, Standort und klare Conversion.',
    url: 'https://star-doner-website.vercel.app/',
  },
  {
    id: 'paveo',
    img: '/projekte/paveo.png',
    kategorie: 'Agentur-Website',
    name: 'Paveo',
    desc: 'Agentur-Landingpage mit klarer Positionierung, Leistungsübersicht und Kontaktführung.',
    url: 'https://leonseitz.com',
  },
];

function ReferenzCard({ img, kategorie, name, desc, url }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{
        borderRadius: 16, overflow: 'hidden',
        background: 'transparent',
        transition: 'transform .25s cubic-bezier(0.4,0,0.2,1)',
        transform: h ? 'translateY(-3px)' : 'none',
      }}>
        {/* Image container — optimised for 1000×1000 transparent device mockups */}
        <div style={{
          position: 'relative', width: '100%', paddingTop: '72%',
          background: 'linear-gradient(135deg, #F0EDE4 0%, #E8E5DC 100%)',
          overflow: 'hidden',
        }}>
          <img
            src={img}
            alt={name}
            style={{
              position: 'absolute', inset: '4% 2%',
              width: '96%', height: '92%',
              objectFit: 'contain',
              transform: h ? 'scale(1.04) translateY(-1%)' : 'scale(1)',
              transition: 'transform .45s cubic-bezier(0.4,0,0.2,1)',
              filter: 'drop-shadow(0 8px 24px rgba(14,12,8,0.10))',
            }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          {/* Kategorie pill */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            padding: '5px 12px', borderRadius: 999,
            background: 'rgba(14,12,8,0.72)', backdropFilter: 'blur(8px)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: B.cream,
          }}>
            {kategorie}
          </div>
        </div>
        {/* Card body */}
        <div style={{ padding: '18px 4px 8px', textAlign: 'left' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: B.black, letterSpacing: '-0.01em', marginBottom: 5 }}>
            {name}
          </div>
          <p style={{ fontSize: 13, color: 'rgba(14,12,8,0.52)', lineHeight: 1.65, margin: 0 }}>
            {desc}
          </p>
          <div style={{
            marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 12, fontWeight: 700,
            color: h ? B.ocker : 'rgba(14,12,8,0.38)',
            transition: 'color .2s cubic-bezier(0.4,0,0.2,1)',
          }}>
            Projekt ansehen
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </a>
  );
}

/* ─── CALENDLY ─── */
function CalendlyWidget() {
  useEffect(() => {
    const existing = document.querySelector('script[src*="calendly"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <Reveal delay={200}>
      <div style={{
        marginTop: 48, borderRadius: 22,
        border: '1px solid rgba(14,12,8,0.09)',
        background: '#E0DDD4', overflow: 'hidden',
        maxWidth: 720, margin: '48px auto 0',
      }}>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/hello-leonseitz/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=e8a800"
          style={{ height: 700, width: '100%', minWidth: '1px' }}
        />
      </div>
    </Reveal>
  );
}

/* ──────────────────────────────────────────
   PAGE
────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const heroShown = useReveal(heroRef, 0.01);
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", overflowX: 'hidden', position: 'relative', maxWidth: '100vw' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=DM+Serif+Display:ital@1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{scroll-behavior:smooth;overflow-x:hidden;max-width:100%;width:100%}
        *{min-width:0}
        img,svg{max-width:100%}
      `}</style>
      <ScrollBar />
      {/* ── HEADER ── */}
      <div style={{
        position: 'fixed', top: 3, left: 0, right: 0, zIndex: 50,
        padding: '14px 20px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: 15, fontWeight: 900, color: B.cream,
          letterSpacing: '-0.01em', mixBlendMode: 'difference', pointerEvents: 'auto',
        }}>
          Leon Seitz
        </span>
        <a href="/#request" style={{
          pointerEvents: 'auto', fontSize: 13, fontWeight: 700,
          color: B.yellow, textDecoration: 'none',
          padding: '8px 18px', borderRadius: 100,
          border: '1px solid rgba(232,168,0,0.25)',
          background: 'rgba(14,12,8,0.65)', backdropFilter: 'blur(8px)',
        }}>
          Termin buchen
        </a>
      </div>
      {/* ── S1: HERO ── */}
      <Sec id="s1" dark pad="110px 20px 80px">
        <Reveal>
          <div ref={heroRef} style={{
            fontSize: 'clamp(2rem,7vw,4.8rem)', fontWeight: 900,
            lineHeight: 1.06, letterSpacing: '-0.025em',
            color: B.cream, maxWidth: 780, margin: '0 auto', wordBreak: 'break-word',
          }}>
            Dein Betrieb verdient einen Auftritt,
            der{' '}
            <Underline active={heroShown}>wirkt</Underline>
            {' '}– digital{' '}
            <SerifAccent col={B.cream}>und vor Ort.</SerifAccent>
          </div>
        </Reveal>
        <Reveal delay={110}>
          <p style={{
            marginTop: 28, fontSize: 'clamp(1rem,2vw,1.15rem)',
            color: 'rgba(245,242,235,0.55)', lineHeight: 1.75,
            maxWidth: '100%', margin: '28px auto 0',
          }}>
            Ich analysiere wie dein Betrieb aktuell nach außen wirkt — Website, Social Media,
            Flyer, Speisekarte, Ladenauftritt. Und zeige konkret, wo Potenzial liegt.
            Kostenlos. Ohne Commitment.
          </p>
        </Reveal>
        <Reveal delay={230}>
          <div style={{ marginTop: 44, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" lg />
          </div>
        </Reveal>
        <Reveal delay={500}>
          <div style={{ marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,rgba(232,168,0,0),rgba(232,168,0,0.32))' }} />
            <ArrowDown size={16} style={{ color: 'rgba(232,168,0,0.42)' }} />
          </div>
        </Reveal>
      </Sec>
      <Div from={true} />
      {/* ── S2: PROBLEM ── */}
      <Sec id="s2" dark={false} pad="96px 24px">
        <Reveal><Tag light>Das eigentliche Problem</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', color: B.black,
          }}>
            Viele Betriebe sind gut.
            <br />
            <span style={{ color: B.ocker }}>Aber nach außen wirkt es nicht so.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            marginTop: 20, fontSize: 15, color: 'rgba(14,12,8,0.55)',
            lineHeight: 1.75, maxWidth: 500, margin: '20px auto 0',
          }}>
            Ein guter Laden, ein gutes Produkt — aber die Visitenkarte, der Flyer,
            die Website und der Instagram-Auftritt erzählen alle eine andere Geschichte.
            Das kostet Vertrauen und Aufträge, die nie ankommen.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div style={{ marginTop: 52, maxWidth: 620, margin: '52px auto 0', textAlign: 'left' }}>
            {[
              {
                n: '01',
                title: 'Kein klarer Auftrag',
                desc: 'Der CTA fehlt oder ist versteckt. Der Besucher weiß nicht, was als nächstes passieren soll.',
              },
              {
                n: '02',
                title: 'Kein konsistentes Branding',
                desc: 'Website, Social und Print wirken wie von drei verschiedenen Personen. Das kostet Vertrauen.',
              },
              {
                n: '03',
                title: 'Botschaft zu allgemein',
                desc: 'In fünf Sekunden wird nicht klar, warum der Besucher bleiben sollte.',
              },
            ].map((item, i, arr) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '36px 1fr', gap: '0 18px',
                paddingTop: i > 0 ? 28 : 0,
                paddingBottom: i < arr.length - 1 ? 28 : 0,
                borderBottom: i < arr.length - 1 ? '1px solid rgba(14,12,8,0.07)' : 'none',
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: B.ocker,
                  letterSpacing: '0.1em', paddingTop: 3,
                }}>
                  {item.n}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: B.black, marginBottom: 7, letterSpacing: '-0.01em' }}>
                    {item.title}
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(14,12,8,0.52)', lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={320}>
          <div style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" />
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <a href="#s3" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              textDecoration: 'none', color: 'rgba(14,12,8,0.25)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              Wie wir arbeiten <ArrowDown size={16} style={{ color: B.ocker }} />
            </a>
          </div>
        </Reveal>
      </Sec>
      <Div from={false} />
      {/* ── S3: ROADMAP ── */}
      <Sec id="s3" dark pad="96px 24px">
        <Reveal><Tag>Wie wir arbeiten</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', color: B.cream,
          }}>
            Phase 0 ist kostenlos.
            <br />
            Du zahlst nur, wenn es dir <SerifAccent col={B.cream}>gefällt.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{
            marginTop: 20, fontSize: 15, color: 'rgba(245,242,235,0.52)',
            lineHeight: 1.75, maxWidth: 480, margin: '20px auto 0',
          }}>
            Kein Paket, kein Festpreis im Voraus. Wir arbeiten iterativ — Schritt für Schritt,
            und du entscheidest nach jeder Runde ob es weitergeht.
          </p>
        </Reveal>
        <RoadMap />
        <Reveal delay={100}>
          <div style={{ marginTop: 52, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', padding: '0 4px' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" />
            <BtnGhost label="Ablauf im Detail" href="/prozess" />
          </div>
        </Reveal>
      </Sec>
      {/* ── S3.5: VERGLEICH ── */}
      <Sec id="vergleich" dark pad="0 24px 96px">
        <Reveal><Tag>Der Unterschied</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', color: B.cream,
          }}>
            Klassische Agentur — oder einfach <SerifAccent col={B.yellow}>Leon.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <div style={{ marginTop: 48, maxWidth: 720, margin: '48px auto 0', overflowX: 'auto' }}>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, marginBottom: 2 }}>
              <div />
              <div style={{
                padding: '13px 16px', borderRadius: '12px 12px 0 0',
                background: 'rgba(245,242,235,0.04)', border: '1px solid rgba(245,242,235,0.07)',
                borderBottom: 'none', fontSize: 12.5, fontWeight: 800,
                color: 'rgba(245,242,235,0.40)', textAlign: 'center',
              }}>
                Klassische Agentur 😩
              </div>
              <div style={{
                padding: '13px 16px', borderRadius: '12px 12px 0 0',
                background: 'rgba(232,168,0,0.10)', border: `1px solid rgba(232,168,0,0.26)`,
                borderBottom: 'none', fontSize: 12.5, fontWeight: 800,
                color: B.yellow, textAlign: 'center',
              }}>
                Leon Seitz 🤝
              </div>
            </div>
            {/* Data rows */}
            {[
              { label: 'Bezahlung',        them: 'Vorauskasse, Ergebnis offen',    us: 'Du zahlst erst wenn es dir gefällt' },
              { label: 'Erste Ergebnisse', them: 'Wochen Wartezeit',               us: 'In 24–72 Stunden' },
              { label: 'Kommunikation',    them: 'Ticket-System, Umwege',          us: 'Direkt mit mir — kein Umweg' },
              { label: 'Risiko',           them: 'Geld weg, Ergebnis unsicher',    us: 'Gefällt es nicht? Kostet nichts.' },
            ].map((row, i, arr) => {
              const isLast = i === arr.length - 1;
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, marginBottom: isLast ? 0 : 2 }}>
                  <div style={{
                    padding: '15px 4px 15px 0',
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'rgba(245,242,235,0.30)',
                    textAlign: 'left', display: 'flex', alignItems: 'center',
                  }}>
                    {row.label}
                  </div>
                  <div style={{
                    padding: '15px 16px',
                    background: 'rgba(245,242,235,0.025)',
                    border: '1px solid rgba(245,242,235,0.055)', borderTop: 'none',
                    borderRadius: isLast ? '0 0 0 12px' : 0,
                    fontSize: 13, color: 'rgba(245,242,235,0.35)',
                    textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {row.them}
                  </div>
                  <div style={{
                    padding: '15px 16px',
                    background: 'rgba(232,168,0,0.07)',
                    border: '1px solid rgba(232,168,0,0.17)', borderTop: 'none',
                    borderRadius: isLast ? '0 0 12px 0' : 0,
                    fontSize: 13, fontWeight: 700, color: 'rgba(245,242,235,0.85)',
                    textAlign: 'center', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 7,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6.5L4.5 9L10 3" stroke={B.yellow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {row.us}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Sec>
      <Div from={true} />
      {/* ── S4: PROOF ── */}
      <Sec id="s4" dark={false} pad="96px 24px">
        <Reveal><Tag light>Ergebnisse</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, marginBottom: 48,
            fontSize: 'clamp(1.6rem,5vw,3rem)', fontWeight: 900,
            lineHeight: 1.1, letterSpacing: '-0.02em', color: B.black,
          }}>
            Zahlen, die man <SerifAccent col={B.ocker}>einordnen</SerifAccent> kann.
          </h2>
        </Reveal>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))',
          gap: 20, alignItems: 'start', textAlign: 'left',
        }}>
          <Reveal delay={80}><ProofCard /></Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <StatBox target={15}  suffix="+ Mio" label="Likes auf erstellten Inhalten"     delay={120} />
            <StatBox target={10}  suffix="+ Mio" label="Klicks über Social Media generiert" delay={200} />
            <StatBox target={100} suffix="+"     label="Abgeschlossene Projekte"            delay={280} />
          </div>
        </div>
        <Reveal delay={300}>
          <div style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}>
            <BtnPrimary label="Instagram ansehen" href="https://www.instagram.com/leonnseitz" target="_blank" />
          </div>
        </Reveal>
        <Reveal delay={380}>
          <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <a href="#s5" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              textDecoration: 'none', color: 'rgba(14,12,8,0.25)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              Leistungen <ArrowDown size={16} style={{ color: B.ocker }} />
            </a>
          </div>
        </Reveal>
      </Sec>
      {/* ── S4.5: REFERENZEN ── */}
      <Sec id="referenzen" dark={false} pad="0 24px 96px">
        <Reveal><Tag light>Referenzen</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', color: B.black,
          }}>
            Projekte, die für sich <SerifAccent col={B.ocker}>sprechen.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{
            marginTop: 16, fontSize: 15, color: 'rgba(14,12,8,0.52)',
            lineHeight: 1.75, maxWidth: 440, margin: '16px auto 0',
          }}>
            Echte Projekte, echte Ergebnisse — von Fundraising bis Booking.
          </p>
        </Reveal>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
          gap: 20, marginTop: 48, textAlign: 'left',
        }}>
          {PROJEKTE.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ReferenzCard {...p} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={240}>
          <div style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" />
          </div>
        </Reveal>
      </Sec>
      {/* ── S4.6: TESTIMONIALS ── */}
      <Sec id="testimonials" dark={false} pad="0 24px 96px">
        <Reveal><Tag light>Stimmen</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', color: B.black,
          }}>
            Was Kunden <SerifAccent col={B.ocker}>sagen.</SerifAccent>
          </h2>
        </Reveal>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
          gap: 20, marginTop: 48,
        }}>
          <TestimonialCard
            delay={80}
            quote="Von der ersten Idee bis zur finalen Umsetzung alles auf sehr hohem professionellen Niveau. Meine Wünsche wurden vollständig berücksichtigt und sinnvolle Vorschläge eingebracht, die das Ergebnis noch verbessert haben. Das Ergebnis hat meine Erwartungen vollkommen erfüllt — die Website ist modern, funktional und optisch sehr ansprechend."
            name="Oksana Hettinger"
          />
          <TestimonialCard
            delay={160}
            quote="Ich kann Leon uneingeschränkt weiterempfehlen. Die Zusammenarbeit mit ihm ist immer kooperativ, effektiv und zielführend."
            name="Dominic Hildebrandt"
          />
        </div>
      </Sec>
      <Div from={false} />
      {/* ── S5: LEISTUNGEN ── */}
      <Sec id="s5" dark pad="96px 24px">
        <Reveal><Tag>Leistungen</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', color: B.cream,
          }}>
            Was ich analysiere <SerifAccent col={B.cream}>und umsetze.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p style={{
            fontSize: 15, color: 'rgba(245,242,235,0.52)',
            maxWidth: 400, margin: '12px auto 56px', lineHeight: 1.72,
          }}>
            Je nachdem wo dein Betrieb steht — ich schaue zuerst, dann machen wir.
          </p>
        </Reveal>
        {/* 2x2 large cards with numbered index */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 2 }}>
          {[
            {
              n: '01',
              icon: <Icon.Web />,
              kicker: 'Digitaler Auftritt',
              title: 'Website, Social, Online-Präsenz.',
              desc: 'Klarer Aufbau, klare Botschaft. Damit ein Besucher in fünf Sekunden versteht, was du machst — und warum er bleiben soll.',
              accent: B.yellow,
            },
            {
              n: '02',
              icon: <Icon.Brandbook />,
              kicker: 'Print & Branding',
              title: 'Flyer, Speisekarten, Materialien.',
              desc: 'Visitenkarte, Flyer, Speisekarte, Broschüre — konsistent, professionell, erkennbar. Alles was dein Betrieb anfasst, sollte gut aussehen.',
              accent: B.yellow,
            },
            {
              n: '03',
              icon: <Icon.Motion />,
              kicker: 'Content & Motion',
              title: 'Social Content, der auffällt.',
              desc: 'Kurzvideos, Reels, Motion Graphics. Damit du regelmäßig sichtbar bist — ohne jedes Format von null aufzubauen.',
              accent: B.yellow,
            },
            {
              n: '04',
              icon: <Icon.Video />,
              kicker: 'Prozesse',
              title: 'Abläufe, die Zeit sparen.',
              desc: 'Bestellungen, Kommunikation, interne Abläufe — ich schaue was sich digitalisieren oder vereinfachen lässt. Konkret, umsetzbar.',
              accent: B.yellow,
            },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 70}>
              <LeistungCard {...s} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={260}>
          <div style={{
            marginTop: 16, padding: '22px 26px',
            border: '1px dashed rgba(232,168,0,0.22)',
            borderRadius: 16, background: 'rgba(232,168,0,0.03)',
            textAlign: 'left', position: 'relative',
          }}>
            <span style={{
              position: 'absolute', top: -11, left: 26,
              padding: '3px 12px', borderRadius: 99,
              background: B.black,
              border: '1px solid rgba(232,168,0,0.25)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: B.yellow,
            }}>
              In Arbeit
            </span>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: B.yellow, marginBottom: 8, opacity: 0.7 }}>
              05 — Automatisierte Workflows
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: B.cream, marginBottom: 10 }}>
              Prozesse, die von selbst laufen.
            </div>
            <p style={{ fontSize: 13, color: 'rgba(245,242,235,0.45)', lineHeight: 1.72, maxWidth: 580, margin: 0 }}>
              CRM-Synchronisierung, automatisierte E-Mail-Sequenzen, Buchungssysteme, Benachrichtigungen — das kommt bald als eigenes Paket. Ich baue das gerade auf. Wenn dich das interessiert, einfach vormerken lassen.
            </p>
            <a href="/#request" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 16, fontSize: 12, fontWeight: 700,
              color: B.yellow, textDecoration: 'none', opacity: 0.75,
            }}>
              Vormerken lassen <ArrowRight size={12} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" />
          </div>
        </Reveal>
      </Sec>
      <Div from={true} />
      {/* ── S6: ANFRAGE + CALENDLY ── */}
      <Sec id="request" dark={false} pad="80px 20px 64px">
        {/* Tagesstreifen */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: B.yellow }} />
        <Reveal><Tag light>Einstieg</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', color: B.black,
          }}>
            Lass uns reden. <SerifAccent col={B.ocker}>Kostenlos.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{
            marginTop: 16, fontSize: 15, color: 'rgba(14,12,8,0.55)',
            lineHeight: 1.75, maxWidth: 440, margin: '16px auto 0',
          }}>
            Ich schaue mir deinen Betrieb an — digital und vor Ort wenn nötig —
            und sage dir ehrlich, wo ich Potenzial sehe. Kein Paket, kein Commitment.
            Phase 0 ist kostenlos.
          </p>
        </Reveal>
        {/* Calendly */}
        <CalendlyWidget />
        {/* Alt contact */}
        <Reveal delay={280}>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', padding: '0 4px' }}>
            <a
              href="https://wa.me/4916095757167?text=Hi%20Leon%2C%0A%0AZiel%3A%0ADeadline%3A%0AStand%3A%0A%0AKurzer%20Kontext%3A"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 24px', borderRadius: 100,
                background: '#25D366', color: '#fff',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                transition: 'opacity .18s cubic-bezier(0.4,0,0.2,1)',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <Icon.WA /> WhatsApp schreiben
            </a>
            <a
              href="mailto:hello@leonseitz.com?subject=Kostenlose Website-Analyse&body=Meine Website: %0D%0AZiel: %0D%0ADeadline (optional): %0D%0A"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 24px', borderRadius: 100,
                border: '1px solid rgba(14,12,8,0.16)',
                background: 'transparent', color: 'rgba(14,12,8,0.62)',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                transition: 'border-color .18s cubic-bezier(0.4,0,0.2,1), color .18s cubic-bezier(0.4,0,0.2,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(14,12,8,0.40)'; e.currentTarget.style.color = B.black; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(14,12,8,0.16)'; e.currentTarget.style.color = 'rgba(14,12,8,0.62)'; }}
            >
              <Mail size={16} /> E-Mail schreiben
            </a>
          </div>
          <p style={{ marginTop: 12, fontSize: 12, color: 'rgba(14,12,8,0.32)', textAlign: 'center' }}>
            Oder direkt: <strong style={{ color: 'rgba(14,12,8,0.52)' }}>hello@leonseitz.com</strong>
          </p>
        </Reveal>
        {/* Prozess link */}
        <Reveal delay={340}>
          <div style={{
            marginTop: 56, padding: '24px 28px', borderRadius: 18,
            border: '1px solid rgba(14,12,8,0.08)', background: '#E8E5DC',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16, maxWidth: 560, margin: '56px auto 0', textAlign: 'left',
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: B.black, marginBottom: 4 }}>
                Wie läuft ein Projekt ab?
              </div>
              <p style={{ fontSize: 13, color: 'rgba(14,12,8,0.52)', lineHeight: 1.62 }}>
                Alle Sprints, Zahlungsziele und Meilensteine im Detail.
              </p>
            </div>
            <a href="/prozess" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 22px', borderRadius: 100,
              background: B.black, color: B.cream,
              fontSize: 13, fontWeight: 700, textDecoration: 'none',
              flexShrink: 0,
            }}>
              Prozess ansehen <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
        {/* Footer */}
        <Reveal delay={380}>
          <div style={{
            marginTop: 72, paddingTop: 28,
            borderTop: '1px solid rgba(14,12,8,0.07)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 12,
          }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: B.black }}>Leon Seitz</span>
            <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'rgba(14,12,8,0.38)' }}>
             {[['Instagram', 'https://www.instagram.com/leonnseitz'], ['Prozess', '/prozess'], ['AGB', '/agb'], ['Impressum', '/impressum'], ['Datenschutz', '/datenschutz']].map(([l, h]) => (
  <a key={l} href={h} style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
))}
            </div>
            <span style={{ fontSize: 12, color: 'rgba(14,12,8,0.26)' }}>© 2026</span>
          </div>
        </Reveal>
      </Sec>
    </div>
  );
}
