'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Globe2,
  Clock,
  LayoutTemplate,
  CreditCard,
  FileText,
  Video,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ---------- UTIL ---------- */

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

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

/* ---------- CASE SCENE (matches homepage style system) ---------- */

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

function TitleGradient({ children }: { children: React.ReactNode }) {
  return <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', CASE_SCENE.accent)}>{children}</span>;
}

/* ---------- GLOBAL BACKGROUND (single-scene like homepage) ---------- */

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

      <div className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
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

/* ---------- SHARED UI ---------- */

function PrimaryCTA({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const Inner = (
    <span className="group px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2">
      {label}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
    </span>
  );

  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {Inner}
        </a>
      ) : (
        <Link href={href}>{Inner}</Link>
      )}
    </Magnetic>
  );
}

function GhostCTA({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs md:text-[13px] text-white/85 border border-white/15">
      {children}
    </span>
  );
}

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

function MiniCard({
  icon,
  title,
  bullets,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
}) {
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/90">
              {icon}
            </div>
            <h3 className="text-sm md:text-base font-semibold text-white/90">{title}</h3>
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

function SectionShell({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="relative px-5 md:px-16 py-12 md:py-16">
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* ---------- PAGE ---------- */

export default function KircheFundraisingPage() {
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
    <div className="font-proxima text-white min-h-screen">
      <style>{globalKeyframes}</style>

      <GlobalBackground />
      <GlobalLightLeaks />
      <ScrollProgressBar />
      <CursorHalo />

      <Navbar />

      {/* HERO */}
      <SectionShell id="top">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Zurück zum Portfolio
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-8 items-start">
            {/* LEFT */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
                  <Sparkles size={16} /> Case Study · Kirche für Aschaffenburg
                </span>
              </Reveal>

              <Reveal delayMs={90}>
                <h1 className="mt-4 text-3xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                  Fundraising-Seite,
                  <span className="block">
                    <TitleGradient>klar aufgebaut und schnell live.</TitleGradient>
                  </span>
                </h1>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="mt-4 text-white/80 text-sm md:text-base max-w-xl leading-relaxed">
                  Ziel war eine Seite, die ohne Erklärung funktioniert: Anliegen verstehen, Vertrauen bekommen, Spendenweg wählen.
                  Dazu DE/EN Inhalte, Flyer und ein Projektvideo.
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="mt-6 flex flex-wrap gap-2 text-xs md:text-sm">
                  <Badge>Landingpage</Badge>
                  <Badge>DE &amp; EN</Badge>
                  <Badge>PayPal &amp; Überweisung</Badge>
                  <Badge>QR-Codes</Badge>
                  <Badge>Flyer</Badge>
                  <Badge>Video</Badge>
                </div>
              </Reveal>

              <Reveal delayMs={320}>
                <div className="mt-8 flex flex-wrap gap-2">
                  <PrimaryCTA href="https://kircheab.de/spenden" label="Zur Spenden-Seite" external />
                  <GhostCTA href="/#request">
                    Ähnliches Projekt anfragen <ArrowRight size={16} />
                  </GhostCTA>
                </div>
              </Reveal>

              <Reveal delayMs={380}>
                <div className="mt-4 text-sm text-white/60">
                  Kurzformat: <span className="text-white/70">Ziel, Deadline, Stand</span>. Dann bekommst du eine klare Einschätzung.
                </div>
              </Reveal>
            </div>

            {/* RIGHT */}
            <Reveal delayMs={140}>
              <TiltCard className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-4 md:p-5 overflow-hidden relative">
                  <div
                    className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.07]"
                    style={{
                      filter: 'blur(50px)',
                      animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite',
                    }}
                  />

                  <div className="flex items-center justify-between gap-3 px-2 pb-3">
                    <div className="inline-flex items-center gap-2 text-xs md:text-sm text-white/85">
                      <Video size={16} className="text-white/80" />
                      Projektvideo
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs text-white/55">
                      <Globe2 size={14} className="text-white/60" />
                      DE &amp; EN
                    </div>
                  </div>

                  <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube-nocookie.com/embed/svgNO7ErcKg"
                      title="Kirche für Aschaffenburg – Fundraising Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/15 bg-black/20 backdrop-blur-md p-4 md:p-5">
                    <div className="text-xs uppercase tracking-wide text-white/55">Spenden in 2 Monaten</div>
                    <div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
                      <TitleGradient>17.000 €</TitleGradient>
                    </div>
                    <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                      Wir sind sehr dankbar. Aus unserer Sicht wäre das ohne Gott nicht möglich gewesen.
                    </p>
                  </div>

                  <div className="mt-4 px-2 flex flex-wrap gap-2">
                    <GhostCTA href="https://kircheab.de/spenden" external>
                      Landingpage ansehen <ExternalLink size={16} />
                    </GhostCTA>
                    <GhostCTA href="/portfolio">
                      Mehr Cases <ArrowRight size={16} />
                    </GhostCTA>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* META */}
      <SectionShell>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <MetaCard label="Ziel" value="Spenden sammeln" />
          <MetaCard label="Zeitraum" value="~ 2 Wochen bis live" icon={<Clock size={16} />} />
          <MetaCard label="Rolle" value="Konzept · Design · Umsetzung" />
          <MetaCard label="Setup" value="DE/EN · Payments · QR" />
        </div>
      </SectionShell>

      {/* WHAT I DID */}
      <SectionShell>
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Was geliefert wurde</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Klarer Aufbau,
            <span className="block">
              <TitleGradient>wenig Reibung.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="mt-4 text-sm md:text-base text-white/70 max-w-2xl leading-relaxed">
            Fokus war weniger „schön“, sondern „verständlich und einfach zu nutzen“: klare Story, klare Spendenwege, sauberer Ablauf.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
      </SectionShell>

      {/* IMPACT */}
      <SectionShell>
        <Reveal>
          <TiltCard className="rounded-3xl">
            <div className="rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-6 md:p-10 overflow-hidden relative">
              <div
                className="pointer-events-none absolute -left-40 -top-12 h-[140%] w-72 rotate-12 bg-white/10 opacity-[0.07]"
                style={{
                  filter: 'blur(50px)',
                  animation: 'shineSoft 6.2s cubic-bezier(.2,.9,.2,1) infinite',
                }}
              />

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-white/55">Wirkung</div>
                  <h3 className="mt-3 text-xl md:text-3xl font-bold text-white/90">System statt Einzelteil</h3>
                  <p className="mt-3 text-sm md:text-base text-white/70 max-w-2xl leading-relaxed">
                    Die Seite wurde so gebaut, dass Menschen schnell verstehen, worum es geht, und ohne Hürden spenden können.
                  </p>
                </div>

                <Link href="/#request" className="text-sm md:text-base text-white/70 hover:text-white transition-colors md:text-right">
                  Ähnliches Projekt anfragen <span className="text-white/45">(3 Infos reichen)</span>
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                <ImpactItem text="Anliegen in wenigen Sekunden verständlich durch Story und klare Struktur." />
                <ImpactItem text="Spendenweg direkt: PayPal oder Überweisung, ergänzt durch QR-Codes." />
                <ImpactItem text="Einheitliche Assets (Flyer und Video), damit überall auf dasselbe Ziel verlinkt wird." />
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <PrimaryCTA href="https://kircheab.de/spenden" label="Zur Spenden-Seite" external />
                <GhostCTA href="/portfolio">Mehr Projekte ansehen</GhostCTA>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </SectionShell>

      <Footer />
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
