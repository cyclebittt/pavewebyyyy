// components/services/ProofBlocks.jsx
export default function ProofBlocks({ items = [] }) {
  return (
    <section className="px-5 md:px-16 py-10 md:py-14">
      <h3 className="text-2xl md:text-3xl font-semibold mb-6">Warum wir? – Beweise in Zahlen</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map(({ label, value, desc }, i) => (
          <div
            key={label}
            data-aos="fade-up"
            data-aos-delay={i * 80}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="text-4xl font-extrabold text-indigo-300">{value}</div>
            <div className="mt-1 text-neutral-200">{label}</div>
            {desc && <p className="mt-3 text-neutral-400 text-sm">{desc}</p>}
          </div>
        ))}
      </div>

      <div
        className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6"
        data-aos="fade-up"
        data-aos-delay="260"
      >
        <h4 className="text-xl font-semibold">Beispiel‑Ablauf (ohne echte Kundendaten)</h4>
        <ul className="mt-3 space-y-2 text-neutral-300 text-sm">
          <li>• Ausgangslage kurz skizziert (z. B. „wenig Sichtbarkeit, kein Funnel“)</li>
          <li>• Maßnahmen (Module) stichpunktartig</li>
          <li>• Vorher/Nachher in Zahlen (z. B. +27 % Conversion, +120 % Leads)</li>
          <li>• Lernpunkte & nächste Ausbaustufe</li>
        </ul>
      </div>
    </section>
  );
}
