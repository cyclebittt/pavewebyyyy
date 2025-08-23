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
  Target,
  LayoutTemplate,
  Rocket,
  MessageSquare,
  Quote,
  ChevronRight,
} from 'lucide-react';

/* -------------------------------
   Lib-freier CountUp (JS)
--------------------------------*/
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
      threshold: 0.35,
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

/* -------------------------------
   Service Step (Pfad)
--------------------------------*/
function ServiceStep({ icon, title, desc, href, delay = 0 }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="relative pl-8 md:pl-10"
    >
      {/* Linie + Punkt */}
      <span className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/60 via-white/10 to-transparent rounded-full" />
      <span className="absolute left-2 top-2 inline-flex h-3 w-3 rounded-full bg-violet-400 ring-4 ring-violet-500/20" />

      <Link
        href={href}
        className="group block rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 md:p-6 backdrop-blur-sm hover:bg-white/[0.07] transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
              <ChevronRight
                size={18}
                className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 text-indigo-300"
              />
            </div>
            <p className="mt-1 text-neutral-300">{desc}</p>
            <div className="mt-3 inline-flex items-center gap-2 text-indigo-300 text-sm font-medium">
              Mehr erfahren <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  const [fadeDir, setFadeDir] = useState('fade-right');

  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 60 });
    const handleResize = () =>
      setFadeDir(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    {
      title: 'Strategie & Social Media',
      desc:
        'Zielgruppen, Kanäle, Formate und Redaktionsroutinen: Wir sorgen für planbaren Reach & Relevanz.',
      icon: <MessageSquare size={24} className="text-violet-300" />,
      href: '/contact',
    },
    {
      title: 'Branding & Positionierung',
      desc:
        'Klares Fundament: Botschaften, Tonalität, visuelles System – merkfähig und skalierbar.',
      icon: <Target size={24} className="text-violet-300" />,
      href: '/services/branding',
    },
    {
      title: 'Webdesign & Funnel',
      desc:
        'Schnelle, klare Websites mit überzeugender Struktur – inklusive Lead‑Magneten & konvertierenden Touchpoints.',
      icon: <LayoutTemplate size={24} className="text-violet-300" />,
      href: '/services/webdesign',
    },
    {
      title: 'Lead‑System & CRM',
      desc:
        'Formulare, Automationen, CRM‑Setup & Follow‑ups – damit Traffic in Kund:innen wird.',
      icon: <Rocket size={24} className="text-violet-300" />,
      href: '/services/lead',
    },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-24 md:pb-32 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Neukunden durch digitale Lösungen
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Wir generieren Neukunden –{' '}
            <span className="text-indigo-300">maßgeschneidert, messbar, modular.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Keine Paket‑Schubladen. Wir kombinieren genau die Bausteine, die
            in deiner Situation Wirkung erzeugen – Strategie, Branding, Web, Social,
            Funnel & CRM.
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
            {['KMU • DACH', 'Startups', 'Handwerk', 'Gastro', 'Dienstleister'].map(
              (t, i) => (
                <span
                  key={t}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="text-sm md:text-base text-neutral-200 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="px-5 md:px-16 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Stat label="umgesetzte Projekte" value={86} />
          <Stat label="durchschn. Conversion-Lift (%)" value={27} />
          <Stat label="erstellte Inhalte / Jahr" value={420} />
          <Stat label="Ø Kundenzufriedenheit (%)" value={98} />
        </div>
      </section>

      {/* SERVICE-JOURNEY (vertikaler Pfad) */}
      <section className="px-5 md:px-16 py-10 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Deine Journey – von Sichtbarkeit zu planbaren Anfragen
        </h2>
        <div className="relative">
          {/* zarte Hintergrundlinie */}
          <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-white/[0.06] rounded-full" />
          <div className="grid grid-cols-1 gap-5">
            {services.map((s, i) => (
              <ServiceStep
                key={s.title}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                href={s.href}
                delay={i * 120}
              />
            ))}
          </div>
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
            Bereit, planbar neue Kund:innen zu gewinnen?
          </h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Lass uns in 30 Minuten prüfen, welche Module bei dir den größten Hebel haben.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/request"
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Termin vereinbaren <ArrowRight size={18} />
            </Link>
            <Link
              href="/services/branding"
              className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold"
            >
              Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
