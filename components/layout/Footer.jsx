'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0B0B0F] via-[#0E0E15] to-black text-neutral-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14">
        
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Claim */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Zur Startseite">
              <span className="flex items-center gap-3">
                <Image
                  src="/img/logo-paveo.png"
                  alt="Paveo Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="font-extrabold text-white text-lg">PAVEO</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400">
              Digitale Begleitung für klar umrissene Projekte: Landingpages, Formulare, Zahlungswege und begleitende Medien.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Navigation</h4>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">Über mich & paveo</Link>
            <Link href="/request" className="hover:text-white transition-colors">Termin buchen</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Leistungen</h4>
            <Link href="/services/landingpages" className="hover:text-white transition-colors">
              Projekt-Landingpages
            </Link>
            <Link href="/services/campaigns" className="hover:text-white transition-colors">
              Aktionen & Kampagnen
            </Link>
            <Link href="/services/forms" className="hover:text-white transition-colors">
              Formulare & Zahlungswege
            </Link>
            <Link href="/services/media" className="hover:text-white transition-colors">
              Begleitende Medien
            </Link>
            <Link href="/services/managed" className="hover:text-white transition-colors">
              Digitales Setup & Betreuung
            </Link>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white">Lust auf ein gemeinsames Projekt?</h4>
            <p className="text-sm text-neutral-400">
              In einem kurzen Call klären wir, ob und wie ich euer Vorhaben sinnvoll unterstützen kann.
            </p>
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors w-fit"
            >
              Termin vereinbaren <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} PAVEO. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/agb" className="hover:text-neutral-300">AGB</Link>
            <Link href="/impressum" className="hover:text-neutral-300">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-neutral-300">Datenschutzerklärung</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
