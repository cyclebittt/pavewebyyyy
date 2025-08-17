// /app/success/page.js
'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function SuccessPage() {
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    // Optional: aus der URL lesen (kann man per Webhook verifizieren)
    const url = new URL(window.location.href);
    const email = url.searchParams.get('email');
    if (email) {
      setCustomerEmail(email);
    }
  }, []);

  return (
    <div className="font-proxima bg-[#0C0D12] text-white min-h-screen">
      <Navbar />
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">Zahlung erfolgreich – danke!</h1>
          <p className="text-neutral-300 mb-6">
            Wir haben deine Bestellung erhalten. Du bekommst gleich eine Bestätigungs-E-Mail von Stripe mit allen Details.
          </p>

          {customerEmail && (
            <p className="text-neutral-400 mb-6">Deine Rechnung wird an {customerEmail} gesendet.</p>
          )}

          {/* Calendly-Link (kannst du durch <iframe> ersetzen, wenn du das Widget direkt einbetten willst) */}
          <div className="mt-10">
            <a
              href="https://calendly.com/DEIN-CALENDLY"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-xl bg-white text-black px-5 py-3"
            >
              Termin für Kickoff wählen
            </a>
            <p className="text-neutral-400 text-sm mt-3">
              Oder schreib uns: info@paveo.de
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
