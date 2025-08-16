import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AGBPage() {
  return (
    <div className="font-proxima bg-gradient-to-br from-[#0B0B0F] via-[#0E0E15] to-black text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20 space-y-10">
        <header className="space-y-4">
          <span className="inline-block text-sm text-indigo-300/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Rechtliches</span>
          <h1 className="text-3xl md:text-5xl font-bold">Allgemeine Geschäftsbedingungen (AGB)</h1>
          <p className="text-neutral-300">
            Hinweis: Diese AGB sind ein unverbindlicher Mustertext und stellen <strong>keine Rechtsberatung</strong> dar.
            Bitte lasse die Inhalte von einer Rechtsberatung prüfen und an dein Unternehmen anpassen.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Geltungsbereich</h2>
          <p className="text-neutral-300">
            Diese AGB gelten für alle Verträge zwischen <strong>Paveo</strong> (nachfolgend „Anbieter“) und seinen Kund:innen
            über Dienstleistungen in den Bereichen Branding, Webdesign, Content, Social Media und Leadgenerierung.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Angebote & Vertragsschluss</h2>
          <p className="text-neutral-300">
            Angebote des Anbieters sind freibleibend. Ein Vertrag kommt erst durch schriftliche Bestätigung oder
            durch Leistungsbeginn zustande. Änderungen und Ergänzungen bedürfen der Textform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Leistungsumfang</h2>
          <p className="text-neutral-300">
            Der Leistungsumfang ergibt sich aus dem individuellen Angebot bzw. Leistungs-/Paketbeschreibungen.
            Änderungswünsche nach Beauftragung können zu Zeit- und Preis­anpassungen führen.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Mitwirkungspflichten</h2>
          <p className="text-neutral-300">
            Auftraggebende stellen alle für die Leistungserbringung erforderlichen Informationen, Materialien und
            Freigaben fristgerecht bereit. Verzögerungen aufgrund fehlender Mitwirkung verlängern Fristen entsprechend.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Vergütung & Zahlung</h2>
          <p className="text-neutral-300">
            Sofern nicht anders vereinbart, gelten die im Angebot genannten Preise. Zahlungen sind innerhalb von
            14 Tagen ab Rechnungsdatum ohne Abzug fällig. Bei Verzug können gesetzliche Verzugszinsen berechnet werden.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Nutzungsrechte</h2>
          <p className="text-neutral-300">
            Nutzungsrechte an Arbeitsergebnissen gehen – soweit vereinbart – erst nach vollständiger Zahlung über.
            Vorlagen, Methoden und Know-how verbleiben beim Anbieter. Eine Weitergabe an Dritte bedarf der Zustimmung.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Gewährleistung & Haftung</h2>
          <p className="text-neutral-300">
            Der Anbieter haftet nur für Vorsatz und grobe Fahrlässigkeit; bei leichter Fahrlässigkeit nur bei Verletzung
            wesentlicher Vertragspflichten (Kardinalpflichten) und begrenzt auf den vertragstypischen, vorhersehbaren Schaden.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Vertraulichkeit & Referenzen</h2>
          <p className="text-neutral-300">
            Beide Parteien behandeln vertrauliche Informationen streng vertraulich. Der Anbieter darf den/die Auftraggeber:in
            nach Freigabe als Referenz nennen und Ergebnisse in Portfolios zeigen, sofern keine Geheimhaltung vereinbart ist.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Laufzeit & Kündigung</h2>
          <p className="text-neutral-300">
            Verträge gelten für die vereinbarte Laufzeit. Ein außerordentliches Kündigungsrecht bleibt unberührt.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Schlussbestimmungen</h2>
          <p className="text-neutral-300">
            Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand – soweit zulässig – ist der Sitz des Anbieters.
            Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen unberührt.
          </p>
        </section>

        <p className="text-xs text-neutral-500">Stand: {new Date().toLocaleDateString('de-DE')}</p>
      </main>

      <Footer />
    </div>
  );
}
