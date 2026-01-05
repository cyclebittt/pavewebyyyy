'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

const projects = [
  {
    type: 'case',
    slug: 'kirche-fundraising',
    title: 'Fundraising: Kirche für Aschaffenburg',
    description: 'Landingpage + Spendenwege + Flyer + Video — in 2 Wochen live.',
    tags: ['Fundraising', 'Landingpage', 'Payments', 'Print'],
    image: '/img/portfolio/FUNDRAISING.png',
    cta: 'Projekt ansehen',
  },
  {
    type: 'video',
    title: 'Influencer-Edit: Thyssenkrupp Probetag',
    description: 'Schnitt & Motion: ein kompletter Tag als YouTube-Story erzählt.',
    tags: ['Video Editing', 'Motion', 'YouTube'],
    image: '/img/portfolio/thyssenkrupp.png',
    href: 'https://youtu.be/Xt9Rm2pDoiE?si=BDxBO3DdHhnE-BSG',
    cta: 'Video ansehen',
  },
];

export default function PortfolioPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO (ohne oberes Rectangle) */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.18),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-16 pt-16 md:pt-20 pb-8 md:pb-12">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-200/90 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Portfolio
          </span>

          <div className="mt-5 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Projekte, die in Sekunden klar werden.
            </h1>
            <p className="mt-4 text-neutral-300 text-base md:text-lg">
              Meine letzten Projekte auf einem Blick
            </p>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-5 md:px-16 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p) =>
            p.type === 'case' ? (
              <CaseCard key={p.slug} project={p} />
            ) : (
              <VideoCard key={p.href} project={p} />
            )
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CaseCard({ project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden flex flex-col hover:border-white/25 transition-colors"
    >
      <div className="relative w-full h-56 md:h-60 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="p-5 md:p-6 flex flex-col gap-3">
        <h2 className="text-lg md:text-xl font-semibold">{project.title}</h2>
        <p className="text-sm md:text-[15px] text-neutral-300">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] md:text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-200 group-hover:text-indigo-100">
          {project.cta}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function VideoCard({ project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden flex flex-col hover:border-white/25 transition-colors"
    >
      <div className="relative w-full h-56 md:h-60 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-white/90">
          <Play size={14} /> YouTube
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col gap-3">
        <h2 className="text-lg md:text-xl font-semibold">{project.title}</h2>
        <p className="text-sm md:text-[15px] text-neutral-300">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] md:text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-200 group-hover:text-indigo-100">
          {project.cta}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}
