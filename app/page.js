'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  Repeat,
  FileText,
  Eye,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ---------- CONFIG ---------- */

const SECTIONS = [
  { id: 's1', label: 'Start' },
  { id: 's2', label: 'Was du bekommst' },
  { id: 's3', label: 'Leistungen' },
  { id: 's4', label: 'Proof' },
  { id: 's5', label: 'Ablauf' },
  { id: 'request', label: 'Anfrage' },
];

const SCENES = {
  s1: {
    base: '#070312',
    g1: `radial-gradient(1200px 700px at 18% 18%, rgba(168,85,247,0.34), transparent 60%),
         radial-gradient(900px 700px at 82% 25%, rgba(56,189,248,0.16), transparent 55%)`,
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
    g1: `radial-gradient(1100px 750px at 22% 20%, rgba(34,211,238,0.26), transparent 60%),
         radial-gradient(900px 700px at 88% 15%, rgba(99,102,241,0.20), transparent 55%)`,
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
    g1: `radial-gradient(1200px 750px at 20% 10%, rgba(244,114,182,0.18), transparent 60%),
         radial-gradient(950px 750px at 84% 30%, rgba(168,85,247,0.22), transparent 55%)`,
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
    g1: `radial-gradient(1200px 750px at 18% 10%, rgba(16,185,129,0.13), transparent 60%),
         radial-gradient(900px 700px at 85% 20%, rgba(59,130,246,0.18), transparent 55%)`,
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
    g1: `radial-gradient(1200px 750px at 15% 10%, rgba(250,204,21,0.10), transparent 60%),
         radial-gradient(900px 700px at 88% 25%, rgba(236,72,153,0.16), transparent 55%)`,
    g2: `linear-gradient(135deg, #120b02 0%, #1b0713 55%, #05020a 100%)`,
    blobs: [
      { cls: 'bg-amber-400/10', x: '-10%', y: '-14%', s: '56rem', blur: 170 },
      { cls: 'bg-pink-500/11', x: '74%', y: '10%', s: '56rem', blur: 160 },
      { cls: 'bg-violet-500/11', x: '18%', y: '82%', s: '48rem', blur: 170 },
    ],
    accent: 'from-amber-200 via-pink-200 to-violet-200',
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
      { threshold: 0.2 }
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
          background: `radial-gradient(800px 600px at ${x}px ${y}px, rgba(255,255,255,0.045), transparent 70%)`,
          filter: 'blur(18px)',
          opacity: 0.6,
          mixBlendMode: 'screen',
          transition: 'background 80ms linear',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(1400px 1050px at ${x}px ${y}px, rgba(99,102,241,0.035), transparent 78%)`,
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
          background: 'radial-gradient(520px 380px at var(--hx, 50%) var(--hy, 30%), rgba(255,255,255,0.11), transparent 62%)',
          mixBlendMode: 'screen',
        }}
      />
      {children}
    </div>
  );
}

/* ---------- STRUCTURE ---------- */

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

function PrimaryCTA({ label = 'Projekt anfragen' }) {
  return (
    <Magnetic>
      <Link
        href="/#request"
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

/* ---------- NUMBER ANIMATION ---------- */

function useCountUp({ target, durationMs = 900 }) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);

  const start = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const from = 0;
    const to = Math.max(0, target);

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
  }, [target, durationMs]);

  useEffect(() => () => raf.current && cancelAnimationFrame(raf.current), []);
  return { value, start };
}

function AnimatedNumber({ value, sceneId, className = '' }) {
  return (
    <span className={cx('relative inline-flex items-baseline', className)}>
      <span className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
        <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', (SCENES[sceneId] ?? SCENES.s1).accent)}>
          {value}
        </span>
      </span>
      <span
        className="pointer-events-none absolute -inset-x-4 -inset-y-4 blur-2xl opacity-35"
        style={{
          background: 'radial-gradient(220px 120px at 40% 55%, rgba(255,255,255,0.18), transparent 65%)',
          mixBlendMode: 'screen',
        }}
      />
    </span>
  );
}

/* ---------- PROOF STAT ---------- */

function ProofStat({ sceneId, label, target, suffix = '', durationMs = 900 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  const { value, start } = useCountUp({ target, durationMs });

  useEffect(() => {
    if (shown) start();
  }, [shown, start]);

  return (
    <TiltCard className="rounded-3xl">
      <div ref={ref} className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8">
        <div
          className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.08]"
          style={{
            filter: 'blur(46px)',
            animation: 'shineSoft 5.6s cubic-bezier(.2,.9,.2,1) infinite',
          }}
        />

        <div className="text-xs uppercase tracking-wide text-white/55">Proof</div>

        <div className="mt-3 flex items-end gap-2 flex-wrap">
          <AnimatedNumber value={value} sceneId={sceneId} />
          {suffix ? (
            <span className="text-white/75 text-xl md:text-2xl font-semibold leading-none pb-[2px]">
              <TitleGradient sceneId={sceneId}>{suffix}</TitleGradient>
            </span>
          ) : null}
        </div>

        <div className="mt-2 text-sm md:text-base text-white/80">{label}</div>
      </div>
    </TiltCard>
  );
}

/* ---------- HERO RECTANGLES (UNIFIED) ---------- */

function MiniTile({ icon, title, sub }) {
  return (
    <div className="h-full">
      <div
        className={cx(
          'group h-full min-h-[78px] md:min-h-[86px]',
          'rounded-2xl border border-white/15',
          'bg-black/18 backdrop-blur-md',
          'px-4 py-4 md:px-5 md:py-4',
          'flex items-center gap-3',
          'transition-[border-color,background-color,transform] duration-300',
          'hover:border-white/25 hover:bg-black/24 hover:-translate-y-[1px]'
        )}
      >
        <div
          className={cx(
            'shrink-0',
            'w-10 h-10 md:w-11 md:h-11',
            'rounded-xl',
            'border border-white/15',
            'bg-white/10',
            'flex items-center justify-center',
            'text-white/90',
            'transition-colors duration-300',
            'group-hover:bg-white/14 group-hover:border-white/22'
          )}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div className="text-sm md:text-[15px] font-semibold text-white/92 leading-tight truncate">{title}</div>
          <div className="mt-1 text-xs md:text-sm text-white/60 leading-tight truncate">{sub}</div>
        </div>
      </div>
    </div>
  );
}

function Stripe({ title, desc, icon }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 md:p-5 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">{icon}</div>
      <div className="min-w-0">
        <div className="text-sm md:text-base font-semibold text-white/90">{title}</div>
        <div className="mt-1 text-sm text-white/65 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

// serviceSubline: individuell pro Leistung, nicht generisch wiederholt
const SERVICE_SUBLINES = {
  Brandbook: 'Basis für alles Weitere.',
  Motiondesign: 'Wiederverwendbar, nicht einmalig.',
  Webdevelopment: 'Kein Design um des Designs willen.',
  Videoediting: 'Funktion vor Ästhetik.',
};

function BigService({ sceneId, icon, kicker, title, desc }) {
  const subline = SERVICE_SUBLINES[kicker] ?? '';
  return (
    <Reveal>
      <TiltCard className="rounded-3xl">
        <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8 overflow-hidden relative">
          <div
            className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.07]"
            style={{
              filter: 'blur(50px)',
              animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite',
            }}
          />

          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-white/60">
              <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">{icon}</span>
              {kicker}
            </div>
            <Wand2 size={18} className="text-white/55" />
          </div>

          <div className="mt-4 text-2xl md:text-4xl font-extrabold leading-tight text-white">
            {title}
            <span className="block text-base md:text-lg mt-2">
              <TitleGradient sceneId={sceneId}>{subline}</TitleGradient>
            </span>
          </div>

          <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">{desc}</p>

          <div className="mt-6">
            <Link href="/#request" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors font-semibold">
              Anfrage schicken <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function Step({ n, title, desc }) {
  return (
    <TiltCard className="rounded-2xl">
      <div className="rounded-2xl border border-white/15 bg-black/20 backdrop-blur-md p-4 md:p-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-extrabold">{n}</div>
          <div className="text-sm md:text-base font-semibold text-white/90">{title}</div>
        </div>
        <div className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</div>
      </div>
    </TiltCard>
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
                <Sparkles size={16} /> Branding · Content · Web
              </span>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
                Branding, Content und Web –
                <span className="block">
                  <TitleGradient sceneId="s1">aufeinander abgestimmt, nicht zusammengewürfelt.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="max-w-2xl text-base md:text-xl text-white/80 leading-relaxed">
                Brandbook, Motion, Video, Web – jeder Baustein zahlt auf den nächsten ein. Das Ergebnis ist ein Erscheinungsbild, das konsistent wirkt und Anfragen erzeugt.
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="flex flex-col items-center gap-3">
                <PrimaryCTA label="Projekt anfragen" />
                <p className="text-sm md:text-base text-white/65 max-w-xl">Ziel, Deadline, Stand – das reicht für eine erste Einschätzung.</p>
              </div>
            </Reveal>


          </div>
        </Scene>

        {/* 02 — WAS DU BEKOMMST */}
        <Scene id="s2">
          <div className="flex flex-col gap-8">

            {/* Headline */}
            <div className="max-w-3xl">
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">02 — Warum das anders ist</div>
              </Reveal>
              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Du zahlst erst,
                  <span className="block">
                    <TitleGradient sceneId="s2">wenn du es gesehen hast.</TitleGradient>
                  </span>
                </h2>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 text-white/75 text-base md:text-xl leading-relaxed max-w-2xl">
                  Kein Vorauszahlen auf Vertrauen. Sprint 0 – Analyse und erster Entwurf – ist kostenlos. Danach entscheidest du, ob es weitergeht.
                </p>
              </Reveal>
            </div>

            {/* Three trust pillars */}
            <Reveal delayMs={200}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-500/8 p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-300/20 flex items-center justify-center">
                    <Eye size={17} className="text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">Erst sehen, dann entscheiden</div>
                    <p className="mt-1 text-sm text-white/60 leading-relaxed">
                      Sprint 0 kostenlos: Du bekommst eine strukturierte Analyse und einen ersten Entwurf – bevor eine einzige Zahlung fällig wird.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs border border-emerald-300/25 bg-emerald-500/10 text-emerald-200">
                      Kostenlos starten
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/12 bg-white/5 p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <Shield size={17} className="text-white/75" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">Zahlung nach Review – nicht vorher</div>
                    <p className="mt-1 text-sm text-white/60 leading-relaxed">
                      Jedes Zahlungsziel ist an einen Sprint-Review gebunden. Du siehst das Ergebnis, gibst Feedback, gibst frei. Erst dann kommt die nächste Phase.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Link href="/prozess" className="text-xs text-white/55 hover:text-white/90 transition-colors inline-flex items-center gap-1 underline underline-offset-4">
                      Ablauf ansehen <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/12 bg-white/5 p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <FileText size={17} className="text-white/75" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">Voller Einblick in den Prozess</div>
                    <p className="mt-1 text-sm text-white/60 leading-relaxed">
                      Du siehst den Stand des Projekts jederzeit – kein Warten im Dunkeln. Wie das in der Praxis aussieht: ein echter Projektablauf dokumentiert.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <a href="https://www.leonseitz.com/kunde1" target="_blank" rel="noopener noreferrer" className="text-xs text-white/55 hover:text-white/90 transition-colors inline-flex items-center gap-1 underline underline-offset-4">
                      Echtes Projekt ansehen <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* Sprint-Gate strip */}
            <Reveal delayMs={280}>
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-5 md:p-6">
                <div className="text-xs uppercase tracking-wide text-white/45 mb-4">So ist der Ablauf gegliedert</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Sprint 0', title: 'Analyse + Entwurf', note: 'Kostenlos', highlight: true },
                    { label: 'Sprint 1', title: 'Erste lauffähige Version', note: '30 % nach Review', highlight: false },
                    { label: 'Sprint 2', title: 'Feinschliff', note: '50 % nach Review', highlight: false },
                    { label: 'Sprint 3', title: 'Go-Live + Übergabe', note: '20 % nach Übergabe', highlight: false },
                  ].map((s, i) => (
                    <div
                      key={s.label}
                      className={`rounded-xl border px-3 py-3 ${s.highlight ? 'border-emerald-300/25 bg-emerald-500/8' : 'border-white/10 bg-white/4'}`}
                    >
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${s.highlight ? 'text-emerald-300/80' : 'text-white/40'}`}>
                        {s.label}
                      </div>
                      <div className="text-sm text-white/85 font-semibold leading-tight">{s.title}</div>
                      <div className={`mt-1.5 text-xs ${s.highlight ? 'text-emerald-200/70' : 'text-white/40'}`}>{s.note}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link href="/prozess" className="text-sm text-white/65 hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium">
                    Vollständigen Ablauf ansehen <ArrowRight size={14} />
                  </Link>
                  <span className="text-white/20 hidden md:inline">·</span>
                  <a href="https://www.leonseitz.com/kunde1" target="_blank" rel="noopener noreferrer" className="text-sm text-white/65 hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium">
                    Echtes Projekt als Referenz <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Bottom CTA row */}
            <Reveal delayMs={340}>
              <div className="flex flex-wrap items-center gap-3">
                <PrimaryCTA label="Kostenlos starten" />
                <GhostCTA href="/portfolio">
                  <ExternalLink size={18} /> Portfolio ansehen
                </GhostCTA>
              </div>
            </Reveal>

          </div>
        </Scene>

        {/* 03 — LEISTUNGEN */}
        <Scene id="s3">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">03 — Leistungen</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Vier Bereiche.
                  <span className="block">
                    <TitleGradient sceneId="s3">Einer greift in den nächsten.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed">
                  Einzeln buchbar oder als komplettes Setup – je nachdem, wo du gerade stehst.
                </p>
              </Reveal>

              <Reveal delayMs={260}>
                <div className="mt-8">
                  <PrimaryCTA label="Anfrage schicken" />
                </div>
              </Reveal>
            </div>

            <div className="space-y-4">
              <BigService
                sceneId="s3"
                icon={<BookOpen size={18} />}
                kicker="Brandbook"
                title="Guidelines, die man wirklich nutzt."
                desc="Farben, Typo, Layoutregeln, Tone of Voice, Beispiele. Damit du und dein Team konsistent kommunizieren – ohne jedes Mal neu entscheiden zu müssen."
              />
              <BigService
                sceneId="s3"
                icon={<Play size={18} />}
                kicker="Motiondesign"
                title="Motion, der im Feed auffällt."
                desc="Kurzformate, Motion Graphics, Hook-Varianten, Templates. Damit du skalieren kannst, ohne jedes Format neu zu entwickeln."
              />
              <BigService
                sceneId="s3"
                icon={<Monitor size={18} />}
                kicker="Webdevelopment"
                title="Websites und Funnels mit einer Richtung."
                desc="Klarer Aufbau, klare CTA, wenig Ablenkung. Damit ein Besucher weiß, was als nächstes passieren soll."
              />
              <BigService
                sceneId="s3"
                icon={<Film size={18} />}
                kicker="Videoediting"
                title="Schnitt mit Rhythmus."
                desc="Storyline, Timing, Sound, Pace. Damit ein Video nicht nur fertig ist, sondern die Botschaft trägt."
              />
            </div>
          </div>
        </Scene>

        {/* 04 — PROOF */}
        <Scene id="s4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">04 — Proof</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Zahlen,
                  <span className="block">
                    <TitleGradient sceneId="s4">die man einordnen kann.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Wenn Branding, Content und Funnel aufeinander abgestimmt sind, zeigt sich das in den Ergebnissen.
                </p>
              </Reveal>

              <Reveal delayMs={260}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <GhostCTA href="/portfolio">
                    <ExternalLink size={18} /> Portfolio ansehen
                  </GhostCTA>
                  <PrimaryCTA label="Anfrage schicken" />
                </div>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <ProofStat sceneId="s4" label="Likes generiert" target={15} suffix="+ Mio" durationMs={900} />
              <ProofStat sceneId="s4" label="Klicks auf Social Media erzielt" target={10} suffix="+ Mio" durationMs={900} />
              <ProofStat sceneId="s4" label="Abgeschlossene Projekte" target={100} suffix="+" durationMs={950} />
            </div>
          </div>
        </Scene>

        {/* 05 — ABLAUF */}
        <Scene id="s5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">05 — Ablauf</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Drei Infos zum Einstieg.
                  <span className="block">
                    <TitleGradient sceneId="s5">Den Rest klären wir gemeinsam.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Ziel, Deadline, aktueller Stand. Das reicht für eine erste Einschätzung – alles Weitere besprechen wir strukturiert.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-6 space-y-3">
                  <Step n="1" title="Anfrage" desc="Ziel, Deadline, aktueller Stand. Drei Sätze genügen." />
                  <Step n="2" title="Strategie & Branding" desc="Brandbook oder Storyline – damit alle Maßnahmen auf dasselbe Ziel einzahlen." />
                  <Step n="3" title="Produktion" desc="Motion, Editing, Web – je nach Umfang einzeln oder kombiniert." />
                  <Step n="4" title="Übergabe" desc="Dateien, Assets, Setup – so dokumentiert, dass du eigenständig weitermachen kannst." />
                </div>
              </Reveal>

              <Reveal delayMs={340}>
                <div className="mt-8">
                  <PrimaryCTA label="Projekt anfragen" />
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
              <TiltCard className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8">
                  <div className="text-xs uppercase tracking-wide text-white/55">Einstieg</div>
                  <div className="mt-3 text-xl md:text-3xl font-bold text-white/90">Drei Felder. Das reicht.</div>
                  <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                    &ldquo;Wir wollen X bis Datum Y erreichen und stehen gerade bei Z.&rdquo; Danach klären wir den Rest.
                  </p>
                  <div className="mt-6 flex gap-2 flex-wrap">
                    <GhostCTA href="/portfolio">
                      <ExternalLink size={18} /> Beispiele ansehen
                    </GhostCTA>
                    <PrimaryCTA label="Anfrage schicken" />
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </Scene>

        {/* 06 — ANFRAGE */}
        <Scene id="request">
          <div className="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div>
                <Reveal>
                  <div className="text-xs uppercase tracking-wide text-white/55">Anfrage</div>
                </Reveal>

                <Reveal delayMs={90}>
                  <h3 className="mt-2 text-2xl md:text-5xl font-extrabold leading-tight">Drei Felder – dann weißt du, ob es passt.</h3>
                </Reveal>

                <Reveal delayMs={160}>
                  <p className="mt-4 text-white/80 leading-relaxed max-w-2xl">
                    Was du vorhast, bis wann du es brauchst und wo du gerade stehst. Danach bekommst du eine ehrliche Einschätzung.
                  </p>
                </Reveal>

                <Reveal delayMs={240}>
                  <div className="mt-6 space-y-3">
                    {['Ziel: Was soll am Ende stehen?', 'Deadline: Bis wann?', 'Stand: Bestehendes Branding, Material, Beispiele?'].map((t) => (
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
                        href="mailto:leonseitz25@icloud.com?subject=Projektanfrage&body=Ziel:%0D%0ADeadline:%0D%0AStand:%0D%0A"
                        className="px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center gap-2"
                      >
                        <Mail size={18} /> Per Mail anfragen
                      </a>
                    </Magnetic>

                    <GhostCTA href="/portfolio">
                      <ExternalLink size={18} /> Erst Portfolio ansehen
                    </GhostCTA>
                  </div>
                </Reveal>
              </div>

              <Reveal delayMs={200}>
                <TiltCard className="rounded-3xl">
                  <div className="rounded-3xl border border-white/15 bg-black/25 p-6">
                    <div className="text-sm md:text-base font-semibold text-white/90">Copy & schicken</div>
                    <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/85 whitespace-pre-wrap leading-relaxed">
{`Ziel:
Deadline:
Stand:
Budgetrahmen (optional):
Link/Beispiele (optional):`}
                    </div>
                    <div className="mt-4 text-sm text-white/60">Das reicht für eine vollständige erste Einschätzung.</div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
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
@keyframes shineSoft {
  0%   { transform: translateX(-220px) rotate(12deg) scale(1);    opacity: 0.00; }
  12%  { opacity: 0.08; }
  32%  { transform: translateX(120px) rotate(12deg) scale(1.02);  opacity: 0.06; }
  46%  { transform: translateX(220px) rotate(12deg) scale(1.01);  opacity: 0.03; }
  62%  { transform: translateX(220px) rotate(12deg) scale(1.01);  opacity: 0.01; }
  78%  { transform: translateX(520px) rotate(12deg) scale(1.02);  opacity: 0.05; }
  100% { transform: translateX(980px) rotate(12deg) scale(1.00);  opacity: 0.00; }
}
@keyframes noiseMove {
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
