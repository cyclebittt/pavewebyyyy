'use client';

import { AlignRight, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const LINKS = [
  { href: '/', label: 'Start', key: '' },
  { href: '/portfolio', label: 'Portfolio', key: 'portfolio' },
];

export default function Navbar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathnameFull = usePathname() || '/';
  const pathnameKey = pathnameFull.split('/')[1] ?? '';

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const isHome = pathnameFull === '/' || pathnameFull === '';

  const contactHref = useMemo(() => (isHome ? '/#request' : '/#request'), [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openMobileMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpenMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMobileMenu]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMobileMenu(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    setOpenMobileMenu(false);
  }, [pathnameFull]);

  useEffect(() => {
    if (!openMobileMenu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openMobileMenu]);

  const isActive = (key) => pathnameKey === key;

  return (
    <header className="fixed top-0 left-0 right-0 z-[80]">
      {/* subtle top glow / separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(60%_90%_at_50%_0%,rgba(255,255,255,0.10),transparent_70%)] opacity-70" />

      <nav className="px-4 md:px-10 pt-4">
        <div
          className={[
            'relative mx-auto max-w-6xl',
            'rounded-2xl',
            'border border-white/12',
            'bg-black/25',
            'backdrop-blur-xl',
            'shadow-[0_10px_35px_-20px_rgba(0,0,0,0.75)]',
            'transition-all duration-300',
            scrolled ? 'bg-black/35 border-white/18' : '',
          ].join(' ')}
        >
          {/* gradient hairline */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-60 blur-xl bg-[radial-gradient(60%_80%_at_50%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(55%_70%_at_80%_0%,rgba(56,189,248,0.08),transparent_60%)]" />

          <div className="relative flex items-center justify-between gap-6 px-4 md:px-6 py-3">
            {/* Left: Brand */}
            <Link href="/" aria-label="Zur Startseite" className="flex items-center gap-3">
              <Image src="/img/logo-paveo.png" alt="paveo Logo" width={120} height={40} className="h-9 w-auto" priority />
              <span className="hidden sm:inline font-semibold text-white/90">Leon Seitz</span>
            </Link>

            {/* Center: Desktop Links */}
            <ul className="hidden md:flex items-center gap-2">
              {LINKS.map(({ href, label, key }) => {
                const active = isActive(key);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={[
                        'relative px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                        'outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70',
                        active ? 'text-white' : 'text-white/70 hover:text-white/90',
                      ].join(' ')}
                    >
                      {/* active pill */}
                      <span
                        aria-hidden="true"
                        className={[
                          'absolute inset-0 rounded-full transition-opacity',
                          active ? 'opacity-100' : 'opacity-0 hover:opacity-40',
                          'bg-white/10 border border-white/12',
                        ].join(' ')}
                      />
                      <span className="relative">{label}</span>
                    </Link>
                  </li>
                );
              })}

              {/* Contact / Request on homepage scroll */}
              <li>
                <Link
                  href={contactHref}
                  className={[
                    'relative px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                    'text-white/70 hover:text-white/90',
                    'outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70',
                  ].join(' ')}
                >
                  <span aria-hidden="true" className="absolute inset-0 rounded-full bg-white/0 hover:bg-white/6 transition-colors" />
                  <span className="relative">Anfrage</span>
                </Link>
              </li>
            </ul>

            {/* Right: Desktop CTA */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href={contactHref}
                className={[
                  'group inline-flex items-center gap-2',
                  'px-5 py-2.5 rounded-full font-semibold text-sm',
                  'bg-white text-black hover:bg-white/90 transition-colors',
                  'shadow-[0_18px_40px_-25px_rgba(255,255,255,0.35)]',
                  'outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70',
                ].join(' ')}
                role="button"
              >
                Projekt anfragen
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile button */}
            <button
              ref={buttonRef}
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-white/85 hover:text-white transition-colors bg-white/5 border border-white/10"
              aria-label={openMobileMenu ? 'Menü schließen' : 'Menü öffnen'}
              onClick={() => setOpenMobileMenu((v) => !v)}
            >
              {openMobileMenu ? <X size={22} /> : <AlignRight size={22} />}
            </button>
          </div>

          {/* Mobile sheet */}
          <div
            ref={menuRef}
            className={[
              'md:hidden overflow-hidden',
              'transition-[max-height,opacity] duration-300 ease-out',
              openMobileMenu ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0',
            ].join(' ')}
          >
            <div className="px-4 pb-4">
              <div className="h-px bg-white/10 mb-3" />

              <ul className="flex flex-col gap-2">
                {LINKS.map(({ href, label, key }) => {
                  const active = isActive(key);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={[
                          'flex items-center justify-between',
                          'px-4 py-3 rounded-2xl',
                          'border border-white/10 bg-white/5',
                          'text-sm font-semibold',
                          active ? 'text-white' : 'text-white/80',
                        ].join(' ')}
                      >
                        {label}
                        {active ? <span className="text-xs text-white/55">aktiv</span> : null}
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <Link
                    href={contactHref}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white/85"
                  >
                    Anfrage
                  </Link>
                </li>

                <li className="pt-1">
                  <Link
                    href={contactHref}
                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-semibold"
                  >
                    Projekt anfragen <ArrowRight size={16} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* spacer so content doesn't sit under fixed nav */}
      <div className="h-[84px] md:h-[92px]" />
    </header>
  );
}
