'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  Sparkles,
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
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ---------- BRAND TOKENS ---------- */

const BRAND = {
  yellow:     '#E8A800',
  ocker:      '#C68F00',
  black:      '#0E0C08',
  cream:      '#F5F2EB',
  dark:       '#2A2720',
};

/* ---------- CONFIG ---------- */

const SECTIONS = [
  { id: 's1', label: 'Start' },
  { id: 's2', label: 'Problem' },
  { id: 's3', label: 'Kostenloses Angebot' },
  { id: 's4', label: 'Proof' },
  { id: 's5', label: 'Leistungen' },
  { id: 'request', label: 'Ablauf & Anfrage' },
];

// All scenes share a warm-black base; yellow glow shifts position per section.
const SCENES = {
  s1: {
    base: '#0E0C08',
    g1: `radial-gradient(1000px 700px at 15% 18%, rgba(232,168,0,0.20), transparent 60%),
         radial-gradient(800px 600px at 85% 30%, rgba(198,143,0,0.07), transparent 55%)`,
    g2: `linear-gradient(135deg, #0E0C08 0%, #130F07 50%, #0A0806 100%)`,
    blobs: [
      { cls: 'bg-amber-500/14', x: '-15%', y: '-15%', s: '52rem', blur: 150 },
      { cls: 'bg-yellow-500/7',  x: '68%',  y: '15%',  s: '48rem', blur: 160 },
      { cls: 'bg-amber-600/5',   x: '25%',  y: '75%',  s: '42rem', blur: 160 },
    ],
    accent: 'from-amber-300 via-yellow-200 to-amber-100',
  },
  s2: {
    base: '#0A0807',
    g1: `radial-gradient(1000px 700px at 20% 15%, rgba(180,120,0,0.08), transparent 60%),
         radial-gradient(800px 600px at 85% 20%, rgba(232,168,0,0.05), transparent 55%)`,
    g2: `linear-gradient(135deg, #0A0807 0%, #0F0C08 55%, #080607 100%)`,
    blobs: [
      { cls: 'bg-amber-800/10', x: '-10%', y: '-10%', s: '54rem', blur: 160 },
      { cls: 'bg-amber-500/5',  x: '70%',  y: '5%',   s: '50rem', blur: 160 },
      { cls: 'bg-yellow-700/4', x: '20%',  y: '78%',  s: '44rem', blur: 165 },
    ],
    accent: 'from-amber-400 via-yellow-300 to-amber-200',
  },
  s3: {
    base: '#0F0D07',
    g1: `radial-gradient(1000px 700px at 20% 20%, rgba(232,168,0,0.18), transparent 60%),
         radial-gradient(700px 500px at 85% 15%, rgba(198,143,0,0.10), transparent 55%)`,
    g2: `linear-gradient(135deg, #0F0D07 0%, #150F06 55%, #0C0A06 100%)`,
    blobs: [
      { cls: 'bg-amber-500/12', x: '-10%', y: '-10%', s: '54rem', blur: 150 },
      { cls: 'bg-yellow-500/8', x: '70%',  y: '5%',   s: '50rem', blur: 150 },
      { cls: 'bg-amber-600/6', x: '15%',   y: '78%',  s: '44rem', blur: 160 },
    ],
    accent: 'from-yellow-200 via-amber-200 to-yellow-100',
  },
  s4: {
    base: '#0C0A08',
    g1: `radial-gradient(1100px 700px at 18% 10%, rgba(232,168,0,0.11), transparent 60%),
         radial-gradient(800px 600px at 82% 20%, rgba(198,143,0,0.12), transparent 55%)`,
    g2: `linear-gradient(135deg, #0C0A08 0%, #100D08 55%, #090706 100%)`,
    blobs: [
      { cls: 'bg-amber-600/10', x: '-12%', y: '-16%', s: '52rem', blur: 170 },
      { cls: 'bg-yellow-500/7', x: '72%',  y: '8%',   s: '54rem', blur: 160 },
      { cls: 'bg-amber-700/7',  x: '20%',  y: '80%',  s: '46rem', blur: 170 },
    ],
    accent: 'from-amber-300 via-yellow-200 to-amber-200',
  },
  s5: {
    base: '#110D06',
    g1: `radial-gradient(1100px 700px at 20% 10%, rgba(232,168,0,0.22), transparent 60%),
         radial-gradient(900px 700px at 82% 30%, rgba(198,143,0,0.14), transparent 55%)`,
    g2: `linear-gradient(135deg, #110D06 0%, #170F05 55%, #0E0A05 100%)`,
    blobs: [
      { cls: 'bg-amber-500/14', x: '-18%', y: '-12%', s: '54rem', blur: 155 },
      { cls: 'bg-yellow-500/9', x: '66%',  y: '12%',  s: '54rem', blur: 150 },
      { cls: 'bg-amber-600/7',  x: '12%',  y: '78%',  s: '46rem', blur: 165 },
    ],
    accent: 'from-yellow-200 via-amber-300 to-yellow-100',
  },
  request: {
    base: '#0A0806',
    g1: `radial-gradient(1100px 650px at 15% 0%, rgba(232,168,0,0.14), transparent 60%),
         radial-gradient(800px 600px at 88% 15%, rgba(198,143,0,0.08), transparent 55%)`,
    g2: `linear-gradient(135deg, #0A0806 0%, #0F0C07 55%, #080606 100%)`,
    blobs: [
      { cls: 'bg-amber-600/10', x: '-12%', y: '-18%', s: '54rem', blur: 170 },
      { cls: 'bg-yellow-500/7', x: '74%',  y: '8%',   s: '54rem', blur: 170 },
      { cls: 'bg-amber-500/7',  x: '20%',  y: '80%',  s: '48rem', blur: 170 },
    ],
    accent: 'from-amber-300 via-yellow-200 to-amber-100',
  },
};

