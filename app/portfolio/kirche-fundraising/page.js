/* START: page.js */
'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Wand2,
  FileText,
  Clock,
  Shield,
  CreditCard,
  LayoutTemplate,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ---------- CONFIG ---------- */

const WHATSAPP_E164 = '4916095757167';
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(
  'Hi Leon,\n\nKurz zu meinem Vorhaben:\n- Branche:\n- Ziel (mehr Anfragen / sauberer Auftritt / beides):\n- Deadline:\n- Link zu aktueller Website (falls vorhanden):\n\nDanke!'
)}`;

const EMAIL = 'hello@leonseitz.com';
const MAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Kostenlose Website-Analyse')}&body=${encodeURIComponent(
  'Hi Leon,\n\nKurz zu meinem Vorhaben:\n- Branche:\n- Ziel (mehr Anfragen / sauberer Auftritt / beides):\n- Deadline:\n- Link zu aktueller Website (falls vorhanden):\n\nDanke!'
)}`;

const DEFAULT_PRICES = {
  einstieg: 400,
  standard: 700,
  komplett: 1100,
};

const REF = {
  url: 'https://kircheab.de/spenden',
  labelTop: 'Beispiel aus der Region: kircheab.de',
  labelBottom: 'Konzeption, Design & Umsetzung in unter 2 Wochen.',
  proofSmall: 'Ergebnis: über 17.000 € Spenden in 2 Monaten.',
};

/* ---------- SCENE (match homepage vibe) ---------- */

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

/* ---------- PAGE STRUCTURE ---------- */

function SectionShell({ id, children }) {
  return (
    <section id={id} className="relative px-5 md:px-16 py-12 md:py-16 scroll-mt-24">
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* ---------- UI ---------- */

function PrimaryCTA({ href, label, external = false }) {
  const inner = (
    <span className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2">
      {label}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
    </span>
  );

  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={href}>{inner}</Link>
      )}
    </Magnetic>
  );
}

function GhostCTA({ href, children, external = false }) {
  return (
    <Magnetic strength={10}>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="px-6 py-3 rounded-full bg-white/10 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-colors font-semibold inline-flex items-center gap-2"
        >
          {children}
        </Link>
      )}
    </Magnetic>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs md:text-[13px] text-white/85 border border-white/15">
      {children}
    </span>
  );
}

function CardShell({ children, className = '' }) {
  return (
    <TiltCard className={cx('rounded-3xl', className)}>
      <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-8 overflow-hidden relative">
        <div
          className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.07]"
          style={{
            filter: 'blur(50px)',
            animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite',
          }}
        />
        {children}
      </div>
    </TiltCard>
  );
}

function SmallPill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs md:text-sm text-white/85 border border-white/15">
      {children}
    </span>
  );
}

/* ---------- PACKAGE + CALC ---------- */

function PriceLine({ label, amount, hint }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-white/10 last:border-b-0">
      <div className="min-w-0">
        <div className="text-sm md:text-base font-semibold text-white/90">{label}</div>
        <div className="mt-1 text-xs md:text-sm text-white/60">{hint}</div>
      </div>
      <div className="shrink-0 text-sm md:text-base font-semibold text-white/90 tabular-nums">
        {amount.toLocaleString('de-DE')} €
      </div>
    </div>
  );
}

