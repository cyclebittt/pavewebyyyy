'use client';

import { useMemo } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

/** Kleiner CSS-Gauge ohne Libs */
function Gauge({ value = 72, label = 'Audit-Score', sub = '+28% seit Start' }) {
  const angle = useMemo(() => Math.max(0, Math.min(100, value)) * 3.6, [value]);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="text-sm text-neutral-300">{label}</div>
      <div className="mt-4 grid grid-cols-[140px_1fr] items-center gap-5">
        <div
          className="relative h-36 w-36 rounded-full"
          style={{
            background: `conic-gradient(#8b5cf6 ${angle}deg, rgba(255,255,255,0.08) 0deg)`,
          }}
        >
          <div className="absolute inset-3 rounded-full bg-[#0B0B0F] grid place-items-center">
            <div className="text-2xl font-extrabold text-indigo-300">{value}%</div>
          </div>
        </div>
        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-400" size={18} /> Technisches SEO & Performance
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-400" size={18} /> UX Heuristics & Conversion-Pfade
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-400" size={18} /> Content-Relevanz & Klarheit
          </li>
          <li className="mt-2 text-indigo-300">{sub}</li>
        </ul>
      </div>
    </div>
  );
}

/** Wireframe-Vorschau (nur CSS-Blocks) */
function Wireframe() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="text-sm text-neutral-300">Prototype / Wireframe (Ausschnitt)</div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="h-6 w-40 rounded bg-white/10" />
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="h-24 rounded bg-white/10" />
          <div className="h-24 rounded bg-white/10" />
          <div className="h-24 rounded bg-white/10" />
        </div>
        <div className="mt-4 h-3 w-full rounded bg-white/10" />
        <div className="mt-2 h-3 w-5/6 rounded bg-white/10" />
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        Struktur, Priorisierung, Messaging – schnell validierbar, bevor Design & Build reingehen.
      </p>
    </div>
  );
}

/** Mini-Fallstudie & Copy-Vergleich (Text-only, kein Upload) */
function MiniCase() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="text-sm text-neutral-300">Mini-Fallstudie (vereinfacht)</div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10">
          <div className="text-neutral-400">Ausgangslage</div>
          <p className="mt-2 text-neutral-200">
            Unklare Botschaften, wenig Leads, schwache Conversion von Social → Website.
          </p>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10">
          <div className="text-neutral-400">Ansatz</div>
          <p className="mt-2 text-neutral-200">
            Neue Value Proposition, Funnel (Ads → Landing), Lead-Form + CRM, klare CTAs & Proof.
          </p>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10">
          <div className="text-neutral-400">Ergebnis</div>
          <p className="mt-2 text-neutral-200">+31% Conversion, mehr qualifizierte Anfragen in 6 Wochen.</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10">
          <div className="text-xs uppercase tracking-wide text-neutral-400">Vorher (Hero Copy)</div>
          <p className="mt-2 text-neutral-400">
            „Wir sind ein modernes Unternehmen und bieten vielfältige Leistungen.“
          </p>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10">
          <div className="text-xs uppercase tracking-wide text-neutral-400">Nachher (Hero Copy)</div>
          <p className="mt-2 text-neutral-200">
            „Mehr Neukunden in 6 Wochen. Wir strukturieren Branding, Website & Content zu einem messbaren Funnel.“
          </p>
          <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-violet-600 px-3 py-1.5 text-sm font-semibold hover:bg-violet-500">
            So arbeiten wir <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProofBlocks() {
  return (
    <section className="px-5 md:px-16 py-10 md:py-14">
      <h3 className="text-2xl md:text-3xl font-semibold">Wie wir Wirkung beweisen – ohne Worte</h3>
      <p className="mt-2 text-neutral-300 max-w-3xl">
        Kein Stock-Material, keine langen PDFs – lieber klare Artefakte: Mini-Case, Wireframes und Audit‑Scores,
        die zeigen, wie wir denken und liefern.
      </p>

      <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <MiniCase />
        <Wireframe />
        <Gauge value={72} label="Audit-Score (SEO/UX)" sub="+28% nach Quick-Fixes" />
      </div>
    </section>
  );
}
