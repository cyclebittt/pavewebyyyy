'use client';

import { AlignRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const links = [
  { href: '/', label: 'Start', key: '' },
  { href: '/about', label: 'Über uns', key: 'about' },
  { href: '/blogs', label: 'Blog', key: 'blogs' },
  { href: '/contact', label: 'Kontakt', key: 'contact' },
];

export default function Navbar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const pathnameFull = usePathname() || '/';
  const pathnameKey = pathnameFull.split('/')[1] ?? '';

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Schließen bei Klick außerhalb
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openMobileMenu &&
        menuRef.current && !menuRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        setOpenMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMobileMenu]);

  // ESC schließt Menü
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpenMobileMenu(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Beim Routenwechsel Menü schließen
  useEffect(() => setOpenMobileMenu(false), [pathnameFull]);

  // Body scroll lock bei offenem Mobile-Menü
  useEffect(() => {
    if (openMobileMenu) {
      const { overflow } = document.body.style;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = overflow; };
    }
  }, [openMobileMenu]);

  return (
    <header className="relative">
      {/* NAVBAR */}
      <nav className="relative z-50 bg-white font-proxima flex items-center justify-between gap-10 px-5 md:px-20 py-5">
        <Link href="/" aria-label="Zur Startseite">
          <span className="flex items-center gap-3">
            <Image src="/img/logoc.png" width={28} height={28} alt="paveo Logo" className="w-7 h-7" />
          </span>
        </Link>

        {/* Desktop: mittige Links */}
        <ul className="absolute top-1/2 left-1/2 hidden md:flex -translate-x-1/2 -translate-y-1/2 items-center gap-10 text-neutral-600">
          {links.map(({ href, label, key }) => {
            const active = pathnameKey === key;
            return (
              <li key={href} className="relative group">
                <Link href={href} className="outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm">
                  {label}
                </Link>
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 h-[3px] bg-neutral-500 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </li>
            );
          })}
        </ul>

        {/* CTA rechts (Desktop) */}
        <Link
          href="/request"
          className="hidden md:inline-flex px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
          role="button"
          aria-label="Termin anfragen"
        >
          <span className="relative z-10">Termin anfragen</span>
          <span className="absolute inset-0 translate-x-[-100%] bg-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </Link>

        {/* Mobile: Menü-Button */}
        <button
          ref={buttonRef}
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          aria-label={openMobileMenu ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={openMobileMenu}
          aria-controls="mobile-menu"
          onClick={() => setOpenMobileMenu((v) => !v)}
        >
          {openMobileMenu ? <X size={28} /> : <AlignRight size={28} />}
        </button>
      </nav>

      {/* Mobile-Menü */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden absolute left-0 w-full bg-white border-t border-neutral-200 font-medium text-neutral-700 transition-transform duration-300 ease-in-out
        ${openMobileMenu ? 'translate-y-0' : '-translate-y-full'} z-40`}
        role="dialog"
        aria-modal="true"
      >
        <ul className="flex flex-col py-3">
          {links.map(({ href, label }) => (
            <li key={href} className="w-full">
              <Link
                href={href}
                className="block px-5 py-3 relative group outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                {label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-5 w-0 h-[2px] bg-neutral-500 transition-all duration-300 group-hover:w-[calc(100%-2.5rem)]"
                />
              </Link>
            </li>
          ))}
          <li className="px-5 py-3">
            <Link
              href="/request"
              className="inline-flex w-full justify-center px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 transition-transform duration-200 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              role="button"
            >
              Termin anfragen
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
