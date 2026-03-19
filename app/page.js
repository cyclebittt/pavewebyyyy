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
      transform: shown ? 'none' : 'translateY(20px)',
      transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Tag({ children, light = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 12px', borderRadius: 100, fontSize: 11,
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

/* ─── HAND-DRAWN ARROW SVG ─── */
function HandArrow({ style = {} }) {
  return (
    <svg viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 120, height: 80, ...style }}>
      <path
        d="M20 30 C40 10, 90 10, 110 40 C125 60, 120 80, 145 95"
        stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round" fill="none"
        strokeDasharray="220" strokeDashoffset="0"
      />
      <path
        d="M135 100 L145 95 L138 85"
        stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

function HandArrowLeft({ style = {} }) {
  return (
    <svg viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 120, height: 80, transform: 'scaleX(-1)', ...style }}>
      <path
        d="M20 30 C40 10, 90 10, 110 40 C125 60, 120 80, 145 95"
        stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round" fill="none"
      />
      <path
        d="M135 100 L145 95 L138 85"
        stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
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
      <div style={{ height: 3, background: 'rgba(232,168,0,0.15)' }}>
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
        transition: 'background .18s', letterSpacing: '-0.01em',
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
          : (dark ? 'rgba(245,242,235,.20)' : 'rgba(14,12,8,.18)')}`,
        color: dark ? B.cream : B.black,
        fontWeight: 600, fontSize: 14, textDecoration: 'none',
        transition: 'border-color .18s',
      }}>
      {label}
    </a>
  );
}

/* ─── SECTION ─── */
function Sec({ id, dark = true, children, pad = '100px 24px' }) {
  return (
    <section id={id} style={{
      background: dark ? B.black : B.cream,
      color: dark ? B.cream : B.black,
      padding: pad, position: 'relative',
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
          ? 'linear-gradient(to bottom,rgba(232,168,0,0),rgba(232,168,0,.40))'
          : 'linear-gradient(to bottom,rgba(14,12,8,0),rgba(14,12,8,.22))',
      }} />
      <ArrowDown size={17} style={{ color: from ? 'rgba(232,168,0,.50)' : 'rgba(14,12,8,.28)', marginTop: -2 }} />
    </div>
  );
}

/* ──────────────────────────────────────────
   WINDING ROAD ROADMAP
────────────────────────────────────────── */
function RoadMap() {
  const ref = useRef(null);
  const shown = useReveal(ref, 0.04);

  const milestones = [
    { x: 72,  y: 198, n: '0', label: 'Sprint 0', sub: 'Analyse + Entwurf', note: 'Kostenlos', above: false, left: true  },
    { x: 278, y: 118, n: '1', label: 'Sprint 1', sub: 'Erste Version',      note: '30 % nach Review',    above: true,  left: false },
    { x: 490, y: 198, n: '2', label: 'Sprint 2', sub: 'Feinschliff',        note: '50 % nach Freigabe',  above: false, left: true  },
    { x: 706, y: 118, n: '3', label: 'Sprint 3', sub: 'Go-Live + Übergabe', note: '20 % nach Übergabe',  above: true,  left: false },
  ];

  return (
    <div ref={ref} style={{ width: '100%', marginTop: 52, overflowX: 'auto' }}>
      <svg viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', minWidth: 520, display: 'block' }}>

        {/* ── Road path (dark band) ── */}
        <path
          d="M 0 220 C 60 220, 100 140, 180 130 C 260 120, 300 180, 380 190 C 460 200, 500 130, 580 120 C 660 110, 700 170, 780 160"
          fill="none" stroke={B.dark} strokeWidth="44" strokeLinecap="round"
        />
        {/* Road centre dashes */}
        <path
          d="M 0 220 C 60 220, 100 140, 180 130 C 260 120, 300 180, 380 190 C 460 200, 500 130, 580 120 C 660 110, 700 170, 780 160"
          fill="none" stroke="rgba(232,168,0,0.20)" strokeWidth="2"
          strokeDasharray="18 14" strokeLinecap="round"
        />
        {/* Road highlight (top edge) */}
        <path
          d="M 0 220 C 60 220, 100 140, 180 130 C 260 120, 300 180, 380 190 C 460 200, 500 130, 580 120 C 660 110, 700 170, 780 160"
          fill="none" stroke="rgba(245,242,235,0.06)" strokeWidth="20"
          strokeLinecap="round"
          style={{ transform: 'translateY(-12px)' }}
        />

        {/* ── Milestones ── */}
        {milestones.map((m, i) => {
          const isHighlight = i === 0;
          const lineY1 = m.above ? m.y - 24 : m.y + 24;
          const textY  = m.above ? m.y - 36 : m.y + 36;
          const delay  = 300 + i * 180;

          return (
            <g key={i} style={{
              opacity: shown ? 1 : 0,
              transition: `opacity .55s ease ${delay}ms`,
            }}>
              {/* Stem line */}
              <line
                x1={m.x} y1={lineY1}
                x2={m.x} y2={m.above ? m.y - 60 : m.y + 60}
                stroke={isHighlight ? B.yellow : 'rgba(245,242,235,0.25)'}
                strokeWidth="1.5" strokeDasharray="4 3"
              />

              {/* Circle */}
              <circle
                cx={m.x} cy={m.y} r="22"
                fill={isHighlight ? B.yellow : B.dark}
                stroke={isHighlight ? B.yellow : 'rgba(245,242,235,0.20)'}
                strokeWidth="2"
                style={{ filter: isHighlight ? 'drop-shadow(0 0 12px rgba(232,168,0,0.50))' : 'none' }}
              />
              {/* Number in circle */}
              <text x={m.x} y={m.y + 5} textAnchor="middle"
                fill={isHighlight ? B.black : B.cream}
                fontSize="13" fontWeight="900"
                fontFamily="'Plus Jakarta Sans',system-ui,sans-serif">
                {m.n}
              </text>

              {/* Label block */}
              <text x={m.x} y={m.above ? m.y - 72 : m.y + 72}
                textAnchor="middle"
                fill={isHighlight ? B.yellow : 'rgba(245,242,235,0.55)'}
                fontSize="9.5" fontWeight="700" letterSpacing="0.06em"
                fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
                style={{ textTransform: 'uppercase' }}>
                {m.label}
              </text>
              <text x={m.x} y={m.above ? m.y - 57 : m.y + 87}
                textAnchor="middle"
                fill={B.cream}
                fontSize="11.5" fontWeight="800"
                fontFamily="'Plus Jakarta Sans',system-ui,sans-serif">
                {m.sub}
              </text>
              {/* Payment badge */}
              <rect
                x={m.x - 44} y={m.above ? m.y - 50 : m.y + 100}
                width="88" height="18" rx="9"
                fill={isHighlight ? B.yellow : 'rgba(245,242,235,0.08)'}
                stroke={isHighlight ? 'none' : 'rgba(245,242,235,0.12)'}
                strokeWidth="1"
              />
              <text
                x={m.x} y={m.above ? m.y - 37 : m.y + 113}
                textAnchor="middle"
                fill={isHighlight ? B.black : 'rgba(245,242,235,0.50)'}
                fontSize="9" fontWeight="700"
                fontFamily="'Plus Jakarta Sans',system-ui,sans-serif">
                {m.note}
              </text>
            </g>
          );
        })}

        {/* ── Payment bar at bottom ── */}
        <g style={{ opacity: shown ? 1 : 0, transition: 'opacity .7s ease 1s' }}>
          <text x="390" y="300" textAnchor="middle"
            fill="rgba(245,242,235,0.28)" fontSize="9" fontWeight="700" letterSpacing="0.07em"
            fontFamily="'Plus Jakarta Sans',system-ui,sans-serif">
            ZAHLUNGSSTRUKTUR
          </text>
          {/* Bar */}
          <rect x="100" y="310" width="582" height="6" rx="3" fill="rgba(245,242,235,0.06)" />
          <rect x="100" y="310" width="174" height="6" rx="3" fill="rgba(232,168,0,0.45)" />
          <rect x="277" y="310" width="290" height="6" fill="rgba(232,168,0,0.65)" />
          <rect x="570" y="310" width="112" height="6" rx="3" fill={B.yellow} />
          {/* Labels */}
          {[
            { x: 100, label: 'Kostenlos', col: B.yellow },
            { x: 188, label: '30 %', col: 'rgba(245,242,235,0.45)' },
            { x: 422, label: '50 %', col: 'rgba(245,242,235,0.45)' },
            { x: 626, label: '20 %', col: 'rgba(245,242,235,0.45)' },
          ].map((b, i) => (
            <text key={i} x={b.x} y={325} textAnchor="middle"
              fill={b.col} fontSize="8.5" fontWeight="700"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif">
              {b.label}
            </text>
          ))}
        </g>
      </svg>
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
      borderRadius: 20, overflow: 'hidden',
      border: '1px solid rgba(232,168,0,0.28)',
      background: '#E0DDD4', padding: 32,
      textAlign: 'left', position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: B.yellow }} />
      <div style={{ marginBottom: 12 }}><Tag light>Echtes Ergebnis</Tag></div>
      <div style={{
        fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 900,
        color: B.ocker, lineHeight: 1, letterSpacing: '-0.03em',
      }}>
        {fmt(v)} €
      </div>
      <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, color: B.black }}>
        In 2 Monaten — <SerifAccent col={B.ocker}>durch eine Fundraising-Kampagne.</SerifAccent>
      </div>
      <p style={{ marginTop: 10, fontSize: 13, color: 'rgba(14,12,8,0.60)', lineHeight: 1.65, maxWidth: 360 }}>
        Kein Werbebudget. Nur Konzept, Branding, Landing Page und eine klare Botschaft.
      </p>
      <a href="/portfolio" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        marginTop: 20, fontSize: 13, fontWeight: 700,
        color: B.ocker, textDecoration: 'none',
      }}>
        Vollständiges Projekt ansehen <ArrowRight size={14} />
      </a>
    </div>
  );
}

/* ─── STAT BOX ─── */
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
      opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(14px)',
      transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`,
      padding: '20px 18px', borderRadius: 16,
      border: '1px solid rgba(14,12,8,0.09)',
      background: '#E8E5DC', textAlign: 'center',
    }}>
      <div style={{
        fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900,
        color: B.ocker, lineHeight: 1, letterSpacing: '-0.03em',
      }}>
        {fmt(v)}{suffix}
      </div>
      <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(14,12,8,0.55)' }}>{label}</div>
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
        borderRadius: 18, textAlign: 'left', padding: '22px 24px',
        border: h
          ? '1px solid rgba(232,168,0,0.30)'
          : `1px solid ${dark ? 'rgba(245,242,235,0.07)' : 'rgba(14,12,8,0.09)'}`,
        background: h
          ? (dark ? 'rgba(232,168,0,0.06)' : 'rgba(232,168,0,0.04)')
          : (dark ? 'rgba(245,242,235,0.03)' : '#E8E5DC'),
        transition: 'border-color .2s, background .2s',
        cursor: 'pointer',
      }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: 'rgba(232,168,0,0.12)',
        border: '1px solid rgba(232,168,0,0.18)',
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
      <p style={{ fontSize: 13, color: dark ? 'rgba(245,242,235,0.55)' : 'rgba(14,12,8,0.55)', lineHeight: 1.65 }}>
        {desc}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────
   PAGE
