'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CalendlyEmbed from '@/components/contact/CalendlyEmbed';
import { ShieldCheck, Clock, Sparkles, CheckCircle2, CalendarDays, ArrowRight } from 'lucide-react';

export default function RequestPage() {
  const [loaded, setLoaded] = useState(false);

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
              <CalendarDays size={14} /> Kurzen Austausch buchen
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
            title="Kontext & Ziel"
            text="Was plant ihr, wer soll erreicht werden und was ist euch am wichtigsten? Kurz, aber konkret."
          />
          <Step
            index="02"
            title="Idee & Struktur"
            text="Gemeinsam skizzieren wir, wie eine mögliche Seite oder ein kleines Setup aussehen könnte."
          />
          <Step
            index="03"
            title="Realistischer Rahmen"
            text="Wenn es passt: grober Zeitplan, Aufwandsschätzung und wie wir im Alltag gut zusammenarbeiten können."
          />
        </div>
      </section>

      {/* CALENDLY */}
      <section className="px-5 md:px-20 pb-16 md:pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-3 md:p-6" data-aos="fade-up">
          {!loaded && (
            <div className="mb-4 rounded-xl bg-white/5 p-4">
              <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="h-28 animate-pulse rounded-xl bg-white/10" />
                <div className="h-28 animate-pulse rounded-xl bg-white/10" />
              </div>
              <div className="mt-3 h-12 w-full animate-pulse rounded-xl bg-white/10" />
            </div>
          )}

          <CalendlyEmbed
            url="https://calendly.com/leonseitz-paveconsultings/30min?hide_gdpr_banner=1&primary_color=8133f1"
            onLoad={() => setLoaded(true)}
          />
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-3 text-sm text-[#AEB5C8]">
          <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
          <p>
            Die Angaben werden ausschließlich zur Terminabstimmung genutzt. Wenn kein passender Slot frei ist, schreiben Sie
            gerne direkt an{' '}
            <a className="underline hover:text-white" href="mailto:info@paveconsultings.com">
              info@paveconsultings.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-20 pb-16 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h3 className="text-3xl md:text-4xl font-bold">Lieber zuerst schriftlich anfragen?</h3>
          <p className="mt-3 text-neutral-300">
            Kein Problem – schreiben Sie kurz, worum es geht. Ich melde mich mit einer Rückfrage oder einer ersten Einschätzung.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
          >
            Kontakt aufnehmen <ArrowRight size={18} />
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
