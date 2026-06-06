'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CALENDLY = 'https://calendly.com/hello-leonseitz/30min';

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
function Reveal({ children, delay = 0, style: extraStyle = {} }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(18px)',
      transition: `opacity .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

function Frame({ bg, padding = '96px 24px', children, style = {}, id }) {
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

function BtnPrimary({ label, href = CALENDLY, target = '_blank' }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '14px 28px', borderRadius: 100,
        background: h ? B.ocker : B.yellow, color: B.black,
        fontWeight: 800, fontSize: 14, textDecoration: 'none',
        boxShadow: h ? '0 4px 20px rgba(232,168,0,0.28)' : '0 2px 10px rgba(232,168,0,0.15)',
        transition: 'background .18s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: FONTS.sans,
      }}
    >
      {label}
      <ArrowRight size={15} />
    </a>
  );
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,235,0.25)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

/* ─── Hero ─── */
function HeroV2() {
  return (
    <Frame
      id="hero"
      bg="radial-gradient(1200px 700px at 50% -20%, rgba(232,168,0,.16), transparent 60%), linear-gradient(180deg, #0a0805 0%, #0E0C08 50%, #15110a 100%)"
      padding="0 28px"
      style={{ color: B.cream, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* noise */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")` }} />
      {/* grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.45 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(232,168,0,1)" strokeWidth="0.5" opacity="0.06" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Nav */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '24px 36px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: B.cream, textDecoration: 'none', fontWeight: 900, letterSpacing: '-0.01em' }}>
          Leon Seitz
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: B.yellow, boxShadow: '0 0 0 3px rgba(232,168,0,.2)', display: 'inline-block' }} />
        </a>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 100,
          border: '1px solid rgba(232,168,0,.32)', background: 'rgba(14,12,8,.55)',
          color: B.yellow, fontSize: 12, fontWeight: 700, textDecoration: 'none', backdropFilter: 'blur(6px)',
        }}>
          Kostenlose Analyse
        </a>
      </div>

      <Reveal>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem,7vw,5rem)', fontWeight: 900, lineHeight: 1.02,
            letterSpacing: '-0.035em', color: B.cream, marginBottom: 24 }}>
            In 24h besser als
            <br />
            deine Konkurrenz.
            <br />
            <Serif color={B.yellow}>Du zahlst nur, wenns dir gefällt.</Serif>
          </h1>
          <p style={{ fontSize: 'clamp(15px,1.8vw,17px)', color: 'rgba(245,242,235,0.58)', lineHeight: 1.75, maxWidth: 500, marginInline: 'auto', marginBottom: 40 }}>
            Deine optimierte Website ist fertig — vor unserem Kickoff-Meeting.
          </p>
          <BtnPrimary label="Kostenlose Analyse anfragen" />
        </div>
      </Reveal>
    </Frame>
  );
}

/* ─── Wie es läuft ─── */
function WieLäuft() {
  const steps = [
    {
      n: '01', title: 'Kurze Analyse', highlight: true,
      desc: 'Ich schaue mir deinen aktuellen Auftritt an — was fehlt, was schwächt, was deine Konkurrenz besser macht. Schriftlich und kostenlos.',
      badge: 'Kostenlos', time: 'in 24h',
    },
    {
      n: '02', title: 'Fertige Grundversion in 24h',
      desc: 'Deine optimierte Website — maßgeschneidert an deine Bedürfnisse. Keine Konzeptskizze, eine echte Seite im Browser.',
      badge: 'Vor dem Kickoff-Meeting', time: '24 Stunden',
    },
    {
      n: '03', title: 'Zahlung nur bei Zufriedenheit',
      desc: 'Zwei Revisionsrunden inklusive. Du zahlst nur, wenns dir gefällt. Kein Vertrag, keine Vorauskasse.',
      badge: 'Kein Ergebnis. Keine Zahlung.', time: '1–2 Wochen',
    },
  ];

  return (
    <Frame bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Eyebrow color={B.yellow}>Wie es läuft</Eyebrow>
            <h2 style={{ marginTop: 18, fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900,
              lineHeight: 1.08, letterSpacing: '-0.025em', color: B.cream, marginBottom: 16 }}>
              Du siehst das Ergebnis.
              <br />
              <Serif color={B.yellow}>Dann entscheidest du.</Serif>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 16, alignItems: 'stretch' }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} style={{ height: '100%' }}>
              <div style={{
                height: '100%', borderRadius: 20, padding: '32px 28px',
                background: s.highlight ? 'linear-gradient(145deg,rgba(232,168,0,.10),rgba(232,168,0,.03))' : 'rgba(245,242,235,.02)',
                border: `1.5px solid ${s.highlight ? 'rgba(232,168,0,.35)' : 'rgba(245,242,235,.07)'}`,
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: s.highlight ? B.yellow : 'rgba(245,242,235,0.07)',
                    color: s.highlight ? B.ink : 'rgba(245,242,235,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 900,
                  }}>{s.n}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: s.highlight ? B.cream : 'rgba(245,242,235,.7)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{s.title}</div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(245,242,235,.52)', margin: 0, flex: 1 }}>{s.desc}</p>
                <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(245,242,235,.06)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100,
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

        <Reveal delay={200}>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" />
          </div>
        </Reveal>
      </div>
    </Frame>
  );
}

