'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

const projects = [
  {
    slug: 'kirche-fundraising',
    title: 'Fundraising: Kirche für Aschaffenburg',
    oneLiner: 'Landingpage + Spendenwege + Flyer + Video — in 2 Wochen live.',
    tags: ['Fundraising', 'Landingpage', 'Payments', 'Print'],
    image: '/img/portfolio/FUNDRAISING.png', // <- hier dein Schaubild
    type: 'case',
  },
  {
    slug: 'thyssenkrupp-probetag',
    title: 'Influencer-Edit: Thyssenkrupp Probetag',
    oneLiner: 'Schnitt & Motion: ein kompletter Tag als YouTube-Story erzählt.',
    tags: ['Video Editing', 'Motion', 'YouTube'],
    image: '/img/portfolio/erkin.png', // <- falls du kein extra Thumbnail hast, nutz das erstmal
    type: 'video',
    youtube: 'https://youtu.be/Xt9Rm2pDoiE?si=BDxBO3DdHhnE-BSG',
  },
];

export default function PortfolioPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-16 pt-16 md:pt-20 pb-10 md:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-7 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Portfolio
              </span>

              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
                Projekte, die in Sekunden klar werden.
              </h1>

              <p className="mt-4 text-sm md:text-base text-neutral-300 max-w-xl">
                Wenig Blabla, klare Wirkung: Landingpages & Medien, die Menschen sofort verstehen — und die nächste
                Aktion auslösen.
              </p>
            </div>

            {/* HERO THUMB (erkin.png) */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
              <div className="relative w-full h-40 md:h-44 lg:h-48">
                <Image
                  src="/img/portfolio/erkin.png"
                  alt="Portfolio Titelbild"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>

              <div className="p-4">
                <div className="text-sm text-neutral-200">
                  Fokus: <span className="text-indigo-200">klarer Aufbau</span> · <span className="text-indigo-200">kurze Inhalte</span> ·{' '}
                  <span className="text-indigo-200">starke CTAs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-5 md:px-16 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ProjectCard({ project }) {
  const isVideo = project.type === 'video';

  // Video-Projekt: extern auf YouTube
  // Case: intern auf /portfolio/[slug]
  const href = isVideo ? project.youtube : `/portfolio/${project.slug}`;

  return (
    <a
      href={href}
      target={isVideo ? '_blank' : undefined}
      rel={isVideo ? 'noopener noreferrer' : undefined}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-white/25 transition-colors"
    >
      <div className="relative w-full h-52 md:h-60 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {isVideo && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/10 px-3 py-1 text-xs text-neutral-100">
            <Play size={14} className="text-indigo-200" /> YouTube
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold leading-snug">{project.title}</h2>
        <p className="mt-2 text-sm md:text-[15px] text-neutral-300">{project.oneLiner}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] md:text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-sm text-indigo-200 group-hover:text-indigo-100">
          {isVideo ? 'Video ansehen' : 'Projekt ansehen'}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}
