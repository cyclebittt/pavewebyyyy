'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Globe2,
  Video,
  ExternalLink,
  CheckCircle2,
  Clock,
  LayoutTemplate,
  CreditCard,
  FileText,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

/* ---------- CONFIG ---------- */

const DONATION_URL = 'https://kircheab.de/spenden';
const YT_EMBED = 'https://www.youtube-nocookie.com/embed/svgNO7ErcKg';

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'meta', label: 'Meta' },
  { id: 'deliverables', label: 'Was geliefert wurde' },
  { id: 'impact', label: 'Wirkung' },
  { id: 'request', label: 'Anfrage' },
];

const SCENES: Record<
  string,
  {
    base: string;
    g1: string;
    g2: string;
    blobs: { cls: string; x: string; y: string; s: string; blur: number }[];
    accent: string;
  }
> = {
  hero: {
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
  meta: {
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
  deliverables: {
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
  impact: {
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

function cx(...xs: (string | false | null | undefined)[]) {
  return xs.filter(Boolean).join(' ');
}

function TitleGradient({ sceneId, children }: { sceneId: string; children: React.ReactNode }) {
  const scene = SCENES[sceneId] ?? SCENES.hero;
  return <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', scene.accent)}>{children}</span>;
}

function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
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

function useReveal(ref: React.RefObject<HTMLElement | null>) {
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
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
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

function GlobalBackground({ activeId }: { activeId: string }) {
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

function GlobalLightLeaks({ activeId }: { activeId: string }) {
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

function Magnetic({
  children,
  strength = 14,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
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

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
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

function Scene({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative px-5 md:px-16 py-16 md:py-20 scroll-mt-24">
      <div className="relative max-w-6xl mx-auto w-full">{children}</div>
    </section>
  );
}

function Reveal({ children, delayMs = 0 }: { children: React.ReactNode; delayMs?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shown = useReveal(ref as unknown as React.RefObject<HTMLElement | null>);

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

/* ---------- COUNTUP (for 17.000) ---------- */

function useCountUp({ target, durationMs = 900 }: { target: number; durationMs?: number }) {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);

  const start = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const from = 0;
    const to = Math.max(0, target);

    const tick = (t: number) => {
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

function ProofDonateCard({ sceneId }: { sceneId: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shown = useReveal(ref as unknown as React.RefObject<HTMLElement | null>);
  const { value, start } = useCountUp({ target: 17000, durationMs: 950 });

  useEffect(() => {
    if (shown) start();
  }, [shown, start]);

  return (
    <TiltCard className="rounded-3xl">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8"
      >
        <div
          className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.08]"
          style={{ filter: 'blur(46px)', animation: 'shineSoft 5.6s cubic-bezier(.2,.9,.2,1) infinite' }}
        />

        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wide text-white/55">Spenden in 2 Monaten</div>
          <div className="inline-flex items-center gap-2 text-xs text-white/60">
            <Globe2 size={14} className="text-emerald-300" />
            DE &amp; EN
          </div>
        </div>

        <div className="mt-4 flex items-end gap-2 flex-wrap">
          <span className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
            <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', (SCENES[sceneId] ?? SCENES.hero).accent)}>
              {value.toLocaleString('de-DE')}
            </span>
          </span>
          <span className="text-white/75 text-xl md:text-2xl font-semibold leading-none pb-[2px]">
            <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', (SCENES[sceneId] ?? SCENES.hero).accent)}>
              €
            </span>
          </span>
        </div>

        <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
          Wir sind sehr dankbar. Aus unserer Sicht wäre das ohne Gott nicht möglich gewesen.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={DONATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold"
          >
            Landingpage ansehen <ExternalLink size={16} />
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold text-white"
          >
            Ähnliches Projekt anfragen <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}

/* ---------- PAGE ---------- */

export default function KircheFundraisingPage() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const { activeId } = useActiveSection(sectionIds);

  return (
    <div className="font-proxima text-white">
      <style>{globalKeyframes}</style>

      <GlobalBackground activeId={activeId} />
      <GlobalLightLeaks activeId={activeId} />

      <ScrollProgressBar />
      <CursorHalo />

      <Navbar />

      {/* HERO */}
      <Scene id="hero">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 items-start">
          <div>
            <Reveal>
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
                <ArrowLeft size={16} /> Zurück zum Portfolio
              </Link>
            </Reveal>

            <Reveal delayMs={90}>
              <span className="mt-6 inline-flex items-center gap-2 text-xs md:text-sm text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Case Study · Kirche für Aschaffenburg
              </span>
            </Reveal>

            <Reveal delayMs={160}>
              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.03]">
                Fundraising-Seite,
                <span className="block">
                  <TitleGradient sceneId="hero">klar aufgebaut und schnell live.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={240}>
              <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                Ziel war eine Seite, die ohne Erklärung funktioniert: Anliegen verstehen, Vertrauen bekommen, Spendenweg
                wählen. Dazu DE/EN Inhalte, Flyer und ein Projektvideo.
              </p>
            </Reveal>

            <Reveal delayMs={320}>
              <div className="mt-7 flex flex-wrap gap-2">
                {['Landingpage', 'DE & EN', 'PayPal & Überweisung', 'QR-Codes', 'Flyer', 'Video'].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-white/10 border border-white/12 px-3 py-1 text-xs md:text-[13px] text-white/85"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={390}>
              <div className="mt-8 flex flex-wrap gap-2">
                <Magnetic>
                  <a
                    href={DONATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
                  >
                    Zur Spenden-Seite
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>

                <Magnetic strength={10}>
                  <Link
                    href="/contact"
                    className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
                  >
                    Ähnliches Projekt anfragen <ArrowRight size={18} />
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Right: Video */}
          <Reveal delayMs={140}>
            <TiltCard className="rounded-3xl">
              <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md overflow-hidden">
                <div className="p-5 md:p-6 flex items-center justify-between gap-3 border-b border-white/10">
                  <div className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85">
                    <Video size={16} className="text-indigo-200" />
                    Projektvideo
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs text-white/60">
                    <Globe2 size={14} className="text-emerald-300" />
                    DE &amp; EN
                  </div>
                </div>

                <div className="relative w-full aspect-video overflow-hidden bg-black">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={YT_EMBED}
                    title="Kirche für Aschaffenburg – Fundraising Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="p-5 md:p-6">
                  <div className="text-xs uppercase tracking-wide text-white/55">Kurzfassung</div>
                  <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">
                    Story + klare Spendenwege (PayPal/Überweisung) + QR-Codes + Assets (Flyer/Video) → ein sauberer,
                    reibungsarmer Funnel.
                  </p>

                  <div className="mt-4">
                    <a
                      href={DONATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white/85 hover:text-white font-semibold"
                    >
                      Landingpage öffnen <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </Scene>

      {/* META */}
      <Scene id="meta">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
          <MetaCard label="Ziel" value="Spenden sammeln" icon={<Sparkles size={16} />} />
          <MetaCard label="Zeitraum" value="~ 2 Wochen bis live" icon={<Clock size={16} />} />
          <MetaCard label="Rolle" value="Konzept · Design · Umsetzung" icon={<LayoutTemplate size={16} />} />
          <MetaCard label="Setup" value="DE/EN · Payments · QR" icon={<CreditCard size={16} />} />
        </div>

        <div className="mt-6">
          <ProofDonateCard sceneId="meta" />
        </div>
      </Scene>

      {/* DELIVERABLES */}
      <Scene id="deliverables">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Was geliefert wurde</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
            Verständlich,
            <span className="block">
              <TitleGradient sceneId="deliverables">nicht überdesignt.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-2xl">
            Fokus war weniger „schön“, sondern „verständlich und einfach zu nutzen“: klare Story, klare Spendenwege,
            sauberer Ablauf.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <MiniCard
            icon={<LayoutTemplate size={18} />}
            title="Landingpage"
            bullets={['Story und Struktur', 'Mobile-first Umsetzung', 'Vertrauen und klare CTAs']}
          />
          <MiniCard
            icon={<CreditCard size={18} />}
            title="Spendenwege"
            bullets={['PayPal und Überweisung', 'QR-Codes und kurze Links', 'so wenig Reibung wie möglich']}
          />
          <MiniCard
            icon={<FileText size={18} />}
            title="Content und Medien"
            bullets={['Texte in DE und EN', '4 Flyer für Verteilung', 'Projektvideo für Reichweite']}
          />
        </div>

        <Reveal delayMs={220}>
          <div className="mt-8 flex flex-wrap gap-2">
            <Magnetic>
              <a
                href={DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Zur Spenden-Seite <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>

            <Magnetic strength={10}>
              <Link
                href="/portfolio"
                className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
              >
                Mehr Projekte <ExternalLink size={18} />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </Scene>

      {/* IMPACT */}
      <Scene id="impact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <Reveal>
              <div className="text-xs uppercase tracking-wide text-white/55">Wirkung</div>
            </Reveal>

            <Reveal delayMs={90}>
              <h3 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                Seite als Funnel,
                <span className="block">
                  <TitleGradient sceneId="impact">nicht als Deko.</TitleGradient>
                </span>
              </h3>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                Die Seite wurde so gebaut, dass Menschen schnell verstehen, worum es geht, und ohne Hürden spenden können.
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="mt-7 flex flex-wrap gap-2">
                <Magnetic>
                  <Link
                    href="/contact"
                    className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
                  >
                    Ähnliches Projekt anfragen <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Magnetic>
                <Magnetic strength={10}>
                  <a
                    href={DONATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
                  >
                    Landingpage <ExternalLink size={18} />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <ImpactItem text="Anliegen in wenigen Sekunden verständlich durch Story und klare Struktur." />
            <ImpactItem text="Spendenweg direkt: PayPal oder Überweisung, ergänzt durch QR-Codes." />
            <ImpactItem text="Einheitliche Assets (Flyer und Video), damit überall auf dasselbe Ziel verlinkt wird." />
          </div>
        </div>
      </Scene>

      {/* REQUEST */}
      <Scene id="request">
        <div className="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
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

              <Reveal delayMs={320}>
                <div className="mt-8">
                  <Magnetic>
                    <Link
                      href="/contact"
                      className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
                    >
                      Kontakt öffnen <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={200}>
              <TiltCard className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-black/25 p-6">
                  <div className="text-sm md:text-base font-semibold text-white/90">Copy/Paste</div>
                  <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/85 whitespace-pre-wrap leading-relaxed">{`Ziel:
Deadline:
Stand:
Budgetrahmen (optional):
Link/Beispiele (optional):`}</div>
                  <div className="mt-4 text-sm text-white/60">Das reicht komplett für eine erste Einschätzung.</div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </Scene>

      <Footer />
    </div>
  );
}

/* ---------- SMALL UI ---------- */

function MetaCard({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <TiltCard className="rounded-2xl">
      <div className="rounded-2xl border border-white/15 bg-black/20 backdrop-blur-md p-4">
        <div className="text-xs uppercase tracking-wide text-white/55 flex items-center gap-1.5">
          {icon ? <span className="text-white/70">{icon}</span> : null}
          {label}
        </div>
        <div className="mt-1 text-sm md:text-base text-white/90">{value}</div>
      </div>
    </TiltCard>
  );
}

function MiniCard({ icon, title, bullets }: { icon: React.ReactNode; title: string; bullets: string[] }) {
  return (
    <Reveal>
      <TiltCard className="rounded-3xl">
        <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 overflow-hidden relative">
          <div
            className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.07]"
            style={{ filter: 'blur(50px)', animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite' }}
          />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white/90">{icon}</div>
            <h4 className="text-sm md:text-base font-semibold text-white/90">{title}</h4>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function ImpactItem({ text }: { text: string }) {
  return (
    <TiltCard className="rounded-2xl">
      <div className="rounded-2xl border border-white/15 bg-black/20 backdrop-blur-md p-4 text-sm md:text-base text-white/80">
        {text}
      </div>
    </TiltCard>
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
