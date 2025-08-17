// /lib/stripe.js
import Stripe from 'stripe';

// Falls die STRIPE_SECRET_KEY während des Builds nicht gesetzt sein sollte,
// verwenden wir einen Platzhalter (der Build bricht sonst ab).
const secretKey = process.env.STRIPE_SECRET_KEY || 'sk_placeholder';

// Stripe-Instanz initialisieren
export const stripe = new Stripe(secretKey, {
  apiVersion: '2024-06-20',
});
