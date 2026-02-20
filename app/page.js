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
  FileText,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ---------- CONFIG ---------- */

const EMAIL = 'hello@leonseitz.com';
const WHATSAPP_E164 = '4916095757167';
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(
  `Hi Leon,\n\nZiel:\nDeadline:\nStand:\n\nKurzer Kontext:`
)}`;

const MAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Projektanfrage')}&body=${encodeURIComponent(
  `Hi Leon,\n\nZiel:\nDeadline:\nStand:\n\nKurzer Kontext:`
)}`;

const YOUTUBE_EDITING_URL = 'https://www.youtube.com/watch?v=Xt9Rm2pDoiE&t=23s';
const WEB_CASE_URL = 'https://thankful-anything-310042.framer.app/';

const BRAND_PDF = '/pdf/kfa-brandbook.pdf'; // Lege deine PDF unter /public/pdf/kfa-brandbook.pdf ab

// Preview Images: lege sie unter /public/img/previews/ ab
const PREVIEWS = {
  motion: ['/img/previews/motion-1.jpg', '/img/previews/motion-2.jpg', '/img/previews/motion-3.jpg'],
  web: ['/img/previews/web-1.jpg', '/img/previews/web-2.jpg', '/img/previews/web-3.jpg'],
};

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

/* ---------- DRAG / SWIPE PREVIEW ---------- */

function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startLeft = 0;

    const down = (e) => {
      isDown = true;
      el.classList.add('cursor-grabbing');
      startX = 'touches' in e ? e.touches[0].pageX : e.pageX;
      startLeft = el.scrollLeft;
    };

    const move = (e) => {
      if (!isDown) return;
      const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
      const dx = x - startX;
      el.scrollLeft = startLeft - dx;
    };

    const up = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
    };

    el.addEventListener('mousedown', down);
    el.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);

    el.addEventListener('touchstart', down, { passive: true });
    el.addEventListener('touchmove', move, { passive: true });
    el.addEventListener('touchend', up);

    return () => {
      el.removeEventListener('mousedown', down);
      el.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);

      el.removeEventListener('touchstart', down);
      el.removeEventListener('touchmove', move);
      el.removeEventListener('touchend', up);
    };
  }, [ref]);
}

