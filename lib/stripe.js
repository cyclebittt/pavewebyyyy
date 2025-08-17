// /lib/stripe.js
import Stripe from 'stripe';

// wirft einen Fehler, falls kein Secret-API-Key gesetzt ist
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

// Initialisierung der Stripe-Instanz mit der aktuellen API-Version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});
