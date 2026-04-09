import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Leon Seitz — Digitaler Auftritt für lokale Betriebe",
  description:
    "Ich analysiere wie dein Betrieb nach außen wirkt — Website, Flyer, Social, Prozesse. Kostenlose Analyse, kein Commitment.",
  keywords:
    "Webdesign, Branding, Flyer, Speisekarte, Social Media, Digitalisierung, Aschaffenburg, Obernburg, lokale Betriebe",
  authors: [{ name: "Leon Seitz", url: "https://www.leonseitz.com" }],
  metadataBase: new URL("https://www.leonseitz.com"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.leonseitz.com/",
    title: "Leon Seitz — Digitaler Auftritt für lokale Betriebe",
    description:
      "Kostenlose Analyse deines Auftritts — Website, Print, Social, Prozesse. Zahlung erst wenn es dir gefällt.",
    siteName: "Leon Seitz",
    images: [
      {
        // TODO: Ersetze durch ein echtes 1200×630 JPG, z.B. /og-image.jpg
        // Ein .ico wird von Social-Plattformen und Google nicht korrekt gerendert
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Leon Seitz — Digitaler Auftritt für lokale Betriebe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon Seitz — Digitaler Auftritt für lokale Betriebe",
    description:
      "Kostenlose Analyse deines Auftritts — Website, Print, Social, Prozesse.",
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
  jobTitle: "Webdesigner & Digitaler Stratege",
  description:
    "Ich helfe lokalen Betrieben in der Region Aschaffenburg mit Webdesign, Branding, Print und Social Media.",
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
  ],
  sameAs: [
    "https://www.instagram.com/leonnseitz",
    "https://www.linkedin.com/in/leon-seitz", // URL anpassen falls abweichend
  ],
  knowsAbout: [
    "Webdesign",
    "Branding",
    "Motion Design",
    "Social Media",
    "Next.js",
    "Shopify",
  ],
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
