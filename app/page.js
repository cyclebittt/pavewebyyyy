'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Wand2,
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
  MapPin,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   BRAND TOKENS  (Brandbook v1)
───────────────────────────────────────────── */
const B = {
  yellow:    '#E8A800',
  ocker:     '#C68F00',
  black:     '#0E0C08',
  cream:     '#F5F2EB',
  dark:      '#2A2720',
  cream60:   'rgba(245,242,235,0.60)',
  cream45:   'rgba(245,242,235,0.45)',
  cream30:   'rgba(245,242,235,0.30)',
  yellow15:  'rgba(232,168,0,0.15)',
  yellow08:  'rgba(232,168,0,0.08)',
  yellow25:  'rgba(232,168,0,0.25)',
};

/* ─────────────────────────────────────────────
   SECTIONS
───────────────────────────────────────────── */
const SECTIONS = [
  { id: 's1', label: 'Start' },
  { id: 's2', label: 'Problem' },
  { id: 's3', label: 'Angebot' },
  { id: 's4', label: 'Proof' },
  { id: 's5', label: 'Leistungen' },
  { id: 'request', label: 'Ablauf & Anfrage' },
];

/* ─────────────────────────────────────────────
   BACKGROUND — warm amber glow, shifts per section
───────────────────────────────────────────── */
const SCENES = {
  s1:      { gx: '18%', gy: '22%', intensity: 0.22 },
  s2:      { gx: '80%', gy: '15%', intensity: 0.12 },
  s3:      { gx: '22%', gy: '18%', intensity: 0.20 },
  s4:      { gx: '75%', gy: '25%', intensity: 0.16 },
  s5:      { gx: '20%', gy: '12%', intensity: 0.24 },
  request: { gx: '15%', gy: '5%',  intensity: 0.18 },
};

/* ─────────────────────────────────────────────
   UTIL
───────────────────────────────────────────── */
function cx(...xs) { return xs.filter(Boolean).join(' '); }

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      entries => {
        const best = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (best?.target?.id) setActiveId(best.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.12, 0.25, 0.4, 0.55, 0.7] }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return activeId;
}

function useReveal(ref) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => { if (entries.some(e => e.isIntersecting)) setShown(true); },
      { threshold: 0.12 }
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

function useMousePos() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const raf = useRef(null);
  useEffect(() => {
    const fn = e => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => { window.removeEventListener('mousemove', fn); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return pos;
}

function useCountUp({ target, durationMs = 900 }) {
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
   BRANDBOOK COMPONENTS
───────────────────────────────────────────── */

/**
 * SerifAccent — DM Serif Display italic for the semantic-weight word
 * Brandbook rule: exactly one word per headline, never decorative
 */
function SerifAccent({ children }) {
  return (
    <em style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: B.cream }}>
      {children}
    </em>
  );
}

/**
 * YellowAccent — inline span in brand yellow, for single word emphasis in body
 */
function YellowWord({ children }) {
  return <span style={{ color: B.yellow }}>{children}</span>;
}

/**
 * UnderlineAnnotation — SVG yellow 2px line drawn on scroll (Brandbook: gelbe Annotation)
 * Wraps a word or short phrase in the headline.
 */
function UnderlineAnnotation({ children }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          bottom: '-4px',
          width: '100%',
          height: '6px',
          overflow: 'visible',
        }}
      >
        <line
          x1="0" y1="4" x2="100%" y2="4"
          stroke={B.yellow}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="100%"
          strokeDashoffset={shown ? '0' : '100%'}
          style={{ transition: shown ? 'stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1) 0.1s' : 'none' }}
        />
      </svg>
    </span>
  );
}

/**
 * Tag — Brandbook pill: yellow bg / black text, or yellow border / yellow text
 */
