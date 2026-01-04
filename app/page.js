'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LayoutTemplate,
  CreditCard,
  Video,
  FileText,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 500, once: true, offset: 40 });
  }, []);

  const services = [
    {
      icon: <LayoutTemplate size={18} className="text-violet-300" />,
      title: 'Landingpages & Websites',
      desc: 'Klarer Aufbau, mobil optimiert, schnelle Umsetzung.',
      href: '/services/landingpages',
    },
    {
      icon: <CreditCard size={18} className="text-violet-300" />,
      title: 'Zahlungswege',
      desc: 'Einrichtung von PayPal/Überweisung/CTAs auf deiner Website',
      href: '/services/payments',
    },
    {
      icon: <FileText size={18} className="text-violet-300" />,
      title: 'Formulare & Kontakt',
      desc: 'Anfragen, Anmeldungen, klare Workflows.',
      href: '/services/forms',
    },
    {
      icon: <Video size={18} className="text-violet-300" />,
      title: 'Videoediting',
      desc: 'Visualisieren deiner Vision - sei es mit Drohnenaufnahmen, Motion Designs, Short-Form, uvm.',
      href: '/services/video',
    },
  ];

  const proof = [
    { k: 'Case', v: 'Fundraising-Kampagne' },
    { k: 'Deliverables', v: 'Website, Video Pre- & Postproduction, Einrichtung verschiedener Zahlungswege' },
    { k: 'Timing', v: 'Launch in 2 Wochen (Fixtermin)' },
  ];

  const trust = [
    { title: 'Projektbasiert', text: 'Ich fokussiere mich völlig auf dein Projekt.' },
    { title: 'Umsetzungsfokus', text: 'Ich setze deine Vision in wenigen Tagen um und reagiere auf dein Feedback.' },
    { title: 'Kommunikativ', text: 'Ich antworte dir in weniger als 24h.' },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-10 md:pb-12 max-w-5xl mx-auto">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
              <Sparkles size={16} /> Projektbasierte digitale Umsetzung
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight" data-aos="fade-up">
              <span className="block">Ich baue Websites & Kampagnen-Medien,</span>
              <span className="block text-indigo-300">die schnell online gehen und genutzt werden.</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-neutral-300 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="60">
              Für Aktionen, Projekte und kleine Unternehmen, die Klarheit wollen: Was ist das? Warum ist es wichtig? Was soll ich jetzt tun?
            </p>

            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3" data-aos="fade-up" data-aos-delay="120">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Projekt anfragen <ArrowRight size={18} />
              </Link>
              <Link
                href="/portfolio/kirche-fundraising"
                className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Case ansehen <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-indigo-200/90">
              <ShieldCheck size={16} className="text-emerald-400" />
              Klarer Rahmen · feste Absprachen · keine Endlos-Betreuung
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-16 pb-10">
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proof.map((p, i) => (
              <div key={p.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="text-xs uppercase tracking-wide text-neutral-400">{p.k}</div>
                <div className="mt-2 text-white font-semibold">{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-16 py-10 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold">Was du bekommst</h2>
            <Link href="/portfolio" className="hidden md:inline-flex text-indigo-300 hover:text-indigo-200 items-center gap-2">
              Portfolio <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s, i) => (
  <div
    key={s.title}
    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
    data-aos="fade-up"
    data-aos-delay={i * 80}
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        {s.icon}
      </div>
      <div className="text-lg font-semibold">{s.title}</div>
    </div>

    <div className="mt-3 text-neutral-300">
      {s.desc}
    </div>
  </div>
))}

          </div>
        </div>
      </section>

      <section className="px-5 md:px-16 py-10 md:py-12">
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Warum du mir vertrauen kannst</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {trust.map((t, i) => (
              <div key={t.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-indigo-200">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  {t.title}
                </div>
                <p className="mt-3 text-neutral-300">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-16 py-14 md:py-20 text-center">
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h3 className="text-3xl md:text-4xl font-bold">Sag mir kurz, was du brauchst.</h3>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            3 Sätze reichen: Ziel, Deadline, was schon da ist. Ich sage dir ehrlich, ob es passt.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Kontakt <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
