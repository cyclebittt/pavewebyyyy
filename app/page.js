'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import {
  ArrowRight,
  Sun,
  PenTool,
  CodeXml,
  Users,
  LayoutDashboard,
  ChartPie,
} from 'lucide-react';

export default function Home() {
  const [aosDir, setAosDir] = useState('fade-right');

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true, easing: 'ease-out' });
      cleanup = () => {};
    })();

    const onResize = () => setAosDir(window.innerWidth < 768 ? 'fade-up' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      cleanup();
    };
  }, []);

  return (
    <div className="font-proxima bg-[#0B0C10] text-white">
      <Navbar />

      {/* HERO */}
      <section
        className="
          relative overflow-hidden
          px-5 md:px-20 pt-16 md:pt-24 pb-24 md:pb-36
        "
        aria-labelledby="hero-heading"
      >
        {/* Gradient */}
        <div
          className="
            absolute inset-0 -z-10
            bg-[radial-gradient(1200px_500px_at_10%_10%,#1E1B4B_0%,transparent_60%),
                radial-gradient(1000px_500px_at_90%_30%,#0EA5E9_0%,transparent_60%),
                linear-gradient(135deg,#0B0C10_10%,#0F172A_60%,#0B0C10)]
          "
        />

        <div className="max-w-6xl">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/70 bg-white/5 rounded-full px-3 py-1 ring-1 ring-white/10">
            <Sun size={14} className="opacity-70" />
            Modulare Markenkommunikation für Selbstständige & KMU
          </span>

          <h1
            id="hero-heading"
            className="font-proxima mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            Eine Marke, die <span className="text-sky-300">wirklich</span> wirkt.
          </h1>

          <p className="font-proxima mt-5 max-w-2xl text-white/70 text-base md:text-lg">
            Branding, Webdesign, Content & Systeme – psychologisch fundiert, modular
            aufgebaut und messbar auf Conversion ausgerichtet.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/request"
              className="font-proxima px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Jetzt starten
            </Link>
            <a
              href="#services"
              className="font-proxima px-5 py-2.5 md:px-6 md:py-3 rounded-full ring-1 ring-white/15 hover:ring-white/30 text-white/85 transition-all font-medium"
            >
              Mehr erfahren
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-5 md:px-20 pb-20" aria-labelledby="services-heading">
        <div className="max-w-7xl">
          <h2 id="services-heading" className="font-proxima text-2xl md:text-4xl font-semibold mb-3">
            Leistungen
          </h2>
          <p className="font-proxima text-white/60 mb-10">
            Wähle nur die Bausteine, die du brauchst – oder kombiniere zu einem stimmigen Gesamtauftritt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Beispiel-Karten */}
            <Link href="/services/branding" data-aos={aosDir} className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#1B193F] via-[#151433] to-[#111225] ring-1 ring-white/10 hover:ring-white/20 transition-all">
              <h3 className="font-proxima text-xl font-bold">Branding & Positionierung</h3>
              <p className="font-proxima mt-2 text-white/70">Logo, Farbwelt, Tonalität & Kernbotschaft – entwickelt, um bei deiner Zielgruppe im Kopf zu bleiben.</p>
            </Link>
            {/* Rest analog */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
