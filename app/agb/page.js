export default function AGBPage() {
  return (
    <div className="font-jakarta bg-[#0E0C08] text-[#F5F2EB] min-h-screen">
      <main className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 space-y-10">

        <header className="space-y-4 border-b border-white/10 pb-10">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#E8A800] mb-2">
            Rechtliches
          </span>
          <h1 className="font-serif italic text-4xl md:text-5xl text-[#F5F2EB]">
            Allgemeine {String.fromCharCode(71, 101, 115, 99, 104, 228, 102, 116, 115, 98, 101, 100, 105, 110, 103, 117, 110, 103, 101, 110)}
          </h1>
          <p className="text-[#F5F2EB]/50 text-sm">
            Diese AGB wurden sorgfältig formuliert, ersetzen jedoch keine individuelle Rechtsberatung.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            1. Geltungsbereich
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Diese AGB gelten für alle Verträge zwischen `}
            <span className="text-[#F5F2EB] font-medium">Leon Seitz</span>
            {` (nachfolgend \u201EAnbieter\u201C) und seinen Auftraggebern über Dienstleistungen in den Bereichen Webentwicklung, Motion Design, Branding und Marketing. Abweichende Bedingungen des Auftraggebers haben keine Gültigkeit, sofern sie nicht schriftlich anerkannt wurden.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            2. Angebote & Vertragsschluss
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Vor Beginn der Zusammenarbeit erstellt der Anbieter ein schriftliches Gesamtangebot für das jeweilige Projekt. Dieses enthält den geplanten Leistungsumfang aller Phasen sowie den vereinbarten Stundensatz. Der Vertrag kommt ausschließlich durch schriftliche Annahme dieses Angebots durch den Auftraggeber zustande. Erst nach Vertragsschluss beginnt die Leistungserbringung. Mündliche Nebenabreden haben keine Gültigkeit. Änderungen bedürfen der Textform.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            3. Leistungsumfang
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Der konkrete Leistungsumfang ergibt sich ausschließlich aus dem schriftlichen Angebot. Änderungswünsche des Auftraggebers nach Vertragsschluss werden gesondert bewertet und können zu angepassten Fristen und Vergütungen führen.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            4. Projektphasen & Vergütung
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            <span className="text-[#F5F2EB] font-medium">Phase 0 {'\u2013'} Analyse:</span>
            {` Die Erstanalyse der digitalen Präsenz des Auftraggebers ist kostenfrei. Es entstehen keine vertraglichen Verpflichtungen.`}
          </p>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            <span className="text-[#F5F2EB] font-medium">Phase 1 {'\u2013'} Erste Umsetzungsphase:</span>
            {` Nach schriftlicher Annahme des Gesamtangebots beginnt der Anbieter mit der Leistungserbringung. Nach Abschluss von Phase 1 stellt der Anbieter eine Rechnung gemäß dem vereinbarten Stundensatz und dem tatsächlichen Aufwand. Die Rechnung ist innerhalb von 14 Tagen ab Rechnungsdatum ohne Abzug zu begleichen.`}
          </p>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            <span className="text-[#F5F2EB] font-medium">Phase 2 und folgende:</span>
            {` Jede weitere Phase beginnt erst nach vollständigem Zahlungseingang der vorangegangenen Rechnung. Nach Abschluss jeder Phase wird erneut eine Rechnung gestellt. Dieses Verfahren wiederholt sich bis zum Projektabschluss. Bei Zahlungsverzug sind gesetzliche Verzugszinsen nach \u00A7 288 BGB fällig. Der Anbieter ist berechtigt, die Leistungserbringung bis zum Ausgleich offener Forderungen auszusetzen.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            5. Abnahme
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Nach Abschluss jeder Phase legt der Anbieter die Ergebnisse zur Abnahme vor. Der Auftraggeber ist verpflichtet, die Abnahme innerhalb von 7 Werktagen schriftlich zu erklären oder konkrete Mängel schriftlich zu benennen. Verstreicht diese Frist ohne Rückmeldung, gilt die Leistung als abgenommen. Pauschale oder unbegründete Ablehnungen sind nicht wirksam. Der Anbieter ist berechtigt, festgestellte Mängel innerhalb einer angemessenen Frist nachzubessern.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            6. Mitwirkungspflichten
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Der Auftraggeber stellt alle erforderlichen Informationen, Zugänge, Materialien und Freigaben rechtzeitig bereit. Verzögerungen durch fehlende Mitwirkung verlängern vereinbarte Fristen entsprechend und begründen keinen Anspruch auf Minderung oder Schadensersatz gegenüber dem Anbieter.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            7. Nutzungsrechte
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Mit vollständiger Zahlung der jeweiligen Phase erhält der Auftraggeber ein einfaches, nicht übertragbares Nutzungsrecht an den in dieser Phase erstellten Arbeitsergebnissen. Vorlagen, Konzepte, Methoden und sonstiges Know-how des Anbieters verbleiben in dessen Eigentum. Eine Weitergabe an Dritte oder Unterlizenzierung bedarf der schriftlichen Zustimmung des Anbieters.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            8. Gewährleistung & Haftung
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden. Eine weitergehende Haftung ist ausgeschlossen.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            9. Vertraulichkeit & Referenzen
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Beide Parteien verpflichten sich, vertrauliche Informationen der jeweils anderen Partei nicht an Dritte weiterzugeben. Diese Pflicht besteht über das Vertragsende hinaus. Der Anbieter ist berechtigt, den Auftraggeber nach dessen ausdrücklicher Freigabe als Referenz zu nennen und Projektergebnisse im eigenen Portfolio zu veröffentlichen, sofern keine gesonderte Geheimhaltungsvereinbarung getroffen wurde.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            10. Laufzeit & Kündigung
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Verträge gelten für die individuell vereinbarte Projektlaufzeit. Das Recht beider Parteien zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt und bedarf der Textform. Bereits erbrachte und abgenommene Leistungen sind in jedem Fall zu vergüten.`}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            11. Schlussbestimmungen
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            {`Es gilt ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen unberührt. Die unwirksame Bestimmung ist durch eine wirtschaftlich möglichst nahestehende wirksame Regelung zu ersetzen.`}
          </p>
        </section>

        <p className="text-xs text-[#F5F2EB]/30 border-t border-white/10 pt-8">
          Stand: {new Date().toLocaleDateString('de-DE')}
        </p>

      </main>
    </div>
  );
}
