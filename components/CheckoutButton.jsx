// /components/CheckoutButton.jsx
'use client';

import { useState } from 'react';

/**
 * Wiederverwendbarer Stripe-Checkout-Button.
 * priceId:   Stripe-Price-ID (string)
 * quantity:  Anzahl (optional, default 1)
 * service:   Name des Service (z. B. „content“)
 * pkg:       Paketname (z. B. „Essentials“)
 * label:     Text auf dem Button
 * successPath: Zielpfad bei erfolgreicher Zahlung
 * cancelPath:  Zielpfad bei Abbruch
 * className:  Zusätzliche Tailwind-Klassen für Styling
 */
export default function CheckoutButton({
  priceId,
  quantity = 1,
  service = '',
  pkg = '',
  label = 'Jetzt kaufen',
  successPath = '/success',
  cancelPath = '/',
  className = '',
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lineItems: [{ price: priceId, quantity }],
          metadata: { service, package: pkg },
          successPath,
          cancelPath,
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert('Fehler beim Starten des Checkouts.');
      }
    } catch (e) {
      console.error(e);
      alert('Unerwarteter Fehler.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className || 'rounded-xl px-4 py-2 bg-white text-black hover:opacity-90 transition'}
      aria-label={label}
    >
      {loading ? 'Weiterleiten …' : label}
    </button>
  );
}
