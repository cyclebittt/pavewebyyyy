'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ─── Constants ─── */
const CALENDLY = 'https://calendly.com/hello-leonseitz/30min';
const EMAIL    = 'hello@leonseitz.com';

const B = {
  yellow: '#E8A800',
  ocker:  '#C68F00',
  black:  '#0E0C08',
  ink:    '#0E0C08',
  cream:  '#F5F2EB',
  dark:   '#2A2720',
  muted:  'rgba(26,23,18,0.55)',
};

const FONTS = {
  sans:  "'Plus Jakarta Sans',system-ui,sans-serif",
  serif: "'DM Serif Display',Georgia,serif",
};

/* ─── Hooks ─── */
function useReveal(ref, threshold = 0.08) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      e => { if (e.some(x => x.isIntersecting)) setShown(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return shown;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setP(d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight));
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return p;
}

/* ─── Primitives ─── */
function Reveal({ children, delay = 0, style: extra = {} }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(18px)',
      transition: `opacity .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      ...extra,
    }}>
      {children}
    </div>
  );
}

function Frame({ id, bg, padding = '96px 24px', children, style = {} }) {
  return (
    <section id={id} style={{ background: bg, padding, position: 'relative', overflow: 'hidden', width: '100%', ...style }}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, fontWeight: 700,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: color || B.ocker, padding: '5px 14px', borderRadius: 100,
      border: `1px solid ${color ? 'rgba(232,168,0,0.25)' : 'rgba(14,12,8,0.12)'}`,
      background: color ? 'rgba(232,168,0,0.06)' : 'rgba(14,12,8,0.035)',
    }}>
      {children}
    </span>
  );
}

function Serif({ children, color }) {
  return (
    <em style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontWeight: 400, color: color || 'inherit' }}>
      {children}
    </em>
  );
}

function ScrollBar() {
  const p = useScrollProgress();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80, pointerEvents: 'none' }}>
      <div style={{ height: 3, background: 'rgba(232,168,0,0.12)' }}>
        <div style={{ height: '100%', width: `${Math.round(p * 100)}%`, background: B.yellow, transition: 'width 80ms linear' }} />
      </div>
    </div>
  );
}

function BtnPrimary({ label, href = CALENDLY, target = '_blank', full = false }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target} rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: full ? 'flex' : 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '14px 28px', borderRadius: 100,
        background: h ? B.ocker : B.yellow, color: B.black,
        fontWeight: 800, fontSize: 14, textDecoration: 'none',
        boxShadow: h ? '0 4px 20px rgba(232,168,0,0.28)' : '0 2px 10px rgba(232,168,0,0.15)',
        transition: 'background .18s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: FONTS.sans,
        width: full ? '100%' : undefined,
      }}
    >
      {label}
      <ArrowRight size={15} />
    </a>
  );
}

function Check({ light }) {
  const c = light ? 'rgba(232,168,0,0.9)' : B.yellow;
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,235,0.28)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <Frame
      id="hero"
      bg={`radial-gradient(1100px 600px at 50% -10%, rgba(232,168,0,.13), transparent 55%), linear-gradient(180deg,#0a0805 0%,#0E0C08 60%,#15110a 100%)`}
      padding="0 28px"
      style={{ color: B.cream, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(232,168,0,1)" strokeWidth="0.5" opacity="0.07" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      {/* Nav */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '24px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: B.cream, textDecoration: 'none', fontWeight: 900, letterSpacing: '-0.01em' }}>
          Leon Seitz
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: B.yellow, display: 'inline-block' }} />
        </a>
        <a href="#termin" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 100,
          border: '1px solid rgba(232,168,0,.32)', background: 'rgba(14,12,8,.55)',
          color: B.yellow, fontSize: 12, fontWeight: 700, textDecoration: 'none', backdropFilter: 'blur(6px)',
        }}>
          Abschlussgespräch buchen
        </a>
      </div>

      <Reveal>
        <div style={{ maxWidth: 780, textAlign: 'center', position: 'relative', width: '100%' }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: B.yellow, padding: '5px 14px', borderRadius: 100,
              border: '1px solid rgba(232,168,0,0.25)', background: 'rgba(232,168,0,0.06)',
            }}>
              Webdesign — Paveo
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.2rem,6.5vw,4.4rem)', fontWeight: 900, lineHeight: 1.04,
            letterSpacing: '-0.035em', color: B.cream, marginBottom: 24,
          }}>
            Sie haben die Website gesehen.
            <br />
            <Serif color={B.yellow}>Was kommt jetzt?</Serif>
          </h1>
          <p style={{ fontSize: 'clamp(15px,1.8vw,17px)', color: 'rgba(245,242,235,0.62)', lineHeight: 1.75, maxWidth: 520, marginInline: 'auto', marginBottom: 36 }}>
            Diese Seite erklärt den Ablauf — transparent und ohne Umwege.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <BtnPrimary label="Abschlussgespräch buchen" href="#termin" target="_self" />
            <span style={{ fontSize: 12, color: 'rgba(245,242,235,0.35)', fontWeight: 600 }}>15 Minuten. Kein Verkaufsgespräch.</span>
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}

