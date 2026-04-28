import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Leon Seitz — Digitale Strukturen für wachsende Unternehmen",
  description:
    "Ich analysiere, wo digitale Struktur fehlt — Website, interne Abläufe, Kommunikation und Außenauftritt. Kostenlose Analyse, kein Commitment.",
  keywords:
    "digitale Strukturen, Digitalisierung, Webdesign, interne Abläufe, Prozessdigitalisierung, Kommunikation, Branding, Website, Social Media, Aschaffenburg, Obernburg, Unternehmen",
  authors: [{ name: "Leon Seitz", url: "https://www.leonseitz.com" }],
  metadataBase: new URL("https://www.leonseitz.com"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.leonseitz.com/",
    title: "Leon Seitz — Digitale Strukturen für wachsende Unternehmen",
    description:
      "Kostenlose Analyse: Ich prüfe Website, interne Abläufe, Kommunikation und Außenauftritt — und zeige konkret, wo digitale Struktur fehlt.",
    siteName: "Leon Seitz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Leon Seitz — Digitale Strukturen für wachsende Unternehmen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon Seitz — Digitale Strukturen für wachsende Unternehmen",
    description:
      "Kostenlose Analyse: Website, interne Abläufe, Kommunikation und Außenauftritt — konkret, ehrlich, ohne Commitment.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://www.leonseitz.com/",
  },
  icons: {
    icon: "/logo-paveo.ico",
    apple: "/logo-paveo.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leon Seitz",
  url: "https://www.leonseitz.com",
  jobTitle: "Digitaler Stratege & Webdesigner",
  description:
    "Ich helfe wachsenden Unternehmen dabei, digitale Strukturen aufzubauen — von Website und Außenauftritt bis zu internen Abläufen, Kommunikation und Prozessdigitalisierung.",
  email: "hello@leonseitz.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aschaffenburg",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  areaServed: [
    { "@type": "City", name: "Aschaffenburg" },
    { "@type": "City", name: "Obernburg am Main" },
    { "@type": "City", name: "Erlenbach am Main" },
    { "@type": "AdministrativeArea", name: "Bayern" },
  ],
  sameAs: [
    "https://www.instagram.com/leonnseitz",
    "https://www.linkedin.com/in/leon-seitz"
  ],
  knowsAbout: [
    "Digitale Strukturen",
    "Prozessdigitalisierung",
    "Webdesign",
    "Branding",
    "Kommunikation",
    "Social Media",
    "Motion Design",
    "Next.js",
    "Shopify",
    "Automatisierte Workflows"
  ],
  offers: {
    "@type": "Offer",
    name: "Kostenlose Phase-0-Analyse",
    description:
      "Analyse von Website, internen Abläufen, Kommunikation und Außenauftritt zur Identifikation digitaler Potenziale.",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