────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const heroShown = useReveal(heroRef, 0.01);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=DM+Serif+Display:ital@1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
      `}</style>

      <ScrollBar />

      {/* ── HEADER ── */}
      <div style={{
        position: 'fixed', top: 3, left: 0, right: 0, zIndex: 50,
        padding: '14px 28px', display: 'flex', justifyContent: 'space-between',
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
          border: '1px solid rgba(232,168,0,0.28)',
          background: 'rgba(14,12,8,0.65)', backdropFilter: 'blur(8px)',
        }}>
          Termin buchen
        </a>
      </div>

      {/* ── S1: HERO ── */}
      <Sec id="s1" dark pad="130px 24px 100px">
        <Reveal>
          <div ref={heroRef} style={{
            fontSize: 'clamp(2.4rem,6.5vw,5rem)', fontWeight: 900,
            lineHeight: 1.04, letterSpacing: '-0.03em',
            color: B.cream, maxWidth: 780, margin: '0 auto',
          }}>
            Mehr Anfragen durch eine Website, die{' '}
            <Underline active={heroShown}>klar ist</Underline>
            {' '}– nicht nur{' '}
            <SerifAccent col={B.cream}>schön.</SerifAccent>
          </div>
        </Reveal>
        <Reveal delay={110}>
          <p style={{
            marginTop: 28, fontSize: 'clamp(1rem,2vw,1.15rem)',
            color: 'rgba(245,242,235,0.58)', lineHeight: 1.72,
            maxWidth: 520, margin: '28px auto 0',
          }}>
            Ich analysiere deine aktuelle Website kostenlos, zeige konkret was nicht funktioniert –
            und liefere einen ersten Entwurf. Ohne Risiko, ohne Commitment.
          </p>
        </Reveal>
        <Reveal delay={230}>
          <div style={{ marginTop: 44, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" lg />
            <BtnGhost label="Portfolio ansehen" href="/portfolio" />
          </div>
        </Reveal>
        <Reveal delay={500}>
          <div style={{ marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,rgba(232,168,0,0),rgba(232,168,0,0.35))' }} />
            <ArrowDown size={16} style={{ color: 'rgba(232,168,0,0.45)' }} />
          </div>
        </Reveal>
      </Sec>

      <Div from={true} />

      {/* ── S2: PROBLEM ── */}
      <Sec id="s2" dark={false} pad="96px 24px">
        <Reveal><Tag light>Das eigentliche Problem</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.8rem,4vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.black,
          }}>
            Viele Websites sehen gut aus.
            <br />
            <span style={{ color: B.ocker }}>Und erzeugen trotzdem keine Anfragen.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            marginTop: 20, fontSize: 15, color: 'rgba(14,12,8,0.58)',
            lineHeight: 1.72, maxWidth: 500, margin: '20px auto 0',
          }}>
            Das liegt selten am Design. Branding, Botschaft und Seitenstruktur sind nicht aufeinander abgestimmt.
            Der Besucher kommt — und weiß nicht, was er tun soll.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={B.ocker} strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                ),
                title: 'Kein klarer Auftrag',
                desc: 'Der CTA fehlt oder ist versteckt. Der Besucher weiß nicht, was als nächstes passieren soll.',
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={B.ocker} strokeWidth="1.8" strokeLinecap="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                ),
                title: 'Kein konsistentes Branding',
                desc: 'Website, Social und Print wirken wie von drei verschiedenen Personen. Das kostet Vertrauen.',
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={B.ocker} strokeWidth="1.8" strokeLinecap="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                ),
                title: 'Botschaft zu allgemein',
                desc: 'In fünf Sekunden wird nicht klar, warum der Besucher bleiben sollte.',
              },
            ].map((c, i) => (
              <div key={i} style={{
                padding: '24px 22px', borderRadius: 16,
                border: '1px solid rgba(14,12,8,0.09)',
                background: '#E8E5DC', textAlign: 'left',
              }}>
                <div style={{ marginBottom: 14 }}>{c.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: B.black, marginBottom: 8 }}>{c.title}</div>
                <p style={{ fontSize: 13, color: 'rgba(14,12,8,0.55)', lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}>
            <BtnPrimary label="Kostenlos prüfen lassen" href="/#request" />
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <a href="#s3" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              textDecoration: 'none', color: 'rgba(14,12,8,0.28)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              Der Ablauf <ArrowDown size={16} style={{ color: B.ocker }} />
            </a>
          </div>
        </Reveal>
      </Sec>

      <Div from={false} />

      {/* ── S3: ROADMAP ── */}
      <Sec id="s3" dark pad="96px 24px">
        <Reveal><Tag>Der Ablauf</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.8rem,4vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.cream,
          }}>
            Du siehst den Entwurf.
            <br />
            Erst dann <SerifAccent col={B.cream}>entscheidest</SerifAccent> du.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{
            marginTop: 20, fontSize: 15, color: 'rgba(245,242,235,0.55)',
            lineHeight: 1.72, maxWidth: 480, margin: '20px auto 0',
          }}>
            Sprint 0 ist kostenlos. Kein Angebot ins Blaue — du siehst das Ergebnis bevor du zahlst.
          </p>
        </Reveal>

        {/* Hand arrow pointing to roadmap */}
        <div style={{ position: 'relative', marginTop: 8 }}>
          <HandArrow style={{ position: 'absolute', right: '8%', top: 10, opacity: 0.7 }} />
        </div>

        <RoadMap />

        {/* Process steps below road */}
        <Reveal delay={200}>
          <div style={{
            marginTop: 48, display: 'flex', justifyContent: 'center',
            gap: 0, flexWrap: 'wrap',
          }}>
            {[
              { icon: <Icon.Anfrage />, label: 'Anfrage' },
              { icon: <Icon.Analyse />, label: 'Analyse' },
              { icon: <Icon.Entwurf />, label: 'Entwurf' },
              { icon: <Icon.Review />, label: 'Review' },
              { icon: <Icon.Launch />, label: 'Go-Live' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '0 8px' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 13,
                    background: i === 0 ? B.yellow : 'rgba(245,242,235,0.06)',
                    border: i === 0 ? 'none' : '1px solid rgba(245,242,235,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: i === 0 ? B.black : 'rgba(245,242,235,0.55)',
                    boxShadow: i === 0 ? '0 0 22px rgba(232,168,0,0.30)' : 'none',
                  }}>
                    {s.icon}
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: i === 0 ? B.yellow : 'rgba(245,242,235,0.35)',
                  }}>
                    {s.label}
                  </span>
                </div>
                {i < 4 && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ width: 24, height: 1, background: 'linear-gradient(to right,rgba(232,168,0,0.35),rgba(232,168,0,0.10))' }} />
                    <ArrowRight size={11} style={{ color: 'rgba(232,168,0,0.25)', marginLeft: -2 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginTop: 52, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" />
            <BtnGhost label="Ablauf im Detail" href="/prozess" />
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
            fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900,
            lineHeight: 1.1, letterSpacing: '-0.025em', color: B.black,
          }}>
            Zahlen, die man <SerifAccent col={B.ocker}>einordnen</SerifAccent> kann.
          </h2>
        </Reveal>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr',
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
            <BtnPrimary label="Portfolio ansehen" href="/portfolio" />
          </div>
        </Reveal>

        <Reveal delay={380}>
          <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <a href="#s5" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              textDecoration: 'none', color: 'rgba(14,12,8,0.28)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              Leistungen <ArrowDown size={16} style={{ color: B.ocker }} />
            </a>
          </div>
        </Reveal>
      </Sec>

      <Div from={false} />

      {/* ── S5: LEISTUNGEN ── */}
      <Sec id="s5" dark pad="96px 24px">
        <Reveal><Tag>Leistungen</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.8rem,4vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.cream,
          }}>
            Vier Bereiche. <SerifAccent col={B.cream}>Einer</SerifAccent> greift in den nächsten.
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p style={{
            fontSize: 15, color: 'rgba(245,242,235,0.55)',
            maxWidth: 400, margin: '12px auto 48px', lineHeight: 1.7,
          }}>
            Einzeln buchbar oder als komplettes Setup.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {[
            { icon: <Icon.Brandbook />, kicker: 'Brandbook',     title: 'Guidelines, die man wirklich nutzt.', desc: 'Farben, Typo, Layoutregeln, Tone of Voice. Damit du konsistent kommunizierst — ohne jedes Mal neu entscheiden zu müssen.' },
            { icon: <Icon.Motion />,    kicker: 'Motiondesign',  title: 'Motion, der im Feed auffällt.',       desc: 'Kurzformate, Motion Graphics, Hook-Varianten, Templates. Skalierbar ohne jedes Format neu zu entwickeln.' },
            { icon: <Icon.Web />,       kicker: 'Webdevelopment',title: 'Websites mit einer Richtung.',        desc: 'Klarer Aufbau, klare CTA, wenig Ablenkung. Damit ein Besucher weiß, was als nächstes passieren soll.' },
            { icon: <Icon.Video />,     kicker: 'Videoediting',  title: 'Schnitt mit Rhythmus.',               desc: 'Storyline, Timing, Sound, Pace. Damit ein Video nicht nur fertig ist, sondern die Botschaft trägt.' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <ServiceCard {...s} dark={true} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
            <BtnPrimary label="Kostenlos starten" href="/#request" />
          </div>
        </Reveal>
      </Sec>

      <Div from={true} />

      {/* ── S6: ANFRAGE + CALENDLY ── */}
      <Sec id="request" dark={false} pad="96px 24px 80px">
        {/* Tagesstreifen */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: B.yellow }} />

        {/* Decorative hand arrow */}
        <div style={{ position: 'relative' }}>
          <HandArrowLeft style={{
            position: 'absolute', left: '5%', top: 60,
            opacity: 0.5, transform: 'rotate(-20deg)',
          }} />
        </div>

        <Reveal><Tag light>Einstieg</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.8rem,4vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.black,
          }}>
            Termin buchen. <SerifAccent col={B.ocker}>Kostenlos.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{
            marginTop: 16, fontSize: 15, color: 'rgba(14,12,8,0.58)',
            lineHeight: 1.72, maxWidth: 440, margin: '16px auto 0',
          }}>
            Ich schaue mir deine Website an und sage dir ehrlich, was nicht funktioniert.
            Kein Commitment, bevor du das Ergebnis gesehen hast.
          </p>
        </Reveal>

        {/* Calendly */}
        <Reveal delay={200}>
          <div style={{
            marginTop: 48, borderRadius: 20,
            border: '1px solid rgba(14,12,8,0.10)',
            background: '#E0DDD4', overflow: 'hidden',
            maxWidth: 720, margin: '48px auto 0',
          }}>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/hello-leonseitz/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=e8a800"
              style={{ minWidth: 320, height: 700 }}
            />
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
          </div>
        </Reveal>

        {/* Alt contact */}
        <Reveal delay={280}>
          <div style={{ marginTop: 24, display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/4916095757167?text=Hi%20Leon%2C%0A%0AZiel%3A%0ADeadline%3A%0AStand%3A%0A%0AKurzer%20Kontext%3A"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(14,12,8,0.50)', textDecoration: 'none', fontWeight: 600 }}>
              <Icon.WA /> WhatsApp
            </a>
            <a
              href="mailto:hello@leonseitz.com?subject=Kostenlose Website-Analyse&body=Meine Website: %0D%0AZiel: %0D%0ADeadline (optional): %0D%0A"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(14,12,8,0.50)', textDecoration: 'none', fontWeight: 600 }}>
              <Mail size={14} /> E-Mail
            </a>
          </div>
        </Reveal>

        {/* Prozess link instead of Pakete */}
        <Reveal delay={340}>
          <div style={{
            marginTop: 56, padding: '24px 28px', borderRadius: 16,
            border: '1px solid rgba(14,12,8,0.09)', background: '#E8E5DC',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16, maxWidth: 560, margin: '56px auto 0',
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: B.black, marginBottom: 4 }}>
                Wie läuft ein Projekt ab?
              </div>
              <p style={{ fontSize: 13, color: 'rgba(14,12,8,0.55)', lineHeight: 1.6 }}>
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
            alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: B.black }}>Leon Seitz</span>
            <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'rgba(14,12,8,0.40)' }}>
              {[['Portfolio', '/portfolio'], ['Prozess', '/prozess'], ['Impressum', '/impressum'], ['Datenschutz', '/datenschutz']].map(([l, h]) => (
                <a key={l} href={h} style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'rgba(14,12,8,0.28)' }}>© 2026</span>
          </div>
        </Reveal>
      </Sec>
    </div>
  );
}