function PackageCard({ title, priceLabel, lead, bullets, timeLabel, emphasized = false, badge, icon }) {
  return (
    <Reveal>
      <TiltCard className={cx('rounded-3xl', emphasized ? 'scale-[1.01]' : '')}>
        <div
          className={cx(
            'rounded-3xl backdrop-blur-md p-6 md:p-7 overflow-hidden relative',
            emphasized ? 'border-2 border-violet-400/60 bg-black/20' : 'border border-white/15 bg-black/20'
          )}
        >
          <div
            className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.06]"
            style={{ filter: 'blur(52px)', animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite' }}
          />

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">{icon}</span>
                <div className="text-xs uppercase tracking-wide text-white/55">Paket</div>
              </div>
              <div className="mt-3 text-xl md:text-2xl font-extrabold text-white">{title}</div>
              <div className="mt-1 text-sm text-white/70">{lead}</div>
            </div>

            <div className="text-right">
              {badge ? (
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-full bg-violet-500/15 px-3 py-1 text-xs text-white/90 border border-violet-400/30">
                    {badge}
                  </span>
                </div>
              ) : null}
              <div className="text-sm text-white/60">Preis</div>
              <div className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">
                <TitleGradient>{priceLabel}</TitleGradient>
              </div>
              <div className="mt-1 text-xs text-white/55">{timeLabel}</div>
            </div>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-white/80">
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

function PackageSelector({ active, onSelect }) {
  const items = [
    { key: 'einstieg', label: 'Einstieg (400 €)', value: DEFAULT_PRICES.einstieg },
    { key: 'standard', label: 'Standard (700 €)', value: DEFAULT_PRICES.standard },
    { key: 'komplett', label: 'Komplett (1.100 €)', value: DEFAULT_PRICES.komplett },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => {
        const on = active === it.key;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onSelect(it.key, it.value)}
            className={cx(
              'px-4 py-2.5 rounded-full text-sm font-semibold border transition-colors',
              on
                ? 'border-violet-400/60 bg-violet-500/15 text-white'
                : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/8 hover:border-white/25'
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

function BrowserMiniMock({ href, label = 'kircheab.de/spenden' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3" aria-label="Referenz öffnen">
      <div className="w-[200px] max-w-[200px]">
        <div className="rounded-2xl border border-white/15 bg-black/25 backdrop-blur-md overflow-hidden">
          <div className="px-3 py-2 border-b border-white/10 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/18" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/18" />
            <div className="ml-2 text-[11px] text-white/55 truncate">{label}</div>
          </div>
          <div className="h-20 bg-[radial-gradient(70%_80%_at_25%_20%,rgba(168,85,247,0.20),transparent_60%),radial-gradient(70%_80%_at_90%_0%,rgba(56,189,248,0.16),transparent_65%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
            <div className="h-full w-full opacity-70 group-hover:opacity-90 transition-opacity" />
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <div className="text-sm font-semibold text-white/90 flex items-center gap-2">
          Referenz ansehen <ExternalLink size={16} className="text-white/55" />
        </div>
        <div className="mt-1 text-xs md:text-sm text-white/65">Öffnet im neuen Tab (echtes Projekt)</div>
      </div>
    </a>
  );
}

/* ---------- PROCESS ---------- */

function FlagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 21V5" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6 5h10l-1.5 3L16 11H6V5Z"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepItem({ n, title, body, milestone }) {
  return (
    <Reveal>
      <TiltCard className="rounded-3xl">
        <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-7 relative overflow-hidden">
          <div
            className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.06]"
            style={{ filter: 'blur(54px)', animation: 'shineSoft 6.4s cubic-bezier(.2,.9,.2,1) infinite' }}
          />
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-extrabold">{n}</div>
            <div className="min-w-0">
              <div className="text-base md:text-lg font-extrabold text-white">{title}</div>
              <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed whitespace-pre-line">{body}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs md:text-sm text-white/65">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/10 border border-white/12">
                  <FlagIcon />
                </span>
                <span className="min-w-0">
                  <span className="text-white/55">Ergebnis:</span> {milestone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/* ---------- PAGE ---------- */

export default function ProzessPage() {
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

  const [activePkg, setActivePkg] = useState('standard');
  const [price, setPrice] = useState(DEFAULT_PRICES.standard);
  const [custom, setCustom] = useState('');

  const computed = useMemo(() => {
    const base = Number.isFinite(price) ? price : DEFAULT_PRICES.standard;
    const p1 = Math.round(base * 0.4);
    const p2 = Math.round(base * 0.4);
    const p3 = Math.max(0, base - p1 - p2);
    return { base, p1, p2, p3 };
  }, [price]);

  const setFromPkg = useCallback((key, value) => {
    setActivePkg(key);
    setCustom('');
    setPrice(value);
  }, []);

  const onCustomChange = useCallback(
    (v) => {
      setCustom(v);
      const num = Number(String(v).replace(',', '.'));
      if (!v) {
        const fallback = DEFAULT_PRICES[activePkg] ?? DEFAULT_PRICES.standard;
        setPrice(fallback);
        return;
      }
      if (!Number.isFinite(num) || num < 0) return;
      setPrice(Math.round(num));
    },
    [activePkg]
  );

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
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Zurück
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-8 items-start">
            <div>
              <Reveal>
                <SmallPill>
                  <Sparkles size={16} />
                  Aktuell nehme ich zwei neue Projekte an.
                </SmallPill>
              </Reveal>

              <Reveal delayMs={90}>
                <h1 className="mt-4 text-3xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                  Eine Website, die dir aktiv Anfragen bringt.
                  <span className="block">
                    <TitleGradient>Ohne Agenturpreise. Ohne Umwege.</TitleGradient>
                  </span>
                </h1>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-4 text-white/80 text-sm md:text-base max-w-xl leading-relaxed">
                  Wenn deine Website keine Anfragen bringt, verliert dein Unternehmen jeden Monat potenzielle Kunden.
                  Ich baue dir eine Seite, die in wenigen Sekunden erklärt, was ihr macht – und die Besucher gezielt zur
                  Kontaktaufnahme führt.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-6 flex flex-wrap gap-2 text-xs md:text-sm">
                  <Badge>Mobile-first</Badge>
                  <Badge>Klare Struktur</Badge>
                  <Badge>Transparenter Ablauf</Badge>
                  <Badge>Feedback eingebaut</Badge>
                </div>
              </Reveal>

              <Reveal delayMs={320}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <PrimaryCTA href="#analyse" label="Kostenlose Analyse ansehen" />
                  <GhostCTA href={WHATSAPP_HREF} external>
                    Direkt per WhatsApp <ExternalLink size={16} />
                  </GhostCTA>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140}>
              <CardShell>
                <div className="text-xs uppercase tracking-wide text-white/55">Was du hier auf der Seite bekommst</div>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                      <Shield size={16} className="text-white/70" /> Kein Risiko
                    </div>
                    <div className="mt-1 text-sm text-white/70">
                      Du zahlst die zweite Rate erst, wenn du die erste Version gesehen und freigegeben hast.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                      <Clock size={16} className="text-white/70" /> Klare Dauer
                    </div>
                    <div className="mt-1 text-sm text-white/70">
                      Du siehst weiter unten die typische Lieferzeit pro Paket – ohne „vielleicht“.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                      <CreditCard size={16} className="text-white/70" /> Klare Zahlungen
                    </div>
                    <div className="mt-1 text-sm text-white/70">
                      Ein Rechner zeigt dir live: wann du was zahlst – und warum diese Aufteilung fair ist.
                    </div>
                  </div>
                </div>
              </CardShell>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* Analyse */}
      <SectionShell id="analyse">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Kostenlose Website-Analyse</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            In 15 Minuten weißt du,
            <span className="block">
              <TitleGradient>was konkret fehlt – und was ich ändern würde.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <Reveal delayMs={160}>
          <CardShell className="mt-6">
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl">
              Ich prüfe deine Website anhand von vier klaren Punkten:
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Versteht ein Besucher in 10 Sekunden, was ihr anbietet?',
                'Ist der Aufbau logisch (Problem → Lösung → Kontakt)?',
                'Funktioniert alles am Smartphone einwandfrei?',
                'Wirkt die Seite professionell genug, um Vertrauen aufzubauen?',
              ].map((t) => (
                <div key={t} className="rounded-2xl border border-white/12 bg-white/5 p-4 flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <div className="text-sm text-white/75">{t}</div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm md:text-base text-white/75 leading-relaxed max-w-3xl">
              Danach bekommst du eine kurze, klare Liste mit konkreten Änderungen. Ohne Verkaufsdruck. Ohne Verpflichtung.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <PrimaryCTA href={WHATSAPP_HREF} label="Analyse anfragen (WhatsApp)" external />
              <GhostCTA href={MAIL_HREF} external>
                Alternativ per Mail <ExternalLink size={16} />
              </GhostCTA>
            </div>

            <div className="mt-4 text-xs md:text-sm text-white/60">
              Normalerweise ein bezahlter Beratungs-Schritt. Für neue Anfragen kostenlos.
            </div>
          </CardShell>
        </Reveal>
      </SectionShell>

      {/* Pakete */}
      <SectionShell id="pakete">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Pakete</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Was du bekommst.
            <span className="block">
              <TitleGradient>Ohne Interpretationsspielraum.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <Reveal delayMs={150}>
          <div className="mt-3 text-sm md:text-base text-white/70">
            Vergleichbare Agenturen starten oft ab <span className="text-white/85 font-semibold">3.000 €</span> – hier ist der Weg direkter.
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <PackageCard
            title="Komplett"
            priceLabel="ab 1.100 €"
            lead="Wenn du ein rundes Gesamtpaket willst (Website + klare Guidelines + ein Motion-Asset)."
            timeLabel="Lieferzeit: ca. 3 Wochen"
            emphasized={false}
            badge={null}
            icon={<Wand2 size={18} className="text-white/80" />}
            bullets={[
              'Website mit bis zu 5 Unterseiten (z.B. Startseite, Leistungen, Über uns, Kontakt, Impressum)',
              'Vollständiges Brandbook (Farben, Typo, Layoutregeln)',
              'Ein Motion-Element für Social Media (Wiedererkennung)',
              'Übergabe aller Zugänge und Dateien',
              'Optional: Betreuung ab 150 €/Monat',
            ]}
          />

          <PackageCard
            title="Standard"
            priceLabel="ab 700 €"
            lead="Der häufigste Fall: klare Website, saubere Linie, Kontaktweg – schnell live."
            timeLabel="Lieferzeit: 10–14 Tage"
            emphasized
            badge="Wird am häufigsten gewählt."
            icon={<LayoutTemplate size={18} className="text-white/80" />}
            bullets={[
              'Website mit bis zu 5 Unterseiten (z.B. Startseite, Leistungen, Über uns, Kontakt, Impressum)',
              'Grundlegende visuelle Linie (Farben, Schrift, saubere Struktur, Einbindung eures Logos)',
              'Kontaktformular, mobil optimiert',
              'Übergabe aller Zugänge',
              'Optional: Betreuung ab 150 €/Monat',
            ]}
          />

          <PackageCard
            title="Einstieg"
            priceLabel="ab 400 €"
            lead="Wenn du erstmal schnell und sauber starten willst – eine Seite, ein Ziel, ein CTA."
            timeLabel="Lieferzeit: 7 Tage"
            emphasized={false}
            badge={null}
            icon={<FileText size={18} className="text-white/80" />}
            bullets={[
              'Eine einzelne, klar strukturierte Seite (Landingpage)',
              'Fokus auf eine konkrete Handlung (z.B. Termin anfragen)',
              'Mobil optimiert',
              'Übergabe aller Zugänge',
              'Optional: Betreuung ab 150 €/Monat',
            ]}
          />
        </div>

        <Reveal delayMs={140}>
          <div className="mt-7 rounded-3xl border border-white/12 bg-black/20 backdrop-blur-md p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <BrowserMiniMock href={REF.url} />
              <div className="min-w-0">
                <div className="text-sm md:text-base font-semibold text-white/90">{REF.labelTop}</div>
                <div className="mt-1 text-sm text-white/70">{REF.labelBottom}</div>
                <div className="mt-2 text-xs text-white/55">{REF.proofSmall}</div>
              </div>
              <div className="md:ml-auto">
                <GhostCTA href={REF.url} external>
                  Öffnen <ExternalLink size={16} />
                </GhostCTA>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={200}>
          <div className="mt-6 rounded-3xl border border-white/12 bg-black/20 backdrop-blur-md p-5 md:p-6">
            <div className="text-sm md:text-base text-white/80 leading-relaxed">
              Alle Preise sind Ausgangspunkte. Nach der kostenlosen Analyse erhältst du ein genaues Angebot – ohne Überraschungen.
            </div>
            <div className="mt-3 text-sm text-white/60 italic">
              Bereits drei Unternehmen aus der Region haben sich für eines dieser Pakete entschieden.
            </div>
          </div>
        </Reveal>
      </SectionShell>

      {/* Rechner */}
      <SectionShell id="rechner">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Zahlungsrechner</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Wann zahlst du was?
            <span className="block">
              <TitleGradient>Du siehst es live – ohne Nachfragen.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <Reveal delayMs={160}>
          <CardShell className="mt-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="min-w-0">
                <div className="text-sm md:text-base font-semibold text-white/90">
                  1) Paket auswählen (oder eigenen Betrag eintragen)
                </div>
                <div className="mt-3">
                  <PackageSelector active={activePkg} onSelect={setFromPkg} />
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-semibold text-white/90" htmlFor="customPrice">
                    Oder eigener Betrag (optional)
                  </label>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      id="customPrice"
                      inputMode="numeric"
                      className="w-full md:w-[280px] rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white/90 placeholder:text-white/35 outline-none focus:ring-2 focus:ring-violet-400/40"
                      placeholder="z.B. 500"
                      value={custom}
                      onChange={(e) => onCustomChange(e.target.value)}
                    />
                    <span className="text-white/60 font-semibold">€</span>
                  </div>
                  <div className="mt-2 text-xs md:text-sm text-white/60">
                    Du kannst hier auch deinen Budget-Rahmen eintragen. Ich sage dir ehrlich, was dafür realistisch möglich ist.
                  </div>
                </div>
              </div>

              <div className="w-full lg:max-w-md">
                <div className="text-sm md:text-base font-semibold text-white/90">
                  2) Deine Zahlungen (automatisch berechnet)
                </div>

                <div className="mt-3 rounded-3xl border border-white/12 bg-black/20 backdrop-blur-md p-5 md:p-6">
                  <div className="text-xs uppercase tracking-wide text-white/55">Projektpreis</div>
                  <div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight tabular-nums">
                    <TitleGradient>{computed.base.toLocaleString('de-DE')} €</TitleGradient>
                  </div>

                  <div className="mt-5">
                    <PriceLine label="Zahlung 1 – Projektstart (40%)" amount={computed.p1} hint="Fällig nach Auftragsbestätigung" />
                    <PriceLine
                      label="Zahlung 2 – Erste Version (40%)"
                      amount={computed.p2}
                      hint="Fällig nachdem du die erste Version gesehen und freigegeben hast"
                    />
                    <PriceLine label="Zahlung 3 – Go-Live (20%)" amount={computed.p3} hint="Fällig nach Übergabe (finaler Stand online)" />
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/12 bg-white/5 p-4 text-sm text-white/75 leading-relaxed">
                    <span className="font-semibold text-white/85">Kein Risiko:</span> Du zahlst die zweite Rate erst,
                    wenn du die erste Version gesehen und freigegeben hast. Kein Geld für etwas, das du noch nicht kennst.
                  </div>
                </div>
              </div>
            </div>
          </CardShell>
        </Reveal>
      </SectionShell>

      {/* Prozess */}
      <SectionShell id="prozess">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Prozess</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Wie das konkret abläuft.
            <span className="block">
              <TitleGradient>Mit Meilensteinen – nicht „irgendwie“.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:gap-6">
          <StepItem
            n="1"
            title="Briefing (Start)"
            body={`Du schickst mir:\n– Was ihr anbietet\n– Wer eure Zielgruppe ist\n– Bis wann die Website stehen soll\n\nIch antworte innerhalb von 24 Stunden mit:\n– Einschätzung zum Umfang\n– Realistischem Zeitplan\n– Konkreten Rückfragen`}
            milestone="Wir wissen exakt, was gebaut wird (Umfang + Zeitplan)."
          />
          <StepItem
            n="2"
            title="Konzept & Struktur"
            body={`Ich lege fest:\n– Welche Seiten sinnvoll sind\n– Welche Inhalte auf welche Seite gehören\n– Wie der Ablauf Besucher → Kontakt aussieht\n\nDu bekommst das zur Freigabe. Erst wenn das passt, fange ich an zu bauen.`}
            milestone="Struktur freigegeben (du weißt vorher, was entsteht)."
          />
          <StepItem
            n="3"
            title="Erste Version + Feedback"
            body={`Du bekommst einen funktionierenden Link.\nDu kannst alles selbst testen – auch am Handy.\n\nEine vollständige Feedback-Runde ist enthalten (Änderungen sind hier eingebaut, nicht extra).`}
            milestone="Erste Version freigegeben (zweite Rate wird erst dann fällig)."
          />
          <StepItem
            n="4"
            title="Finalisierung"
            body={`Letzte Anpassungen, Feinschliff, technische Stabilisierung.\nWas vereinbart war, wird geliefert – kein Scope-Creep.\n\nWenn etwas zusätzlich dazu kommt, wird es vorher klar abgestimmt (damit es keine Überraschungen gibt).`}
            milestone="Finaler Stand freigegeben."
          />
          <StepItem
            n="5"
            title="Übergabe"
            body={`Du bekommst alles:\n– Zugänge (Domain/Hosting/Website)\n– Dateien/Assets\n– kurzes Setup-Briefing, damit du selbst weiterarbeiten kannst\n\nOptional: monatliche Betreuung ab hier.`}
            milestone="Go-Live + Übergabe (letzte Rate fällig)."
          />
        </div>
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
/* END: page.js */