function PreviewRail({ images = [], accent = 'from-violet-200 via-indigo-200 to-cyan-200', label = 'Preview' }) {
  const railRef = useRef(null);
  useDragScroll(railRef);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-wide text-white/55">{label}</div>
        <div className={cx('text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r', accent)}>
          Drag / Swipe
        </div>
      </div>

      <div className="relative mt-3">
        {/* glow frame */}
        <div className="pointer-events-none absolute -inset-2 rounded-3xl opacity-60 blur-2xl bg-[radial-gradient(70%_85%_at_20%_10%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(65%_80%_at_90%_0%,rgba(99,102,241,0.10),transparent_60%),radial-gradient(70%_90%_at_50%_120%,rgba(56,189,248,0.08),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/12" />

        <div
          ref={railRef}
          className={cx(
            'relative rounded-3xl border border-white/12 bg-black/15 backdrop-blur-md',
            'overflow-x-auto overflow-y-hidden',
            'cursor-grab select-none',
            '[scrollbar-width:none]',
            'snap-x snap-mandatory',
            'px-4 py-4'
          )}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex gap-4 min-w-max pr-6">
            {images.map((src, i) => (
              <div
                key={src + i}
                className={cx(
                  'snap-start',
                  'relative',
                  'w-[280px] md:w-[360px]',
                  'h-[170px] md:h-[210px]',
                  'rounded-2xl overflow-hidden',
                  'border border-white/12',
                  'bg-black/25'
                )}
              >
                <Image
                  src={src}
                  alt={`Preview ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 280px, 360px"
                  className="object-cover opacity-[0.92]"
                  priority={false}
                />
                {/* filmic top gloss */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_0%,rgba(255,255,255,0.18),transparent_55%)] mix-blend-screen opacity-60" />
                {/* bottom vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                {/* subtle depth border */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            ))}
          </div>
        </div>

        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 rounded-l-3xl bg-gradient-to-r from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-3xl bg-gradient-to-l from-black/40 to-transparent" />
      </div>
    </div>
  );
}

/* ---------- PDF MODAL (Brandbook) ---------- */

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

function GradientPillButton({ href, icon, children, gradient, external = false, onClick }) {
  const classes =
    'inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-white/12 bg-white/[0.06] backdrop-blur-xl hover:bg-white/[0.10] transition-colors';

  const inner = (
    <>
      <span
        className={cx(
          'inline-flex items-center justify-center w-8 h-8 rounded-full',
          'bg-gradient-to-r',
          gradient,
          'text-black'
        )}
      >
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
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={classes}
    >
      {inner}
    </a>
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
              <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', (SCENES[sceneId] ?? SCENES.s1).accent)}>
                {suffix}
              </span>
            </span>
          ) : null}
        </div>

        <div className="mt-2 text-sm md:text-base text-white/80">{label}</div>
      </div>
    </TiltCard>
  );
}

/* ---------- CONTENT BLOCKS ---------- */

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

function ServiceCard({ sceneId, icon, kicker, title, desc, children }) {
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
              <TitleGradient sceneId={sceneId}>Als Einheit geplant, nicht als Einzelteil.</TitleGradient>
            </span>
          </div>

          <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">{desc}</p>

          {children}
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

  const [openBrandPdf, setOpenBrandPdf] = useState(false);

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
        {/* 01 */}
        <Scene id="s1">
          <div className="flex flex-col items-center text-center gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Klar begrenzte digitale Projekte – ohne Umwege
              </span>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
                Ich setze digitale Projekte so um,
                <span className="block">
                  <TitleGradient sceneId="s1">dass am Ende etwas steht.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="max-w-2xl text-base md:text-xl text-white/80 leading-relaxed">
                Branding, Content und Website für deine Idee. Maßgeschneidert an deine Bedürfnisse.
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="flex flex-col items-center gap-3">
                <PrimaryCTA label="Projekt anfragen" />
                <p className="text-sm md:text-base text-white/65 max-w-xl">
                  Dann bekommst du eine klare Einschätzung und den nächsten Schritt.
                </p>
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* 02 */}
        <Scene id="s2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">02 — Was du bekommst</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Ein klarer Look.
                  <span className="block">
                    <TitleGradient sceneId="s2">Eine klare Linie.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Du bekommst ein Setup, das wiederholbar ist: Branding → Content → Anfrage.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-6 space-y-3">
                  {[
                    'Branding, das man sofort einordnen kann',
                    'Content, der nicht austauschbar wirkt',
                    'Website/Funnel als klarer Weg zur Anfrage',
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                      <span className="text-sm md:text-base text-white/80">{t}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delayMs={320}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <PrimaryCTA label="Kurz anfragen" />
                  <GhostCTA href="/portfolio">
                    <ExternalLink size={18} /> Portfolio
                  </GhostCTA>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
              <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="text-xs uppercase tracking-wide text-white/55">So sieht das als System aus</div>

                  <div className="mt-5 space-y-3">
                    <Stripe
                      title="1) Brandbook"
                      desc="Klare Regeln für Farben, Typo, Layout und Tonalität – damit dein Auftritt konsistent bleibt und sich sauber skalieren lässt."
                      icon={<BookOpen size={18} />}
                    />
                    <Stripe
                      title="2) Motion & Video"
                      desc="Wiedererkennbare Assets und Motion-Patterns – damit Content schneller produziert wird und sofort „deins“ wirkt."
                      icon={<Play size={18} />}
                    />
                    <Stripe
                      title="3) Webdevelopment"
                      desc="Ein Aufbau, der führt: Problem → Lösung → Proof → CTA. Wenig Ablenkung, klare Struktur."
                      icon={<Monitor size={18} />}
                    />
                  </div>

                  <div className="mt-6 relative rounded-2xl border border-white/15 overflow-hidden h-40 md:h-48">
                    <Image
                      src="/img/home/preview-system.jpg"
                      alt="Preview – Branding, Content, Anfrageweg"
                      fill
                      className="object-cover opacity-75"
                      sizes="(max-width: 768px) 100vw, 520px"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  </div>

                  <div className="mt-3 text-xs text-white/55"> </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* 03 */}
        <Scene id="s3">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">03 — Leistungen</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Bausteine,
                  <span className="block">
                    <TitleGradient sceneId="s3">die zusammenpassen.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed">
                  Als Gesamtpaket oder einzelne Services – so wie du es brauchst.
                </p>
              </Reveal>

              <Reveal delayMs={260}>
                <div className="mt-8">
                  <PrimaryCTA label="Passt das?" />
                </div>
              </Reveal>
            </div>

            <div className="space-y-4">
              {/* Brandbook (PDF Preview) */}
              <ServiceCard
                sceneId="s3"
                icon={<BookOpen size={18} />}
                kicker="Brandbook"
                title="Guidelines, die im Alltag helfen."
                desc="Farben, Typo, Layoutregeln, Tonalität, Beispiele. So bleibt alles konsistent – auch wenn später mehr dazukommt."
              >
                <div className="mt-6 flex flex-wrap gap-2">
                  <GradientPillButton
                    gradient="from-violet-200 via-indigo-200 to-cyan-200"
                    icon={<FileText size={16} />}
                    onClick={() => setOpenBrandPdf(true)}
                  >
                    Brandbook-PDF ansehen
                  </GradientPillButton>

                  <GradientPillButton
                    gradient="from-indigo-200 via-violet-200 to-fuchsia-200"
                    icon={<ArrowRight size={16} />}
                    href="/portfolio/brandbook"
                    external={false}
                  >
                    Brandbook im Portfolio
                  </GradientPillButton>
                </div>
              </ServiceCard>

              {/* Motion (Drag/Swipe Preview) */}
              <ServiceCard
                sceneId="s3"
                icon={<Play size={18} />}
                kicker="Motiondesign"
                title="Bewegung mit Wiedererkennung."
                desc="Motion Graphics, Vorlagen, Varianten für Einstiege. Damit Inhalte nicht beliebig wirken und du nicht jedes Mal neu anfängst."
              >
                <PreviewRail images={PREVIEWS.motion} accent="from-pink-200 via-fuchsia-200 to-indigo-200" label="Sneak Peek" />

                <div className="mt-6 flex flex-wrap gap-2">
                  <GradientPillButton
                    gradient="from-pink-200 via-fuchsia-200 to-indigo-200"
                    icon={<ExternalLink size={16} />}
                    href="/portfolio/motion"
                    external={false}
                  >
                    Motion im Portfolio
                  </GradientPillButton>
                </div>
              </ServiceCard>

              {/* Web (Drag/Swipe Preview + Case Link) */}
              <ServiceCard
                sceneId="s3"
                icon={<Monitor size={18} />}
                kicker="Webdevelopment"
                title="Websites mit klarer Führung."
                desc="Aufbau, der schnell verständlich ist: Problem, Lösung, Proof, CTA. Wenig Ablenkung, saubere Umsetzung."
              >
                <PreviewRail images={PREVIEWS.web} accent="from-cyan-200 via-indigo-200 to-violet-200" label="Sneak Peek" />

                <div className="mt-6 flex flex-wrap gap-2">
                  <GradientPillButton
                    gradient="from-cyan-200 via-indigo-200 to-violet-200"
                    icon={<ExternalLink size={16} />}
                    href={WEB_CASE_URL}
                    external={true}
                  >
                    Web-Case öffnen
                  </GradientPillButton>

                  <GradientPillButton
                    gradient="from-emerald-200 via-cyan-200 to-indigo-200"
                    icon={<ArrowRight size={16} />}
                    href="/portfolio/web"
                    external={false}
                  >
                    Web im Portfolio
                  </GradientPillButton>
                </div>
              </ServiceCard>

              {/* Videoediting (YouTube direct) */}
              <ServiceCard
                sceneId="s3"
                icon={<Film size={18} />}
                kicker="Videoediting"
                title="Schnitt, der ruhig wirkt – und sitzt."
                desc="Rhythmus, Timing, Sound, Struktur. Damit ein Video nicht nur fertig ist, sondern gut funktioniert."
              >
                <div className="mt-6 flex flex-wrap gap-2">
                  <GradientPillButton
                    gradient="from-amber-200 via-pink-200 to-violet-200"
                    icon={<Play size={16} />}
                    href={YOUTUBE_EDITING_URL}
                    external={true}
                  >
                    YouTube ansehen
                  </GradientPillButton>

                  <GradientPillButton
                    gradient="from-violet-200 via-indigo-200 to-cyan-200"
                    icon={<ArrowRight size={16} />}
                    href="/portfolio/video"
                    external={false}
                  >
                    Video im Portfolio
                  </GradientPillButton>
                </div>
              </ServiceCard>
            </div>
          </div>
        </Scene>

        {/* 04 */}
        <Scene id="s4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">04 — Proof</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Schwarz
                  <span className="block">
                    <TitleGradient sceneId="s4">auf weiß</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Harte Fakten aus meiner bisherigen Arbeit.
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
              <ProofStat sceneId="s4" label="Interaktionen erzielt" target={15} suffix="+ Mio" durationMs={900} />
              <ProofStat sceneId="s4" label="Klicks auf Inhalte" target={10} suffix="+ Mio" durationMs={900} />
              <ProofStat sceneId="s4" label="Umgesetzte Projekte" target={100} suffix="+" durationMs={950} />
            </div>
          </div>
        </Scene>

        {/* 05 */}
        <Scene id="s5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">05 — Ablauf</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Kurzer Start.
                  <span className="block">
                    <TitleGradient sceneId="s5">Klarer Ablauf.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Du musst nichts „perfekt“ vorbereiten. Wir klären die Eckdaten, legen den Ablauf fest – dann setze ich um.
                </p>
              </Reveal>

              <Reveal delayMs={260}>
                <div className="mt-6 space-y-3">
                  <Step n="1" title="Anfrage" desc="Ziel, Deadline, Stand. Drei Infos reichen für eine erste Einschätzung." />
                  <Step n="2" title="Struktur & Stil" desc="Branding/Storyline und klare Regeln, damit alles zusammenpasst." />
                  <Step n="3" title="Umsetzung" desc="Content, Motion, Web – je nach Umfang. Mit klaren Feedback-Runden." />
                  <Step n="4" title="Übergabe" desc="Assets/Files/Setup so, dass du damit weiterarbeiten kannst." />
                </div>
              </Reveal>

              <Reveal delayMs={340}>
                <div className="mt-8">
                  <PrimaryCTA label="Anfrage senden" />
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
              <TiltCard className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8">
                  <div className="text-xs uppercase tracking-wide text-white/55">Kurzfassung</div>
                  <div className="mt-3 text-xl md:text-3xl font-bold text-white/90">Ein Satz reicht fürs Erste.</div>
                  <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                    „Wir wollen X bis Datum Y und sind gerade bei Z.“ Danach klären wir den Rest.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </Scene>

        {/* 06 */}
        <Scene id="request">
          <div className="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div>
                <Reveal>
                  <div className="text-xs uppercase tracking-wide text-white/55">Anfrage</div>
                </Reveal>

                <Reveal delayMs={90}>
                  <h3 className="mt-2 text-2xl md:text-5xl font-extrabold leading-tight">Schick mir kurz dein Vorhaben</h3>
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
                        href={MAIL_HREF}
                        className="px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center gap-2"
                      >
                        <Mail size={18} /> Per Mail
                      </a>
                    </Magnetic>

                    <Magnetic strength={10}>
                      <a
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
                      >
                        <ExternalLink size={18} /> WhatsApp
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

      {/* Brandbook PDF Modal */}
      <Modal open={openBrandPdf} onClose={() => setOpenBrandPdf(false)} title="Brandbook – PDF Preview">
        <div className="grid grid-cols-1 gap-3">
          <div className="text-sm text-white/70">
            Preview im Embed. Wenn du willst, kannst du die PDF auch im neuen Tab öffnen.
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={BRAND_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-white/12 bg-white/[0.06] hover:bg-white/[0.10] transition-colors"
            >
              <FileText size={16} className="text-white/80" />
              PDF in neuem Tab
              <ExternalLink size={14} className="text-white/60" />
            </a>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl border border-white/12 bg-black/20">
            <div className="aspect-[16/10] md:aspect-[16/9]">
              <iframe
                title="Brandbook PDF"
                src={`${BRAND_PDF}#view=FitH`}
                className="w-full h-full"
              />
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

/* NOTE:
   - Preview Images: /public/img/previews/web-1.jpg ... web-3.jpg und motion-1.jpg ... motion-3.jpg
   - Brandbook PDF: /public/pdf/kfa-brandbook.pdf
*/
