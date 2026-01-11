'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  Mail,
  Phone,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  Timer,
} from 'lucide-react';

export default function ContactPage() {
  const [open, setOpen] = useState(null);

  // Optional animation lib: keep, but fail-safe (site should work without AOS)
  useEffect(() => {
    (async () => {
      try {
        const AOS = (await import('aos')).default;
        await import('aos/dist/aos.css');
        AOS.init({ duration: 450, once: true, offset: 40 });
      } catch {
        // no-op
      }
    })();
  }, []);

  // NOTE: Keep your existing contacts, but make the page push one decision:
  // "Send me the 3 infos". WhatsApp = fastest, email as backup.
  const whatsappHref =
    'https://wa.me/4916095757167?text=Hi%20Leon,%0A%0AZiel:%0ADeadline:%0AStand:%0A%0AKontext%20(1%E2%80%932%20S%C3%A4tze):';
  const mailHref =
    'mailto:leonseitz25@icloud.com?subject=Projektanfrage&body=Hi%20Leon,%0A%0AZiel:%0ADeadline:%0AStand:%0A%0AKontext%20(1%E2%80%932%20S%C3%A4tze):';

  const faqs = [
    {
      q: 'Wie starten wir am schnellsten?',
      a: 'Schick mir Ziel, Deadline und Stand. Ich antworte mit einer klaren Einschätzung, ob es passt und was der nächste Schritt ist.',
    },
    {
      q: 'Welche Projekte passen gut?',
      a: 'Klar begrenzte Vorhaben: Website/Landingpage, Formular, Zahlungsweg (z. B. PayPal/Überweisung) und bei Bedarf begleitende Medien (Flyer/kurzes Video).',
    },
    {
      q: 'Wie läuft Feedback ab?',
      a: 'Wir arbeiten mit festen Feedback-Runden. So bleibt es planbar und das Projekt zieht sich nicht endlos.',
    },
    {
      q: 'Wie schnell geht das?',
      a: 'Je nach Umfang: wenige Tage bis wenige Wochen. Wenn du eine harte Deadline hast, sag sie direkt in der Nachricht.',
    },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative px-5 md:px-16 pt-16 md:pt-24 pb-10 md:pb-12 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Kontakt
              </span>

              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]" data-aos="fade-up">
                <span className="block">Schick mir Ziel,</span>
                <span className="block">Deadline und Stand.</span>
                <span className="block text-indigo-300">Ich sage dir, ob es passt.</span>
              </h1>

              <p
                className="mt-5 text-base md:text-lg text-neutral-300 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="60"
              >
                Kein Verkaufsgespräch. Du bekommst eine klare Einschätzung, was sinnvoll ist und wie der nächste Schritt
                aussieht.
              </p>

              {/* One primary action */}
              <div className="mt-7 flex flex-col items-start gap-3" data-aos="fade-up" data-aos-delay="120">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
                >
                  WhatsApp öffnen <MessageCircle size={18} />
                </a>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm md:text-base">
                  <a href={mailHref} className="text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-2">
                    Oder per E-Mail <Mail size={16} />
                  </a>
                  <span className="hidden sm:inline text-neutral-600">•</span>
                  <a href="tel:+4916095757167" className="text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-2">
                    Telefon <Phone size={16} />
                  </a>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-indigo-200/90">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Sorgsamer Umgang mit Daten. Keine Weitergabe.</span>
                </div>
              </div>
            </div>

            {/* Right: “Send this” template (reduces effort) */}
            <div
              className="w-full lg:max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
              data-aos="fade-up"
              data-aos-delay="80"
            >
              <div className="text-xs uppercase tracking-wide text-neutral-400">Copy-Paste Vorlage</div>
              <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm md:text-base text-neutral-200 leading-relaxed whitespace-pre-line">
                  {`Ziel:
Deadline:
Stand:
Kontext (1–2 Sätze):`}
                </p>
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm text-neutral-300">
                <Timer size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>
                  Wenn ich alles habe, bekommst du eine Antwort normalerweise innerhalb von 24 Stunden (Mo–Fr).
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK OPTIONS (low-noise, not competing with main CTA) */}
      <section className="px-5 md:px-16 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <MiniInfo
              title="WhatsApp"
              value="Schnellster Weg"
              icon={<MessageCircle size={18} className="text-indigo-300" />}
              action={
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-2 font-semibold"
                >
                  Öffnen <ArrowRight size={14} />
                </a>
              }
            />
            <MiniInfo
              title="E-Mail"
              value="leonseitz25@icloud.com"
              icon={<Mail size={18} className="text-indigo-300" />}
              action={
                <a className="text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-2 font-semibold" href={mailHref}>
                  Mail öffnen <ArrowRight size={14} />
                </a>
              }
            />
            <MiniInfo
              title="Telefon"
              value="+49 160 95757167"
              icon={<Phone size={18} className="text-indigo-300" />}
              action={
                <a
                  className="text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-2 font-semibold"
                  href="tel:+4916095757167"
                >
                  Anrufen <ArrowRight size={14} />
                </a>
              }
            />
          </div>

          {/* small reassurance line */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                Ich arbeite projektbasiert. Das heißt: klarer Umfang, klarer Ablauf, klare Übergabe. Kein „immer wieder
                kurz was ändern“ ohne Rahmen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 md:px-16 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold">Häufige Fragen</h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
              Kurz beantwortet. Damit du nicht suchen musst.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] divide-y divide-white/10">
            {faqs.map((f, i) => {
              const active = open === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setOpen(active ? null : i)}
                  className="w-full text-left px-5 md:px-8 py-4 md:py-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">{f.q}</span>
                    <ChevronDown className={`shrink-0 transition-transform ${active ? 'rotate-180' : ''}`} size={18} />
                  </div>

                  <div
                    className={`grid transition-all duration-300 ${
                      active ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-neutral-300 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Final CTA: same as top (consistency) */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Schick mir die 3 Infos</h3>
            <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
              Ziel, Deadline, Stand. Dann bekommst du eine klare Einschätzung, ob es passt und was der nächste Schritt
              ist.
            </p>

            <div className="mt-6 flex justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
              >
                WhatsApp öffnen <MessageCircle size={18} />
              </a>
            </div>

            <div className="mt-3">
              <a href={mailHref} className="text-sm md:text-base text-neutral-300 hover:text-white transition-colors">
                Oder per E-Mail schicken
              </a>
            </div>

            {/* Optional link to portfolio (quiet) */}
            <div className="mt-4 text-sm md:text-base text-neutral-500">
              Wenn du vorher kurz schauen willst: <Link href="/portfolio" className="underline hover:text-neutral-300">Portfolio</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function MiniInfo({ icon, title, value, action }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">{icon}</div>
        <div className="min-w-0">
          <div className="text-lg font-semibold">{title}</div>
          <div className="mt-1 text-sm text-neutral-300 break-all">{value}</div>
        </div>
      </div>
      <div className="mt-4">{action}</div>
    </div>
  );
}

