// /app/cancel/page.js
'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="font-proxima bg-[#0C0D12] text-white min-h-screen">
      <Navbar />
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">Vorgang abgebrochen</h1>
          <p className="text-neutral-300 mb-6">
            Keine Sorge – es wurde nichts abgebucht. Du kannst den Kauf jederzeit erneut starten.
          </p>
          <Link
            href="/services"
            className="inline-block rounded-xl bg-white text-black px-5 py-3"
          >
            Zurück zu den Services
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
