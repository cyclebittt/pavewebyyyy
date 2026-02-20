// /components/layout/Footer.jsx (oder .js)
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const whatsappHref =
    'https://wa.me/4916095757167?text=Hi%20Leon%20—%20kurze%20Projektanfrage.%0A%0AZiel:%0ADeadline:%0AStand:%0ABudgetrahmen%20(optional):%0ALink/Beispiele%20(optional):';
  const mailHref =
    'mailto:hello@leonseitz.com?subject=Projektanfrage&body=Hi%20Leon%20—%20kurze%20Projektanfrage.%0A%0AZiel:%0ADeadline:%0AStand:%0ABudgetrahmen%20(optional):%0ALink/Beispiele%20(optional):';

  return (
    <footer className="relative text-white/80">
      {/* soft separator / glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(55%_90%_at_50%_100%,rgba(255,255,255,0.10),transparent_60%)] opacity-70" />

      <div className="max-w-6xl mx-auto px-5 md:px-16 py-14 md:py-16">
        {/* MAIN GLASS PANEL */}
        <div className="relative rounded-3xl border border-white/12 bg-black/25 backdrop-blur-xl shadow-[0_18px_50px_-35px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* inner hairline */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          {/* ambient glow */}
          <div className="pointer-events-none absolute -inset-px opacity-70 blur-2xl bg-[radial-gradient(60%_80%_at_25%_10%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(60%_80%_at_80%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(55%_80%_at_50%_110%,rgba(16,185,129,0.06),transparent_60%)]" />

          <div className="relative p-6 md:p-10">
            {/* Top */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {/* Brand */}
              <div className="flex flex-col gap-4">
                <Link href="/" aria-label="Zur Startseite" className="inline-flex items-center gap-3 w-fit">
                  <Image src="/img/logo-paveo.png" alt="Paveo Logo" width={120} height={40} className="h-9 w-auto" />
                  <span className="font-semibold text-white/90 text-base">Leon Seitz</span>
                </Link>

                <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                  Ich helfe Unternehmen bei der Umsetzung digitaler Projekte und Werbekampagnen – über Brandbooks,
                  Motiondesign, Webdevelopment und Videoediting. Als System, nicht als Einzelteile.
                </p>

                <div className="flex gap-2 flex-wrap">
                  <Pill>Brandbook</Pill>
                  <Pill>Motion</Pill>
                  <Pill>Web</Pill>
                  <Pill>Video</Pill>
                </div>
              </div>

              {/* Kontakt */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-white/90">Kontakt</h4>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp schreiben <ExternalLink size={14} className="opacity-70" />
                </a>

                <a
                  href={mailHref}
                  className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
                >
                  <Mail size={16} />
                  hello@leonseitz.com
                </a>

                <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-wide text-white/55">Shortcut</div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                    Ziel:
                    {'\n'}Deadline:
                    {'\n'}Stand:
                    {'\n'}Budgetrahmen (optional):
                    {'\n'}Link/Beispiele (optional):
                  </div>
                </div>

                <p className="text-xs text-white/45">Datenschutz: Deine Nachricht nutze ich ausschließlich zur Rückmeldung.</p>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-semibold text-white/90">Kurz anfragen</h4>
                <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                  Ziel, Deadline und Stand reichen. Dann bekommst du eine klare Einschätzung, ob es passt – und was
                  sinnvoll ist.
                </p>

                <div className="flex flex-col gap-2">
                  <Link
                    href="/#request"
                    className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                  >
                    Anfrage senden <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-white/12 bg-white/5 text-white/85 font-semibold hover:bg-white/8 hover:border-white/20 transition-colors"
                  >
                    Portfolio ansehen <ArrowUpRight size={18} />
                  </Link>
                </div>

                <div className="mt-2 text-xs text-white/45">Antwortzeit typischerweise: Mo–Fr, innerhalb von 24h.</div>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/45">
              <p>© {new Date().getFullYear()} PAVEO</p>

              <div className="flex gap-6">
                <Link href="/agb" className="hover:text-white/70 transition-colors">
                  AGB
                </Link>
                <Link href="/impressum" className="hover:text-white/70 transition-colors">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="hover:text-white/70 transition-colors">
                  Datenschutz
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/35 text-center"></div>
      </div>
    </footer>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}
