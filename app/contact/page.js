'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, ArrowRight, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 500, once: true, offset: 40 });
    })();
  }, []);

  const faqs = [
    {
      q: 'Wie starten wir?',
      a: 'Schreib mir kurz Ziel + Deadline + was schon da ist. Dann sage ich dir ehrlich, ob ich helfen kann und wie der nächste Schritt aussieht.',
    },
    {
      q: 'Welche Projekte passen besonders?',
      a: 'Klar begrenzte Vorhaben: Landingpage/Website, Formular, Zahlungsweg (z. B. PayPal/Überweisung) und ggf. begleitende Medien (Flyer/kurzes Video).',
    },
    {
      q: 'Gibt es laufende Betreuung?',
      a: 'Mein Fokus sind Projekte mit Anfang und Ende. Kleine Anpassungen danach sind möglich, aber keine Dauerverträge.',
    },
    {
      q: 'Wie schnell geht das?',
      a: 'Viele Projekte sind in wenigen Tagen bis wenigen Wochen realistisch – abhängig von Umfang und Deadline.',
    },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-10 md:pb-12 max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Kontakt
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight" data-aos="fade-up">
            <span className="block">Schick mir 3 Sätze.</span>
            <span className="block text-indigo-300">Ich sage dir ehrlich, ob es passt.</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-neutral-300 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="60">
            Ziel · Deadline · Was ist schon vorhanden? Mehr brauche ich nicht für eine klare Einschätzung.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
  <Link
    href="/request"
    className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
  >
    Termin vereinbaren <ArrowRight size={18} />
  </Link>

  <a
    href="https://wa.me/4916095757167?text=Hi%20Leon,%0A%0AZiel:%0ADeadline:%0AStand:%0A%0AKurzer%20Kontext:"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold inline-flex items-center justify-center gap-2"
  >
    WhatsApp schreiben <MessageCircle size={18} />
  </a>

  <a
    href="mailto:info@paveconsultings.com?subject=Projektanfrage&body=Hi%20Leon,%0A%0AZiel:%0ADeadline:%0AStand:%0A%0AKurzer%20Kontext:"
    className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold inline-flex items-center justify-center gap-2"
  >
    E-Mail senden <Mail size={18} />
  </a>
</div>

            <Link
              href="/request"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
            >
              Termin vereinbaren <ArrowRight size={18} />
            </Link>

            <a
              href="mailto:leonseitz25@icloud.com?subject=Projektanfrage&body=Hi Leon,%0D%0A%0D%0AZiel:%0D%0ADeadline:%0D%0AStand:%0D%0A%0D%0AKurz Kontext:%0D%0A"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold inline-flex items-center justify-center gap-2"
            >
              E-Mail senden <Mail size={18} />
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-indigo-200/90">
            <ShieldCheck size={16} className="text-emerald-400" />
            Sorgsamer Umgang mit Daten · keine Weitergabe · nur für Rückmeldung
          </div>
        </div>
      </section>

      <section className="px-5 md:px-16 pb-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          <ContactCard
            icon={<Mail size={18} className="text-indigo-300" />}
            title="E-Mail"
            value="leonseitz25@icloud.com"
            action={
              <a
                className="text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-2"
                href="mailto:leonseitz25@icloud.com"
              >
                Mail öffnen <ArrowRight size={14} />
              </a>
            }
          />
          <ContactCard
            icon={<Phone size={18} className="text-indigo-300" />}
            title="Telefon"
            value="+49 160 95757167"
            action={
              <a
                className="text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-2"
                href="tel:+4916095757167"
              >
                Anrufen <ArrowRight size={14} />
              </a>
            }
          />
        </div>
      </section>

      <section className="px-5 md:px-16 pb-14 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Häufige Fragen</h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] divide-y divide-white/10">
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
                    <ChevronDown
                      className={`shrink-0 transition-transform ${active ? 'rotate-180' : ''}`}
                      size={18}
                    />
                  </div>

                  <div
                    className={`grid transition-all duration-300 ${
                      active ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-neutral-300">{f.a}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Schnellster Weg: Termin</h3>
            <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
              20–30 Minuten, klare Einschätzung, nächste Schritte. Wenn es nicht passt, sage ich es dir direkt.
            </p>
            <Link
              href="/request"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
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

function ContactCard({ icon, title, value, action }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="text-lg font-semibold">{title}</div>
      </div>
      <div className="mt-3 text-neutral-200 break-all">{value}</div>
      <div className="mt-4">{action}</div>
    </div>
  );
}

