import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "Pave Consultings",
  description: "Paving your path to the digital future",
  keywords: "Pave Consultings, pave consulting, paveconsulting, pave consultings digital, pave consultings services, paveconsultings",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.paveconsultings.com/',
    title: 'Pave Consultings',
    description: 'Paving your path to the digital future',
    site_name: 'pave consultings',
    images: [
      {
        url: 'http://res.cloudinary.com/di4m8pzsa/image/upload/v1733249294/hwmusb78lsbiz6shrzy6.jpg',
        width: 910,
        height: 500,
        alt: 'Pave Consultings Preview',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.paveconsultings.com/" />
        <meta
          property="og:image"
          content="http://res.cloudinary.com/di4m8pzsa/image/upload/v1733249294/hwmusb78lsbiz6shrzy6.jpg"
        />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta
          name="twitter:image"
          content="http://res.cloudinary.com/di4m8pzsa/image/upload/v1733249294/hwmusb78lsbiz6shrzy6.jpg"
        />
        <meta name="twitter:site" content="@PaveConsultings" />
        <link rel="canonical" href="https://www.paveconsultings.com/" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
