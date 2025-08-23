'use client';

import { useMemo } from 'react';
import {
  BadgeCheck, TrendingUp, Gauge, Users, Sparkles, CheckCircle2,
  ArrowRight, Clock, ClipboardCheck, Info, Layers, Workflow
} from 'lucide-react';

/**
 * ProofBlocks – text/icon only credibility component
 * variant: "branding" | "content" | "web" | "lead"
 */
export default function ProofBlocks({ variant = 'branding' }) {
  const cfg = useMemo(() => getConfig(variant), [variant]);

  return (
    <section className="px-5 md:px-16 py-10 md:py-14 text-white">
      {/* Head */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/90 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
          <BadgeCheck size={14} /> {cfg.badge}
        </span>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold">{cfg.title}</h2>
        <p className="mt-2 text-neutral-300 max-w-3xl">{cfg.sub}</p>
      </div>

      {/* KPI / Beispielfall */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {cfg.kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-indigo-300">
              <TrendingUp size={18} /> <span className="text-xs">Beispiel‑Kennzahl</span>
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight">{k.value}</div>
            <div className="mt-1 text-neutral-300">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Prozess */}
      <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-8">
        <div className="flex items-center gap-2 text-indigo-300">
          <Workflow size={18} /><span className="text-sm font-medium">Ablauf in 4 Schritten</span>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-5">
          {cfg.process.map((p, i) => (
            <div key={p.t} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="text-sm text-indigo-300">0{i + 1}</div>
              <h3 className="mt-1 font-semibold">{p.t}</h3>
              <p className="mt-2 text-neutral-300">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
          <Clock size={14} /> {cfg.duration}
        </div>
      </div>

      {/* Deliverables */}
      <div className="mt-10">
        <div className="flex items-center gap-2 text-indigo-300">
          <Layers size={18} /><span className="text-sm font-medium">Lieferumfang</span>
        </div>
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {cfg.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
              <span className="text-neutral-200">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Micro‑Case (text only) */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="text-xs text-rose-300 inline-flex items-center gap-2 bg-white/5 ring-1 ring-white/10 px-2.5 py-1 rounded-full">
            <Gauge size={14} /> Before (Ausgangslage)
          </div>
          <p className="mt-3 text-neutral-300">{cfg.before}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="text-xs text-emerald-300 inline-flex items-center gap-2 bg-white/5 ring-1 ring-white/10 px-2.5 py-1 rounded-full">
            <Sparkles size={14} /> After (Ergebnis – Beispiel)
          </div>
          <p className="mt-3 text-neutral-300">{cfg.after}</p>
        </div>
      </div>

      {/* CTA + FAQ kurz */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{cfg.cta.title}</h3>
            <p className="mt-1 text-neutral-300">{cfg.cta.sub}</p>
          </div>
          <a
            href="/request"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
          >
            Termin anfragen <ArrowRight size={16} />
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center gap-2 text-indigo-300"><Info size={18} /> FAQ</div>
          <ul className="mt-3 space-y-2 text-sm">
            {cfg.faq.map((f) => (
              <li key={f.q}>
                <p className="font-medium">{f.q}</p>
                <p className="text-neutral-300">{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- config per service ---------------- */

function getConfig(variant) {
  const base = {
    badge: 'Echte Substanz – keine Buzzwords',
    cta: {
      title: 'Passt das zu deiner Situation?',
      sub: 'Kurzer 30‑Minuten‑Call: Ziele, Ansatz, grober Fahrplan.',
    },
  };

  const MAP = {
    branding: {
      ...base,
      title: 'Beweis durch Struktur & Stringenz',
      sub: 'Statt „Showcase“: Wir belegen Wirkung über klare Architektur, konsistente Systeme und nachvollziehbare Entscheidungen.',
      kpis: [
        { label: 'Wiedererkennung (Beispielwert)', value: '+38%' },
        { label: 'Conversion‑Lift Landingpage (Beispiel)', value: '+22%' },
        { label: 'Content‑Produktion schneller', value: '‑30%' },
        { label: 'Brand‑Consistency (Auditscore)', value: '92/100' },
      ],
      process: [
        { t: 'Kickoff & Research', d: 'Ziele, Kontext, Audience, Differenzierung.' },
        { t: 'Positionierung & Core', d: 'Nutzen, Tonalität, Narrative, Claims.' },
        { t: 'System & Beispiele', d: 'Logo‑System, Farben, Typo, Komponenten, Use‑Cases.' },
        { t: 'Guides & Rollout', d: 'PDF + Figma‑Bibliothek, Rollout‑Plan, Sparring.' },
      ],
      duration: 'Typisch: 3–6 Wochen je nach Tiefe.',
      deliverables: [
        'Brand Core (Leitbild, Werte, Nutzenversprechen)',
        'Positionierung & Zielgruppen‑Segmente',
        'Naming, Claim & Tonalität',
        'Logo‑System (Primär/Secondary/Monogram)',
        'Farbwelt, Typografie, Komponenten',
        'Brand‑Guidelines (PDF + Figma‑Library)',
        'Anwendungs‑Beispiele (Web, Print, Ads)',
        'Rollout‑Plan & Begleitung',
      ],
      before: 'Uneinheitliche Wirkung über Touchpoints; lange Feedback‑Schleifen bei jedem Asset.',
      after: 'Konsistentes System + klare Claims → weniger Reibung, schnellere Produktion, höhere Wiedererkennung.',
      faq: [
        { q: 'Zeigt ihr fertige Logos?', a: 'Wir zeigen Systeme & Entscheidungen. Das beweist Reife und Skalierbarkeit besser als Einzelstücke.' },
        { q: 'Muss alles „neu“?', a: 'Nein. Wir arbeiten modular: behalten Gutes, schärfen den Rest.' },
      ],
    },

    content: {
      ...base,
      title: 'Content, der messbar performt',
      sub: 'Wir belegen Wirkung über KPIs, Struktur und skalierbare Produktion – nicht über „schöne“ Beispiele.',
      kpis: [
        { label: 'CTR Reels/Ads (Beispiel)', value: '+18%' },
        { label: 'Posting‑Konsistenz', value: '12/Woche' },
        { label: 'Produktion je Sprint', value: '30+ Assets' },
        { label: 'Zeit‑to‑Publish', value: '‑40%' },
      ],
      process: [
        { t: 'Ziele & Kanäle', d: 'Formate, Ton, Ressourcen, Ziele.' },
        { t: 'Frameworks', d: 'Hook, Story, CTA, Variationen.' },
        { t: 'Produktion', d: 'Batch‑Sprints, Qualitäts‑Checks, Plan.' },
        { t: 'Review & Learnings', d: 'KPIs, Iteration, Skalierung.' },
      ],
      duration: 'Sprints à 2 Wochen – laufend skalierbar.',
      deliverables: [
        'Redaktions‑ & Formatplan',
        'Hook/CTA‑Frameworks',
        'Text‑ & Skript‑Snippets',
        'Posting‑Templates (Figma/Canva)',
        'Batch‑Produktion (Posts/Reels/Ads)',
        'Kanal‑Setup & Automationen',
        'Reporting & Learnings',
      ],
      before: 'Unregelmäßige Posts, keine klare Linie, wenig Engagement.',
      after: 'Regelmäßige, zielgerichtete Formate mit klaren CTAs – bessere CTR & Anfragen.',
      faq: [
        { q: 'Übernehmt ihr alles?', a: 'Auf Wunsch Full‑Service, oft Hybrid: wir liefern Frameworks & Templates, ihr published intern.' },
        { q: 'Welche Tools?', a: 'Wir nutzen gängige Tools und richten uns nach euren Gegebenheiten.' },
      ],
    },

    web: {
      ...base,
      title: 'Webdesign mit Conversion‑Fokus',
      sub: 'Beweis durch Struktur, Geschwindigkeit und klare Nutzerführung – nicht durch fremde Mockups.',
      kpis: [
        { label: 'PageSpeed (Beispiel, mobile)', value: '90+' },
        { label: 'Bounce‑Rate (Beispiel)', value: '‑25%' },
        { label: 'Lead‑Conversion (Beispiel)', value: '+19%' },
        { label: 'Time‑to‑First‑Byte', value: '< 200ms' },
      ],
      process: [
        { t: 'Audit & Ziele', d: 'Content‑Inventar, IA, Conversion‑Map.' },
        { t: 'Wireframes', d: 'Struktur, Priorisierung, CTA‑Platzierung.' },
        { t: 'UI & Umsetzung', d: 'System, Komponenten, Dev.' },
        { t: 'Messung', d: 'Tracking, Tests, Iteration.' },
      ],
      duration: '2–6 Wochen je Umfang.',
      deliverables: [
        'IA & Wireframes (Low‑/Mid‑Fi, textbasiert)',
        'UI‑System (Farben, Typo, Komponenten)',
        'Performanter Build (Next.js/Tailwind)',
        'Formulare & Integrationen',
        'SEO‑Basics & Tracking',
        'Launch‑Checklist + Handover',
      ],
      before: 'Langsame Seite, unklare Struktur, CTAs unauffällig.',
      after: 'Schnelle, klare Seiten mit nachvollziehbarer Journey & messbarer Conversion.',
      faq: [
        { q: 'Zeigt ihr Referenzen?', a: 'Wir zeigen Struktur & Prinzipien. Auf Wunsch können wir Demos/Playgrounds bereitstellen.' },
        { q: 'CMS?', a: 'Headless oder klassisch – abhängig vom Team & Content‑Volumen.' },
      ],
    },

    lead: {
      ...base,
      title: 'Funnel & CRM – vom Klick zum Kund:in',
      sub: 'Messbare Lead‑Strecken, saubere Daten, klare Nurturing‑Flows.',
      kpis: [
        { label: 'Form‑Completion (Beispiel)', value: '+24%' },
        { label: 'Antwortzeit', value: '‑60%' },
        { label: 'Automatisierte Steps', value: '15+' },
        { label: 'CRM‑Datenqualität', value: 'A‑Score' },
      ],
      process: [
        { t: 'Journey‑Mapping', d: 'Touchpoints, Friction, Datenbedarf.' },
        { t: 'Funnel‑Setup', d: 'Formulare, Offers, Lead‑Scoring.' },
        { t: 'CRM & Automationen', d: 'Pipelines, Mails, Tasks, Webhooks.' },
        { t: 'Reporting', d: 'Dashboards, Learnings, Scale‑Plan.' },
      ],
      duration: 'Setup 1–3 Wochen, dann laufend.',
      deliverables: [
        'High‑Intent Formulare & Offers',
        'Thank‑You + Nurturing‑Sequenzen',
        'CRM‑Pipelines & Feldstruktur',
        'Integrationen (z. B. Make/Zapier)',
        'Lead‑Scoring & Routing',
        'Dashboards & Reports',
      ],
      before: 'Leads gehen verloren, keine Priorisierung, Follow‑ups manuell.',
      after: 'Transparenter Funnel, klare SLAs, automatisierte Folgeschritte – mehr Abschlüsse.',
      faq: [
        { q: 'Welches CRM?', a: 'Wir arbeiten tool‑agnostisch (z. B. HubSpot, Pipedrive, Notion + Automationen).' },
        { q: 'DSGVO?', a: 'Ja – sauberes Consent‑Handling & Datensparsamkeit sind Standard.' },
      ],
    },
  };

  return MAP[variant] ?? MAP.branding;
}
