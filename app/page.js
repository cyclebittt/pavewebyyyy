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
  Palette,
  Rocket,
  MessageSquare,
  Quote,
} from 'lucide-react';

/* -------------------------------
   Kleiner, lib-freier CountUp (JS)
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
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.35 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const n = useCountUp(value, 1400, 0, visible);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-indigo-300">
        {n.toLocaleString('de-DE')}
      </div>
      <div className="mt-2 text-neutral-300">{label}</div>
    </div>
  );
}

/* ---------------------------------
   Service Node (für Service-Pfad)
---------------------------------- */
function ServiceNode({ icon, title, desc, cta, href, index }) {
  return (
    <div className="relative grid grid-cols-[28px,1fr] gap-4 md:gap-6">
      {/* Node + Tail */}
      <div className="flex flex-col items-center">
        <span className="relative z-10 grid place-items-center w-7 h-7 rounded-full bg-white/10 ring-1 ring-white/20">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/60 to-sky-300/60 blur-[6px]" />
          <span className="relative text-white">{icon}</span>
        </span>
        {/* Linie nach unten */}
        <span className="flex-1 w-[2px] bg-gradient-to-b from-violet-400/50 via-white/10 to-transparent mt-2" />
      </div>

      {/* Content */}
      <div
        className="group rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-colors p-5 md:p-6"
        data-aos="fade-up"
        data-aos-delay={index * 120}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          {cta && href && (
            <Link
              href={href}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm hover:border-white/30"
            >
              {cta} <ArrowRight size={16} />
            </Link>
          )}
        </div>
        <p className="mt-2 text-neutral-300">{desc}</p>
        {cta && href && (
          <Link
            href={href}
            className="mt-3 inline-flex md:hidden items-center gap-2 text-indigo-300"
          >
            {cta} <ArrowRight size={16} />
          </Link>
        )}
      </div>
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

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-24 md:pb-32 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Neukunden durch digitale Systeme
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Wir generieren <span className="text-indigo-300">Neukunden</span> –
            maßgeschneidert mit Branding, Content, Web & Funnels.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Keine Paket-Schubladen. Wir bauen dir den Mix, der wirklich wirkt:
            Sichtbarkeit → Website → Funnel → CRM. Messbar, sauber, skalierbar.
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

      {/* SERVICE-PFAD (kreativ, vertikale Timeline) */}
      <section className="px-5 md:px-16 py-10 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">So entsteht Neukunden-Wachstum</h2>
        <p className="text-neutral-300 mb-10 max-w-3xl">
          Wir kombinieren Module so, wie es zu deiner Situation passt. Kein Overkill, kein Leerlauf –
          nur das, was Wirkung bringt.
        </p>

        <div className="relative">
          {/* sanfter, diagonaler Glow hinter der Timeline */}
          <div className="pointer-events-none absolute -top-16 -left-24 h-72 w-[36rem] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="pointer-events-none absolute top-1/3 -right-16 h-72 w-[36rem] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="relative grid gap-10">
            <ServiceNode
              index={0}
              icon={<Target size={16} />}
              title="Positionierung & Brand‑Fundament"
              desc="Kernbotschaft, Nutzen, Tonalität & visuelle Basis. Damit alles danach greift und konvertiert."
              cta="Branding ansehen"
              href="/services/branding"
            />
            <ServiceNode
              index={1}
              icon={<MessageSquare size={16} />}
              title="Content, der zieht"
              desc="Reels, Posts, Ads & Landing‑Snippets – zugeschnitten auf deine Zielgruppe, ready‑to‑post."
              cta="Content ansehen"
              href="/services/content"
            />
            <ServiceNode
              index={2}
              icon={<LayoutTemplate size={16} />}
              title="Webdesign & Performance"
              desc="Schnelle, klare Seiten mit Conversion‑Struktur: Vertrauen, Relevanz, klare CTAs."
              cta="Webdesign ansehen"
              href="/services/webdesign"
            />
            <ServiceNode
              index={3}
              icon={<Rocket size={16} />}
              title="Funnel & CRM"
              desc="Leads abholen, qualifizieren, nachfassen. Formulare, Automationen, CRM‑Flows – sauber integriert."
              cta="Lead & Systeme"
              href="/services/lead"
            />
            <ServiceNode
              index={4}
              icon={<Palette size={16} />}
              title="Iterieren & Skalieren"
              desc="Quick‑Wins messen, Hypothesen testen, Creatives & Landing‑Blöcke weiter schärfen."
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/request"
            className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
          >
            Projekt starten <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors"
          >
            Erstes Sparring
          </Link>
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
            Bereit, planbar Neukunden zu gewinnen?
          </h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Lass uns kurz sprechen – wir skizzieren dir einen modularen, schlanken Weg zur Wirkung.
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
