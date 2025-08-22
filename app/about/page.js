'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Sparkles, ArrowRight, Target, Users, Rocket, Workflow, Lightbulb, Heart } from 'lucide-react';

export default function AboutPage() {
  const [fadeDir, setFadeDir] = useState('fade-right');

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const onResize = () => setFadeDir(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const values = [
    {
      icon: <Target className="text-indigo-300" />,
      title: 'Psychologisch fundiert',
      desc: 'Kommunikation, die wirkt: Klarheit, Relevanz und Conversion statt bloßer Ästhetik.',
    },
    {
      icon: <Workflow className="text-indigo-300" />,
      title: 'Modular & flexibel',
      desc: 'Bausteine, die mitwachsen. Starte schlank und erweitere ohne Brüche.',
    },
    {
      icon: <Users className="text-indigo-300" />,
      title: 'Kollaborativ',
      desc: 'Netzwerk statt starre Agentur. Für Tempo, Qualität und faire Beteiligungen.',
    },
    {
      icon: <Heart className="text-indigo-300" />,
      title: 'Niederschwellig & professionell',
      desc: 'Auch kleine Unternehmen verdienen starke Markenkommunikation.',
    },
  ];

  const pillars = [
    'Branding & Positionierung',
    'Webdesign',
    'Social Media Management',
    'Content Creation',
    'Leadsystem & Angebotsstruktur',
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-20 md:pb-28 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Über uns
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            paveo – das mdulare Kreativ-Studio
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Wir helfen Selbstständigen & KMU, sichtbar, professionell und psychologisch wirksam aufzutreten – mit
            klaren Systemen aus Branding, Web, Content & Leads.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Projekt starten <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold">
              Kontakt
            </Link>
          </div>
        </div>
      </section>

      {/* WER WIR SIND */}
      <section className="px-5 md:px-16 py-16">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold">Wer wir sind</h2>
          <p className="mt-4 text-neutral-300">
            paveo ist ein junges, schlankes Studio für digitale Markenkommunikation. Wir denken in Modulen – von
            Positionierung über Design bis Content & Systeme. Unser Fokus: Wirkung und Einfachheit. Statt
            „Overengineering“ liefern wir klare Strukturen, wiederverwendbare Komponenten und verständliche Prozesse,
            die dein Marketing alltagstauglich machen.
          </p>
          <p className="mt-4 text-neutral-300">
            Unsere Arbeitsweise ist kollaborativ: Wir greifen auf ein Netzwerk spezialisierter Kreativer zurück und
            stellen für jedes Projekt das beste Setup zusammen. So bleibt es effizient, nahbar und skalierbar.
          </p>
        </div>

        {/* Werte */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          {values.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              data-aos={fadeDir}
              data-aos-delay={i * 100}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 backdrop-blur-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">{icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-neutral-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WAS WIR TUN / MODULE */}
      <section className="px-5 md:px-16 py-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold">Unsere Module</h2>
          <p className="mt-2 text-neutral-300">Buche nur, was du brauchst – kombinierbar ohne Brüche.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((p, i) => (
              <div key={p} className="rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-colors p-5">
                <div className="text-indigo-300 font-semibold">0{i + 1}</div>
                <div className="mt-2 text-neutral-100 font-medium">{p}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services/branding" className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Branding ansehen <ArrowRight size={18} />
            </Link>
            <Link href="/services/webdesign" className="px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors">
              Webdesign
            </Link>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="px-5 md:px-16 py-16">
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-semibold">Vision</h2>
            <p className="mt-4 text-neutral-300">
              paveo soll die smarte, klare Marke für kleine bis mittlere Unternehmen sein – mit Kommunikation, die
              messbar performt, Designs, die wiederverwendbar sind, und Strukturen, die Wachstum ermöglichen.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Rocket className="text-indigo-300" />
            </div>
            <p className="mt-3 text-neutral-300">
              Slack + Asana, klare Zuständigkeiten, Templates für Outreach & Self-Branding – damit Projekte flüssig laufen.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 py-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h2 className="text-3xl md:text-4xl font-bold">Lass uns starten.</h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Schreib uns kurz, was du vorhast – wir melden uns zeitnah mit einem Vorschlag.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Termin vereinbaren <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold">
              Nachricht senden
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

