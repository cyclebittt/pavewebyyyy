'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { ArrowRight, FileText, ShieldCheck, Accessibility, Video, Lock } from 'lucide-react';

function Feature({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-indigo-200">
        {icon}
        <span>{title}</span>
      </div>
      <p className="mt-3 text-neutral-300">{desc}</p>
    </div>
  );
}
function StepCard({ step, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="text-sm text-indigo-300 font-semibold">{step}</div>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-300">{desc}</p>
    </div>
  );
}
function MiniCase() {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6">
      <h3 className="text-xl font-semibold">Beispiel – Hausarztpraxis mit Portal</h3>
      <ul className="mt-3 list-disc pl-5 text-neutral-300 space-y-2">
        <li>Portal mit Formular‑Uploads (Neupatient, Überweisung, Rezepte)</li>
        <li>Videosprechstunden‑Slot integriert</li>
        <li>Informationsseiten barrierearm & DSGVO‑konform</li>
      </ul>
      <p className="mt-3 text-neutral-200">
        Ergebnis: Weniger Telefonaufkommen, schnellerer Informationszugang, weniger Medienbrüche.
      </p>
    </div>
  );
}

export default function PortalPage() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-14 md:pb-20 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Digitale Praxisportale
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Moderne, barrierearme und DSGVO‑konforme Portale mit Patienten‑Services wie Formular‑Uploads,
            Vorab‑Anamnesen und Videosprechstunden.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-5 md:px-16 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Was Sie erhalten</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            icon={<FileText size={16} />}
            title="Struktur & Inhalte"
            desc="Praxisinfos, Leistungen, Team, Anfahrt, FAQ – klar strukturiert und einfach pflegbar."
          />
          <Feature
            icon={<Accessibility size={16} />}
            title="Barrierearm & schnell"
            desc="Gute Lesbarkeit, Kontraste, Tastatur‑Nutzung, Performance – für alle Patient:innen."
          />
          <Feature
            icon={<ShieldCheck size={16} />}
            title="DSGVO‑Sicherheit"
            desc="Datenschutz‑Hinweise, Consent‑Flows, Hosting‑Setup – sauber dokumentiert."
          />
          <Feature
            icon={<Video size={16} />}
            title="Videosprechstunde"
            desc="Optionale Einbindung gängiger Anbieter und klare Kommunikationswege."
          />
          <Feature
            icon={<Lock size={16} />}
            title="Formular‑Uploads"
            desc="Sichere Upload‑Flows (z. B. Überweisungen, Rezepte, Neupatienten‑Bögen)."
          />
          <Feature
            icon={<ShieldCheck size={16} />}
            title="Förderfähig geplant"
            desc="Struktur & Vorgehen kompatibel zu BayDiGuP‑Förderlogik."
          />
        </div>
      </section>

      {/* Prozess */}
      <section className="px-5 md:px-16 py-6 md:py-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ablauf</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StepCard step="01" title="Kickoff" desc="Ziele, Inhalte, Verantwortliche und Datenschutz‑Rahmen klären." />
          <StepCard step="02" title="Struktur & Design" desc="Seitenarchitektur, Barrierefreiheit & Designs entwickeln." />
          <StepCard step="03" title="Implementierung" desc="CMS, Formulare, Upload‑Flows, Sicherheits‑Setup." />
          <StepCard step="04" title="Go‑Live & Schulung" desc="Übergabe, Team‑Training, Monitoring & Betreuung." />
        </div>
      </section>

      {/* Mini‑Case */}
      <section className="px-5 md:px-16 py-6 md:py-10">
        <MiniCase />
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 py-12 md:py-16 text-center">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10">
          <h3 className="text-3xl font-bold">Portal starten?</h3>
          <p className="mt-3 text-neutral-300">Wir planen pragmatisch, fundiert – und förderfähig.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold inline-flex items-center gap-2">
              Termin vereinbaren <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:border-white/30 font-semibold">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
