'use client';

import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Play,
  Monitor,
  Film,
  BookOpen,
  Mail,
  ExternalLink,
  Shield,
  Eye,
  FileText,
  AlertCircle,
  Clock,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   BRAND TOKENS
───────────────────────────────────────────── */
const B = {
  yellow:  '#E8A800',
  ocker:   '#C68F00',
  black:   '#0E0C08',
  cream:   '#F5F2EB',
  dark:    '#2A2720',
};

// Section theme: alternates between dark and light
const THEMES = {
  dark: {
    bg:      B.black,
    text:    B.cream,
    muted:   'rgba(245,242,235,0.55)',
    faint:   'rgba(245,242,235,0.30)',
    card:    B.dark,
    cardBorder: 'rgba(232,168,0,0.12)',
    tag:     { bg: B.yellow, color: B.black },
  },
  light: {
    bg:      B.cream,
    text:    B.black,
    muted:   'rgba(14,12,8,0.60)',
    faint:   'rgba(14,12,8,0.35)',
    card:    '#E8E5DC',
    cardBorder: 'rgba(14,12,8,0.10)',
    tag:     { bg: B.black, color: B.cream },
  },
};

const SECTION_THEMES = ['dark', 'light', 'dark', 'light', 'dark', 'light'];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useReveal(ref) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => { if (entries.some(e => e.isIntersecting)) setShown(true); },
      { threshold: 0.10 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
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

function useCountUp({ target, durationMs = 1000 }) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);
  const start = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const tick = t => {
      const eased = 1 - Math.pow(1 - Math.min(1, (t - t0) / durationMs), 3);
      setValue(Math.round(target * eased));
      if (eased < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [target, durationMs]);
  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);
  return { value, start };
}

/* ─────────────────────────────────────────────
   BRAND COMPONENTS
───────────────────────────────────────────── */

function SerifAccent({ children, color }) {
  return (
    <em style={{
      fontFamily: "'DM Serif Display', Georgia, serif",
      fontStyle: 'italic',
      fontWeight: 400,
      color: color || 'inherit',
    }}>
      {children}
    </em>
  );
}

function UnderlineAnnotation({ children, shown }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, bottom: '-3px', width: '100%', height: '6px', overflow: 'visible' }}
      >
        <line
          x1="0" y1="4" x2="100%" y2="4"
          stroke={B.yellow}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="100%"
          strokeDashoffset={shown ? '0' : '100%'}
          style={{ transition: shown ? 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1) 0.2s' : 'none' }}
        />
      </svg>
    </span>
  );
}

function Reveal({ children, delayMs = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.65s ease ${delayMs}ms, transform 0.65s ease ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS
───────────────────────────────────────────── */
function ScrollBar() {
  const p = useScrollProgress();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, pointerEvents: 'none' }}>
      <div style={{ height: '3px', background: 'rgba(232,168,0,0.15)' }}>
        <div style={{ height: '100%', width: `${Math.round(p * 100)}%`, background: B.yellow, transition: 'width 80ms linear' }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION DIVIDER — animated arrow guides visitor down
───────────────────────────────────────────── */
function SectionArrow({ fromTheme }) {
  // Arrow sits at the boundary, color adapts to next section
  const arrowColor = fromTheme === 'dark' ? B.cream : B.black;
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 0',
      background: fromTheme === 'dark' ? B.black : B.cream,
    }}>
      <div style={{
        width: '2px',
        height: '40px',
        background: `linear-gradient(to bottom, ${arrowColor}00, ${arrowColor}60)`,
        marginBottom: '-2px',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
function Section({ id, themeKey, children, fullHeight = true }) {
  const t = THEMES[themeKey];
  return (
    <section
      id={id}
      style={{
        background: t.bg,
        color: t.text,
        minHeight: fullHeight ? '100vh' : 'auto',
        display: 'flex',
        alignItems: 'center',
        padding: '96px 20px',
        scrollMarginTop: '0px',
      }}
    >
      <div style={{ maxWidth: '1024px', margin: '0 auto', width: '100%' }}>
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA COMPONENTS
───────────────────────────────────────────── */
function PrimaryCTA({ label, href = '/#request', size = 'md' }) {
  const [hov, setHov] = useState(false);
  const pad = size === 'lg' ? '18px 36px' : '13px 28px';
  const fs  = size === 'lg' ? '16px' : '14px';
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: pad,
        borderRadius: '100px',
        background: hov ? B.ocker : B.yellow,
        color: B.black,
        fontWeight: 800,
        fontSize: fs,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        textDecoration: 'none',
        transition: 'background 0.18s',
        letterSpacing: '-0.01em',
      }}
    >
      {label}
      <ArrowRight size={fs === '16px' ? 18 : 16} />
    </a>
  );
}

function GhostCTA({ label, href, dark = true }) {
  const [hov, setHov] = useState(false);
  const border = dark ? 'rgba(245,242,235,0.25)' : 'rgba(14,12,8,0.20)';
  const borderH = dark ? 'rgba(245,242,235,0.50)' : 'rgba(14,12,8,0.45)';
  const color = dark ? B.cream : B.black;
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '13px 24px',
        borderRadius: '100px',
        border: `1px solid ${hov ? borderH : border}`,
        color,
        fontWeight: 600,
        fontSize: '14px',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        textDecoration: 'none',
        transition: 'border-color 0.18s',
      }}
    >
      {label}
    </a>
  );
}

