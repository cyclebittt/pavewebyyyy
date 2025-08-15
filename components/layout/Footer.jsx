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
        className="absolute group left-1/2 -translate-x-1/2 top-0 w-24 h-24 flex items-center justify-center border-white border-[12px] bg-violet-600 text-white rounded-full shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={40} className="transition-all duration-300 ease-out group-hover:mb-4" />
      </button>

      {/* Footer Content */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 rounded-t-3xl py-14 md:py-16 px-5 md:px-20 flex flex-col gap-14">
        {/* Call to Action */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <h2 className="font-medium text-white text-center md:text-left text-3xl md:text-4xl max-w-3xl">
            Lass uns gemeinsam deine Marke auf das nächste Level bringen.
          </h2>
          <Link href="/request" className="w-fit">
            <button
              type="button"
              className="px-6 py-3 bg-violet-600 text-white rounded-full font-semibold border-2 border-violet-600 hover:bg-violet-700 hover:border-violet-700 transition-all duration-300"
            >
              Zusammenarbeit anfragen
            </button>
          </Link>

