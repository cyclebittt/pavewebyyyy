'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  const whatsappHref =
    'https://wa.me/4916095757167?text=Hi%20Leon,%0A%0AZiel:%0ADeadline:%0AStand:%0A%0AKurzer%20Kontext:';
  const mailHref =
    'mailto:leonseitz25@icloud.com?subject=Projektanfrage&body=Hi%20Leon,%0A%0AZiel:%0ADeadline:%0AStand:%0A%0AKurzer%20Kontext:';

  return (
    <footer className="relative bg-gradient-to-br from-[#0B0B0F] via-[#0E0E15] to-black text-neutral-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14">
        {/* Top */}
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
                <span className="font-extrabold text-white text-lg">Leon Seitz</span>
              </span>
            </Link>

            <p className="text-sm text-neutral-400 max-w-sm">
              Klar begrenzte digitale Projekte: Website/Landingpage, Formulare, Zahlungswege – optional mit
              passenden Medien (Flyer, Foto, Video).
            </p>
          </div>

          {/* Kontakt */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Kontakt</h4>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp schreiben
            </a>

            <a
              href={mailHref}
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <Mail size={16} />
              leonseitz25@icloud.com
            </a>

            <p className="text-xs text-neutral-500 mt-2">
              Datenschutz: Deine Nachricht nutze ich ausschließlich zur Rückmeldung.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white">Kurzer Austausch?</h4>
            <p className="text-sm text-neutral-400 max-w-sm">
              20–30 Minuten reichen, um Ziel, Deadline und nächsten Schritt zu klären.
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
          <p>© {new Date().getFullYear()} PAVEO</p>
          <div className="flex gap-6">
            <Link href="/agb" className="hover:text-neutral-300">
              AGB
            </Link>
            <Link href="/impressum" className="hover:text-neutral-300">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-neutral-300">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
