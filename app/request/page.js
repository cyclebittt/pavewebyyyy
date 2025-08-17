'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CalendlyEmbed from '@/components/contact/CalendlyEmbed';
import {
  CalendarDays,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function Request() {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // AOS nur clientseitig laden
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
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* diagonaler kräftiger Gradient + Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#101224_60%,#0B0B0F_100%)]" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-[26rem] w-[48rem] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-[26rem] w-[48rem] rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-16 md:pb-20 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-200/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <CalendarDays size={16} /> Termin vereinbaren
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight" data-aos="fade-up">
            Lass uns starten –{' '}
            <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              kurzer Call, klare nächsten Schritte.
            </span>
          </h1>
          <p
            className="mt-5 text-lg md:text-xl text-[#C9CEE0]"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            30 Minuten Fokus: Ziele verstehen, Ansatz skizzieren, Timing & Pakete grob einordnen.
            Unverbindlich, effizient, planbar.
          </p>

          <div
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3"
            data-aos="fade-up"
            data-aos-delay="140"
          >
            <Badge icon={<Clock size={16} />} text="30 Min. Video-Call" />
            <Badge icon={<Sparkles size={16} />} text="Konkrete Quick-Wins" />
            <Badge icon={<ShieldCheck size={16} />} text="DSGVO-konform" />
          </div>

          <div className="mt-8 flex justify-center gap-3" data-aos="fade-up" data-aos-delay="180">
            <Link
              href="/services/branding"
              className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:border-white/30 transition-colors inline-flex items-center gap-2"
            >
              Leistungen ansehen <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors inline-flex items-center gap-2"
            >
              Direkt schreiben <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Schritte – wie auf den anderen Seiten */}
      <section className="px-5 md:px-16 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">So läuft’s ab</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StepCard
            index="01"
            title="Ziele & Status"
            text="Kurzbriefing: Was gibt’s schon, wo hakt’s, was soll erreicht werden?"
            delay={0}
          />
          <StepCard
            index="02"
            title="Modulare Roadmap"
            text="Module (Brand, Web, Social, Systeme) sinnvoll ordnen – schlank & wirkungsorientiert."
            delay={80}
          />
          <StepCard
            index="03"
            title="Start & Sprints"
            text="Kickoff, klare To-dos, schnelle Loops – sichtbar & messbar."
            delay={160}
          />
        </div>
      </section>

      {/* Calendly Embed mit Skelett */}
      <section className="px-5 md:px-16 pb-16 md:pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-4 md:p-6" data-aos="fade-up">
          {!calendlyLoaded && (
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
            onLoad={() => setCalendlyLoaded(true)}
          />
        </div>

        {/* DSGVO/Trust-Hinweis */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-3 text-sm text-[#AEB5C8]">
          <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
          <p>
            Deine Daten werden nur zur Terminabstimmung genutzt. Keine Newsletter, kein Spam.
            Alternativ per Mail:{' '}
            <a className="underline hover:text-white" href="mailto:info@paveconsultings.com">
              info@paveconsultings.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Sekundäre CTA – konsistent zu anderen Seiten */}
      <section className="px-5 md:px-16 pb-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_400px_at_90%_120%,rgba(56,189,248,.18),transparent_55%)]" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Noch unsicher, welches Modul passt?</h3>
              <p className="mt-2 text-neutral-200">
                Wir beraten kurz & konkret – kostenloses Erstgespräch, klare Empfehlungen.
              </p>
            </div>
            <Link
              href="/services/branding"
              className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Leistungen ansehen <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- UI Subcomponents ---------- */

function Badge({ icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#DDE2F2]">
      <span className="text-violet-300">{icon}</span>
      {text}
    </div>
  );
}

function StepCard({ index, title, text, delay = 0 }) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="mb-3 inline-flex items-center justify-center rounded-full bg-violet-600/20 px-3 py-1 text-violet-200">
        <span className="text-xs tracking-wider">{index}</span>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-[#C9CEE0]">{text}</p>
    </div>
  );
}

