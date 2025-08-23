'use client';

import { TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export default function CaseSnippet({
  title = 'Beispiel: Lokalstudio → planbare Anfragen',
  headline = 'Von 0–1: Erstes Funnel-Setup, Content-Kadenz, einfache Website-Struktur.',
  bullets = [
    'Content-Kadenz (3×/Woche) mit Hook-Vorlagen',
    '1‑Page Landing inkl. klarer CTA & Formular',
    'Einfaches CRM-Board + Follow‑up‑Mails',
  ],
  kpis = [
    { icon: <TrendingUp size={18} />, label: 'Leads/Monat', value: '22 → 61' },
    { icon: <Clock size={18} />, label: 'Sales-Zyklus', value: '−34%' },
    { icon: <CheckCircle2 size={18} />, label: 'Termin-Showrate', value: '89%' },
  ],
}) {
  return (
    <section className="mt-10">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 md:p-8">
        <div className="flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 w-fit text-xs text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            Beispiel (ohne Kundendaten)
          </span>

          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          <p className="text-neutral-300">{headline}</p>

          {/* KPIs */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4 flex items-center gap-3"
              >
                <span className="text-indigo-300">{k.icon}</span>
                <div>
                  <div className="text-sm text-neutral-300">{k.label}</div>
                  <div className="text-lg font-semibold">{k.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Maßnahmen */}
          <div className="mt-5">
            <p className="text-sm text-neutral-400 mb-2">Maßnahmen (Auszug)</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-neutral-200">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 text-xs text-neutral-400">
            Hinweis: Zahlen sind reale Größenordnungen aus ähnlichen Setups, ohne Rückschluss auf einzelne Kunden.
          </p>
        </div>
      </div>
    </section>
  );
}
