// /lib/stripe.js
import Stripe from 'stripe';

// Platzhalter verwenden, falls die Umgebungsvariable während des Builds noch nicht vorhanden ist
const stripeSecret = process.env.STRIPE_SECRET_KEY || 'sk_placeholder';

export const stripe = new Stripe(stripeSecret, {
  apiVersion: '2024-06-20',
});
