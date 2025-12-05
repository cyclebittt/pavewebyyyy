'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  ArrowRight,
  Sparkles,
  CalendarDays,
  ShieldCheck,
  Activity,
  Brain,
  Settings2,
  Link as LinkIcon,
  BarChart3,
  FileText,
  CheckCircle2,
  Quote,
} from 'lucide-react';

/* CountUp (leicht, ohne Lib) */
function useCountUp(target = 0, duration = 1500, start = 0, inView = true) {
  const [val, setVal] = useState(start);
  const startRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    let rafId;
    const step = (ts) => {
      if (startRef.current == null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(start + (target - start) * eased));
      if (p < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start, inView]);

  return val;
}

function Stat({ label, value, suffix = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const n = useCountUp(value, 1400, 0, visible);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-indigo-300">
        {n.toLocaleString('de-DE')}
        {suffix}
      </div>
      <div className="mt-2 text-neutral-300">{label}</div>
    </div>
  );
}

export default function Home() {
  const [fadeDir, setFadeDir] = useState('fade-right');

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const handleResize = () => setFadeDir(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const modules = [
    {
      icon: <FileText size={22} className="text-violet-300" />,
      title: 'Projekt-Landingpages',
      desc: 'Klar strukturierte Seiten für Spendenaktionen, Events oder andere Vorhaben – mit Story, Formularen & klaren Calls-to-Action.',
      href: '/services/landingpages',
    },
    {
      icon: <CalendarDays size={22} className="text-violet-300" />,
      title: 'Aktionen & Kampagnen',
      desc: 'Digitale Begleitung für zeitlich begrenzte Aktionen – von der Struktur über die Inhalte bis zur Umsetzung der Seite.',
      href: '/services/campaigns',
    },
    {
      icon: <LinkIcon size={22} className="text-violet-300" />,
      title: 'Formulare & Zahlungswege',
      desc: 'Einbindung von Zahlungsanbietern, Anmeldeformularen und automatischen Bestätigungen – passend zu euren bestehenden Abläufen.',
      href: '/services/forms',
    },
    {
      icon: <BarChart3 size={22} className="text-violet-300" />,
      title: 'Struktur & Auswertung',
      desc: 'Einfache Auswertung, was funktioniert hat: Wo kamen Anfragen oder Spenden her, und was nimmt man fürs nächste Projekt mit.',
      href: '/services/analytics',
    },
    {
      icon: <Settings2 size={22} className="text-violet-300" />,
      title: 'Digitales Setup & Betreuung',
      desc: 'Technisches Fundament, Updates und kleinere Anpassungen – damit alles stabil läuft, ohne dass ihr euch darum kümmern müsst.',
      href: '/services/managed',
    },
    {
      icon: <Sparkles size={22} className="text-violet-300" />,
      title: 'Begleitende Medien',
      desc: 'Flyer, einfache Visuals und kurze Projektvideos, die eure Botschaft unterstützen – online wie offline.',
      href: '/services/media',
    },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Hintergrund */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-[28rem] w-[48rem] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-[26rem] w-[44rem] rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-20 md:pb-28 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Digitale Begleitung für Projekte & Aktionen
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Digitale Projekte, die Menschen <span className="text-indigo-300">ins Handeln bringen.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Ich unterstütze Teams, Organisationen und kleine Unternehmen dabei, Spendenaktionen, Events und andere
            Vorhaben online klar, verständlich und nutzbar zu machen – mit Landingpages, Formularen, Zahlungswegen
            und begleitenden Medien.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/request"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Projekt anfragen <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold"
            >
              Unverbindliches Sparring
            </Link>
          </div>

          {/* Hinweis */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-indigo-200/90">
            <ShieldCheck size={16} className="text-emerald-400" />
            Klar begrenzte Projekte, transparente Konditionen und ehrliche Kommunikation – ohne Dauerbetreuungs-Verträge.
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="px-5 md:px-16 -mt-6 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {['Klar strukturiert', 'Projektbasiert', 'DSGVO-bewusst', 'Mobil optimiert', 'Keine Dauerverträge'].map(
              (t, i) => (
                <span
                  key={t}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="text-sm md:text-base text-neutral-200 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* RAHMEN / KPIs */}
      <section className="px-5 md:px-16 py-8 md:py-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Wie ich arbeite</h2>
        <p className="text-neutral-300 mb-6 max-w-2xl">
          Der Fokus liegt auf wenigen, gut begleiteten Projekten statt auf möglichst vielen Aufträgen parallel. So bleibt
          genug Raum für Schule, Studium – und für saubere Ergebnisse.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Stat label="Maximale parallele Projekte" value={2} />
          <Stat label="Geplante Projekte pro Jahr" value={4} />
          <Stat label="Ziel-Zufriedenheit" value={100} suffix="%" />
          <Stat label="Fokus-Zeit pro Woche (max.)" value={10} suffix="h" />
        </div>
      </section>

      {/* MODULE als Scroll-Path (Top→Bottom) */}
      <section className="px-5 md:px-16 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Kern-Services & Nutzen</h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 -translate-x-0 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />
          <div className="space-y-8">
            {modules.map(({ icon, title, desc, href }, i) => (
              <div
                key={title}
                data-aos={fadeDir}
                data-aos-delay={i * 80}
                className="relative flex flex-col md:flex-row items-start gap-4 md:gap-8"
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1 md:-translate-x-1/2 -top-1.5 w-4 h-4 rounded-full bg-violet-500 shadow-[0_0_0_6px_rgba(129,51,241,0.25)]" />
                <div
                  className={`w-full md:w-[48%] rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur
                  ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">{icon}</div>
                    <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
                  </div>
                  <p className="mt-3 text-neutral-300">{desc}</p>
                  <div className="mt-4">
                    <Link href={href} className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200">
                      Details ansehen <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vorteile */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Activity className="text-sky-300" size={18} />,
              title: 'Projektfokus statt Dauerstress',
              desc: 'Klar begrenzte Projekte mit Anfang und Ende, statt dauerhafter Betreuung auf Zuruf.',
            },
            {
              icon: <Brain className="text-violet-300" size={18} />,
              title: 'Story & Struktur',
              desc: 'Nicht nur „eine Website“, sondern ein roter Faden: Warum, für wen, und was der nächste Schritt ist.',
            },
            {
              icon: <Settings2 className="text-emerald-400" size={18} />,
              title: 'Technik, die trägt',
              desc: 'Formulare, Zahlungswege und Setups, die stabil laufen – ohne dass du dich tief einarbeiten musst.',
            },
          ].map((b, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-indigo-200">
                {b.icon}
                <span>{b.title}</span>
              </div>
              <p className="mt-3 text-neutral-300">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS (anonymisiert, text-only) */}
      <section className="px-5 md:px-16 pb-8 md:pb-14">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Rückmeldungen aus Projekten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'Die Spenden-Aktion war online viel greifbarer – Infos, Geschichte und Zahlungswege an einem Ort.',
                name: 'Leitung eines Projekts',
              },
              {
                quote:
                  'Die Landingpage hat uns geholfen, Menschen schnell und ohne Umwege auf die Aktion aufmerksam zu machen.',
                name: 'Organisationsteam einer Aktion',
              },
              {
                quote:
                  'Es war angenehm, ein zeitlich klares Projekt zu haben statt eine endlose Online-Baustelle.',
                name: 'Verantwortliche Person eines lokalen Projekts',
              },
            ].map((t, i) => (
              <figure
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 120}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <Quote className="absolute -top-4 -left-4 w-8 h-8 text-white/10" />
                <blockquote className="text-neutral-200">{t.quote}</blockquote>
                <figcaption className="mt-4 text-sm text-neutral-400">
                  <span className="text-white font-medium">{t.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2 text-sm text-[#AEB5C8]">
            <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
            <p>
              Beispiele anonymisiert und sinngemäß zusammengefasst. Der Fokus liegt auf klaren Projekten, stabiler Technik
              und verständlicher Kommunikation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 py-16 md:py-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h2 className="text-3xl md:text-4xl font-bold">Lust, ein digitales Projekt anzustoßen?</h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Kurzer Austausch, klare nächsten Schritte, realistische Planung. Ohne Druck, aber mit dem Anspruch, eure Idee
            online verständlich und nutzbar zu machen.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/request"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Projekt anfragen <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
