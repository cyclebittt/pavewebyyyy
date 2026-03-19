'use client';

import Link from 'next/link';
import {
  ArrowDown, ArrowRight, CheckCircle2,
  Play, Monitor, Film, BookOpen,
  Mail, ExternalLink, Clock, TrendingUp,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/* ─── TOKENS ─── */
const B = {
  yellow: '#E8A800', ocker: '#C68F00',
  black:  '#0E0C08', cream: '#F5F2EB', dark: '#2A2720',
};

/* ─── HOOKS ─── */
function useReveal(ref, threshold = 0.10) {
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
    const fn = () => { const d = document.documentElement; setP(d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight)); };
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return p;
}

function useCountUp({ target, durationMs = 1200 }) {
  const [v, setV] = useState(0); const raf = useRef(null);
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
function Reveal({ children, delay = 0, y = 22 }) {
  const ref = useRef(null); const shown = useReveal(ref);
  return (
    <div ref={ref} style={{ opacity: shown ? 1 : 0, transform: shown ? 'none' : `translateY(${y}px)`, transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Tag({ children, light = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 11px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', background: light ? B.black : B.yellow, color: light ? B.cream : B.black, fontFamily: 'inherit' }}>
      {children}
    </span>
  );
}

function SerifAccent({ children, col }) {
  return <em style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontStyle: 'italic', fontWeight: 400, color: col || 'inherit' }}>{children}</em>;
}

function Underline({ children, active }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg aria-hidden style={{ position: 'absolute', left: 0, bottom: -3, width: '100%', height: 6, overflow: 'visible' }}>
        <line x1="0" y1="4" x2="100%" y2="4" stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="100%" strokeDashoffset={active ? '0' : '100%'}
          style={{ transition: active ? 'stroke-dashoffset .65s cubic-bezier(.4,0,.2,1) .25s' : 'none' }} />
      </svg>
    </span>
  );
}

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

function BtnPrimary({ label, href, lg }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: lg ? '16px 34px' : '12px 26px', borderRadius: 100, background: h ? B.ocker : B.yellow, color: B.black, fontWeight: 800, fontSize: lg ? 16 : 14, fontFamily: 'inherit', textDecoration: 'none', transition: 'background .18s', letterSpacing: '-0.01em' }}>
      {label} <ArrowRight size={lg ? 18 : 15} />
    </a>
  );
}

function BtnGhost({ label, href, dark = true }) {
  const [h, setH] = useState(false);
  const col = dark ? B.cream : B.black;
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 100, border: `1px solid ${h ? (dark ? 'rgba(245,242,235,.45)' : 'rgba(14,12,8,.40)') : (dark ? 'rgba(245,242,235,.20)' : 'rgba(14,12,8,.18)')}`, color: col, fontWeight: 600, fontSize: 14, fontFamily: 'inherit', textDecoration: 'none', transition: 'border-color .18s' }}>
      {label}
    </a>
  );
}

