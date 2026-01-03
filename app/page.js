'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BarChart3,
  FileText,
  Clock,
  Globe2,
  Layers,
  CreditCard,
  Video,
  LayoutTemplate,
} from 'lucide-react';

export default function Home() {
  const [fadeDir, setFadeDir] = useState('fade-right');

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const handleResize = () => setFadeDir(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const modules = [
    {
      icon: <LayoutTemplate size={22} className="text-violet-300" />,
      title: 'Landingpages & Kampagnen',
      desc: 'Schlanke Seiten für Aktionen, Projekte oder Angebote – schnell online, klar strukturiert.',
      href: '/services/landingpages',
    },
    {
      icon: <FileText size={22} className="text-violet-300" />,
      title: 'Formulare & Kontaktwege',
      desc: 'Anfragen, Anmeldungen oder einfache Workflows – damit Interesse nicht verpufft.',
      href: '/services/forms',
    },
    {
      icon: <CreditCard size={22} className="text-violet-300" />,
      title: 'Spenden- & Zahlungswege',
      desc: 'PayPal, Überweisung, klare CTAs – ohne Reibung, ohne Umwege.',
      href: '/services/payments',
    },
    {
      icon: <Video size={22} className="text-violet-300" />,
      title: 'Kurzvideo & Motion',
      desc: 'Ein starkes Video oder Motion-Element für eine konkrete Aktion – kein Dauer-Content.',
      href: '/services/video',
    },
    {
      icon: <BarChart3 size={22} className="text-violet-300" />,
      title: 'Grundlegendes Tracking',
      desc: 'Einfaches Tracking, saubere Struktur – damit klar ist, was funktioniert.',
      href: '/services/analytics',
    },
    {
      icon: <ShieldCheck size={22} className="text-violet-300" />,
      title: 'Sauberer Go-Live',
      desc: 'Domain, Hosting & Übergabe – pragmatisch, dokumentiert, ohne Agentur-Overhead.',
      href: '/services/setup',
    },
  ];

  const qualities = [
    {
      icon: <Clock className="text-sky-300" size={18} />,
      title: 'Überschaubar',
      desc: 'Klare Projekte mit festem Zeitrahmen – kein Dauerstress.',
    },
    {
      icon: <Layers className="text-violet-300" size={18} />,
      title: 'Zusammenhängend',
      desc: 'Design, Inhalte und Technik greifen logisch ineinander.',
    },
    {
      icon: <Globe2 className="text-emerald-300" size={18} />,
      title: 'Für echte Nutzung',
      desc: 'Mobil-first, verständlich, handlungsorientiert.',
    },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-16 md:pb-20 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Kleine digitale Projekte · klar & projektbasiert
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Ein digitales Projekt?<span className="text-indigo-300">Dann bist du hier richtig.</span>.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Landingpages, Formulare, Zahlungswege und Medien für Projekte & Kampagnen – ohne Dauerbindung, ohne Social-Media-Zwang.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/portfolio/kirche-fundraising"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Fundraising-Projekt ansehen <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold"
            >
              Kontakt
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-indigo-200/90">
            <ShieldCheck size={16} className="text-emerald-400" />
            Klarer Rahmen · keine Endlos-Betreuung
          </div>
        </div>
      </section>

      <section className="px-5 md:px-16 -mt-6 mb-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {['Projektbasiert', 'Mobil optimiert', 'Schnell online', 'Klare Handlungswege', 'Ohne Dauerbindung'].map(
              (t) => (
                <span
                  key={t}
                  className="text-sm md:text-base text-neutral-200 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-16 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Was ich umsetze</h2>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />
          <div className="space-y-8">
            {modules.map((m, i) => (
              <div
                key={m.title}
                data-aos={fadeDir}
                data-aos-delay={i * 80}
                className="relative flex flex-col md:flex-row items-start gap-4 md:gap-8"
              >
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -top-1.5 w-4 h-4 rounded-full bg-violet-500 shadow-[0_0_0_6px_rgba(129,51,241,0.25)]" />
                <div
                  className={`w-full md:w-[48%] rounded-2xl border border-white/10 bg-white/[0.04] p-6
                  ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      {m.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold">{m.title}</h3>
                  </div>
                  <p className="mt-3 text-neutral-300">{m.desc}</p>
                  <div className="mt-4">
                    <Link href={m.href} className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200">
                      Details ansehen <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualities.map((b) => (
            <div key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-indigo-200">
                {b.icon}
                <span>{b.title}</span>
              </div>
              <p className="mt-3 text-neutral-300">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-16 py-16 md:py-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h2 className="text-3xl md:text-4xl font-bold">Ein Projekt im Kopf?</h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Schreib kurz, worum es geht – ich sage dir ehrlich, ob es in meinen Rahmen passt.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Kontakt aufnehmen <ArrowRight size={18} />
            </Link>
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold"
            >
              Portfolio ansehen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
