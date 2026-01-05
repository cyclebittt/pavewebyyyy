'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  CalendarDays,
  ArrowRight,
  Mail,
  MessageCircle,
} from 'lucide-react';

const EMAIL = 'leonseitz25@icloud.com';
const WHATSAPP = '4916095757167';

export default function RequestPage() {
  const mailto = `mailto:${EMAIL}?subject=Projektanfrage&body=Hi%20Leon,%0A%0AZiel:%0ADeadline:%0AStand:%0A%0AKurzer%20Kontext:`;
  const whatsapp = `https://wa.me/${WHATSAPP}?text=Hi%20Leon,%0A%0AZiel:%0ADeadline:%0AStand:%0A%0AKurzer%20Kontext:`;

  return (
    <div className="font-proxima bg-[#0C0D12] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden" aria-labelledby="rq-hero">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_-10%_-10%,rgba(129,51,241,.30),transparent_60%),radial-gradient(900px_650px_at_115%_10%,rgba(56,189,248,.18),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative px-5 md:px-20 pt-14 md:pt-20 pb-10 md:pb-14">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-[#C9CEE0]">
              <CalendarDays size={14} /> Anfrage für kurzen Austausch
            </span>

            <h1
              id="rq-hero"
              className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]"
            >
              20 Minuten. <span className="block">Klare Einschätzung.</span>
              <span className="block bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
                Nächster Schritt.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-[#C9CEE0] text-base md:text-lg leading-relaxed">
              Du schickst mir kurz <span className="text-white">Ziel + Deadline + Stand</span>.  
              Ich sage dir ehrlich, ob ich helfen kann – und wie wir es schlank umsetzen.
            </p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Badge icon={<Clock size={16} />} text="20–30 Min. Call" />
              <Badge icon={<Sparkles size={16} />} text="Ideen & Struktur" />
              <Badge icon={<ShieldCheck size={16} />} text="Klare Grenzen" />
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold w-full sm:w-auto"
              >
                Kurz anfragen <ArrowRight size={18} />
              </Link>

              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:border-white/30 transition-colors font-semibold w-full sm:w-auto"
              >
                <Mail size={18} /> E-Mail
              </a>

              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:border-white/30 transition-colors font-semibold w-full sm:w-auto"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-indigo-200/90">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Keine Tools, kein Stress – du bekommst eine persönliche Rückmeldung.
            </div>
          </div>
        </div>
      </section>

      {/* 3 SCHRITTE (kurz) */}
      <section className="px-5 md:px-20 py-10 md:py-14">
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <Step index="01" title="3 Sätze" text="Ziel, Deadline, Stand. Fertig." />
          <Step index="02" title="Rückmeldung" text="Ich sage dir, ob es passt – inkl. grobem Rahmen." />
          <Step index="03" title="Call" text="Wenn sinnvoll: 20–30 Minuten, klare nächste Schritte." />
        </div>
      </section>

      {/* KONTAKTBOX */}
      <section className="px-5 md:px-20 pb-14 md:pb-20">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Kontakt</h2>
          <p className="mt-3 text-sm md:text-base text-[#C9CEE0] leading-relaxed">
            Schreib mir direkt an{' '}
            <a href={`mailto:${EMAIL}`} className="underline hover:text-white">
              {EMAIL}
            </a>{' '}
            – oder nutze die Kontaktseite. Ich antworte meist innerhalb eines Werktags.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold w-full sm:w-auto"
            >
              Kontakt öffnen <ArrowRight size={18} />
            </Link>
            <a
              href={mailto}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:border-white/30 transition-colors font-semibold w-full sm:w-auto"
            >
              E-Mail schreiben
            </a>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-[#AEB5C8]">
            <ShieldCheck size={16} className="text-emerald-400" />
            Deine Angaben nutze ich nur zur Rückmeldung.
          </div>
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="mb-3 inline-flex items-center justify-center rounded-full bg-violet-600/20 px-3 py-1 text-violet-200">
        <span className="text-xs tracking-wider">{index}</span>
      </div>
      <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-[#C9CEE0]">{text}</p>
    </div>
  );
}

