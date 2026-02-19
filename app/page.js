'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    bg: `radial-gradient(1200px 700px at 15% 15%, rgba(168,85,247,0.60), transparent 60%),
         radial-gradient(900px 700px at 85% 25%, rgba(56,189,248,0.30), transparent 55%),
         linear-gradient(135deg, #070312 0%, #0b0b1a 45%, #02040f 100%)`,
    accent: 'from-violet-200 via-indigo-200 to-cyan-200',
    blobs: ['bg-violet-500/35', 'bg-cyan-500/25', 'bg-fuchsia-500/20'],
  },
  s2: {
    bg: `radial-gradient(1000px 700px at 20% 20%, rgba(34,211,238,0.50), transparent 60%),
         radial-gradient(900px 700px at 90% 10%, rgba(99,102,241,0.38), transparent 55%),
         linear-gradient(135deg, #021019 0%, #07102a 55%, #05010b 100%)`,
    accent: 'from-cyan-200 via-indigo-200 to-violet-200',
    blobs: ['bg-cyan-500/35', 'bg-indigo-500/25', 'bg-emerald-500/15'],
  },
  s3: {
    bg: `radial-gradient(1200px 700px at 15% 10%, rgba(244,114,182,0.45), transparent 60%),
         radial-gradient(900px 700px at 85% 30%, rgba(168,85,247,0.45), transparent 55%),
         linear-gradient(135deg, #120316 0%, #1a0714 55%, #040312 100%)`,
    accent: 'from-pink-200 via-fuchsia-200 to-indigo-200',
    blobs: ['bg-pink-500/28', 'bg-violet-500/28', 'bg-cyan-500/18'],
  },
  s4: {
    bg: `radial-gradient(1100px 700px at 20% 10%, rgba(16,185,129,0.30), transparent 60%),
         radial-gradient(900px 700px at 85% 20%, rgba(59,130,246,0.34), transparent 55%),
         linear-gradient(135deg, #03110a 0%, #0a1020 55%, #04060d 100%)`,
    accent: 'from-emerald-200 via-cyan-200 to-indigo-200',
    blobs: ['bg-emerald-500/22', 'bg-cyan-500/22', 'bg-indigo-500/22'],
  },
  s5: {
    bg: `radial-gradient(1100px 700px at 10% 10%, rgba(250,204,21,0.22), transparent 60%),
         radial-gradient(900px 700px at 90% 25%, rgba(236,72,153,0.30), transparent 55%),
         linear-gradient(135deg, #120b02 0%, #1b0713 55%, #05020a 100%)`,
    accent: 'from-amber-200 via-pink-200 to-violet-200',
    blobs: ['bg-amber-400/18', 'bg-pink-500/22', 'bg-violet-500/22'],
  },
  request: {
    bg: `radial-gradient(1200px 700px at 15% 0%, rgba(99,102,241,0.40), transparent 60%),
         radial-gradient(900px 700px at 90% 15%, rgba(56,189,248,0.25), transparent 55%),
         linear-gradient(135deg, #04040a 0%, #07071a 55%, #04030a 100%)`,
    accent: 'from-indigo-200 via-violet-200 to-cyan-200',
    blobs: ['bg-indigo-500/22', 'bg-cyan-500/18', 'bg-violet-500/18'],
  },
};

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

function TitleGradient({ sceneId, children }) {
  const scene = SCENES[sceneId] ?? SCENES.s1;
  return <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', scene.accent)}>{children}</span>;
}

function PrimaryCTA({ label = 'Projekt anfragen' }) {
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
      { root: null, rootMargin: '-30% 0px -55% 0px', threshold: [0.12, 0.25, 0.4, 0.55, 0.7] }
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
    const obs = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) setShown(true);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return shown;
}

