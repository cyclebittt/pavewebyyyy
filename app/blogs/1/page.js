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
        {/* Dark diagonal gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#141227_0%,#1b1850_35%,#0f1a3a_65%,#0b0e18_100%)]" />
        <div className="relative z-10 px-5 md:px-20 pt-20 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-4xl" data-aos="fade-up">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#C0C6D8]">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                <Tag size={14} /> Content Marketing
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                <CalendarDays size={14} /> 25. Sep 2024
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                <BookOpenText size={14} /> 6 Min Lesezeit
              </span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-bold leading-[1.1]">
              Content, der konvertiert: Geschichten erzählen, die niemand ignoriert
            </h1>

            <p className="mt-4 text-[#BFC6D8] md:text-lg max-w-2xl">
              Warum manche Inhalte hängen bleiben und andere rauschen: Es liegt nicht nur
              an dem, was du sagst – sondern wie. Hier sind Muster, die Relevanz schaffen,
              Vertrauen aufbauen und in Handlung führen.
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
                Fragst du dich, warum manche Inhalte bei dir hängen bleiben und andere
                wie weißes Rauschen wirken? Der Unterschied liegt selten in „mehr“,
                sondern in Struktur und Wirkung. Im digitalen Alltag ist Content nicht
                nur King – er ist das gesamte Spielfeld. Er verbindet, überzeugt
                und verkauft.
              </p>

              <h2 id="was-ist-content" className="scroll-mt-24">Worum es bei Content Creation wirklich geht</h2>
              <p className="text-[#C0C6D8]">
                Content ist die Schnittstelle zwischen Marke und Mensch. Nicht Füllmaterial,
                sondern erlebbare Geschichte. Für uns bei paveo heißt das: Erlebnisse bauen.
              </p>
              <ul className="text-[#C0C6D8] list-disc pl-5">
                <li>Texte, die ins Handeln führen.</li>
                <li>Visuals, die Aufmerksamkeit fokussieren.</li>
                <li>Videos, die Botschaften verankern.</li>
              </ul>
              <p className="text-[#C0C6D8]">
                Kurz: Storytelling, das informiert, unterhält – und konvertiert.
              </p>

              <h2 id="purpose" className="scroll-mt-24">Das Geheimnis: Absicht vor Output</h2>
              <p className="text-[#C0C6D8]">
                Content ohne Absicht ist wie Pasta ohne Sauce – okay, aber vergessbar.
                Jedes Stück folgt einem klaren Zweck: Position stärken, Vertrauen aufbauen,
                Aktion auslösen.
              </p>

              <h2 id="elemente" className="scroll-mt-24">Elemente starken Contents</h2>
              <p className="text-[#C0C6D8]">Worauf wir systematisch achten:</p>
              <ul className="text-[#C0C6D8] list-disc pl-5">
                <li>
                  <strong>Text, der spricht:</strong> von prägnanten Headlines bis
                  zu fundierten Artikeln – klar, fokussiert, wertig.
                </li>
                <li>
                  <strong>Visuals mit Funktion:</strong> Gestaltung lenkt Bedeutung.
                  Wir nutzen Bildsprache, die die Message trägt (nicht ersetzt).
                </li>
                <li>
                  <strong>Video, das verbindet:</strong> ob Story, Tutorial oder
                  Showcase – bewegtes Format, das man zu Ende schaut.
                </li>
              </ul>

              <h2 id="relevanz" className="scroll-mt-24">Warum Content Creation zählt</h2>
              <p className="text-[#C0C6D8]">
                Menschen kaufen von Marken, denen sie trauen. Guter Content zeigt:
                Wir verstehen deine Probleme, sprechen deine Sprache und liefern Lösungen.
              </p>

              <h2 id="prozess" className="scroll-mt-24">Unser Prozess</h2>
              <p className="text-[#C0C6D8]">Keine Schablone – ein System:</p>
              <ol className="list-decimal pl-5 text-[#C0C6D8]">
                <li><strong>Discovery:</strong> Ziele, Zielgruppen, Tonalität.</li>
                <li><strong>Strategie & Planung:</strong> Formate, Kanäle, Frequenz.</li>
                <li><strong>Creation & Kollaboration:</strong> Schreiben, Design, Motion.</li>
                <li><strong>Distribution:</strong> Plattformgerecht & messbar.</li>
              </ol>

              <h2 id="final" className="scroll-mt-24">Bereit für Inhalte mit Wirkung?</h2>
              <p className="text-[#C0C6D8]">
                Wenn du keine Lust mehr auf Content im Leerlauf hast: Lass uns Stories bauen,
                die Menschen erreichen – und dein Geschäft bewegen.
              </p>
            </div>

            {/* CTA inline */}
            <div className="mt-8">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
              >
                Zusammenarbeit anfragen <ArrowRight size={18} />
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

          {/* Sidebar / Inhaltsverzeichnis */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24 h-fit">
            <nav
              className="rounded-2xl p-5 bg-gradient-to-br from-[#191C2A] to-[#111521] border border-white/10"
              data-aos="fade-up"
              data-aos-delay="120"
              aria-label="Inhaltsverzeichnis"
            >
              <p className="text-sm uppercase tracking-widest text-[#8AAEFF]">Inhalt</p>
              <ol className="mt-3 space-y-2 text-[#C0C6D8] text-sm">
                {[
                  ['#was-ist-content', 'Worum es bei Content Creation geht'],
                  ['#purpose', 'Absicht vor Output'],
                  ['#elemente', 'Elemente starken Contents'],
                  ['#relevanz', 'Warum es zählt'],
                  ['#prozess', 'Unser Prozess'],
                  ['#final', 'Inhalte mit Wirkung'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="block rounded px-2 py-1 hover:bg-white/5 border border-transparent hover:border-white/10"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div
              className="rounded-2xl p-5 bg-gradient-to-br from-[#1B1E2F] to-[#121624] border border-white/10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p className="text-sm text-[#AAB1C2]">Weiterlesen</p>
              <ul className="mt-2 space-y-2">
                {[
                  ['/blogs/2', 'Erster Eindruck in 3 Sekunden'],
                  ['/blogs/3', 'Leads ohne Chaos'],
                  ['/blogs/4', 'Spitz statt breit'],
                ].map(([href, text]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block rounded px-2 py-1 hover:bg-white/5 text-[#EDEDF2]"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* FINAL CTA */}
      <section
        className="
          relative overflow-hidden
          bg-[radial-gradient(900px_300px_at_15%_0%,rgba(122,166,255,0.08),transparent_60%),linear-gradient(180deg,#0A0A10_0%,#0B0B12_60%,#0A0A10_100%)]
        "
      >
        <div className="relative z-10 px-5 md:px-20 py-16 md:py-24" data-aos="fade-up">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-semibold">Aus Ideen Ergebnisse machen.</h2>
            <p className="mt-4 text-[#AAB1C2] max-w-2xl">
              Erzähl uns kurz, worum es geht – wir melden uns mit einer klaren Einschätzung
              und einem modularen Vorschlag.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
              >
                Projekt starten <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-[#EDEDF2] hover:bg-white/10"
              >
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
