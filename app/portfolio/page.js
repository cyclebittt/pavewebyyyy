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
    title: 'Fundraising – Kirche für Aschaffenburg',
    description: 'Landingpage, Spendenwege, Story, Flyer & Video. Konzeption, Design & komplette Umsetzung.',
    tags: ['Webdesign', 'Fundraising', 'Payments', 'Print'],
    image: '/img/portfolio/FUNDRAISING.png',
    cta: 'Projekt ansehen',
  },
  {
    type: 'motion',
    slug: 'motion-design',
    title: 'Motion Design & Video Editing',
    description: 'Kurzformate, Motion Graphics & Video-Storytelling für Marken & Creator.',
    tags: ['Motion Design', 'Video', 'KI', 'Social Media'],
    image: '/img/portfolio/motion-poster.jpg',
    cta: 'Motion ansehen',
  },
];

export default function PortfolioPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      <section className="px-5 md:px-16 pt-20 md:pt-24 pb-14">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs text-indigo-300/80 bg-white/5 px-3 py-1 rounded-full">
            <Sparkles size={14} /> Portfolio
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
            Klar umgesetzte digitale Projekte.
          </h1>

          <p className="mt-4 max-w-xl text-neutral-300">
            Alles hier ist selbst konzipiert, gestaltet und programmiert – mit Fokus auf Klarheit, Wirkung und Umsetzung.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-16 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
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
      href={`/portfolio/${project.slug}`}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-white/25 transition-colors"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform"
        />
        {project.type === 'motion' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/50 p-4 border border-white/20">
              <Play />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold">{project.title}</h2>
        <p className="mt-2 text-sm text-neutral-300">{project.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 inline-flex items-center gap-2 text-indigo-200">
          {project.cta}
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}