function useCountUp({ target, durationMs = 1200 }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  const start = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [target, durationMs]);

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
      className="relative min-h-screen flex items-center px-5 md:px-16 py-16 md:snap-start scroll-mt-24 overflow-hidden"
      style={{ backgroundImage: scene.bg }}
    >
      <AnimatedNoise />
      <AnimatedBlobs sceneId={id} />
      <div className="relative max-w-6xl mx-auto w-full">{children}</div>
    </section>
  );
}

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
    <div ref={ref} className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8">
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
  const { activeIndex } = useActiveSection(sectionIds);

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
        {/* 01 */}
        <Scene id="s1">
          <div className="flex flex-col items-center text-center gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Digital Projects · Campaigns · Content
              </span>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
                Ich setze digitale Projekte um,
                <span className="block">
                  <TitleGradient sceneId="s1">die sichtbar performen.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="max-w-2xl text-base md:text-xl text-white/80 leading-relaxed">
                Brandbooks, Motiondesign, Webdevelopment und Videoediting – als System, damit Kampagnen nicht nur „gut aussehen“,
                sondern auch funktionieren.
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="flex flex-col items-center gap-3">
                <PrimaryCTA label="Projekt anfragen" />
                <p className="text-sm md:text-base text-white/65 max-w-xl">
                  Ziel, Deadline, Stand. Dann bekommst du eine klare Einschätzung.
                </p>
              </div>
            </Reveal>

            {/* Optional: kleine Bild-Logos/Thumbnails – ersetzt durch Image, damit kein ESLint img Warning */}
            <Reveal delayMs={310}>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
                <MiniTile icon={<BookOpen size={18} />} title="Brandbook" sub="Guidelines & System" />
                <MiniTile icon={<Play size={18} />} title="Motion" sub="Hooks & Templates" />
                <MiniTile icon={<Monitor size={18} />} title="Web" sub="Funnel & UX" />
                <MiniTile icon={<Film size={18} />} title="Video" sub="Cut & Rhythmus" />
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
                  Klarer Look.
                  <span className="block">
                    <TitleGradient sceneId="s2">Klare Message.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Du bekommst ein Setup, das du wiederholen kannst: Branding → Content → Funnel.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-6 space-y-3">
                  {[
                    'Branding, das sofort einzuordnen ist',
                    'Content, der auffällt und hängen bleibt',
                    'Website/Funnel, der Menschen führt',
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
                    <Stripe title="1) Brandbook" desc="Regeln, Look, Tone. Damit alles gleich wirkt." icon={<BookOpen size={18} />} />
                    <Stripe title="2) Motion & Video" desc="Hook, Tempo, Stil. Damit es hängen bleibt." icon={<Play size={18} />} />
                    <Stripe title="3) Web & Funnel" desc="Ein klarer Weg bis zur Anfrage." icon={<Monitor size={18} />} />
                  </div>

                  {/* Beispielbild: du kannst später deine eigenen Thumbs einbauen */}
                  <div className="mt-6 relative rounded-2xl border border-white/15 overflow-hidden h-40 md:h-48">
                    <Image
                      src="/img/home/preview-system.jpg"
                      alt="Preview – Branding, Content, Funnel"
                      fill
                      className="object-cover opacity-80"
                      sizes="(max-width: 768px) 100vw, 520px"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-sm font-semibold text-white/90">
                      Preview-Image (ersetzen)
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-white/55">
                    Bildpfad: <span className="text-white/70">/public/img/home/preview-system.jpg</span>
                  </div>
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
                  Vier Bausteine.
                  <span className="block">
                    <TitleGradient sceneId="s3">Ein Ergebnis.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed">
                  Einzelne Bausteine oder als Komplett-Setup – je nachdem, was du brauchst.
                </p>
              </Reveal>

              <Reveal delayMs={260}>
                <div className="mt-8">
                  <PrimaryCTA label="Passt das?" />
                </div>
              </Reveal>
            </div>

            <div className="space-y-4">
              <BigService
                sceneId="s3"
                icon={<BookOpen size={18} />}
                kicker="Brandbook"
                title="Guidelines, die man wirklich nutzt."
                desc="Farben, Typo, Layoutregeln, Tone of Voice, Beispiele. Damit du konsistent bleibst und skalieren kannst."
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
                desc="Klarer Aufbau, klare CTA, wenig Ablenkung. Damit Klicks zu Anfragen werden."
              />
              <BigService
                sceneId="s3"
                icon={<Film size={18} />}
                kicker="Videoediting"
                title="Schnitt mit Rhythmus."
                desc="Storyline, Timing, Sound, Pace. Damit ein Video nicht nur fertig ist, sondern gut."
              />
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
                  Zahlen,
                  <span className="block">
                    <TitleGradient sceneId="s4">die man einordnen kann.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Wenn du sauberes Branding + Content + Funnel als Einheit denkst, sieht man das am Ergebnis.
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
              <ProofStat sceneId="s4" label="Likes generiert" target={15000000} display="15+ Mio" durationMs={1100} />
              <ProofStat sceneId="s4" label="Klicks auf Social Media erzielt" target={10000000} display="10+ Mio" durationMs={1100} />
              <ProofStat sceneId="s4" label="Abgeschlossene Projekte" target={100} display="100+" durationMs={900} />
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
                    <TitleGradient sceneId="s5">Schnelles Ergebnis.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-xl">
                  Du musst nicht alles perfekt vorbereiten. Wir machen es strukturiert – und liefern sauber.
                </p>
              </Reveal>

              <Reveal delayMs={260}>
                <div className="mt-6 space-y-3">
                  <Step n="1" title="Anfrage" desc="Ziel, Deadline, Stand. (3 Infos reichen)" />
                  <Step n="2" title="Branding & Plan" desc="Brandbook/Storyline, damit alles konsistent ist." />
                  <Step n="3" title="Produktion" desc="Motion, Editing, Web – je nach Paket." />
                  <Step n="4" title="Übergabe" desc="Assets/Files/Setup so, dass du weitermachen kannst." />
                </div>
              </Reveal>

              <Reveal delayMs={340}>
                <div className="mt-8">
                  <PrimaryCTA label="Okay, lass starten" />
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
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

        {/* 06 */}
        <Scene id="request">
          <div className="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div>
                <Reveal>
                  <div className="text-xs uppercase tracking-wide text-white/55">Anfrage</div>
                </Reveal>

                <Reveal delayMs={90}>
                  <h3 className="mt-2 text-2xl md:text-5xl font-extrabold leading-tight">
                    Schick mir kurz dein Vorhaben
                  </h3>
                </Reveal>

                <Reveal delayMs={160}>
                  <p className="mt-4 text-white/80 leading-relaxed max-w-2xl">
                    Ziel, Deadline, Stand. Danach sage ich dir, ob es passt – und was sinnvoll ist.
                  </p>
                </Reveal>

                <Reveal delayMs={240}>
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

                <Reveal delayMs={340}>
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

function MiniTile({ icon, title, sub }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/15 backdrop-blur-md p-4 text-left">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">{icon}</div>
        <div>
          <div className="text-sm font-semibold text-white/90">{title}</div>
          <div className="text-xs text-white/60">{sub}</div>
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
          {title}
          <span className="block text-base md:text-lg mt-2">
            <TitleGradient sceneId={sceneId}>Als System gedacht, nicht als Einzelteil.</TitleGradient>
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

const globalKeyframes = `
@keyframes blob {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  35% { transform: translate3d(40px, -30px, 0) scale(1.10); }
  70% { transform: translate3d(-30px, 20px, 0) scale(0.96); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes blob2 {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  40% { transform: translate3d(-45px, 35px, 0) scale(1.08); }
  80% { transform: translate3d(25px, -20px, 0) scale(0.96); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes blob3 {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  45% { transform: translate3d(35px, 25px, 0) scale(1.12); }
  85% { transform: translate3d(-30px, -18px, 0) scale(0.94); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes shine {
  0% { transform: translateX(-140px) rotate(12deg); opacity: 0.16; }
  45% { opacity: 0.34; }
  100% { transform: translateX(620px) rotate(12deg); opacity: 0.10; }
}
@keyframes noiseMove {
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
