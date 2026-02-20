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

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

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
      <style>{navKeyframes}</style>

      {/* subtle top glow / separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(60%_90%_at_50%_0%,rgba(255,255,255,0.10),transparent_70%)] opacity-70" />

      <nav className="px-4 md:px-10 pt-4">
        <div
          className={cx(
            'relative mx-auto max-w-6xl rounded-2xl',
            // Glass base
            'border border-white/12',
            'bg-white/[0.06]',
            'backdrop-blur-2xl',
            // Apple-ish depth
            'shadow-[0_18px_60px_-40px_rgba(0,0,0,0.85)]',
            'transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out',
            // Scroll state: slightly smaller + tighter + less “blocking”
            scrolled ? 'bg-white/[0.05] border-white/16 shadow-[0_10px_40px_-35px_rgba(0,0,0,0.85)]' : '',
            scrolled ? 'translate-y-[-2px] scale-[0.985]' : 'translate-y-0 scale-100'
          )}
        >
          {/* subtle inner hairline */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

          {/* “shiny” moving sheen (very subtle) */}
          <div
            aria-hidden="true"
            className={cx(
              'pointer-events-none absolute -inset-px rounded-2xl',
              'opacity-70',
              'blur-xl',
              'bg-[radial-gradient(70%_80%_at_20%_10%,rgba(255,255,255,0.12),transparent_55%),radial-gradient(60%_70%_at_85%_0%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(60%_70%_at_70%_120%,rgba(56,189,248,0.10),transparent_60%)]',
              'animate-[navSheen_10s_ease-in-out_infinite]'
            )}
          />

          {/* specular highlight line */}
          <div
            aria-hidden="true"
            className={cx(
              'pointer-events-none absolute inset-x-6 top-0 h-px',
              'bg-gradient-to-r from-transparent via-white/35 to-transparent',
              scrolled ? 'opacity-30' : 'opacity-45',
              'transition-opacity duration-300'
            )}
          />

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
                      className={cx(
                        'relative px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                        'outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70',
                        active ? 'text-white' : 'text-white/70 hover:text-white/90'
                      )}
                    >
                      {/* active pill */}
                      <span
                        aria-hidden="true"
                        className={cx(
                          'absolute inset-0 rounded-full transition-opacity',
                          active ? 'opacity-100' : 'opacity-0 hover:opacity-40',
                          'bg-white/10 border border-white/12'
                        )}
                      />
                      <span className="relative">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right: Desktop CTA (gradient, “glass” + sheen) */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href={contactHref}
                className={cx(
                  'group relative inline-flex items-center gap-2',
                  'px-5 py-2.5 rounded-full font-semibold text-sm',
                  'text-black',
                  // Gradient base (match site)
                  'bg-gradient-to-r from-violet-200 via-indigo-200 to-cyan-200',
                  // Glass polish
                  'shadow-[0_22px_55px_-35px_rgba(99,102,241,0.55)]',
                  'transition-[transform,filter,box-shadow] duration-300 ease-out',
                  'hover:brightness-[1.03] hover:shadow-[0_26px_70px_-40px_rgba(56,189,248,0.60)]',
                  scrolled ? 'scale-[0.98]' : 'scale-100',
                  'outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70'
                )}
                role="button"
              >
                {/* sheen sweep */}
                <span
                  aria-hidden="true"
                  className={cx(
                    'absolute inset-0 rounded-full overflow-hidden',
                    'before:absolute before:inset-y-[-40%] before:left-[-35%] before:w-[45%]',
                    'before:rotate-12 before:bg-white/55 before:blur-md before:opacity-0',
                    'before:transition-opacity before:duration-300',
                    'group-hover:before:opacity-35',
                    'before:animate-[ctaSheen_3.6s_ease-in-out_infinite]'
                  )}
                />
                {/* inner top highlight */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/35"
                />
                <span className="relative">Projekt anfragen</span>
                <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile button */}
            <button
              ref={buttonRef}
              type="button"
              className={cx(
                'md:hidden inline-flex items-center justify-center p-2 rounded-xl',
                'text-white/85 hover:text-white transition-colors',
                'bg-white/[0.06] border border-white/12 backdrop-blur-xl'
              )}
              aria-label={openMobileMenu ? 'Menü schließen' : 'Menü öffnen'}
              onClick={() => setOpenMobileMenu((v) => !v)}
            >
              {openMobileMenu ? <X size={22} /> : <AlignRight size={22} />}
            </button>
          </div>

          {/* Mobile sheet */}
          <div
            ref={menuRef}
            className={cx(
              'md:hidden overflow-hidden',
              'transition-[max-height,opacity] duration-300 ease-out',
              openMobileMenu ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
            )}
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
                        className={cx(
                          'flex items-center justify-between',
                          'px-4 py-3 rounded-2xl',
                          'border border-white/12 bg-white/[0.06] backdrop-blur-xl',
                          'text-sm font-semibold',
                          active ? 'text-white' : 'text-white/80'
                        )}
                      >
                        {label}
                        {active ? <span className="text-xs text-white/55">aktiv</span> : null}
                      </Link>
                    </li>
                  );
                })}

                <li className="pt-1">
                  <Link
                    href={contactHref}
                    className={cx(
                      'group relative inline-flex w-full items-center justify-center gap-2',
                      'px-5 py-3 rounded-2xl font-semibold',
                      'text-black',
                      'bg-gradient-to-r from-violet-200 via-indigo-200 to-cyan-200',
                      'shadow-[0_22px_55px_-35px_rgba(99,102,241,0.55)]'
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/35"
                    />
                    <span className="relative">Projekt anfragen</span>
                    <ArrowRight size={16} className="relative" />
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

const navKeyframes = `
@keyframes navSheen {
  0%   { transform: translate3d(0,0,0) scale(1); opacity: 0.60; }
  35%  { transform: translate3d(10px,-6px,0) scale(1.02); opacity: 0.78; }
  70%  { transform: translate3d(-8px,6px,0) scale(1.01); opacity: 0.65; }
  100% { transform: translate3d(0,0,0) scale(1); opacity: 0.60; }
}
@keyframes ctaSheen {
  0%   { transform: translateX(-30%) rotate(12deg); }
  45%  { transform: translateX(140%) rotate(12deg); }
  100% { transform: translateX(140%) rotate(12deg); }
}
`;
