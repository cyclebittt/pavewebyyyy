'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Mail,
  MessageCircle,
  Flag,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ---------- CONFIG ---------- */

const EMAIL = 'hello@leonseitz.com';
const WHATSAPP_E164 = '4916095757167';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`;

const WHATSAPP_ANALYSE_HREF = `${WHATSAPP_URL}?text=${encodeURIComponent(
  `Hi Leon,\n\nIch möchte die kostenlose Website-Analyse.\n\nZiel:\nDeadline:\nStand:\nLink zur aktuellen Website:\n\nKurzkontext:`
)}`;

const MAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Projektanfrage')}&body=${encodeURIComponent(
  `Hi Leon,\n\nZiel:\nDeadline:\nStand:\nLink/Beispiele:\n\nKurzkontext:`
)}`;

const LIVE_PREVIEW_URL = 'https://leonseitz.com'; // Referenz-Link (dezent)

/* ---------- SCENES (same aesthetic language as home) ---------- */

const SECTIONS = [
  { id: 's1', label: 'Start' },
  { id: 's2', label: 'Referenz' },
  { id: 's3', label: 'Analyse' },
  { id: 's4', label: 'Pakete' },
  { id: 's5', label: 'Zahlung' },
  { id: 's6', label: 'Prozess' },
  { id: 's7', label: 'Einwände' },
  { id: 's8', label: 'Betreuung' },
  { id: 'request', label: 'Anfrage' },
];

