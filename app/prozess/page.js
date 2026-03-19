'use client';

import { ArrowRight, CheckCircle2, Shield, Mail } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

/* ─── TOKENS ─── */
const B = {
  yellow: '#E8A800', ocker: '#C68F00',
  black:  '#0E0C08', cream: '#F5F2EB', dark: '#2A2720',
};

/* ─── WHATSAPP ─── */
const WA_HREF = `https://wa.me/4916095757167?text=${encodeURIComponent(
  'Hi Leon,\n\nKurz zu meinem Vorhaben:\n- Branche:\n- Ziel:\n- Deadline:\n- Aktueller Auftritt (Website / Social / Flyer):\n\nDanke!'
)}`;

/* ─── HOOKS ─── */
function useReveal(ref, threshold = 0.08) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
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

/* ─── PRIMITIVES ─── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(20px)',
      transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Tag({ children, light = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 12px', borderRadius: 100, fontSize: 11,
      fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      background: light ? B.black : B.yellow,
      color: light ? B.cream : B.black,
    }}>
      {children}
    </span>
  );
}

function SerifAccent({ children, col }) {
  return (
    <em style={{
      fontFamily: "'DM Serif Display',Georgia,serif",
      fontStyle: 'italic', fontWeight: 400,
      color: col || 'inherit',
    }}>
      {children}
    </em>
  );
}

function ScrollBar() {
  const p = useScrollProgress();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, pointerEvents: 'none' }}>
      <div style={{ height: 3, background: 'rgba(232,168,0,0.15)' }}>
        <div style={{ height: '100%', width: `${Math.round(p * 100)}%`, background: B.yellow, transition: 'width 80ms linear' }} />
      </div>
    </div>
  );
}

function BtnPrimary({ label, href, target }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '14px 30px', borderRadius: 100,
        background: h ? B.ocker : B.yellow,
        color: B.black, fontWeight: 800, fontSize: 15,
        textDecoration: 'none', transition: 'background .18s',
        letterSpacing: '-0.01em',
      }}>
      {label} <ArrowRight size={16} />
    </a>
  );
}

function BtnGhost({ label, href, dark = true }) {
  const [h, setH] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '14px 26px', borderRadius: 100,
        border: `1px solid ${h
          ? (dark ? 'rgba(245,242,235,.45)' : 'rgba(14,12,8,.40)')
          : (dark ? 'rgba(245,242,235,.20)' : 'rgba(14,12,8,.18)')}`,
        color: dark ? B.cream : B.black,
        fontWeight: 600, fontSize: 14, textDecoration: 'none',
        transition: 'border-color .18s',
      }}>
      {label}
    </a>
  );
}

/* ─── SECTION WRAPPER ─── */
function Sec({ id, dark = true, children, pad = '80px 20px' }) {
  return (
    <section id={id} style={{
      background: dark ? B.black : B.cream,
      color: dark ? B.cream : B.black,
      padding: pad, position: 'relative',
      overflowX: 'hidden', width: '100%',
    }}>
      <div style={{ maxWidth: 920, margin: '0 auto', width: '100%', textAlign: 'center' }}>
        {children}
      </div>
    </section>
  );
}

