'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Sparkles,
  ShieldCheck,
  Target,
  Settings2,
  Brain,
  Users,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true, offset: 40 });
      cleanup = () => {};
    })();
    return () => cleanup();
  }, []);

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-16 md:pb-24 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Über paveo
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Die Zukunft Ihrer Praxis beginnt digital.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Wir verbinden Design, Automatisierung, KI und TI‑Anbindung zu
            förderfähigen, skalierbaren Praxis‑Systemen. Messbar, sicher, DSGVO‑konform.
          </p>
        </div>
      </section>

      {/* MISSION / WHY */}
      <section className="px-5 md:px-16 pb-10 md:pb-14">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="text-indigo-300" size={18} />,
                title: 'Fokus',
                desc: 'Spezialisiert auf Arzt‑, Zahn‑ und Gemeinschaftspraxen. Keine Experimente, sondern Best Practices.',
              },
              {
                icon: <ShieldCheck className="text-emerald-400" size={18} />,
                title: 'Sicherheit',
                desc: 'DSGVO‑konforme Prozesse, klare Rollen, sichere Datenflüsse – transparent dokumentiert.',
              },
              {
                icon: <Settings2 className="text-violet-300" size={18} />,
                title: 'Skalierbarkeit',
                desc: 'Modularer Aufbau: Portal, Termine, KI, TI, Analytics. Starten, ausbauen, standardisieren.',
              },
            ].map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-indigo-200">
                  {b.icon}
                  <span>{b.title}</span>
                </div>
                <p className="mt-3 text-neutral-300">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VORGEHEN */}
      <section className="px-5 md:px-16 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Vorgehen – klar & kollaborativ</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Kickoff & Analyse', desc: 'Ziele, Team, Status Quo. Risiken, Chancen, Förderfähigkeit.' },
            { step: '02', title: 'Roadmap & Module', desc: 'Portal, Termine, KI, TI, Analytics – sinnvoll priorisiert.' },
            { step: '03', title: 'Umsetzung & Schulung', desc: 'Sprints, saubere Übergaben, Team‑Enablement, Sicherheit.' },
            { step: '04', title: 'Betrieb & Optimierung', desc: 'Monitoring, Updates, Berichte – langfristig & messbar.' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="text-sm text-indigo-300 font-semibold">{s.step}</div>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-neutral-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM (anonymisiert / ohne Uploads) */}
      <section className="px-5 md:px-16 py-8 md:py-12">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Team & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Users />, title: 'Praxis‑Verständnis', desc: 'Wir sprechen Praxis‑Alltag: Abläufe, Peaks, Komplexität.' },
              { icon: <Brain />, title: 'Tech & KI', desc: 'Automatisierung, Prognosen, Datenmodelle – pragmatisch einsetzbar.' },
              { icon: <Rocket />, title: 'MarTech & Rollout', desc: 'Saubere Einführung, Training & Change‑Enablement.' },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6" data-aos="fade-up" data-aos-delay={i * 120}>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
                  {t.icon}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-neutral-300">{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#AEB5C8] flex items-start gap-2">
            <CheckCircle2 className="text-emerald-400" size={18} />
            Kein Bild‑Upload nötig – wir arbeiten text‑ und systembasiert, mit klarer Dokumentation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 py-14 md:py-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h3 className="text-3xl md:text-4xl font-bold">Lassen Sie uns starten.</h3>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Kurzer Call – klare nächsten Schritte, optional förderfähig. Wir richten uns nach Ihrem Team und Tempo.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Termin vereinbaren <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
