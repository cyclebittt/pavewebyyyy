import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Leon Seitz — In 24h besser als deine Konkurrenz.",
  description:
    "Innerhalb von 24 Stunden analysiere ich deinen digitalen Auftritt und liefere eine optimierte Website — du zahlst nur, wenn es dir gefällt. Kein Template, kein Baukastensystem.",
  keywords:
    "Webdesign, Website erstellen, Landing Page, Unternehmenswebsite, Website Aschaffenburg, Webdesigner, individuelle Website, günstige Website, schnelle Website",
  authors: [{ name: "Leon Seitz", url: "https://www.leonseitz.com" }],
  metadataBase: new URL("https://www.leonseitz.com"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.leonseitz.com/",
    title: "Leon Seitz — In 24h besser als deine Konkurrenz.",
    description:
      "Kostenlose Analyse: Ich prüfe Website, interne Abläufe, Kommunikation und Außenauftritt — und zeige konkret, wo digitale Struktur fehlt.",
    siteName: "Leon Seitz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Leon Seitz — In 24h besser als deine Konkurrenz.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon Seitz — In 24h besser als deine Konkurrenz.",
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