const SCENES = {
  s1: {
    base: '#070312',
    g1: `radial-gradient(1200px 700px at 18% 18%, rgba(168,85,247,0.32), transparent 60%),
         radial-gradient(900px 700px at 82% 25%, rgba(56,189,248,0.14), transparent 55%)`,
    g2: `linear-gradient(135deg, #070312 0%, #0b0b1a 50%, #03040e 100%)`,
    blobs: [
      { cls: 'bg-violet-500/18', x: '-20%', y: '-18%', s: '56rem', blur: 140 },
      { cls: 'bg-cyan-500/12', x: '70%', y: '10%', s: '54rem', blur: 150 },
      { cls: 'bg-fuchsia-500/10', x: '20%', y: '80%', s: '46rem', blur: 150 },
    ],
    accent: 'from-violet-200 via-indigo-200 to-cyan-200',
  },
  s2: {
    base: '#021019',
    g1: `radial-gradient(1100px 750px at 22% 20%, rgba(34,211,238,0.22), transparent 60%),
         radial-gradient(900px 700px at 88% 15%, rgba(99,102,241,0.18), transparent 55%)`,
    g2: `linear-gradient(135deg, #021019 0%, #07102a 55%, #05010b 100%)`,
    blobs: [
      { cls: 'bg-cyan-500/16', x: '-10%', y: '-10%', s: '58rem', blur: 150 },
      { cls: 'bg-indigo-500/14', x: '72%', y: '0%', s: '54rem', blur: 150 },
      { cls: 'bg-emerald-500/10', x: '10%', y: '75%', s: '46rem', blur: 160 },
    ],
    accent: 'from-cyan-200 via-indigo-200 to-violet-200',
  },
  s3: {
    base: '#120316',
    g1: `radial-gradient(1200px 750px at 20% 10%, rgba(244,114,182,0.14), transparent 60%),
         radial-gradient(950px 750px at 84% 30%, rgba(168,85,247,0.20), transparent 55%)`,
    g2: `linear-gradient(135deg, #120316 0%, #1a0714 55%, #040312 100%)`,
    blobs: [
      { cls: 'bg-pink-500/12', x: '-18%', y: '-12%', s: '56rem', blur: 160 },
      { cls: 'bg-violet-500/16', x: '68%', y: '12%', s: '56rem', blur: 150 },
      { cls: 'bg-cyan-500/10', x: '10%', y: '80%', s: '46rem', blur: 170 },
    ],
    accent: 'from-pink-200 via-fuchsia-200 to-indigo-200',
  },
  s4: {
    base: '#03110a',
    g1: `radial-gradient(1200px 750px at 18% 10%, rgba(16,185,129,0.10), transparent 60%),
         radial-gradient(900px 700px at 85% 20%, rgba(59,130,246,0.16), transparent 55%)`,
    g2: `linear-gradient(135deg, #03110a 0%, #0a1020 55%, #04060d 100%)`,
    blobs: [
      { cls: 'bg-emerald-500/11', x: '-12%', y: '-16%', s: '54rem', blur: 170 },
      { cls: 'bg-cyan-500/11', x: '75%', y: '8%', s: '56rem', blur: 160 },
      { cls: 'bg-indigo-500/11', x: '18%', y: '82%', s: '48rem', blur: 170 },
    ],
    accent: 'from-emerald-200 via-cyan-200 to-indigo-200',
  },
  s5: {
    base: '#120b02',
    g1: `radial-gradient(1200px 750px at 15% 10%, rgba(250,204,21,0.08), transparent 60%),
         radial-gradient(900px 700px at 88% 25%, rgba(236,72,153,0.14), transparent 55%)`,
    g2: `linear-gradient(135deg, #120b02 0%, #1b0713 55%, #05020a 100%)`,
    blobs: [
      { cls: 'bg-amber-400/10', x: '-10%', y: '-14%', s: '56rem', blur: 170 },
      { cls: 'bg-pink-500/11', x: '74%', y: '10%', s: '56rem', blur: 160 },
      { cls: 'bg-violet-500/11', x: '18%', y: '82%', s: '48rem', blur: 170 },
    ],
    accent: 'from-amber-200 via-pink-200 to-violet-200',
  },
  s6: {
    base: '#04040a',
    g1: `radial-gradient(1200px 750px at 15% 0%, rgba(99,102,241,0.16), transparent 60%),
         radial-gradient(900px 700px at 90% 15%, rgba(56,189,248,0.10), transparent 55%)`,
    g2: `linear-gradient(135deg, #04040a 0%, #07071a 55%, #04030a 100%)`,
    blobs: [
      { cls: 'bg-indigo-500/11', x: '-12%', y: '-18%', s: '56rem', blur: 170 },
      { cls: 'bg-cyan-500/10', x: '76%', y: '8%', s: '56rem', blur: 170 },
      { cls: 'bg-violet-500/10', x: '18%', y: '82%', s: '48rem', blur: 170 },
    ],
    accent: 'from-indigo-200 via-violet-200 to-cyan-200',
  },
  s7: {
    base: '#06020f',
    g1: `radial-gradient(1200px 750px at 18% 10%, rgba(168,85,247,0.18), transparent 60%),
         radial-gradient(900px 700px at 85% 20%, rgba(56,189,248,0.10), transparent 55%)`,
    g2: `linear-gradient(135deg, #06020f 0%, #0b0716 55%, #04030a 100%)`,
    blobs: [
      { cls: 'bg-violet-500/12', x: '-12%', y: '-16%', s: '54rem', blur: 170 },
      { cls: 'bg-cyan-500/10', x: '75%', y: '8%', s: '56rem', blur: 160 },
      { cls: 'bg-fuchsia-500/10', x: '10%', y: '82%', s: '48rem', blur: 170 },
    ],
    accent: 'from-violet-200 via-fuchsia-200 to-cyan-200',
  },
  s8: {
    base: '#071018',
    g1: `radial-gradient(1200px 750px at 18% 10%, rgba(56,189,248,0.16), transparent 60%),
         radial-gradient(900px 700px at 85% 20%, rgba(168,85,247,0.12), transparent 55%)`,
    g2: `linear-gradient(135deg, #071018 0%, #0b1226 55%, #05020a 100%)`,
    blobs: [
      { cls: 'bg-cyan-500/12', x: '-10%', y: '-14%', s: '56rem', blur: 170 },
      { cls: 'bg-indigo-500/10', x: '74%', y: '10%', s: '56rem', blur: 160 },
      { cls: 'bg-violet-500/10', x: '18%', y: '82%', s: '48rem', blur: 170 },
    ],
    accent: 'from-cyan-200 via-indigo-200 to-violet-200',
  },
  request: {
    base: '#04040a',
    g1: `radial-gradient(1200px 750px at 15% 0%, rgba(99,102,241,0.18), transparent 60%),
         radial-gradient(900px 700px at 90% 15%, rgba(56,189,248,0.11), transparent 55%)`,
    g2: `linear-gradient(135deg, #04040a 0%, #07071a 55%, #04030a 100%)`,
    blobs: [
      { cls: 'bg-indigo-500/11', x: '-12%', y: '-18%', s: '56rem', blur: 170 },
      { cls: 'bg-cyan-500/10', x: '76%', y: '8%', s: '56rem', blur: 170 },
      { cls: 'bg-violet-500/10', x: '18%', y: '82%', s: '48rem', blur: 170 },
    ],
    accent: 'from-indigo-200 via-violet-200 to-cyan-200',
  },
};

/* ---------- UTIL ---------- */

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

function TitleGradient({ sceneId, children }) {
  const scene = SCENES[sceneId] ?? SCENES.s1;
  return <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', scene.accent)}>{children}</span>;
}

function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (best?.target?.id) setActiveId(best.target.id);
      },
      { root: null, rootMargin: '-35% 0px -55% 0px', threshold: [0.12, 0.25, 0.4, 0.55, 0.7] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return { activeId };
}

function useReveal(ref) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShown(true);
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return shown;
}

function useScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      setP(doc.scrollTop / max);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return p;
}

function useMousePos() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPos({ x, y }));
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return pos;
}

/* ---------- GLOBAL BACKGROUND ---------- */