/* ---------- UTIL ---------- */

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

function TitleGradient({ sceneId, children }) {
  const scene = SCENES[sceneId] ?? SCENES.s1;
  return (
    <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', scene.accent)}>
      {children}
    </span>
  );
}

function useActiveSection(sectionIds[]) {
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
      (entries) => { if (entries.some((e) => e.isIntersecting)) setShown(true); },
      { threshold: 0.15 }
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
      setP(doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight));
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
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);
  return pos;
}

/* ---------- BACKGROUND ---------- */

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
            style={{ backgroundColor: s.base, backgroundImage: `${s.g1}, ${s.g2}` }}
          />
        );
      })}
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27320%27 viewBox=%270 0 320 320%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27320%27 height=%27320%27 filter=%27url(%23n)%27 opacity=%270.35%27/%3E%3C/svg%3E")',
          backgroundSize: '220px 220px',
          animation: 'noiseMove 7s linear infinite',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,transparent_0%,rgba(0,0,0,0.38)_65%,rgba(0,0,0,0.72)_100%)]" />
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
              'absolute inset-0 transition-[opacity] duration-[1200ms] ease-out',
              on ? 'opacity-100' : 'opacity-0'
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
                style={{ left: b.x, top: b.y, width: b.s, height: b.s, filter: `blur(${b.blur}px)` }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- UI CHROME ---------- */

// Tagesstreifen: always-visible amber strip at top + scroll progress overlay
function ScrollProgressBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div className="h-[3px] bg-[#E8A800]/20">
        <div
          className="h-full bg-[#E8A800]"
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
          background: `radial-gradient(700px 500px at ${x}px ${y}px, rgba(232,168,0,0.04), transparent 70%)`,
          filter: 'blur(18px)',
          opacity: 0.7,
          mixBlendMode: 'screen',
          transition: 'background 80ms linear',
        }}
      />
    </div>
  );
}

