'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Globe2,
  Clock,
  LayoutTemplate,
  CreditCard,
  FileText,
  Video,
  CheckCircle2,
} from 'lucide-react';

export default function KircheFundraisingPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-16 pt-16 md:pt-20 pb-10 md:pb-14">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-indigo-200/80 hover:text-indigo-100"
          >
            <ArrowLeft size={16} /> Zurück zum Portfolio
          </Link>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-8 items-start">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Case Study · Kirche für Aschaffenburg
              </span>

              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
                <span className="block">Fundraising-Seite,</span>
                <span className="block text-indigo-300">klar aufgebaut und schnell live.</span>
              </h1>

              <p className="mt-4 text-neutral-300 text-sm md:text-base max-w-xl leading-relaxed">
                Ziel war eine Seite, die ohne Erklärung funktioniert: Anliegen verstehen, Vertrauen bekommen,
                Spendenweg wählen. Dazu DE/EN Inhalte, Flyer und ein Projektvideo.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs md:text-sm">
                <Badge>Landingpage</Badge>
                <Badge>DE &amp; EN</Badge>
                <Badge>PayPal &amp; Überweisung</Badge>
                <Badge>QR-Codes</Badge>
                <Badge>Flyer</Badge>
                <Badge>Video</Badge>
              </div>

              {/* CTA: one loud, one quiet */}
              <div className="mt-7 flex flex-col items-start gap-3">
                <a
                  href="https://kircheab.de/spenden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold text-sm md:text-base"
                >
                  Zur Spenden-Seite <ArrowRight size={18} />
                </a>

                <Link href="/contact" className="text-sm md:text-base text-neutral-300 hover:text-white transition-colors">
                  Ähnliches Projekt anfragen <span className="text-neutral-500">(Ziel, Deadline, Stand)</span>
                </Link>
              </div>
            </div>

            {/* Right: Video + Proof */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-3 md:p-4">
              <div className="flex items-center justify-between gap-3 px-2 pb-3">
                <div className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-200">
                  <Video size={16} className="text-indigo-300" />
                  Projektvideo
                </div>
                <div className="inline-flex items-center gap-2 text-xs text-neutral-400">
                  <Globe2 size={14} className="text-emerald-400" />
                  DE &amp; EN
                </div>
              </div>

              <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/svgNO7ErcKg"
                  title="Kirche für Aschaffenburg – Fundraising Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Proof number as scan-stopper */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                <div className="text-xs uppercase tracking-wide text-neutral-400">Spenden in 2 Monaten</div>
                <div className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight text-indigo-200">17.000 €</div>
                <p className="mt-2 text-sm md:text-base text-neutral-300 leading-relaxed">
                  Wir sind sehr dankbar. Aus unserer Sicht wäre das ohne Gott nicht möglich gewesen.
                </p>
              </div>

              <div className="mt-3 px-2">
                <a
                  href="https://kircheab.de/spenden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-semibold text-sm"
                >
                  Landingpage ansehen <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* META */}
      <section className="px-5 md:px-16 pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <MetaCard label="Ziel" value="Spenden sammeln" />
          <MetaCard label="Zeitraum" value="~ 2 Wochen bis live" icon={<Clock size={16} />} />
          <MetaCard label="Rolle" value="Konzept · Design · Umsetzung" />
          <MetaCard label="Setup" value="DE/EN · Payments · QR" />
        </div>
      </section>

      {/* WHAT I DID */}
      <section className="px-5 md:px-16 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Was geliefert wurde</h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Fokus war weniger „schön“, sondern „verständlich und einfach zu nutzen“: klare Story, klare Spendenwege,
            sauberer Ablauf.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <MiniCard
              icon={<LayoutTemplate size={18} />}
              title="Landingpage"
              bullets={['Story und Struktur', 'Mobile-first Umsetzung', 'Vertrauen und klare CTAs']}
            />
            <MiniCard
              icon={<CreditCard size={18} />}
              title="Spendenwege"
              bullets={['PayPal und Überweisung', 'QR-Codes und kurze Links', 'so wenig Reibung wie möglich']}
            />
            <MiniCard
              icon={<FileText size={18} />}
              title="Content und Medien"
              bullets={['Texte in DE und EN', '4 Flyer für Verteilung', 'Projektvideo für Reichweite']}
            />
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="px-5 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-9">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Wirkung</h3>
              <p className="mt-2 text-sm md:text-base text-neutral-300 max-w-2xl leading-relaxed">
                Die Seite wurde so gebaut, dass Menschen schnell verstehen, worum es geht, und ohne Hürden spenden können.
              </p>
            </div>

            <Link href="/contact" className="text-sm md:text-base text-neutral-300 hover:text-white transition-colors md:text-right">
              Ähnliches Projekt anfragen <span className="text-neutral-500">(3 Infos reichen)</span>
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <ImpactItem text="Anliegen in wenigen Sekunden verständlich durch Story und klare Struktur." />
            <ImpactItem text="Spendenweg direkt: PayPal oder Überweisung, ergänzt durch QR-Codes." />
            <ImpactItem text="Einheitliche Assets (Flyer und Video), damit überall auf dasselbe Ziel verlinkt wird." />
          </div>

          <div className="mt-6 flex flex-col items-start gap-3">
            <a
              href="https://kircheab.de/spenden"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold text-sm md:text-base"
            >
              Zur Spenden-Seite <ArrowRight size={18} />
            </a>
            <Link href="/portfolio" className="text-sm md:text-base text-neutral-300 hover:text-white transition-colors">
              Mehr Projekte ansehen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* Helpers */

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs md:text-[13px] text-indigo-200 border border-white/10">
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

function ImpactItem({ text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm md:text-base text-neutral-200">
      {text}
    </div>
  );
}


