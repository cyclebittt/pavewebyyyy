'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Mail,
  GitBranch,
  Target,
  Layers,
  CheckCheck,
  PackageCheck,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ---------- CONFIG ---------- */

const EMAIL = 'hello@leonseitz.com';
const WHATSAPP_E164 = '4916095757167';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`;

const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(
  `Hi Leon,\n\nZiel:\nDeadline:\nStand:\n\nKurzer Kontext:`
)}`;

const MAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Projektanfrage')}&body=${encodeURIComponent(
  `Hi Leon,\n\nZiel:\nDeadline:\nStand:\n\nKurzer Kontext:`
)}`;

const SECTIONS = [
  { id: 'hero', label: 'Start' },
  { id: 'roadmap', label: 'Ablauf' },
  { id: 'pricing', label: 'Kosten' },
  { id: 'retainer', label: 'Nach dem Projekt' },
  { id: 'cta', label: 'Anfrage' },
];

const PHASES = [
  {
    n: 1,
    title: 'Briefing',
    icon: <Target size={16} />,
    text: `Du schickst mir Ziel, Deadline und Stand. Ich sage dir kurzfristig, ob und wie ich helfen kann.`,
    micro: 'Meilenstein: Scope klar + Startsignal',
  },
  {
    n: 2,
    title: 'Konzept & Struktur',
    icon: <Layers size={16} />,
    text: `Wir legen fest, was entsteht: Aufbau, Seiten, Inhalte. Erst wenn das stimmt, fange ich an.`,
    micro: 'Sprint 1: Struktur-Entwurf + Review',
  },
  {
    n: 3,
    title: 'Erste Version & Feedback',
    icon: <GitBranch size={16} />,
    text: `Du bekommst eine lauffähige Version zum Reviewen. Änderungen sind hier eingebaut, nicht extra.`,
    micro: 'Sprint 2: Build → Feedback → Anpassung',
  },
  {
    n: 4,
    title: 'Finalisierung',
    icon: <CheckCheck size={16} />,
    text: `Nach deinem Feedback setze ich die letzte Runde um. Keine Überraschungen, kein Scope-Creep.`,
    micro: 'Sprint 3: Feinschliff + Stabilisierung',
  },
  {
    n: 5,
    title: 'Übergabe',
    icon: <PackageCheck size={16} />,
    text: `Du bekommst alles: Dateien, Zugänge, Setup. Optional: Betreuung ab hier.`,
    micro: 'Meilenstein: Übergabe + Go-Live',
  },
];

/* ---------- SCENES / BACKGROUND ---------- */

const SCENES = {
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
  roadmap: {
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
  pricing: {
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
  retainer: {
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
  cta: {
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
  const scene = SCENES[sceneId] ?? SCENES.hero;
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
      className={cx('transition-all duration-700 will-change-transform', shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- ROADMAP: ACTIVE PHASE ---------- */

function useActivePhase(phaseIds) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const els = phaseIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible?.target?.id) return;
        const idx = phaseIds.indexOf(visible.target.id);
        if (idx >= 0) setActiveIdx(idx);
      },
      { root: null, rootMargin: '-35% 0px -55% 0px', threshold: [0.15, 0.25, 0.45, 0.65] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [phaseIds]);

  return activeIdx;
}

function Roadmap({ sceneId = 'roadmap' }) {
  const phaseIds = useMemo(() => PHASES.map((p) => `phase-${p.n}`), []);
  const activeIdx = useActivePhase(phaseIds);

  const progressPct = useMemo(() => {
    // 0..1 based on active phase index
    const n = Math.max(1, PHASES.length - 1);
    return Math.min(1, Math.max(0, activeIdx / n));
  }, [activeIdx]);

  return (
    <div className="mt-10">
      <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8 overflow-hidden relative">
        <div
          className="pointer-events-none absolute -inset-px opacity-70 blur-2xl"
          style={{
            background:
              'radial-gradient(60%_80%_at_25%_10%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(60%_80%_at_85%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(55%_80%_at_50%_115%,rgba(168,85,247,0.08),transparent_60%)',
          }}
        />

        <div className="relative">
          <div className="text-xs uppercase tracking-wide text-white/55">Roadmap</div>
          <div className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight text-white">
            Agile Phasen mit klaren Meilensteinen.
            <span className="block text-base md:text-lg mt-2">
              <TitleGradient sceneId={sceneId}>Du siehst jederzeit, wo wir stehen – und was als Nächstes passiert.</TitleGradient>
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:gap-6">
            <div className="relative">
              {/* Left rail */}
              <div className="absolute left-[18px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full" />
              {/* Progress fill */}
              <div
                className="absolute left-[18px] top-2 w-[2px] rounded-full bg-gradient-to-b from-cyan-300 via-violet-300 to-emerald-300"
                style={{
                  height: `calc(${Math.round(progressPct * 100)}% + 28px)`,
                  transition: 'height 550ms cubic-bezier(.2,.9,.2,1)',
                  filter: 'drop-shadow(0 0 14px rgba(56,189,248,0.25)) drop-shadow(0 0 18px rgba(168,85,247,0.18))',
                }}
              />

              <div className="space-y-5 md:space-y-6">
                {PHASES.map((p, idx) => {
                  const done = idx < activeIdx;
                  const active = idx === activeIdx;

                  return (
                    <div key={p.n} id={`phase-${p.n}`} className="relative pl-14">
                      <div
                        className={cx(
                          'absolute left-0 top-1.5 w-10 h-10 rounded-full flex items-center justify-center',
                          'border border-white/15 bg-black/35 backdrop-blur-md',
                          active ? 'ring-2 ring-white/20' : '',
                          done ? 'shadow-[0_0_24px_-8px_rgba(52,211,153,0.55)]' : '',
                          active ? 'shadow-[0_0_26px_-8px_rgba(56,189,248,0.55)]' : ''
                        )}
                        style={{
                          transition: 'box-shadow 450ms ease, transform 450ms ease',
                          transform: active ? 'translateZ(0) scale(1.02)' : 'translateZ(0) scale(1)',
                        }}
                      >
                        <div
                          className={cx(
                            'w-8 h-8 rounded-full flex items-center justify-center text-black font-extrabold text-sm',
                            'bg-gradient-to-r',
                            (SCENES[sceneId] ?? SCENES.roadmap).accent
                          )}
                        >
                          {p.n}
                        </div>
                      </div>

                      <TiltCard className="rounded-3xl">
                        <div
                          className={cx(
                            'rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-5 md:p-6 relative overflow-hidden',
                            active ? 'border-white/25' : '',
                            done ? 'opacity-95' : 'opacity-90'
                          )}
                        >
                          <div
                            className={cx('pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.06]')}
                            style={{
                              filter: 'blur(50px)',
                              animation: active ? 'shineSoft 5.4s cubic-bezier(.2,.9,.2,1) infinite' : 'none',
                            }}
                          />

                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-white/55">
                                <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/12 flex items-center justify-center">
                                  {p.icon}
                                </span>
                                Phase {p.n}
                                {done ? <span className="text-emerald-200/80">— erledigt</span> : null}
                                {active && !done ? <span className="text-cyan-200/80">— aktuell</span> : null}
                              </div>

                              <div className="mt-3 text-xl md:text-2xl font-extrabold text-white leading-tight">{p.title}</div>
                            </div>

                            <div
                              className={cx(
                                'shrink-0 w-10 h-10 rounded-2xl border border-white/12 bg-white/5 flex items-center justify-center',
                                done ? 'text-emerald-200/80' : active ? 'text-cyan-200/80' : 'text-white/60'
                              )}
                            >
                              <CheckCircle2 size={18} />
                            </div>
                          </div>

                          <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">{p.text}</p>

                          <div className="mt-4 text-xs text-white/55">
                            <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', (SCENES[sceneId] ?? SCENES.roadmap).accent)}>
                              {p.micro}
                            </span>
                          </div>

                          <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3 text-xs text-white/65 leading-relaxed">
                            Transparenz-Logik: In jeder Phase gibt es einen klaren Review-Punkt. Du gibst Feedback, ich setze um. Danach geht’s
                            erst weiter.
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-1 text-xs text-white/55">
              Hinweis: Der Scope bleibt bewusst stabil. Zusätzliche Wünsche klären wir als „Next Sprint“ (separat), statt das laufende Projekt zu
              verwässern.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- PRICING CALC ---------- */

function formatEUR(n) {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Math.round(n));
}

function PricingCalculator({ sceneId = 'pricing' }) {
  const DEFAULT = 500;

  const [raw, setRaw] = useState('');
  const price = useMemo(() => {
    const cleaned = String(raw).replace(',', '.').replace(/[^\d.]/g, '');
    const v = parseFloat(cleaned);
    return Number.isFinite(v) && v >= 0 ? v : null;
  }, [raw]);

  const base = price ?? DEFAULT;

  const p1 = base * 0.4;
  const p2 = base * 0.4;
  const p3 = base * 0.2;

  const chip = (label) => (
    <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
      <Sparkles size={16} /> {label}
    </span>
  );

  return (
    <TiltCard className="rounded-3xl">
      <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-10 overflow-hidden relative">
        <div
          className="pointer-events-none absolute -inset-px opacity-65 blur-2xl"
          style={{
            background:
              'radial-gradient(60%_80%_at_25%_10%,rgba(244,114,182,0.12),transparent_60%),radial-gradient(60%_80%_at_85%_0%,rgba(168,85,247,0.10),transparent_60%),radial-gradient(55%_80%_at_50%_115%,rgba(56,189,248,0.08),transparent_60%)',
          }}
        />

        <div className="relative">
          {chip('Live-Rechner')}
          <div className="mt-4 text-2xl md:text-4xl font-extrabold leading-tight text-white">
            Was kostet dein Projekt?
            <span className="block text-base md:text-lg mt-2">
              <TitleGradient sceneId={sceneId}>Trag den Projektpreis ein – ich zeige dir direkt, wann du was zahlst.</TitleGradient>
            </span>
          </div>

          <div className="mt-6">
            <label className="block text-xs uppercase tracking-wide text-white/55">Projektpreis</label>
            <div className="mt-2 flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  inputMode="decimal"
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  placeholder="z.B. 500"
                  className={cx(
                    'w-full rounded-2xl px-4 py-3.5',
                    'border border-white/15 bg-black/30 backdrop-blur-md',
                    'text-white placeholder:text-white/35',
                    'outline-none focus:border-white/25'
                  )}
                />
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/55 text-sm">€</div>
              </div>

              <div className="hidden md:block text-xs text-white/55">
                {price === null ? (
                  <span>
                    Beispiel-Rechnung: <span className="text-white/80">{DEFAULT}€</span>
                  </span>
                ) : (
                  <span>
                    Live: <span className="text-white/80">{formatEUR(base)}€</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3">
            <div className="rounded-2xl border border-white/12 bg-black/25 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white/90">Zahlung 1 — Projektstart (40%)</div>
                  <div className="mt-1 text-xs text-white/60">Fällig nach Auftragsbestätigung</div>
                </div>
                <div className={cx('text-lg md:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r', (SCENES[sceneId] ?? SCENES.pricing).accent)}>
                  {formatEUR(p1)} €
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/12 bg-black/25 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white/90">Zahlung 2 — Freigabe Zwischenstand (40%)</div>
                  <div className="mt-1 text-xs text-white/60">Fällig nach Review der ersten Version</div>
                </div>
                <div className={cx('text-lg md:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r', (SCENES[sceneId] ?? SCENES.pricing).accent)}>
                  {formatEUR(p2)} €
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/12 bg-black/25 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white/90">Zahlung 3 — Übergabe (20%)</div>
                  <div className="mt-1 text-xs text-white/60">Fällig nach finalem Go-Live</div>
                </div>
                <div className={cx('text-lg md:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r', (SCENES[sceneId] ?? SCENES.pricing).accent)}>
                  {formatEUR(p3)} €
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/12 bg-white/5 p-4 text-sm text-white/70 leading-relaxed">
            Diese Aufteilung schützt beide Seiten: Du zahlst nur weiter, wenn der Stand stimmt. Ich arbeite mit klarem Auftrag weiter.
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

/* ---------- CTA BUTTONS ---------- */

function PrimaryButton({ href, children }) {
  return (
    <Magnetic>
      <a
        href={href}
        className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
      >
        {children}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </Magnetic>
  );
}

function GhostButton({ href, children, external = false }) {
  return (
    <Magnetic strength={10}>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
      >
        {children}
      </a>
    </Magnetic>
  );
}

/* ---------- PAGE ---------- */

export default function ProzessPage() {
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
        {/* BLOCK 1 – HERO */}
        <Scene id="hero">
          <div className="flex flex-col items-center text-center gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Prozess statt Bauchgefühl
              </span>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
                So läuft ein Projekt ab.
                <span className="block">
                  <TitleGradient sceneId="hero">Klar strukturiert.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="max-w-2xl text-base md:text-xl text-white/80 leading-relaxed">
                Mit festen Meilensteinen. Ohne Überraschungen. Du bist in jeder Phase eingebunden – mit klaren Feedbackschleifen.
              </p>
            </Reveal>
          </div>
        </Scene>

        {/* BLOCK 2 – ROADMAP */}
        <Scene id="roadmap">
          <div className="grid grid-cols-1 gap-10">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">02 — Ablauf</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Planbar.
                  <span className="block">
                    <TitleGradient sceneId="roadmap">Mit Sprints und Reviews.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-3xl">
                  Ich arbeite lieber in klaren Etappen als in „wir schauen mal“. Du bekommst sichtbaren Fortschritt, definierte Review-Punkte
                  und ein sauberes Ende.
                </p>
              </Reveal>
            </div>

            <Reveal delayMs={200}>
              <Roadmap sceneId="roadmap" />
            </Reveal>
          </div>
        </Scene>

        {/* BLOCK 3 – ZAHLUNGSRECHNER */}
        <Scene id="pricing">
          <div className="grid grid-cols-1 gap-10">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">03 — Kosten</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Klarer Rahmen.
                  <span className="block">
                    <TitleGradient sceneId="pricing">Klare Zahlungslogik.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-3xl">
                  Kein Rätselraten. Du siehst, wie sich Zahlungen an Meilensteine koppeln – und warum das für beide Seiten sinnvoll ist.
                </p>
              </Reveal>
            </div>

            <Reveal delayMs={220}>
              <PricingCalculator sceneId="pricing" />
            </Reveal>
          </div>
        </Scene>

        {/* BLOCK 4 – RETAINER */}
        <Scene id="retainer">
          <div className="grid grid-cols-1 gap-10">
            <div>
              <Reveal>
                <div className="text-xs uppercase tracking-wide text-white/55">04 — Nach dem Projekt</div>
              </Reveal>

              <Reveal delayMs={90}>
                <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                  Danach ist nicht „weg“.
                  <span className="block">
                    <TitleGradient sceneId="retainer">Optional mit Betreuung.</TitleGradient>
                  </span>
                </h2>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-5 text-white/80 text-base md:text-xl leading-relaxed max-w-3xl">
                  Wenn du möchtest, betreue ich deine Website weiter – für Anpassungen, neue Seiten oder kleine Updates. Monatlich kündbar,
                  ohne Abo-Stress.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Reveal delayMs={220}>
                <TiltCard className="rounded-3xl">
                  <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8">
                    <div className="text-xs uppercase tracking-wide text-white/55">Option A</div>
                    <div className="mt-3 text-xl md:text-3xl font-extrabold text-white/90">Einmaliges Projekt</div>
                    <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                      Einmalige Umsetzung. Fixer Preis. Klare Übergabe. Kein Folgevertrag.
                    </p>
                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/70 leading-relaxed">
                      Gut, wenn du intern selbst weiterarbeiten willst und nur eine saubere Basis brauchst.
                    </div>
                  </div>
                </TiltCard>
              </Reveal>

              <Reveal delayMs={260}>
                <TiltCard className="rounded-3xl">
                  <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8 overflow-hidden relative">
                    <div
                      className="pointer-events-none absolute -inset-px opacity-60 blur-2xl"
                      style={{
                        background:
                          'radial-gradient(60%_80%_at_25%_10%,rgba(16,185,129,0.12),transparent_60%),radial-gradient(60%_80%_at_85%_0%,rgba(59,130,246,0.10),transparent_60%),radial-gradient(55%_80%_at_50%_115%,rgba(56,189,248,0.08),transparent_60%)',
                      }}
                    />
                    <div className="relative">
                      <div className="text-xs uppercase tracking-wide text-white/55">Option B</div>
                      <div className="mt-3 text-xl md:text-3xl font-extrabold text-white/90">Mit Betreuung</div>
                      <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                        Projekt + monatliche Pflege ab 150 €/Monat. Updates, Anpassungen, Ansprechpartner.
                      </p>
                      <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/70 leading-relaxed">
                        Sinnvoll, wenn du regelmäßig kleine Änderungen willst, ohne jedes Mal neu zu starten.
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </Scene>

        {/* BLOCK 5 – CTA */}
        <Scene id="cta">
          <div className="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div>
                <Reveal>
                  <div className="text-xs uppercase tracking-wide text-white/55">Anfrage</div>
                </Reveal>

                <Reveal delayMs={90}>
                  <h3 className="mt-2 text-2xl md:text-5xl font-extrabold leading-tight">Passt das für dich?</h3>
                </Reveal>

                <Reveal delayMs={160}>
                  <p className="mt-4 text-white/80 leading-relaxed max-w-2xl">
                    Schick mir Ziel, Deadline und Stand – dann sage ich dir, ob es zeitlich hinkommt und was der sinnvollste nächste Schritt ist.
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
                  <div className="mt-8 flex flex-wrap gap-2">
                    <PrimaryButton href={WHATSAPP_HREF}>
                      <ExternalLink size={18} /> Per WhatsApp
                    </PrimaryButton>

                    <GhostButton href={MAIL_HREF}>
                      <Mail size={18} /> Per Mail
                    </GhostButton>

                    <GhostButton href={WHATSAPP_URL} external>
                      <ExternalLink size={18} /> Direkt öffnen
                    </GhostButton>
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
