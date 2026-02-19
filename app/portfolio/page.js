'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Play, CheckCircle2, ExternalLink } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const projects = [
  {
    type: 'case',
    slug: 'kirche-fundraising',
    title: 'Fundraising – Kirche für Aschaffenburg',
    description: 'Landingpage, Spendenwege, Story, Flyer und Video. Konzeption, Design und komplette Umsetzung.',
    tags: ['Case', 'Website', 'Payments', 'Print'],
    image: '/img/portfolio/FUNDRAISING.png',
    cta: 'Projekt ansehen',
    featured: true,
  },
  {
    type: 'case',
    slug: 'brandbook',
    title: 'Brandbook & Brand Guidelines',
    description: 'Logo-Regeln, Typo, Farben, Layoutsystem und echte Beispiele – als Brandbook, das Teams wirklich nutzen.',
    tags: ['Brand', 'Guidelines', 'PDF', 'System'],
    image: '/img/portfolio/brandbook-cover.jpg',
    cta: 'Brandbook ansehen',
  },
  {
    type: 'motion',
    slug: 'motion-design',
    title: 'Motion Design und Video Editing',
    description: 'Kurzformate, Motion Graphics und Video-Storytelling für Marken und Creator.',
    tags: ['Video', 'Motion'],
    image: '/img/portfolio/motion-poster.jpg',
    cta: 'Motion ansehen',
  },
  {
    type: 'externalVideo',
    title: 'Influencer-Edit: Thyssenkrupp Probetag',
    description: 'Schnitt und Motion: ein kompletter Tag als YouTube-Story erzählt.',
    tags: ['YouTube', 'Editing'],
    image: '/img/portfolio/thyssenkrupp.png',
    href: 'https://youtu.be/Xt9Rm2pDoiE?si=BDxBO3DdHhnE-BSG',
    cta: 'Video ansehen',
  },
];

const SCENES = {
  header: {
    base: '#070312',
    g1: `radial-gradient(1200px 700px at 18% 18%, rgba(168,85,247,0.22), transparent 60%),
         radial-gradient(900px 700px at 82% 25%, rgba(56,189,248,0.10), transparent 55%)`,
    g2: `linear-gradient(135deg, #070312 0%, #0b0b1a 50%, #03040e 100%)`,
    blobs: [
      { cls: 'bg-violet-500/14', x: '-20%', y: '-18%', s: '56rem', blur: 140 },
      { cls: 'bg-cyan-500/10', x: '70%', y: '10%', s: '54rem', blur: 150 },
      { cls: 'bg-fuchsia-500/9', x: '20%', y: '80%', s: '46rem', blur: 150 },
    ],
    accent: 'from-violet-200 via-indigo-200 to-cyan-200',
  },
  grid: {
    base: '#021019',
    g1: `radial-gradient(1100px 750px at 22% 20%, rgba(34,211,238,0.18), transparent 60%),
         radial-gradient(900px 700px at 88% 15%, rgba(99,102,241,0.14), transparent 55%)`,
    g2: `linear-gradient(135deg, #021019 0%, #07102a 55%, #05010b 100%)`,
    blobs: [
      { cls: 'bg-cyan-500/12', x: '-10%', y: '-10%', s: '58rem', blur: 150 },
      { cls: 'bg-indigo-500/11', x: '72%', y: '0%', s: '54rem', blur: 150 },
      { cls: 'bg-emerald-500/8', x: '10%', y: '75%', s: '46rem', blur: 160 },
    ],
    accent: 'from-cyan-200 via-indigo-200 to-violet-200',
  },
  cta: {
    base: '#04040a',
    g1: `radial-gradient(1200px 750px at 15% 0%, rgba(99,102,241,0.14), transparent 60%),
         radial-gradient(900px 700px at 90% 15%, rgba(56,189,248,0.08), transparent 55%)`,
    g2: `linear-gradient(135deg, #04040a 0%, #07071a 55%, #04030a 100%)`,
    blobs: [
      { cls: 'bg-indigo-500/10', x: '-12%', y: '-18%', s: '56rem', blur: 170 },
      { cls: 'bg-cyan-500/8', x: '76%', y: '8%', s: '56rem', blur: 170 },
      { cls: 'bg-violet-500/8', x: '18%', y: '82%', s: '48rem', blur: 170 },
    ],
    accent: 'from-indigo-200 via-violet-200 to-cyan-200',
  },
};

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

