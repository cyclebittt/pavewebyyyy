#'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  ArrowRight,
  CalendarDays,
  BookOpenText,
  Tag,
  Share2,
  Linkedin,
  Twitter,
} from 'lucide-react';

export default function BlogPost() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="font-proxima text-[#EDEDF2] bg-[#0A0A10] antialiased overflow-x-clip">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#141227_0%,#1b1850_35%,#0f1a3a_65%,#0b0e18_100%)]" />
        <div className="relative z-10 px-5 md:px-20 pt-20 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-4xl" data-aos="fade-up">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#C0C6D8]">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                <Tag size={14} /> Tools & Systeme
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                <CalendarDays size={14} /> 17. Nov 2024
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                <BookOpenText size={14} /> 7 Min Lesezeit
              </span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-bold leading-[1.1]">
              Leads ohne Chaos: Anfrage-Flow & CRM, das genutzt wird
            </h1>

            <p className="mt-4 text-[#BFC6D8] md:text-lg max-w-2xl">
              Von der Anfrage bis zum Angebot: ein schlanker Prozess, der dir Zeit spart
              und nichts liegen lässt.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <main className="px-5 md:px-20 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Article */}
          <article
            className="lg:col-span-8 rounded-3xl p-6 md:p-10 bg-gradient-to-br from-[#1A1E2D] to-[#111521] border border-white/10 backdrop-blur"
            data-aos="fade-up"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-[#C0C6D8] leading-relaxed">
                Ein gutes System ist unsichtbar: Interessent:innen erleben Klarheit, du
                siehst Fortschritt. Ziel ist ein Flow, der nichts vergisst – und
                niemanden nervt.
              </p>

              <h2 id="flow" className="scroll-mt-24">Der Anfrage-Flow</h2>
              <ol className="list-decimal pl-5 text-[#C0C6D8]">
                <li>Formular → Qualifikation → Routing → Follow-up.</li>
                <li>Jede Stufe hat klare Kriterien und Verantwortlichkeiten.</li>
              </ol>

              <h2 id="formular" className="scroll-mt-24">Formular & Qualifizierung</h2>
              <ul className="list-disc pl-5 text-[#C0C6D8]">
                <li>Pflichtfelder minimal, optionale Felder mit Mehrwert.</li>
                <li>Multiple Choice statt Freitext, wo sinnvoll.</li>
                <li>Fragen in „Warum jetzt?“ und „Was genau?“ aufteilen.</li>
              </ul>

              <h2 id="routing" className="scroll-mt-24">Routing & SLA</h2>
              <p className="text-[#C0C6D8]">
                Wer macht was, bis wann? Definiere SLAs (z. B. „Erstantwort &lt; 4 Std.“) und
                automatisiere Zuweisungen nach Thema/Volumen.
              </p>

              <h2 id="crm" className="scroll-mt-24">CRM-Hygiene</h2>
              <ul className="list-disc pl-5 text-[#C0C6D8]">
                <li>Pflichtfelder: Status, Quelle, nächster Schritt, Owner.</li>
                <li>Notizen standardisieren (z. B. DISCOVERY / SCOPE / NEXT).</li>
                <li>Duplikate deduplizieren, alte Leads archivieren.</li>
              </ul>

              <h2 id="automation" className="scroll-mt-24">Automationen</h2>
              <p className="text-[#C0C6D8]">
                Templates für Antwort-E-Mails, Termine per Link, Erinnerungen bei
                Funkstille. Automationen helfen, menschlich zu bleiben – nicht umgekehrt.
              </p>

              <h2 id="metrics" className="scroll-mt-24">Metriken, die zählen</h2>
              <ul className="list-disc pl-5 text-[#C0C6D8]">
                <li>Time-to-First-Response</li>
                <li>Qualifizierungsrate & Conversion je Kanal</li>
                <li>Pipeline-Durchlaufzeit & Win-Gründe</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
              >
                System aufsetzen <ArrowRight size={18} />
              </Link>
            </div>

            {/* Share */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#AAB1C2]">
                <span className="inline-flex items-center gap-2">
                  <Share2 size={16} /> Teilen:
                </span>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="https://x.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10">
                  <Twitter size={16} /> X / Twitter
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24 h-fit">
            <nav className="rounded-2xl p-5 bg-gradient-to-br from-[#191C2A] to-[#111521] border border-white/10" data-aos="fade-up" data-aos-delay="120" aria-label="Inhalt">
              <p className="text-sm uppercase tracking-widest text-[#8AAEFF]">Inhalt</p>
              <ol className="mt-3 space-y-2 text-[#C0C6D8] text-sm">
                <li><a href="#flow" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">Anfrage-Flow</a></li>
                <li><a href="#formular" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">Qualifizierung</a></li>
                <li><a href="#routing" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">Routing & SLA</a></li>
                <li><a href="#crm" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">CRM-Hygiene</a></li>
                <li><a href="#automation" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">Automationen</a></li>
                <li><a href="#metrics" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">Metriken</a></li>
              </ol>
            </nav>

            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#1B1E2F] to-[#121624] border border-white/10" data-aos="fade-up" data-aos-delay="200">
              <p className="text-sm text-[#AAB1C2]">Weiterlesen</p>
              <ul className="mt-2 space-y-2">
                <li><Link href="/blogs/2" className="block rounded px-2 py-1 hover:bg-white/5 text-[#EDEDF2]">Erster Eindruck</Link></li>
                <li><Link href="/blogs/1" className="block rounded px-2 py-1 hover:bg-white/5 text-[#EDEDF2]">Content, der konvertiert</Link></li>
                <li><Link href="/blogs/4" className="block rounded px-2 py-1 hover:bg-white/5 text-[#EDEDF2]">Spitz statt breit</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[radial-gradient(900px_300px_at_15%_0%,rgba(122,166,255,0.08),transparent_60%),linear-gradient(180deg,#0A0A10_0%,#0B0B12_60%,#0A0A10_100%)]">
        <div className="relative z-10 px-5 md:px-20 py-16 md:py-24" data-aos="fade-up">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-semibold">Mehr Leads, weniger Reibung.</h2>
            <p className="mt-4 text-[#AAB1C2] max-w-2xl">Wir bauen dir einen Anfrage-Flow, der sich wie natürlich anfühlt – und performt.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]">
                System anfragen <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-[#EDEDF2] hover:bg-white/10">
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
