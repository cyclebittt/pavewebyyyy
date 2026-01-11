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
  Play,
  CheckCircle2,
  Timer,
  ShieldCheck,
  LineChart,
} from 'lucide-react';

export default function MotionDesignPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HEADER */}
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
                  <Sparkles size={16} /> Motion Design · Video Editing
                </span>

                <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                  Motion, das klar erklärt
                  <span className="block text-indigo-300">und sofort wirkt.</span>
                </h1>

                <p className="mt-4 text-neutral-300 leading-relaxed max-w-xl">
                  Keine Alarmismus-Zahlen, keine Buzzwords. Nur saubere Cuts, klare Dramaturgie und Motion, die den Punkt
                  schneller rüberbringt als Text.
                </p>

                {/* one CTA, one quiet link */}
                <div className="mt-7 flex flex-col items-start gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold text-sm md:text-base"
                  >
                    Kurz anfragen <ArrowRight size={18} />
                  </Link>

                  <p className="text-sm md:text-base text-neutral-400 max-w-xl">
                    Schick mir kurz Ziel, Plattform und Material-Stand. Dann sage ich dir, was realistisch ist und wie
                    wir starten.
                  </p>
                </div>

                {/* trust pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill icon={<Timer size={14} />}>Schneller erster Cut</Pill>
                  <Pill icon={<ShieldCheck size={14} />}>Saubere Übergabe</Pill>
                  <Pill icon={<LineChart size={14} />}>Fokus auf Wirkung</Pill>
                </div>
              </div>

              {/* Small “what you get” box (scan-stopper) */}
              <div className="w-full lg:max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
                <div className="text-xs uppercase tracking-wide text-neutral-400">Typischer Ablauf</div>
                <ul className="mt-3 space-y-2 text-sm md:text-base text-neutral-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Hook + Storyline kurz festlegen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Cut + Motion als erster Entwurf</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>1–2 Feedback-Runden, dann Export & Übergabe</span>
                  </li>
                </ul>

                <div className="mt-4 text-sm text-neutral-400">
                  Output: Reels/TikTok/YouTube (auf Wunsch auch Templates für weitere Videos).
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="px-5 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Showcase</h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
              Zwei Beispiele. Mehr braucht’s nicht, um Stil und Qualität einzuordnen.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {/* Small showcase (metadata preload ok) */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04]">
              <video
                src="/videos/showcase.mp4"
                poster="/img/portfolio/motion-poster.jpg"
                controls
                preload="metadata"
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="p-5 md:p-6 border-t border-white/10">
                <div className="text-sm md:text-base font-semibold">Showcase (kurz)</div>
                <div className="mt-1 text-sm text-neutral-400">
                  Schnitte, Timing, Motion-Details. Ein kurzer Überblick.
                </div>
              </div>
            </div>

            {/* Big 94MB video: true lazy load */}
            <LazyVideo
              title="Motion Design Showcase (0110.mp4)"
              subtitle="Große Datei, wird erst beim Klick geladen."
              poster="/img/portfolio/motion-poster2.jpg"
              src="/videos/0110.mp4"
            />
          </div>

          {/* Bottom: single CTA + quiet back link */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Wenn du so etwas brauchst</h3>
            <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
              Schreib mir kurz Ziel, Plattform und welches Material du schon hast. Dann bekommst du eine klare
              Einschätzung, was sinnvoll ist.
            </p>

            <div className="mt-6 flex justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold inline-flex items-center gap-2"
              >
                Kurz anfragen <ArrowRight size={18} />
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

/** Loads the big video only after click */
function LazyVideo({ title, subtitle, poster, src }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04]">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative w-full aspect-video block text-left"
          aria-label="Video laden und abspielen"
        >
          <Image src={poster} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1100px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-black/45 p-4 border border-white/20 backdrop-blur-sm">
              <Play size={22} />
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-sm md:text-base font-semibold text-white/95">{title}</p>
            <p className="text-xs md:text-sm text-white/70">{subtitle}</p>
          </div>
        </button>
      ) : (
        <video src={src} controls autoPlay playsInline preload="metadata" className="w-full h-full object-cover" />
      )}

      <div className="p-5 md:p-6 border-t border-white/10">
        <div className="text-sm md:text-base font-semibold">Was du hier siehst</div>
        <div className="mt-1 text-sm text-neutral-400 leading-relaxed">
          Timing, Rhythmus, Motion-Details. Wenn du willst, kann ich das auf deinen Stil und deine Plattform anpassen.
        </div>
      </div>
    </div>
  );
}
