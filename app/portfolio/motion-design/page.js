'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle2,
  Timer,
  ShieldCheck,
  LineChart,
} from 'lucide-react';

/* ---------- CASE SCENE (match homepage look) ---------- */

const CASE_SCENE = {
  base: '#070312',
  g1: `radial-gradient(1200px 700px at 18% 18%, rgba(168,85,247,0.30), transparent 60%),
       radial-gradient(900px 700px at 82% 25%, rgba(56,189,248,0.14), transparent 55%)`,
  g2: `linear-gradient(135deg, #070312 0%, #0b0b1a 50%, #03040e 100%)`,
  blobs: [
    { cls: 'bg-violet-500/16', x: '-20%', y: '-18%', s: '56rem', blur: 140 },
    { cls: 'bg-cyan-500/10', x: '70%', y: '10%', s: '54rem', blur: 150 },
    { cls: 'bg-fuchsia-500/9', x: '20%', y: '80%', s: '46rem', blur: 150 },
  ],
  accent: 'from-violet-200 via-indigo-200 to-cyan-200',
};

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}

function TitleGradient({ children }: { children: React.ReactNode }) {
  return <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', CASE_SCENE.accent)}>{children}</span>;
}

/* ---------- REVEAL ---------- */

function useReveal<T extends HTMLElement>(ref: React.RefObject<T>) {
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

function Reveal({ children, delayMs = 0 }: { children: React.ReactNode; delayMs?: number }) {
  const ref = useRef<HTMLDivElement>(null);
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

/* ---------- PROGRESS + HALO (same as homepage) ---------- */

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

/* ---------- GLOBAL BACKGROUND ---------- */

function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: CASE_SCENE.base,
          backgroundImage: `${CASE_SCENE.g1}, ${CASE_SCENE.g2}`,
        }}
      />

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

