'use client';

import { AlignRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const links = [
  { href: '/', label: 'Start', key: '' },
  { href: '/about', label: 'Über mich & paveo', key: 'about' },
  { href: '/portfolio', label: 'Portfolio', key: 'portfolio' },
  // { href: '/blogs', label: 'Blog', key: 'blogs' },
  { href: '/contact', label: 'Kontakt', key: 'contact' },
];

export default function Navbar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const pathnameFull = usePathname() || '/';
  const pathnameKey = pathnameFull.split('/')[1] ?? '';

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openMobileMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpenMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMobileMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMobileMenu(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    // Menü schließen, wenn Route wechselt
    setOpenMobileMenu(false);
  }, [pathnameFull]);

  useEffect(() => {
    if (openMobileMenu) {
      const { overflow } = document.body.style;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = overflow;
      };
    }
  }, [openMobileMenu]);

  return (
    <header className="relative shadow-md">
      <nav className="relative z-50 bg-gradient-to-br from-[#0F0F18] via-[#131329] to-[#0B0B14] font-proxima flex items-center justify-between gap-10 px-5 md:px-20 py-4">
        <Link href="/" aria-label="Zur Startseite">
          <span className="flex items-center gap-3">
            <Image
              src="/img/logo-paveo.png"
              alt="paveo Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="font-bold text-lg text-white">paveo</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="absolute top-1/2 left-1/2 hidden md:flex -translate-x-1/2 -translate-y-1/2 items-center gap-10 text-white/80">
          {links.map(({ href, label, key }) => {
            const active = pathnameKey === key;
            return (
              <li key={href} className="relative group">
                <Link
                  href={href}
                  className="outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
                >
                  {label}
                </Link>
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 h-[3px] bg-violet-500 transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </li>
            );
          })}
        </ul>

        {/* CTA rechts */}
        <Link
          href="/request"
          className="hidden md:inline-flex px-5 py-2 bg-violet-600 text-white rounded-full font-semibold border border-violet-500 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-[1.05] hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
          role="button"
        >
          Termin vereinbaren
        </Link>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          aria-label={openMobileMenu ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpenMobileMenu((v) => !v)}
        >
          {openMobileMenu ? <X size={28} /> : <AlignRight size={28} />}
        </button>
      </nav>

      {/* Mobile Menü */}
      <div
        ref={menuRef}
        className={`md:hidden absolute left-0 w-full bg-gradient-to-b from-[#0F0F18] via-[#131329] to-[#0B0B14] border-t border-white/10 font-medium text-white/90 transition-transform duration-300 ease-in-out ${
          openMobileMenu ? 'translate-y-0' : '-translate-y-full'
        } z-40`}
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
                  className="absolute bottom-1 left-5 w-0 h-[2px] bg-violet-500 transition-all duration-300 group-hover:w-[calc(100%-2.5rem)]"
                />
              </Link>
            </li>
          ))}
          <li className="px-5 py-3">
            <Link
              href="/request"
              className="inline-flex w-full justify-center px-4 py-2 bg-violet-600 text-white rounded-full font-semibold border border-violet-500 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] transition-transform duration-200 hover:scale-[1.02] hover:bg-violet-500"
            >
              Termin vereinbaren
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
