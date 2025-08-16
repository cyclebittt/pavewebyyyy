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
              Wir machen Marken sichtbar, professionell & psychologisch wirkungsvoll.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Navigation</h4>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">Über uns</Link>
            <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Services</h4>
            <Link href="/services/socialmedia" className="hover:text-white transition-colors">Social Media</Link>
            <Link href="/services/branding" className="hover:text-white transition-colors">Branding</Link>
            <Link href="/services/webdesign" className="hover:text-white transition-colors">Webdesign</Link>
            <Link href="/services/content" className="hover:text-white transition-colors">Content Creation</Link>
            <Link href="/services/lead" className="hover:text-white transition-colors">Lead Generation</Link>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white">Let’s Talk</h4>
            <p className="text-sm text-neutral-400">Starte dein Projekt mit uns.</p>
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
          <p>© {new Date().getFullYear()} Paveo. All rights reserved.</p>
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
