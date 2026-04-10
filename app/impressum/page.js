import Navbar from '@/components/layout/Navbar';

export default function ImpressumPage() {
  return (
    <div className="font-jakarta bg-[#0E0C08] text-[#F5F2EB]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 space-y-10">

        <header className="space-y-4 border-b border-white/10 pb-10">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#E8A800] mb-2">
            Rechtliches
          </span>
          <h1 className="font-serif italic text-4xl md:text-5xl text-[#F5F2EB]">
            Impressum
          </h1>
          <p className="text-[#F5F2EB]/50 text-sm">
            Angaben gemäß § 5 TMG.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Diensteanbieter
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            <span className="text-[#F5F2EB] font-medium">Leon Seitz</span><br />
            Am Streitberg 28<br />
            63906 Erlenbach am Main<br />
            Deutschland
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Kontakt
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Telefon: +49 160 95757167<br />
            E-Mail: info@paveconsultings.com
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Vertretungsberechtigt
          </h2>
          <p className="text-[#F5F2EB]/70">Leon Seitz</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Umsatzsteuer-ID
          </h2>
          <p className="text-[#F5F2EB]/70">Wird ergänzt, sofern vorhanden.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Haftung für Inhalte
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Wir sind für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Für die Richtigkeit, Vollständigkeit und
            Aktualität übernehmen wir keine Gewähr. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen
            nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Haftung für Links
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Für diese fremden Inhalte übernehmen wir keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
            Anbieter oder Betreiber verantwortlich.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Urheberrecht
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Die durch uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
            bedürfen der schriftlichen Zustimmung.
          </p>
        </section>

        <p className="text-xs text-[#F5F2EB]/30 border-t border-white/10 pt-8">
          Stand: {new Date().toLocaleDateString('de-DE')}
        </p>

      </main>
      <Footer />
    </div>
  );
}
