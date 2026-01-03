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
  ShieldCheck,
  BarChart3,
  FileText,
  CheckCircle2,
  Quote,
  Clock,
  Globe2,
  Layers,
  CreditCard,
  Video,
  LayoutTemplate,
} from 'lucide-react';

/* CountUp (JS – ohne TS-Typen) */
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

  const n = useCountUp(value, 1200, 0, visible);

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

  // NEU: Services neutraler (nicht „Praxis/Ärzte“, sondern „kleine Projekte/Kampagnen“)
  const modules = [
    {
      icon: <LayoutTemplate size={22} className="text-violet-300" />,
      title: 'Landingpages & Kampagnen',
      desc: 'Schlanke Seiten für Aktionen, Projekte oder Angebote – schnell online, klar strukturiert, mobil optimiert.',
      href: '/services/landingpages',
    },
    {
      icon: <FileText size={22} className="text-violet-300" />,
      title: 'Formulare & Kontaktwege',
      desc: 'Anfragen, Anmeldungen oder einfache Workflows – damit Interessierte wirklich handeln können.',
      href: '/services/forms',
    },
    {
      icon: <CreditCard size={22} className="text-violet-300" />,
      title: 'Spenden- & Zahlungswege',
      desc: 'PayPal, Überweisung, klare CTAs – ohne Reibung, ohne Chaos, mit sauberer Erklärung.',
      href: '/services/payments',
    },
    {
      icon: <Video size={22} className="text-violet-300" />,
      title: 'Kurzvideo & Motion',
      desc: 'Kurze, starke Clips für eine Aktion oder Kampagne – passend zum Projekt, nicht als Dauer-Content.',
      href: '/services/video',
    },
    {
      icon: <BarChart3 size={22} className="text-violet-300" />,
      title: 'Tracking & Klarheit',
      desc: 'Basis-Tracking (z. B. Klicks/Conversions) und saubere Struktur – damit du weißt, was funktioniert.',
      href: '/services/analytics',
    },
    {
      icon: <ShieldCheck size={22} className="text-violet-300" />,
      title: 'Sauberer Go-Live',
      desc: 'Domain/Hosting, Setup und Übergabe – pragmatisch, dokumentiert, ohne Agentur-Overhead.',
      href: '/services/setup',
    },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-[28rem] w-[48rem] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-[26rem] w-[44rem] rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-16 md:pb-20 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Kleine digitale Projekte. Klar. Schnell. Projektbasiert.
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Aktionen, die <span className="text-indigo-300">online wirklich funktionieren</span>.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Landingpages, Formulare, Zahlungswege und Media für Kampagnen & Projekte – ohne Dauerbindung,
            ohne Social-Media-Output-Zwang, mit klarer Umsetzung.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/portfolio/kirche-fundraising"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Fundraising-Case ansehen <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold"
            >
              Kontakt
            </Link>
          </div>

          {/* Mini-Trust (ohne übertriebene Claims) */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-indigo-200/90">
            <ShieldCheck size={16} className="text-emerald-400" />
            Sauberer Rahmen, klare Übergabe, keine Endlos-Betreuung.
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="px-5 md:px-16 -mt-6 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {['Projektbasiert', 'Mobil optimiert', 'Schnell online', 'Klarer CTA', 'Ohne Dauerbindung'].map((t, i) => (
              <span
                key={t}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="text-sm md:text-base text-neutral-200 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NEU: Echte, belegbare „Stats“ (aus dem Fundraising-Projekt) */}
      <section className="px-5 md:px-16 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Beispiel aus einem echten Projekt</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Stat label="Time-to-Launch" value={14} suffix=" Tage" />
            <Stat label="Sprachen" value={2} />
            <Stat label="Flyer-Varianten" value={4} />
            <Stat label="Zahlungswege" value={2} />
          </div>

          <div className="mt-4 flex items-start gap-2 text-sm text-[#AEB5C8]">
            <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
            <p>
              Das sind keine Marketing-Zahlen, sondern konkrete Eckdaten aus dem Fundraising-Case.
            </p>
          </div>
        </div>
      </section>

      {/* MODULE */}
      <section className="px-5 md:px-16 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Was ich umsetze</h2>
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

        {/* Vorteile (ohne „Wie ich arbeite“) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock className="text-sky-300" size={18} />,
              title: 'Kurzer Zeitraum',
              desc: 'Ich plane Projekte so, dass sie in einem klaren Zeitfenster fertig werden – ohne Endlos-Schleifen.',
            },
            {
              icon: <Layers className="text-violet-300" size={18} />,
              title: 'Alles greift ineinander',
              desc: 'Seite, Text, Formulare, Links und Medien – als ein zusammenhängendes System.',
            },
            {
              icon: <Globe2 className="text-emerald-300" size={18} />,
              title: 'Für echte Menschen',
              desc: 'Mobil-first, verständlich, handlungsorientiert – damit aus Interesse eine Aktion wird.',
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

      {/* TESTIMONIALS – Optional: Wenn du (noch) keine echten Zitate hast, lieber weglassen */}
      <section className="px-5 md:px-16 pb-8 md:pb-14">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Kurzer Eindruck</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <Quote className="absolute -top-4 -left-4 w-8 h-8 text-white/10" />
              <blockquote className="text-neutral-200">
                „Wenn ein Projekt schnell online muss, brauche ich Klarheit, Struktur und eine saubere Umsetzung.“
              </blockquote>
              <figcaption className="mt-4 text-sm text-neutral-400">
                <span className="text-white font-medium">Arbeitsprinzip</span>
              </figcaption>
            </figure>

            <figure className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <Quote className="absolute -top-4 -left-4 w-8 h-8 text-white/10" />
              <blockquote className="text-neutral-200">
                „Das Ziel ist nicht ‘schön’, sondern ‘funktioniert’: verständlich, mobil, mit klarer Handlung.“
              </blockquote>
              <figcaption className="mt-4 text-sm text-neutral-400">
                <span className="text-white font-medium">Arbeitsprinzip</span>
              </figcaption>
            </figure>
          </div>

          <div className="mt-6 flex items-start gap-2 text-sm text-[#AEB5C8]">
            <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
            <p>
              Sobald du echte Kundenstimmen hast, ersetzen wir diese Prinzip-Karten durch echte Zitate.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 py-16 md:py-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h2 className="text-3xl md:text-4xl font-bold">Projekt im Kopf?</h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Schreib kurz, worum es geht – ich sage dir schnell, ob es in meinen Rahmen passt.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Kontakt <ArrowRight size={18} />
            </Link>
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold"
            >
              Portfolio ansehen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
