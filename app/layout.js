import "./globals.css";

export const metadata = {
  title: "Leon Seitz — Digitaler Auftritt für lokale Betriebe",
  description: "Ich analysiere wie dein Betrieb nach außen wirkt — Website, Flyer, Social, Prozesse. Kostenlose Analyse, kein Commitment.",
  keywords: "Webdesign, Branding, Flyer, Speisekarte, Social Media, Digitalisierung, Aschaffenburg, Obernburg, lokale Betriebe",
  metadataBase: new URL("https://www.leonseitz.com"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.leonseitz.com/",
    title: "Leon Seitz — Digitaler Auftritt für lokale Betriebe",
    description: "Kostenlose Analyse deines Auftritts — Website, Print, Social, Prozesse. Zahlung erst wenn es dir gefällt.",
    siteName: "Leon Seitz",
    images: [
      {
        url: "/logo-paveo.ico",
        width: 512,
        height: 512,
        alt: "Leon Seitz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon Seitz — Digitaler Auftritt für lokale Betriebe",
    description: "Kostenlose Analyse deines Auftritts — Website, Print, Social, Prozesse.",
    images: ["/logo-paveo.ico"],
  },
  robots: {
    index: true,
    follow: true,
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

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
