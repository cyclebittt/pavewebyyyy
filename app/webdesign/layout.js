export const metadata = {
  title: 'Webdesign von Leon Seitz — Paveo',
  description: 'Individuelle Websites, die konvertieren. Erster Entwurf in 24h. Du zahlst erst, wenn es dir gefällt.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function WebdesignLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&family=DM+Serif+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
