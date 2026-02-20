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
  CheckCircle2,
  FileText,
  Palette,
  Type,
  LayoutTemplate,
  ShieldCheck,
  Timer,
  Download,
  ExternalLink,
  Wand2,
} from 'lucide-react';

/* ---------- DATA ---------- */

const samples = [
  {
    title: 'KfA Brandbook 2026',
    subtitle: 'Brand-Fundament, Typo, Farben, Layoutsystem, Anwendung',
    poster: '/img/brandbooks/kfa-preview.jpg',
    pdf: '/brandbooks/kfa-brandbook-2026.pdf',
    tags: ['Brandbook', 'PDF', 'System'],
  },
  {
    title: 'Paveo Brandguidelines 2025',
    subtitle: 'Logo-Regeln, Farbwelt, Typo, Anwendung im Alltag',
    poster: '/img/brandbooks/mission-preview.jpg',
    pdf: '/brandbooks/mission-brandguidelines-2025.pdf',
    tags: ['Guidelines', 'PDF', 'Praktisch'],
  },
];

/* ---------- SCENE (match homepage vibe) ---------- */

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

/* ---------- UTIL ---------- */

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

function TitleGradient({ children }) {
  return <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', CASE_SCENE.accent)}>{children}</span>;
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

/* ---------- PROGRESS + HALO ---------- */

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

/* ---------- GLOBAL BG ---------- */

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

/* ---------- UI ---------- */

function SectionShell({ children }) {
  return (
    <section className="relative px-5 md:px-16 py-12 md:py-16">
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function PrimaryCTA({ href, label }) {
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

function Pill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs md:text-sm text-white/80">
      <span className="text-white/80">{icon}</span>
      {children}
    </span>
  );
}

function MetaCard({ label, value, icon }) {
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

function MiniCard({ icon, title, bullets }) {
  return (
    <Reveal>
      <TiltCard className="rounded-3xl">
        <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 overflow-hidden relative">
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
              {title}
            </div>
            <Wand2 size={18} className="text-white/55" />
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

function BrandbookSample({ sample }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal>
      <TiltCard className="rounded-3xl">
        <div className="rounded-3xl overflow-hidden border border-white/15 bg-black/20 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Preview */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] bg-black/20">
              <Image
                src={sample.poster}
                alt={sample.title}
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-sm md:text-base font-semibold text-white/95">{sample.title}</div>
                <div className="mt-1 text-xs md:text-sm text-white/70">{sample.subtitle}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sample.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions + lazy PDF */}
            <div className="p-5 md:p-6 border-t lg:border-t-0 lg:border-l border-white/15">
              <div className="text-sm md:text-base font-semibold text-white/90">Darstellung</div>
              <p className="mt-1 text-sm text-white/65 leading-relaxed">
                Preview als Bild (schnell), komplettes Dokument als PDF (vollständig). Das PDF wird erst geladen, wenn du es öffnest.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={sample.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors text-sm font-semibold text-white/90"
                >
                  <ExternalLink size={16} /> PDF öffnen
                </a>
                <a
                  href={sample.pdf}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors text-sm font-semibold text-white/90"
                >
                  <Download size={16} /> PDF herunterladen
                </a>
                <Magnetic strength={10}>
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 transition-colors text-sm font-semibold"
                  >
                    <FileText size={16} /> {open ? 'PDF ausblenden' : 'PDF einblenden'}
                  </button>
                </Magnetic>
              </div>

              {open ? (
                <div className="mt-5 rounded-2xl overflow-hidden border border-white/15 bg-black/30">
                  <div className="relative w-full h-[420px] md:h-[520px]">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`${sample.pdf}#view=FitH`}
                      title={`${sample.title} – PDF`}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/* ---------- PAGE ---------- */

export default function BrandbookPage() {
  return (
    <div className="font-proxima text-white min-h-screen">
      <style>{globalKeyframes}</style>

      <GlobalBackground />
      <GlobalLightLeaks />
      <ScrollProgressBar />
      <CursorHalo />

      <Navbar />

      {/* HERO */}
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
                  <Sparkles size={16} /> Brandbook · Brand Guidelines
                </span>
              </Reveal>

              <Reveal delayMs={90}>
                <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                  Marken, die konsistent bleiben
                  <span className="block">
                    <TitleGradient>auch wenn du nicht daneben stehst.</TitleGradient>
                  </span>
                </h1>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-4 text-white/80 leading-relaxed max-w-xl">
                  Ein Brandbook ist kein „Design-PDF“, sondern ein nutzbares System: Regeln, Beispiele und ein Setup, das Teams im Alltag wirklich anwenden können.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <PrimaryCTA href="/#request" label="Brandbook anfragen" />
                  <GhostCTA href="/portfolio">Portfolio</GhostCTA>
                </div>
              </Reveal>

              <Reveal delayMs={300}>
                <p className="mt-4 text-sm md:text-base text-white/60 max-w-xl">
                  Schick mir kurz: Ziel (Rebrand/Neu), Kanäle (Web/Social/Print) und vorhandenes Material. Dann sage ich dir, was sinnvoll ist und wie wir starten.
                </p>
              </Reveal>

              <Reveal delayMs={360}>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill icon={<Timer size={14} />}>Schneller Start</Pill>
                  <Pill icon={<ShieldCheck size={14} />}>Nutzbar im Alltag</Pill>
                  <Pill icon={<FileText size={14} />}>PDF + Assets</Pill>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
              <TiltCard className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-7 overflow-hidden relative">
                  <div
                    className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.07]"
                    style={{ filter: 'blur(50px)', animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite' }}
                  />

                  <div className="text-xs uppercase tracking-wide text-white/55">Was du am Ende bekommst</div>
                  <ul className="mt-4 space-y-2 text-sm md:text-base text-white/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                      <span>Brandbook als PDF (klar strukturiert, scanbar)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                      <span>Logo-Dateien + Regeln (Do/Don’t, Abstände, Varianten)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                      <span>Farben, Typo, Layoutsystem + echte Beispiele</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                      <span>Optional: Social-Templates / Key Visuals</span>
                    </li>
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* META */}
      <SectionShell>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <MetaCard label="Format" value="PDF + Assets" icon={<FileText size={16} />} />
          <MetaCard label="Inhalt" value="Regeln + Beispiele" icon={<LayoutTemplate size={16} />} />
          <MetaCard label="Design" value="Typo + Farben" icon={<Palette size={16} />} />
          <MetaCard label="Ton" value="Kurz, eindeutig" icon={<Type size={16} />} />
        </div>
      </SectionShell>

      {/* DELIVERABLES */}
      <SectionShell>
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Was im Brandbook drin ist</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Regeln,
            <span className="block">
              <TitleGradient>die man wirklich nutzt.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="mt-4 text-sm md:text-base text-white/70 max-w-2xl leading-relaxed">
            Nicht „alles was geht“, sondern das, was Konsistenz in Web, Social und Print wirklich absichert.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <MiniCard
            icon={<ShieldCheck size={18} />}
            title="Logo-System"
            bullets={['Varianten + Einsatz', 'Schutzzonen & Größen', 'Do/Don’t Beispiele']}
          />
          <MiniCard
            icon={<Type size={18} />}
            title="Typografie"
            bullets={['Schriften + Hierarchie', 'Größen & Abstände', 'Beispiele (Web/Social)']}
          />
          <MiniCard
            icon={<Palette size={18} />}
            title="Farb- & Layoutsystem"
            bullets={['Primär/Sekundärfarben', 'Kontraste/Anwendung', 'Grid, Komponenten, Key Visuals']}
          />
        </div>
      </SectionShell>

      {/* SHOWCASE */}
      <SectionShell>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <Reveal>
              <div className="text-xs uppercase tracking-wide text-white/55">Beispiele</div>
            </Reveal>
            <Reveal delayMs={90}>
              <h2 className="mt-3 text-2xl md:text-5xl font-extrabold tracking-tight">
                Preview + PDF.
                <span className="block">
                  <TitleGradient>Sauber und schnell.</TitleGradient>
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal delayMs={160}>
            <p className="text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
              Preview als Bild, das komplette Brandbook als PDF. PDF wird erst beim Klick geladen.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6">
          {samples.map((s) => (
            <BrandbookSample key={s.pdf} sample={s} />
          ))}
        </div>

        <Reveal delayMs={140}>
          <TiltCard className="rounded-3xl">
            <div className="mt-10 rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-10 text-center overflow-hidden relative">
              <div
                className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.07]"
                style={{ filter: 'blur(50px)', animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite' }}
              />

              <h3 className="text-2xl md:text-3xl font-bold text-white/90">Wenn du Konsistenz willst, ohne Reibung</h3>
              <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                Ich baue dir ein Brand-System, das du als Team sofort nutzen kannst – inklusive Beispielen, Regeln und sauberer Übergabe der Assets.
              </p>

              <div className="mt-6 flex justify-center gap-2 flex-wrap">
                <PrimaryCTA href="/#request" label="Brandbook anfragen" />
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
