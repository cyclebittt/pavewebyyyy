'use client';

import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Footer() {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <footer className="pt-14 relative">
      {/* Scroll-to-top Button */}
      <button
        type="button"
        aria-label="Nach oben scrollen"
        className="absolute group left-1/2 -translate-x-1/2 top-0 w-24 h-24 flex items-center justify-center border-white border-[12px] bg-violet-600 text-white rounded-full"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={40} className="transition-all duration-300 ease-out group-hover:mb-4" />
        <div className="absolute top-[44px] -left-[38px] w-[40px] h-[40px] rounded-tr-[40px] bg-neutral-800 shadow-[0px_-20px_0px_0px_white]" />
        <div className="absolute top-[44px] -right-[38px] w-[40px] h-[40px] rounded-tl-[40px] bg-neutral-800 shadow-[0px_-20px_0px_0px_white]" />
      </button>

      {/* Footer Content */}
      <div className="bg-neutral-800 rounded-t-3xl py-14 md:py-16 px-5 md:px-20 flex flex-col gap-14">
        {/* Call to Action */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <h2 className="font-medium text-white text-center md:text-left text-3xl md:text-4xl max-w-3xl">
            Lass uns deine Vision Wirklichkeit werden lassen – kontaktiere uns jetzt.
          </h2>
          <Link href="/request" className="w-fit">
            <button
              type="button"
              className="px-4 py-2 bg-white rounded-full font-semibold border-2 border-white relative overflow-hidden transition-all duration-500 ease-out group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Zusammenarbeit anfragen
              </span>
              <span className="absolute inset-0 bg-neutral-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </button>
          </Link>
        </div>

        {/* Links & Logo */}
        <div className="flex flex-col md:flex-row gap-14 md:gap-6 items-center justify-between">
          {/* Navigation Links */}
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6 text-white">
              <li>
                <Link href="/about">
                  <button className="px-5 py-3 border border-white rounded-full transition-all duration-300 hover:bg-white hover:text-neutral-800">
                    Über uns
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/blogs">
                  <button className="px-5 py-3 border border-white rounded-full transition-all duration-300 hover:bg-white hover:text-neutral-800">
                    Blog
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <button className="px-5 py-3 border border-white rounded-full transition-all duration-300 hover:bg-white hover:text-neutral-800">
                    Kontakt
                  </button>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logo & Copyright */}
          <div className="flex items-center md:items-start flex-col gap-5">
            <div className="flex items-center gap-3">
              <Image
                src="/img/logow.png"
                width={28}
                height={28}
                alt="paveo Logo"
                className="w-7 h-7"
              />
              <span className="font-bold text-xl text-white">paveo</span>
            </div>
            <p className="text-white text-sm">© {new Date().getFullYear()} – Alle Rechte vorbehalten</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
