import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ImpressumPage() {
  return (
    <div className="font-proxima bg-gradient-to-br from-[#0B0B0F] via-[#0E0E15] to-black text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20 space-y-8">
        <header className="space-y-4">
          <span className="inline-block text-sm text-indigo-300/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Rechtliches</span>
          <h1 className="text-3xl md:text-5xl font-bold">Impressum</h1>
          <p className="text-neutral-300">
            Angaben gemäß § 5 TMG.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Diensteanbieter</h2>
          <p className="text-neutral-300">
            <strong>Paveo</strong><br />
            Am Streitberg 28<br />
            63906 Erlenbach am Main<br />
            Deutschland
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Kontakt</h2>
          <p className="text-neutral-300">
            Telefon: +49 160 95757167<br />
            E-Mail: info@paveconsultings.com
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Vertretungsberechtigt</h2>
          <p className="text-neutral-300">Leon Seitz</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Umsatzsteuer-ID</h2>
          <p className="text-neutral-300">Wird ergänzt, sofern vorhanden.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Haftung für Inhalte</h2>
          <p className="text-neutral-300">
            Wir sind für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Für die Richtigkeit, Vollständigkeit und
            Aktualität übernehmen wir keine Gewähr. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen
            nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Haftung für Links</h2>
          <p className="text-neutral-300">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Für diese fremden Inhalte übernehmen wir keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
            Anbieter oder Betreiber verantwortlich.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Urheberrecht</h2>
          <p className="text-neutral-300">
            Die durch uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
            bedürfen der schriftlichen Zustimmung.
          </p>
        </section>

        <p className="text-xs text-neutral-500">Stand: {new Date().toLocaleDateString('de-DE')}</p>
      </main>

      <Footer />
    </div>
  );
}
