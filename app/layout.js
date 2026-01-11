import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "Leon Seitz - Webdesign & digitale Lösungen",
  description: "Design, Content & Strategie – Wir machen Marken sichtbar, professionell & psychologisch wirkungsvoll.",
  keywords: "Paveo, Branding, Webdesign, Content Creation, Social Media, Lead Generation",
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.paveo.de/',
    title: 'Paveo',
    description: 'Design, Content & Strategie – Wir machen Marken sichtbar, professionell & psychologisch wirkungsvoll.',
    site_name: 'Paveo',
    images: [
      {
        url: '/logo-paveo.ico', // dein neues Logo als Vorschau
        width: 512,
        height: 512,
        alt: 'Paveo Logo',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <Head>
        {/* Titel + Meta */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />

        {/* OpenGraph für Social Media */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:locale" content={metadata.openGraph.locale} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.openGraph.title} />
        <meta name="twitter:description" content={metadata.openGraph.description} />
        <meta name="twitter:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:site" content="@Paveo" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.paveo.de/" />

        {/* Neues Favicon */}
        <link rel="icon" href="/logo-paveo.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-paveo.ico" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
