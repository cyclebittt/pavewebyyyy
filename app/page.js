'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
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
} from 'lucide-react';

/**
 * Santana-Style: Onepager als Scroll-Funnel
 * - Jede Sektion ist ein „Screen“ (min-h-screen)
 * - Jede Sektion hat eine drastisch andere Farbwelt (INLINE styles -> kein Tailwind purge)
 * - Over-the-top Animationen: moving gradients, blobs, reveal, countup
 * - Copy: kurz, direkt, nicht technisch
 */

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
    bg: `radial-gradient(1200px 700px at 15% 15%, rgba(168,85,247,0.55), transparent 60%),
         radial-gradient(900px 700px at 85% 25%, rgba(56,189,248,0.28), transparent 55%),
         linear-gradient(135deg, #070312 0%, #0b0b1a 45%, #02040f 100%)`,
    accent: 'from-violet-200 via-indigo-200 to-cyan-200',
    blobs: [
      'bg-violet-500/30',
      'bg-cyan-500/25',
      'bg-fuchsia-500/20',
    ],
  },
  s2: {
    bg: `radial-gradient(1000px 700px at 20% 20%, rgba(34,211,238,0.45), transparent 60%),
         radial-gradient(900px 700px at 90% 10%, rgba(99,102,241,0.35), transparent 55%),
         linear-gradient(135deg, #021019 0%, #07102a 55%, #05010b 100%)`,
    accent: 'from-cyan-200 via-indigo-200 to-violet-200',
    blobs: [
      'bg-cyan-500/30',
      'bg-indigo-500/25',
      'bg-emerald-500/15',
    ],
  },
  s3: {
    bg: `radial-gradient(1200px 700px at 15% 10%, rgba(244,114,182,0.40), transparent 60%),
         radial-gradient(900px 700px at 85% 30%, rgba(168,85,247,0.40), transparent 55%),
         linear-gradient(135deg, #120316 0%, #1a0714 55%, #040312 100%)`,
    accent: 'from-pink-200 via-fuchsia-200 to-indigo-200',
    blobs: [
      'bg-pink-500/25',
      'bg-violet-500/25',
      'bg-cyan-500/15',
    ],
  },
  s4: {
    bg: `radial-gradient(1100px 700px at 20% 10%, rgba(16,185,129,0.28), transparent 60%),
         radial-gradient(900px 700px at 85% 20%, rgba(59,130,246,0.30), transparent 55%),
         linear-gradient(135deg, #03110a 0%, #0a1020 55%, #04060d 100%)`,
    accent: 'from-emerald-200 via-cyan-200 to-indigo-200',
    blobs: [
      'bg-emerald-500/20',
      'bg-cyan-500/20',
      'bg-indigo-500/20',
    ],
  },
  s5: {
    bg: `radial-gradient(1100px 700px at 10% 10%, rgba(250,204,21,0.18), transparent 60%),
         radial-gradient(900px 700px at 90% 25%, rgba(236,72,153,0.26), transparent 55%),
         linear-gradient(135deg, #120b02 0%, #1b0713 55%, #05020a 100%)`,
    accent: 'from-amber-200 via-pink-200 to-violet-200',
    blobs: [
      'bg-amber-400/15',
      'bg-pink-500/20',
      'bg-violet-500/20',
    ],
  },
  request: {
    bg: `radial-gradient(1200px 700px at 15% 0%, rgba(99,102,241,0.35), transparent 60%),
         radial-gradient(900px 700px at 90% 15%, rgba(56,189,248,0.22), transparent 55%),
         linear-gradient(135deg, #04040a 0%, #07071a 55%, #04030a 100%)`,
    accent: 'from-indigo-200 via-violet-200 to-cyan-200',
    blobs: [
      'bg-indigo-500/20',
      'bg-cyan-500/15',
      'bg-violet-500/15',
    ],
  },
};

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

