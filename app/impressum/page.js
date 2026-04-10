export default function ImpressumPage() {
  return (
    <div className="font-jakarta bg-[#0E0C08] text-[#F5F2EB] min-h-screen">
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
            E-Mail: hello@leonseitz.com
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Umsatzsteuer
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Haftung für Inhalte
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Ich bin für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Eine Gewähr für Richtigkeit,
            Vollständigkeit und Aktualität übernehme ich nicht. Verpflichtungen zur Entfernung oder Sperrung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Haftung für Links
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Diese Website enthält Links zu externen Seiten Dritter, auf deren Inhalte ich keinen Einfluss habe.
            Für diese fremden Inhalte übernehme ich keine Haftung. Verantwortlich für die Inhalte verlinkter
            Seiten ist stets der jeweilige Anbieter oder Betreiber.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Urheberrecht
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Die von mir erstellten Inhalte und Werke auf dieser Seite unterliegen dem deutschen Urheberrecht.
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
            Urheberrechts bedürfen meiner schriftlichen Zustimmung.
          </p>
        </section>

        <p className="text-xs text-[#F5F2EB]/30 border-t border-white/10 pt-8">
          Stand: {new Date().toLocaleDateString('de-DE')}
        </p>

      </main>
    </div>
  );
}