/* ─────────────────────────────────────────────
   TAG
───────────────────────────────────────────── */
function Tag({ children, theme }) {
  const t = THEMES[theme] ?? THEMES.dark;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 10px',
      borderRadius: '100px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      background: t.tag.bg,
      color: t.tag.color,
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────────── */
function StatCounter({ prefix = '', target, suffix = '', label, theme }) {
  const t = THEMES[theme];
  const ref = useRef(null);
  const shown = useReveal(ref);
  const { value, start } = useCountUp({ target, durationMs: 1200 });
  useEffect(() => { if (shown) start(); }, [shown, start]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 'clamp(2.8rem,7vw,5rem)',
        fontWeight: 800,
        lineHeight: 1,
        color: B.yellow,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        letterSpacing: '-0.03em',
      }}>
        {prefix}{value.toLocaleString('de-DE')}{suffix}
      </div>
      <div style={{ marginTop: '8px', fontSize: '14px', color: t.muted, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
        {label}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROOF CARD — 21k highlight
───────────────────────────────────────────── */
function BigProofCard({ theme }) {
  const t = THEMES[theme];
  const ref = useRef(null);
  const shown = useReveal(ref);
  const { value, start } = useCountUp({ target: 21000, durationMs: 1400 });
  useEffect(() => { if (shown) start(); }, [shown, start]);

  return (
    <div
      ref={ref}
      style={{
        borderRadius: '20px',
        border: `1px solid rgba(232,168,0,0.28)`,
        background: theme === 'dark' ? B.dark : '#E0DDD4',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Yellow accent strip top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: B.yellow }} />

      <div style={{ marginBottom: '12px' }}>
        <Tag theme={theme}>Echtes Ergebnis</Tag>
      </div>

      <div style={{
        fontSize: 'clamp(2.5rem,6vw,4rem)',
        fontWeight: 800,
        color: B.yellow,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}>
        {value >= 1000 ? `${Math.floor(value / 1000)}.${String(value % 1000).padStart(3, '0')}` : value} €
      </div>

      <div style={{ marginTop: '10px', fontSize: '15px', fontWeight: 700, color: t.text, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
        In 2 Monaten eingenommen —
        {' '}<SerifAccent color={t.text}>durch eine Fundraising-Kampagne.</SerifAccent>
      </div>

      <p style={{ marginTop: '12px', fontSize: '13px', color: t.muted, lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: '420px' }}>
        Konzept, Branding, Landing Page und Kommunikation. Kein Budget für Werbung.
        Allein durch Struktur und eine klare Botschaft.
      </p>

      <div style={{ marginTop: '20px' }}>
        <a
          href="/portfolio"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            color: B.yellow,
            textDecoration: 'none',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          Mehr zum Projekt <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SERVICE ROW
───────────────────────────────────────────── */
function ServiceRow({ icon, kicker, title, desc, theme }) {
  const t = THEMES[theme];
  return (
    <Reveal>
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
        padding: '24px 0',
        borderBottom: `1px solid ${t.cardBorder}`,
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'rgba(232,168,0,0.12)',
          border: '1px solid rgba(232,168,0,0.20)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: B.yellow,
          flexShrink: 0,
          marginTop: '2px',
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: B.yellow, marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
            {kicker}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: t.text, marginBottom: '8px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.01em' }}>
            {title}
          </div>
          <p style={{ fontSize: '14px', color: t.muted, lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: '600px' }}>
            {desc}
          </p>
        </div>
        <a href="/#request" style={{ color: B.yellow, flexShrink: 0, marginTop: '4px', opacity: 0.7 }}>
          <ArrowRight size={18} />
        </a>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────
   SPRINT STEP
───────────────────────────────────────────── */
function SprintStep({ n, title, desc, note, highlight, theme }) {
  const t = THEMES[theme];
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
      padding: '20px 0',
      borderBottom: `1px solid ${t.cardBorder}`,
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: highlight ? B.yellow : 'transparent',
        border: highlight ? 'none' : `1px solid ${t.cardBorder}`,
        color: highlight ? B.black : t.muted,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: '13px',
        flexShrink: 0,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        boxShadow: highlight ? '0 0 16px rgba(232,168,0,0.25)' : 'none',
      }}>
        {n}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: t.text, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
          {title}
        </div>
        <p style={{ marginTop: '4px', fontSize: '13px', color: t.muted, lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
          {desc}
        </p>
      </div>
      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        color: highlight ? B.yellow : t.faint,
        flexShrink: 0,
        marginTop: '2px',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        textAlign: 'right',
        minWidth: '90px',
      }}>
        {note}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const heroShown = useReveal(heroRef);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=DM+Serif+Display:ital@1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ${globalKeyframes}
      `}</style>

      <ScrollBar />

      {/* Minimal logo-only header */}
      <div style={{
        position: 'fixed',
        top: '3px',
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: '15px',
          fontWeight: 800,
          color: B.cream,
          letterSpacing: '-0.01em',
          mixBlendMode: 'difference',
          pointerEvents: 'auto',
        }}>
          Leon Seitz
        </span>
        <a
          href="/#request"
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: B.yellow,
            textDecoration: 'none',
            pointerEvents: 'auto',
            padding: '8px 18px',
            borderRadius: '100px',
            border: `1px solid rgba(232,168,0,0.30)`,
            background: 'rgba(14,12,8,0.60)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Termin buchen
        </a>
      </div>

      {/* ── S1: HERO — dark ── */}
      <Section id="s1" themeKey="dark">
        <div style={{ maxWidth: '760px' }}>
          <Reveal>
            <div ref={heroRef} style={{
              fontSize: 'clamp(2.4rem,6.5vw,4.8rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: B.cream,
            }}>
              Mehr Anfragen durch eine Website, die{' '}
              <UnderlineAnnotation shown={heroShown}>klar ist</UnderlineAnnotation>
              {' '}– nicht nur{' '}
              <SerifAccent color={B.cream}>schön.</SerifAccent>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <p style={{
              marginTop: '28px',
              fontSize: 'clamp(1rem,2vw,1.15rem)',
              color: 'rgba(245,242,235,0.60)',
              lineHeight: 1.7,
              maxWidth: '560px',
            }}>
              Ich analysiere deine aktuelle Website kostenlos, zeige konkret was nicht funktioniert –
              und liefere einen ersten Entwurf. Ohne Risiko, ohne Commitment.
            </p>
          </Reveal>

          <Reveal delayMs={240}>
            <div style={{ marginTop: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <PrimaryCTA label="Kostenlose Analyse anfragen" href="/#request" size="lg" />
              <GhostCTA label="Portfolio ansehen" href="/portfolio" dark={true} />
            </div>
          </Reveal>
        </div>

        {/* Scroll cue */}
        <Reveal delayMs={600}>
          <div style={{
            marginTop: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'rgba(245,242,235,0.30)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            <div style={{ width: '1px', height: '32px', background: 'rgba(232,168,0,0.30)' }} />
            Scrollen
            <ArrowDown size={14} style={{ color: 'rgba(232,168,0,0.50)' }} />
          </div>
        </Reveal>
      </Section>

      <SectionArrow fromTheme="dark" />

      {/* ── S2: PROBLEM — light ── */}
      <Section id="s2" themeKey="light">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

          <div>
            <Reveal>
              <Tag theme="light">Das eigentliche Problem</Tag>
            </Reveal>
            <Reveal delayMs={80}>
              <h2 style={{
                marginTop: '20px',
                fontSize: 'clamp(1.8rem,4vw,3rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: B.black,
              }}>
                Viele Websites sehen gut aus.
                <br />
                <span style={{ color: B.ocker }}>Und erzeugen trotzdem keine Anfragen.</span>
              </h2>
            </Reveal>
            <Reveal delayMs={160}>
              <p style={{ marginTop: '20px', fontSize: '15px', color: 'rgba(14,12,8,0.60)', lineHeight: 1.7, maxWidth: '400px' }}>
                Das liegt selten am Design. Branding, Botschaft und Seitenstruktur sind nicht aufeinander abgestimmt.
                Der Besucher kommt — und weiß nicht, was er tun soll.
              </p>
            </Reveal>
            <Reveal delayMs={240}>
              <div style={{ marginTop: '32px' }}>
                <PrimaryCTA label="Kostenlos prüfen lassen" href="/#request" />
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delayMs={100}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { title: 'Kein klarer Auftrag an den Besucher', desc: 'Der CTA fehlt oder ist versteckt. Der Besucher weiß nicht, was als nächstes passieren soll.' },
                  { title: 'Kein konsistentes Erscheinungsbild', desc: 'Website, Social und Print wirken wie von drei verschiedenen Personen. Das kostet Vertrauen.' },
                  { title: 'Botschaft zu allgemein', desc: 'In fünf Sekunden wird nicht klar, warum der Besucher bleiben sollte.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '14px',
                      border: '1px solid rgba(14,12,8,0.10)',
                      background: '#E8E5DC',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <AlertCircle size={15} style={{ color: B.ocker, marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: B.black }}>{item.title}</div>
                      <p style={{ marginTop: '4px', fontSize: '13px', color: 'rgba(14,12,8,0.55)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>

        {/* Section guide arrow */}
        <div style={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}>
          <Reveal>
            <a href="#s3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(14,12,8,0.30)', textDecoration: 'none', fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Das Angebot
              <ArrowDown size={18} style={{ color: B.ocker }} />
            </a>
          </Reveal>
        </div>
      </Section>

      <SectionArrow fromTheme="light" />

      {/* ── S3: ANGEBOT — dark ── */}
      <Section id="s3" themeKey="dark">
        <div style={{ maxWidth: '760px', marginBottom: '48px' }}>
          <Reveal>
            <Tag theme="dark">Das Angebot</Tag>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 style={{
              marginTop: '20px',
              fontSize: 'clamp(1.8rem,4vw,3rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: B.cream,
            }}>
              Du siehst den Entwurf.
              <br />
              Erst dann <SerifAccent color={B.cream}>entscheidest</SerifAccent> du.
            </h2>
          </Reveal>
          <Reveal delayMs={160}>
            <p style={{ marginTop: '20px', fontSize: '15px', color: 'rgba(245,242,235,0.60)', lineHeight: 1.7, maxWidth: '520px' }}>
              Sprint 0 ist kostenlos: Ich analysiere deine Situation, benenne konkrete Schwachstellen
              und liefere einen ersten Seitenaufbau. Kein Angebot ins Blaue.
            </p>
          </Reveal>
        </div>

        <Reveal delayMs={180}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {[
              { icon: <Eye size={16} />, title: 'Was du bekommst', items: ['3–5 konkrete Optimierungspunkte', 'Erster Seitenaufbau als Entwurf', 'Einschätzung, welches Paket passt'], em: true },
              { icon: <Shield size={16} />, title: 'Zahlung nach Review', body: 'Jedes Zahlungsziel ist an einen Sprint-Review gebunden. Erst wenn du freigibst, kommt die nächste Phase.', em: false },
              { icon: <FileText size={16} />, title: 'Transparenz im Prozess', body: 'Du siehst den Projektstand jederzeit — vollständig dokumentiert von Anfang bis Übergabe.', em: false },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '16px',
                  border: card.em ? '1px solid rgba(232,168,0,0.28)' : '1px solid rgba(245,242,235,0.08)',
                  background: card.em ? 'rgba(232,168,0,0.07)' : B.dark,
                  padding: '22px',
                }}
              >
                <div style={{ color: B.yellow, marginBottom: '12px' }}>{card.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: B.cream, marginBottom: '10px' }}>{card.title}</div>
                {card.items ? (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {card.items.map(item => (
                      <li key={item} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'rgba(245,242,235,0.60)', lineHeight: 1.5 }}>
                        <CheckCircle2 size={13} style={{ color: B.yellow, flexShrink: 0, marginTop: '2px' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: '13px', color: 'rgba(245,242,235,0.55)', lineHeight: 1.65 }}>{card.body}</p>
                )}
                {card.em && (
                  <div style={{ marginTop: '16px' }}>
                    <Tag theme="dark">Kostenlos · Kein Commitment</Tag>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Sprint steps */}
        <Reveal delayMs={260}>
          <div style={{ borderTop: '1px solid rgba(245,242,235,0.07)', paddingTop: '32px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,242,235,0.30)', marginBottom: '4px' }}>
              Projektablauf
            </div>
            {[
              { n: '0', title: 'Sprint 0 — Analyse + Entwurf', desc: 'Konkrete Schwachstellen, erster Seitenaufbau, Paketempfehlung.', note: 'Kostenlos', highlight: true },
              { n: '1', title: 'Sprint 1 — Erste Version', desc: 'Du klickst durch, gibst Feedback. 2 Revisionsrunden inklusive.', note: '30 % nach Review', highlight: false },
              { n: '2', title: 'Sprint 2 — Feinschliff', desc: 'Alle Punkte umgesetzt. SEO-Basis und Performance geprüft.', note: '50 % nach Freigabe', highlight: false },
              { n: '3', title: 'Sprint 3 — Go-Live + Übergabe', desc: 'Live-Schaltung, Dateien, Zugänge, vollständige Dokumentation.', note: '20 % nach Übergabe', highlight: false },
            ].map(s => (
              <SprintStep key={s.n} {...s} theme="dark" />
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={320}>
          <div style={{ marginTop: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <PrimaryCTA label="Kostenlose Analyse anfragen" href="/#request" />
            <GhostCTA label="Ablauf im Detail" href="/prozess" dark={true} />
          </div>
        </Reveal>
      </Section>

      <SectionArrow fromTheme="dark" />

      {/* ── S4: PROOF — light ── */}
      <Section id="s4" themeKey="light">
        <Reveal>
          <Tag theme="light">Ergebnisse</Tag>
        </Reveal>
        <Reveal delayMs={80}>
          <h2 style={{
            marginTop: '20px',
            marginBottom: '48px',
            fontSize: 'clamp(1.8rem,4vw,3rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: B.black,
            maxWidth: '600px',
          }}>
            Zahlen, die man{' '}
            <SerifAccent color={B.ocker}>einordnen</SerifAccent> kann.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

          {/* Big proof card */}
          <Reveal delayMs={100}>
            <BigProofCard theme="light" />
          </Reveal>

          {/* Supporting stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Reveal delayMs={140}>
              <div style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(14,12,8,0.10)',
                background: '#E8E5DC',
              }}>
                <StatCounter target={15} suffix="+ Mio" label="Likes auf erstellten Inhalten" theme="light" />
              </div>
            </Reveal>
            <Reveal delayMs={200}>
              <div style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(14,12,8,0.10)',
                background: '#E8E5DC',
              }}>
                <StatCounter target={10} suffix="+ Mio" label="Klicks über Social Media generiert" theme="light" />
              </div>
            </Reveal>
            <Reveal delayMs={260}>
              <div style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(14,12,8,0.10)',
                background: '#E8E5DC',
              }}>
                <StatCounter target={100} suffix="+" label="Abgeschlossene Projekte" theme="light" />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delayMs={300}>
          <div style={{ marginTop: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <PrimaryCTA label="Portfolio ansehen" href="/portfolio" />
          </div>
        </Reveal>

        <div style={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}>
          <Reveal>
            <a href="#s5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(14,12,8,0.30)', textDecoration: 'none', fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Leistungen
              <ArrowDown size={18} style={{ color: B.ocker }} />
            </a>
          </Reveal>
        </div>
      </Section>

      <SectionArrow fromTheme="light" />

      {/* ── S5: LEISTUNGEN — dark ── */}
      <Section id="s5" themeKey="dark">
        <Reveal>
          <Tag theme="dark">Leistungen</Tag>
        </Reveal>
        <Reveal delayMs={80}>
          <h2 style={{
            marginTop: '20px',
            marginBottom: '8px',
            fontSize: 'clamp(1.8rem,4vw,3rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: B.cream,
          }}>
            Vier Bereiche.{' '}
            <SerifAccent color={B.cream}>Einer</SerifAccent> greift in den nächsten.
          </h2>
        </Reveal>
        <Reveal delayMs={120}>
          <p style={{ fontSize: '15px', color: 'rgba(245,242,235,0.55)', lineHeight: 1.7, maxWidth: '480px', marginBottom: '8px' }}>
            Einzeln buchbar oder als komplettes Setup.
          </p>
        </Reveal>

        <div style={{ marginTop: '8px' }}>
          <ServiceRow icon={<BookOpen size={17} />} kicker="Brandbook" theme="dark"
            title="Guidelines, die man wirklich nutzt."
            desc="Farben, Typo, Layoutregeln, Tone of Voice, Beispiele. Damit du und dein Team konsistent kommunizieren — ohne jedes Mal neu entscheiden zu müssen." />
          <ServiceRow icon={<Play size={17} />} kicker="Motiondesign" theme="dark"
            title="Motion, der im Feed auffällt."
            desc="Kurzformate, Motion Graphics, Hook-Varianten, Templates. Damit du skalieren kannst, ohne jedes Format neu zu entwickeln." />
          <ServiceRow icon={<Monitor size={17} />} kicker="Webdevelopment" theme="dark"
            title="Websites mit einer Richtung."
            desc="Klarer Aufbau, klare CTA, wenig Ablenkung. Damit ein Besucher weiß, was als nächstes passieren soll." />
          <ServiceRow icon={<Film size={17} />} kicker="Videoediting" theme="dark"
            title="Schnitt mit Rhythmus."
            desc="Storyline, Timing, Sound, Pace. Damit ein Video nicht nur fertig ist, sondern die Botschaft trägt." />
        </div>

        <Reveal>
          <div style={{ marginTop: '40px' }}>
            <PrimaryCTA label="Kostenlos starten" href="/#request" />
          </div>
        </Reveal>
      </Section>

      <SectionArrow fromTheme="dark" />

      {/* ── S6: REQUEST + CALENDLY — light ── */}
      <Section id="request" themeKey="light">

        {/* Tagesstreifen */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: B.yellow }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

          <div>
            <Reveal>
              <Tag theme="light">Einstieg</Tag>
            </Reveal>
            <Reveal delayMs={80}>
              <h2 style={{
                marginTop: '20px',
                fontSize: 'clamp(1.8rem,4vw,3rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: B.black,
              }}>
                Termin buchen.
                <br />
                <SerifAccent color={B.ocker}>Kostenlos.</SerifAccent>
              </h2>
            </Reveal>
            <Reveal delayMs={140}>
              <p style={{ marginTop: '20px', fontSize: '15px', color: 'rgba(14,12,8,0.60)', lineHeight: 1.7, maxWidth: '400px' }}>
                Ich schaue mir deine Website an und sage dir ehrlich, was nicht funktioniert.
                Kein Commitment, bevor du das Ergebnis gesehen hast.
              </p>
            </Reveal>

            <Reveal delayMs={200}>
              <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Sprint 0 kostenlos',
                  'Antwort innerhalb 24 h',
                  'Zahlung erst nach Freigabe',
                ].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'rgba(14,12,8,0.65)', fontWeight: 500 }}>
                    <CheckCircle2 size={15} style={{ color: B.yellow, flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={280}>
              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href="https://wa.me/4916095757167?text=Hi%20Leon%2C%0A%0AZiel%3A%0ADeadline%3A%0AStand%3A%0A%0AKurzer%20Kontext%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: 'rgba(14,12,8,0.55)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366', flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp: +49 160 9575 7167
                </a>
                <a
                  href="mailto:hello@leonseitz.com?subject=Kostenlose Website-Analyse&body=Meine Website: %0D%0AZiel: %0D%0ADeadline (optional): %0D%0A"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: 'rgba(14,12,8,0.45)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  <Mail size={14} />
                  E-Mail: hello@leonseitz.com
                </a>
              </div>
            </Reveal>
          </div>

          {/* Calendly embed */}
          <Reveal delayMs={120}>
            <div style={{
              borderRadius: '20px',
              border: '1px solid rgba(14,12,8,0.10)',
              background: '#E8E5DC',
              overflow: 'hidden',
              minHeight: '600px',
            }}>
              {/* Calendly inline widget */}
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/leonseitz/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=e8a800"
                style={{ minWidth: '320px', height: '630px' }}
              />
              <script
                type="text/javascript"
                src="https://assets.calendly.com/assets/external/widget.js"
                async
              />
            </div>
          </Reveal>

        </div>

        {/* Pakete */}
        <Reveal delayMs={200}>
          <div style={{ marginTop: '80px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(14,12,8,0.30)', marginBottom: '20px', textAlign: 'center' }}>
              Pakete
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { name: 'Einstieg', price: 'ab 400 €', time: '~7 Tage', items: ['1 Landingpage', 'Klare Struktur', '1 CTA-Fokus'], featured: false },
                { name: 'Standard', price: 'ab 700 €', time: '10–14 Tage', items: ['Website bis 5 Seiten', 'Branding-Grundlage', '2 Revisionsrunden'], featured: true },
                { name: 'Komplett', price: 'ab 1.100 €', time: 'ca. 3 Wochen', items: ['Website + Brandbook', 'Motion-Element', 'Vollständige Übergabe'], featured: false },
              ].map(p => (
                <div
                  key={p.name}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: p.featured ? `2px solid ${B.yellow}` : '1px solid rgba(14,12,8,0.10)',
                    background: p.featured ? 'rgba(232,168,0,0.05)' : '#E8E5DC',
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 800, color: B.black, marginBottom: '2px' }}>{p.name}</div>
                  {p.featured && <div style={{ fontSize: '11px', color: B.ocker, fontWeight: 700, marginBottom: '8px' }}>Meistgewählt</div>}
                  <div style={{ fontSize: '18px', fontWeight: 800, color: p.featured ? B.ocker : B.black, marginBottom: '12px' }}>{p.price}</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '12px' }}>
                    {p.items.map(item => (
                      <li key={item} style={{ display: 'flex', gap: '7px', fontSize: '13px', color: 'rgba(14,12,8,0.65)' }}>
                        <CheckCircle2 size={12} style={{ color: p.featured ? B.ocker : 'rgba(14,12,8,0.35)', flexShrink: 0, marginTop: '2px' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '11px', color: 'rgba(14,12,8,0.35)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={10} /> {p.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Footer link */}
        <Reveal delayMs={300}>
          <div style={{ marginTop: '80px', paddingTop: '32px', borderTop: '1px solid rgba(14,12,8,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: B.black }}>Leon Seitz</span>
            <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'rgba(14,12,8,0.45)' }}>
              <a href="/portfolio" style={{ color: 'inherit', textDecoration: 'none' }}>Portfolio</a>
              <a href="/prozess" style={{ color: 'inherit', textDecoration: 'none' }}>Ablauf</a>
              <a href="/impressum" style={{ color: 'inherit', textDecoration: 'none' }}>Impressum</a>
              <a href="/datenschutz" style={{ color: 'inherit', textDecoration: 'none' }}>Datenschutz</a>
            </div>
            <span style={{ fontSize: '12px', color: 'rgba(14,12,8,0.30)' }}>© 2026 Leon Seitz</span>
          </div>
        </Reveal>

      </Section>

    </div>
  );
}

/* ─────────────────────────────────────────────
   KEYFRAMES
───────────────────────────────────────────── */
const globalKeyframes = `
@keyframes noiseMove {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