function Tag({ children, variant = 'solid' }) {
  const solid = variant === 'solid';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '3px 10px',
      borderRadius: '100px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      background: solid ? B.yellow : 'transparent',
      color: solid ? B.black : B.yellow,
      border: solid ? 'none' : `1px solid ${B.yellow}`,
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   LAYOUT & CHROME
───────────────────────────────────────────── */

function GlobalBackground({ activeId }) {
  const scene = SCENES[activeId] ?? SCENES.s1;
  return (
    <div className="fixed inset-0 -z-10" style={{ backgroundColor: B.black }}>
      {/* Warm amber glow — shifts position on section change */}
      <div
        className="absolute inset-0 transition-all duration-[1400ms] ease-out"
        style={{
          background: `radial-gradient(900px 700px at ${scene.gx} ${scene.gy}, rgba(232,168,0,${scene.intensity}), transparent 65%)`,
        }}
      />
      {/* Secondary subtle glow opposite corner */}
      <div
        className="absolute inset-0 transition-all duration-[1600ms] ease-out"
        style={{
          background: `radial-gradient(600px 500px at ${scene.gx === '18%' ? '82%' : '20%'} ${scene.gy === '22%' ? '75%' : '80%'}, rgba(198,143,0,0.06), transparent 60%)`,
        }}
      />
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27320%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27320%27 height=%27320%27 filter=%27url(%23n)%27 opacity=%270.35%27/%3E%3C/svg%3E")',
          backgroundSize: '220px 220px',
          animation: 'noiseMove 7s linear infinite',
        }}
      />
      {/* Radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,transparent_0%,rgba(14,12,8,0.45)_65%,rgba(14,12,8,0.80)_100%)]" />
    </div>
  );
}

/** Tagesstreifen: always-visible 3px yellow bar + scroll progress */
function ScrollProgressBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div style={{ height: '3px', background: `rgba(232,168,0,0.18)` }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round(p * 100)}%`,
            background: B.yellow,
            transition: 'width 80ms linear',
          }}
        />
      </div>
    </div>
  );
}

function CursorHalo() {
  const { x, y } = useMousePos();
  return (
    <div className="hidden md:block fixed inset-0 z-[6] pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px 450px at ${x}px ${y}px, rgba(232,168,0,0.04), transparent 70%)`,
          filter: 'blur(16px)',
          mixBlendMode: 'screen',
          transition: 'background 80ms linear',
        }}
      />
    </div>
  );
}

