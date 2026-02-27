'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Shield,
  Sparkles,
  FileText,
  MessageSquare,
  Repeat,
  Package,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

/* ---------- CONFIG ---------- */

const WHATSAPP_E164 = '4916095757167';
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(
  `Hi Leon,\n\nKurz zu meinem Vorhaben:\n- Branche:\n- Ziel (mehr Anfragen / sauberer Auftritt / beides):\n- Deadline:\n- Link zur aktuellen Website (falls vorhanden):\n\nDanke!`
)}`;

const PORTFOLIO_MOTION = 'https://www.leonseitz.com/portfolio/motion-design';
const PORTFOLIO_KFA = 'https://www.leonseitz.com/portfolio/kirche-fundraising';

/* ---------- SCENE ---------- */

const SCENE = {
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
  return <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', SCENE.accent)}>{children}</span>;
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
          backgroundColor: SCENE.base,
          backgroundImage: `${SCENE.g1}, ${SCENE.g2}`,
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
      {SCENE.blobs.map((b, i) => (
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
}

/* ---------- UI ---------- */

function SectionShell({ id, children, tight = false }) {
  return (
    <section id={id} className={cx('relative px-5 md:px-16', tight ? 'py-10 md:py-12' : 'py-12 md:py-16')}>
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function Card({ children, className = '' }) {
  return <div className={cx('rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md', className)}>{children}</div>;
}

function Pill({ children, tone = 'neutral' }) {
  const toneCls =
    tone === 'free'
      ? 'border-emerald-300/25 bg-emerald-500/10 text-emerald-100'
      : 'border-white/15 bg-white/10 text-white/85';
  return <span className={cx('inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm border', toneCls)}>{children}</span>;
}

function PackageMetaLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 underline underline-offset-4 text-white/70 hover:text-white transition-colors"
    >
      {children} <ExternalLink size={14} className="text-white/55" />
    </a>
  );
}

/* ---------- TRUST BAR ---------- */

const TRUST_ITEMS = [
  { icon: <Shield size={16} />, label: 'Sprint 0 kostenlos', sub: 'Erst sehen, dann entscheiden' },
  { icon: <Repeat size={16} />, label: 'Revisionsrunden pro Sprint', sub: '2 Runden inkludiert' },
  { icon: <FileText size={16} />, label: 'Vollständige Übergabe', sub: 'Alle Dateien, Zugänge, Dokumentation' },
  { icon: <MessageSquare size={16} />, label: 'Antwort innerhalb 24 h', sub: 'Werktags' },
];

function TrustBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 flex items-start gap-3"
        >
          <span className="text-white/60 mt-0.5 shrink-0">{item.icon}</span>
          <div>
            <div className="text-sm font-semibold text-white/90 leading-tight">{item.label}</div>
            <div className="mt-0.5 text-xs text-white/55 leading-tight">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- ROADMAP ---------- */

const ROADMAP_STEPS = [
  {
    id: 'sprint0',
    label: 'Sprint 0',
    title: 'Analyse + Entwurf',
    duration: '2–3 Tage',
    tag: 'Kostenlos',
    tagTone: 'free',
    desc: 'Ich schaue mir deine aktuelle Situation an und liefere eine strukturierte Einschätzung: Was funktioniert, was blockiert Anfragen, wie ein sinnvoller Aufbau aussehen könnte.',
    deliverables: [
      '3–5 konkrete Optimierungspunkte schriftlich',
      'Erster Seiten-Aufbau als Entwurf (Wireframe-Ebene)',
      'Einschätzung, welches Paket zu deinem Ziel passt',
    ],
    revisions: null,
    note: 'Kein Zahlungsziel. Du entscheidest danach, ob du weitermachst.',
  },
  {
    id: 'sprint1',
    label: 'Sprint 1',
    title: 'Erste lauffähige Version',
    duration: '5–7 Tage',
    tag: 'Zahlungsziel 1 nach Review — 30 %',
    tagTone: 'neutral',
    desc: 'Du bekommst eine klickbare Version zum Testen. Aufbau, Navigation, Texte, Design – alles drin. Du klickst sie durch, gibst Feedback, wir besprechen Anpassungen.',
    deliverables: [
      'Lauffähige Website (nicht nur Mockup)',
      'Alle Hauptseiten aufgebaut',
      'Mobile-Version enthalten',
    ],
    revisions: '2 Revisionsrunden nach dem Review inkludiert',
    note: 'Zahlung erst nach Review – nicht vorher.',
  },
  {
    id: 'sprint2',
    label: 'Sprint 2',
    title: 'Feinschliff',
    duration: '3–5 Tage',
    tag: 'Zahlungsziel 2 nach Review — 50 %',
    tagTone: 'neutral',
    desc: 'Alle Punkte aus dem ersten Review werden umgesetzt. Texte, Details, Performance, Kleinigkeiten. Danach nochmal ein Review – erst wenn du freigibst, geht es weiter.',
    deliverables: [
      'Alle Feedback-Punkte aus Sprint 1 umgesetzt',
      'SEO-Grundlagen (Titel, Meta, Struktur)',
      'Ladezeit geprüft und optimiert',
    ],
    revisions: '1 weitere Revisionsrunde inkludiert',
    note: 'Zahlung erst nach deiner Freigabe.',
  },
  {
    id: 'sprint3',
    label: 'Sprint 3',
    title: 'Go-Live und Übergabe',
    duration: '1–2 Tage',
    tag: 'Zahlungsziel 3 nach Übergabe — 20 %',
    tagTone: 'neutral',
    desc: 'Die Website geht live. Du bekommst alle Dateien, Zugänge und eine Dokumentation – so, dass du eigenständig Texte und Bilder anpassen kannst.',
    deliverables: [
      'Live-Schaltung auf deiner Domain',
      'Alle Quelldateien und Zugänge',
      'Kurze Übergabe-Dokumentation',
    ],
    revisions: null,
    note: 'Letzte Zahlung erst nach vollständiger Übergabe.',
  },
];

function RoadmapTimeline() {
  const [openStep, setOpenStep] = useState(null);
  const [doneSteps, setDoneSteps] = useState(new Set());

  function toggleDone(id, e) {
    e.stopPropagation();
    setDoneSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleOpen(id) {
    setOpenStep((prev) => (prev === id ? null : id));
  }

  return (
    <div className="relative">
      <div className="absolute left-5 top-5 bottom-5 w-[2px] bg-gradient-to-b from-emerald-400/40 via-violet-400/30 to-white/10 md:left-6" />

      <div className="space-y-3">
        {ROADMAP_STEPS.map((step, i) => {
          const done = doneSteps.has(step.id);
          const open = openStep === step.id;
          const isFree = step.tagTone === 'free';

          return (
            <div key={step.id} className="relative flex items-start gap-4 md:gap-5">
              {/* Node / done toggle */}
              <button
                onClick={(e) => toggleDone(step.id, e)}
                title={done ? 'Als offen markieren' : 'Als erledigt markieren'}
                className={cx(
                  'relative z-10 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl border flex items-center justify-center transition-all duration-300',
                  done
                    ? 'border-emerald-300/40 bg-emerald-500/20 shadow-[0_0_18px_rgba(52,211,153,0.25)]'
                    : isFree
                      ? 'border-emerald-300/20 bg-emerald-500/8 hover:bg-emerald-500/15'
                      : 'border-white/15 bg-white/8 hover:bg-white/14'
                )}
              >
                <CheckCircle2 size={20} className={cx('transition-colors duration-300', done ? 'text-emerald-300' : 'text-white/25')} />
              </button>

              {/* Card */}
              <div
                className={cx(
                  'flex-1 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer',
                  done ? 'border-emerald-300/20 bg-emerald-500/6' : 'border-white/10 bg-white/5',
                  open ? 'border-white/20 bg-white/8' : ''
                )}
                onClick={() => toggleOpen(step.id)}
              >
                {/* Header row */}
                <div className="px-4 py-4 md:px-5 md:py-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={cx('text-xs uppercase tracking-wide font-semibold', isFree ? 'text-emerald-300/80' : 'text-white/45')}>
                      {step.label}
                    </span>
                    {step.tag && <Pill tone={step.tagTone}>{step.tag}</Pill>}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className={cx('text-sm md:text-base font-semibold transition-colors', done ? 'text-white/50 line-through' : 'text-white/90')}>
                      {step.title}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-white/45 flex items-center gap-1">
                        <Clock size={13} /> {step.duration}
                      </span>
                      <span className={cx('text-white/40 text-xs transition-transform duration-200', open ? 'rotate-180' : '')}>▾</span>
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {open && (
                  <div className="px-4 pb-5 md:px-5 md:pb-5 border-t border-white/8 pt-4 space-y-4">
                    <p className="text-sm text-white/70 leading-relaxed">{step.desc}</p>

                    <div>
                      <div className="text-xs uppercase tracking-wide text-white/45 mb-2">Was du bekommst</div>
                      <ul className="space-y-1.5">
                        {step.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-sm text-white/80">
                            <Package size={14} className="mt-0.5 shrink-0 text-white/50" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {step.revisions && (
                      <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                        <Repeat size={14} className="text-white/50 mt-0.5 shrink-0" />
                        <span className="text-xs text-white/70">{step.revisions}</span>
                      </div>
                    )}

                    {step.note && (
                      <div className={cx(
                        'rounded-xl border px-3 py-2.5 text-xs leading-relaxed',
                        isFree
                          ? 'border-emerald-300/20 bg-emerald-500/8 text-emerald-100/80'
                          : 'border-white/10 bg-white/5 text-white/60'
                      )}>
                        {step.note}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-white/40 pl-14 md:pl-17">
        Node anklicken zum Abhaken. Zeile anklicken für Details.
      </p>
    </div>
  );
}

/* ---------- CALC ---------- */

function money(n) {
  const v = Number.isFinite(n) ? n : 0;
  return Math.round(v);
}

function calcPayments(total) {
  const t = Math.max(0, Number(total) || 0);
  return {
    p1: money(t * 0.3),
    p2: money(t * 0.5),
    p3: money(t * 0.2),
  };
}

function getRecommendation(amount) {
  const a = Number(amount) || 0;
  if (a <= 550) return { key: 'einstieg', text: 'Für diesen Rahmen passt der Einstieg.' };
  if (a <= 900) return { key: 'standard', text: 'Für diesen Rahmen passt der Standard.' };
  return { key: 'komplett', text: 'Für diesen Rahmen passt das Komplett-Paket.' };
}

/* ---------- FAQ ---------- */

const FAQ_ITEMS = [
  {
    q: 'Was, wenn mir die erste Version nicht gefällt?',
    a: 'Sprint 0 ist kostenlos – du siehst den Entwurf, bevor irgendeine Zahlung fällig wird. In Sprint 1 sind 2 Revisionsrunden inkludiert. Du gibst Feedback, ich setze um. Erst nach deiner Freigabe kommt das nächste Zahlungsziel.',
  },
  {
    q: 'Was passiert, wenn wir uns mitten im Projekt nicht einigen?',
    a: 'Da jedes Zahlungsziel an ein Review gebunden ist, entstehen keine offenen Posten. Du zahlst nur für das, was du freigegeben hast. Wenn du nach Sprint 1 nicht weitermachen willst, endet das Projekt dort.',
  },
  {
    q: 'Was, wenn ich später etwas ändern will?',
    a: 'Kleinere Anpassungen nach Go-Live: entweder als kleines Extra-Projekt oder monatliche Betreuung ab 150 €/Monat. Du bekommst bei Übergabe eine Dokumentation, damit du Texte und Bilder selbst anpassen kannst.',
  },
  {
    q: 'Was, wenn mein Budget knapp ist?',
    a: 'Sprint 0 ist kostenlos. Danach schauen wir gemeinsam, welches Paket sinnvoll ist. Wenn das Budget nicht passt, sage ich das direkt – kein Umweg.',
  },
  {
    q: 'Wie viel muss ich vorbereiten, bevor wir starten?',
    a: 'Branche, Ziel, Deadline und ein Link zur aktuellen Website. Das reicht für Sprint 0. Alles Weitere – Texte, Bilder, Struktur – klären wir gemeinsam im Prozess.',
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={cx(
              'rounded-2xl border transition-all duration-200 cursor-pointer',
              isOpen ? 'border-white/20 bg-white/8' : 'border-white/10 bg-white/5 hover:border-white/15'
            )}
            onClick={() => setOpen(isOpen ? null : i)}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="text-sm md:text-base font-semibold text-white/90">{item.q}</span>
              <span className={cx('text-white/40 text-sm shrink-0 transition-transform duration-200', isOpen ? 'rotate-180' : '')}>▾</span>
            </div>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-white/70 leading-relaxed border-t border-white/8 pt-3">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- PAGE ---------- */

export default function ProzessPage() {
  const [amount, setAmount] = useState(700);

  const payments = useMemo(() => calcPayments(amount), [amount]);
  const rec = useMemo(() => getRecommendation(amount), [amount]);

  return (
    <div className="font-proxima text-white min-h-screen">
      <style>{globalKeyframes}</style>

      <GlobalBackground />
      <GlobalLightLeaks />
      <ScrollProgressBar />
      <CursorHalo />

      <Navbar />

      {/* HERO */}
      <section className="relative px-5 md:px-16 pt-28 md:pt-36 pb-8 md:pb-10">
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center gap-5">
            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Pill tone="free">Sprint 0 kostenlos – erst sehen, dann entscheiden</Pill>
                <Pill>
                  <span className="inline-flex items-center gap-2">
                    <Sparkles size={16} /> Zahlungsziele nach Review, nicht vorher
                  </span>
                </Pill>
              </div>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
                Du siehst die erste Version.
                <span className="block">
                  <TitleGradient>Erst dann geht&apos;s weiter.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="max-w-2xl text-base md:text-xl text-white/80 leading-relaxed">
                Vier Sprints mit Review-Gates: Du gibst nach jedem Sprint Feedback. Das nächste Zahlungsziel kommt erst nach deiner Freigabe.
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <TrustBar />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <SectionShell id="roadmap" tight>
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Ablauf</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Vier Sprints.
            <span className="block">
              <TitleGradient>Jeder mit klarem Ergebnis und Review.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <Reveal delayMs={140}>
          <p className="mt-4 text-white/70 text-base max-w-2xl leading-relaxed">
            Kein Ablauf auf Vertrauensbasis. Jeder Sprint endet mit einem konkreten Ergebnis, das du siehst und bewertest – bevor das nächste Zahlungsziel ausgelöst wird. Klick auf einen Sprint für Details.
          </p>
        </Reveal>

        <div className="mt-8">
          <Card className="p-5 md:p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              <Pill tone="free">Sprint 0: Kostenlos</Pill>
              <Pill>2 Revisionsrunden in Sprint 1</Pill>
              <Pill>Zahlung immer nach Review</Pill>
            </div>
            <RoadmapTimeline />
          </Card>
        </div>

        {/* Timeline summary strip */}
        <Reveal delayMs={80}>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {ROADMAP_STEPS.map((step) => (
              <div key={step.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className={cx('text-xs font-semibold uppercase tracking-wide mb-1', step.tagTone === 'free' ? 'text-emerald-300/80' : 'text-white/45')}>
                  {step.label}
                </div>
                <div className="text-sm text-white/80 font-semibold leading-tight">{step.title}</div>
                <div className="mt-1 text-xs text-white/45 flex items-center gap-1">
                  <Clock size={11} /> {step.duration}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* RECHNER */}
      <SectionShell id="rechner">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Rahmen wählen</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Was würdest du für deine Website investieren?
            <span className="block">
              <TitleGradient>Ich zeige dir, was in diesem Rahmen möglich ist.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 md:gap-6">
          <Card className="p-6 md:p-7">
            <div className="text-xs uppercase tracking-wide text-white/55">Dein ungefähres Budget für die Website</div>

            <div className="mt-4">
              <input
                type="range"
                min={400}
                max={1500}
                step={50}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-white"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-white/45">
                <span>400 €</span>
                <span>1.500 €</span>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[76px] md:text-[92px] font-extrabold tracking-tight leading-none">
                {amount} <span className="text-white/55">€</span>
              </div>
              <div className="mt-2 text-base md:text-lg text-white/80 font-semibold">{rec.text}</div>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4">
              <div className="text-xs uppercase tracking-wide text-emerald-100/90">Start ist kostenlos</div>
              <div className="mt-2 text-sm text-white/75 leading-relaxed">
                Sprint 0 (Analyse + Entwurf) kostet nichts. Danach entscheidest du, ob und mit welchem Paket es weitergeht.
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-7">
            <div className="text-xs uppercase tracking-wide text-white/55">Zahlungsziel 1 — nach Sprint-Review (30 %)</div>
            <div className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
              {payments.p1} <span className="text-white/55">€</span>
            </div>
            <div className="mt-1 text-sm text-white/70">Fällig nach Sprint 1 – du hast die erste Version gesehen und freigegeben.</div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-white/55">Zahlungsziel 2 — nach Sprint-Review (50 %)</div>
                <div className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
                  {payments.p2} <span className="text-white/55">€</span>
                </div>
                <div className="mt-1 text-sm text-white/70">Fällig nach Sprint 2 – Feinschliff abgenommen, alles freigegeben.</div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-white/55">Zahlungsziel 3 — nach Übergabe (20 %)</div>
                <div className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
                  {payments.p3} <span className="text-white/55">€</span>
                </div>
                <div className="mt-1 text-sm text-white/70">Fällig nach Go-Live und vollständiger Datei-Übergabe.</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/12 bg-white/5 p-4 text-sm text-white/75">
              Jedes Zahlungsziel ist an ein Review gebunden. Kein Geld vorab für Leistungen, die du noch nicht gesehen hast.
            </div>
          </Card>
        </div>
      </SectionShell>

      {/* PAKETE */}
      <SectionShell id="pakete">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Pakete</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Was brauchst du wirklich?
            <span className="block">
              <TitleGradient>Schau auf deine Situation, nicht auf die Feature-Liste.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <div className="mt-6 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white/75">
          Der Sprint-Ablauf ist in allen Paketen identisch. Unterschied: Umfang der Seiten und enthaltene Extras.
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <Reveal>
            <Card className={cx('p-6 md:p-7 transition-all', rec.key === 'komplett' ? 'ring-1 ring-inset ring-violet-300/35 border-white/20 opacity-100' : 'opacity-55')}>
              <div className="text-xs uppercase tracking-wide text-white/55">Komplett</div>
              <div className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                ab 1.100 <span className="text-white/55">€</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" /><span>Website bis 5 Seiten</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" /><span>Brandbook (Farben, Typo, Layoutregeln)</span></li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>1 Motion-Element – <PackageMetaLink href={PORTFOLIO_MOTION}>Beispiel</PackageMetaLink></span>
                </li>
              </ul>
              <div className="mt-5 text-sm text-white/70 flex items-center gap-2"><Clock size={16} className="text-white/60" /> ca. 3 Wochen</div>
            </Card>
          </Reveal>

          <Reveal delayMs={80}>
            <Card className={cx('p-6 md:p-7 transition-all', rec.key === 'standard' ? 'ring-1 ring-inset ring-violet-300/35 border-white/20 opacity-100' : 'opacity-55')}>
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-wide text-white/55">Standard</div>
                <Pill>Wird am häufigsten gewählt</Pill>
              </div>
              <div className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                ab 700 <span className="text-white/55">€</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" /><span>Website bis 5 Seiten</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" /><span>Branding-Grundlage (Farben, Schrift, Logo)</span></li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>Aufbau wie im Case – <PackageMetaLink href={PORTFOLIO_KFA}>Beispiel</PackageMetaLink></span>
                </li>
              </ul>
              <div className="mt-5 text-sm text-white/70 flex items-center gap-2"><Clock size={16} className="text-white/60" /> 10–14 Tage</div>
            </Card>
          </Reveal>

          <Reveal delayMs={120}>
            <Card className={cx('p-6 md:p-7 transition-all', rec.key === 'einstieg' ? 'ring-1 ring-inset ring-violet-300/35 border-white/20 opacity-100' : 'opacity-55')}>
              <div className="text-xs uppercase tracking-wide text-white/55">Einstieg</div>
              <div className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                ab 400 <span className="text-white/55">€</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" /><span>Eine Landingpage</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" /><span>Klare Struktur, ein CTA</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" /><span>Mobil optimiert</span></li>
              </ul>
              <div className="mt-5 text-sm text-white/70 flex items-center gap-2"><Clock size={16} className="text-white/60" /> ~7 Tage</div>
            </Card>
          </Reveal>
        </div>
      </SectionShell>

      {/* FAQ / EINWÄNDE */}
      <SectionShell id="einwaende" tight>
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Häufige Fragen</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight">
            Was du wissen willst,
            <span className="block"><TitleGradient>bevor du anfragst.</TitleGradient></span>
          </h2>
        </Reveal>

        <div className="mt-6">
          <FAQAccordion />
        </div>
      </SectionShell>

      {/* CTA */}
      <SectionShell id="cta">
        <Reveal>
          <Card className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight">
                  Passt das?
                  <span className="block"><TitleGradient>Schick mir nur die Basics.</TitleGradient></span>
                </div>
                <div className="mt-3 text-sm md:text-base text-white/70 max-w-xl">
                  Branche, Ziel, Deadline, Link zur aktuellen Website. Ich melde mich innerhalb von 24 Stunden mit einer ehrlichen Einschätzung.
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['Sprint 0 kostenlos', 'Antwort innerhalb 24 h', 'Kein Commitment nötig'].map((t) => (
                    <span key={t} className="text-xs text-white/60 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400/70" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold shrink-0"
              >
                Per WhatsApp schreiben <ArrowRight size={18} />
              </a>
            </div>
          </Card>
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
  0% { transform: translate3d(0px, 0px, 0) scale(1.10); }
  45% { transform: translate3d(35px, 25px, 0) scale(1.10); }
  85% { transform: translate3d(-30px, -18px, 0) scale(0.94); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes noiseMove {
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
