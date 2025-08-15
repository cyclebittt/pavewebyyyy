'use client';

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
                <Tag size={14} /> Webdesign
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                <CalendarDays size={14} /> 12. Okt 2024
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                <BookOpenText size={14} /> 5 Min Lesezeit
              </span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-bold leading-[1.1]">
              Erster Eindruck in 3 Sekunden: Seitenstruktur, die verkauft
            </h1>

            <p className="mt-4 text-[#BFC6D8] md:text-lg max-w-2xl">
              Orientierung → Relevanz → Beweis → Aktion. Ein klarer Aufbau macht
              aus Besuchern Kund:innen. Hier ist das Playbook.
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
                Menschen entscheiden schnell. In den ersten Sekunden muss klar sein:
                Was ist das? Ist es relevant? Was ist der nächste Schritt? Das
                gelingt mit einer Struktur, die führt – statt zu überfordern.
              </p>

              <h2 id="framework" className="scroll-mt-24">Das 4-Blöcke-Framework</h2>
              <ol className="list-decimal pl-5 text-[#C0C6D8]">
                <li><strong>Hero:</strong> Klarer Nutzen + spezifische Zielgruppe.</li>
                <li><strong>Value:</strong> 3–5 prägnante Gründe, warum du.</li>
                <li><strong>Proof:</strong> Referenzen, Zahlen, Micro-Cases.</li>
                <li><strong>Action:</strong> Ein nächster Schritt – nicht fünf.</li>
              </ol>

              <h2 id="hierarchie" className="scroll-mt-24">Visuelle Hierarchie</h2>
              <p className="text-[#C0C6D8]">
                Typo-Größen, Weißraum, Kontrast: Setze Akzente bewusst. Primär-CTA
                sticht optisch hervor, Sekundär-CTA ist sichtbar, aber nicht dominant.
              </p>

              <h2 id="tempo" className="scroll-mt-24">Speed & Wahrnehmung</h2>
              <p className="text-[#C0C6D8]">
                Ladezeiten sind Psychologie: schneller = kompetenter. Komprimiere
                Assets, lazy-loade nicht sichtbare Bereiche und vermeide Blocker.
              </p>

              <h2 id="formulare" className="scroll-mt-24">Formulare, die man ausfüllt</h2>
              <ul className="list-disc pl-5 text-[#C0C6D8]">
                <li>Fragen gruppieren, Platzhalter als Beispiele (nicht Labels).</li>
                <li>Progress-Hinweis bei längeren Flows.</li>
                <li>Friction senken: nur Felder, die wirklich nötig sind.</li>
              </ul>

              <h2 id="accessibility" className="scroll-mt-24">Basics der Accessibility</h2>
              <p className="text-[#C0C6D8]">
                Fokus-Styles, semantische Überschriften, ausreichende Kontraste – alles
                wirkt auf Qualität, nicht nur auf Compliance.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
              >
                Beratung anfragen <ArrowRight size={18} />
              </Link>
            </div>

            {/* Share */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#AAB1C2]">
                <span className="inline-flex items-center gap-2">
                  <Share2 size={16} /> Teilen:
                </span>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                >
                  <Twitter size={16} /> X / Twitter
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24 h-fit">
            <nav
              className="rounded-2xl p-5 bg-gradient-to-br from-[#191C2A] to-[#111521] border border-white/10"
              data-aos="fade-up"
              data-aos-delay="120"
              aria-label="Inhalt"
            >
              <p className="text-sm uppercase tracking-widest text-[#8AAEFF]">Inhalt</p>
              <ol className="mt-3 space-y-2 text-[#C0C6D8] text-sm">
                <li><a href="#framework" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">4-Blöcke-Framework</a></li>
                <li><a href="#hierarchie" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">Visuelle Hierarchie</a></li>
                <li><a href="#tempo" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">Speed & Wahrnehmung</a></li>
                <li><a href="#formulare" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">Formulare</a></li>
                <li><a href="#accessibility" className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10">Accessibility</a></li>
              </ol>
            </nav>

            <div
              className="rounded-2xl p-5 bg-gradient-to-br from-[#1B1E2F] to-[#121624] border border-white/10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p className="text-sm text-[#AAB1C2]">Weiterlesen</p>
              <ul className="mt-2 space-y-2">
                <li><Link href="/blogs/1" className="block rounded px-2 py-1 hover:bg-white/5 text-[#EDEDF2]">Content, der konvertiert</Link></li>
                <li><Link href="/blogs/3" className="block rounded px-2 py-1 hover:bg-white/5 text-[#EDEDF2]">Leads ohne Chaos</Link></li>
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
            <h2 className="text-3xl md:text-5xl font-semibold">Deine Seite – auf Wirkung gebaut.</h2>
            <p className="mt-4 text-[#AAB1C2] max-w-2xl">Wir strukturieren, was zählt – und lassen weg, was ablenkt.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]">
                Projekt starten <ArrowRight size={18} />
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
