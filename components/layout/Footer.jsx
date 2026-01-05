'use client';

import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0B0B0F] via-[#0E0E15] to-black text-neutral-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
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

            <p className="text-sm text-neutral-400 max-w-sm">
              Ich setze klar abgegrenzte digitale Projekte um – Websites, Landingpages
              und begleitende Medien. Fokus auf Klarheit, Struktur und Umsetzung.
            </p>
          </div>

          {/* Kontakt */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Kontakt</h4>

            <a
              href="mailto:info@paveconsultings.com"
              className="hover:text-white transition-colors text-sm"
            >
              info@paveconsultings.com
            </a>

            <a
              href="https://wa.me/4916095757167?text=Hi%20Leon,%0A%0AZiel:%0ADeadline:%0AStand:%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp schreiben
            </a>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white">
              Hast du ein konkretes Vorhaben?
            </h4>

            <p className="text-sm text-neutral-400 max-w-sm">
              Ein kurzer Austausch reicht, um zu klären,
              ob und wie ich dich unterstützen kann.
            </p>

            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors w-fit"
            >
              Termin vereinbaren <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} PAVEO</p>

          <div className="flex gap-6">
            <Link href="/agb" className="hover:text-neutral-300">AGB</Link>
            <Link href="/impressum" className="hover:text-neutral-300">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-neutral-300">Datenschutz</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
