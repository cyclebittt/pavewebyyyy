// /app/api/checkout/route.js
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

// POST /api/checkout
export async function POST(req) {
  try {
    const { lineItems, metadata, successPath = '/success', cancelPath = '/' } = await req.json();

    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: 'No line items provided' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Stripe-Checkout-Session anlegen
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: [
        'card',
        'klarna',
        'sepa_debit',
        'bancontact',
        'ideal',
        // Apple Pay & Google Pay werden automatisch über „card“ bereitgestellt
      ],
      line_items: lineItems, // z.B. [{ price: 'price_ABC123', quantity: 1 }]
      success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${cancelPath}`,
      metadata: metadata || {},
      billing_address_collection: 'required',
      allow_promotion_codes: false,
      // Stripe Tax hier bewusst deaktiviert (Kleinunternehmerregelung)
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Checkout session error' }, { status: 500 });
  }
}