function Magnetic({ children, strength = 12 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate3d(${((e.clientX - r.left - r.width / 2) / r.width) * strength}px,${((e.clientY - r.top - r.height / 2) / r.height) * strength}px,0)`;
    };
    const onLeave = () => { el.style.transform = 'translate3d(0,0,0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength]);
  return <span ref={ref} className="inline-flex transition-transform duration-200 ease-out will-change-transform">{children}</span>;
}

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
      el.style.setProperty('--hx', `${px * 100}%`);
      el.style.setProperty('--hy', `${py * 100}%`);
    };
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);
  return (
    <div
      ref={ref}
      className={cx('relative will-change-transform [transform-style:preserve-3d]', className)}
      style={{ transform: 'perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))', transition: 'transform 180ms ease-out' }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 md:opacity-100"
        style={{ background: 'radial-gradient(440px 300px at var(--hx,50%) var(--hy,30%),rgba(232,168,0,0.06),transparent 60%)', mixBlendMode: 'screen' }}
      />
      {children}
    </div>
  );
}

function Scene({ id, children }) {
  return (
    <section id={id} className="relative min-h-screen flex items-center px-5 md:px-16 py-16 md:snap-start scroll-mt-24">
      <div className="relative max-w-6xl mx-auto w-full">{children}</div>
    </section>
  );
}

function Reveal({ children, delayMs = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div
      ref={ref}
      className="transition-all duration-700 will-change-transform"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── CTAs ─── */

/** Primary CTA — solid yellow, black text (Brandbook: gelber Button) */
function PrimaryCTA({ label = 'Kostenlose Analyse anfragen', href = '/#request' }) {
  return (
    <Magnetic>
      <Link
        href={href}
        className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold transition-colors"
        style={{
          background: B.yellow,
          color: B.black,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
        onMouseEnter={e => e.currentTarget.style.background = B.ocker}
        onMouseLeave={e => e.currentTarget.style.background = B.yellow}
      >
        {label}
        <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </Magnetic>
  );
}

/** Ghost CTA — yellow border, cream text */
function GhostCTA({ href, children, external = false }) {
  const cls = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '11px 22px',
    borderRadius: '100px',
    border: `1px solid rgba(232,168,0,0.28)`,
    background: 'rgba(232,168,0,0.05)',
    color: B.cream,
    fontWeight: 600,
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    transition: 'border-color 0.18s, background 0.18s',
    fontSize: '14px',
  };
  const hover = e => { e.currentTarget.style.borderColor = 'rgba(232,168,0,0.55)'; e.currentTarget.style.background = 'rgba(232,168,0,0.10)'; };
  const leave = e => { e.currentTarget.style.borderColor = 'rgba(232,168,0,0.28)'; e.currentTarget.style.background = 'rgba(232,168,0,0.05)'; };

  if (external) return (
    <Magnetic strength={10}>
      <a href={href} target="_blank" rel="noopener noreferrer" style={cls} onMouseEnter={hover} onMouseLeave={leave}>{children}</a>
    </Magnetic>
  );
  return (
    <Magnetic strength={10}>
      <Link href={href} style={cls} onMouseEnter={hover} onMouseLeave={leave}>{children}</Link>
    </Magnetic>
  );
}

/* ─────────────────────────────────────────────
   SECTION COMPONENTS
───────────────────────────────────────────── */

function ProofStat({ label, target, suffix = '', durationMs = 900 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  const { value, start } = useCountUp({ target, durationMs });
  useEffect(() => { if (shown) start(); }, [shown, start]);
  return (
    <TiltCard className="rounded-2xl">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8"
        style={{ border: `1px solid rgba(232,168,0,0.15)`, background: B.dark }}
      >
        <div
          className="pointer-events-none absolute -left-32 -top-10 h-[140%] w-56 rotate-12"
          style={{ background: B.yellow, filter: 'blur(48px)', opacity: 0.05, animation: 'shineSoft 5.6s cubic-bezier(.2,.9,.2,1) infinite' }}
        />
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: B.yellow, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
          Proof
        </div>
        <div className="mt-3 flex items-end gap-2 flex-wrap">
          <span style={{ fontSize: 'clamp(2.5rem,6vw,3.5rem)', fontWeight: 800, lineHeight: 1, color: B.cream, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
            {value}
          </span>
          {suffix && (
            <span style={{ fontSize: '1.25rem', fontWeight: 600, color: B.yellow, paddingBottom: '2px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              {suffix}
            </span>
          )}
        </div>
        <div style={{ marginTop: '6px', fontSize: '14px', color: B.cream60, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
          {label}
        </div>
      </div>
    </TiltCard>
  );
}

function BigService({ icon, kicker, title, accentWord, desc }) {
  return (
    <Reveal>
      <TiltCard className="rounded-2xl">
        <div
          className="rounded-2xl p-6 md:p-8 overflow-hidden relative"
          style={{ border: `1px solid rgba(232,168,0,0.12)`, background: B.dark }}
        >
          <div
            className="pointer-events-none absolute -left-32 -top-10 h-[140%] w-56 rotate-12"
            style={{ background: B.yellow, filter: 'blur(52px)', opacity: 0.04, animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite' }}
          />
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: B.cream45, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: B.yellow15, border: `1px solid rgba(232,168,0,0.20)`, color: B.yellow }}
              >
                {icon}
              </span>
              {kicker}
            </div>
            <Wand2 size={16} style={{ color: 'rgba(232,168,0,0.35)' }} />
          </div>
          <div
            className="mt-5"
            style={{ fontSize: 'clamp(1.25rem,3vw,2rem)', fontWeight: 800, lineHeight: 1.15, color: B.cream, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            {title.replace(accentWord, '')}
            <SerifAccent>{accentWord}</SerifAccent>
            {title.endsWith(accentWord) ? '' : title.slice(title.indexOf(accentWord) + accentWord.length)}
          </div>
          <p
            className="mt-4 leading-relaxed max-w-2xl"
            style={{ fontSize: '14px', color: B.cream60, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            {desc}
          </p>
          <div className="mt-6">
            <Link
              href="/#request"
              className="inline-flex items-center gap-2 font-semibold transition-colors"
              style={{ color: 'rgba(232,168,0,0.75)', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '14px' }}
              onMouseEnter={e => e.currentTarget.style.color = B.yellow}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,168,0,0.75)'}
            >
              Anfrage schicken <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Home() {
  const sectionIds = useMemo(() => SECTIONS.map(s => s.id), []);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const handle = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    handle();
    window.addEventListener('hashchange', handle);
    return () => window.removeEventListener('hashchange', handle);
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: B.cream }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@1&display=swap');
        ${globalKeyframes}
      `}</style>

      <GlobalBackground activeId={activeId} />
      <ScrollProgressBar />
      <CursorHalo />
      <Navbar />

      <main className="md:snap-y md:snap-mandatory">

        {/* ── 01 HERO ── */}
        <Scene id="s1">
          <div className="flex flex-col items-center text-center gap-6">

            <Reveal>
              {/* Brandbook: Tag pill, region anchor */}
              <Tag variant="solid">
                <MapPin size={12} /> Aschaffenburg · Obernburg
              </Tag>
            </Reveal>

            <Reveal delayMs={80}>
              <h1
                className="leading-[1.05]"
                style={{ fontSize: 'clamp(2rem,6.5vw,4.5rem)', fontWeight: 800, maxWidth: '820px' }}
              >
                Mehr Anfragen durch eine Website,{' '}
                <br className="hidden md:block" />
                die{' '}
                <UnderlineAnnotation>klar ist</UnderlineAnnotation>
                {' '}– nicht nur{' '}
                <SerifAccent>schön.</SerifAccent>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p
                className="max-w-2xl leading-relaxed"
                style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: B.cream60 }}
              >
                Ich analysiere deine aktuelle Website kostenlos, zeige konkret was nicht funktioniert –
                und liefere einen ersten Entwurf. Ohne Risiko, ohne Commitment.
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="flex flex-col items-center gap-3">
                <PrimaryCTA label="Kostenlose Analyse anfragen" />
                <p style={{ fontSize: '13px', color: B.cream30 }}>
                  Sprint 0 ist kostenlos. Keine Zahlung, bevor du das Ergebnis gesehen hast.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={310}>
              <div className="flex flex-wrap justify-center gap-5" style={{ fontSize: '13px', color: B.cream45 }}>
                {['Analyse kostenlos', 'Erster Entwurf kostenlos', 'Zahlung erst nach Review', 'Antwort innerhalb 24 h'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} style={{ color: B.yellow }} />{t}
                  </span>
                ))}
              </div>
            </Reveal>

          </div>
        </Scene>

        {/* ── 02 PROBLEM ── */}
        <Scene id="s2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <Tag variant="outline">02 — Problem</Tag>
              </Reveal>
              <Reveal delayMs={90}>
                <h2
                  className="mt-5 leading-[1.05]"
                  style={{ fontSize: 'clamp(1.75rem,4.5vw,3.5rem)', fontWeight: 800 }}
                >
                  Viele Websites sehen gut aus.
                  <br />
                  <YellowWord>Und erzeugen trotzdem keine Anfragen.</YellowWord>
                </h2>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 leading-relaxed max-w-xl" style={{ color: B.cream60, fontSize: '16px' }}>
                  Das liegt selten am Design. Es liegt daran, dass Branding, Botschaft und Seitenstruktur
                  nicht aufeinander abgestimmt sind. Der Besucher kommt – und weiß nicht, was er tun soll.
                </p>
              </Reveal>
              <Reveal delayMs={260}>
                <div className="mt-8">
                  <PrimaryCTA label="Kostenlos prüfen lassen" />
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
              <div className="space-y-3">
                {[
                  { title: 'Kein klarer Auftrag an den Besucher', desc: 'Der CTA fehlt oder ist versteckt. Der Besucher weiß nicht, was als nächstes passieren soll.' },
                  { title: 'Kein konsistentes Erscheinungsbild', desc: 'Website, Social Media und Print wirken wie von drei verschiedenen Personen. Das kostet Vertrauen.' },
                  { title: 'Botschaft unklar oder zu allgemein', desc: 'Wer auf die Website kommt, versteht in fünf Sekunden nicht, warum er bleiben sollte.' },
                ].map(item => (
                  <TiltCard key={item.title} className="rounded-2xl">
                    <div
                      className="rounded-2xl p-4 md:p-5 flex items-start gap-3"
                      style={{ border: `1px solid rgba(232,168,0,0.10)`, background: B.dark }}
                    >
                      <AlertCircle size={15} style={{ color: 'rgba(232,168,0,0.55)', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: B.cream }}>{item.title}</div>
                        <p style={{ marginTop: '4px', fontSize: '13px', color: B.cream45, lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* ── 03 ANGEBOT ── */}
        <Scene id="s3">
          <div className="flex flex-col gap-8">
            <div className="max-w-3xl">
              <Reveal>
                <Tag variant="outline">03 — Das Angebot</Tag>
              </Reveal>
              <Reveal delayMs={90}>
                <h2
                  className="mt-5 leading-[1.05]"
                  style={{ fontSize: 'clamp(1.75rem,4.5vw,3.5rem)', fontWeight: 800 }}
                >
                  Du siehst den{' '}
                  <UnderlineAnnotation>Entwurf.</UnderlineAnnotation>
                  <br />
                  Erst dann <SerifAccent>entscheidest</SerifAccent> du.
                </h2>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 leading-relaxed max-w-2xl" style={{ color: B.cream60, fontSize: '16px' }}>
                  Sprint 0 ist kostenlos: Ich analysiere deine Situation, benenne konkrete Schwachstellen
                  und liefere einen ersten Seitenaufbau als Entwurf. Kein Angebot ins Blaue.
                </p>
              </Reveal>
            </div>

            <Reveal delayMs={200}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Sprint 0 card */}
                <div
                  className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{ border: `1px solid rgba(232,168,0,0.30)`, background: 'rgba(232,168,0,0.06)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: B.yellow15, border: `1px solid rgba(232,168,0,0.25)` }}
                  >
                    <Eye size={16} style={{ color: B.yellow }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: B.cream }}>Was du in Sprint 0 bekommst</div>
                    <ul className="mt-2 space-y-1.5" style={{ fontSize: '13px', color: B.cream60 }}>
                      {['3–5 konkrete Optimierungspunkte schriftlich', 'Erster Seitenaufbau als Entwurf', 'Einschätzung, welches Paket passt'].map(item => (
                        <li key={item} className="flex items-start gap-1.5">
                          <CheckCircle2 size={12} style={{ color: B.yellow, marginTop: '2px', flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <Tag variant="solid">Kostenlos · Kein Commitment</Tag>
                  </div>
                </div>

                {/* Zahlung card */}
                <div
                  className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{ border: `1px solid rgba(245,242,235,0.08)`, background: B.dark }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(245,242,235,0.06)', border: `1px solid rgba(245,242,235,0.10)` }}
                  >
                    <Shield size={16} style={{ color: B.cream60 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: B.cream }}>Zahlung nach Review – nicht vorher</div>
                    <p style={{ marginTop: '8px', fontSize: '13px', color: B.cream45, lineHeight: 1.6 }}>
                      Jedes Zahlungsziel ist an einen Sprint-Review gebunden. Du siehst das Ergebnis,
                      gibst Feedback, gibst frei.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Link
                      href="/prozess"
                      className="inline-flex items-center gap-1"
                      style={{ fontSize: '12px', color: 'rgba(232,168,0,0.60)', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                    >
                      Vollständigen Ablauf ansehen <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>

                {/* Transparenz card */}
                <div
                  className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{ border: `1px solid rgba(245,242,235,0.08)`, background: B.dark }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(245,242,235,0.06)', border: `1px solid rgba(245,242,235,0.10)` }}
                  >
                    <FileText size={16} style={{ color: B.cream60 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: B.cream }}>Transparenz im Prozess</div>
                    <p style={{ marginTop: '8px', fontSize: '13px', color: B.cream45, lineHeight: 1.6 }}>
                      Du siehst den Projektstand jederzeit — dokumentiert von Anfang bis Übergabe.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="https://www.leonseitz.com/kunde1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1"
                      style={{ fontSize: '12px', color: 'rgba(232,168,0,0.60)', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                    >
                      Echtes Projekt ansehen <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Sprint mini-timeline */}
            <Reveal delayMs={260}>
              <div
                className="rounded-2xl p-5 md:p-6"
                style={{ border: `1px solid rgba(245,242,235,0.07)`, background: `rgba(14,12,8,0.70)`, backdropFilter: 'blur(8px)' }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: B.cream30, marginBottom: '16px' }}>
                  So läuft ein Projekt ab
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Sprint 0', title: 'Analyse + Entwurf', note: 'Kostenlos', em: true },
                    { label: 'Sprint 1', title: 'Erste Version',      note: '30 % nach Review' },
                    { label: 'Sprint 2', title: 'Feinschliff',        note: '50 % nach Review' },
                    { label: 'Sprint 3', title: 'Go-Live + Übergabe', note: '20 % nach Übergabe' },
                  ].map(s => (
                    <div
                      key={s.label}
                      className="rounded-xl px-3 py-3"
                      style={{
                        border: s.em ? `1px solid rgba(232,168,0,0.30)` : `1px solid rgba(245,242,235,0.07)`,
                        background: s.em ? 'rgba(232,168,0,0.07)' : 'rgba(245,242,235,0.02)',
                      }}
                    >
                      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: s.em ? B.yellow : B.cream30, marginBottom: '4px' }}>
                        {s.label}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: B.cream }}>{s.title}</div>
                      <div style={{ marginTop: '6px', fontSize: '12px', color: s.em ? B.yellow : B.cream30, fontWeight: s.em ? 600 : 400 }}>{s.note}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Link href="/prozess" className="inline-flex items-center gap-1.5 font-medium" style={{ fontSize: '13px', color: B.cream45 }}>
                    Ablauf im Detail <ArrowRight size={12} />
                  </Link>
                  <a href="https://www.leonseitz.com/kunde1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium" style={{ fontSize: '13px', color: B.cream45 }}>
                    Echtes Projekt ansehen <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={320}>
              <div className="flex flex-wrap gap-3">
                <PrimaryCTA label="Kostenlose Analyse anfragen" />
                <GhostCTA href="/portfolio"><ExternalLink size={16} /> Portfolio ansehen</GhostCTA>
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* ── 04 PROOF ── */}
        <Scene id="s4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <Tag variant="outline">04 — Proof</Tag>
              </Reveal>
              <Reveal delayMs={90}>
                <h2
                  className="mt-5 leading-[1.05]"
                  style={{ fontSize: 'clamp(1.75rem,4.5vw,3.5rem)', fontWeight: 800 }}
                >
                  Zahlen,{' '}
                  <br />
                  die man{' '}
                  <UnderlineAnnotation>einordnen</UnderlineAnnotation>{' '}
                  kann.
                </h2>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 max-w-xl leading-relaxed" style={{ color: B.cream60, fontSize: '16px' }}>
                  Wenn Branding, Content und Funnel aufeinander einzahlen, zeigt sich das in den
                  Ergebnissen – nicht nur im Look.
                </p>
              </Reveal>
              <Reveal delayMs={260}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <GhostCTA href="/portfolio"><ExternalLink size={16} /> Portfolio ansehen</GhostCTA>
                  <GhostCTA href="https://www.leonseitz.com/kunde1" external><ExternalLink size={16} /> Echtes Projekt</GhostCTA>
                </div>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <ProofStat label="Likes auf erstellten Inhalten"      target={15}  suffix="+ Mio" durationMs={900} />
              <ProofStat label="Klicks über Social Media generiert"  target={10}  suffix="+ Mio" durationMs={900} />
              <ProofStat label="Abgeschlossene Projekte"            target={100} suffix="+"     durationMs={950} />
            </div>
          </div>
        </Scene>

        {/* ── 05 LEISTUNGEN ── */}
        <Scene id="s5">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <Tag variant="outline">05 — Leistungen</Tag>
              </Reveal>
              <Reveal delayMs={90}>
                <h2
                  className="mt-5 leading-[1.05]"
                  style={{ fontSize: 'clamp(1.75rem,4.5vw,3.5rem)', fontWeight: 800 }}
                >
                  Vier Bereiche.
                  <br />
                  <SerifAccent>Einer</SerifAccent>{' '}greift in den nächsten.
                </h2>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 leading-relaxed" style={{ color: B.cream60, fontSize: '16px' }}>
                  Einzeln buchbar oder als komplettes Setup – je nachdem, wo du gerade stehst.
                </p>
              </Reveal>
              <Reveal delayMs={260}>
                <div className="mt-8">
                  <PrimaryCTA label="Kostenlos starten" />
                </div>
              </Reveal>
            </div>
            <div className="space-y-4">
              <BigService icon={<BookOpen size={17} />} kicker="Brandbook"      title="Guidelines, die man wirklich nutzt." accentWord="wirklich"     desc="Farben, Typo, Layoutregeln, Tone of Voice, Beispiele. Damit du und dein Team konsistent kommunizieren – ohne jedes Mal neu entscheiden zu müssen." />
              <BigService icon={<Play size={17} />}     kicker="Motiondesign"   title="Motion, der im Feed auffällt."       accentWord="auffällt."    desc="Kurzformate, Motion Graphics, Hook-Varianten, Templates. Damit du skalieren kannst, ohne jedes Format neu zu entwickeln." />
              <BigService icon={<Monitor size={17} />}  kicker="Webdevelopment" title="Websites mit einer Richtung."        accentWord="Richtung."    desc="Klarer Aufbau, klare CTA, wenig Ablenkung. Damit ein Besucher weiß, was als nächstes passieren soll." />
              <BigService icon={<Film size={17} />}     kicker="Videoediting"   title="Schnitt mit Rhythmus."               accentWord="Rhythmus."    desc="Storyline, Timing, Sound, Pace. Damit ein Video nicht nur fertig ist, sondern die Botschaft trägt." />
            </div>
          </div>
        </Scene>

        {/* ── 06 ABLAUF + CTA ── */}
        <Scene id="request">
          <div className="flex flex-col gap-16">

            <div className="text-center max-w-2xl mx-auto">
              <Reveal>
                <Tag variant="outline">06 — Ablauf</Tag>
              </Reveal>
              <Reveal delayMs={80}>
                <h2
                  className="mt-5 leading-[1.05]"
                  style={{ fontSize: 'clamp(1.75rem,4.5vw,3.5rem)', fontWeight: 800 }}
                >
                  Vier Sprints.
                  <br />
                  Kein Schritt ohne{' '}
                  <UnderlineAnnotation>dein Okay.</UnderlineAnnotation>
                </h2>
              </Reveal>
              <Reveal delayMs={150}>
                <p className="mt-4 leading-relaxed" style={{ color: B.cream45, fontSize: '16px' }}>
                  Nach jedem Sprint siehst du das Ergebnis. Zahlung erst nach Freigabe – nie vorher.
                </p>
              </Reveal>
            </div>

            {/* Sprint Timeline */}
            <Reveal delayMs={100}>
              <div className="relative">
                <div
                  className="hidden md:block absolute top-[28px] left-[calc(12.5%)] right-[calc(12.5%)] h-px"
                  style={{ background: `linear-gradient(to right, ${B.yellow}55, rgba(232,168,0,0.10))` }}
                />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { n: '0', label: 'Sprint 0', title: 'Analyse + Entwurf',   desc: 'Konkrete Schwachstellen, erster Seitenaufbau, Paketempfehlung.',    note: 'Kostenlos',          em: true },
                    { n: '1', label: 'Sprint 1', title: 'Erste Version',        desc: 'Du klickst durch, gibst Feedback. 2 Revisionsrunden inklusive.',     note: '30 % nach Review',   em: false },
                    { n: '2', label: 'Sprint 2', title: 'Feinschliff',          desc: 'Alle Punkte umgesetzt. SEO-Basis und Performance geprüft.',          note: '50 % nach Freigabe', em: false },
                    { n: '3', label: 'Sprint 3', title: 'Go-Live + Übergabe',   desc: 'Live-Schaltung, Dateien, Zugänge, vollständige Dokumentation.',      note: '20 % nach Übergabe', em: false },
                  ].map((s, i) => (
                    <TiltCard key={s.n} className="rounded-2xl">
                      <div
                        className="rounded-2xl p-5 h-full flex flex-col gap-4 relative overflow-hidden"
                        style={{
                          border: s.em ? `1px solid rgba(232,168,0,0.30)` : `1px solid rgba(245,242,235,0.08)`,
                          background: s.em ? 'rgba(232,168,0,0.07)' : 'rgba(245,242,235,0.02)',
                        }}
                      >
                        <div
                          className="pointer-events-none absolute -left-20 -top-8 h-[130%] w-36 rotate-12"
                          style={{ background: B.yellow, filter: 'blur(36px)', opacity: 0.04, animation: `shineSoft ${5.5 + i * 0.4}s cubic-bezier(.2,.9,.2,1) infinite` }}
                        />
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 relative z-10"
                            style={{
                              background: s.em ? B.yellow : 'rgba(245,242,235,0.10)',
                              color: s.em ? B.black : B.cream,
                              border: s.em ? 'none' : `1px solid rgba(245,242,235,0.15)`,
                              boxShadow: s.em ? `0 0 20px rgba(232,168,0,0.30)` : 'none',
                            }}
                          >
                            {s.n}
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: s.em ? B.yellow : B.cream30 }}>
                            {s.label}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div style={{ fontSize: '14px', fontWeight: 700, color: B.cream, lineHeight: 1.3 }}>{s.title}</div>
                          <p style={{ marginTop: '6px', fontSize: '12px', color: B.cream45, lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                        <div
                          className="self-start rounded-lg px-2.5 py-1.5"
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            border: s.em ? `1px solid rgba(232,168,0,0.30)` : `1px solid rgba(245,242,235,0.07)`,
                            background: s.em ? 'rgba(232,168,0,0.10)' : 'rgba(245,242,235,0.03)',
                            color: s.em ? B.yellow : B.cream30,
                          }}
                        >
                          {s.note}
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
                <div className="mt-5 flex justify-center">
                  <Link href="/prozess" className="inline-flex items-center gap-1.5" style={{ fontSize: '13px', color: B.cream30 }}>
                    Vollständiger Ablauf auf /prozess <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Pakete */}
            <Reveal delayMs={80}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: B.cream30, textAlign: 'center', marginBottom: '20px' }}>
                  Pakete
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { name: 'Einstieg', price: 'ab 400 €', time: '~7 Tage',       items: ['1 Landingpage', 'Klare Struktur', '1 CTA-Fokus'],                             featured: false },
                    { name: 'Standard', price: 'ab 700 €', time: '10–14 Tage',    items: ['Website bis 5 Seiten', 'Branding-Grundlage', '2 Revisionsrunden'],             featured: true },
                    { name: 'Komplett', price: 'ab 1.100 €', time: 'ca. 3 Wochen', items: ['Website + Brandbook', 'Motion-Element', 'Vollständige Übergabe'],             featured: false },
                  ].map(p => (
                    <TiltCard key={p.name} className="rounded-2xl">
                      <div
                        className="rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden"
                        style={{
                          border: p.featured ? `1px solid rgba(232,168,0,0.28)` : `1px solid rgba(245,242,235,0.07)`,
                          background: p.featured ? 'rgba(232,168,0,0.05)' : 'rgba(245,242,235,0.02)',
                        }}
                      >
                        {p.featured && (
                          <div
                            className="pointer-events-none absolute -left-16 -top-8 h-[130%] w-40 rotate-12"
                            style={{ background: B.yellow, filter: 'blur(42px)', opacity: 0.05, animation: 'shineSoft 5.8s cubic-bezier(.2,.9,.2,1) infinite' }}
                          />
                        )}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: B.cream }}>{p.name}</div>
                            {p.featured && <div style={{ marginTop: '2px', fontSize: '11px', color: 'rgba(232,168,0,0.65)' }}>Am häufigsten gewählt</div>}
                          </div>
                          <div className="text-right shrink-0">
                            <div style={{ fontSize: '15px', fontWeight: 800, color: B.cream }}>{p.price}</div>
                            <div className="flex items-center gap-1 justify-end mt-1" style={{ fontSize: '11px', color: B.cream30 }}>
                              <Clock size={10} />{p.time}
                            </div>
                          </div>
                        </div>
                        <ul className="space-y-1.5">
                          {p.items.map(item => (
                            <li key={item} className="flex items-center gap-2" style={{ fontSize: '13px', color: B.cream60 }}>
                              <CheckCircle2 size={12} style={{ flexShrink: 0, color: p.featured ? B.yellow : B.cream30 }} />{item}
                            </li>
                          ))}
                        </ul>
                        <div style={{ marginTop: 'auto', paddingTop: '4px', fontSize: '11px', color: B.cream30 }}>
                          Startet mit Sprint 0 – kostenlos.
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Finaler CTA */}
            <Reveal delayMs={80}>
              <div
                className="relative rounded-2xl overflow-hidden p-8 md:p-16 text-center"
                style={{ border: `1px solid rgba(232,168,0,0.22)`, background: 'rgba(232,168,0,0.04)' }}
              >
                {/* Tagesstreifen am oberen Rand */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: B.yellow }} />
                <div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <div style={{ width: '500px', height: '260px', borderRadius: '50%', background: 'rgba(232,168,0,0.08)', filter: 'blur(80px)' }} />
                </div>
                <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6">
                  <Tag variant="solid">Kostenloser Einstieg</Tag>
                  <h3 style={{ fontSize: 'clamp(1.5rem,4vw,3rem)', fontWeight: 800, lineHeight: 1.1, color: B.cream }}>
                    Kostenlose Website-Analyse.
                    <br />
                    <SerifAccent>Kein Risiko.</SerifAccent> Kein Commitment.
                  </h3>
                  <p style={{ color: B.cream45, fontSize: '15px', lineHeight: 1.7, maxWidth: '440px' }}>
                    Schick mir deine URL und was du dir davon erhoffst. Ich melde mich innerhalb von 24 h
                    mit einer ehrlichen Einschätzung.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4" style={{ fontSize: '13px', color: B.cream45 }}>
                    {['Sprint 0 kostenlos', '24 h Antwortzeit', 'Zahlung nach Review'].map(t => (
                      <span key={t} className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} style={{ color: B.yellow }} />{t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Magnetic>
                      <a
                        href="mailto:hello@leonseitz.com?subject=Kostenlose Website-Analyse&body=Meine Website: %0D%0AZiel: %0D%0ADeadline (optional): %0D%0A"
                        className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full transition-colors"
                        style={{
                          background: B.yellow,
                          color: B.black,
                          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                          boxShadow: '0 0 40px rgba(232,168,0,0.18)',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = B.ocker}
                        onMouseLeave={e => e.currentTarget.style.background = B.yellow}
                      >
                        <Mail size={17} /> Analyse anfragen
                      </a>
                    </Magnetic>
                    <GhostCTA href="/portfolio"><ExternalLink size={16} /> Portfolio ansehen</GhostCTA>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </Scene>

      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   KEYFRAMES
───────────────────────────────────────────── */
const globalKeyframes = `
@keyframes blob {
  0%   { transform: translate3d(0px,0px,0) scale(1); }
  35%  { transform: translate3d(40px,-30px,0) scale(1.08); }
  70%  { transform: translate3d(-30px,20px,0) scale(0.96); }
  100% { transform: translate3d(0px,0px,0) scale(1); }
}
@keyframes shineSoft {
  0%   { transform: translateX(-180px) rotate(12deg); opacity:0.00; }
  14%  { opacity:0.07; }
  38%  { transform: translateX(100px) rotate(12deg); opacity:0.05; }
  55%  { transform: translateX(220px) rotate(12deg); opacity:0.02; }
  78%  { transform: translateX(480px) rotate(12deg); opacity:0.04; }
  100% { transform: translateX(900px) rotate(12deg); opacity:0.00; }
}
@keyframes noiseMove {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
