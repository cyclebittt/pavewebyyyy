'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowRight, Sparkles, Target, LayoutTemplate, Palette, Type, Rocket, MessageSquare } from 'lucide-react';

export default function Home() {
  const [fadeDir, setFadeDir] = useState('fade-right');

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const handleResize = () => setFadeDir(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    {
      title: 'Social Media Management',
      desc: 'Strategie, Content Creation & Performance – alles für einen starken Auftritt.',
      icon: <MessageSquare size={26} className="text-violet-400" />,
      href: '/services/socialmedia',
    },
    {
      title: 'Branding & Positionierung',
      desc: 'Klare Botschaften, starke Designs & Systeme, die wachsen.',
      icon: <Target size={26} className="text-violet-400" />,
      href: '/services/branding',
    },
    {
      title: 'Webdesign',
      desc: 'Websites, die begeistern: modern, schnell & nutzerfreundlich.',
      icon: <LayoutTemplate size={26} className="text-violet-400" />,
      href: '/services/webdesign',
    },
    {
      title: 'Content Creation',
      desc: 'Foto, Video & Design – Content, der deine Marke lebendig macht.',
      icon: <Palette size={26} className="text-violet-400" />,
      href: '/services/content',
    },
    {
      title: 'Lead & Angebotsstruktur',
      desc: 'Strukturen für mehr Kunden, klare Angebote & bessere Abschlüsse.',
      icon: <Rocket size={26} className="text-violet-400" />,
      href: '/services/lead',
    },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-24 md:pb-32 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Kreativ-Studio für digitale Marken
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Wir machen Marken <span className="text-indigo-300">sichtbar</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Von Branding bis Content: Wir helfen Selbstständigen & Unternehmen dabei, 
            professionell und wirkungsvoll aufzutreten – digital & kreativ.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/request"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Projekt starten <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-5 md:px-16 py-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">Unsere Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ title, desc, icon, href }, i) => (
            <Link
              key={title}
              href={href}
              data-aos={fadeDir}
              data-aos-delay={i * 100}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 backdrop-blur-sm hover:bg-white/[0.06] transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                {icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-neutral-300">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-indigo-300 font-medium">
                Mehr erfahren <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 py-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Bereit, deine Marke auf das nächste Level zu bringen?
          </h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Starte jetzt mit einem unverbindlichen Gespräch und finde heraus, wie wir dich unterstützen können.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/request"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Termin vereinbaren <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

