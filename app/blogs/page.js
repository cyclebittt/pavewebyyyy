'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  const [fadeDir, setFadeDir] = useState('fade-right');

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const onResize = () => setFadeDir(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const posts = [
    {
      slug: '1',
      tag: 'Content Marketing',
      date: '25 Sep, 2024',
      title: 'Content, der konvertiert – Storys, die hängen bleiben',
      excerpt:
        'Nicht nur was du sagst zählt, sondern wie. So entwickeln wir Content, der verbindet, überzeugt und konvertiert.',
    },
    {
      slug: '3',
      tag: 'Collaboration',
      date: '17 Nov, 2024',
      title: 'Weniger E-Mails, mehr Fortschritt – Tools, die wirklich helfen',
      excerpt:
        'Wie smarte Workflows Meetings und Postfächer entlasten – und Teams schneller machen.',
    },
    {
      slug: '4',
      tag: 'Brand Strategy',
      date: '18 Dec, 2024',
      title: 'Deine Marke, deine Bühne – auffallen ohne laut zu sein',
      excerpt:
        'Mit Klarheit, Konsequenz und psychologischer Wirkung in gesättigten Märkten bestehen.',
    },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-16 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Blog
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Gedanken, Prozesse & Prinzipien
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Kurze, klare Impulse aus Branding, Web & Content – für mehr Wirkung im Alltag.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="px-5 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Link
              href={`/blogs/${p.slug}`}
              key={p.slug}
              data-aos={fadeDir}
              data-aos-delay={i * 100}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 hover:bg-white/[0.06] transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between text-sm text-neutral-300">
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{p.tag}</span>
                <span>{p.date}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-neutral-300">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-indigo-300 font-medium">
                Weiterlesen <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 pb-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h2 className="text-3xl md:text-4xl font-bold">Noch Fragen oder ein Thema im Kopf?</h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Lass uns kurz sprechen, wir geben dir eine klare Einschätzung und nächste Schritte.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Termin vereinbaren <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}