function Div({ from }) {
  return (
    <div style={{ background: from ? B.black : B.cream, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: 1, height: 48,
        background: from
          ? 'linear-gradient(to bottom,rgba(232,168,0,0),rgba(232,168,0,.40))'
          : 'linear-gradient(to bottom,rgba(14,12,8,0),rgba(14,12,8,.22))',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────
   ITERATION TIMELINE  (vertical)
───────────────────────────────────── */
function IterationTimeline() {
  const ref = useRef(null);
  const shown = useReveal(ref, 0.04);

  const iterations = [
    {
      n: '0',
      label: 'Iteration 0',
      sub: 'Analyse — kostenlos',
      note: '✓ Kostenlos · Kein Commitment',
      noteHighlight: true,
      desc: 'Ich schaue mir deinen gesamten Auftritt an: Website, Flyer, Social Media, Speisekarte, Prozesse, Ladenauftritt. Du bekommst eine ehrliche Einschätzung — was funktioniert, was nicht, und wo ich konkret ansetzen würde. Kein Angebot ins Blaue.',
      highlight: true,
    },
    {
      n: '1',
      label: 'Iteration 1',
      sub: 'Erste Umsetzung',
      note: 'Zahlung nur wenn es dir gefällt',
      noteHighlight: false,
      desc: 'Ich setze den ersten konkreten Schritt um — ein neues Design, ein überarbeitetes Werbematerial, eine digitalisierte Abfolge. Du siehst das fertige Ergebnis. Gefällt es dir, zahlst du. Wenn nicht, bist du nichts schuldig.',
      highlight: false,
    },
    {
      n: '2',
      label: 'Iteration 2+',
      sub: 'Weiteres nach Bedarf',
      note: 'Immer erst nach Fertigstellung',
      noteHighlight: false,
      desc: 'Jede weitere Runde baut auf der vorherigen auf. Kein langer Vertrag, kein Paketdruck — wir arbeiten so lange zusammen wie es sinnvoll ist. Du entscheidest nach jeder Iteration ob es weitergeht.',
      highlight: false,
    },
  ];

  return (
    <div ref={ref} style={{ maxWidth: '100%', width: '100%', margin: '0 auto', textAlign: 'left', boxSizing: 'border-box' }}>

      {/* Start dot */}
      <div style={{
        opacity: shown ? 1 : 0, transition: 'opacity .5s ease 80ms',
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6,
      }}>
        <div style={{ width: 48, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%', background: B.yellow,
            boxShadow: '0 0 0 4px rgba(232,168,0,0.20)',
          }} />
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'rgba(245,242,235,0.35)',
        }}>
          Einstieg
        </span>
      </div>

      {iterations.map((it, i) => (
        <div key={i} style={{
          display: 'flex', gap: 0,
          opacity: shown ? 1 : 0,
          transform: shown ? 'none' : 'translateY(16px)',
          transition: `opacity .55s ease ${160 + i * 130}ms, transform .55s ease ${160 + i * 130}ms`,
        }}>
          {/* Line + node column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 48, flexShrink: 0 }}>
            <div style={{
              width: 1, height: i === 0 ? 0 : 28,
              background: it.highlight
                ? `linear-gradient(to bottom,rgba(232,168,0,.20),${B.yellow})`
                : 'rgba(245,242,235,0.08)',
            }} />
            <div style={{
              width: it.highlight ? 48 : 40,
              height: it.highlight ? 48 : 40,
              borderRadius: '50%',
              background: it.highlight ? B.yellow : 'rgba(245,242,235,0.06)',
              border: it.highlight ? 'none' : '1px solid rgba(245,242,235,0.14)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: it.highlight ? 18 : 15,
              color: it.highlight ? B.black : 'rgba(245,242,235,0.45)',
              flexShrink: 0,
              boxShadow: it.highlight ? '0 0 0 8px rgba(232,168,0,0.12)' : 'none',
            }}>
              {it.n}
            </div>
            {i < iterations.length - 1 && (
              <div style={{
                width: 1, flex: 1, minHeight: 32,
                background: 'rgba(245,242,235,0.07)',
              }} />
            )}
          </div>

          {/* Content */}
          <div style={{ paddingLeft: 20, paddingBottom: i < iterations.length - 1 ? 40 : 0, paddingTop: 6 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
              color: it.highlight ? B.yellow : 'rgba(245,242,235,0.28)', marginBottom: 4,
            }}>
              {it.label}
            </div>
            <div style={{
              fontSize: 20, fontWeight: 800, color: B.cream,
              letterSpacing: '-0.01em', marginBottom: 8,
            }}>
              {it.sub}
            </div>
            <p style={{
              fontSize: 14, color: 'rgba(245,242,235,0.52)',
              lineHeight: 1.7, marginBottom: 12, maxWidth: '100%',
            }}>
              {it.desc}
            </p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700,
              background: it.highlight ? B.yellow : 'rgba(245,242,235,0.06)',
              border: it.highlight ? 'none' : '1px solid rgba(245,242,235,0.10)',
              color: it.highlight ? B.black : 'rgba(245,242,235,0.40)',
            }}>
              {it.note}
            </span>
          </div>
        </div>
      ))}

      {/* End dot */}
      <div style={{
        opacity: shown ? 1 : 0, transition: 'opacity .5s ease 700ms',
        display: 'flex', alignItems: 'center', gap: 12,
        marginTop: 8, paddingLeft: 14,
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          border: `2px solid ${B.yellow}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: B.yellow }} />
        </div>
        <span style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: B.yellow,
        }}>
          Dein Auftritt ist fertig.
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   AUFWAND RECHNER
───────────────────────────────────── */
function AufwandRechner() {
  const [hours, setHours] = useState(12);
  const rate = 50;
  const total = hours * rate;

  const fmt = n => n.toLocaleString('de-DE');

  const examples = [
    { h: 4,  label: 'Neue Speisekarte' },
    { h: 8,  label: 'Social-Content-Paket' },
    { h: 12, label: 'Landingpage' },
    { h: 20, label: 'Website + Branding' },
    { h: 30, label: 'Komplett-Setup' },
  ];

  return (
    <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto', textAlign: 'left', boxSizing: 'border-box' }}>

      {/* Slider */}
      <div style={{
        padding: '28px 28px 24px',
        borderRadius: 20,
        border: '1px solid rgba(14,12,8,0.09)',
        background: '#E0DDD4',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(14,12,8,0.40)', marginBottom: 20 }}>
          Geschätzter Aufwand
        </div>

        <input
          type="range" min={2} max={40} step={1} value={hours}
          onChange={e => setHours(Number(e.target.value))}
          style={{ width: '100%', accentColor: B.yellow, marginBottom: 6, cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(14,12,8,0.35)', marginBottom: 24 }}>
          <span>2 h</span><span>40 h</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(14,12,8,0.40)', marginBottom: 4 }}>
              Aufwand
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: B.black }}>
              {hours} <span style={{ fontSize: 24, fontWeight: 700, color: 'rgba(14,12,8,0.45)' }}>Stunden</span>
            </div>
          </div>
          <div style={{ paddingBottom: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(14,12,8,0.40)', marginBottom: 4 }}>
              Gesamt
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', color: B.ocker }}>
              {fmt(total)} €
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 20, padding: '12px 16px', borderRadius: 12,
          background: 'rgba(232,168,0,0.08)', border: '1px solid rgba(232,168,0,0.20)',
          fontSize: 13, color: 'rgba(14,12,8,0.65)', lineHeight: 1.6,
        }}>
          Stundensatz: <strong style={{ color: B.black }}>50 €/h</strong> — dieser Wert gilt für alle Arbeiten. Das finale Angebot vor jedem Projekt legt die geschätzte Stundenzahl verbindlich fest.
        </div>
      </div>

      {/* Zahlungsaufteilung */}
      <div style={{
        padding: '24px 28px',
        borderRadius: 20,
        border: '1px solid rgba(14,12,8,0.09)',
        background: '#E8E5DC',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(14,12,8,0.40)', marginBottom: 16 }}>
          Wie läuft die Zahlung?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Iteration 0', note: 'Analyse & erster Entwurf', amount: 'Kostenlos', highlight: true },
            { label: 'Iteration 1', note: 'Erste Umsetzung — zahlen nur wenn gefällt', amount: null, highlight: false },
            { label: 'Iteration 2+', note: 'Jede weitere Runde, erst nach Fertigstellung', amount: null, highlight: false },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 12, padding: '10px 14px', borderRadius: 12,
              background: row.highlight ? 'rgba(232,168,0,0.08)' : 'rgba(14,12,8,0.04)',
              border: row.highlight ? '1px solid rgba(232,168,0,0.22)' : '1px solid rgba(14,12,8,0.06)',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: B.black }}>{row.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(14,12,8,0.50)', marginTop: 2 }}>{row.note}</div>
              </div>
              <div style={{
                fontSize: 13, fontWeight: 800,
                color: row.highlight ? B.ocker : 'rgba(14,12,8,0.40)',
                textAlign: 'right', flexShrink: 0,
              }}>
                {row.highlight ? 'Kostenlos' : 'Nach Abschluss'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example projects */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(14,12,8,0.35)', marginBottom: 10, paddingLeft: 4 }}>
          Typische Projektgrößen
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {examples.map(ex => (
            <button key={ex.h}
              onClick={() => setHours(ex.h)}
              style={{
                padding: '7px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700,
                border: hours === ex.h ? `1px solid ${B.yellow}` : '1px solid rgba(14,12,8,0.12)',
                background: hours === ex.h ? 'rgba(232,168,0,0.08)' : '#E8E5DC',
                color: hours === ex.h ? B.ocker : 'rgba(14,12,8,0.55)',
                cursor: 'pointer', transition: 'all .15s',
              }}>
              {ex.label} · {ex.h} h
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   FAQ ITEMS
───────────────────────────────────── */
function FaqItem({ q, a, dark }) {
  const [open, setOpen] = useState(false);
  const borderCol = dark ? 'rgba(245,242,235,0.08)' : 'rgba(14,12,8,0.08)';
  const textCol = dark ? B.cream : B.black;
  const mutedCol = dark ? 'rgba(245,242,235,0.52)' : 'rgba(14,12,8,0.55)';

  return (
    <div style={{ borderBottom: `1px solid ${borderCol}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '18px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 16, background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: textCol }}>{q}</span>
        <span style={{
          width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
          border: `1px solid ${dark ? 'rgba(245,242,235,0.20)' : 'rgba(14,12,8,0.15)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: mutedCol, fontSize: 16, transition: 'transform .2s',
          transform: open ? 'rotate(45deg)' : 'none',
        }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 18, fontSize: 14, color: mutedCol, lineHeight: 1.7, maxWidth: 600, textAlign: 'left' }}>
          {a}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────
   PAGE
───────────────────────────────────── */
export default function ProzessPage() {

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", overflowX: 'hidden', position: 'relative', maxWidth: '100vw' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=DM+Serif+Display:ital@1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{scroll-behavior:smooth;overflow-x:hidden;max-width:100%;width:100%}
        *{min-width:0;box-sizing:border-box}
        input[type=range]{height:4px}
      `}</style>

      <ScrollBar />

      {/* ── MINI HEADER ── */}
      <div style={{
        position: 'fixed', top: 3, left: 0, right: 0, zIndex: 50,
        padding: '14px 20px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', pointerEvents: 'none',
      }}>
        <a href="/" style={{
          fontSize: 15, fontWeight: 900, color: B.cream,
          letterSpacing: '-0.01em', mixBlendMode: 'difference',
          pointerEvents: 'auto', textDecoration: 'none',
        }}>
          Leon Seitz
        </a>
        <a href="/#request" style={{
          pointerEvents: 'auto', fontSize: 13, fontWeight: 700,
          color: B.yellow, textDecoration: 'none',
          padding: '8px 18px', borderRadius: 100,
          border: '1px solid rgba(232,168,0,0.28)',
          background: 'rgba(14,12,8,0.65)', backdropFilter: 'blur(8px)',
        }}>
          Termin buchen
        </a>
      </div>

      {/* ── S1: HERO ── dark ── */}
      <Sec id="s1" dark pad="110px 20px 80px">
        <Reveal>
          <Tag>Wie wir arbeiten</Tag>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{
            marginTop: 20, fontSize: 'clamp(2rem,7vw,4.8rem)',
            fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.025em',
            color: B.cream, maxWidth: '100%', margin: '20px auto 0', wordBreak: 'break-word',
          }}>
            Kein Paket. Kein Fixpreis.
            <br />
            <SerifAccent col={B.cream}>Schritt für Schritt.</SerifAccent>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            marginTop: 24, fontSize: 'clamp(1rem,2vw,1.15rem)',
            color: 'rgba(245,242,235,0.58)', lineHeight: 1.72,
            maxWidth: 520, margin: '24px auto 0',
          }}>
            Wir starten kostenlos. Du siehst das Ergebnis jeder Iteration
            bevor du entscheidest ob es weitergeht — und bevor du zahlst.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', padding: '0 4px' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" />
            <BtnGhost label="Zurück zur Startseite" href="/" />
          </div>
        </Reveal>
      </Sec>

      <Div from={true} />

      {/* ── S2: WAS ICH ANALYSIERE ── light ── */}
      <Sec id="analyse" dark={false} pad="96px 24px">
        <Reveal><Tag light>Was ich analysiere</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.black,
          }}>
            Nicht nur die Website.
            <br />
            <span style={{ color: B.ocker }}>Alles, was dein Betrieb nach außen zeigt.</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{
            marginTop: 20, fontSize: 15, color: 'rgba(14,12,8,0.58)',
            lineHeight: 1.72, maxWidth: 500, margin: '20px auto 0',
          }}>
            Iteration 0 ist eine vollständige Außenanalyse — digital und physisch.
            Du bekommst konkrete Befunde, keine vagen Empfehlungen.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap: 14 }}>
            {[
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={B.ocker} strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                ),
                title: 'Website & Social Media',
                desc: 'Struktur, Botschaft, CTA, mobile Darstellung, Konsistenz zwischen den Kanälen.',
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={B.ocker} strokeWidth="1.8" strokeLinecap="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                ),
                title: 'Print & Werbematerialien',
                desc: 'Flyer, Speisekarte, Visitenkarte, Broschüre — Gestaltung, Lesbarkeit, Markenkonsistenz.',
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={B.ocker} strokeWidth="1.8" strokeLinecap="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                ),
                title: 'Ladenauftritt & Prozesse',
                desc: 'Beschilderung, Erscheinungsbild vor Ort, Abläufe die sich digitalisieren oder vereinfachen lassen.',
              },
            ].map((c, i) => (
              <div key={i} style={{
                padding: '24px 22px', borderRadius: 16,
                border: '1px solid rgba(14,12,8,0.09)',
                background: '#E8E5DC', textAlign: 'left',
              }}>
                <div style={{ marginBottom: 14 }}>{c.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: B.black, marginBottom: 8 }}>{c.title}</div>
                <p style={{ fontSize: 13, color: 'rgba(14,12,8,0.55)', lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div style={{
            marginTop: 32, padding: '18px 24px', borderRadius: 14,
            border: '1px solid rgba(232,168,0,0.25)', background: 'rgba(232,168,0,0.05)',
            fontSize: 14, color: 'rgba(14,12,8,0.65)', lineHeight: 1.65,
            maxWidth: '100%', margin: '32px auto 0', textAlign: 'left',
          }}>
            <strong style={{ color: B.black }}>Das Ergebnis von Iteration 0:</strong> Du bekommst 3–5 konkrete Befunde schriftlich, eine Einschätzung wo ich beginnen würde — und erst dann entscheidest du ob wir weitermachen.
          </div>
        </Reveal>
      </Sec>

      <Div from={false} />

      {/* ── S3: ITERATION TIMELINE ── dark ── */}
      <Sec id="ablauf" dark pad="96px 24px">
        <Reveal><Tag>Der Ablauf</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.cream,
          }}>
            Iteration 0 ist kostenlos.
            <br />
            Du zahlst nur, wenn es dir <SerifAccent col={B.cream}>gefällt.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{
            marginTop: 20, fontSize: 15, color: 'rgba(245,242,235,0.55)',
            lineHeight: 1.72, maxWidth: 480, margin: '20px auto 0',
          }}>
            Kein Vertrag im Voraus. Du committeest dich immer nur zum nächsten Schritt.
          </p>
        </Reveal>

        <div style={{ marginTop: 56 }}>
          <IterationTimeline />
        </div>

        <Reveal delay={100}>
          <div style={{ marginTop: 56, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="/#request" />
            <BtnGhost label="Termin buchen" href="/#request" />
          </div>
        </Reveal>
      </Sec>

      <Div from={true} />

      {/* ── S4: AUFWAND & PREIS ── light ── */}
      <Sec id="preis" dark={false} pad="96px 24px">
        <Reveal><Tag light>Aufwand & Preis</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.black,
          }}>
            Ein Stundensatz.
            <br />
            <SerifAccent col={B.ocker}>Transparent kalkuliert.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{
            marginTop: 20, fontSize: 15, color: 'rgba(14,12,8,0.58)',
            lineHeight: 1.72, maxWidth: 480, margin: '20px auto 0',
          }}>
            Kein Paketdruck. Vor jedem Projekt bekommst du ein Angebot mit der geschätzten Stundenzahl.
            So weißt du vorher, was auf dich zukommt.
          </p>
        </Reveal>

        <div style={{ marginTop: 48 }}>
          <Reveal delay={100}>
            <AufwandRechner />
          </Reveal>
        </div>
      </Sec>

      <Div from={false} />

      {/* ── S5: FAQ ── dark ── */}
      <Sec id="faq" dark pad="96px 24px">
        <Reveal><Tag>Häufige Fragen</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.cream,
          }}>
            Kurze Antworten.
            <br />
            <SerifAccent col={B.cream}>Keine Floskeln.</SerifAccent>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <div style={{ marginTop: 48, maxWidth: '100%', width: '100%', margin: '48px auto 0', textAlign: 'left', boxSizing: 'border-box' }}>
            {[
              {
                q: 'Was, wenn es mir nach Iteration 1 nicht gefällt?',
                a: 'Dann zahlst du nichts. Das ist kein Marketing-Versprechen — es ist die tatsächliche Struktur. Du siehst das Ergebnis zuerst, danach entscheidest du. Wenn es nicht passt, trennst du dich ohne Kosten.',
              },
              {
                q: 'Wie verbindlich ist das Stundenschätzung im Angebot?',
                a: 'Sehr verbindlich. Wenn ich im Laufe eines Projekts merke, dass der Aufwand größer wird, spreche ich das vorher an — nie nachher. Du wirst nie mit einer unerwarteten Nachforderung konfrontiert.',
              },
              {
                q: 'Kommt Leon wirklich vor Ort?',
                a: 'Ja. Besonders bei der Analyse in Iteration 0 ist ein Vor-Ort-Termin sinnvoll — ich sehe dann Flyer, Speisekarte, Ladenauftritt direkt. Das kostet dich nichts extra, das gehört zur kostenlosen Analyse.',
              },
              {
                q: 'Was passiert nach dem Projekt — wer pflegt die Website?',
                a: 'Du bekommst alle Zugänge und Dateien. Für laufende Pflege oder Updates gibt es auf Wunsch eine monatliche Betreuungspauschale oder wir rechnen einzelne Anpassungen nach Aufwand ab.',
              },
              {
                q: 'Macht Leon nur Websites oder auch Print / Social?',
                a: 'Beides und mehr. Ich schaue zuerst was bei dir den größten Unterschied macht — das kann eine neue Speisekarte sein, ein Social-Content-Template, eine digitalisierte Bestellstrecke oder eine Website. Oder alles zusammen, iterativ.',
              },
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} dark={true} />
            ))}
          </div>
        </Reveal>
      </Sec>

      <Div from={true} />

      {/* ── S6: CTA ── light ── */}
      <Sec id="cta" dark={false} pad="80px 20px 64px">
        {/* Tagesstreifen */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: B.yellow }} />

        <Reveal><Tag light>Einstieg</Tag></Reveal>
        <Reveal delay={80}>
          <h2 style={{
            marginTop: 20, fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.black,
          }}>
            Lass uns starten.
            <br />
            <SerifAccent col={B.ocker}>Iteration 0 kostet nichts.</SerifAccent>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{
            marginTop: 16, fontSize: 15, color: 'rgba(14,12,8,0.58)',
            lineHeight: 1.72, maxWidth: 440, margin: '16px auto 0',
          }}>
            Schreib mir kurz: Branche, was du verbessern willst, ob es eine Deadline gibt.
            Ich schaue mir deinen Betrieb an und melde mich innerhalb von 24 h.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', padding: '0 4px' }}>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 100,
                background: '#25D366', color: '#fff',
                fontWeight: 800, fontSize: 15, textDecoration: 'none',
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp schreiben
            </a>
            <a href="mailto:hello@leonseitz.com?subject=Kostenlose Analyse&body=Branche: %0D%0AZiel: %0D%0ADeadline: %0D%0AAktueller Auftritt: %0D%0A"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 26px', borderRadius: 100,
                border: '1px solid rgba(14,12,8,0.18)', color: 'rgba(14,12,8,0.65)',
                fontWeight: 700, fontSize: 14, textDecoration: 'none',
              }}>
              <Mail size={16} /> E-Mail schreiben
            </a>
          </div>
          <p style={{ marginTop: 12, fontSize: 12, color: 'rgba(14,12,8,0.35)', textAlign: 'center' }}>
            Oder Termin buchen: <a href="/#request" style={{ color: B.ocker, textDecoration: 'none', fontWeight: 700 }}>leonseitz.com/#request</a>
          </p>
        </Reveal>

        {/* Footer */}
        <Reveal delay={300}>
          <div style={{
            marginTop: 72, paddingTop: 28,
            borderTop: '1px solid rgba(14,12,8,0.07)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 900, color: B.black, textDecoration: 'none' }}>Leon Seitz</a>
            <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'rgba(14,12,8,0.40)' }}>
              {[['Startseite', '/'], ['Portfolio', '/portfolio'], ['Impressum', '/impressum'], ['Datenschutz', '/datenschutz']].map(([l, h]) => (
                <a key={l} href={h} style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'rgba(14,12,8,0.28)' }}>© 2026</span>
          </div>
        </Reveal>
      </Sec>
    </div>
  );
}