function GlobalLightLeaks() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {CASE_SCENE.blobs.map((b, i) => (
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
}

/* ---------- INTERACTIONS ---------- */

function Magnetic({
  children,
  strength = 14,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

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
  const ref = useRef<HTMLDivElement>(null);

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

/* ---------- CTAs ---------- */

function PrimaryCTA({ href, label }: { href: string; label: string }) {
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

function GhostCTA({ href, children }: { href: string; children: React.ReactNode }) {
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

/* ---------- STRUCTURE ---------- */

function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative px-5 md:px-16 py-12 md:py-16">
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* ---------- PAGE ---------- */

export default function MotionDesignPage() {
  return (
    <div className="font-proxima text-white min-h-screen">
      <style>{globalKeyframes}</style>

      <GlobalBackground />
      <GlobalLightLeaks />
      <ScrollProgressBar />
      <CursorHalo />

      <Navbar />

      {/* HEADER */}
      <SectionShell>
        <div className="flex flex-col gap-8">
          <Reveal>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Zurück zum Portfolio
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 items-start">
            <div className="max-w-2xl">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
                  <Sparkles size={16} /> Motion Design · Video Editing
                </span>
              </Reveal>

              <Reveal delayMs={90}>
                <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                  Motion, das klar erklärt
                  <span className="block">
                    <TitleGradient>und sofort wirkt.</TitleGradient>
                  </span>
                </h1>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-4 text-white/80 leading-relaxed max-w-xl">
                  Keine Alarmismus-Zahlen, keine Buzzwords. Nur saubere Cuts, klare Dramaturgie und Motion, die den Punkt
                  schneller rüberbringt als Text.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <PrimaryCTA href="/#request" label="Kurz anfragen" />
                  <GhostCTA href="/portfolio">Portfolio ansehen</GhostCTA>
                </div>
              </Reveal>

              <Reveal delayMs={300}>
                <p className="mt-4 text-sm md:text-base text-white/60 max-w-xl">
                  Schick mir kurz Ziel, Plattform und Material-Stand. Dann sage ich dir, was realistisch ist und wie wir starten.
                </p>
              </Reveal>

              <Reveal delayMs={360}>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill icon={<Timer size={14} />}>Schneller erster Cut</Pill>
                  <Pill icon={<ShieldCheck size={14} />}>Saubere Übergabe</Pill>
                  <Pill icon={<LineChart size={14} />}>Fokus auf Wirkung</Pill>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
              <TiltCard className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-7 overflow-hidden relative">
                  <div
                    className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.07]"
                    style={{
                      filter: 'blur(50px)',
                      animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite',
                    }}
                  />

                  <div className="text-xs uppercase tracking-wide text-white/55">Typischer Ablauf</div>

                  <ul className="mt-4 space-y-2 text-sm md:text-base text-white/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                      <span>Hook + Storyline kurz festlegen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                      <span>Cut + Motion als erster Entwurf</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                      <span>1–2 Feedback-Runden, dann Export & Übergabe</span>
                    </li>
                  </ul>

                  <div className="mt-4 text-sm text-white/60">
                    Output: Reels/TikTok/YouTube (auf Wunsch auch Templates für weitere Videos).
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* SHOWCASE */}
      <SectionShell>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <Reveal>
              <div className="text-xs uppercase tracking-wide text-white/55">Showcase</div>
            </Reveal>
            <Reveal delayMs={90}>
              <h2 className="mt-3 text-2xl md:text-5xl font-extrabold tracking-tight">
                Zwei Beispiele.
                <span className="block">
                  <TitleGradient>Mehr braucht’s nicht.</TitleGradient>
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal delayMs={160}>
            <p className="text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
              Zwei Beispiele. Mehr braucht’s nicht, um Stil und Qualität einzuordnen.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6">
          <Reveal>
            <TiltCard className="rounded-3xl">
              <div className="rounded-3xl overflow-hidden border border-white/15 bg-black/20 backdrop-blur-md">
                <video
                  src="/videos/showcase.mp4"
                  poster="/img/portfolio/motion-poster.jpg"
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="p-5 md:p-6 border-t border-white/15">
                  <div className="text-sm md:text-base font-semibold text-white/90">Showcase (kurz)</div>
                  <div className="mt-1 text-sm text-white/65">Schnitte, Timing, Motion-Details. Ein kurzer Überblick.</div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delayMs={90}>
            <TiltCard className="rounded-3xl">
              <div className="rounded-3xl overflow-hidden border border-white/15 bg-black/20 backdrop-blur-md">
                <LazyVideo
                  title="Motion Design Showcase (0110.mp4)"
                  subtitle="Große Datei, wird erst beim Klick geladen."
                  poster="/img/portfolio/motion-poster2.jpg"
                  src="/videos/0110.mp4"
                />
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal delayMs={140}>
          <TiltCard className="rounded-3xl">
            <div className="mt-10 rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-10 text-center overflow-hidden relative">
              <div
                className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.07]"
                style={{
                  filter: 'blur(50px)',
                  animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite',
                }}
              />

              <h3 className="text-2xl md:text-3xl font-bold text-white/90">Wenn du so etwas brauchst</h3>
              <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                Schreib mir kurz Ziel, Plattform und welches Material du schon hast. Dann bekommst du eine klare Einschätzung,
                was sinnvoll ist.
              </p>

              <div className="mt-6 flex justify-center gap-2 flex-wrap">
                <PrimaryCTA href="/#request" label="Kurz anfragen" />
                <GhostCTA href="/portfolio">Zurück zum Portfolio</GhostCTA>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </SectionShell>

      <Footer />
    </div>
  );
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs md:text-sm text-white/80">
      <span className="text-white/80">{icon}</span>
      {children}
    </span>
  );
}

/** Loads the big video only after click */
function LazyVideo({
  title,
  subtitle,
  poster,
  src,
}: {
  title: string;
  subtitle: string;
  poster: string;
  src: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl overflow-hidden">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative w-full aspect-video block text-left"
          aria-label="Video laden und abspielen"
        >
          <Image src={poster} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1100px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-black/45 p-4 border border-white/20 backdrop-blur-sm">
              <Play size={22} />
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-sm md:text-base font-semibold text-white/95">{title}</p>
            <p className="text-xs md:text-sm text-white/70">{subtitle}</p>
          </div>
        </button>
      ) : (
        <video src={src} controls autoPlay playsInline preload="metadata" className="w-full h-full object-cover" />
      )}

      <div className="p-5 md:p-6 border-t border-white/15 bg-black/10">
        <div className="text-sm md:text-base font-semibold text-white/90">Was du hier siehst</div>
        <div className="mt-1 text-sm text-white/65 leading-relaxed">
          Timing, Rhythmus, Motion-Details. Wenn du willst, kann ich das auf deinen Stil und deine Plattform anpassen.
        </div>
      </div>
    </div>
  );
}

/* ---------- KEYFRAMES (same as homepage) ---------- */

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
