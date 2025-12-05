'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Send,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [open, setOpen] = useState(null); // simple in-page Accordion
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');

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

  const faqs = [
    {
      q: 'Wie läuft ein Projektstart ab?',
      a: 'Wir starten mit einem kurzen Austausch (ca. 20–30 Minuten). Darin klären wir Ziel, Rahmen, bestehenden Stand und ob ich der richtige Ansprechpartner für euch bin.',
    },
    {
      q: 'Welche Art von Projekten übernehmen Sie?',
      a: 'Typischerweise sind es klar begrenzte Vorhaben: Landingpages für Aktionen oder Spenden, Event-Seiten, Formulare, einfache Zahlungswege und begleitende Medien wie Flyer oder kurze Projektvideos.',
    },
    {
      q: 'Bieten Sie laufende Betreuung an?',
      a: 'Der Fokus liegt auf einzelnen Projekten mit Anfang und Ende. Kleinere Anpassungen oder Erweiterungen sind später möglich, aber es gibt keine verpflichtenden Dauerverträge.',
    },
    {
      q: 'Wie lange dauert ein Projekt ungefähr?',
      a: 'Je nach Umfang bewegen sich Projekte meist im Rahmen von wenigen Tagen bis einigen Wochen. Mir ist wichtig, dass der Zeitplan zu eurem Alltag passt und realistisch bleibt.',
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setOk(false);
      setErr('');

      await new Promise((r) => setTimeout(r, 600));
      setOk(true);
      e.target.reset();
    } catch (error) {
      setErr('Senden fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-12 md:pb-16 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Kontakt
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Sprechen wir über Ihr Projekt.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Kurzer Draht, klare Einschätzung. In der Regel melde ich mich innerhalb eines Werktags zurück.
          </p>
        </div>
      </section>

      {/* INFO + FORM */}
      <section className="px-5 md:px-16 pb-10 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kontakt-Karten */}
          <div className="md:col-span-1 space-y-4">
            <Card icon={<Mail />} title="E-Mail">
              <a className="hover:underline" href="mailto:info@paveconsultings.com">
                info@paveconsultings.com
              </a>
            </Card>
            <Card icon={<Phone />} title="Telefon">
              <span>+49 160 95757167</span>
            </Card>
            <Card icon={<MapPin />} title="Standort">
              <span>Am Streitberg 28, 63906 Erlenbach a. Main</span>
            </Card>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-sm text-emerald-200">
                <ShieldCheck size={18} className="text-emerald-400" />
                Sorgsamer Umgang mit Daten
              </div>
              <p className="mt-2 text-neutral-300 text-sm">
                Ihre Angaben nutze ich ausschließlich zur Bearbeitung der Anfrage und zur Rückmeldung.
              </p>
              <Link href="/privacy" className="underline text-sm hover:text-white mt-1 inline-block">
                Datenschutzhinweise
              </Link>
            </div>
          </div>

          {/* Formular */}
          <div className="md:col-span-2">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" label="Ihr Name*" placeholder="Vor- und Nachname" required />
                <Input type="email" name="email" label="Ihre E-Mail*" placeholder="name@example.de" required />
              </div>
              <Input name="subject" label="Betreff*" placeholder="Kurze Betreffzeile" required />
              <div>
                <label className="text-sm text-neutral-300">Nachricht*</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Worum geht es? (z. B. Spendenaktion, Event-Landingpage, Anmeldeformular, Zahlungswege …)"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold transition-colors disabled:opacity-60"
              >
                <Send size={18} />
                {isSubmitting ? 'Wird gesendet …' : 'Nachricht senden'}
              </button>
              {ok && <p className="text-emerald-400 text-sm mt-2">Danke! Ich melde mich zeitnah.</p>}
              {err && <p className="text-red-400 text-sm mt-2">{err}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ (ohne externe Komponente) */}
      <section className="px-5 md:px-16 pb-14 md:pb-20">
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
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 pb-16 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h3 className="text-3xl md:text-4xl font-bold">Direkt einen kurzen Austausch buchen?</h3>
          <p className="mt-3 text-neutral-300">
            Unverbindliches Sparring – etwa 30 Minuten, um zu prüfen, ob und wie ich euer Vorhaben sinnvoll unterstützen kann.
          </p>
          <Link
            href="/request"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
          >
            <CalendarDays size={18} />
            Termin vereinbaren
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---- kleine UI-Teile (lokal) ---- */

function Card({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-2 text-indigo-200 text-sm">
        <span className="text-indigo-300">{icon}</span>
        <span className="uppercase tracking-wide">{title}</span>
      </div>
      <div className="mt-2 text-neutral-200">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-neutral-300">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}
