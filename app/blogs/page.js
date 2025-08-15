'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Sparkles, ArrowRight, Tag, CalendarDays, BookOpenText } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const POSTS = [
  {
    slug: '1',
    category: 'Content & Story',
    date: '25. Sep 2024',
    title: 'Content, der hängen bleibt: Story-Patterns, die Conversion bringen',
    excerpt:
      'Warum manche Inhalte wirken und andere rauschen: 4 psychologische Muster, die deine Message verankern – mit Beispielen zum sofort Anwenden.',
    read: '6 Min',
  },
  {
    slug: '2',
    category: 'Webdesign',
    date: '12. Okt 2024',
    title: 'Erster Eindruck in 3 Sekunden: Struktur, die verkauft',
    excerpt:
      'Hero, Value, Proof, Action: Wie du eine Seite aufbaust, die Orientierung schafft – und Menschen ins Handeln bringt.',
    read: '5 Min',
  },
  {
    slug: '3',
    category: 'Tools & Systeme',
    date: '17. Nov 2024',
    title: 'Leads ohne Chaos: Anfrage-Flow & CRM, das wirklich genutzt wird',
    excerpt:
      'Vom Formular bis zum Follow-up: Ein schlanker Prozess, der dir Zeit spart – und nichts auf dem Tisch liegen lässt.',
    read: '7 Min',
  },
  {
    slug: '4',
    category: 'Brand & Positionierung',
    date: '18. Dez 2024',
    title: 'Spitz statt breit: Positionierung, die dir Kunden bringt',
    excerpt:
      'Wie du dein Angebot schärfst, klare Kante zeigst und zur naheliegenden Wahl wirst – ohne dich zu verstellen.',
    read: '6 Min',
  },
];

export default function BlogsPage() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="font-proxima text-[#EDEDF2] bg-[#0A0A10] antialiased overflow-x-clip">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <HeroRibbon />

        <div className="relative z-10 px-5 md:px-20 pt-20 md:pt-32 pb-14 md:pb-20">
          <div className="max-w-4xl" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#AAB1C2] backdrop-blur">
              <Sparkles size={14} />
              <span>Insights & Playbooks</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-bold leading-[1.05]">
              Blog — <span className="text-[#8AAEFF]">klar</span>, praxisnah, modular.
            </h1>

            <p className="mt-5 text-lg text-[#C0C6D8] max-w-2xl">
              Taktiken und Frameworks für Branding, Webdesign, Content & Systeme. Ohne Buzzwords,
              mit Fokus auf Wirkung und Umsetzbarkeit.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
              >
                Projekt starten <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-[#EDEDF2] hover:bg-white/10"
              >
                Über paveo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-5 md:px-20 py-12 md:py-16">
        <div
          className="rounded-3xl p-6 md:p-10 bg-gradient-to-br from-[#1A1E2D] to-[#111521] border border-white/10 backdrop-blur"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-6 md:gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-[#8AAEFF]">Featured</p>
              <h2 className="mt-2 text-2xl md:text-4xl font-semibold">
                Content, der verkauft – ohne laut zu sein.
              </h2>
              <p className="mt-3 text-[#BFC6D8] md:text-lg">
                Das Muster: Relevanz → Klarheit → Beweis → Aktion. Wir zeigen, wie du in
                wenigen Abschnitten mehr Tiefe erreichst, als andere auf zehn Slides.
              </p>
            </div>

            <Link
              href="/blogs/1"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
            >
              Jetzt lesen <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-5 md:px-20 pb-14 md:pb-20">
        <div className="flex items-center justify-between" data-aos="fade-up">
          <h3 className="text-xl md:text-2xl font-semibold">Neueste Artikel</h3>
          <span className="text-sm text-[#AAB1C2]">{POSTS.length} Artikel</span>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <ArticleCard key={p.slug} {...p} delay={i * 80} />
          ))}
        </div>

        {/* Mehr */}
        <div className="mt-10" data-aos="fade-up">
          <Link
            href="/blogs/1"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-medium text-[#EDEDF2] hover:bg-white/10"
          >
            Mehr Artikel ansehen
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section
        className="
          relative overflow-hidden
          bg-[radial-gradient(900px_300px_at_15%_0%,rgba(122,166,255,0.08),transparent_60%),linear-gradient(180deg,#0A0A10_0%,#0B0B12_60%,#0A0A10_100%)]
        "
      >
        <div className="relative z-10 px-5 md:px-20 py-16 md:py-24" data-aos="fade-up">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-semibold">Ideen in Ergebnisse verwandeln.</h2>
            <p className="mt-4 text-[#AAB1C2] max-w-2xl">
              Schreib uns kurz, was du vorhast – wir melden uns mit einer klaren Einschätzung
              und einem modularen Vorschlag.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
              >
                Termin buchen <ArrowRight size={18} />
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

/* ---------- Cards ---------- */
function ArticleCard({ slug, category, date, title, excerpt, read, delay = 0 }) {
  return (
    <Link
      href={`/blogs/${slug}`}
      data-aos="fade-up"
      data-aos-delay={delay}
      className="group rounded-2xl p-6 bg-gradient-to-br from-[#1B1E2F] to-[#121624] border border-white/10 backdrop-blur transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_-12px_rgba(138,174,255,0.35)]"
    >
      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-[#AAB1C2]">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
          <Tag size={14} /> {category}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
          <CalendarDays size={14} /> {date}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1">
          <BookOpenText size={14} /> {read}
        </span>
      </div>

      {/* Content */}
      <h4 className="mt-4 text-xl font-semibold">{title}</h4>
      <p className="mt-2 text-[#BFC6D8]">{excerpt}</p>

      {/* CTA */}
      <div className="mt-5 inline-flex items-center gap-2 text-[#8AAEFF]">
        Weiterlesen
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

/* ---------- Hero Ribbon (eine, diagonal) ---------- */
function HeroRibbon() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Diagonaler kräftiger Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#141227_0%,#1b1850_35%,#0f1a3a_65%,#0b0e18_100%)]" />

      {/* Eine große animierte Ribbon */}
      <svg
        className="absolute top-[58%] left-1/2 -translate-x-1/2 w-[150%] h-[50%] opacity-[0.40]"
        viewBox="0 0 800 400"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gBlog" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2D8CFF" />
            <stop offset="50%" stopColor="#6D61FF" />
            <stop offset="100%" stopColor="#8AAEFF" />
          </linearGradient>
          <filter id="bBlog">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <path
          d="M-120 210 C 60 110, 280 310, 500 210 S 900 110, 1120 210"
          stroke="url(#gBlog)"
          strokeWidth="42"
          filter="url(#bBlog)"
          className="blog-ribbon"
        />
      </svg>

      <style jsx>{`
        .blog-ribbon {
          animation: floatBlog 15s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes floatBlog {
          0% { transform: translateY(0); }
          50% { transform: translateY(16px); }
          100% { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blog-ribbon { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
