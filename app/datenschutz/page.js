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
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO.
          </p>
        </header>

        {/* 1. Datenschutz auf einen Blick */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            1. Datenschutz auf einen Blick
          </h2>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Allgemeine Hinweise</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
              Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen
              Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz
              entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#F5F2EB] font-medium">Datenerfassung auf dieser Website</h3>
            <div className="space-y-2">
              <p className="text-[#F5F2EB]/50 text-sm font-medium">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
              <p className="text-[#F5F2EB]/70 leading-relaxed">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                können Sie dem Abschnitt &bdquo;Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[#F5F2EB]/50 text-sm font-medium">Wie erfassen wir Ihre Daten?</p>
              <p className="text-[#F5F2EB]/70 leading-relaxed">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
                z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="text-[#F5F2EB]/70 leading-relaxed">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch
                unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser,
                Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
                sobald Sie diese Website betreten.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[#F5F2EB]/50 text-sm font-medium">Wofür nutzen wir Ihre Daten?</p>
              <p className="text-[#F5F2EB]/70 leading-relaxed">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website
                Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für
                Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[#F5F2EB]/50 text-sm font-medium">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
              <p className="text-[#F5F2EB]/70 leading-relaxed">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
                oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
                haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das
                Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen
                Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen
                Aufsichtsbehörde zu.
              </p>
              <p className="text-[#F5F2EB]/70 leading-relaxed">
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Analyse-Tools und Tools von Drittanbietern</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht
              vor allem mit sogenannten Analyseprogrammen.
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.
            </p>
          </div>
        </section>

        {/* 2. Hosting */}
        <section className="space-y-4 border-t border-white/10 pt-10">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            2. Hosting
          </h2>
          <p className="text-[#F5F2EB]/70 leading-relaxed">
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
          </p>
          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Strato</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Anbieter ist die Strato AG, Otto-Ostrowski-Straße 7, 10249 Berlin (nachfolgend &bdquo;Strato"). Wenn Sie
              unsere Website besuchen, erfasst Strato verschiedene Logfiles inklusive Ihrer IP-Adressen.
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Weitere Informationen entnehmen Sie der Datenschutzerklärung von Strato:{' '}
              <a href="https://www.strato.de/datenschutz/" target="_blank" rel="noopener noreferrer"
                className="text-[#E8A800] hover:underline">
                https://www.strato.de/datenschutz/
              </a>.
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Die Verwendung von Strato erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
              berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine
              entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage
              von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von
              Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im
              Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
            </p>
            <div className="space-y-2">
              <p className="text-[#F5F2EB]/50 text-sm font-medium">Auftragsverarbeitung</p>
              <p className="text-[#F5F2EB]/70 leading-relaxed">
                Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes
                geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der
                gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren
                Weisungen und unter Einhaltung der DSGVO verarbeitet.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Allgemeine Hinweise */}
        <section className="space-y-6 border-t border-white/10 pt-10">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            3. Allgemeine Hinweise und Pflichtinformationen
          </h2>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Datenschutz</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
              Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
              Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die
              vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.
              Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per
              E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
              Dritte ist nicht möglich.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Hinweis zur verantwortlichen Stelle</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              <span className="text-[#F5F2EB] font-medium">Leon Seitz</span><br />
              Am Streitberg 28<br />
              63906 Erlenbach am Main<br /><br />
              Telefon: +49 160 9575 7167<br />
              E-Mail: hello@leonseitz.com
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit
              anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen,
              E-Mail-Adressen o. Ä.) entscheidet.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Speicherdauer</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
              verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
              Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur
              Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich
              zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder
              handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall
              dieser Gründe.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">
              Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website
            </h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen
              Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern
              besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer
              ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt
              die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die
              Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via
              Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage
              von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
              Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir
              Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten,
              sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von
              Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten
              Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen
              Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Empfänger von personenbezogenen Daten</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen.
              Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen
              erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im
              Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind
              (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6
              Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die
              Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten
              unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im
              Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
              eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
              erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">
              Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)
            </h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed text-sm">
              WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT,
              HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN,
              GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH
              FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN
              EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH
              EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI
              DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE
              INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG,
              AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed text-sm">
              WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE
              DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER
              DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES
              MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE
              PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET
              (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
              Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
              Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht
              unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Recht auf Datenübertragbarkeit</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
              Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
              maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an
              einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Auskunft, Berichtigung und Löschung</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
              unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung
              dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich
              jederzeit an uns wenden.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Recht auf Einschränkung der Verarbeitung</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
              verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der
              Verarbeitung besteht in folgenden Fällen:
            </p>
            <ul className="text-[#F5F2EB]/70 leading-relaxed space-y-2 list-disc list-inside">
              <li>
                Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
                benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das
                Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
              <li>
                Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können
                Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
              </li>
              <li>
                Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung,
                Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt
                der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
              <li>
                Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung
                zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen
                Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen.
              </li>
            </ul>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten
              – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung
              oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder
              juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen
              Union oder eines Mitgliedstaats verarbeitet werden.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">SSL- bzw. TLS-Verschlüsselung</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte,
              wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine
              SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
              Adresszeile des Browsers von &bdquo;http://" auf &bdquo;https://" wechselt und an dem Schloss-Symbol in
              Ihrer Browserzeile.
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns
              übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </div>
        </section>

        {/* 4. Datenerfassung */}
        <section className="space-y-4 border-t border-white/10 pt-10">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            4. Datenerfassung auf dieser Website
          </h2>
          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Anfrage per E-Mail, Telefon oder Telefax</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller
              daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres
              Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung
              weiter.
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
              Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem
              berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6
              Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese
              abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur
              Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
              Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende
              gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </div>
        </section>

        {/* 5. Plugins und Tools */}
        <section className="space-y-4 border-t border-white/10 pt-10">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#E8A800]">
            5. Plugins und Tools
          </h2>
          <div className="space-y-3">
            <h3 className="text-[#F5F2EB] font-medium">Google Fonts (lokales Hosting)</h3>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die
              von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu
              Servern von Google findet dabei nicht statt.
            </p>
            <p className="text-[#F5F2EB]/70 leading-relaxed">
              Weitere Informationen zu Google Fonts finden Sie unter{' '}
              <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer"
                className="text-[#E8A800] hover:underline">
                https://developers.google.com/fonts/faq
              </a>{' '}
              und in der Datenschutzerklärung von Google:{' '}
              <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer"
                className="text-[#E8A800] hover:underline">
                https://policies.google.com/privacy?hl=de
              </a>.
            </p>
          </div>
        </section>

        <p className="text-xs text-[#F5F2EB]/30 border-t border-white/10 pt-8">
          Quelle:{' '}
          <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer"
            className="hover:text-[#F5F2EB]/50">
            e-recht24.de
          </a>
        </p>

      </main>
    </div>
  );
}