/* ─── SECTION WRAPPER ─── */
function Sec({ id, dark = true, children, pad = '100px 24px' }) {
  return (
    <section id={id} style={{ background: dark ? B.black : B.cream, color: dark ? B.cream : B.black, padding: pad, position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', textAlign: 'center' }}>
        {children}
      </div>
    </section>
  );
}

/* ─── DIVIDER ─── */
function Div({ from }) {
  return (
    <div style={{ background: from ? B.black : B.cream, padding: '0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div style={{ width: 1, height: 40, background: from ? `linear-gradient(to bottom,rgba(232,168,0,.0),rgba(232,168,0,.40))` : `linear-gradient(to bottom,rgba(14,12,8,.0),rgba(14,12,8,.25))` }} />
      <ArrowDown size={18} style={{ color: from ? 'rgba(232,168,0,.50)' : 'rgba(14,12,8,.30)', marginTop: -2 }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   SPRINT ROADMAP — full SVG graphic
───────────────────────────────────────── */
function SprintRoadmap() {
  const ref = useRef(null);
  const shown = useReveal(ref, 0.05);

  const sprints = [
    { n: '0', label: 'Sprint 0',  sub: 'Analyse + Entwurf',   note: 'Kostenlos',           color: B.yellow, textCol: B.black,  delay: 0   },
    { n: '1', label: 'Sprint 1',  sub: 'Erste Version',        note: '30 % nach Review',    color: B.dark,   textCol: B.cream,  delay: 160 },
    { n: '2', label: 'Sprint 2',  sub: 'Feinschliff',          note: '50 % nach Freigabe',  color: B.dark,   textCol: B.cream,  delay: 320 },
    { n: '3', label: 'Sprint 3',  sub: 'Go-Live + Übergabe',   note: '20 % nach Übergabe',  color: B.dark,   textCol: B.cream,  delay: 480 },
  ];

  const steps = [
    { icon: '📋', label: 'Anfrage' },
    { icon: '🔍', label: 'Analyse' },
    { icon: '✏️',  label: 'Entwurf' },
    { icon: '✅', label: 'Review' },
    { icon: '🚀', label: 'Go-Live' },
  ];

  return (
    <div ref={ref} style={{ width: '100%', marginTop: 48 }}>

      {/* ── PROCESS FLOW ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 56, flexWrap: 'wrap' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              opacity: shown ? 1 : 0,
              transform: shown ? 'none' : 'translateY(12px)',
              transition: `opacity .5s ease ${200 + i * 100}ms, transform .5s ease ${200 + i * 100}ms`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: i === 0 ? B.yellow : 'rgba(245,242,235,0.06)',
                border: i === 0 ? 'none' : '1px solid rgba(245,242,235,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
                boxShadow: i === 0 ? '0 0 24px rgba(232,168,0,0.30)' : 'none',
              }}>
                {s.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? B.yellow : 'rgba(245,242,235,0.40)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                opacity: shown ? 1 : 0,
                transition: `opacity .4s ease ${300 + i * 100}ms`,
                display: 'flex', alignItems: 'center', padding: '0 8px', marginBottom: 22,
              }}>
                <div style={{ width: 32, height: 1, background: `linear-gradient(to right,rgba(232,168,0,0.40),rgba(232,168,0,0.15))` }} />
                <ArrowRight size={12} style={{ color: 'rgba(232,168,0,0.30)', marginLeft: -2 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── SPRINT CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, position: 'relative' }}>

        {/* Connector line behind cards */}
        <div style={{
          position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 1,
          background: `linear-gradient(to right,${B.yellow}60,rgba(232,168,0,0.10))`,
          opacity: shown ? 1 : 0, transition: 'opacity .8s ease .2s',
        }} />

        {sprints.map((s, i) => (
          <div key={i} style={{
            opacity: shown ? 1 : 0,
            transform: shown ? 'none' : 'translateY(24px)',
            transition: `opacity .6s ease ${s.delay + 200}ms, transform .6s ease ${s.delay + 200}ms`,
          }}>
            <div style={{
              borderRadius: 18, overflow: 'hidden',
              border: i === 0 ? `1px solid rgba(232,168,0,0.35)` : '1px solid rgba(245,242,235,0.08)',
              background: i === 0 ? 'rgba(232,168,0,0.08)' : 'rgba(245,242,235,0.03)',
              textAlign: 'left',
            }}>
              {/* Top accent */}
              <div style={{ height: 3, background: i === 0 ? B.yellow : 'rgba(245,242,235,0.06)' }} />

              <div style={{ padding: '18px 18px 20px' }}>
                {/* Node number */}
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: i === 0 ? B.yellow : 'rgba(245,242,235,0.10)',
                  color: i === 0 ? B.black : B.cream,
                  border: i === 0 ? 'none' : '1px solid rgba(245,242,235,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 14, marginBottom: 14,
                  boxShadow: i === 0 ? '0 0 18px rgba(232,168,0,0.28)' : 'none',
                }}>
                  {s.n}
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: i === 0 ? B.yellow : 'rgba(245,242,235,0.30)', marginBottom: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: B.cream, lineHeight: 1.3, marginBottom: 12 }}>
                  {s.sub}
                </div>

                {/* Payment pill */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 100,
                  background: i === 0 ? B.yellow : 'rgba(245,242,235,0.06)',
                  border: i === 0 ? 'none' : '1px solid rgba(245,242,235,0.10)',
                  color: i === 0 ? B.black : 'rgba(245,242,235,0.45)',
                  fontSize: 11, fontWeight: 700,
                }}>
                  {i === 0 ? '✓' : '€'} {s.note}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── PAYMENT BREAKDOWN BAR ── */}
      <div style={{
        marginTop: 40, opacity: shown ? 1 : 0,
        transition: 'opacity .7s ease .8s',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'rgba(245,242,235,0.30)', marginBottom: 14, textAlign: 'center' }}>
          Zahlungsstruktur
        </div>
        <div style={{ display: 'flex', height: 8, borderRadius: 100, overflow: 'hidden', gap: 2 }}>
          <div style={{ flex: 0, width: 0, background: B.yellow }} />
          <div style={{ flex: 30, background: `rgba(232,168,0,0.50)`, borderRadius: '100px 0 0 100px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 700, color: 'rgba(245,242,235,0.50)', whiteSpace: 'nowrap' }}>30 %</div>
          </div>
          <div style={{ flex: 50, background: `rgba(232,168,0,0.70)`, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 700, color: 'rgba(245,242,235,0.50)', whiteSpace: 'nowrap' }}>50 %</div>
          </div>
          <div style={{ flex: 20, background: B.yellow, borderRadius: '0 100px 100px 0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 700, color: 'rgba(245,242,235,0.50)', whiteSpace: 'nowrap' }}>20 %</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(245,242,235,0.06)' }}>
          {['Sprint 0\nKostenlos', 'Sprint 1\n30 % nach Review', 'Sprint 2\n50 % nach Freigabe', 'Sprint 3\n20 % nach Übergabe'].map((label, i) => (
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              {label.split('\n').map((line, j) => (
                <div key={j} style={{ fontSize: j === 0 ? 12 : 11, fontWeight: j === 0 ? 700 : 400, color: i === 0 ? B.yellow : (j === 0 ? B.cream : 'rgba(245,242,235,0.40)'), lineHeight: 1.5 }}>
                  {line}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 21K PROOF CARD ─── */
function ProofCard21k() {
  const ref = useRef(null); const shown = useReveal(ref);
  const { v, start } = useCountUp({ target: 21000, durationMs: 1400 });
  useEffect(() => { if (shown) start(); }, [shown, start]);

  return (
    <div ref={ref} style={{
      borderRadius: 20, overflow: 'hidden',
      border: '1px solid rgba(232,168,0,0.28)',
      background: '#E0DDD4',
      padding: 32, textAlign: 'left', position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: B.yellow }} />
      <div style={{ marginBottom: 12 }}><Tag light>Echtes Ergebnis</Tag></div>
      <div style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 900, color: B.ocker, lineHeight: 1, letterSpacing: '-0.03em', fontFamily: 'inherit' }}>
        {v >= 1000 ? `${Math.floor(v / 1000)}.${String(v % 1000).padStart(3, '0')}` : v} €
      </div>
      <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, color: B.black }}>
        In 2 Monaten — <SerifAccent col={B.ocker}>durch eine Fundraising-Kampagne.</SerifAccent>
      </div>
      <p style={{ marginTop: 10, fontSize: 13, color: 'rgba(14,12,8,0.60)', lineHeight: 1.65, maxWidth: 360 }}>
        Kein Werbebudget. Nur Konzept, Branding, Landing Page und eine klare Botschaft.
      </p>
      <a href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, fontSize: 13, fontWeight: 700, color: B.ocker, textDecoration: 'none' }}>
        Vollständiges Projekt ansehen <ArrowRight size={14} />
      </a>
    </div>
  );
}

/* ─── STAT BOX ─── */
function StatBox({ target, suffix, label, delay = 0 }) {
  const ref = useRef(null); const shown = useReveal(ref);
  const { v, start } = useCountUp({ target, durationMs: 1100 });
  useEffect(() => { if (shown) start(); }, [shown, start]);

  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(14px)',
      transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`,
      padding: '22px 20px', borderRadius: 16,
      border: '1px solid rgba(14,12,8,0.10)', background: '#E8E5DC', textAlign: 'center',
    }}>
      <div style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: B.ocker, lineHeight: 1, letterSpacing: '-0.03em' }}>
        {target >= 1000 ? `${Math.floor(v / 1000)}.${String(v % 1000).padStart(3, '0')}` : v}{suffix}
      </div>
      <div style={{ marginTop: 7, fontSize: 13, color: 'rgba(14,12,8,0.55)' }}>{label}</div>
    </div>
  );
}

/* ─── SERVICE CARD ─── */
function ServiceCard({ icon, kicker, title, desc, dark }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        borderRadius: 18, textAlign: 'left', padding: '22px 24px',
        border: h ? `1px solid rgba(232,168,0,0.28)` : `1px solid ${dark ? 'rgba(245,242,235,0.07)' : 'rgba(14,12,8,0.09)'}`,
        background: h ? (dark ? 'rgba(232,168,0,0.06)' : 'rgba(232,168,0,0.04)') : (dark ? 'rgba(245,242,235,0.03)' : '#E8E5DC'),
        transition: 'border-color .2s, background .2s',
        cursor: 'pointer',
      }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(232,168,0,0.12)', border: '1px solid rgba(232,168,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: B.yellow, marginBottom: 14 }}>
        {icon}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: B.yellow, marginBottom: 6 }}>{kicker}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: dark ? B.cream : B.black, marginBottom: 8, letterSpacing: '-0.01em' }}>{title}</div>
      <p style={{ fontSize: 13, color: dark ? 'rgba(245,242,235,0.55)' : 'rgba(14,12,8,0.55)', lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

/* ─── PAKET CARD ─── */
function PaketCard({ name, price, time, items, featured }) {
  return (
    <div style={{
      padding: '24px 22px', borderRadius: 18,
      border: featured ? `2px solid ${B.yellow}` : '1px solid rgba(14,12,8,0.10)',
      background: featured ? 'rgba(232,168,0,0.06)' : '#E8E5DC',
      position: 'relative', textAlign: 'left',
    }}>
      {featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: B.yellow, borderRadius: '18px 18px 0 0' }} />}
      {featured && <div style={{ marginBottom: 8 }}><Tag light>Meistgewählt</Tag></div>}
      <div style={{ fontSize: 16, fontWeight: 800, color: B.black, marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: featured ? B.ocker : B.black, letterSpacing: '-0.02em', marginBottom: 16 }}>{price}</div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {items.map(item => (
          <li key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(14,12,8,0.65)' }}>
            <CheckCircle2 size={13} style={{ color: featured ? B.ocker : 'rgba(14,12,8,0.30)', flexShrink: 0, marginTop: 1 }} />{item}
          </li>
        ))}
      </ul>
      <div style={{ fontSize: 11, color: 'rgba(14,12,8,0.35)', display: 'flex', alignItems: 'center', gap: 5 }}>
        <Clock size={10} />{time}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const heroShown = useReveal(heroRef, 0.01);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=DM+Serif+Display:ital@1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
        ${KF}
      `}</style>

      <ScrollBar />

      {/* ── STICKY MINI HEADER ── */}
      <div style={{ position: 'fixed', top: 3, left: 0, right: 0, zIndex: 50, padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: B.cream, letterSpacing: '-0.01em', mixBlendMode: 'difference', pointerEvents: 'auto' }}>Leon Seitz</span>
        <a href="/#request" style={{ pointerEvents: 'auto', fontSize: 13, fontWeight: 700, color: B.yellow, textDecoration: 'none', padding: '8px 18px', borderRadius: 100, border: '1px solid rgba(232,168,0,0.28)', background: 'rgba(14,12,8,0.65)', backdropFilter: 'blur(8px)' }}>
          Termin buchen
        </a>
      </div>

      {/* ── HERO ── dark ── */}
      <Sec id="s1" dark pad="130px 24px 100px">
        <Reveal>
          <div ref={heroRef} style={{ fontSize: 'clamp(2.4rem,6.5vw,5rem)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.03em', color: B.cream, maxWidth: 760, margin: '0 auto' }}>
            Mehr Anfragen durch eine Website, die{' '}
            <Underline active={heroShown}>klar ist</Underline>
            {' '}– nicht nur{' '}
            <SerifAccent col={B.cream}>schön.</SerifAccent>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ marginTop: 28, fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'rgba(245,242,235,0.58)', lineHeight: 1.72, maxWidth: 520, margin: '28px auto 0' }}>
            Ich analysiere deine aktuelle Website kostenlos, zeige konkret was nicht funktioniert –
            und liefere einen ersten Entwurf. Ohne Risiko, ohne Commitment.
          </p>
        </Reveal>
        <Reveal delay={220}>
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

      {/* ── PROBLEM ── light ── */}
      <Sec id="s2" dark={false} pad="96px 24px">
        <Reveal><Tag light>Das eigentliche Problem</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{ marginTop: 20, fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.black }}>
            Viele Websites sehen gut aus.
            <br />
            <span style={{ color: B.ocker }}>Und erzeugen trotzdem keine Anfragen.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ marginTop: 20, fontSize: 15, color: 'rgba(14,12,8,0.58)', lineHeight: 1.72, maxWidth: 500, margin: '20px auto 0' }}>
            Das liegt selten am Design. Branding, Botschaft und Seitenstruktur sind nicht aufeinander abgestimmt. Der Besucher kommt — und weiß nicht, was er tun soll.
          </p>
        </Reveal>

        {/* Problem cards */}
        <Reveal delay={220}>
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[
              { icon: '🎯', title: 'Kein klarer Auftrag', desc: 'Der CTA fehlt oder ist versteckt. Der Besucher weiß nicht, was als nächstes passieren soll.' },
              { icon: '🎨', title: 'Kein konsistentes Branding', desc: 'Website, Social und Print wirken wie von drei verschiedenen Personen. Das kostet Vertrauen.' },
              { icon: '❓', title: 'Botschaft zu allgemein', desc: 'In fünf Sekunden wird nicht klar, warum der Besucher bleiben sollte.' },
            ].map((c, i) => (
              <div key={i} style={{ padding: '22px 20px', borderRadius: 16, border: '1px solid rgba(14,12,8,0.09)', background: '#E8E5DC', textAlign: 'left' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
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
            <a href="#s3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'rgba(14,12,8,0.30)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Das Angebot <ArrowDown size={16} style={{ color: B.ocker }} />
            </a>
          </div>
        </Reveal>
      </Sec>

      <Div from={false} />

      {/* ── ANGEBOT + ROADMAP ── dark ── */}
      <Sec id="s3" dark pad="96px 24px">
        <Reveal><Tag>Das Angebot</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{ marginTop: 20, fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.cream }}>
            Du siehst den Entwurf.
            <br />
            Erst dann <SerifAccent col={B.cream}>entscheidest</SerifAccent> du.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ marginTop: 20, fontSize: 15, color: 'rgba(245,242,235,0.58)', lineHeight: 1.72, maxWidth: 480, margin: '20px auto 0' }}>
            Sprint 0 ist kostenlos: Analyse, Schwachstellen, erster Seitenaufbau — kein Angebot ins Blaue.
          </p>
        </Reveal>

        <SprintRoadmap />

        <Reveal delay={100}>
          <div style={{ marginTop: 52, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" />
            <BtnGhost label="Ablauf im Detail" href="/prozess" />
          </div>
        </Reveal>
      </Sec>

      <Div from={true} />

      {/* ── PROOF ── light ── */}
      <Sec id="s4" dark={false} pad="96px 24px">
        <Reveal><Tag light>Ergebnisse</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{ marginTop: 20, marginBottom: 48, fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.black }}>
            Zahlen, die man <SerifAccent col={B.ocker}>einordnen</SerifAccent> kann.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, alignItems: 'start', textAlign: 'left' }}>
          <Reveal delay={80}><ProofCard21k /></Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <StatBox target={15}  suffix="+ Mio" label="Likes auf erstellten Inhalten"      delay={120} />
            <StatBox target={10}  suffix="+ Mio" label="Klicks über Social Media generiert"  delay={200} />
            <StatBox target={100} suffix="+"     label="Abgeschlossene Projekte"             delay={280} />
          </div>
        </div>

        <Reveal delay={300}>
          <div style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}>
            <BtnPrimary label="Portfolio ansehen" href="/portfolio" />
          </div>
        </Reveal>

        <Reveal delay={380}>
          <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <a href="#s5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'rgba(14,12,8,0.30)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Leistungen <ArrowDown size={16} style={{ color: B.ocker }} />
            </a>
          </div>
        </Reveal>
      </Sec>

      <Div from={false} />

      {/* ── LEISTUNGEN ── dark ── */}
      <Sec id="s5" dark pad="96px 24px">
        <Reveal><Tag>Leistungen</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{ marginTop: 20, marginBottom: 10, fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.cream }}>
            Vier Bereiche. <SerifAccent col={B.cream}>Einer</SerifAccent> greift in den nächsten.
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p style={{ fontSize: 15, color: 'rgba(245,242,235,0.55)', marginBottom: 48, maxWidth: 400, margin: '12px auto 48px' }}>
            Einzeln buchbar oder als komplettes Setup — je nachdem, wo du gerade stehst.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {[
            { icon: <BookOpen size={17}/>, kicker: 'Brandbook', title: 'Guidelines, die man wirklich nutzt.', desc: 'Farben, Typo, Layoutregeln, Tone of Voice. Damit du konsistent kommunizierst — ohne jedes Mal neu entscheiden zu müssen.' },
            { icon: <Play size={17}/>, kicker: 'Motiondesign', title: 'Motion, der im Feed auffällt.', desc: 'Kurzformate, Motion Graphics, Hook-Varianten, Templates. Skalierbar ohne jedes Format neu zu entwickeln.' },
            { icon: <Monitor size={17}/>, kicker: 'Webdevelopment', title: 'Websites mit einer Richtung.', desc: 'Klarer Aufbau, klare CTA, wenig Ablenkung. Damit ein Besucher weiß, was als nächstes passieren soll.' },
            { icon: <Film size={17}/>, kicker: 'Videoediting', title: 'Schnitt mit Rhythmus.', desc: 'Storyline, Timing, Sound, Pace. Damit ein Video nicht nur fertig ist, sondern die Botschaft trägt.' },
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

      {/* ── ANFRAGE + CALENDLY ── light ── */}
      <Sec id="request" dark={false} pad="96px 24px 80px">
        {/* Tagesstreifen */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: B.yellow }} />

        <Reveal><Tag light>Einstieg</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{ marginTop: 20, fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.black }}>
            Termin buchen. <SerifAccent col={B.ocker}>Kostenlos.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ marginTop: 16, fontSize: 15, color: 'rgba(14,12,8,0.58)', lineHeight: 1.72, maxWidth: 440, margin: '16px auto 0' }}>
            Ich schaue mir deine Website an und sage dir ehrlich, was nicht funktioniert.
            Kein Commitment, bevor du das Ergebnis gesehen hast.
          </p>
        </Reveal>

        {/* Calendly */}
        <Reveal delay={200}>
          <div style={{ marginTop: 48, borderRadius: 20, border: '1px solid rgba(14,12,8,0.10)', background: '#E0DDD4', overflow: 'hidden', maxWidth: 720, margin: '48px auto 0' }}>
            <div className="calendly-inline-widget"
              data-url="https://calendly.com/leonseitz/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=e8a800"
              style={{ minWidth: 320, height: 630 }} />
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
          </div>
        </Reveal>

        {/* Alt contact */}
        <Reveal delay={280}>
          <div style={{ marginTop: 28, display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/4916095757167?text=Hi%20Leon%2C%0A%0AZiel%3A%0ADeadline%3A%0AStand%3A%0A%0AKurzer%20Kontext%3A"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(14,12,8,0.50)', textDecoration: 'none', fontWeight: 600 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="mailto:hello@leonseitz.com?subject=Kostenlose Website-Analyse&body=Meine Website: %0D%0AZiel: %0D%0ADeadline (optional): %0D%0A"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(14,12,8,0.50)', textDecoration: 'none', fontWeight: 600 }}>
              <Mail size={14} /> E-Mail
            </a>
          </div>
        </Reveal>

        {/* Pakete */}
        <Reveal delay={200}>
          <div style={{ marginTop: 80 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(14,12,8,0.28)', marginBottom: 20 }}>Pakete</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              <PaketCard name="Einstieg"  price="ab 400 €"   time="~7 Tage"       items={['1 Landingpage','Klare Struktur','1 CTA-Fokus']}                              featured={false} />
              <PaketCard name="Standard"  price="ab 700 €"   time="10–14 Tage"    items={['Website bis 5 Seiten','Branding-Grundlage','2 Revisionsrunden']}              featured={true}  />
              <PaketCard name="Komplett"  price="ab 1.100 €" time="ca. 3 Wochen"  items={['Website + Brandbook','Motion-Element','Vollständige Übergabe']}               featured={false} />
            </div>
            <p style={{ marginTop: 16, fontSize: 12, color: 'rgba(14,12,8,0.30)' }}>Alle Pakete starten mit Sprint 0 — kostenlos.</p>
          </div>
        </Reveal>

        {/* Footer */}
        <Reveal delay={300}>
          <div style={{ marginTop: 72, paddingTop: 28, borderTop: '1px solid rgba(14,12,8,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: B.black }}>Leon Seitz</span>
            <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'rgba(14,12,8,0.40)' }}>
              {[['Portfolio','/portfolio'],['Ablauf','/prozess'],['Impressum','/impressum'],['Datenschutz','/datenschutz']].map(([l,h]) => (
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

const KF = `
@keyframes noiseMove{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(90px,60px,0)}}
`;
