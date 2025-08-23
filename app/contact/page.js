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
// Optional: Sie hatten emailjs bereits genutzt. Falls nicht benötigt, können Sie den Import entfernen.
// import emailjs from '@emailjs/browser';

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
      a: 'Wir starten mit einem 30‑minütigen Sparring (Ziele, Status, Förderfähigkeit). Anschließend erhalten Sie eine modulare Roadmap mit Aufwand und Zeitplan.',
    },
    {
      q: 'Sind Ihre Leistungen förderfähig?',
      a: 'Je nach Projekt sind bis zu 90 % Förderung über BayDiGuP möglich. Wir unterstützen bei der Strukturierung und Dokumentation.',
    },
    {
      q: 'Arbeiten Sie mit vorhandenen Systemen?',
      a: 'Ja. Wir integrieren bestehende Tools (z. B. Terminlösungen, Praxis‑Software) und kombinieren sie mit neuen Modulen.',
    },
    {
      q: 'Wie stellen Sie Datenschutz sicher?',
      a: 'DSGVO‑konforme Prozesse, klare Rollen, Hosting‑/Tool‑Auswahl und Dokumentation. Keine unnötigen Datenflüsse.',
    },
  ];

  // Dummy-Submit (ohne EmailJS) – kompiliert immer. Wenn Sie EmailJS nutzen möchten, aktivieren Sie die Logik unten.
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setOk(false);
      setErr('');

      // Beispiel für EmailJS:
      // const res = await emailjs.send('SERVICE_ID','TEMPLATE_ID',{
      //   name: e.target.name.value,
      //   email: e.target.email.value,
      //   message: e.target.message.value,
      // }, 'PUBLIC_KEY');
      // if (res.status === 200) setOk(true);

      // Ohne Anbieter: Erfolg simulieren
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
            Sprechen wir über Ihre Praxis.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Kurzer Draht, klare Antworten. Wir melden uns in der Regel innerhalb eines Werktags.
          </p>
        </div>
      </section>

      {/* INFO + FORM */}
      <section className="px-5 md:px-16 pb-10 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kontakt-Karten */}
          <div className="md:col-span-1 space-y-4">
            <Card icon={<Mail />} title="E‑Mail">
              <a className="hover:underline" href="mailto:info@paveconsultings.com">
                info@paveconsultings.com
              </a>
            </Card>
            <Card icon={<Phone />} title="Telefon">
              <span>+49 160 95757167</span>
            </Card>
            <Card icon={<MapPin />} title="Adresse">
              <span>Am Streitberg 28, 63906 Erlenbach a. Main</span>
            </Card>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-sm text-emerald-200">
                <ShieldCheck size={18} className="text-emerald-400" />
                DSGVO & klare Prozesse
              </div>
              <p className="mt-2 text-neutral-300 text-sm">
                Wir verarbeiten Ihre Angaben ausschließlich zur Beantwortung Ihrer Anfrage.
              </p>
              <Link href="/privacy" className="underline text-sm hover:text-white mt-1 inline-block">
                Datenschutzhinweise
              </Link>
            </div>
          </div>

          {/* Formular */}
          <div className="md:col-span-2">
            <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" label="Ihr Name*" placeholder="Vor- und Nachname" required />
                <Input type="email" name="email" label="Ihre E‑Mail*" placeholder="name@praxis.de" required />
              </div>
              <Input name="subject" label="Betreff*" placeholder="Kurze Betreffzeile" required />
              <div>
                <label className="text-sm text-neutral-300">Nachricht*</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Worum geht es? (z. B. Portal, Termine, TI, Analytics …)"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold transition-colors"
              >
                <Send size={18} />
                {isSubmitting ? 'Wird gesendet …' : 'Nachricht senden'}
              </button>
              {ok && <p className="text-emerald-400 text-sm">Danke! Wir melden uns zeitnah.</p>}
              {err && <p className="text-red-400 text-sm">{err}</p>}
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
          <h3 className="text-3xl md:text-4xl font-bold">Direkt Termin sichern?</h3>
          <p className="mt-3 text-neutral-300">Unverbindliches Sparring – 30 Minuten, klare nächsten Schritte.</p>
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
