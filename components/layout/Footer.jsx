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
        className="absolute group left-1/2 -translate-x-1/2 top-0 w-24 h-24 flex items-center justify-center border-[#0A0A10] border-[12px] bg-violet-600 text-white rounded-full shadow-lg shadow-violet-900/40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={40} className="transition-all duration-300 ease-out group-hover:mb-4" />
        <div className="absolute top-[44px] -left-[38px] w-[40px] h-[40px] rounded-tr-[40px] bg-[#0A0A10]" />
        <div className="absolute top-[44px] -right-[38px] w-[40px] h-[40px] rounded-tl-[40px] bg-[#0A0A10]" />
      </button>

      {/* Footer Content */}
      <div className="bg-gradient-to-br from-[#0F0F18] via-[#131329] to-[#0B0B14] rounded-t-3xl py-14 md:py-16 px-5 md:px-20 flex flex-col gap-14">
        {/* Call to Action */}
        <div
          className="flex flex-col md:flex-row gap-6 items-center justify-between"
          data-aos="fade-up"
        >
          <h2 className="font-semibold text-white text-center md:text-left text-3xl md:text-4xl max-w-3xl leading-tight">
            Lass uns gemeinsam deine Marke auf das nächste Level bringen.
          </h2>
          <Link href="/request" className="w-fit">
            <button
              type="button"
              className="px-6 py-3 rounded-full font-semibold border border-violet-500 bg-violet-600 text-white shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-[1.03] hover:bg-violet-500"
            >
              Zusammenarbeit anfragen
            </button>
          </Link>
        </div>

        {/* Links & Logo */}
        <div
          className="flex flex-col md:flex-row gap-14 md:gap-6 items-center justify-between"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {/* Navigation Links */}
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6 text-white">
              {[
                { href: '/about', label: 'Über uns' },
                { href: '/blogs', label: 'Blog' },
                { href: '/contact', label: 'Kontakt' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <button className="px-5 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur transition-all duration-300 hover:bg-violet-600 hover:border-violet-500 hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.6)]">
                      {link.label}
                    </button>
                  </Link>
                </li>
              ))}
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
            <p className="text-[#AAB1C2] text-sm">
              © {new Date().getFullYear()} – Alle Rechte vorbehalten
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