function PrimaryCTA({ label = 'Kurz anfragen' }) {
  return (
    <Link
      href="/#request"
      className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
    >
      {label}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function GhostCTA({ href, children }) {
  return (
    <Link
      href={href}
      className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
    >
      {children}
    </Link>
  );
}

function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (best?.target?.id) {
          setActiveId(best.target.id);
          setActiveIndex(sectionIds.indexOf(best.target.id));
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.12, 0.25, 0.4, 0.55, 0.7],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return { activeId, activeIndex };
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

function useCountUp({ target, durationMs = 1200 }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  const start = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const t0 = performance.now();

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);
  return { value, start };
}

function ProgressRail({ activeIndex }) {
  return (
    <div className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="rounded-2xl border border-white/15 bg-black/20 backdrop-blur-md px-3 py-4">
        <div className="text-xs uppercase tracking-wide text-white/60">
          {String(activeIndex + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {SECTIONS.map((s, i) => (
            <a key={s.id} href={`/#${s.id}`} className="group flex items-center gap-2">
              <span
                className={cx(
                  'w-2.5 h-2.5 rounded-full border transition-all',
                  i === activeIndex
                    ? 'bg-white border-white scale-110'
                    : 'bg-white/10 border-white/25 group-hover:border-white/50'
                )}
              />
              <span className={cx('text-xs', i === activeIndex ? 'text-white/85' : 'text-white/45')}>
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Scene({ id, children }) {
  const scene = SCENES[id] ?? SCENES.s1;

  return (
    <section
      id={id}
      className={cx(
        'relative min-h-screen flex items-center px-5 md:px-16 py-16',
        'md:snap-start scroll-mt-24 overflow-hidden'
      )}
      style={{
        backgroundImage: scene.bg,
      }}
    >
      <AnimatedNoise />
      <AnimatedBlobs sceneId={id} />
      <div className="relative max-w-6xl mx-auto w-full">{children}</div>
    </section>
  );
}

/** Over-the-top animated noise overlay */
function AnimatedNoise() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27320%27 viewBox=%270 0 320 320%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27320%27 height=%27320%27 filter=%27url(%23n)%27 opacity=%270.35%27/%3E%3C/svg%3E")',
        backgroundSize: '220px 220px',
        animation: 'noiseMove 7s linear infinite',
      }}
    />
  );
}

/** Big floating blobs per scene */
function AnimatedBlobs({ sceneId }) {
  const scene = SCENES[sceneId] ?? SCENES.s1;
  const [b1, b2, b3] = scene.blobs;

  return (
    <>
      <div className={cx('pointer-events-none absolute -top-24 -left-28 h-[34rem] w-[54rem] rounded-full blur-[120px] animate-[blob_10s_ease-in-out_infinite]', b1)} />
      <div className={cx('pointer-events-none absolute top-1/3 -right-28 h-[34rem] w-[54rem] rounded-full blur-[120px] animate-[blob2_12s_ease-in-out_infinite]', b2)} />
      <div className={cx('pointer-events-none absolute bottom-[-10rem] left-1/4 h-[28rem] w-[48rem] rounded-full blur-[120px] animate-[blob3_14s_ease-in-out_infinite]', b3)} />
    </>
  );
}

function TitleGradient({ sceneId, children }) {
  const scene = SCENES[sceneId] ?? SCENES.s1;
  return (
    <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', scene.accent)}>
      {children}
    </span>
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

function ProofStat({ sceneId, label, target, display, durationMs = 1200 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  const { value, start } = useCountUp({ target, durationMs });

  useEffect(() => {
    if (shown) start();
  }, [shown, start]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8"
    >
      <div className="absolute -left-24 top-0 h-full w-56 rotate-12 bg-white/15 blur-2xl opacity-30 animate-[shine_2.6s_ease-in-out_infinite]" />
      <div className="text-xs uppercase tracking-wide text-white/55">Proof</div>
      <div className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight">
        <TitleGradient sceneId={sceneId}>{display ?? value.toLocaleString('de-DE')}</TitleGradient>
      </div>
      <div className="mt-2 text-sm md:text-base text-white/80">{label}</div>
    </div>
  );
}

export default function Home() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const { activeId, activeIndex } = useActiveSection(sectionIds);

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
      <Navbar />
      <ProgressRail activeIndex={activeIndex} />

      <main className="md:snap-y md:snap-mandatory">
        {/* 01: HERO */}
        <Scene id="s1">
          <div className="flex flex-col items-center text-center gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Digital Projects · Campaigns · Content
              </span>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
                Ich baue digitale Projekte,
                <span className="block">
                  <TitleGradient sceneId="s1">die sofort funktionieren.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="max-w-2xl text-base md:text-xl text-white/80 leading-relaxed">
                Brandbooks, Motiondesign, Webdevelopment und Videoediting – so, dass du am Ende ein Setup hast,
                das du wirklich einsetzen kannst.
              </p>
            </Reveal>

            <Reveal delayMs={220}>
              <div className="flex flex-col items-center gap-3">
                <PrimaryCTA label="Projekt anfragen" />
                <p className="text-sm md:text-base text-white/65 max-w-xl">
                  Schreib Ziel, Deadline und Stand. Dann bekommst du eine klare Einschätzung.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={280}>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <Pill icon={<BookOpen size={14} />}>Brandbook</Pill>
                <Pill icon={<Play size={14} />}>Motion</Pill>
                <Pill icon={<Monitor size={14} />}>Web</Pill>
                <Pill icon={<Film size={14} />}>Video</Pill>
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* 02: VALUE / WAS DU BEKOMMST */}
        <Scene id="s2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">02 — Was du bekommst</div>
              </Reveal>

              <Reveal delayMs={80}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Klarer Look.
                  <span className="block">
                    <TitleGradient sceneId="s2">Klare Message.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={140}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Ich helfe dir dabei, dass deine Kampagne nicht „nice“ ist, sondern verstanden wird – und dass das Setup
                  in der Praxis läuft.
                </p>
              </Reveal>

              <Reveal delayMs={220}>
                <div className="mt-6 space-y-3">
                  {[
                    'Branding, das man sofort einordnen kann',
                    'Content/Motion, der im Feed auffällt',
                    'Website/Funnel, der aus Klicks Anfragen macht',
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                      <span className="text-sm md:text-base text-white/80">{t}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delayMs={300}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <PrimaryCTA label="Kurz anfragen" />
                  <GhostCTA href="/portfolio">
                    <ExternalLink size={18} /> Portfolio
                  </GhostCTA>
                </div>
              </Reveal>
            </div>

            {/* Catchy visual panel */}
            <Reveal delayMs={120}>
              <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="text-xs uppercase tracking-wide text-white/55">Was du hier siehst</div>
                  <div className="mt-3 text-xl md:text-3xl font-bold text-white/90">
                    Jede Sektion ist ein Argument.
                  </div>
                  <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                    Statt Textwänden bekommst du Screens, die dich Schritt für Schritt überzeugen.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3">
                    <Stripe title="Brandbook" desc="Regeln, Tone, Look – ein System, kein Moodboard." icon={<BookOpen size={18} />} />
                    <Stripe title="Motion & Video" desc="Hook, Tempo, Stil – damit es hängen bleibt." icon={<Play size={18} />} />
                    <Stripe title="Web & Funnel" desc="Klarer Weg bis zur Anfrage." icon={<Monitor size={18} />} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* 03: LEISTUNGEN – wie Santana: groß, plakativ */}
        <Scene id="s3">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">03 — Leistungen</div>
              </Reveal>

              <Reveal delayMs={80}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Vier Bausteine,
                  <span className="block">
                    <TitleGradient sceneId="s3">ein sauberes Ergebnis.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={140}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed">
                  Du kannst einzelne Bausteine buchen – oder das Ganze als System.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-8">
                  <PrimaryCTA label="Passt das zu dir?" />
                </div>
              </Reveal>
            </div>

            <div className="space-y-4">
              <BigService
                sceneId="s3"
                icon={<BookOpen size={18} />}
                kicker="Brandbook"
                title="Brand Guidelines, die man nutzen kann."
                desc="Farben, Typo, Layoutregeln, Tone of Voice, Beispiele. Damit jeder Content gleich aussieht – und du skalieren kannst."
              />
              <BigService
                sceneId="s3"
                icon={<Play size={18} />}
                kicker="Motiondesign"
                title="Motion, das im Feed auffällt."
                desc="Kurzformate, Motion Graphics, Hook-Varianten, Templates. Damit du nicht jedes Mal bei Null anfängst."
              />
              <BigService
                sceneId="s3"
                icon={<Monitor size={18} />}
                kicker="Webdevelopment"
                title="Websites/Funnels, die führen."
                desc="Eine klare Nutzerführung, wenig Ablenkung, klare CTA – damit Klicks zu Anfragen werden."
              />
              <BigService
                sceneId="s3"
                icon={<Film size={18} />}
                kicker="Videoediting"
                title="Schnitt mit Rhythmus."
                desc="Storyline, Timing, Sound, Pace. So, dass ein Video nicht nur „fertig“, sondern gut ist."
              />
            </div>
          </div>
        </Scene>

        {/* 04: PROOF – animierte Zahlen */}
        <Scene id="s4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">04 — Proof</div>
              </Reveal>

              <Reveal delayMs={80}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Reichweite ist kein Ziel.
                  <span className="block">
                    <TitleGradient sceneId="s4">Aber ein Beleg.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={140}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Wenn du willst, dass es “clean” aussieht und gleichzeitig performt, brauchst du ein System aus Branding,
                  Content und einem klaren Flow.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <GhostCTA href="/portfolio">
                    <ExternalLink size={18} /> Portfolio ansehen
                  </GhostCTA>
                  <PrimaryCTA label="Anfrage schicken" />
                </div>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <ProofStat sceneId="s4" label="Likes generiert" target={15000000} display="15+ Mio" durationMs={1100} />
              <ProofStat sceneId="s4" label="Klicks auf Social Media erzielt" target={10000000} display="10+ Mio" durationMs={1100} />
              <ProofStat sceneId="s4" label="Abgeschlossene Projekte" target={100} display="100+" durationMs={900} />
            </div>
          </div>
        </Scene>

        {/* 05: ABLAUF – groß, klar, “funnel” */}
        <Scene id="s5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">05 — Ablauf</div>
              </Reveal>

              <Reveal delayMs={80}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Kurzer Start.
                  <span className="block">
                    <TitleGradient sceneId="s5">Schnelle Umsetzung.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={140}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Du musst nicht alles perfekt vorbereiten. Wir starten schlank – und machen es dann sauber.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-6 space-y-3">
                  <Step n="1" title="Anfrage" desc="Ziel, Deadline, Stand. (3 Infos reichen)" />
                  <Step n="2" title="Konzept & Look" desc="Brandbook/Storyline, damit alles konsistent ist." />
                  <Step n="3" title="Produktion" desc="Motion, Editing, Web – je nachdem, was du brauchst." />
                  <Step n="4" title="Übergabe" desc="Assets/Files/Setup so, dass du weitermachen kannst." />
                </div>
              </Reveal>

              <Reveal delayMs={320}>
                <div className="mt-8">
                  <PrimaryCTA label="Okay, lass starten" />
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={160}>
              <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8">
                <div className="text-xs uppercase tracking-wide text-white/55">Shortcut</div>
                <div className="mt-3 text-xl md:text-3xl font-bold text-white/90">
                  Ein Satz reicht fürs erste.
                </div>
                <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                  “Wir wollen X bis Datum Y und haben gerade Z.” Danach klären wir den Rest.
                </p>
                <div className="mt-6 flex gap-2 flex-wrap">
                  <GhostCTA href="/portfolio">
                    <ExternalLink size={18} /> Beispiele
                  </GhostCTA>
                  <PrimaryCTA label="Anfrage" />
                </div>
              </div>
            </Reveal>
          </div>
        </Scene>

        {/* 06: REQUEST */}
        <Scene id="request">
          <div className="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div>
                <Reveal>
                  <div className="text-xs uppercase tracking-wide text-white/55">Anfrage</div>
                </Reveal>

                <Reveal delayMs={80}>
                  <h3 className="mt-2 text-2xl md:text-5xl font-extrabold leading-tight">
                    Schick mir kurz dein Vorhaben
                  </h3>
                </Reveal>

                <Reveal delayMs={140}>
                  <p className="mt-4 text-white/80 leading-relaxed max-w-2xl">
                    Ziel, Deadline, Stand. Danach sage ich dir, ob es passt – und was sinnvoll ist.
                  </p>
                </Reveal>

                <Reveal delayMs={220}>
                  <div className="mt-6 space-y-3">
                    {[
                      'Ziel (was soll passieren?)',
                      'Deadline (bis wann?)',
                      'Stand (Branding/Material/Beispiele?)',
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
                    <a
                      href="mailto:info@paveconsultings.com?subject=Projektanfrage&body=Ziel:%0D%0ADeadline:%0D%0AStand:%0D%0A"
                      className="px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center gap-2"
                    >
                      <Mail size={18} /> Per Mail
                    </a>

                    <GhostCTA href="/portfolio">
                      <ExternalLink size={18} /> Erst Portfolio
                    </GhostCTA>
                  </div>
                </Reveal>
              </div>

              <Reveal delayMs={200}>
                <div className="rounded-3xl border border-white/15 bg-black/25 p-6">
                  <div className="text-sm md:text-base font-semibold text-white/90">Copy/Paste</div>
                  <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/85 whitespace-pre-wrap leading-relaxed">
{`Ziel:
Deadline:
Stand:
Budgetrahmen (optional):
Link/Beispiele (optional):`}
                  </div>
                  <div className="mt-4 text-sm text-white/60">
                    Das reicht komplett für eine erste Einschätzung.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Scene>
      </main>

      <Footer />
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

function BigService({ sceneId, icon, kicker, title, desc }) {
  return (
    <Reveal>
      <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8 overflow-hidden relative">
        <div className="absolute -left-24 top-0 h-full w-56 rotate-12 bg-white/15 blur-2xl opacity-25 animate-[shine_2.6s_ease-in-out_infinite]" />
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-white/60">
            <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">{icon}</span>
            {kicker}
          </div>
          <Wand2 size={18} className="text-white/60" />
        </div>

        <div className="mt-4 text-2xl md:text-4xl font-extrabold leading-tight text-white">
          {title.split('. ')[0]}.
          <span className="block">
            <TitleGradient sceneId={sceneId}>{title.includes('.') ? title.split('. ').slice(1).join('. ') : ''}</TitleGradient>
          </span>
        </div>

        <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">{desc}</p>

        <div className="mt-6">
          <Link href="/#request" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors font-semibold">
            Kurz anfragen <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

function Step({ n, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/20 backdrop-blur-md p-4 md:p-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-extrabold">
          {n}
        </div>
        <div className="text-sm md:text-base font-semibold text-white/90">{title}</div>
      </div>
      <div className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</div>
    </div>
  );
}

/** CSS keyframes (keine extra libs nötig) */
const globalKeyframes = `
@keyframes blob {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  35% { transform: translate3d(40px, -30px, 0) scale(1.08); }
  70% { transform: translate3d(-30px, 20px, 0) scale(0.98); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes blob2 {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  40% { transform: translate3d(-45px, 35px, 0) scale(1.06); }
  80% { transform: translate3d(25px, -20px, 0) scale(0.98); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes blob3 {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  45% { transform: translate3d(35px, 25px, 0) scale(1.10); }
  85% { transform: translate3d(-30px, -18px, 0) scale(0.96); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes shine {
  0% { transform: translateX(-120px) rotate(12deg); opacity: 0.18; }
  45% { opacity: 0.35; }
  100% { transform: translateX(520px) rotate(12deg); opacity: 0.12; }
}
@keyframes noiseMove {
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
