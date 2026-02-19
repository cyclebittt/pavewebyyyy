'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Palette,
  Type,
  LayoutTemplate,
  ShieldCheck,
  Timer,
  Download,
  ExternalLink,
} from 'lucide-react';

const samples = [
  {
    title: 'KfA Brandbook 2026',
    subtitle: 'Brand-Fundament, Typo, Farben, Layoutsystem, Anwendung',
    poster: '/img/brandbooks/kfa-preview.jpg',
    pdf: '/brandbooks/kfa-brandbook-2026.pdf',
    tags: ['Brandbook', 'PDF', 'System'],
  },
  {
    title: 'Paveo Brandguidelines 2025',
    subtitle: 'Logo-Regeln, Farbwelt, Typo, Anwendung im Alltag',
    poster: '/img/brandbooks/mission-preview.jpg',
    pdf: '/brandbooks/mission-brandguidelines-2025.pdf',
    tags: ['Guidelines', 'PDF', 'Praktisch'],
  },
  // Optional: falls du später noch ein drittes Beispiel zeigen willst
  // {
  //   title: 'Paveo Sample Brandbook',
  //   subtitle: 'Kurzformat – ein kompaktes System als Beispiel',
  //   poster: '/img/brandbooks/paveo-preview.jpg',
  //   pdf: '/brandbooks/paveo-brandbook-sample.pdf',
  //   tags: ['Sample', 'PDF'],
  // },
];

export default function BrandbookPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative px-5 md:px-16 pt-16 md:pt-20 pb-10 md:pb-12">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-indigo-200/80 hover:text-indigo-100"
            >
              <ArrowLeft size={16} /> Zurück zum Portfolio
            </Link>

            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
                  <Sparkles size={16} /> Brandbook · Brand Guidelines
                </span>

                <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                  Marken, die konsistent bleiben
                  <span className="block text-indigo-300">auch wenn du nicht daneben stehst.</span>
                </h1>

                <p className="mt-4 text-neutral-300 leading-relaxed max-w-xl">
                  Ein Brandbook ist kein „Design-PDF“, sondern ein nutzbares System: Regeln, Beispiele und ein Setup,
                  das Teams im Alltag wirklich anwenden können.
                </p>

                <div className="mt-7 flex flex-col items-start gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold text-sm md:text-base"
                  >
                    Brandbook anfragen <ArrowRight size={18} />
                  </Link>

                  <p className="text-sm md:text-base text-neutral-400 max-w-xl">
                    Schick mir kurz: Ziel (Rebrand/Neu), Kanäle (Web/Social/Print) und vorhandenes Material. Dann sage
                    ich dir, was sinnvoll ist und wie wir starten.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill icon={<Timer size={14} />}>Schneller Start</Pill>
                  <Pill icon={<ShieldCheck size={14} />}>Nutzbar im Alltag</Pill>
                  <Pill icon={<FileText size={14} />}>PDF + Assets</Pill>
                </div>
              </div>

              <div className="w-full lg:max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
                <div className="text-xs uppercase tracking-wide text-neutral-400">Was du am Ende bekommst</div>
                <ul className="mt-3 space-y-2 text-sm md:text-base text-neutral-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Brandbook als PDF (klar strukturiert, scanbar)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Logo-Dateien + Regeln (Do/Don’t, Abstände, Varianten)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Farben, Typo, Layoutsystem + echte Beispiele</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Optional: Social-Templates / Key Visuals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* META */}
      <section className="px-5 md:px-16 pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <MetaCard label="Format" value="PDF + Assets" icon={<FileText size={16} />} />
          <MetaCard label="Inhalt" value="Regeln + Beispiele" icon={<LayoutTemplate size={16} />} />
          <MetaCard label="Design" value="Typo + Farben" icon={<Palette size={16} />} />
          <MetaCard label="Ton" value="Kurz, eindeutig" icon={<Type size={16} />} />
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="px-5 md:px-16 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Was im Brandbook drin ist</h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Nicht „alles was geht“, sondern das, was Konsistenz in Web, Social und Print wirklich absichert.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <MiniCard
              icon={<ShieldCheck size={18} />}
              title="Logo-System"
              bullets={['Varianten + Einsatz', 'Schutzzonen & Größen', 'Do/Don’t Beispiele']}
            />
            <MiniCard
              icon={<Type size={18} />}
              title="Typografie"
              bullets={['Schriften + Hierarchie', 'Größen & Abstände', 'Beispiele (Web/Social)']}
            />
            <MiniCard
              icon={<Palette size={18} />}
              title="Farb- & Layoutsystem"
              bullets={['Primär/Sekundärfarben', 'Kontraste/Anwendung', 'Grid, Komponenten, Key Visuals']}
            />
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="px-5 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Beispiele</h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
              Preview als Bild, das komplette Brandbook als PDF. PDF wird erst beim Klick geladen.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {samples.map((s) => (
              <BrandbookSample key={s.pdf} sample={s} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Wenn du Konsistenz willst, ohne Reibung</h3>
            <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
              Ich baue dir ein Brand-System, das du als Team sofort nutzen kannst – inklusive Beispielen, Regeln und
              sauberer Übergabe der Assets.
            </p>

            <div className="mt-6 flex justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold inline-flex items-center gap-2"
              >
                Brandbook anfragen <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-3">
              <Link href="/portfolio" className="text-sm md:text-base text-neutral-300 hover:text-white transition-colors">
                Zurück zum Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Pill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm text-white/80">
      <span className="text-emerald-400">{icon}</span>
      {children}
    </span>
  );
}

function MetaCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs uppercase tracking-wide text-neutral-400 flex items-center gap-1.5">
        {icon && <span className="text-indigo-300">{icon}</span>}
        {label}
      </div>
      <div className="mt-1 text-sm md:text-base text-neutral-100">{value}</div>
    </div>
  );
}

function MiniCard({ icon, title, bullets }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
          {icon}
        </div>
        <h3 className="text-sm md:text-base font-semibold">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm text-neutral-200">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandbookSample({ sample }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04]">
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Preview */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] bg-black/20">
          <Image
            src={sample.poster}
            alt={sample.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 520px"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-sm md:text-base font-semibold text-white/95">{sample.title}</div>
            <div className="mt-1 text-xs md:text-sm text-white/70">{sample.subtitle}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sample.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions + lazy PDF */}
        <div className="p-5 md:p-6 border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="text-sm md:text-base font-semibold">Darstellung</div>
          <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
            Preview als Bild (schnell), komplettes Dokument als PDF (vollständig). Das PDF wird erst geladen, wenn du es
            öffnest.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={sample.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-sm font-semibold text-neutral-100"
            >
              <ExternalLink size={16} /> PDF öffnen
            </a>
            <a
              href={sample.pdf}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-sm font-semibold text-neutral-100"
            >
              <Download size={16} /> PDF herunterladen
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors text-sm font-semibold"
            >
              <FileText size={16} /> {open ? 'PDF ausblenden' : 'PDF einblenden'}
            </button>
          </div>

          {open && (
            <div className="mt-5 rounded-2xl overflow-hidden border border-white/10 bg-black/30">
              <div className="relative w-full h-[420px] md:h-[520px]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${sample.pdf}#view=FitH`}
                  title={`${sample.title} – PDF`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
