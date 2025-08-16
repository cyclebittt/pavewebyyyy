import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DatenschutzPage() {
  return (
    <div className="font-proxima bg-gradient-to-br from-[#0B0B0F] via-[#0E0E15] to-black text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20 space-y-10">
        <header className="space-y-4">
          <span className="inline-block text-sm text-indigo-300/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Rechtliches</span>
          <h1 className="text-3xl md:text-5xl font-bold">Datenschutzerklärung</h1>
          <p className="text-neutral-300">
            Diese Datenschutzerklärung informiert dich über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten
            (nachfolgend „Daten“) innerhalb unseres Onlineangebotes. Die Texte sind unverbindliche Muster und sollten rechtlich geprüft werden.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Verantwortlicher</h2>
          <p className="text-neutral-300">
            Paveo, Am Streitberg 28, 63906 Erlenbach am Main, Deutschland<br />
            E-Mail: info@paveconsultings.com, Tel.: +49 160 95757167
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Verarbeitete Daten / Zwecke</h2>
          <p className="text-neutral-300">
            Wir verarbeiten Bestands- und Kontaktdaten (z. B. Name, E-Mail), Inhaltsdaten (z. B. Nachrichten), Nutzungsdaten
            (z. B. besuchte Seiten, Zugriffszeiten) sowie Meta-/Kommunikationsdaten (z. B. IP-Adresse).
            Zwecke: Bereitstellung des Onlineangebots, Kommunikation, Terminvereinbarung, Sicherheit, Reichweitenmessung.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Rechtsgrundlagen</h2>
          <p className="text-neutral-300">
            Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), lit. b (Vertrag/Anbahnung), lit. f (berechtigte Interessen – z. B. sichere
            und wirtschaftliche Bereitstellung des Angebots).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Hosting & Zugriffsdaten</h2>
          <p className="text-neutral-300">
            Unser Hoster verarbeitet Zugriffsdaten (Server-Logfiles) zur Stabilität und Sicherheit des Betriebs (berechtigtes Interesse).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Cookies & Reichweitenmessung</h2>
          <p className="text-neutral-300">
            Wir verwenden technisch notwendige Cookies. Optionale Cookies (z. B. für Statistik/Marketing) setzen wir nur mit Einwilligung.
            Du kannst deine Einwilligung jederzeit über die Browser-Einstellungen oder ein Consent-Tool widerrufen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Kontakt & Formulare (z. B. E-Mail, Formular)</h2>
          <p className="text-neutral-300">
            Bei einer Kontaktaufnahme verarbeiten wir die Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b/f DSGVO).
            Die Daten werden gelöscht, sobald sie für den Zweck nicht mehr erforderlich sind und keine gesetzlichen Pflichten entgegenstehen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Terminvereinbarung (Calendly)</h2>
          <p className="text-neutral-300">
            Für Buchungen nutzen wir „Calendly“. Anbieter ist Calendly LLC (USA). Dabei werden – je nach Nutzung –
            Kontaktdaten, Terminwünsche und Meta-Daten verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b/f DSGVO.
            Mit Calendly besteht ein Auftragsverarbeitungsvertrag; ggf. findet ein Datentransfer in Drittländer statt
            unter Verwendung von Standardvertragsklauseln.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Deine Rechte</h2>
          <ul className="list-disc pl-5 text-neutral-300 space-y-1">
            <li>Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
            <li>Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen</li>
            <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft</li>
            <li>Beschwerde bei einer Aufsichtsbehörde</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Speicherdauer</h2>
          <p className="text-neutral-300">
            Personenbezogene Daten werden gelöscht, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Externe Links</h2>
          <p className="text-neutral-300">
            Für Inhalte externer Websites übernehmen wir keine Verantwortung. Es gelten die Datenschutzerklärungen der jeweiligen Anbieter.
          </p>
        </section>

        <p className="text-xs text-neutral-500">Stand: {new Date().toLocaleDateString('de-DE')}</p>
      </main>

      <Footer />
    </div>
  );
}
