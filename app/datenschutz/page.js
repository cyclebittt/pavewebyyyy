export default function DatenschutzPage() {
  return (
    <div className="font-jakarta bg-[#0E0C08] text-[#F5F2EB] min-h-screen">
      <main className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 space-y-10">

        <header className="space-y-4 border-b border-white/10 pb-10">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#E8A800] mb-2">
            Rechtliches
          </span>
          <h1 className="font-serif italic text-4xl md:text-5xl text-[#F5F2EB]">
            Datenschutzerklärung
          </h1>
          <p className="text-[#F5F2EB]/50 text-sm">
            Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 DSGVO.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Verantwortlicher
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            <span className="text-[#F5F2EB] font-medium">Leon Seitz</span><br />
            Am Streitberg 28<br />
            63906 Erlenbach am Main<br />
            Deutschland<br />
            E-Mail: hello@leonseitz.com<br />
            Telefon: +49 160 95757167
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Hosting
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Diese Website wird gehostet von <span className="text-[#F5F2EB] font-medium">Vercel Inc.</span>,
            340 Pine Street, Suite 701, San Francisco, CA 94104, USA. Beim Aufruf der Website werden
            automatisch technische Zugriffsdaten in Server-Logfiles erfasst, darunter IP-Adresse,
            Browsertyp, Betriebssystem, Referrer-URL und Zeitpunkt des Zugriffs. Diese Daten werden
            ausschließlich zur Sicherstellung des technischen Betriebs verarbeitet und nicht mit
            anderen Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an einem sicheren und stabilen Betrieb). Es besteht ein
            Auftragsverarbeitungsvertrag mit Vercel. Bei der Verarbeitung durch Vercel kann ein
            Datentransfer in die USA stattfinden; Vercel nutzt hierfür Standardvertragsklauseln
            gemäß Art. 46 DSGVO. Weitere Informationen:{" "}
            <a href="https://vercel.com/legal/privacy-policy" className="text-[#E8A800] underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              vercel.com/legal/privacy-policy
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Cookies & Tracking
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Diese Website verwendet keine Tracking-Tools, keine Analyse-Dienste und keine
            Marketing-Cookies. Es werden ausschließlich technisch notwendige Cookies eingesetzt,
            soweit diese für den Betrieb der Website erforderlich sind.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Kontaktaufnahme
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Bei einer Kontaktaufnahme per E-Mail werden die übermittelten Daten (Name, E-Mail-Adresse,
            Nachrichteninhalt) ausschließlich zur Bearbeitung der Anfrage verarbeitet.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vertragsbezogenen Anfragen,
            andernfalls Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden gelöscht, sobald der
            Zweck der Verarbeitung entfallen ist und keine gesetzlichen Aufbewahrungsfristen
            entgegenstehen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Terminvereinbarung (Calendly)
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Für die Buchung von Terminen wird der Dienst <span className="text-[#F5F2EB] font-medium">Calendly</span> der
            Calendly LLC, 271 17th St NW, Atlanta, GA 30363, USA, eingesetzt. Bei der Nutzung
            werden Kontaktdaten, Terminwünsche und technische Metadaten verarbeitet.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Es besteht ein
            Auftragsverarbeitungsvertrag mit Calendly. Ein Datentransfer in die USA findet
            auf Basis von Standardvertragsklauseln gemäß Art. 46 DSGVO statt. Weitere
            Informationen:{" "}
            <a href="https://calendly.com/privacy" className="text-[#E8A800] underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              calendly.com/privacy
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Deine Rechte
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Du hast gegenüber dem Verantwortlichen folgende Rechte hinsichtlich deiner
            personenbezogenen Daten: Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
            (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung
            (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch
            gegen die Verarbeitung (Art. 21 DSGVO). Erteilte Einwilligungen können
            jederzeit mit Wirkung für die Zukunft widerrufen werden. Zudem hast du das
            Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, zuständig
            ist der Landesbeauftragte für den Datenschutz Baden-Württemberg bzw. Bayern.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Speicherdauer
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Personenbezogene Daten werden gelöscht, sobald der Verarbeitungszweck entfällt
            und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Für geschäftliche
            Korrespondenz gelten die handels- und steuerrechtlichen Aufbewahrungsfristen
            von bis zu 10 Jahren.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            Externe Links
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Diese Website enthält Links zu externen Websites. Für deren Inhalte und
            Datenschutzpraktiken übernehme ich keine Verantwortung. Es gelten die
            jeweiligen Datenschutzerklärungen der verlinkten Anbieter.
          </p>
        </section>

        <p className="text-xs text-[#F5F2EB]/30 border-t border-white/10 pt-8">
          Stand: {new Date().toLocaleDateString('de-DE')}
        </p>

      </main>
    </div>
  );
}