function Magnetic({ children, strength = 14 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate3d(${((e.clientX - r.left - r.width / 2) / r.width) * strength}px,${
        ((e.clientY - r.top - r.height / 2) / r.height) * strength
      }px,0)`;
    };
    const onLeave = () => { el.style.transform = 'translate3d(0,0,0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength]);
  return (
    <span ref={ref} className="inline-flex transition-transform duration-200 ease-out will-change-transform">
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
      el.style.setProperty('--rx', `${(0.5 - py) * 9}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * 11}deg`);
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
      style={{
        transform: 'perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))',
        transition: 'transform 180ms ease-out',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 md:opacity-100"
        style={{
          background:
            'radial-gradient(480px 340px at var(--hx,50%) var(--hy,30%),rgba(232,168,0,0.07),transparent 62%)',
          mixBlendMode: 'screen',
        }}
      />
      {children}
    </div>
  );
}

/* ---------- LAYOUT ---------- */

function Scene({ id, children }) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center px-5 md:px-16 py-16 md:snap-start scroll-mt-24"
    >
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

// Primary CTA: solid yellow, black text — brand signal
function PrimaryCTA({
  label = 'Kostenlose Analyse anfragen',
  href = '/#request',
}) {
  return (
    <Magnetic>
      <Link
        href={href}
        className="group px-7 py-3.5 rounded-full bg-[#E8A800] text-[#0E0C08] hover:bg-[#C68F00] transition-colors font-bold inline-flex items-center justify-center gap-2"
      >
        {label}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </Magnetic>
  );
}

// Ghost CTA: amber border, subtle fill
function GhostCTA({
  href,
  children,
  external = false,
}) {
  const cls =
    'px-6 py-3 rounded-full bg-[#E8A800]/6 border border-[#E8A800]/25 hover:border-[#E8A800]/50 hover:bg-[#E8A800]/12 transition-colors font-semibold inline-flex items-center gap-2 text-[#F5F2EB]';
  if (external)
    return (
      <Magnetic strength={10}>
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      </Magnetic>
    );
  return (
    <Magnetic strength={10}>
      <Link href={href} className={cls}>
        {children}
      </Link>
    </Magnetic>
  );
}

/* ---------- ANIMATED NUMBER ---------- */

function useCountUp({ target, durationMs = 900 }) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);
  const start = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const tick = (t) => {
      const eased = 1 - Math.pow(1 - Math.min(1, (t - t0) / durationMs), 3);
      setValue(Math.round(target * eased));
      if (eased < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [target, durationMs]);
  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);
  return { value, start };
}

function ProofStat({
  sceneId,
  label,
  target,
  suffix = '',
  durationMs = 900,
}) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  const { value, start } = useCountUp({ target, durationMs });
  useEffect(() => { if (shown) start(); }, [shown, start]);
  const scene = SCENES[sceneId] ?? SCENES.s1;
  return (
    <TiltCard className="rounded-3xl">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-3xl border border-[#E8A800]/15 bg-[#2A2720]/40 backdrop-blur-md p-6 md:p-8"
      >
        <div
          className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-[#E8A800]/8 opacity-[0.6]"
          style={{ filter: 'blur(46px)', animation: 'shineSoft 5.6s cubic-bezier(.2,.9,.2,1) infinite' }}
        />
        <div className="text-xs uppercase tracking-wide text-[#F5F2EB]/50">Proof</div>
        <div className="mt-3 flex items-end gap-2 flex-wrap">
          <span className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
            <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', scene.accent)}>{value}</span>
          </span>
          {suffix && (
            <span
              className={cx(
                'text-[#F5F2EB]/70 text-xl md:text-2xl font-semibold leading-none pb-[2px] bg-clip-text text-transparent bg-gradient-to-r',
                scene.accent
              )}
            >
              {suffix}
            </span>
          )}
        </div>
        <div className="mt-2 text-sm md:text-base text-[#F5F2EB]/75">{label}</div>
      </div>
    </TiltCard>
  );
}

function BigService({
  sceneId,
  icon,
  kicker,
  title,
  desc,
  subline,
}) {
  return (
    <Reveal>
      <TiltCard className="rounded-3xl">
        <div className="rounded-3xl border border-[#E8A800]/12 bg-[#2A2720]/25 backdrop-blur-md p-6 md:p-8 overflow-hidden relative">
          <div
            className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-[#E8A800]/6 opacity-[0.5]"
            style={{ filter: 'blur(50px)', animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite' }}
          />
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-[#F5F2EB]/55">
              <span className="w-9 h-9 rounded-xl bg-[#E8A800]/12 border border-[#E8A800]/20 flex items-center justify-center text-[#E8A800]">
                {icon}
              </span>
              {kicker}
            </div>
            <Wand2 size={18} className="text-[#E8A800]/40" />
          </div>
          <div className="mt-4 text-2xl md:text-4xl font-extrabold leading-tight text-[#F5F2EB]">
            {title}
            <span className="block text-base md:text-lg mt-2">
              <TitleGradient sceneId={sceneId}>{subline}</TitleGradient>
            </span>
          </div>
          <p className="mt-4 text-sm md:text-base text-[#F5F2EB]/65 leading-relaxed max-w-2xl">{desc}</p>
          <div className="mt-6">
            <Link
              href="/#request"
              className="inline-flex items-center gap-2 text-[#E8A800]/80 hover:text-[#E8A800] transition-colors font-semibold"
            >
              Anfrage schicken <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/* ---------- PAGE ---------- */

export default function Home() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const { activeId } = useActiveSection(sectionIds);

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
    <div className="font-proxima text-[#F5F2EB]">
      <style>{globalKeyframes}</style>
      <GlobalBackground activeId={activeId} />
      <GlobalLightLeaks activeId={activeId} />
      <ScrollProgressBar />
      <CursorHalo />
      <Navbar />

      <main className="md:snap-y md:snap-mandatory">

        {/* ── 01 HERO ── */}
        <Scene id="s1">
          <div className="flex flex-col items-center text-center gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-[#E8A800]/90 bg-[#E8A800]/10 ring-1 ring-[#E8A800]/20 px-3 py-1 rounded-full font-medium">
                <Sparkles size={16} className="text-[#E8A800]" />
                Kostenlose Website-Analyse + erster Entwurf
              </span>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03] text-[#F5F2EB]">
                Mehr Anfragen durch eine Website,
                <span className="block">
                  <TitleGradient sceneId="s1">die klar ist – nicht nur schön.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="max-w-2xl text-base md:text-xl text-[#F5F2EB]/75 leading-relaxed">
                Ich analysiere deine aktuelle Website kostenlos, zeige konkret was nicht funktioniert –
                und liefere einen ersten Entwurf. Ohne Risiko, ohne Commitment.
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="flex flex-col items-center gap-3">
                <PrimaryCTA label="Kostenlose Analyse anfragen" />
                <p className="text-sm text-[#F5F2EB]/45">
                  Sprint 0 ist kostenlos. Keine Zahlung, bevor du das Ergebnis gesehen hast.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={310}>
              <div className="flex flex-wrap justify-center gap-5 text-sm text-[#F5F2EB]/50">
                {[
                  'Analyse kostenlos',
                  'Erster Entwurf kostenlos',
                  'Zahlung erst nach Review',
                  'Antwort innerhalb 24 h',
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#E8A800]" />
                    {t}
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
                <div className="text-xs uppercase tracking-wide text-[#F5F2EB]/45">
                  02 — Das eigentliche Problem
                </div>
              </Reveal>
              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05] text-[#F5F2EB]">
                  Viele Websites sehen gut aus.
                  <span className="block">
                    <TitleGradient sceneId="s2">Und erzeugen trotzdem keine Anfragen.</TitleGradient>
                  </span>
                </h2>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 text-[#F5F2EB]/70 text-base md:text-lg leading-relaxed max-w-xl">
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
                  {
                    title: 'Kein klarer Auftrag an den Besucher',
                    desc: 'Der CTA fehlt oder ist versteckt. Der Besucher weiß nicht, was als nächstes passieren soll.',
                  },
                  {
                    title: 'Kein konsistentes Erscheinungsbild',
                    desc: 'Website, Social Media und Print wirken wie von drei verschiedenen Personen. Das kostet Vertrauen.',
                  },
                  {
                    title: 'Botschaft unklar oder zu allgemein',
                    desc: 'Wer auf die Website kommt, versteht in fünf Sekunden nicht, warum er bleiben sollte.',
                  },
                ].map((item) => (
                  <TiltCard key={item.title} className="rounded-2xl">
                    <div className="rounded-2xl border border-[#E8A800]/10 bg-[#2A2720]/30 p-4 md:p-5 flex items-start gap-3">
                      <AlertCircle size={16} className="text-[#E8A800]/60 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-[#F5F2EB]/90">{item.title}</div>
                        <p className="mt-1 text-sm text-[#F5F2EB]/55 leading-relaxed">{item.desc}</p>
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
                <div className="text-xs uppercase tracking-wide text-[#F5F2EB]/45">03 — Das Angebot</div>
              </Reveal>
              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05] text-[#F5F2EB]">
                  Du siehst den Entwurf.
                  <span className="block">
                    <TitleGradient sceneId="s3">Erst dann entscheidest du.</TitleGradient>
                  </span>
                </h2>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 text-[#F5F2EB]/70 text-base md:text-xl leading-relaxed max-w-2xl">
                  Sprint 0 ist kostenlos: Ich analysiere deine Situation, benenne konkrete Schwachstellen
                  und liefere einen ersten Seitenaufbau als Entwurf. Kein Angebot ins Blaue.
                </p>
              </Reveal>
            </div>

            <Reveal delayMs={200}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Sprint 0 card */}
                <div className="rounded-2xl border border-[#E8A800]/30 bg-[#E8A800]/6 p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8A800]/15 border border-[#E8A800]/25 flex items-center justify-center">
                    <Eye size={17} className="text-[#E8A800]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#F5F2EB]/90">Was du in Sprint 0 bekommst</div>
                    <ul className="mt-2 space-y-1.5 text-sm text-[#F5F2EB]/60">
                      {[
                        '3–5 konkrete Optimierungspunkte schriftlich',
                        'Erster Seitenaufbau als Entwurf',
                        'Einschätzung, welches Paket passt',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#E8A800]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs border border-[#E8A800]/30 bg-[#E8A800]/10 text-[#E8A800] font-semibold">
                      Kostenlos · Kein Commitment
                    </span>
                  </div>
                </div>

                {/* Zahlung card */}
                <div className="rounded-2xl border border-[#F5F2EB]/10 bg-[#F5F2EB]/4 p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F2EB]/8 border border-[#F5F2EB]/12 flex items-center justify-center">
                    <Shield size={17} className="text-[#F5F2EB]/65" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#F5F2EB]/90">Zahlung nach Review – nicht vorher</div>
                    <p className="mt-2 text-sm text-[#F5F2EB]/55 leading-relaxed">
                      Jedes Zahlungsziel ist an einen Sprint-Review gebunden. Du siehst das Ergebnis,
                      gibst Feedback, gibst frei. Erst dann kommt die nächste Phase.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Link
                      href="/prozess"
                      className="text-xs text-[#E8A800]/60 hover:text-[#E8A800] transition-colors inline-flex items-center gap-1 underline underline-offset-4"
                    >
                      Vollständigen Ablauf ansehen <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>

                {/* Transparenz card */}
                <div className="rounded-2xl border border-[#F5F2EB]/10 bg-[#F5F2EB]/4 p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F2EB]/8 border border-[#F5F2EB]/12 flex items-center justify-center">
                    <FileText size={17} className="text-[#F5F2EB]/65" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#F5F2EB]/90">Transparenz im Prozess</div>
                    <p className="mt-2 text-sm text-[#F5F2EB]/55 leading-relaxed">
                      Du siehst den Projektstand jederzeit. Wie das konkret aussieht: ein vollständig
                      dokumentierter Projektablauf von Anfang bis Übergabe.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="https://www.leonseitz.com/kunde1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#E8A800]/60 hover:text-[#E8A800] transition-colors inline-flex items-center gap-1 underline underline-offset-4"
                    >
                      Echtes Projekt ansehen <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Sprint mini-timeline */}
            <Reveal delayMs={260}>
              <div className="rounded-2xl border border-[#F5F2EB]/8 bg-[#0E0C08]/60 backdrop-blur-md p-5 md:p-6">
                <div className="text-xs uppercase tracking-wide text-[#F5F2EB]/35 mb-4">
                  So läuft ein Projekt ab
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Sprint 0', title: 'Analyse + Entwurf', note: 'Kostenlos', em: true },
                    { label: 'Sprint 1', title: 'Erste Version',      note: '30 % nach Review', em: false },
                    { label: 'Sprint 2', title: 'Feinschliff',        note: '50 % nach Review', em: false },
                    { label: 'Sprint 3', title: 'Go-Live + Übergabe', note: '20 % nach Übergabe', em: false },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={cx(
                        'rounded-xl border px-3 py-3',
                        s.em
                          ? 'border-[#E8A800]/30 bg-[#E8A800]/8'
                          : 'border-[#F5F2EB]/8 bg-[#F5F2EB]/3'
                      )}
                    >
                      <div
                        className={cx(
                          'text-xs font-semibold uppercase tracking-wide mb-1',
                          s.em ? 'text-[#E8A800]/80' : 'text-[#F5F2EB]/35'
                        )}
                      >
                        {s.label}
                      </div>
                      <div className="text-sm text-[#F5F2EB]/85 font-semibold leading-tight">{s.title}</div>
                      <div
                        className={cx(
                          'mt-1.5 text-xs',
                          s.em ? 'text-[#E8A800]/70 font-medium' : 'text-[#F5F2EB]/35'
                        )}
                      >
                        {s.note}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/prozess"
                    className="text-sm text-[#F5F2EB]/55 hover:text-[#E8A800] transition-colors inline-flex items-center gap-1.5 font-medium"
                  >
                    Ablauf im Detail <ArrowRight size={13} />
                  </Link>
                  <a
                    href="https://www.leonseitz.com/kunde1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#F5F2EB]/55 hover:text-[#E8A800] transition-colors inline-flex items-center gap-1.5 font-medium"
                  >
                    Echtes Projekt ansehen <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={320}>
              <div className="flex flex-wrap gap-3">
                <PrimaryCTA label="Kostenlose Analyse anfragen" />
                <GhostCTA href="/portfolio">
                  <ExternalLink size={18} /> Portfolio ansehen
                </GhostCTA>
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* ── 04 PROOF ── */}
        <Scene id="s4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-[#F5F2EB]/45">04 — Proof</div>
              </Reveal>
              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05] text-[#F5F2EB]">
                  Zahlen,
                  <span className="block">
                    <TitleGradient sceneId="s4">die man einordnen kann.</TitleGradient>
                  </span>
                </h2>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 text-[#F5F2EB]/70 text-base md:text-xl leading-relaxed max-w-xl">
                  Wenn Branding, Content und Funnel aufeinander einzahlen, zeigt sich das in den
                  Ergebnissen – nicht nur im Look.
                </p>
              </Reveal>
              <Reveal delayMs={260}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <GhostCTA href="/portfolio">
                    <ExternalLink size={18} /> Portfolio ansehen
                  </GhostCTA>
                  <GhostCTA href="https://www.leonseitz.com/kunde1" external>
                    <ExternalLink size={18} /> Echtes Projekt
                  </GhostCTA>
                </div>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <ProofStat sceneId="s4" label="Likes auf erstellten Inhalten"     target={15}  suffix="+ Mio" durationMs={900} />
              <ProofStat sceneId="s4" label="Klicks über Social Media generiert" target={10}  suffix="+ Mio" durationMs={900} />
              <ProofStat sceneId="s4" label="Abgeschlossene Projekte"           target={100} suffix="+"     durationMs={950} />
            </div>
          </div>
        </Scene>

        {/* ── 05 LEISTUNGEN ── */}
        <Scene id="s5">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-[#F5F2EB]/45">05 — Leistungen</div>
              </Reveal>
              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05] text-[#F5F2EB]">
                  Vier Bereiche.
                  <span className="block">
                    <TitleGradient sceneId="s5">Einer greift in den nächsten.</TitleGradient>
                  </span>
                </h2>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 text-[#F5F2EB]/70 text-base md:text-xl leading-relaxed">
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
              <BigService
                sceneId="s5"
                icon={<BookOpen size={18} />}
                kicker="Brandbook"
                title="Guidelines, die man wirklich nutzt."
                subline="Basis für alles Weitere."
                desc="Farben, Typo, Layoutregeln, Tone of Voice, Beispiele. Damit du und dein Team konsistent kommunizieren – ohne jedes Mal neu entscheiden zu müssen."
              />
              <BigService
                sceneId="s5"
                icon={<Play size={18} />}
                kicker="Motiondesign"
                title="Motion, der im Feed auffällt."
                subline="Wiederverwendbar, nicht einmalig."
                desc="Kurzformate, Motion Graphics, Hook-Varianten, Templates. Damit du skalieren kannst, ohne jedes Format neu zu entwickeln."
              />
              <BigService
                sceneId="s5"
                icon={<Monitor size={18} />}
                kicker="Webdevelopment"
                title="Websites mit einer Richtung."
                subline="Kein Design um des Designs willen."
                desc="Klarer Aufbau, klare CTA, wenig Ablenkung. Damit ein Besucher weiß, was als nächstes passieren soll."
              />
              <BigService
                sceneId="s5"
                icon={<Film size={18} />}
                kicker="Videoediting"
                title="Schnitt mit Rhythmus."
                subline="Funktion vor Ästhetik."
                desc="Storyline, Timing, Sound, Pace. Damit ein Video nicht nur fertig ist, sondern die Botschaft trägt."
              />
            </div>
          </div>
        </Scene>

        {/* ── 06 ABLAUF + CTA ── */}
        <Scene id="request">
          <div className="flex flex-col gap-16">

            <div className="text-center max-w-2xl mx-auto">
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-[#F5F2EB]/40">06 — Ablauf</div>
              </Reveal>
              <Reveal delayMs={80}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05] text-[#F5F2EB]">
                  Vier Sprints.
                  <span className="block">
                    <TitleGradient sceneId="request">Kein Schritt ohne dein Okay.</TitleGradient>
                  </span>
                </h2>
              </Reveal>
              <Reveal delayMs={150}>
                <p className="mt-4 text-[#F5F2EB]/60 text-base md:text-lg leading-relaxed">
                  Nach jedem Sprint siehst du das Ergebnis. Zahlung erst nach Freigabe – nie vorher.
                </p>
              </Reveal>
            </div>

            {/* Sprint timeline */}
            <Reveal delayMs={100}>
              <div className="relative">
                <div className="hidden md:block absolute top-[28px] left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-gradient-to-r from-[#E8A800]/40 via-[#E8A800]/10 to-[#E8A800]/5" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { n: '0', label: 'Sprint 0', title: 'Analyse + Entwurf',   desc: 'Konkrete Schwachstellen, erster Seitenaufbau, Paketempfehlung.',      note: 'Kostenlos',        em: true  },
                    { n: '1', label: 'Sprint 1', title: 'Erste Version',        desc: 'Du klickst durch, gibst Feedback. 2 Revisionsrunden inklusive.',       note: '30 % nach Review', em: false },
                    { n: '2', label: 'Sprint 2', title: 'Feinschliff',          desc: 'Alle Punkte umgesetzt. SEO-Basis und Performance geprüft.',            note: '50 % nach Freigabe', em: false },
                    { n: '3', label: 'Sprint 3', title: 'Go-Live + Übergabe',   desc: 'Live-Schaltung, alle Dateien, Zugänge, vollständige Dokumentation.',   note: '20 % nach Übergabe', em: false },
                  ].map((s, i) => (
                    <TiltCard key={s.n} className="rounded-2xl">
                      <div
                        className={cx(
                          'rounded-2xl border p-5 h-full flex flex-col gap-4 relative overflow-hidden',
                          s.em
                            ? 'border-[#E8A800]/30 bg-[#E8A800]/6'
                            : 'border-[#F5F2EB]/10 bg-[#F5F2EB]/[0.03]'
                        )}
                      >
                        <div
                          className="pointer-events-none absolute -left-24 -top-8 h-[130%] w-40 rotate-12 opacity-[0.05]"
                          style={{
                            background: '#E8A800',
                            filter: 'blur(36px)',
                            animation: `shineSoft ${5.5 + i * 0.4}s cubic-bezier(.2,.9,.2,1) infinite`,
                          }}
                        />
                        <div className="flex items-center gap-3">
                          <div
                            className={cx(
                              'w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 relative z-10',
                              s.em
                                ? 'bg-[#E8A800] text-[#0E0C08] shadow-[0_0_20px_rgba(232,168,0,0.35)]'
                                : 'bg-[#F5F2EB]/12 text-[#F5F2EB] border border-[#F5F2EB]/18'
                            )}
                          >
                            {s.n}
                          </div>
                          <div
                            className={cx(
                              'text-xs font-semibold uppercase tracking-wide',
                              s.em ? 'text-[#E8A800]/80' : 'text-[#F5F2EB]/30'
                            )}
                          >
                            {s.label}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-[#F5F2EB]/90 leading-snug">{s.title}</div>
                          <p className="mt-1.5 text-xs text-[#F5F2EB]/50 leading-relaxed">{s.desc}</p>
                        </div>
                        <div
                          className={cx(
                            'text-xs font-semibold rounded-lg px-2.5 py-1.5 border self-start',
                            s.em
                              ? 'text-[#E8A800] border-[#E8A800]/30 bg-[#E8A800]/10'
                              : 'text-[#F5F2EB]/40 border-[#F5F2EB]/8 bg-[#F5F2EB]/3'
                          )}
                        >
                          {s.note}
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
                <div className="mt-5 flex justify-center">
                  <Link
                    href="/prozess"
                    className="text-sm text-[#F5F2EB]/40 hover:text-[#E8A800] transition-colors inline-flex items-center gap-1.5"
                  >
                    Vollständiger Ablauf auf /prozess <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Pakete */}
            <Reveal delayMs={80}>
              <div>
                <div className="text-xs uppercase tracking-wide text-[#F5F2EB]/35 text-center mb-5">
                  Pakete
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { name: 'Einstieg', price: 'ab 400 €', time: '~7 Tage',      items: ['1 Landingpage', 'Klare Struktur', '1 CTA-Fokus'],                            featured: false },
                    { name: 'Standard', price: 'ab 700 €', time: '10–14 Tage',   items: ['Website bis 5 Seiten', 'Branding-Grundlage', '2 Revisionsrunden'],            featured: true  },
                    { name: 'Komplett', price: 'ab 1.100 €', time: 'ca. 3 Wochen', items: ['Website + Brandbook', 'Motion-Element', 'Vollständige Übergabe'],           featured: false },
                  ].map((p) => (
                    <TiltCard key={p.name} className="rounded-2xl">
                      <div
                        className={cx(
                          'rounded-2xl border p-5 flex flex-col gap-4 relative overflow-hidden',
                          p.featured
                            ? 'border-[#E8A800]/30 bg-[#E8A800]/5'
                            : 'border-[#F5F2EB]/8 bg-[#F5F2EB]/[0.03]'
                        )}
                      >
                        {p.featured && (
                          <div
                            className="pointer-events-none absolute -left-20 -top-8 h-[130%] w-48 rotate-12 opacity-[0.06]"
                            style={{
                              background: '#E8A800',
                              filter: 'blur(40px)',
                              animation: 'shineSoft 5.8s cubic-bezier(.2,.9,.2,1) infinite',
                            }}
                          />
                        )}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-base font-bold text-[#F5F2EB]/90">{p.name}</div>
                            {p.featured && (
                              <div className="mt-0.5 text-xs text-[#E8A800]/60">Am häufigsten gewählt</div>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-base font-bold text-[#F5F2EB]/85">{p.price}</div>
                            <div className="text-xs text-[#F5F2EB]/35 flex items-center gap-1 justify-end mt-0.5">
                              <Clock size={10} />
                              {p.time}
                            </div>
                          </div>
                        </div>
                        <ul className="space-y-1.5">
                          {p.items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-[#F5F2EB]/60">
                              <CheckCircle2 size={13} className="shrink-0 text-[#E8A800]/50" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-1 text-xs text-[#F5F2EB]/30">
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
              <div className="relative rounded-3xl border border-[#E8A800]/20 bg-[#E8A800]/4 overflow-hidden p-8 md:p-16 text-center">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-[600px] h-[300px] rounded-full bg-[#E8A800]/8"
                    style={{ filter: 'blur(80px)' }}
                  />
                </div>
                {/* Tagesstreifen am oberen Rand der CTA-Box */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#E8A800]" />

                <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6">
                  <div className="text-xs uppercase tracking-widest text-[#E8A800]/55">
                    Kostenloser Einstieg
                  </div>
                  <h3 className="text-2xl md:text-5xl font-extrabold leading-tight text-[#F5F2EB]">
                    Kostenlose Website-Analyse.
                    <br />
                    <TitleGradient sceneId="s3">Kein Risiko. Kein Commitment.</TitleGradient>
                  </h3>
                  <p className="text-[#F5F2EB]/55 text-base leading-relaxed">
                    Schick mir deine URL und was du dir davon erhoffst. Ich melde mich innerhalb von 24 h
                    mit einer ehrlichen Einschätzung.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-[#F5F2EB]/45">
                    {['Sprint 0 kostenlos', '24 h Antwortzeit', 'Zahlung nach Review'].map((t) => (
                      <span key={t} className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-[#E8A800]" />
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Magnetic>
                      <a
                        href="mailto:hello@leonseitz.com?subject=Kostenlose Website-Analyse&body=Meine Website: %0D%0AZiel: %0D%0ADeadline (optional): %0D%0A"
                        className="px-8 py-4 rounded-full bg-[#E8A800] text-[#0E0C08] hover:bg-[#C68F00] transition-colors font-bold inline-flex items-center gap-2 shadow-[0_0_40px_rgba(232,168,0,0.20)]"
                      >
                        <Mail size={18} /> Analyse anfragen
                      </a>
                    </Magnetic>
                    <GhostCTA href="/portfolio">
                      <ExternalLink size={17} /> Portfolio ansehen
                    </GhostCTA>
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

/* ---------- KEYFRAMES ---------- */

const globalKeyframes = `
@keyframes blob {
  0%   { transform: translate3d(0px,0px,0) scale(1); }
  35%  { transform: translate3d(40px,-30px,0) scale(1.08); }
  70%  { transform: translate3d(-30px,20px,0) scale(0.96); }
  100% { transform: translate3d(0px,0px,0) scale(1); }
}
@keyframes blob2 {
  0%   { transform: translate3d(0px,0px,0) scale(1); }
  40%  { transform: translate3d(-45px,35px,0) scale(1.06); }
  80%  { transform: translate3d(25px,-20px,0) scale(0.96); }
  100% { transform: translate3d(0px,0px,0) scale(1); }
}
@keyframes blob3 {
  0%   { transform: translate3d(0px,0px,0) scale(1); }
  45%  { transform: translate3d(35px,25px,0) scale(1.10); }
  85%  { transform: translate3d(-30px,-18px,0) scale(0.94); }
  100% { transform: translate3d(0px,0px,0) scale(1); }
}
@keyframes shineSoft {
  0%   { transform: translateX(-220px) rotate(12deg) scale(1);   opacity:0.00; }
  12%  { opacity:0.08; }
  32%  { transform: translateX(120px) rotate(12deg) scale(1.02); opacity:0.06; }
  46%  { transform: translateX(220px) rotate(12deg) scale(1.01); opacity:0.03; }
  62%  { transform: translateX(220px) rotate(12deg) scale(1.01); opacity:0.01; }
  78%  { transform: translateX(520px) rotate(12deg) scale(1.02); opacity:0.05; }
  100% { transform: translateX(980px) rotate(12deg) scale(1.00); opacity:0.00; }
}
@keyframes noiseMove {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