function GlobalBackground({ activeId }) {
  return (
    <div className="fixed inset-0 -z-10">
      {Object.keys(SCENES).map((key) => {
        const s = SCENES[key];
        const on = key === activeId;

        return (
          <div
            key={key}
            className={cx(
              'absolute inset-0 transition-[opacity,filter,transform] duration-[1200ms] ease-out will-change-[opacity,filter,transform]',
              on ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-[14px] scale-[1.025]'
            )}
            style={{
              backgroundColor: s.base,
              backgroundImage: `${s.g1}, ${s.g2}`,
            }}
          />
        );
      })}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27320%27 viewBox=%270 0 320 320%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27320%27 height=%27320%27 filter=%27url(%23n)%27 opacity=%270.35%27/%3E%3C/svg%3E")',
          backgroundSize: '220px 220px',
          animation: 'noiseMove 7s linear infinite',
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,transparent_0%,rgba(0,0,0,0.40)_65%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}

function GlobalLightLeaks({ activeId }) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {Object.keys(SCENES).map((key) => {
        const scene = SCENES[key];
        const on = key === activeId;

        return (
          <div
            key={key}
            className={cx(
              'absolute inset-0 transition-[opacity,filter] duration-[1200ms] ease-out will-change-[opacity,filter]',
              on ? 'opacity-100 blur-0' : 'opacity-0 blur-[20px]'
            )}
          >
            {scene.blobs.map((b, i) => (
              <div
                key={i}
                className={cx(
                  'absolute rounded-full',
                  b.cls,
                  i === 0
                    ? 'animate-[blob_10s_ease-in-out_infinite]'
                    : i === 1
                      ? 'animate-[blob2_12s_ease-in-out_infinite]'
                      : 'animate-[blob3_14s_ease-in-out_infinite]'
                )}
                style={{
                  left: b.x,
                  top: b.y,
                  width: b.s,
                  height: b.s,
                  filter: `blur(${b.blur}px)`,
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- UI ADDONS ---------- */

function ScrollProgressBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div className="h-[2px] bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-violet-300 via-cyan-300 to-emerald-300"
          style={{ width: `${Math.round(p * 100)}%`, transition: 'width 80ms linear' }}
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
          background: `radial-gradient(800px 600px at ${x}px ${y}px, rgba(255,255,255,0.040), transparent 70%)`,
          filter: 'blur(18px)',
          opacity: 0.6,
          mixBlendMode: 'screen',
          transition: 'background 80ms linear',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(1400px 1050px at ${x}px ${y}px, rgba(99,102,241,0.032), transparent 78%)`,
          filter: 'blur(34px)',
          opacity: 0.55,
          mixBlendMode: 'screen',
          transition: 'background 80ms linear',
        }}
      />
    </div>
  );
}

function Magnetic({ children, strength = 14, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx0 = r.left + r.width / 2;
      const cy0 = r.top + r.height / 2;
      const dx = e.clientX - cx0;
      const dy = e.clientY - cy0;
      const mx = (dx / r.width) * strength;
      const my = (dy / r.height) * strength;
      el.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const onLeave = () => {
      el.style.transform = 'translate3d(0,0,0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={cx('inline-flex transition-transform duration-200 ease-out will-change-transform', className)}>
      {children}
    </span>
  );
}

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * 10;
      const ry = (px - 0.5) * 12;

      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
      el.style.setProperty('--hx', `${px * 100}%`);
      el.style.setProperty('--hy', `${py * 100}%`);
    };

    const onLeave = () => {
      el.style.setProperty('--rx', `0deg`);
      el.style.setProperty('--ry', `0deg`);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cx('relative will-change-transform [transform-style:preserve-3d]', className)}
      style={{
        transform: 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
        transition: 'transform 180ms ease-out',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-inherit opacity-0 md:opacity-100"
        style={{
          background: 'radial-gradient(520px 380px at var(--hx, 50%) var(--hy, 30%), rgba(255,255,255,0.10), transparent 62%)',
          mixBlendMode: 'screen',
        }}
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
      className={cx(
        'transition-all duration-700 will-change-transform',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

function PrimaryCTA({ label, href = '/#request' }) {
  return (
    <Magnetic>
      <Link
        href={href}
        className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
      >
        {label}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </Magnetic>
  );
}

function GhostCTA({ href, children }) {
  return (
    <Magnetic strength={10}>
      <Link
        href={href}
        className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
      >
        {children}
      </Link>
    </Magnetic>
  );
}

function GradientPillButton({ href, icon, children, gradient, external = false, onClick }) {
  const classes =
    'inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-white/12 bg-white/[0.06] backdrop-blur-xl hover:bg-white/[0.10] transition-colors';

  const inner = (
    <>
      <span className={cx('inline-flex items-center justify-center w-8 h-8 rounded-full', 'bg-gradient-to-r', gradient, 'text-black')}>
        {icon}
      </span>
      <span className="text-white/90">{children}</span>
      {external ? <ExternalLink size={14} className="text-white/60" /> : null}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {inner}
      </button>
    );
  }

  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={classes}>
      {inner}
    </a>
  );
}

/* ---------- MODAL (optional screenshot embed slot) ---------- */

function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full max-w-5xl rounded-3xl border border-white/14 bg-black/35 backdrop-blur-2xl shadow-[0_30px_90px_-60px_rgba(0,0,0,0.95)] overflow-hidden">
          <div className="pointer-events-none absolute -inset-px opacity-70 blur-2xl bg-[radial-gradient(60%_80%_at_25%_10%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(60%_80%_at_85%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(55%_80%_at_50%_115%,rgba(168,85,247,0.08),transparent_60%)]" />
          <div className="relative p-4 md:p-5 flex items-center justify-between gap-3 border-b border-white/10">
            <div className="text-sm md:text-base font-semibold text-white/90">{title}</div>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 rounded-2xl border border-white/12 bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Schließen"
              type="button"
            >
              <X size={18} className="text-white/80" />
            </button>
          </div>
          <div className="relative p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- PAYMENT CALC ---------- */

function formatEUR(n) {
  const v = Math.round(n || 0);
  return new Intl.NumberFormat('de-DE').format(v) + ' €';
}

/* ---------- PROCESS PHASE (animated “done” rail) ---------- */

function Phase({ n, title, milestone, desc, sceneId }) {
  const ref = useRef(null);
  const shown = useReveal(ref);

  return (
    <TiltCard className="rounded-3xl">
      <div
        ref={ref}
        className={cx(
          'relative overflow-hidden rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-5 md:p-6',
          shown ? 'opacity-100' : 'opacity-0'
        )}
        style={{ transition: 'opacity 700ms cubic-bezier(.2,.9,.2,1)' }}
      >
        {/* vertical rail */}
        <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-white/10 rounded-full" />
        <div
          className={cx('absolute left-6 top-6 w-[2px] rounded-full bg-gradient-to-b', (SCENES[sceneId] ?? SCENES.s1).accent)}
          style={{
            height: shown ? 'calc(100% - 3rem)' : '0%',
            transition: 'height 900ms cubic-bezier(.2,.9,.2,1) 120ms',
            boxShadow: '0 0 24px rgba(124,58,237,0.16)',
          }}
        />

        <div className="pl-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center font-extrabold text-white/90">
                {n}
              </div>
              <div className="text-base md:text-lg font-extrabold tracking-tight text-white">{title}</div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-white/60 whitespace-nowrap">
              <Flag size={16} className="text-white/55" />
              {milestone}
            </div>
          </div>

          <div className="mt-3 text-sm md:text-base text-white/70 leading-relaxed whitespace-pre-line">{desc}</div>

          <div className="mt-4 md:hidden flex items-center gap-2 text-xs text-white/60">
            <Flag size={16} className="text-white/55" />
            {milestone}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

/* ---------- PAGE ---------- */

export default function ProzessPage() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const { activeId } = useActiveSection(sectionIds);

  const [openRefModal, setOpenRefModal] = useState(false);

  // Default Effect: Standard preselected in calculator
  const PRESETS = useMemo(() => ({ einstieg: 400, standard: 700, komplett: 1100 }), []);
  const [selectedPreset, setSelectedPreset] = useState('standard');
  const [amountInput, setAmountInput] = useState(String(PRESETS.standard));

  const amount = useMemo(() => {
    const digits = String(amountInput ?? '').replace(/[^\d]/g, '');
    const v = digits ? Number(digits) : PRESETS[selectedPreset] ?? 700;
    return Number.isFinite(v) ? v : 700;
  }, [amountInput, PRESETS, selectedPreset]);

  const payments = useMemo(() => {
    const p1 = amount * 0.4;
    const p2 = amount * 0.4;
    const p3 = amount * 0.2;
    return { p1, p2, p3 };
  }, [amount]);

  // When preset clicked: fill input
  const applyPreset = useCallback(
    (key) => {
      setSelectedPreset(key);
      setAmountInput(String(PRESETS[key] ?? 700));
    },
    [PRESETS]
  );

  // If user types a non-preset value: keep selection but visually it’s custom (we keep the active button unless user selects another)
  // We do NOT auto-switch preset based on typing to avoid annoying jumps.

  return (
    <div className="font-proxima text-white">
      <style>{globalKeyframes}</style>

      <GlobalBackground activeId={activeId} />
      <GlobalLightLeaks activeId={activeId} />

      <ScrollProgressBar />
      <CursorHalo />

      <Navbar />

      <main className="md:snap-y md:snap-mandatory">
        {/* 01 — HERO */}
        <Scene id="s1">
          <div className="flex flex-col items-center text-center gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Kapazität geplant für bis zu zwei neue Projekte parallel
              </span>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
                Klar. Strukturiert.
                <span className="block">
                  <TitleGradient sceneId="s1">Ohne Agenturpreis.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="max-w-2xl text-base md:text-xl text-white/80 leading-relaxed">
                Jeden Monat verlieren lokale Unternehmen Anfragen an Wettbewerber mit besserem Webauftritt. Ich baue einen Auftritt, der führt – mit klaren
                Meilensteinen und Feedbackschleifen.
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="flex flex-col items-center gap-3">
                <PrimaryCTA label="Kostenlose Analyse starten" href="/prozess#s3" />
                <p className="text-sm md:text-base text-white/65 max-w-xl">
                  Du zahlst die zweite Rate erst, wenn du die erste Version gesehen und freigegeben hast.
                </p>
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* 02 — REFERENZ (Halo + Story) */}
        <Scene id="s2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <TiltCard className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-black/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <div className="text-xs text-white/55 truncate">leonseitz.com</div>
                    <button
                      type="button"
                      onClick={() => setOpenRefModal(true)}
                      className="text-xs font-semibold text-white/70 hover:text-white/90 transition-colors"
                    >
                      Preview
                    </button>
                  </div>

                  {/* Placeholder screenshot area */}
                  <div className="relative h-56 md:h-80">
                    <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_0%,rgba(255,255,255,0.14),transparent_55%)] mix-blend-screen opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="px-4 py-2 rounded-full border border-white/15 bg-black/30 text-xs text-white/70">
                        Screenshot-Platzhalter (hier dein echtes Bild)
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">Referenz</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Ein starker Eindruck
                  <span className="block">
                    <TitleGradient sceneId="s2">färbt alles danach.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Ein regionaler Betrieb hatte keinen klaren Online-Auftritt. Nach dem Go-Live kamen die ersten qualifizierten Anfragen – weil Struktur und CTA
                  nicht mehr „irgendwo“ waren, sondern geführt haben.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <GhostCTA href="/portfolio">
                    <ExternalLink size={18} /> Portfolio
                  </GhostCTA>
                  <a
                    className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
                    href={LIVE_PREVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={18} /> leonseitz.com ansehen
                  </a>
                </div>
              </Reveal>

              <Reveal delayMs={320}>
                <p className="mt-4 text-sm text-white/55 max-w-xl">
                  Hinweis: Kein Zahlen-Bombardement. Ein sauberer Case ist hier der Beweis – nicht ein Statistikblock.
                </p>
              </Reveal>
            </div>
          </div>
        </Scene>

        {/* 03 — FREE ANALYSIS (Reciprocity) */}
        <Scene id="s3">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">Kostenloser Start</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Kostenlose
                  <span className="block">
                    <TitleGradient sceneId="s3">Website-Analyse</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Ich schaue mir deinen aktuellen Auftritt an und sage dir in 15 Minuten konkret, was fehlt – und was ich ändern würde. Kein Pitch. Kein
                  Commitment.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <p className="mt-4 text-sm text-white/55 max-w-xl">
                  Normalerweise ist das ein kostenpflichtiger Schritt (Strategie/Review). Für neue Anfragen ist es mein Einstieg – damit du Klarheit bekommst,
                  bevor du entscheidest.
                </p>
              </Reveal>

              <Reveal delayMs={320}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <a
                    href={WHATSAPP_ANALYSE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} /> Analyse anfragen
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={MAIL_HREF}
                    className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
                  >
                    <Mail size={18} /> Per Mail
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
              <TiltCard className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8">
                  <div className="text-xs uppercase tracking-wide text-white/55">Was ich mir anschaue</div>
                  <div className="mt-4 space-y-3">
                    {[
                      'Klarheit der Botschaft (in 10 Sekunden erfassbar?)',
                      'Struktur: Problem → Lösung → Proof → CTA',
                      'Mobile-Führung & Lade-/UX-Hygiene',
                      'Wie „vertrauenswürdig“ wirkt es visuell?',
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                        <span className="text-sm md:text-base text-white/80">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </Scene>

        {/* 04 — PACKAGES (Anchor first, Default middle, Contrast line) */}
        <Scene id="s4">
          <div>
            <Reveal>
              <div className="text-xs uppercase tracking-wide text-white/55">Pakete</div>
            </Reveal>

            <Reveal delayMs={90}>
              <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                Was du bekommst.
                <span className="block">
                  <TitleGradient sceneId="s4">Ohne Umwege.</TitleGradient>
                </span>
              </h2>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-3xl">
                Vergleichbare Agenturen starten häufig deutlich höher (z.B. ab 3.000 €) – hier hast du kurze Wege und eine klare Verantwortung.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Anchor: Komplett */}
              <Reveal>
                <TiltCard className="rounded-3xl">
                  <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-7 overflow-hidden relative">
                    <div className="pointer-events-none absolute -inset-px opacity-70 blur-2xl bg-[radial-gradient(60%_80%_at_25%_10%,rgba(165,180,252,0.12),transparent_60%),radial-gradient(60%_80%_at_85%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(55%_80%_at_50%_115%,rgba(16,185,129,0.08),transparent_60%)]" />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-wide text-white/55">Komplett</div>
                          <div className="mt-2 text-2xl font-extrabold text-white">ab 1.100 €</div>
                        </div>
                        <Wand2 size={18} className="text-white/55" />
                      </div>

                      <p className="mt-3 text-sm text-white/70 leading-relaxed">
                        Für einen Auftritt, der als System funktioniert (Branding → Content → Anfrageweg).
                      </p>

                      <div className="mt-5 space-y-2">
                        {[
                          'Website bis 5 Seiten',
                          'Vollständiges Brandbook (Farben, Typo, Layoutregeln)',
                          'Ein Motion-Element für Social Media',
                          'Übergabe aller Zugänge und Dateien',
                          'Optional: Betreuung ab 150 €/Monat',
                        ].map((t) => (
                          <div key={t} className="flex items-start gap-2">
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                            <span className="text-sm text-white/80">{t}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 text-xs text-white/55">Lieferzeit: ca. 3 Wochen (abhängig von Umfang & Feedbacktempo)</div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>

              {/* Default: Standard */}
              <Reveal delayMs={70}>
                <TiltCard className="rounded-3xl">
                  <div className="rounded-3xl border-2 border-violet-400/40 bg-violet-500/10 backdrop-blur-md p-6 md:p-7 overflow-hidden relative">
                    <div className="pointer-events-none absolute -inset-px opacity-70 blur-2xl bg-[radial-gradient(60%_80%_at_25%_10%,rgba(124,58,237,0.16),transparent_60%),radial-gradient(60%_80%_at_85%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(55%_80%_at_50%_115%,rgba(165,180,252,0.08),transparent_60%)]" />
                    <div className="relative">
                      <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border border-violet-300/30 bg-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300/80" />
                        Wird am häufigsten gewählt
                      </div>

                      <div className="mt-4 flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-wide text-white/55">Standard</div>
                          <div className="mt-2 text-2xl font-extrabold text-white">ab 700 €</div>
                        </div>
                        <Wand2 size={18} className="text-white/55" />
                      </div>

                      <p className="mt-3 text-sm text-white/70 leading-relaxed">
                        Der solide Kern: klare Struktur, saubere Umsetzung, starker CTA.
                      </p>

                      <div className="mt-5 space-y-2">
                        {[
                          'Website bis 5 Seiten',
                          'Branding-Grundlage (Farben, Schrift, Logo-Einbindung)',
                          'Kontaktformular, mobil optimiert',
                          'Übergabe aller Zugänge',
                          'Optional: Betreuung ab 150 €/Monat',
                        ].map((t) => (
                          <div key={t} className="flex items-start gap-2">
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                            <span className="text-sm text-white/80">{t}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 text-xs text-white/55">Lieferzeit: 10–14 Tage (bei zügigem Feedback)</div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>

              {/* Einstieg */}
              <Reveal delayMs={140}>
                <TiltCard className="rounded-3xl">
                  <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-7 overflow-hidden relative">
                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-wide text-white/55">Einstieg</div>
                          <div className="mt-2 text-2xl font-extrabold text-white">ab 400 €</div>
                        </div>
                        <Wand2 size={18} className="text-white/55" />
                      </div>

                      <p className="mt-3 text-sm text-white/70 leading-relaxed">
                        Wenn es schnell und fokussiert sein soll: eine Landingpage, ein Ziel.
                      </p>

                      <div className="mt-5 space-y-2">
                        {['Eine Landingpage', 'Klare Struktur, ein CTA', 'Mobil optimiert', 'Übergabe aller Zugänge', 'Optional: Betreuung ab 150 €/Monat'].map(
                          (t) => (
                            <div key={t} className="flex items-start gap-2">
                              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                              <span className="text-sm text-white/80">{t}</span>
                            </div>
                          )
                        )}
                      </div>

                      <div className="mt-6 text-xs text-white/55">Lieferzeit: ca. 7 Tage (bei klarer Vorlage)</div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>

            <Reveal delayMs={220}>
              <div className="mt-6 rounded-3xl border border-white/12 bg-black/20 backdrop-blur-md p-5 md:p-6 text-sm text-white/70 leading-relaxed">
                Alle Preise sind Ausgangspunkte. Nach der kostenlosen Analyse bekommst du ein klares Angebot mit Scope – damit es keine Überraschungen gibt.
              </div>
            </Reveal>

            <Reveal delayMs={280}>
              <div className="mt-3 text-sm text-white/55 italic">
                Viele Projekte starten als Einstieg oder Standard – und werden später erweitert, wenn die Basis steht.
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* 05 — PAYMENT CALCULATOR */}
        <Scene id="s5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">Zahlungslogik</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Wann zahlst du was?
                  <span className="block">
                    <TitleGradient sceneId="s5">Ohne Risiko-Feeling.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Du zahlst die zweite Rate erst, wenn du die erste Version gesehen und freigegeben hast. Das hält beide Seiten ehrlich.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    { key: 'einstieg', label: 'Einstieg (400 €)', scene: 'from-amber-200 via-pink-200 to-violet-200' },
                    { key: 'standard', label: 'Standard (700 €)', scene: 'from-violet-200 via-indigo-200 to-cyan-200' },
                    { key: 'komplett', label: 'Komplett (1.100 €)', scene: 'from-emerald-200 via-cyan-200 to-indigo-200' },
                  ].map((b) => (
                    <button
                      key={b.key}
                      type="button"
                      onClick={() => applyPreset(b.key)}
                      className={cx(
                        'px-4 py-2.5 rounded-full text-sm font-semibold border transition-colors backdrop-blur-xl',
                        selectedPreset === b.key ? 'border-white/25 bg-white/[0.10]' : 'border-white/12 bg-white/[0.06] hover:bg-white/[0.10]'
                      )}
                    >
                      <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', b.scene)}>{b.label}</span>
                    </button>
                  ))}
                </div>
              </Reveal>

              <Reveal delayMs={320}>
                <div className="mt-5 rounded-3xl border border-white/12 bg-black/20 backdrop-blur-md p-5 md:p-6">
                  <div className="text-sm font-semibold text-white/85">Projektpreis</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="px-4 py-3 rounded-2xl border border-white/12 bg-white/5 flex-1">
                      <input
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        inputMode="numeric"
                        placeholder="z.B. 700"
                        className="w-full bg-transparent outline-none text-white font-semibold"
                        aria-label="Projektpreis in Euro"
                      />
                    </div>
                    <div className="text-white/70 font-semibold">€</div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { n: '1', title: 'Projektstart (40 %)', amount: payments.p1, sub: 'Fällig nach Auftragsbestätigung' },
                      { n: '2', title: 'Erste Version (40 %)', amount: payments.p2, sub: 'Fällig nachdem du die erste Version gesehen und freigegeben hast' },
                      { n: '3', title: 'Go-Live (20 %)', amount: payments.p3, sub: 'Fällig nach Übergabe' },
                    ].map((r) => (
                      <div key={r.n} className="rounded-2xl border border-white/12 bg-white/5 p-4 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-extrabold">{r.n}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="text-sm font-semibold text-white/90">{r.title}</div>
                            <div className="text-sm font-extrabold text-white/90 whitespace-nowrap">{formatEUR(r.amount)}</div>
                          </div>
                          <div className="mt-1 text-xs text-white/60 leading-relaxed">{r.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70 leading-relaxed">
                    Diese Aufteilung schützt beide Seiten: Du zahlst nur weiter, wenn der Stand stimmt. Ich arbeite mit klarem Auftrag weiter.
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
              <TiltCard className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md p-6 md:p-8">
                  <div className="text-xs uppercase tracking-wide text-white/55">Framing</div>
                  <div className="mt-3 text-xl md:text-3xl font-extrabold text-white/90">Du siehst die erste Version, bevor du weiterzahlst.</div>
                  <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                    Nicht „3 Zahlungen“, sondern: Du gibst den nächsten Schritt erst frei, wenn du den Stand kennst. Das reduziert Risiko-Gefühl und hält den
                    Prozess sauber.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </Scene>

        {/* 06 — PROCESS (Effort Justification + Agile milestones) */}
        <Scene id="s6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">Prozess</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Sichtbare Arbeit.
                  <span className="block">
                    <TitleGradient sceneId="s6">Klare Meilensteine.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed">
                  Agil heißt hier: kurze Sprints, klare Review-Punkte und Freigaben. Du bist eingebunden, nicht überrascht.
                </p>
              </Reveal>

              <Reveal delayMs={260}>
                <div className="mt-8">
                  <PrimaryCTA label="Analyse anfragen" href="/prozess#request" />
                </div>
              </Reveal>
            </div>

            <div className="space-y-4">
              <Phase
                sceneId="s6"
                n="1"
                title="Briefing"
                milestone="Scope definiert"
                desc={`Du schickst mir Ziel, Stand und Deadline.\nIch antworte innerhalb von 24 Stunden mit einer ersten Einschätzung und konkreten Rückfragen.`}
              />
              <Phase
                sceneId="s6"
                n="2"
                title="Konzept & Struktur"
                milestone="Struktur freigegeben"
                desc={`Ich lege Seitenaufbau, Inhalte und Branding-Grundlage fest.\nDu bekommst das zur Freigabe – erst danach fange ich an zu bauen.`}
              />
              <Phase
                sceneId="s6"
                n="3"
                title="Erste Version & Feedback"
                milestone="Review abgeschlossen"
                desc={`Du bekommst eine lauffähige Version zum Testen.\nEine vollständige Feedback-Runde ist eingebaut – keine Extra-Kosten.\nNach Freigabe wird die zweite Rate fällig.`}
              />
              <Phase
                sceneId="s6"
                n="4"
                title="Finalisierung"
                milestone="Freigabe erteilt"
                desc={`Letzte Anpassungen, Feinschliff, technische Stabilisierung.\nWas vereinbart war, wird geliefert – kein Scope-Creep.`}
              />
              <Phase
                sceneId="s6"
                n="5"
                title="Übergabe"
                milestone="Go-Live"
                desc={`Du bekommst alle Dateien, Zugänge und ein kurzes Setup-Briefing.\nOptional: Betreuung ab hier, wenn du Updates ohne Reibung willst.`}
              />
            </div>
          </div>
        </Scene>

        {/* 07 — OBJECTIONS */}
        <Scene id="s7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">Risikoreduktion</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Was wenn…?
                  <span className="block">
                    <TitleGradient sceneId="s7">Dann ist es schon eingeplant.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Drei typische Unsicherheiten – und wie der Ablauf sie abfedert.
                </p>
              </Reveal>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Was wenn mir das Ergebnis nicht gefällt?',
                  a: 'Du siehst die erste Version, bevor die zweite Rate fällig wird. Feedback ist eingebaut – nicht „extra“.',
                },
                {
                  q: 'Was wenn ich später Änderungen brauche?',
                  a: 'Dafür gibt es Betreuung ab 150 €/Monat – oder wir lösen es als separates Mini-Projekt. In jedem Fall mit klarem Rahmen.',
                },
                {
                  q: 'Was wenn mein Budget nicht reicht?',
                  a: 'Nach der Analyse machen wir ein passgenaues Angebot. Häufig reicht ein Einstieg, der später erweitert wird.',
                },
              ].map((x, i) => (
                <Reveal key={x.q} delayMs={i * 70}>
                  <TiltCard className="rounded-3xl">
                    <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-7">
                      <div className="text-base md:text-lg font-extrabold text-white/90">{x.q}</div>
                      <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">{x.a}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Scene>

        {/* 08 — RETAINER */}
        <Scene id="s8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">Nach dem Projekt</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Saubere Übergabe.
                  <span className="block">
                    <TitleGradient sceneId="s8">Oder Betreuung.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Wenn du möchtest, betreue ich deine Website weiter – für Anpassungen, neue Seiten oder kleine Updates. Monatlich kündbar, kein Abo-Stress.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Reveal>
                <TiltCard className="rounded-3xl">
                  <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-7">
                    <div className="text-base md:text-lg font-extrabold text-white/90">Einmaliges Projekt</div>
                    <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                      Einmalige Umsetzung. Fixer Preis. Klare Übergabe. Kein Folgevertrag.
                    </p>
                  </div>
                </TiltCard>
              </Reveal>

              <Reveal delayMs={90}>
                <TiltCard className="rounded-3xl">
                  <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-7">
                    <div className="text-base md:text-lg font-extrabold text-white/90">Mit Betreuung</div>
                    <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                      Projekt + monatliche Pflege ab 150 €/Monat. Updates, Anpassungen, Ansprechpartner. Monatlich kündbar.
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </Scene>

        {/* 09 — CTA */}
        <Scene id="request">
          <div className="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div>
                <Reveal>
                  <div className="text-xs uppercase tracking-wide text-white/55">Anfrage</div>
                </Reveal>

                <Reveal delayMs={90}>
                  <h3 className="mt-2 text-2xl md:text-5xl font-extrabold leading-tight">Start mit der Analyse oder sag mir kurz dein Paket</h3>
                </Reveal>

                <Reveal delayMs={160}>
                  <p className="mt-4 text-white/80 leading-relaxed max-w-2xl">
                    Ziel, Deadline, Stand. Danach sage ich dir, ob es passt – und was der sinnvollste nächste Schritt ist.
                  </p>
                </Reveal>

                <Reveal delayMs={240}>
                  <div className="mt-6 space-y-3">
                    {['Ziel (was soll passieren?)', 'Deadline (bis wann?)', 'Stand (Material, Beispiele, bestehende Assets?)'].map((t) => (
                      <div key={t} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                        <span className="text-sm md:text-base text-white/80">{t}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delayMs={340}>
                  <div className="mt-8 flex flex-wrap gap-2">
                    <Magnetic>
                      <a
                        href={WHATSAPP_ANALYSE_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center gap-2"
                      >
                        <MessageCircle size={18} /> Kostenlose Analyse anfragen
                      </a>
                    </Magnetic>

                    <Magnetic strength={10}>
                      <a
                        href={MAIL_HREF}
                        className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
                      >
                        <Mail size={18} /> Per Mail schreiben
                      </a>
                    </Magnetic>

                    <GhostCTA href="/portfolio">
                      <ExternalLink size={18} /> Erst Portfolio
                    </GhostCTA>
                  </div>
                </Reveal>
              </div>

              <Reveal delayMs={200}>
                <TiltCard className="rounded-3xl">
                  <div className="rounded-3xl border border-white/15 bg-black/25 p-6">
                    <div className="text-sm md:text-base font-semibold text-white/90">Copy/Paste</div>
                    <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/85 whitespace-pre-wrap leading-relaxed">
{`Ziel:
Deadline:
Stand:
Budgetrahmen (optional):
Link/Beispiele (optional):`}
                    </div>
                    <div className="mt-4 text-sm text-white/60">Das reicht komplett für eine erste Einschätzung.</div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </Scene>
      </main>

      <Footer />

      {/* Reference modal (optional) */}
      <Modal open={openRefModal} onClose={() => setOpenRefModal(false)} title="Referenz — Screenshot / Preview Slot">
        <div className="grid grid-cols-1 gap-3">
          <div className="text-sm text-white/70">
            Platzhalter: Hier könntest du später ein echtes Bild oder einen Embed zeigen. Für jetzt ist es nur ein Slot – damit der Halo-Block visuell stark bleibt.
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={LIVE_PREVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-white/12 bg-white/[0.06] hover:bg-white/[0.10] transition-colors"
            >
              <ExternalLink size={16} className="text-white/80" />
              leonseitz.com öffnen
            </a>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl border border-white/12 bg-black/20">
            <div className="aspect-[16/10] md:aspect-[16/9] flex items-center justify-center">
              <div className="px-4 py-2 rounded-full border border-white/15 bg-black/30 text-xs text-white/70">
                Screenshot / Embed Platzhalter
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ---------- KEYFRAMES ---------- */

const globalKeyframes = `
@keyframes blob {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  35% { transform: translate3d(40px, -30px, 0) scale(1.08); }
  70% { transform: translate3d(-30px, 20px, 0) scale(0.96); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes blob2 {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  40% { transform: translate3d(-45px, 35px, 0) scale(1.06); }
  80% { transform: translate3d(25px, -20px, 0) scale(0.96); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes blob3 {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  45% { transform: translate3d(35px, 25px, 0) scale(1.10); }
  85% { transform: translate3d(-30px, -18px, 0) scale(0.94); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes noiseMove {
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