function TitleGradient({ scene = 'header', children }) {
  return (
    <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', SCENES[scene].accent)}>
      {children}
    </span>
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

function GlobalScene({ sceneKey, active }) {
  const s = SCENES[sceneKey];
  return (
    <div
      className={cx(
        'absolute inset-0 transition-[opacity,filter,transform] duration-[1200ms] ease-out will-change-[opacity,filter,transform]',
        active ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-[14px] scale-[1.02]'
      )}
      style={{
        backgroundColor: s.base,
        backgroundImage: `${s.g1}, ${s.g2}`,
      }}
    />
  );
}

function GlobalLightLeaks({ sceneKey, active }) {
  const s = SCENES[sceneKey];
  return (
    <div
      className={cx(
        'absolute inset-0 transition-[opacity,filter] duration-[1200ms] ease-out will-change-[opacity,filter]',
        active ? 'opacity-100 blur-0' : 'opacity-0 blur-[20px]'
      )}
    >
      {s.blobs.map((b, i) => (
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

function useSceneByScroll() {
  const [scene, setScene] = useState('header');

  useEffect(() => {
    const ids = ['portfolio-header', 'portfolio-grid', 'portfolio-cta'];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!best?.target?.id) return;

        const id = best.target.id;
        if (id === 'portfolio-header') setScene('header');
        if (id === 'portfolio-grid') setScene('grid');
        if (id === 'portfolio-cta') setScene('cta');
      },
      { root: null, rootMargin: '-40% 0px -55% 0px', threshold: [0.12, 0.25, 0.4, 0.55, 0.7] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return scene;
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
      const rx = (0.5 - py) * 9;
      const ry = (px - 0.5) * 11;

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
          background: 'radial-gradient(520px 380px at var(--hx, 50%) var(--hy, 30%), rgba(255,255,255,0.10), transparent 62%)',
          mixBlendMode: 'screen',
        }}
      />
      {children}
    </div>
  );
}

/* ---------- PAGE ---------- */

export default function PortfolioPage() {
  const ordered = useMemo(() => [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)), []);
  const activeScene = useSceneByScroll();

  return (
    <div className="font-proxima text-white min-h-screen">
      <style>{globalKeyframes}</style>

      {/* Background system aligned to homepage */}
      <div className="fixed inset-0 -z-10">
        <GlobalScene sceneKey="header" active={activeScene === 'header'} />
        <GlobalScene sceneKey="grid" active={activeScene === 'grid'} />
        <GlobalScene sceneKey="cta" active={activeScene === 'cta'} />

        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0">
            <GlobalLightLeaks sceneKey="header" active={activeScene === 'header'} />
            <GlobalLightLeaks sceneKey="grid" active={activeScene === 'grid'} />
            <GlobalLightLeaks sceneKey="cta" active={activeScene === 'cta'} />
          </div>
        </div>

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

      <ScrollProgressBar />

      <Navbar />

      {/* HEADER */}
      <section id="portfolio-header" className="px-5 md:px-16 pt-20 md:pt-24 pb-10">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs text-white/85 bg-white/10 ring-1 ring-white/15 px-3 py-1 rounded-full">
            <Sparkles size={14} /> Portfolio
          </span>

          <div className="mt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Projekte, die man einordnen kann.
                <span className="block">
                  <TitleGradient scene="header">Nicht als Galerie gedacht.</TitleGradient>
                </span>
              </h1>
              <p className="mt-4 text-white/75 leading-relaxed text-sm md:text-base">
                Nicht als Galerie gedacht, sondern als Einblick in meine Arbeit. Wenn du sehen willst, wie Struktur,
                Ablauf und Übergabe bei mir aussehen, wähle ein Projekt aus.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <Link
                href="/#request"
                className="group px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Kurz anfragen <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <p className="text-sm text-white/60 max-w-xs md:text-right">
                Schick mir Ziel, Deadline und Stand. Dann sage ich dir, ob es passt und wie wir starten.
              </p>
            </div>
          </div>

          {/* scan tip */}
          <div className="mt-8 rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md p-5 md:p-6">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="shrink-0 text-white" size={18} />
              <p className="text-sm md:text-base text-white/75 leading-relaxed">
                Achte beim Durchklicken auf drei Dinge: klare Nutzerführung, saubere Struktur und eine Übergabe, mit der
                man weiterarbeiten kann.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section id="portfolio-grid" className="px-5 md:px-16 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {ordered.map((p) => {
            if (p.type === 'externalVideo') return <ExternalVideoCard key={p.href} project={p} />;
            return <InternalCard key={p.slug} project={p} />;
          })}
        </div>
      </section>

      {/* bottom CTA */}
      <section id="portfolio-cta" className="px-5 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md p-6 md:p-10 text-center overflow-hidden relative">
            <div className="pointer-events-none absolute inset-0 opacity-70 blur-2xl bg-[radial-gradient(60%_80%_at_25%_10%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(60%_80%_at_80%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(55%_80%_at_50%_110%,rgba(16,185,129,0.06),transparent_60%)]" />

            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold">Wenn du willst, schick mir kurz dein Vorhaben</h2>
              <p className="mt-3 text-white/75 max-w-2xl mx-auto">
                Ziel, Deadline und Stand reichen. Dann bekommst du eine klare Einschätzung, ob es passt.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  href="/#request"
                  className="group px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold inline-flex items-center justify-center gap-2"
                >
                  Kurz anfragen <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="mt-4 text-sm text-white/55 inline-flex items-center gap-2 justify-center">
                Oder erst schauen: <Link href="/portfolio" className="underline hover:text-white/80">mehr Projekte</Link>{' '}
                <ExternalLink size={14} className="opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- CARDS ---------- */

function InternalCard({ project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cx(
        'group rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md overflow-hidden transition-colors',
        'hover:border-white/25',
        project.featured ? 'md:col-span-2' : ''
      )}
    >
      <TiltCard className="rounded-3xl">
        <div className="relative">
          <CardMedia project={project} />
          <CardBody project={project} />
        </div>
      </TiltCard>
    </Link>
  );
}

function ExternalVideoCard({ project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md overflow-hidden hover:border-white/25 transition-colors"
    >
      <TiltCard className="rounded-3xl">
        <div className="relative">
          <CardMedia project={project} isExternalVideo />
          <CardBody project={project} isExternal />
        </div>
      </TiltCard>
    </a>
  );
}

function CardMedia({ project, isExternalVideo = false }) {
  const showPlay = project.type === 'motion' || isExternalVideo;

  return (
    <div className="relative h-56 overflow-hidden bg-white/5">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-[0.92] group-hover:scale-[1.03] transition-transform duration-500"
        priority={false}
      />

      {/* highlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(520px 280px at 50% 10%, rgba(255,255,255,0.10), transparent 60%), linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.08), transparent)',
        }}
      />

      {showPlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-black/35 p-4 border border-white/20 backdrop-blur-md">
            <Play />
          </div>
        </div>
      )}

      {project.featured && (
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-2 text-xs text-white/85 bg-black/25 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md">
            Case Study
          </span>
        </div>
      )}
    </div>
  );
}

function CardBody({ project, isExternal = false }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white/95">{project.title}</h2>
      <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/12 text-white/75">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-white/90 group-hover:text-white font-semibold">
        {project.cta}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        {isExternal ? <ExternalLink size={14} className="opacity-70" /> : null}
      </div>
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
@keyframes noiseMove {
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
