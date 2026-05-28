'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Constants ─── */
const CALENDLY = 'https://calendly.com/hello-leonseitz/30min';

const B = {
  yellow:  '#E8A800',
  ocker:   '#C68F00',
  black:   '#0E0C08',
  ink:     '#111110',
  cream:   '#FAFAF8',
  border:  'rgba(14,12,8,0.08)',
  muted:   'rgba(14,12,8,0.50)',
  subtle:  'rgba(14,12,8,0.36)',
};

const FONTS = {
  sans:  "'Plus Jakarta Sans',system-ui,sans-serif",
  serif: "'DM Serif Display',Georgia,serif",
};

/* ─── Scroll reveal ─── */
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

function Reveal({ children, delay = 0, style: extra = {} }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(20px)',
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      ...extra,
    }}>
      {children}
    </div>
  );
}

/* ─── Serif highlight ─── */
function S({ children, color = B.yellow }) {
  return (
    <em style={{ fontFamily: FONTS.serif, fontStyle: 'italic', color }}>{children}</em>
  );
}

/* ─── Scroll progress bar ─── */
function ProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setP(d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight));
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 999, background: 'rgba(14,12,8,0.06)' }}>
      <div style={{ height: '100%', background: B.yellow, width: `${p * 100}%`, transition: 'width 60ms linear' }} />
    </div>
  );
}

/* ─── Stars ─── */
function Stars({ n = 5 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FBBC05">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/* ─── Pill badge ─── */
function Pill({ children, color = B.yellow, bg }) {
  return (
    <span style={{
      display: 'inline-block', padding: '4px 12px', borderRadius: 100,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
      background: bg || `${color}18`, color,
      border: `1px solid ${color}30`,
    }}>
      {children}
    </span>
  );
}

/* ─── Check icon ─── */
function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─── CTA Button ─── */
function Btn({ label = 'Jetzt anfragen', size = 'md', full = false }) {
  const [h, setH] = useState(false);
  const pad = size === 'lg' ? '16px 36px' : '13px 28px';
  const fs = size === 'lg' ? 15 : 13;
  return (
    <a
      href={CALENDLY} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: full ? 'flex' : 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: pad, borderRadius: 100,
        background: h ? B.ocker : B.yellow,
        color: B.black, fontWeight: 800, fontSize: fs,
        textDecoration: 'none', fontFamily: FONTS.sans,
        boxShadow: h ? '0 6px 24px rgba(232,168,0,0.32)' : '0 2px 12px rgba(232,168,0,0.18)',
        transition: 'background .18s, box-shadow .18s',
        width: full ? '100%' : undefined,
      }}
    >
      {label} →
    </a>
  );
}

/* ─── Metric card ─── */
function MetricCard({ value, label, sub, good = true }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: '24px 28px',
      border: `1px solid ${B.border}`, textAlign: 'center',
      boxShadow: '0 2px 16px rgba(14,12,8,0.05)',
    }}>
      <div style={{
        fontSize: 42, fontWeight: 900, letterSpacing: '-0.04em',
        color: good ? '#0f9d58' : B.ink, lineHeight: 1, marginBottom: 6,
        fontFamily: FONTS.sans,
      }}>
        {value}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: B.ink, marginBottom: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: B.muted }}>{sub}</div>}
    </div>
  );
}

