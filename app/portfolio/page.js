'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const projects = [
  {
    slug: 'kirche-fundraising',
    title: 'Fundraising: Kirche für Aschaffenburg',
    description:
      'Komplette digitale Umsetzung einer Spendenaktion: Landingpage, Zahlungswege, Story, Flyer und Video – in nur zwei Wochen.',
    tags: ['Fundraising', 'Landingpage', 'Formulare', 'Video', 'Print'],
    image: '/img/portfolio/kirche-hero.jpg', // gerne durch echten Screenshot ersetzen
  },
  // hier kannst du später weitere Projekte ergänzen:
  // {
  //   slug: 'xyz',
  //   title: 'Anderes Projekt',
  //   description: 'Kurzbeschreibung ...',
  //   tags: ['Webdesign', 'E-Mail', '…'],
  //   image: '/img/portfolio/xyz.jpg',
  // },
];

export default function PortfolioPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-16 pt-20 md:pt-24 pb-10 md:pb-14">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Ausgewählte Arbeiten
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
            Projekte, bei denen digitale Kommunikation trägt.
          </h1>
          <p className="mt-4 text-sm md:text-base text-neutral-300 max-w-2xl">
            Eine kleine Auswahl an Projekten, bei denen ich Landingpages, Spendenstrecken,
            Formulare, Medien und Design so verbunden habe, dass Menschen verstehen,
            worum es geht – und wie sie unterstützen können.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="relative px-5 md:px-16 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
  return (
    <Link
      href={`/portfolio/${project.slug}`}   // <-- HIER geht’s auf /portfolio/kirche-fundraising
      className="group rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden flex flex-col hover:border-white/25 transition-colors"
    >
      <div className="relative w-full h-52 md:h-60 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
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
          Projekt ansehen
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