/* ─── Google Reviews ─── */
const REVIEWS = [
  { name:'Oksana Hettinger', initials:'OH', color:'#4285F4', rating:5, date:'vor 3 Monaten', text:'Von der ersten Idee bis zur finalen Umsetzung alles auf sehr hohem professionellen Niveau. Meine Wünsche wurden vollständig berücksichtigt. Die Website ist modern, funktional und optisch sehr ansprechend.' },
  { name:'Dominic Hildebrandt', initials:'DH', color:'#34A853', rating:5, date:'vor 5 Monaten', text:'Ich kann Leon uneingeschränkt weiterempfehlen. Die Zusammenarbeit ist immer kooperativ, effektiv und zielführend.' },
  { name:'Ian', initials:'I', color:'#EA4335', rating:5, date:'vor 2 Monaten', text:'Schnelle Antworten, erstellt individuelle Top-Websites, Posts etc.' },
  { name:'Laura Janke', initials:'LJ', color:'#9C27B0', rating:5, date:'vor 1 Monat', text:'Zuverlässig — hält Fristen wie abgesprochen ein, gute zielführende Ideen, Top-Kommunikation.' },
  { name:'Pascal', initials:'P', color:'#0F9D58', rating:5, date:'vor 20 Stunden', text:'Klare und flexible Kommunikation. Schnelle und saubere Umsetzung nach einer ausführlichen Bedarfsanalyse. Unterstützung bei Hosting und weiteren Einstellungen. Dazu gratis Beratung zum Layout und Inhalt der Webseite.' },
  { name:'Michael Gärtner', initials:'MG', color:'#4285F4', rating:5, date:'', text:'Immer zuverlässig, spontan und qualitativ gearbeitet. Sehr zu empfehlen!' },
  { name:'Robin Disser', initials:'RD', color:'#EA4335', rating:5, date:'', text:'Super gutes Videoediting.' },
  { name:'Elija Wiessler', initials:'EW', color:'#FBBC05', rating:5, date:'', text:'Sehr hochwertige Websites, super gute Videos.' },
];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function StarsFilled({ n = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= n ? '#FBBC05' : '#333'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function GoogleReviewsSection() {
  return (
    <Frame bg="linear-gradient(180deg, #15110a 0%, #0E0C08 100%)" padding="56px 0 72px" style={{ color: B.cream }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, paddingInline: 36, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <GoogleIcon />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(245,242,235,.6)', letterSpacing: '0.04em' }}>Rezensionen</span>
          </div>
          <div style={{ width: 1, height: 18, background: 'rgba(245,242,235,.14)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: B.cream, lineHeight: 1 }}>5,0</span>
            <StarsFilled />
            <span style={{ fontSize: 12, color: 'rgba(245,242,235,.42)', fontWeight: 500 }}>Google</span>
          </div>
        </div>
      </Reveal>
      <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
        <div className="reviews-track" style={{ display: 'flex', gap: 14, padding: '6px 36px', width: 'max-content', animation: 'reviews-scroll 38s linear infinite' }}>
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <div key={i} style={{ width: 320, flexShrink: 0, background: 'rgba(245,242,235,.04)', border: '1px solid rgba(245,242,235,.10)', borderRadius: 14, padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{r.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: B.cream, lineHeight: 1.2 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(245,242,235,.45)', marginTop: 1 }}>{r.date}</div>
                </div>
                <div style={{ flexShrink: 0 }}><GoogleIcon /></div>
              </div>
              <StarsFilled n={r.rating} />
              <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'rgba(245,242,235,.7)' }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ─── GEO-Sektion ─── */
function GEOSection() {
  return (
    <Frame bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <div style={{ maxWidth: 920, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(400px,100%),1fr))', gap: 64, alignItems: 'center' }}>
        <Reveal>
          <div>
            <Eyebrow color={B.yellow}>GEO-Optimierung</Eyebrow>
            <h2 style={{ marginTop: 18, fontSize: 'clamp(1.6rem,4.5vw,2.8rem)', fontWeight: 900,
              lineHeight: 1.1, letterSpacing: '-0.025em', color: B.cream, marginBottom: 20 }}>
              Im Zeitalter von ChatGPT
              <br />
              <Serif color={B.yellow}>sichtbar bleiben.</Serif>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(245,242,235,.55)', lineHeight: 1.8, marginBottom: 16 }}>
              Kunden laufen mit einem Problem nicht mehr nur zu Google — sie fragen KI. Wer dort nicht auftaucht, existiert nicht.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(245,242,235,.55)', lineHeight: 1.8, marginBottom: 32 }}>
              Ich baue Websites mit gezielter GEO-Optimierung: Damit KI-Systeme dich kennen, einordnen und weiterempfehlen können.
            </p>
            <BtnPrimary label="Kostenlose Analyse anfragen" />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '🔍', title: 'Google bleibt wichtig — KI auch', desc: 'Beide Kanäle brauchen unterschiedliche Signale. Ich optimiere für beide gleichzeitig.' },
              { icon: '🤖', title: 'KI-lesbare Struktur', desc: 'Strukturierte Daten, klare Hierarchien, eindeutige Aussagen — damit ChatGPT & Co. dich korrekt einordnen.' },
              { icon: '📍', title: 'Lokale Sichtbarkeit', desc: 'Deine Branche, dein Standort, deine Leistungen — klar kommuniziert für lokale KI-Anfragen.' },
              { icon: '📈', title: 'Langfristiger Vorteil', desc: 'Die meisten Wettbewerber optimieren noch gar nicht für KI-Suche. Jetzt ist der richtige Zeitpunkt.' },
            ].map((item, i) => (
              <div key={item.title} style={{ padding: '20px 22px', borderRadius: 14, background: 'rgba(245,242,235,.03)', border: '1px solid rgba(245,242,235,.07)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: B.cream, marginBottom: 5 }}>{item.title}</div>
                  <p style={{ fontSize: 13, color: 'rgba(245,242,235,.48)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Frame>
  );
}

/* ─── Referenzen ─── */
const PROJEKTE = [
  {
    id: 'kfa', img: '/projekte/kfa.png',
    kategorie: 'Landing Page — Fundraising',
    name: 'KFA Aschaffenburg',
    desc: 'Konzept, Branding und Landing Page für eine Spendenkampagne — komplett ohne Werbebudget. Eigenverantwortlich umgesetzt.',
    url: 'https://kfa-fundraising.vercel.app/',
  },
  {
    id: 'star-doener', img: '/projekte/star-doener.png',
    kategorie: 'Website — Gastronomie',
    name: 'Star Döner',
    desc: 'Digitaler Auftritt und klare Conversion für ein lokales Restaurant. Mobil-first, schnell ladend.',
    url: 'https://star-doner-website.vercel.app/',
  },
  {
    id: 'angelo', img: '/projekte/angelo.png',
    kategorie: 'Website — Booking',
    name: 'Angelo DJ',
    desc: 'Direkte Buchungsstrecke und Branding für einen DJ. Keine Formulare, klares Auftreten.',
    url: 'https://angelo-site.vercel.app/',
  },
];

function ReferenzCard({ id, img, kategorie, name, desc, url, isEven }) {
  const [h, setH] = useState(false);
  const bgMap = { kfa: '#0c0c08', 'star-doener': '#0E0C08', angelo: '#15110a' };
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ textDecoration: 'none', display: 'block' }}>
      <div className="ref-card-grid" style={{ display: 'grid', gridTemplateColumns: isEven ? '.95fr 1.05fr' : '1.05fr .95fr',
        gap: 0, borderRadius: 20, overflow: 'hidden', background: '#0c0c08',
        transition: 'transform .25s, box-shadow .25s',
        transform: h ? 'translateY(-4px)' : 'none',
        boxShadow: h ? '0 16px 48px rgba(14,12,8,0.12)' : '0 4px 20px rgba(14,12,8,0.06)' }}>
        <div className="ref-card-img" style={{ position: 'relative', minHeight: 280, overflow: 'hidden',
          background: bgMap[id] || '#0c0c08', display: 'flex', alignItems: 'center', justifyContent: 'center',
          order: isEven ? 2 : 0 }}>
          <img src={img} alt={name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            transform: h ? 'scale(1.04)' : 'scale(1)', transition: 'transform .5s' }}
            onError={e => { e.currentTarget.style.display = 'none'; }} />
        </div>
        <div className="ref-card-text" style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: B.ocker, marginBottom: 10 }}>{kategorie}</div>
          <div style={{ fontSize: 'clamp(1.2rem,2vw,1.6rem)', fontWeight: 900, color: B.cream, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 14 }}>{name}</div>
          <p style={{ fontSize: 15, color: 'rgba(245,242,235,0.52)', lineHeight: 1.75, margin: 0, marginBottom: 24 }}>{desc}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700,
            color: h ? B.ocker : 'rgba(245,242,235,0.35)', transition: 'color .2s' }}>
            Projekt ansehen <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </a>
  );
}

function ReferenzenSection() {
  return (
    <Frame id="referenzen" bg="#ffffff" padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>Referenzen</Eyebrow>
          <h2 style={{ marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)', fontWeight: 900, lineHeight: 1.1,
            letterSpacing: '-0.02em', color: B.black }}>
            Das sind <Serif color={B.ocker}>meine Projekte.</Serif>
          </h2>
        </div>
      </Reveal>
      <div style={{ maxWidth: 920, margin: '48px auto 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {PROJEKTE.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}><ReferenzCard {...p} isEven={i % 2 === 1} /></Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* ─── Pakete ─── */
function PaketeSection() {
  const packages = [
    {
      id: 'a', label: 'Website', price: '490 €', period: 'einmalig',
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
      note: null, highlight: false, recommended: false,
    },
    {
      id: 'b', label: 'Eigenständig', price: '890 €', period: 'einmalig',
      desc: 'Website plus Werkzeuge zur eigenständigen Verwaltung.',
      items: [
        { ok: true,  text: 'Fertige Website' },
        { ok: true,  text: '2 Revisionsrunden' },
        { ok: true,  text: 'Eigentumsübertragung' },
        { ok: true,  text: 'Hosting-Einrichtung' },
        { ok: true,  text: 'Videokurs (Inhaltspflege)' },
        { ok: true,  text: 'Personalisierter AI Agent' },
        { ok: false, text: 'Laufender Support & Updates' },
      ],
      note: 'Du übernimmst Hosting, Updates und Sicherheit selbst.',
      highlight: false, recommended: false,
    },
    {
      id: 'c', label: 'Servicepauschale', price: '490 €', period: 'einmalig + 69 €/Monat',
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
      highlight: true, recommended: true,
    },
  ];

  return (
    <Frame bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Eyebrow color={B.yellow}>Pakete</Eyebrow>
            <h2 style={{ marginTop: 20, fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 900,
              lineHeight: 1.1, letterSpacing: '-0.025em', color: B.cream, marginBottom: 12 }}>
              Drei Optionen. <Serif color={B.yellow}>Eine Empfehlung.</Serif>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(245,242,235,.5)', maxWidth: 440, marginInline: 'auto', lineHeight: 1.7 }}>
              Der Unterschied liegt nicht im Preis — sondern darin, wer den laufenden Betrieb übernimmt.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 16, marginTop: 48, alignItems: 'stretch' }}>
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 70} style={{ height: '100%' }}>
              <div style={{
                height: '100%', borderRadius: 20, overflow: 'hidden',
                border: pkg.highlight ? `2px solid ${B.yellow}` : '1px solid rgba(245,242,235,.08)',
                boxShadow: pkg.highlight ? `0 0 0 4px rgba(232,168,0,0.08)` : 'none',
                display: 'flex', flexDirection: 'column',
                background: pkg.highlight ? 'linear-gradient(145deg,rgba(232,168,0,.08),rgba(232,168,0,.02))' : 'rgba(245,242,235,.02)',
                position: 'relative',
              }}>
                {pkg.recommended && (
                  <div style={{ background: B.yellow, padding: '8px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: B.ink, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Empfohlen</span>
                  </div>
                )}
                <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: B.yellow, marginBottom: 12 }}>{pkg.label}</div>
                  <div style={{ fontSize: 'clamp(1.6rem,3vw,2rem)', fontWeight: 900, color: B.cream, letterSpacing: '-0.03em', lineHeight: 1 }}>{pkg.price}</div>
                  <div style={{ fontSize: 13, color: 'rgba(245,242,235,.45)', marginTop: 4, marginBottom: 16 }}>{pkg.period}</div>
                  {pkg.sub && <div style={{ fontSize: 11, color: 'rgba(245,242,235,.3)', marginBottom: 16, lineHeight: 1.5 }}>{pkg.sub}</div>}
                  <p style={{ fontSize: 13.5, color: 'rgba(245,242,235,.5)', lineHeight: 1.65, marginBottom: 24 }}>{pkg.desc}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    {pkg.items.map(item => (
                      <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5,
                        color: item.ok ? B.cream : 'rgba(245,242,235,.28)' }}>
                        {item.ok ? <Check /> : <Cross />}
                        {item.text}
                      </div>
                    ))}
                  </div>

                  {pkg.note && (
                    <div style={{ marginTop: 20, padding: '10px 14px', borderRadius: 10,
                      background: pkg.highlight ? 'rgba(232,168,0,0.08)' : 'rgba(245,242,235,.04)',
                      border: `1px solid ${pkg.highlight ? 'rgba(232,168,0,0.2)' : 'rgba(245,242,235,.08)'}`,
                      fontSize: 12, color: pkg.highlight ? B.yellow : 'rgba(245,242,235,.4)', lineHeight: 1.55,
                    }}>{pkg.note}</div>
                  )}

                  <div style={{ marginTop: 24 }}>
                    {pkg.highlight
                      ? (
                        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          padding: '13px 20px', borderRadius: 100, width: '100%',
                          background: B.yellow, color: B.ink,
                          fontSize: 14, fontWeight: 800, textDecoration: 'none', fontFamily: FONTS.sans,
                        }}>
                          Dieses Paket wählen <ArrowRight size={14} />
                        </a>
                      ) : (
                        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          padding: '13px 20px', borderRadius: 100, width: '100%',
                          border: '1px solid rgba(245,242,235,.15)', background: 'transparent',
                          color: 'rgba(245,242,235,.5)', fontSize: 13, fontWeight: 700, textDecoration: 'none', fontFamily: FONTS.sans,
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
      </div>
    </Frame>
  );
}

/* ─── Finaler CTA ─── */
function FinalCTA() {
  return (
    <Frame id="analyse" bg={B.ink} padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow color={B.yellow}>Kostenlose Analyse</Eyebrow>
          <h2 style={{ marginTop: 18, fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900,
            lineHeight: 1.08, letterSpacing: '-0.025em', color: B.cream, marginBottom: 16 }}>
            Kostenlose Analyse —
            <br />
            <Serif color={B.yellow}>in 24h in deinem Postfach.</Serif>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(245,242,235,.52)', lineHeight: 1.8, maxWidth: 500, marginInline: 'auto', marginBottom: 36 }}>
            Kein Commitment. Kein Paket. Nur eine ehrliche Einschätzung, was bei dir fehlt und was ich ändern würde.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <BtnPrimary label="Jetzt anfragen" />
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Kostenlos', 'Kein Commitment', 'In 24h'].map(t => (
                <span key={t} style={{ fontSize: 12, color: 'rgba(245,242,235,.35)', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{
      background: B.ink, borderTop: '1px solid rgba(245,242,235,.07)',
      padding: '32px', fontFamily: FONTS.sans,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
    }}>
      <span style={{ fontSize: 13, color: 'rgba(245,242,235,.35)' }}>© 2025 Leon Seitz</span>
      <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
        {[
          { label: 'Impressum', href: '/impressum' },
          { label: 'Datenschutz', href: '/datenschutz' },
          { label: 'AGB', href: '/agb' },
        ].map(l => (
          <a key={l.href} href={l.href} style={{ color: 'rgba(245,242,235,.35)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = B.yellow}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,242,235,.35)'}
          >{l.label}</a>
        ))}
        <a href="mailto:hello@leonseitz.com" style={{ color: 'rgba(245,242,235,.35)', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.color = B.yellow}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,242,235,.35)'}
        >
          <Mail size={14} />
        </a>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <div style={{ fontFamily: FONTS.sans, overflowX: 'hidden', position: 'relative', maxWidth: '100vw' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { scroll-behavior: smooth; overflow-x: hidden; max-width: 100vw; width: 100%; background: #0E0C08; }
        * { min-width: 0; box-sizing: border-box; }
        img, svg { max-width: 100%; }
        @media (max-width: 760px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
          h1, h2 { word-break: normal; }
        }
        @media (max-width: 600px) {
          .ref-card-grid { grid-template-columns: 1fr !important; }
          .ref-card-img  { min-height: 220px !important; order: 0 !important; }
          .ref-card-text { padding: 24px 20px !important; }
        }
        @keyframes reviews-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .reviews-track:hover { animation-play-state: paused; }
      `}</style>

      <ScrollBar />
      <HeroV2 />
      <WieLäuft />
      <GoogleReviewsSection />
      <GEOSection />
      <ReferenzenSection />
      <PaketeSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