/* ─── Process step ─── */
function Step({ n, title, desc, badge, highlight }) {
  return (
    <div style={{
      background: highlight ? `linear-gradient(135deg, ${B.yellow}14, ${B.yellow}06)` : '#fff',
      border: `1.5px solid ${highlight ? B.yellow + '40' : B.border}`,
      borderRadius: 20, padding: '32px 28px', position: 'relative',
      boxShadow: highlight ? `0 0 0 4px ${B.yellow}10` : '0 2px 16px rgba(14,12,8,0.04)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
          background: highlight ? B.yellow : 'rgba(14,12,8,0.06)',
          color: highlight ? B.black : B.muted,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 900,
        }}>
          {n}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: B.ink, lineHeight: 1.25, marginBottom: 8 }}>{title}</div>
          <p style={{ fontSize: 14, color: B.muted, lineHeight: 1.7, margin: 0 }}>{desc}</p>
        </div>
      </div>
      {badge && (
        <div style={{ paddingTop: 16, borderTop: `1px solid ${B.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pill>{badge.label}</Pill>
          {badge.time && <span style={{ fontSize: 11, fontWeight: 700, color: B.subtle, letterSpacing: '0.04em' }}>{badge.time}</span>}
        </div>
      )}
    </div>
  );
}

/* ─── Feature item ─── */
function Feature({ title, desc }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, background: `${B.yellow}16`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
      }}>
        <Check />
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: B.ink, marginBottom: 3 }}>{title}</div>
        <p style={{ fontSize: 13, color: B.muted, lineHeight: 1.65, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ─── Projekt card ─── */
const PROJEKTE = [
  {
    id: 'kfa', img: '/projekte/kfa.png',
    label: 'Fundraising · Non-Profit',
    name: 'KFA Aschaffenburg',
    desc: 'Konzept, Branding und Landing Page für eine Spendenkampagne — ohne Werbebudget. Komplett eigenständig umgesetzt.',
    url: 'https://kfa-fundraising.vercel.app',
  },
  {
    id: 'angelo', img: '/projekte/angelo.png',
    label: 'Booking · Musik',
    name: 'Angelo DJ',
    desc: 'Direkte Buchungsstrecke und Branding für einen DJ. Klare Conversion-Architektur, keine Ablenkung.',
    url: 'https://angelodj.de',
  },
  {
    id: 'star', img: '/projekte/star-doener.png',
    label: 'Gastronomie · Lokal',
    name: 'Star Döner',
    desc: 'Digitaler Auftritt und klare Conversion für ein lokales Restaurant. Mobil-first, schnell ladend.',
    url: null,
  },
];

function ProjektCard({ img, label, name, desc, url, flip }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'grid', gridTemplateColumns: flip ? '1fr 1fr' : '1fr 1fr',
        borderRadius: 20, overflow: 'hidden',
        border: `1px solid ${h ? B.yellow + '40' : B.border}`,
        transform: h ? 'translateY(-3px)' : 'none',
        boxShadow: h ? '0 12px 40px rgba(14,12,8,0.10)' : '0 2px 12px rgba(14,12,8,0.05)',
        transition: 'all .25s',
        background: '#fff',
      }}
    >
      {/* image */}
      <div style={{
        order: flip ? 1 : 0, position: 'relative', minHeight: 240,
        background: '#0c0c08', overflow: 'hidden',
      }}>
        <img src={img} alt={name} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          transform: h ? 'scale(1.04)' : 'scale(1)', transition: 'transform .5s',
        }} onError={e => { e.currentTarget.style.display = 'none'; }} />
      </div>
      {/* text */}
      <div style={{ order: flip ? 0 : 1, padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: B.ocker, marginBottom: 10 }}>{label}</div>
        <div style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 900, color: B.ink, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>{name}</div>
        <p style={{ fontSize: 14, color: B.muted, lineHeight: 1.75, margin: 0, marginBottom: 20 }}>{desc}</p>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: h ? B.ocker : B.subtle, textDecoration: 'none', transition: 'color .2s' }}>
            Projekt ansehen →
          </a>
        ) : (
          <span style={{ fontSize: 13, fontWeight: 600, color: B.subtle }}>Auf Anfrage</span>
        )}
      </div>
    </div>
  );
}

/* ─── Review card ─── */
const REVIEWS = [
  { name: 'Pascal', sub: 'Local Guide', text: 'Klare und flexible Kommunikation. Schnelle und saubere Umsetzung nach einer ausführlichen Bedarfsanalyse. Unterstützung bei Hosting und weiteren Einstellungen.' },
  { name: 'Oksana Hettinger', sub: 'Google Rezension', text: 'Von der ersten Idee bis zur finalen Umsetzung alles auf sehr hohem professionellen Niveau. Meine Wünsche wurden vollständig berücksichtigt.' },
  { name: 'Michael Gärtner', sub: 'Google Rezension', text: 'Immer zuverlässig, spontan und qualitativ gearbeitet. Sehr zu empfehlen!' },
  { name: 'Laura Janke', sub: 'Google Rezension', text: 'Zuverlässig — hält Fristen wie abgesprochen ein, gute zielführende Ideen, Top-Kommunikation.' },
];

function ReviewCard({ name, sub, text }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: '28px 24px',
      border: `1px solid ${B.border}`, display: 'flex', flexDirection: 'column', gap: 14,
      boxShadow: '0 2px 12px rgba(14,12,8,0.04)',
    }}>
      <Stars />
      <p style={{ fontSize: 14, color: B.ink, lineHeight: 1.7, margin: 0, flex: 1 }}>&#8222;{text}&#8220;</p>
      <div>
        <div style={{ fontSize: 13, fontWeight: 800, color: B.ink }}>{name}</div>
        <div style={{ fontSize: 11, color: B.muted, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

/* ─── FAQ ─── */
const FAQS = [
  { q: 'Was kostet eine Website?', a: 'Das hängt vom Umfang ab — aber Phase 0 ist kostenlos. Ich schaue mir an, was du brauchst, und nenne dir einen konkreten Preis. Keine versteckten Kosten.' },
  { q: 'Wie schnell kann ich eine Website haben?', a: 'Erster Entwurf in 24–48 Stunden nach unserem Gespräch. Finale Umsetzung je nach Feedback in 1–2 Wochen.' },
  { q: 'Was, wenn mir der Entwurf nicht gefällt?', a: 'Dann zahlst du nichts. Das ist kein Marketing-Versprechen — ich arbeite ohne Vorauskasse, weil ich von meiner Arbeit überzeugt bin.' },
  { q: 'Muss ich technisch versiert sein?', a: 'Nein. Du bekommst eine fertige Website, die du selbst bedienen kannst. Ich erkläre alles Schritt für Schritt.' },
  { q: 'Machst du auch Hosting und Domain?', a: 'Ja. Ich helfe dir bei allem rund um die Website — von der Domain bis zum Launch. Auf Wunsch auch Pflege und Updates danach.' },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} style={{
            borderBottom: `1px solid ${B.border}`,
            borderTop: i === 0 ? `1px solid ${B.border}` : 'none',
          }}>
            <button
              type="button" onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: '100%', padding: '20px 4px', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                fontFamily: FONTS.sans, textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: B.ink }}>{f.q}</span>
              <span style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: isOpen ? B.yellow : 'rgba(14,12,8,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: isOpen ? B.black : B.muted, fontWeight: 700,
                transition: 'background .2s',
              }}>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <p style={{ fontSize: 14, color: B.muted, lineHeight: 1.75, padding: '0 4px 20px', margin: 0 }}>{f.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── PAGE ─── */
export default function WebdesignPage() {
  return (
    <div style={{ fontFamily: FONTS.sans, background: B.cream, overflowX: 'hidden', color: B.ink }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${B.cream}; overflow-x: hidden; }
        img, svg { max-width: 100%; }
        @media (max-width: 640px) {
          .proj-grid { grid-template-columns: 1fr !important; }
          .proj-img  { min-height: 200px !important; order: 0 !important; }
          .proj-text { padding: 24px 20px !important; }
          .rev-grid  { grid-template-columns: 1fr 1fr !important; }
          .hero-trust { flex-direction: column !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .rev-grid { grid-template-columns: 1fr !important; }
          .metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <ProgressBar />

      {/* ─── NAV ─── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${B.border}`,
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="https://leonseitz.com" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 900, fontSize: 15, color: B.ink }}>Leon Seitz</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: B.muted, padding: '2px 8px', background: `${B.yellow}18`, borderRadius: 100, border: `1px solid ${B.yellow}30` }}>Webdesign</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="tel:+4916095757167" style={{ fontSize: 13, fontWeight: 600, color: B.muted, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
            +49 160 9575 7167
          </a>
          <Btn label="Termin buchen" />
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ padding: 'clamp(72px,10vw,120px) 24px clamp(64px,8vw,96px)', textAlign: 'center', maxWidth: 860, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: 20 }}>
            <Pill>Erster Entwurf in 24h · Du zahlst erst, wenn es gefällt</Pill>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.2rem,6vw,4.2rem)', fontWeight: 900, lineHeight: 1.04,
            letterSpacing: '-0.035em', color: B.ink, marginBottom: 24,
          }}>
            Eine Website, die<br />
            <S>wirklich konvertiert.</S>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: B.muted, lineHeight: 1.75, maxWidth: 560, marginInline: 'auto', marginBottom: 36 }}>
            Ich baue Websites, die Besucher zu Kunden machen — individuell, schnell und ohne Risiko. Kein Template. Kein Paket.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Btn label="Kostenloses Erstgespräch buchen" size="lg" />
            <a href="#projekte" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '16px 28px',
              borderRadius: 100, border: `1.5px solid ${B.border}`,
              fontSize: 14, fontWeight: 700, color: B.muted, textDecoration: 'none',
            }}>
              Projekte ansehen
            </a>
          </div>
        </Reveal>

        {/* Trust row */}
        <Reveal delay={120}>
          <div className="hero-trust" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 28, marginTop: 48, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Stars />
              <span style={{ fontSize: 13, fontWeight: 700, color: B.ink }}>4.9 / 5.0</span>
              <span style={{ fontSize: 13, color: B.muted }}>Google</span>
            </div>
            <div style={{ width: 1, height: 20, background: B.border }} />
            <div style={{ fontSize: 13, color: B.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Kein Ergebnis. Keine Zahlung.
            </div>
            <div style={{ width: 1, height: 20, background: B.border }} />
            <div style={{ fontSize: 13, color: B.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Erster Entwurf in 24h
            </div>
            <div style={{ width: 1, height: 20, background: B.border }} />
            <div style={{ fontSize: 13, color: B.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.yellow} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Ohne Vertrag
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── METRICS ─── */}
      <section style={{ background: '#fff', borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}`, padding: 'clamp(56px,7vw,80px) 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, letterSpacing: '-0.025em', color: B.ink, marginBottom: 12 }}>
                Was eine gute Website <S color={B.ocker}>messbar</S> liefert.
              </h2>
              <p style={{ fontSize: 15, color: B.muted, lineHeight: 1.7, maxWidth: 480, marginInline: 'auto' }}>
                Meine Projekte werden auf Performance, SEO und Conversion gebaut — keine Kompromisse.
              </p>
            </div>
          </Reveal>
          <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {[
              { value: '99', label: 'Performance', sub: 'Google Lighthouse' },
              { value: '95+', label: 'SEO Score', sub: 'Lighthouse Audit' },
              { value: '24h', label: 'Erster Entwurf', sub: 'Nach dem Gespräch', good: false },
              { value: '0€', label: 'Voraus­kasse', sub: 'Zahlung bei Zufriedenheit', good: false },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 60}>
                <MetricCard {...m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEISTUNGEN ─── */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(420px,100%),1fr))', gap: 56, alignItems: 'center' }}>
          <Reveal>
            <div>
              <Pill style={{ marginBottom: 16 }}>Was du bekommst</Pill>
              <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, color: B.ink, marginTop: 16, marginBottom: 20 }}>
                Alles aus einer Hand. <S color={B.ocker}>Ohne Overhead.</S>
              </h2>
              <p style={{ fontSize: 15, color: B.muted, lineHeight: 1.75, marginBottom: 36 }}>
                Du sprichst direkt mit mir — kein Account-Manager, kein Projektleiter. Von der ersten Idee bis zum Launch.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Feature title="Individuelles Design" desc="Kein Template, kein Baukastensystem. Jede Website wird von Grund auf nach deinen Anforderungen gebaut." />
                <Feature title="Mobil-first & blitzschnell" desc="Optimiert für Google Lighthouse: 99 Performance, korrekte Darstellung auf jedem Gerät." />
                <Feature title="SEO-Grundstruktur" desc="Saubere Seitenstruktur, Meta-Tags, Ladezeit — damit Google dich findet, ohne extra Agentur." />
                <Feature title="Copywriting inkludiert" desc="Ich schreibe die Texte mit dir gemeinsam — auf Wunsch auch komplett für dich." />
                <Feature title="Launch & Hosting" desc="Domain, Hosting, SSL, E-Mail-Weiterleitung — alles eingerichtet und erklärt." />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{
              background: '#fff', borderRadius: 24, padding: 32, border: `1px solid ${B.border}`,
              boxShadow: '0 8px 40px rgba(14,12,8,0.07)',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: B.muted, marginBottom: 20, letterSpacing: '0.04em' }}>INBEGRIFFEN</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Design & Konzept', 'Entwicklung & Programmierung',
                  'Copywriting (auf Wunsch)', 'Responsives Design (Mobile, Tablet)',
                  'Performance-Optimierung', 'SEO-Grundstruktur',
                  'Domain & Hosting Setup', 'Google Analytics / Datenschutz',
                  'Kostenlose Erstanalyse', 'Korrekturrunden bis es passt',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: B.ink }}>
                    <Check />
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${B.border}` }}>
                <Btn label="Kostenlos starten" full />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PROZESS ─── */}
      <section style={{ background: B.ink, padding: 'clamp(72px,9vw,112px) 24px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Pill color="#fff" bg="rgba(255,255,255,0.08)">Wie es läuft</Pill>
              <h2 style={{ marginTop: 18, fontSize: 'clamp(1.5rem,4vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.025em', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
                Vom Gespräch zur fertigen Website.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 460, marginInline: 'auto' }}>
                Ich arbeite agil — schnelle Iteration, kein langer Vorlauf, du siehst Ergebnisse bevor du zahlst.
              </p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 16 }}>
            {[
              {
                n: '0', title: 'Kostenlose Analyse', highlight: true,
                desc: 'Wir reden 30 Minuten. Ich verstehe deinen Betrieb, deine Ziele, deine Zielgruppe — und erkläre, was ich bauen würde.',
                badge: { label: 'Kostenlos', time: '30 Minuten' },
              },
              {
                n: '1', title: 'Erster Entwurf in 24h',
                desc: 'Du bekommst einen konkreten Entwurf — Design, Struktur, Texte. Kein Mockup, sondern eine echte Seite im Browser.',
                badge: { label: 'Zahlung erst wenn du zufrieden bist', time: '24–48h' },
              },
              {
                n: '2', title: 'Feinschliff & Launch',
                desc: 'Wir iterieren bis es passt. Dann geht die Seite live — Domain, Hosting, alles eingerichtet.',
                badge: { label: 'Kein Ergebnis. Keine Zahlung.', time: '1–2 Wochen' },
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <Step {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJEKTE ─── */}
      <section id="projekte" style={{ padding: 'clamp(72px,9vw,112px) 24px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Pill>Referenzen</Pill>
              <h2 style={{ marginTop: 18, fontSize: 'clamp(1.5rem,4vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.025em', color: B.ink, lineHeight: 1.1 }}>
                Das sind <S color={B.ocker}>meine Projekte.</S>
              </h2>
            </div>
          </Reveal>
          <div className="proj-grid" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {PROJEKTE.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProjektCard {...p} flip={i % 2 === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section style={{ background: '#fff', borderTop: `1px solid ${B.border}`, padding: 'clamp(72px,9vw,112px) 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Stars />
                <span style={{ fontWeight: 900, fontSize: 18, color: B.ink }}>4.9 / 5.0</span>
                <span style={{ fontSize: 14, color: B.muted }}>· Google Rezensionen</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.2rem)', fontWeight: 900, letterSpacing: '-0.025em', color: B.ink }}>
                Was Kunden <S color={B.ocker}>sagen.</S>
              </h2>
            </div>
          </Reveal>
          <div className="rev-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 60}>
                <ReviewCard {...r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <Pill>FAQ</Pill>
              <h2 style={{ marginTop: 18, fontSize: 'clamp(1.4rem,3.5vw,2.2rem)', fontWeight: 900, letterSpacing: '-0.025em', color: B.ink }}>
                Häufige Fragen.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}><FAQ /></Reveal>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ background: B.yellow, padding: 'clamp(56px,7vw,80px) 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(1.6rem,4.5vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', color: B.black, lineHeight: 1.1, marginBottom: 16 }}>
              Bereit für deine neue Website?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(14,12,8,0.65)', lineHeight: 1.7, marginBottom: 32, maxWidth: 440, marginInline: 'auto' }}>
              Buche ein kostenloses 30-Minuten-Gespräch. Kein Commitment, keine Rechnung ohne dein Okay.
            </p>
            <a
              href={CALENDLY} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 36px', borderRadius: 100,
                background: B.black, color: '#fff',
                fontWeight: 800, fontSize: 15, textDecoration: 'none',
                fontFamily: FONTS.sans,
                boxShadow: '0 6px 24px rgba(14,12,8,0.25)',
              }}
            >
              Kostenloses Erstgespräch buchen →
            </a>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
              {['Kostenlos', 'Kein Vertrag', 'Antwort heute'].map(t => (
                <span key={t} style={{ fontSize: 13, color: 'rgba(14,12,8,0.55)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CALENDLY EMBED ─── */}
      <section style={{ background: B.cream, padding: 'clamp(72px,9vw,100px) 24px 0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.2rem)', fontWeight: 900, letterSpacing: '-0.025em', color: B.ink, marginBottom: 10 }}>
                Direkt einen Termin <S color={B.ocker}>sichern.</S>
              </h2>
              <p style={{ fontSize: 15, color: B.muted }}>30 Minuten. Kostenlos. Kein Commitment.</p>
            </div>
          </Reveal>
          <div style={{ borderRadius: '20px 20px 0 0', overflow: 'hidden', border: `1px solid ${B.border}`, borderBottom: 'none' }}>
            <iframe
              src={CALENDLY}
              width="100%"
              height="700"
              frameBorder="0"
              title="Termin buchen"
              style={{ display: 'block', background: '#fff' }}
            />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: B.black, color: 'rgba(245,242,235,0.45)', padding: '36px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 13 }}>
          © 2025 Leon Seitz · <a href="https://paveo360.de" target="_blank" rel="noopener noreferrer" style={{ color: B.yellow, textDecoration: 'none' }}>Paveo</a>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
          <a href="/impressum" style={{ color: 'inherit', textDecoration: 'none' }}>Impressum</a>
          <a href="/datenschutz" style={{ color: 'inherit', textDecoration: 'none' }}>Datenschutz</a>
          <a href="mailto:hello@leonseitz.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@leonseitz.com</a>
        </div>
      </footer>
    </div>
  );
}