/* ─── Was Sie erhalten haben ─── */
function WasErhalten() {
  return (
    <Frame bg="#ffffff" padding="96px 24px">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Reveal>
          <Eyebrow>Die Website</Eyebrow>
          <h2 style={{ marginTop: 20, fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.ink, marginBottom: 24 }}>
            Was Sie erhalten haben.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(14,12,8,0.65)', lineHeight: 1.8, marginBottom: 16, maxWidth: 640 }}>
            Die Website, die Sie erhalten haben, ist keine Konzeptskizze. Sie ist eine vollständig ausgearbeitete Grundversion — entwickelt auf Basis einer Analyse Ihrer bestehenden Online-Präsenz.
          </p>
          <p style={{ fontSize: 16, color: 'rgba(14,12,8,0.65)', lineHeight: 1.8, maxWidth: 640 }}>
            Was noch fehlt: Ihre Inhalte, Texte, Kontaktdaten. Das erfolgt nach Ihrer Freigabe.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap: 16 }}>
            {[
              { n: '01', label: 'Vollständige Grundstruktur', desc: 'Alle Sektionen fertig aufgebaut. Keine Platzhalter-Wireframes.' },
              { n: '02', label: 'Analyse-basiert', desc: 'Aufgebaut auf Basis Ihrer bisherigen Online-Präsenz.' },
              { n: '03', label: 'Sofort anpassbar', desc: 'Texte, Bilder, Kontaktdaten werden nach Freigabe eingesetzt.' },
            ].map((item, i) => (
              <div key={item.n} style={{
                padding: '24px 20px', borderRadius: 16,
                background: 'rgba(14,12,8,0.03)', border: '1px solid rgba(14,12,8,0.07)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: B.ocker, letterSpacing: '0.1em', marginBottom: 10 }}>{item.n}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: B.ink, marginBottom: 8 }}>{item.label}</div>
                <p style={{ fontSize: 13, color: B.muted, lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Frame>
  );
}

/* ─── Ablauf ─── */
function Ablauf() {
  const steps = [
    { n: '01', title: 'Gespräch', detail: 'Offene Fragen klären — Paket, Inhalte, Zeitplan.', badge: 'Keine Entscheidungspflicht', time: '15 Min · Tag 1', highlight: true },
    { n: '02', title: 'Freigabe', detail: 'Grundstruktur bestätigen. Dann starte ich mit den inhaltlichen Anpassungen.', badge: 'Schriftliche Dokumentation', time: 'Tag 1–2' },
    { n: '03', title: 'Revision', detail: '2 Revisionsrunden, schriftlich dokumentiert. Übergabe erst nach Ihrer Zustimmung.', badge: '2 Runden inklusive', time: '2–3 Tage' },
    { n: '04', title: 'Übergabe', detail: 'Dateien, Eigentumsrechte, Videokurs und AI Agent — je nach gewähltem Paket.', badge: 'Vollständige Eigentumsübertragung', time: 'Ab Tag 7' },
  ];

  return (
    <Frame bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Eyebrow color={B.yellow}>Ablauf</Eyebrow>
            <h2 style={{ marginTop: 18, fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.025em', color: B.cream }}>
              Vom Gespräch zur <Serif color={B.yellow}>fertigen Website.</Serif>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap: 16, alignItems: 'stretch' }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} style={{ height: '100%' }}>
              <div style={{
                height: '100%', borderRadius: 20, padding: '28px 24px',
                background: s.highlight ? 'linear-gradient(145deg,rgba(232,168,0,.10),rgba(232,168,0,.03))' : 'rgba(245,242,235,.02)',
                border: `1.5px solid ${s.highlight ? 'rgba(232,168,0,.35)' : 'rgba(245,242,235,.07)'}`,
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: s.highlight ? B.yellow : 'rgba(245,242,235,0.07)',
                    color: s.highlight ? B.ink : 'rgba(245,242,235,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 900,
                  }}>{s.n}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: s.highlight ? B.cream : 'rgba(245,242,235,.7)', letterSpacing: '-0.01em' }}>{s.title}</div>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'rgba(245,242,235,.5)', margin: 0, flex: 1 }}>{s.detail}</p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(245,242,235,.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                    background: s.highlight ? B.yellow : 'rgba(245,242,235,0.04)',
                    color: s.highlight ? B.ink : 'rgba(245,242,235,.45)',
                    border: s.highlight ? 'none' : '1px solid rgba(245,242,235,.08)',
                  }}>{s.badge}</span>
                  <span style={{ fontSize: 11, color: 'rgba(245,242,235,.3)', fontWeight: 600 }}>{s.time}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ─── Pakete ─── */
function Pakete() {
  const packages = [
    {
      id: 'a',
      label: 'Solo',
      price: '490 €',
      period: 'einmalig',
      desc: 'Fertige Website mit zwei Revisionsrunden und vollständiger Eigentumsübertragung.',
      items: [
        { ok: true,  text: 'Fertige Website' },
        { ok: true,  text: '2 Revisionsrunden' },
        { ok: true,  text: 'Eigentumsübertragung' },
        { ok: false, text: 'Hosting-Einrichtung' },
        { ok: false, text: 'Videokurs' },
        { ok: false, text: 'AI Agent' },
        { ok: false, text: 'Support & Updates' },
      ],
      note: null,
      highlight: false,
      recommended: false,
    },
    {
      id: 'b',
      label: 'Pro',
      price: '890 €',
      period: 'einmalig',
      desc: 'Website plus Werkzeuge zur eigenständigen Verwaltung.',
      items: [
        { ok: true,  text: 'Fertige Website' },
        { ok: true,  text: '2 Revisionsrunden' },
        { ok: true,  text: 'Eigentumsübertragung' },
        { ok: true,  text: 'Hosting-Einrichtung durch Leon' },
        { ok: true,  text: 'Videokurs (Inhaltspflege)' },
        { ok: true,  text: 'Personalisierter AI Agent' },
        { ok: false, text: 'Laufender Support & Updates' },
      ],
      note: 'Sie übernehmen Hosting, Updates und Sicherheit selbst.',
      highlight: false,
      recommended: false,
    },
    {
      id: 'c',
      label: 'All-in',
      price: '490 €',
      period: 'einmalig + 69 €/Monat',
      sub: 'Gesamtjahr 1: 1.318 € · Mindestlaufzeit 12 Monate',
      desc: 'Website plus laufender Betrieb — ohne eigenen Aufwand.',
      items: [
        { ok: true, text: 'Fertige Website' },
        { ok: true, text: '2 Revisionsrunden' },
        { ok: true, text: 'Eigentumsübertragung' },
        { ok: true, text: 'Hosting übernommen' },
        { ok: true, text: 'Videokurs (Inhaltspflege)' },
        { ok: true, text: 'Personalisierter AI Agent' },
        { ok: true, text: 'SSL, Sicherheits-Updates, Backups' },
      ],
      note: 'Hosting, Sicherheit und Updates sind enthalten.',
      highlight: true,
      recommended: true,
    },
  ];

  return (
    <Frame bg="#ffffff" padding="96px 24px">
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Eyebrow>Pakete</Eyebrow>
            <h2 style={{ marginTop: 20, fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.ink, marginBottom: 12 }}>
              Drei Optionen. <Serif color={B.ocker}>Eine Empfehlung.</Serif>
            </h2>
            <p style={{ fontSize: 15, color: B.muted, maxWidth: 440, marginInline: 'auto', lineHeight: 1.7 }}>
              Der Unterschied liegt nicht im Preis — sondern darin, wer den laufenden Betrieb übernimmt.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 16, marginTop: 48, alignItems: 'stretch' }}>
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 70} style={{ height: '100%' }}>
              <div style={{
                height: '100%', borderRadius: 20, overflow: 'hidden',
                border: pkg.highlight ? `2px solid ${B.yellow}` : '1px solid rgba(14,12,8,0.09)',
                boxShadow: pkg.highlight ? `0 0 0 4px rgba(232,168,0,0.08), 0 8px 40px rgba(14,12,8,0.10)` : '0 2px 16px rgba(14,12,8,0.05)',
                display: 'flex', flexDirection: 'column',
                background: pkg.highlight ? '#fff' : '#FAFAF8',
                position: 'relative',
              }}>
                {pkg.recommended && (
                  <div style={{ background: B.yellow, padding: '8px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: B.ink, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Empfohlen</span>
                  </div>
                )}
                <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: B.ocker, marginBottom: 12 }}>{pkg.label}</div>
                  <div style={{ fontSize: 'clamp(1.6rem,3vw,2rem)', fontWeight: 900, color: B.ink, letterSpacing: '-0.03em', lineHeight: 1 }}>{pkg.price}</div>
                  <div style={{ fontSize: 13, color: B.muted, marginTop: 4, marginBottom: 16 }}>{pkg.period}</div>
                  {pkg.sub && <div style={{ fontSize: 11, color: 'rgba(14,12,8,0.38)', marginBottom: 16, lineHeight: 1.5 }}>{pkg.sub}</div>}
                  <p style={{ fontSize: 13.5, color: 'rgba(14,12,8,0.6)', lineHeight: 1.65, marginBottom: 24, margin: '0 0 24px' }}>{pkg.desc}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    {pkg.items.map(item => (
                      <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: item.ok ? B.ink : 'rgba(14,12,8,0.28)' }}>
                        {item.ok ? <Check /> : <Cross />}
                        {item.text}
                      </div>
                    ))}
                  </div>

                  {pkg.note && (
                    <div style={{ marginTop: 20, padding: '10px 14px', borderRadius: 10,
                      background: pkg.highlight ? 'rgba(232,168,0,0.08)' : 'rgba(14,12,8,0.04)',
                      border: `1px solid ${pkg.highlight ? 'rgba(232,168,0,0.2)' : 'rgba(14,12,8,0.07)'}`,
                      fontSize: 12, color: pkg.highlight ? B.ocker : 'rgba(14,12,8,0.45)', lineHeight: 1.55,
                    }}>
                      {pkg.note}
                    </div>
                  )}

                  <div style={{ marginTop: 24 }}>
                    {pkg.highlight
                      ? <BtnPrimary label="Dieses Paket wählen" full />
                      : (
                        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          padding: '13px 20px', borderRadius: 100, width: '100%',
                          border: '1.5px solid rgba(14,12,8,0.12)', background: 'transparent',
                          color: B.muted, fontSize: 13, fontWeight: 700, textDecoration: 'none',
                          fontFamily: FONTS.sans,
                        }}>
                          Auswählen <ArrowRight size={13} />
                        </a>
                      )
                    }
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* AI Agent + Videokurs callout */}
        <Reveal delay={100}>
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 16 }}>
            {[
              {
                icon: '🤖',
                title: 'Personalisierter AI Agent',
                desc: 'Ein Claude-basierter Agent, trainiert auf Ihre Website. Er beantwortet Fragen wie: "Wie ändere ich meine Öffnungszeiten?" — ohne technisches Setup, per Link zugänglich.',
              },
              {
                icon: '🎬',
                title: 'Videokurs: Eigenständige Inhaltspflege',
                desc: 'Zeigt, wie Sie Texte, Bilder und Kontaktdaten selbst anpassen. Zeitaufwand unter 20 Minuten. Einmalig zugänglich, kein Ablaufdatum.',
              },
            ].map(item => (
              <div key={item.title} style={{ padding: '24px 20px', borderRadius: 16, border: '1px solid rgba(14,12,8,0.07)', background: 'rgba(14,12,8,0.02)' }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: B.ink, marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 13, color: B.muted, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                <div style={{ marginTop: 10, fontSize: 11, fontWeight: 700, color: B.ocker }}>In Paket B und C enthalten</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Frame>
  );
}

/* ─── Einwände ─── */
function Einwaende() {
  const [open, setOpen] = useState(0);
  const qs = [
    {
      q: 'Was, wenn mir das Ergebnis nicht gefällt?',
      a: 'Zwei Revisionsrunden sind vertraglich enthalten. Vor Übergabe erfolgt eine schriftliche Freigabe. Ohne Ihre Zustimmung keine Abschlusszahlung.',
    },
    {
      q: 'Was, wenn ich keine technischen Kenntnisse habe?',
      a: 'Die Übergabe enthält einen Videokurs, der zeigt, wie Sie Texte, Bilder und Kontaktdaten selbst anpassen — ohne Programmierkenntnisse. Zeitaufwand: unter 20 Minuten. Zusätzlich steht ein personalisierter AI Agent zur Verfügung, der Fragen zur eigenen Website beantwortet.',
    },
    {
      q: 'Bin ich dauerhaft auf Sie angewiesen?',
      a: 'Nein. Sie erhalten alle Quelldateien und vollständige Eigentumsrechte. Mit der Servicepauschale übernehme ich den laufenden Betrieb — auf Wunsch kündbar nach 12 Monaten.',
    },
  ];

  return (
    <Frame bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Eyebrow color={B.yellow}>Häufige Fragen</Eyebrow>
            <h2 style={{ marginTop: 18, fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.025em', color: B.cream }}>
              Drei Fragen, die <Serif color={B.yellow}>fast alle stellen.</Serif>
            </h2>
          </div>
        </Reveal>
        <div>
          {qs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} style={{
                borderTop: i === 0 ? '1px solid rgba(245,242,235,.10)' : 'none',
                borderBottom: '1px solid rgba(245,242,235,.10)',
                background: isOpen ? 'rgba(232,168,0,0.03)' : 'transparent',
              }}>
                <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', padding: '24px 4px', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                  fontFamily: FONTS.sans, textAlign: 'left',
                }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: isOpen ? B.yellow : B.cream }}>{item.q}</span>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: isOpen ? B.yellow : 'rgba(245,242,235,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, color: isOpen ? B.ink : 'rgba(245,242,235,.5)', fontWeight: 700,
                    transition: 'background .2s',
                  }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <p style={{ fontSize: 15, color: 'rgba(245,242,235,.55)', lineHeight: 1.75, padding: '0 4px 24px', margin: 0 }}>{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

/* ─── Terminbuchung ─── */
function Termin() {
  return (
    <Frame id="termin" bg={B.ink} padding="96px 24px 0" style={{ color: B.cream }}>
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <Eyebrow color={B.yellow}>Abschlussgespräch</Eyebrow>
          <h2 style={{ marginTop: 18, fontSize: 'clamp(1.6rem,4.5vw,3rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.025em', color: B.cream, marginBottom: 16 }}>
            Die offenen Fragen klären wir <Serif color={B.yellow}>in 15 Minuten.</Serif>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(245,242,235,.52)', lineHeight: 1.75, maxWidth: 500, marginInline: 'auto', marginBottom: 32 }}>
            Sie haben die Vorversion gesehen. Paket, Ablauf, Inhalte — das besprechen wir gemeinsam.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <BtnPrimary label="Termin buchen" />
            <a href={`mailto:${EMAIL}`} style={{ fontSize: 13, color: 'rgba(245,242,235,.35)', textDecoration: 'none', fontWeight: 600 }}>
              Oder direkt schreiben: {EMAIL}
            </a>
          </div>
        </div>
      </Reveal>

      <div style={{ maxWidth: 1000, margin: '0 auto', borderRadius: '20px 20px 0 0', overflow: 'hidden', border: '1px solid rgba(245,242,235,0.08)', borderBottom: 'none' }}>
        <iframe
          src={CALENDLY}
          width="100%"
          height="700"
          frameBorder="0"
          title="Termin buchen"
          style={{ display: 'block', background: '#fff' }}
        />
      </div>
    </Frame>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{
      background: B.ink, color: 'rgba(245,242,235,0.4)',
      padding: '32px', borderTop: '1px solid rgba(245,242,235,0.06)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      fontFamily: FONTS.sans,
    }}>
      <span style={{ fontSize: 13 }}>© 2025 Leon Seitz · <a href="https://paveo360.de" target="_blank" rel="noopener noreferrer" style={{ color: B.yellow, textDecoration: 'none' }}>Paveo</a></span>
      <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
        <a href="/impressum" style={{ color: 'inherit', textDecoration: 'none' }}>Impressum</a>
        <a href="/datenschutz" style={{ color: 'inherit', textDecoration: 'none' }}>Datenschutz</a>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function WebdesignPage() {
  return (
    <div style={{ fontFamily: FONTS.sans, overflowX: 'hidden', position: 'relative', maxWidth: '100vw' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { scroll-behavior: smooth; overflow-x: hidden; background: #0E0C08; }
        * { min-width: 0; }
        img, svg { max-width: 100%; }
        @media (max-width: 640px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
      <ScrollBar />
      <Hero />
      <WasErhalten />
      <Ablauf />
      <Pakete />
      <Einwaende />
      <Termin />
      <Footer />
    </div>
  );
}
