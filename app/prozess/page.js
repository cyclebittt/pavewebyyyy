'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Sparkles,
  Wand2,
  CreditCard,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

/* ---------- CONFIG ---------- */

const WHATSAPP_E164 = '4916095757167';
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(
  `Hi Leon,\n\nKurz zu meinem Vorhaben:\n- Branche:\n- Ziel (mehr Anfragen / sauberer Auftritt / beides):\n- Deadline:\n- Link zu aktueller Website (falls vorhanden):\n\nDanke!\n`
)}`;

// Wenn Navbar sticky/fixed ist: sorgt dafür, dass Hero nicht "unter" der Navbar sitzt
const NAV_OFFSET_PX = 96;

/* ---------- SCENE (match your existing vibe) ---------- */

const SCENE = {
  base: '#070312',
  g1: `radial-gradient(1200px 700px at 18% 18%, rgba(168,85,247,0.30), transparent 60%),
       radial-gradient(900px 700px at 82% 25%, rgba(56,189,248,0.14), transparent 55%)`,
  g2: `linear-gradient(135deg, #070312 0%, #0b0b1a 50%, #03040e 100%)`,
  blobs: [
    { cls: 'bg-violet-500/14', x: '-20%', y: '-18%', s: '56rem', blur: 150 },
    { cls: 'bg-cyan-500/10', x: '70%', y: '10%', s: '54rem', blur: 160 },
    { cls: 'bg-fuchsia-500/8', x: '20%', y: '80%', s: '46rem', blur: 160 },
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

/* ---------- LAYOUT ---------- */

function SectionShell({ children, id, hero = false }) {
  return (
    <section
      id={id}
      className={cx('relative px-5 md:px-16 py-12 md:py-16 scroll-mt-24', hero ? 'pt-24 md:pt-28' : '')}
      style={hero ? { paddingTop: `calc(${NAV_OFFSET_PX}px + 2.5rem)` } : undefined}
    >
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function Card({ children, className = '' }) {
  return (
    <TiltCard className={cx('rounded-3xl', className)}>
      <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8 overflow-hidden relative">
        <div
          className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.06]"
          style={{ filter: 'blur(50px)', animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite' }}
        />
        {children}
      </div>
    </TiltCard>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
      <span>{children}</span>
    </li>
  );
}

/* ---------- ROADMAP (green checkmarks + active step) ---------- */

function useRoadmapState(stepIds) {
  const [done, setDone] = useState(() => new Set());
  const [active, setActive] = useState(stepIds?.[0] ?? null);

  useEffect(() => {
    const els = stepIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Active: entry mit höchster Sichtbarkeit
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) setActive(visible[0].target.id);

        // Done: sobald ein Step sichtbar war (dezent)
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.35) {
            setDone((prev) => new Set(prev).add(e.target.id));
          }
        });
      },
      { threshold: [0.15, 0.25, 0.35, 0.55, 0.75] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [stepIds]);

  return { done, active };
}

function Roadmap() {
  const steps = useMemo(
    () => [
      {
        id: 'rm0',
        label: 'Sprint 0 (kostenlos)',
        title: 'Analyse',
        desc: 'Du bekommst 3 klare Punkte, die Anfragen gerade verhindern.',
        badge: '0 €',
        pay: null,
        defaultDone: true,
        free: true,
      },
      {
        id: 'rm1',
        label: 'Sprint 0 (kostenlos)',
        title: 'Erster Entwurf',
        desc: 'Du bekommst einen ersten Seiten-Aufbau als Vorschau (Hero + Struktur + CTA).',
        badge: '0 €',
        pay: null,
        defaultDone: true,
        free: true,
      },
      {
        id: 'rm2',
        label: 'Sprint 1',
        title: 'Version 1 + Review',
        desc: 'Du testest eine lauffähige Version. Danach sagst du: „Passt“ oder „ändern“.',
        badge: 'Review',
        pay: { label: 'Zahlung 1 (40%)', rule: 'nur nach deinem „Passt“ nach Sprint 1' },
      },
      {
        id: 'rm3',
        label: 'Sprint 2',
        title: 'Feedback umsetzen + Review',
        desc: 'Ich setze Feedback um. Du prüfst den Zwischenstand.',
        badge: '2. Review',
        pay: { label: 'Zahlung 2 (40%)', rule: 'nur nach deiner Freigabe nach Sprint 2' },
      },
      {
        id: 'rm4',
        label: 'Sprint 3',
        title: 'Übergabe & Go-Live',
        desc: 'Zugänge + Dateien. Danach geht es live.',
        badge: 'Go-Live',
        pay: { label: 'Zahlung 3 (20%)', rule: 'nur nach Übergabe / live' },
      },
    ],
    []
  );

  const ids = useMemo(() => steps.map((s) => s.id), [steps]);
  const { done, active } = useRoadmapState(ids);

  const doneCount = steps.reduce((acc, s) => acc + ((s.defaultDone || done.has(s.id)) ? 1 : 0), 0);
  const linePct = Math.max(0, Math.min(1, (doneCount - 1) / Math.max(1, steps.length - 1)));

  return (
    <div className="relative">
      <div className="absolute left-[18px] top-4 bottom-4 w-[2px] bg-white/10 rounded-full" />
      <div
        className="absolute left-[18px] top-4 w-[2px] bg-gradient-to-b from-emerald-200 via-violet-200 to-cyan-200 rounded-full"
        style={{
          height: `calc(${linePct * 100}% * (100% - 32px))`,
          maxHeight: 'calc(100% - 32px)',
          transition: 'height 700ms ease-out',
        }}
      />

      <div className="space-y-3">
        {steps.map((s) => {
          const isDone = s.defaultDone || done.has(s.id);
          const isActive = active === s.id;

          const nodeClass = s.free
            ? isActive
              ? 'border-emerald-300/45 bg-emerald-500/10 ring-1 ring-emerald-300/20'
              : 'border-emerald-300/35 bg-emerald-500/8'
            : isActive
              ? 'border-white/25 bg-white/10 ring-1 ring-white/10'
              : 'border-white/12 bg-black/20';

          return (
            <div id={s.id} key={s.id} className="relative pl-12">
              <div className={cx('absolute left-0 top-4 w-9 h-9 rounded-2xl border flex items-center justify-center', nodeClass)}>
                {isDone ? <CheckCircle2 size={18} className={cx(s.free ? 'text-emerald-200' : 'text-emerald-200')} /> : <Circle size={16} className="text-white/60" />}
              </div>

              <div
                className={cx(
                  'rounded-2xl border backdrop-blur-md p-4 md:p-5 transition-colors',
                  s.free
                    ? 'border-emerald-300/20 bg-emerald-500/5'
                    : 'border-white/15 bg-black/15'
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs uppercase tracking-wide text-white/55">{s.label}</div>
                  <span
                    className={cx(
                      'inline-flex items-center rounded-full px-3 py-1 text-xs border',
                      s.free ? 'bg-emerald-500/10 text-emerald-100 border-emerald-300/20' : 'bg-white/10 text-white/85 border-white/15'
                    )}
                  >
                    {s.badge}
                  </span>
                </div>

                <div className="mt-2 text-sm md:text-base font-semibold text-white/90">{s.title}</div>
                <div className="mt-1 text-sm text-white/70 leading-relaxed">{s.desc}</div>

                {s.pay ? (
                  <div className="mt-3 rounded-xl border border-white/12 bg-black/25 p-3">
                    <div className="flex items-center gap-2 text-sm text-white/85">
                      <CreditCard size={16} className="text-white/70" />
                      <span className="font-semibold">{s.pay.label}</span>
                    </div>
                    <div className="mt-1 text-sm text-white/65 flex items-start gap-2">
                      <Shield size={16} className="mt-[2px] text-white/55" />
                      <span>{s.pay.rule}</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl border border-emerald-300/20 bg-emerald-500/5 p-3 text-sm text-white/75">
                    <span className="font-extrabold text-emerald-100">0 €</span> – das bekommst du, bevor irgendwas startet.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-white/55">
        Der Ablauf ist sprint-basiert. Du prüfst jeden Stand. Zahlungen passieren nur nach deiner Freigabe.
      </div>
    </div>
  );
}

/* ---------- PACKAGES ---------- */

function PackageCard({ title, price, bullets, time, highlight = false }) {
  return (
    <Reveal>
      <TiltCard className="rounded-3xl">
        <div
          className={cx(
            'rounded-3xl border bg-black/20 backdrop-blur-md p-6 md:p-7 overflow-hidden relative',
            highlight ? 'border-violet-300/35 ring-1 ring-violet-300/20' : 'border-white/15'
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-white/55">{title}</div>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
                <TitleGradient>{price}</TitleGradient>
              </div>
            </div>

            {highlight ? (
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/85 border border-white/15">
                Am häufigsten gewählt
              </span>
            ) : null}
          </div>

          <ul className="mt-4 space-y-2 text-sm md:text-base text-white/80">
            {bullets.map((b, i) => (
              <Bullet key={`${title}-${i}`}>{b}</Bullet>
            ))}
          </ul>

          <div className="mt-4 text-sm text-white/65">
            Lieferzeit: <span className="text-white/85 font-semibold">{time}</span>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/* ---------- RECHNER (bigger numbers) ---------- */

function BigEuro({ value }) {
  return (
    <div className="leading-none">
      <div className={cx('bg-clip-text text-transparent bg-gradient-to-r', SCENE.accent, 'font-extrabold tracking-tight')}>
        <span className="text-[72px] md:text-[104px]">{value}</span>
        <span className="text-[44px] md:text-[64px] align-baseline ml-2">€</span>
      </div>
    </div>
  );
}

function PaymentLine({ label, pct, amount, note, emphasize = false }) {
  return (
    <div
      className={cx(
        'rounded-2xl border backdrop-blur-md p-4 md:p-5',
        emphasize ? 'border-white/20 bg-white/5' : 'border-white/15 bg-black/15'
      )}
    >
      <div className="text-sm md:text-base font-semibold text-white/90">
        {label} <span className="text-white/55 font-normal">({pct}%)</span>
      </div>
      <div className="mt-3">
        <BigEuro value={amount} />
      </div>
      <div className="mt-2 text-sm text-white/70">{note}</div>
    </div>
  );
}

/* ---------- PAGE ---------- */

export default function ProzessPage() {
  // Anchor: Startwert MUSS mit erstem sichtbaren Preis harmonieren (Komplett zuerst => 1.100 €)
  const [amountRaw, setAmountRaw] = useState('1100');

  // Paket-Buttons füllen den Rechner; Eingabe bleibt möglich
  const [selectedPkg, setSelectedPkg] = useState('komplett'); // 'komplett' | 'standard' | 'einstieg'

  useEffect(() => {
    // initial: ankern auf komplett
    setSelectedPkg('komplett');
    setAmountRaw('1100');
  }, []);

  const amount = useMemo(() => {
    const n = Number(String(amountRaw).replace(',', '.'));
    if (!Number.isFinite(n) || n <= 0) return 1100;
    return Math.round(n);
  }, [amountRaw]);

  const p1 = Math.round(amount * 0.4);
  const p2 = Math.round(amount * 0.4);
  const p3 = Math.round(amount * 0.2);

  const pick = (pkg) => {
    setSelectedPkg(pkg);
    if (pkg === 'komplett') setAmountRaw('1100');
    if (pkg === 'standard') setAmountRaw('700');
    if (pkg === 'einstieg') setAmountRaw('400');
  };

  return (
    <div className="font-proxima text-white min-h-screen">
      <style>{globalKeyframes}</style>

      <GlobalBackground />
      <GlobalLightLeaks />
      <ScrollProgressBar />
      <CursorHalo />

      <Navbar />

      {/* HERO: Kostenlos extrem klar + Roadmap direkt sichtbar */}
      <SectionShell id="hero" hero>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
          <div className="flex flex-col gap-5">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-emerald-100 bg-emerald-500/10 ring-1 ring-emerald-300/20 px-3 py-1 rounded-full">
                <Sparkles size={16} /> 2× kostenlos: Analyse (0 €) + erster Entwurf (0 €)
              </span>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Du siehst zuerst etwas,
                <span className="block">
                  <TitleGradient>bevor du zahlst.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/5 backdrop-blur-md p-5 md:p-6">
                <div className="text-xs uppercase tracking-wide text-white/55">Kostenloser Einstieg</div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-emerald-300/20 bg-black/20 p-4">
                    <div className="text-sm font-semibold text-emerald-100">Analyse – 0 €</div>
                    <div className="mt-1 text-sm text-white/75">3 klare Punkte, die Anfragen gerade verhindern.</div>
                  </div>
                  <div className="rounded-2xl border border-emerald-300/20 bg-black/20 p-4">
                    <div className="text-sm font-semibold text-emerald-100">Erster Entwurf – 0 €</div>
                    <div className="mt-1 text-sm text-white/75">Ein Beispiel-Aufbau als Vorschau (Hero + Struktur + CTA).</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-white/70">
                  Danach entscheidest du: weiter oder nicht. Ohne Diskussion.
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={220}>
              <div className="rounded-2xl border border-white/12 bg-black/25 p-4 text-sm text-white/75 leading-relaxed">
                Ablauf in Sprints: Du siehst jeden Stand. Zahlungen passieren nur nach deiner Freigabe.
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={140}>
            <Card>
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-wide text-white/55">Roadmap</div>
                <Wand2 size={18} className="text-white/55" />
              </div>
              <div className="mt-3 text-xl md:text-2xl font-bold text-white/90">
                Sprints, Reviews, Zahlungen — <TitleGradient>ein System.</TitleGradient>
              </div>
              <div className="mt-5">
                <Roadmap />
              </div>
            </Card>
          </Reveal>
        </div>
      </SectionShell>

      {/* PAKETE (Anchor-Reihenfolge: Komplett -> Standard -> Einstieg) */}
      <SectionShell id="pakete">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Pakete</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Wähle ein Paket.
            <span className="block">
              <TitleGradient>Der Ablauf bleibt immer gleich.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <PackageCard
            title="Komplett"
            price="ab 1.100 €"
            bullets={[
              'Website (bis 5 Seiten)',
              'Mini-Brandbook (Regeln)',
              <>
                Motion-Asset{' '}
                <a
                  href="https://www.leonseitz.com/portfolio/motion-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white/80 hover:text-white underline underline-offset-4"
                >
                  Beispiel ansehen <ExternalLink size={14} />
                </a>
              </>,
            ]}
            time="ca. 3 Wochen"
            highlight={false}
          />

          <PackageCard
            title="Standard"
            price="ab 700 €"
            bullets={[
              'Website (bis 5 Seiten)',
              'Branding-Grundlage (Farben/Schrift/Logo)',
              <>
                Klarer Aufbau wie{' '}
                <a
                  href="https://www.leonseitz.com/portfolio/kirche-fundraising"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white/80 hover:text-white underline underline-offset-4"
                >
                  dieses Projekt <ExternalLink size={14} />
                </a>
              </>,
            ]}
            time="10–14 Tage"
            highlight
          />

          <PackageCard
            title="Einstieg"
            price="ab 400 €"
            bullets={['1 Landingpage', '1 CTA, klare Struktur', 'Mobil optimiert']}
            time="7 Tage"
            highlight={false}
          />
        </div>

        {/* Verbindung Pakete <-> Roadmap (ein mentales Modell) */}
        <Reveal delayMs={140}>
          <div className="mt-6 rounded-2xl border border-white/12 bg-black/25 p-4 text-sm text-white/75 leading-relaxed">
            Der Ablauf ist in allen Paketen identisch: kostenlose Analyse + kostenloser Entwurf, dann Sprint 1/2/3 mit Reviews.
            Wenn du magst: scrolle kurz zur <a href="#rechner" className="text-white/80 hover:text-white underline underline-offset-4">Zahlungslogik</a>.
          </div>
        </Reveal>
      </SectionShell>

      {/* RECHNER (Paket-Buttons füllen vor; Default = 1.100 €; Zahlen dominant) */}
      <SectionShell id="rechner">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs uppercase tracking-wide text-white/55">Zahlungslogik</div>
            <Wand2 size={18} className="text-white/55" />
          </div>

          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Wähle ein Paket.
            <span className="block">
              <TitleGradient>Du siehst sofort, wann was fällig ist.</TitleGradient>
            </span>
          </h2>

          <div className="mt-5 rounded-2xl border border-white/12 bg-black/25 p-4 text-sm text-white/75 leading-relaxed">
            Wichtig: Die Zahlung kommt erst nach dem Sprint-Review, wenn du sagst: „Passt.“
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8 items-start">
            <div className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-md p-5 md:p-6">
              <div className="text-sm text-white/70">Paket auswählen</div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => pick('einstieg')}
                  className={cx(
                    'px-4 py-3 rounded-2xl border text-sm font-semibold transition-colors',
                    selectedPkg === 'einstieg'
                      ? 'border-white/25 bg-white/10 text-white'
                      : 'border-white/12 bg-black/25 text-white/80 hover:bg-white/5'
                  )}
                >
                  Einstieg (400 €)
                </button>
                <button
                  onClick={() => pick('standard')}
                  className={cx(
                    'px-4 py-3 rounded-2xl border text-sm font-semibold transition-colors',
                    selectedPkg === 'standard'
                      ? 'border-violet-300/35 bg-violet-500/10 text-white'
                      : 'border-white/12 bg-black/25 text-white/80 hover:bg-white/5'
                  )}
                >
                  Standard (700 €)
                </button>
                <button
                  onClick={() => pick('komplett')}
                  className={cx(
                    'px-4 py-3 rounded-2xl border text-sm font-semibold transition-colors',
                    selectedPkg === 'komplett'
                      ? 'border-white/25 bg-white/10 text-white'
                      : 'border-white/12 bg-black/25 text-white/80 hover:bg-white/5'
                  )}
                >
                  Komplett (1.100 €)
                </button>
              </div>

              <div className="mt-5 text-sm text-white/70">Oder Betrag anpassen (optional)</div>
              <div className="mt-3 flex items-center gap-3">
                <input
                  value={amountRaw}
                  onChange={(e) => setAmountRaw(e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white text-lg md:text-xl outline-none focus:border-white/30"
                  placeholder="z.B. 1100"
                  aria-label="Projektpreis in Euro"
                />
                <div className="text-white/70 font-semibold">€</div>
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-500/5 p-4 text-sm text-white/75 leading-relaxed">
                Vor dem ersten Sprint zahlst du <span className="font-extrabold text-emerald-100">zweimal 0 €</span>:
                Analyse + Entwurf.
              </div>
            </div>

            <div className="space-y-3">
              <PaymentLine
                label="Zahlung 1 – nach Sprint 1"
                pct={40}
                amount={p1}
                note="Fällig nach Review der Version 1 (nur wenn du freigibst)"
                emphasize
              />
              <PaymentLine
                label="Zahlung 2 – nach Sprint 2"
                pct={40}
                amount={p2}
                note="Fällig nach Review des Zwischenstands (nur wenn du freigibst)"
              />
              <PaymentLine
                label="Zahlung 3 – nach Übergabe"
                pct={20}
                amount={p3}
                note="Fällig nach Go-Live / Übergabe (Zugänge + Dateien)"
              />
            </div>
          </div>
        </Card>
      </SectionShell>

      {/* FINAL CTA (single CTA) */}
      <SectionShell id="cta">
        <Reveal>
          <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-10 text-center">
            <div className="text-xs uppercase tracking-wide text-white/55">Fallback</div>
            <h3 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">Wenn du willst, schick mir das kurz.</h3>
            <p className="mt-3 text-sm md:text-base text-white/70 max-w-2xl mx-auto">
              Ziel, Deadline, Stand. Ich melde mich innerhalb von 24 Stunden.
            </p>

            <div className="mt-6 flex items-center justify-center">
              <Magnetic>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
                >
                  Per WhatsApp schreiben
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
            </div>

            <div className="mt-3 text-sm text-white/55">
              Oder: <Link href="/" className="text-white/70 hover:text-white transition-colors">Startseite</Link>{' '}
              <span className="text-white/35">·</span>{' '}
              <Link href="/portfolio" className="text-white/70 hover:text-white transition-colors">Portfolio</Link>
              <span className="inline-flex items-center gap-1 ml-2 text-white/45">
                <ExternalLink size={14} />
              </span>
            </div>
          </div>
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
