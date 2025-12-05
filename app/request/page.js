'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, Clock, Sparkles, CheckCircle2, CalendarDays, ArrowRight } from 'lucide-react';

export default function RequestPage() {
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true, offset: 40 });
      cleanup = () => {};
    })();
    return () => cleanup();
  }, []);

  return (
    <div className="font-proxima bg-[#0C0D12] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden" aria-labelledby="rq-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111226] via-[#151A35] to-[#0B0E19]" />
        <div className="pointer-events-none absolute -top-24 -left-32 h-96 w-[42rem] rounded-full bg-violet-600/20 blur-[110px]" />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-[42rem] rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative px-5 md:px-20 py-16 md:py-24">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-[#C9CEE0]">
              <CalendarDays size={14} /> Kurzen Austausch anfragen
            </span>
            <h1 id="rq-hero" className="mt-5 text-4xl md:text-6xl font-bold leading-tight" data-aos="fade-up">
              Ein Call, um Ihr digitales Projekt <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">klar zu bekommen.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-[#C9CEE0]" data-aos="fade-up" data-aos-delay="80">
              In 20–30 Minuten klären wir, worum es geht, was bereits vorhanden ist und ob ich euch mit einer Landingpage,
              Formularen, Zahlungswegen oder begleitenden Medien sinnvoll unterstützen kann.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3" data-aos="fade-up" data-aos-delay="120">
              <Badge icon={<Clock size={16} />} text="20–30 Min. Video-Call" />
              <Badge icon={<Sparkles size={16} />} text="Ehrliche Einschätzung & Ideen" />
              <Badge icon={<ShieldCheck size={16} />} text="Klare Rahmen & nächste Schritte" />
            </div>
          </div>
        </div>
      </section>

      {/* SCHRITTE */}
      <section className="px-5 md:px-20 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Step
            index="01"
            title="Kurz anfragen"
            text="Schreiben Sie mir über das Kontaktformular oder per E-Mail, worum es ungefähr geht und wie ich Sie erreichen kann."
          />
          <Step
            index="02"
            title="Terminvorschläge"
            text="Ich melde mich mit 1–2 Vorschlägen für einen kurzen Video-Call oder Telefontermin – passend zu Ihrem Alltag."
          />
          <Step
            index="03"
            title="Gemeinsamer Call"
            text="Wir schauen gemeinsam auf Ihr Vorhaben und klären, ob und wie eine Zusammenarbeit sinnvoll wäre."
          />
        </div>
      </section>

      {/* HINWEIS ZUM ABLAUF */}
      <section className="px-5 md:px-20 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">So erreichen Sie mich</h2>
          <p className="text-sm md:text-base text-[#C9CEE0]">
            Am einfachsten ist eine kurze Nachricht mit ein paar Stichpunkten zu Ihrem Projekt. Schreiben Sie mir über das{' '}
            <Link href="/contact" className="underline hover:text-white">
              Kontaktformular
            </Link>{' '}
            oder direkt per E-Mail an{' '}
            <a href="mailto:info@paveconsultings.com" className="underline hover:text-white">
              info@paveconsultings.com
            </a>
            . Ich melde mich in der Regel innerhalb eines Werktags zurück.
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#AEB5C8]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Keine automatisierten Buchungstools, sondern persönliche Abstimmung.
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Kontaktformular öffnen <ArrowRight size={18} />
            </Link>
            <a
              href="mailto:info@paveconsultings.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:border-white/40 transition-colors font-semibold text-sm"
            >
              E-Mail schreiben
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-20 pb-16 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h3 className="text-3xl md:text-4xl font-bold">Noch unsicher, ob Ihr Projekt „groß genug“ ist?</h3>
          <p className="mt-3 text-neutral-300">
            Schreiben Sie mir einfach kurz, was Sie vorhaben. Ich sage ehrlich, ob ich dazu passe – oder empfehle eher,
            es intern oder mit jemand anderem zu lösen.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
          >
            Kurz anfragen <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Badge({ icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#DDE2F2]">
      <span className="text-violet-300">{icon}</span>
      {text}
    </div>
  );
}

function Step({ index, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur" data-aos="fade-up">
      <div className="mb-3 inline-flex items-center justify-center rounded-full bg-violet-600/20 px-3 py-1 text-violet-200">
        <span className="text-xs tracking-wider">{index}</span>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-[#C9CEE0]">{text}</p>
    </div>
  );
}
