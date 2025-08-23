'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Icons
import {
  ArrowRight,
  Sparkles,
  Megaphone,
  Target,
  LayoutTemplate,
  Rocket,
  MessageSquare,
  Quote,
  ShieldCheck,
} from 'lucide-react';

/* -------------------------------------------
   Lightweight CountUp Hook (ohne externe Lib)
--------------------------------------------*/
function useCountUp(target = 0, duration = 1500, start = 0, inView = true) {
  const [val, setVal] = useState(start);
  const startRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    let rafId;

    const step = (ts) => {
      if (startRef.current == null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(start + (target - start) * eased));
      if (p < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start, inView]);

  return val;
}

function Stat({ label, value }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.3,
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const n = useCountUp(value, 1400, 0, visible);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
    >
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-indigo-300">
        {n.toLocaleString('de-DE')}
      </div>
      <div className="mt-2 text-neutral-300">{label}</div>
    </div>
  );
}

export default function Home() {
  const [fadeDir, setFadeDir] = useState('fade-right');

  // AOS nur clientseitig laden
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true, offset: 60 });
      cleanup = () => {};
    })();

    const onResize = () =>
      setFadeDir(typeof window !== 'undefined' && window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO – Neukunden-Fokus */}
      <section className="relative overflow-hidden">
        {/* kräftiger diagonaler Hintergrund */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-24 md:pb-32 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Modular. Messbar. Skalierbar.
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Wir generieren <span className="text-indigo-300">Neukunden</span> durch digitale Lösungen.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Von Social Media bis CRM-System: Wir kombinieren Branding, Content, Web & Funnel
            zu einem System, das Interessenten in Kunden verwandelt.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/request"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Projekt starten <ArrowRight size={18} />
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

      {/* TRUST BAR */}
      <section className="px-5 md:px-16 -mt-8 mb-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {['KMU • DACH', 'Startups', 'Handwerk', 'Gastro', 'Dienstleister'].map((t, i) => (
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

      {/* KPIs / ERGEBNISSE */}
      <section className="px-5 md:px-16 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Stat label="umgesetzte Projekte" value={86} />
          <Stat label="durchschn. Conversion-Lift (%)" value={27} />
          <Stat label="erstellte Inhalte / Jahr" value={420} />
          <Stat label="Ø Kundenzufriedenheit (%)" value={98} />
        </div>
      </section>

      {/* FUNNEL / PROZESS (3 Stufen) */}
      <section className="px-5 md:px-16 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">So werden aus Reichweite echte Kunden</h2>
        <p className="text-neutral-300 max-w-3xl">
          Wir bauen keine isolierten Einzellösungen – wir verbinden Module zu einem wirksamen System.
          Von Aufmerksamkeit über Interesse bis zur Conversion und Bindung.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Megaphone className="text-indigo-300" />,
              title: 'Aufmerksamkeit erzeugen',
              points: [
                'Social Media & Short-Form Content',
                'Paid Social / Ads (optional)',
                'Kreatives Storytelling',
              ],
            },
            {
              icon: <LayoutTemplate className="text-indigo-300" />,
              title: 'Interesse binden',
              points: [
                'Markenkern & visuelles System',
                'Website / Landingpages',
                'Klares Messaging, klare Nutzen',
              ],
            },
            {
              icon: <Rocket className="text-indigo-300" />,
              title: 'Leads konvertieren',
              points: [
                'Funnel & Angebotsstruktur',
                'CRM-Setup & Automationen',
                'Messung & Optimierung',
              ],
            },
          ].map(({ icon, title, points }, i) => (
            <div
              key={title}
              data-aos={fadeDir}
              data-aos-delay={i * 120}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 backdrop-blur-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                {icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <ul className="mt-3 space-y-2 text-neutral-300">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-indigo-300" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Micro‑Trust unter dem Prozess */}
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#AEB5C8]">
          <ShieldCheck size={18} className="text-emerald-400" />
          DSGVO‑konforme Setups • Transparente Sprints • Messbare Ergebnisse
        </div>
      </section>

      {/* SERVICES (als Module klickbar – optional) */}
      <section className="px-5 md:px-16 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">Module, die wir kombinieren</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Branding & Positionierung',
              desc: 'Fundament, Botschaften & visuelles System – klar und skalierbar.',
              icon: <Target size={26} className="text-violet-400" />,
              href: '/services/branding',
            },
            {
              title: 'Webdesign',
              desc: 'Schnelle, fokussierte Web‑/Landingpages mit Conversion‑Fokus.',
              icon: <LayoutTemplate size={26} className="text-violet-400" />,
              href: '/services/webdesign',
            },
            {
              title: 'Social & Content',
              desc: 'Reels, Posts, Ads & Creatives – konsistent zur Marke.',
              icon: <MessageSquare size={26} className="text-violet-400" />,
              href: '/services/socialmedia',
            },
            {
              title: 'Content Creation',
              desc: 'Foto, Video, Design – Content, der deine Marke lebendig macht.',
              icon: <Palette size={26} className="text-violet-400" />,
              href: '/services/content',
            },
            {
              title: 'Leads & Systeme',
              desc: 'Funnel, CRM, Automationen & Angebotsstruktur – messbar & smart.',
              icon: <Rocket size={26} className="text-violet-400" />,
              href: '/services/lead',
            },
          ].map(({ title, desc, icon, href }, i) => (
            <Link
              key={title}
              href={href}
              data-aos={fadeDir}
              data-aos-delay={i * 80}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 backdrop-blur-sm hover:bg-white/[0.06] transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                {icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-neutral-300">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-indigo-300 font-medium">
                Mehr erfahren <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-5 md:px-16 pb-8 md:pb-14">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Was Kund:innen sagen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'paveo hat unser Branding neu gedacht – endlich wirkt alles wie aus einem Guss und konvertiert spürbar besser.',
                name: 'M. Richter',
                role: 'Inhaber, Regionales Café',
              },
              {
                quote:
                  'Die Social-Strategie spart uns Zeit und bringt konstant Anfragen. Super pragmatisch und messbar.',
                name: 'S. Wagner',
                role: 'CEO, Handwerksbetrieb',
              },
              {
                quote:
                  'Website-Relaunch + Angebote strukturiert = kürzere Sales-Zyklen. Genau das, was wir gebraucht haben.',
                name: 'E. Krauß',
                role: 'Gründerin, Beratungsstudio',
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
                  <span className="text-white font-medium">{t.name}</span> · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 py-16 md:py-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Lass uns dein Neukunden‑System bauen.
          </h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Unverbindlicher 30‑Minuten‑Call: Ziele, Fahrplan & nächste Schritte.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/request"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Termin vereinbaren <ArrowRight size={18} />
            </Link>
            <Link
              href="/services/lead"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold"
            >
              Mehr zu Leads & Systemen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
