'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Play, CheckCircle2 } from 'lucide-react';

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

export default function PortfolioPage() {
  const ordered = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="px-5 md:px-16 pt-20 md:pt-24 pb-10">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={14} /> Portfolio
          </span>

          <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Projekte, die man einordnen kann.
              </h1>
              <p className="mt-4 text-neutral-300 leading-relaxed">
                Nicht als Galerie gedacht, sondern als Einblick in meine Arbeit.
                Wenn du sehen willst, wie Struktur, Ablauf und Übergabe bei mir aussehen, wähle ein Projekt aus.
              </p>
            </div>

            {/* single primary CTA to /contact */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Kurz anfragen <ArrowRight size={18} />
              </Link>
              <p className="text-sm text-neutral-400 max-w-xs md:text-right">
                Schick mir Ziel, Deadline und Stand. Dann sage ich dir, ob es passt und wie wir starten.
              </p>
            </div>
          </div>

          {/* what to look for (scan-friendly, not too loud) */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                Achte beim Durchklicken auf drei Dinge: klare Nutzerführung, saubere Struktur und eine Übergabe,
                mit der man weiterarbeiten kann.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-5 md:px-16 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {ordered.map((p) => {
            if (p.type === 'externalVideo') return <ExternalVideoCard key={p.href} project={p} />;
            return <InternalCard key={p.slug} project={p} />;
          })}
        </div>
      </section>

      {/* bottom CTA (same single CTA, no competing buttons) */}
      <section className="px-5 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Wenn du willst, schick mir kurz dein Vorhaben</h2>
            <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
              Ziel, Deadline und Stand reichen. Dann bekommst du eine klare Einschätzung, ob es passt.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Kurz anfragen <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function InternalCard({ project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={[
        'group rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-white/25 transition-colors',
        project.featured ? 'md:col-span-2' : '',
      ].join(' ')}
    >
      <CardMedia project={project} />
      <CardBody project={project} />
    </Link>
  );
}

function ExternalVideoCard({ project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-white/25 transition-colors"
    >
      <CardMedia project={project} isExternalVideo />
      <CardBody project={project} />
    </a>
  );
}

function CardMedia({ project, isExternalVideo = false }) {
  const showPlay = project.type === 'motion' || isExternalVideo;

  return (
    <div className="relative h-56 overflow-hidden bg-white/[0.03]">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover group-hover:scale-[1.03] transition-transform"
        priority={false}
      />

      {showPlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-black/45 p-4 border border-white/20 backdrop-blur-sm">
            <Play />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      {project.featured && (
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-2 text-xs text-indigo-200 bg-black/35 border border-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
            Case Study
          </span>
        </div>
      )}
    </div>
  );
}

function CardBody({ project }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p className="mt-2 text-sm md:text-base text-neutral-300 leading-relaxed">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-indigo-200 group-hover:text-indigo-100 font-semibold">
        {project.cta}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}
