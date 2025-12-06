'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Globe2,
  FileText,
  Video,
  Clock,
  LayoutTemplate,
} from 'lucide-react';

export default function KircheFundraisingPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-16 pt-20 md:pt-24 pb-12 md:pb-16">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-indigo-200/80 hover:text-indigo-100"
          >
            <ArrowLeft size={16} /> Zurück zum Portfolio
          </Link>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
                <Sparkles size={16} /> Fundraising-Projekt · Kirche für Aschaffenburg
              </span>

              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
                Ein digitales Zuhause für eine Spendenreise.
              </h1>

              <p className="mt-4 text-neutral-300 text-sm md:text-base max-w-xl">
                Um den Bau eines neuen Kirchenzuhause zu ermöglichen, habe ich für die Kirche für Aschaffenburg
                eine komplette Fundraising-Präsenz aufgebaut – inklusive Landingpage, Texten, Design, Zahlungswegen,
                Formularen, Flyern und Video. In nur zwei Wochen, rechtzeitig vor der Spendenreise in die USA.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
                <Badge>Landingpage</Badge>
                <Badge>Story &amp; Texte</Badge>
                <Badge>Formulare</Badge>
                <Badge>PayPal &amp; Überweisung</Badge>
                <Badge>Flyer (Print &amp; digital)</Badge>
                <Badge>Video</Badge>
                <Badge>DE &amp; EN</Badge>
              </div>
            </div>

            {/* Hero Screenshot */}
            <div className="relative w-full h-56 md:h-72 lg:h-80 rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              {/* TODO: Ersetze den Pfad durch einen echten Screenshot */}
              <Image
                src="/img/portfolio/kirche-hero.jpg"
                alt="Fundraising-Landingpage Kirche für Aschaffenburg"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs md:text-sm">
                <div className="flex items-center gap-2 text-neutral-100">
                  <Globe2 size={16} />
                  <span>DE &amp; EN Landingpage</span>
                </div>
                <Link
                  href="https://kircheab.de/spenden"
                  target="_blank"
                  className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full"
                >
                  Live ansehen <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* META / ÜBERSICHT */}
      <section className="px-5 md:px-16 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <MetaCard label="Ziel" value="Spenden für ein neues Kirchenzuhause" />
          <MetaCard label="Rolle" value="Konzept, Texte, Design, Umsetzung, Video, Flyer" />
          <MetaCard label="Zeitraum" value="ca. 2 Wochen bis zum Go-Live" icon={<Clock size={16} />} />
          <MetaCard label="Sprachen" value="Deutsch &amp; Englisch" />
        </div>
      </section>

      {/* STORY – AUSGANGSLAGE */}
      <section className="px-5 md:px-16 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Ausgangslage &amp; Idee</h2>
            <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
              Die Kirche für Aschaffenburg stand vor einer großen Aufgabe: Ein neues Kirchenzuhause sollte finanziert
              werden. Es gab nur wenige vorhandene Informationen und keine klare digitale Struktur, wie das Anliegen
              erklärt und Spenden ermöglicht werden können – vor allem nicht für Menschen außerhalb der direkten Gemeinde.
            </p>
            <p className="mt-3 text-sm md:text-base text-neutral-200 leading-relaxed">
              Zusätzlich reisten die Pastoren in die USA, um dort persönlich von dem Projekt zu erzählen. Dafür sollte
              es eine einfache Möglichkeit geben, direkt online zu spenden – in Deutsch und Englisch, über QR-Codes
              und Links, ohne technische Hürden.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-semibold mb-1">Was ich übernommen habe</h3>
            <ul className="text-sm md:text-base text-neutral-200 space-y-1.5 list-disc list-inside">
              <li>Konzept &amp; Struktur der kompletten Fundraising-Landingpage</li>
              <li>Formulierung aller Texte (Story, Vision, FAQs, Call-to-Action)</li>
              <li>Design &amp; Auswahl der Bilder, inkl. Bildbearbeitung</li>
              <li>Einbindung von PayPal und klassischer Überweisung</li>
              <li>Hosting-Setup &amp; technische Umsetzung</li>
              <li>Erstellung von vier unterschiedlichen Flyern (Print &amp; digital)</li>
              <li>Aufnahme &amp; Schnitt eines Projektvideos</li>
              <li>Feinabstimmung mit dem Pastor und dem Kernteam</li>
            </ul>
          </div>
        </div>
      </section>

      {/* UMSETZUNG – STRUKTUR & MODULE */}
      <section className="px-5 md:px-16 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Umsetzung: Von einer Idee zur klaren digitalen Reise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              icon={<FileText size={18} />}
              title="Story &amp; Inhalte"
              items={[
                'Entwicklung einer klaren Erzählung: Warum ein neues Gebäude?',
                'Strukturierung von Vision, Hintergrund, Ablauf und Spendenziel',
                'Texte für deutsch- und englischsprachige Besucher:innen',
              ]}
            />
            <StepCard
              icon={<LayoutTemplate size={18} />}
              title="Seite &amp; Spendenwege"
              items={[
                'Landingpage mit Fokus auf Verständlichkeit und Vertrauen',
                'Einbindung von einfachen Spendenwegen (PayPal &amp; Überweisung)',
                'Logische Platzierung von CTAs und QR-Code-Verwendung',
              ]}
            />
            <StepCard
              icon={<Video size={18} />}
              title="Medien &amp; Druck"
              items={[
                'Aufnahme und Schnitt eines Projektvideos für Gemeindekontext',
                'Vier Flyer-Varianten für unterschiedliche Einsätze',
                'Abstimmung von Online- und Offline-Materialien',
              ]}
            />
          </div>
        </div>
      </section>

      {/* WIRKUNG / IMPACT */}
      <section className="px-5 md:px-16 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Ergebnis &amp; Wirkung</h2>
            <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
              Durch die eigene Fundraising-Seite wurde das Projekt greifbar: Menschen konnten jederzeit nachlesen,
              worum es geht, warum das neue Kirchenzuhause wichtig ist und auf welchem Weg sie unterstützen können.
            </p>
            <ul className="mt-3 text-sm md:text-base text-neutral-200 space-y-1.5 list-disc list-inside">
              <li>Spenden wurden über einen klaren, einfachen Weg möglich gemacht.</li>
              <li>
                Alle wichtigen Informationen waren gebündelt auf einer Seite statt über verschiedene Kanäle verteilt.
              </li>
              <li>
                Die Pastoren konnten vor Ort in den USA direkt auf eine moderne, strukturierte Online-Präsenz verweisen.
              </li>
            </ul>
            <p className="mt-3 text-sm md:text-base text-neutral-200 leading-relaxed">
              Besonders wichtig war mir, dass Menschen sich sicher und abgeholt fühlen – unabhängig davon, ob sie Teil
              der Gemeinde sind oder von außen auf das Projekt aufmerksam werden.
            </p>
          </div>

          {/* GALLERY / BILDER */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Einblicke in das Projekt</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Diese Bildpfade kannst du durch eigene Screenshots ersetzen */}
              <Screenshot
                src="/img/portfolio/kirche-page.jpg"
                alt="Ausschnitt der Fundraising-Landingpage"
              />
              <Screenshot
                src="/img/portfolio/kirche-form.jpg"
                alt="Spendenbereich / Zahlungsinfos"
              />
              <Screenshot
                src="/img/portfolio/kirche-flyer.jpg"
                alt="Flyer-Design für die Spendenaktion"
              />
              <Screenshot
                src="/img/portfolio/kirche-video-still.jpg"
                alt="Standbild aus dem Projektvideo"
              />
            </div>
            <p className="text-xs md:text-sm text-neutral-400">
              Hinweis: Screenshots und Bilder sind exemplarisch – je nach finaler Auswahl können sie ausgetauscht
              werden.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Ähnliches Projekt geplant?</h3>
            <p className="mt-3 text-sm md:text-base text-neutral-300 max-w-xl">
              Ob Fundraising, Projektvorstellung oder Event – ich unterstütze bei Landingpages, Formularen,
              Zahlungswegen und begleitenden Medien, damit eure Idee klar und vertrauenswürdig ankommt.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold text-sm md:text-base"
            >
              Projekt anfragen <ArrowRight size={18} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:border-white/35 transition-colors font-semibold text-sm md:text-base"
            >
              Weitere Arbeiten ansehen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* Helper-Components */

function MetaCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-neutral-400 flex items-center gap-1.5">
        {icon && <span className="text-indigo-300">{icon}</span>}
        {label}
      </span>
      <span className="text-sm md:text-base text-neutral-100">{value}</span>
    </div>
  );
}

function StepCard({ icon, title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
          {icon}
        </div>
        <h3 className="text-sm md:text-base font-semibold">{title}</h3>
      </div>
      <ul className="text-xs md:text-sm text-neutral-200 space-y-1.5 list-disc list-inside">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs md:text-[13px] text-indigo-200 border border-white/10">
      {children}
    </span>
  );
}

function Screenshot({ src, alt }) {
  return (
    <div className="relative w-full h-28 md:h-32 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
