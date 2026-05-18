'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ─── Design tokens (identisch zu leonseitz.com) ─── */
const B = {
  yellow: '#E8A800',
  ocker:  '#C68F00',
  rust:   '#9F5A2A',
  black:  '#0E0C08',
  ink:    '#0E0C08',
  cream:  '#F5F2EB',
  dark:   '#2A2720',
  muted:  'rgba(26,23,18,0.55)',
};

const FONTS = {
  sans:  "'Plus Jakarta Sans',system-ui,sans-serif",
  serif: "'DM Serif Display',Georgia,serif",
  hand:  "'Caveat',cursive",
};

/* ─── HOOKS ─── */
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

/* ─── PRIMITIVES ─── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(18px)',
      transition: `opacity .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Frame({ bg, padding = '96px 24px', children, style = {}, id }) {
  return (
    <section id={id} style={{
      background: bg, padding, position: 'relative',
      overflow: 'hidden', width: '100%', ...style,
    }}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color }) {
  const isDark = !!color;
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 11, fontWeight: 700,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: color || B.ocker,
      padding: '5px 14px', borderRadius: 100,
      border: `1px solid ${isDark ? 'rgba(232,168,0,0.25)' : 'rgba(14,12,8,0.12)'}`,
      background: isDark ? 'rgba(232,168,0,0.06)' : 'rgba(14,12,8,0.035)',
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

function HandLine({ d, stroke, strokeWidth = 2, opacity = 1, dash }) {
  return (
    <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth}
      opacity={opacity} strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray={dash} />
  );
}

function StickyNote({ children, color = B.yellow, rotate = -2, style = {} }) {
  return (
    <div style={{
      display: 'inline-block', background: color, color: B.black,
      padding: '10px 14px', borderRadius: 4,
      fontFamily: FONTS.hand, fontSize: 18, lineHeight: 1.1,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 8px 18px rgba(0,0,0,0.16)', ...style,
    }}>
      {children}
    </div>
  );
}

function ScrollBar() {
  const p = useScrollProgress();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80, pointerEvents: 'none' }}>
      <div style={{ height: 3, background: 'rgba(232,168,0,0.12)' }}>
        <div style={{
          height: '100%', width: `${Math.round(p * 100)}%`,
          background: B.yellow, transition: 'width 80ms linear',
        }} />
      </div>
    </div>
  );
}

function BtnPrimary({ label, href, target }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '14px 28px', borderRadius: 100,
        background: h ? B.ocker : B.yellow,
        color: B.black, fontWeight: 800, fontSize: 14,
        textDecoration: 'none',
        boxShadow: h ? '0 4px 20px rgba(232,168,0,0.28)' : '0 2px 10px rgba(232,168,0,0.15)',
        transition: 'background .18s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {label}<ArrowRight size={15} />
    </a>
  );
}

const Icon = {
  WA: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
};

/* ─── SECTIONS ─── */

function Hero() {
  return (
    <Frame id="hero" bg="#000" padding="80px 64px 96px" style={{ color: B.cream, minHeight: '100vh' }}>
      {/* Nav */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '20px 64px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 5,
      }}>
        <a href="/" style={{ fontSize: 15, fontWeight: 900, color: B.cream, letterSpacing: '-0.01em', textDecoration: 'none' }}>
          Leon Seitz
        </a>
        <a href="#kontakt" style={{
          fontSize: 12, fontWeight: 700, color: B.yellow,
          padding: '8px 18px', borderRadius: 100,
          border: '1px solid rgba(232,168,0,0.25)',
          background: 'rgba(14,12,8,0.65)',
          textDecoration: 'none',
        }}>
          Jetzt schreiben
        </a>
      </div>

      <Reveal>
        <div style={{ maxWidth: 880, margin: '60px auto 0', textAlign: 'center', position: 'relative' }}>
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: B.yellow, padding: '5px 14px', borderRadius: 100,
            border: '1px solid rgba(232,168,0,0.25)',
            background: 'rgba(232,168,0,0.06)', marginBottom: 28,
          }}>
            Für Messebesucher
          </span>

          <h1 style={{
            fontSize: 'clamp(2.3rem,7vw,4.7rem)',
            fontWeight: 900, lineHeight: 1.04,
            letterSpacing: '-0.03em', color: B.cream, marginBottom: 28,
          }}>
            Innerhalb 24h besser
            <br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              als deine <Serif color={B.yellow}>Konkurrenz.</Serif>
              <svg style={{ position: 'absolute', left: 0, bottom: -8, width: '100%', height: 14, overflow: 'visible' }}
                viewBox="0 0 600 14" preserveAspectRatio="none">
                <HandLine d="M 8 9 Q 150 3, 300 7 T 592 6" stroke={B.yellow} strokeWidth={3} opacity={0.85} />
                <HandLine d="M 16 12 Q 200 7, 400 11 T 588 10" stroke={B.yellow} strokeWidth={1.6} opacity={0.5} />
              </svg>
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem,2vw,1.125rem)', lineHeight: 1.7,
            color: 'rgba(245,242,235,0.62)', maxWidth: 520, margin: '0 auto 40px',
          }}>
            Du zahlst nur, wenns dir gefällt. Kein Vertrag, keine Vorauskasse.
            Ich zeige dir in 24 Stunden, was möglich ist — und du entscheidest.
          </p>

          <BtnPrimary label="Jetzt Kontakt aufnehmen" href="#kontakt" />

          <div style={{
            marginTop: 36, display: 'flex', justifyContent: 'center',
            gap: 28, fontSize: 12, color: 'rgba(245,242,235,0.40)', flexWrap: 'wrap',
          }}>
            <span>✓ Antwort in 24h</span>
            <span>✓ Keine Vorauskasse</span>
            <span>✓ Kein Vertrag</span>
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}

function Dashboard() {
  return (
    <Frame id="dashboard" bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <Reveal>
          <div style={{ maxWidth: 600, marginBottom: 48 }}>
            <Eyebrow color={B.yellow}>Kein Mock. Läuft live.</Eyebrow>
            <h2 style={{
              marginTop: 18,
              fontSize: 'clamp(1.8rem,5vw,3.25rem)',
              fontWeight: 900, lineHeight: 1.08,
              letterSpacing: '-0.025em', color: B.cream,
            }}>
              Das baue ich für meine Kunden —{' '}
              <Serif color="rgba(245,242,235,0.45)">und für mich selbst.</Serif>
            </h2>
            <p style={{ marginTop: 16, fontSize: 15, color: 'rgba(245,242,235,0.52)', lineHeight: 1.72 }}>
              Finanzen, Leads, Angebote, Rechnungen — alles in einem System.
              Kein WordPress, keine Vorlage. Gebaut weil ich es selbst brauchte.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {/* Browser frame */}
          <div style={{
            borderRadius: 14, overflow: 'hidden',
            border: '1px solid rgba(245,242,235,0.08)',
            background: B.dark,
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          }}>
            <div style={{
              background: '#1e1b15',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '11px 16px',
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: '#3a3530' }} />
              <span style={{ width: 10, height: 10, borderRadius: 99, background: '#3a3530' }} />
              <span style={{ width: 10, height: 10, borderRadius: 99, background: '#3a3530' }} />
              <div style={{
                flex: 1, marginLeft: 12, background: '#2a2720',
                borderRadius: 5, padding: '5px 12px',
                fontSize: 11, color: 'rgba(245,242,235,0.25)', maxWidth: 260,
                fontFamily: FONTS.sans,
              }}>
                ls-plum-alpha.vercel.app
              </div>
            </div>
            <iframe
              src="https://ls-plum-alpha.vercel.app/"
              style={{ width: '100%', height: 520, border: 'none', display: 'block', background: '#000' }}
              title="Dashboard Live-Demo"
              loading="lazy"
            />
          </div>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
            <a href="https://ls-plum-alpha.vercel.app/" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 20px',
                background: 'rgba(245,242,235,0.06)',
                border: '1px solid rgba(245,242,235,0.10)',
                borderRadius: 100, color: B.cream,
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}>
              Live-Demo öffnen →
            </a>
          </div>
        </Reveal>
      </div>
    </Frame>
  );
}

const PROJEKTE = [
  {
    id: 'kfa',
    img: '/projekte/kfa.png',
    kategorie: 'Fundraising-Kampagne',
    name: 'KFA Aschaffenburg',
    desc: '21.000 € in 2 Monaten. Konzept, Branding und Landing Page — komplett ohne Werbebudget.',
    url: 'https://kfa-fundraising.vercel.app/',
  },
  {
    id: 'angelo',
    img: '/projekte/angelo.png',
    kategorie: 'Booking & Branding',
    name: 'Angelo DJ',
    desc: 'Moderne Booking-Seite für einen DJ. Keine Formulare, direkte Anfrage, klares Auftreten.',
    url: 'https://angelo-site.vercel.app/',
  },
  {
    id: 'star-doener',
    img: '/projekte/star-doener.png',
    kategorie: 'Restaurant & Gastronomie',
    name: 'Star Döner',
    desc: 'Moderner Webauftritt für ein Döner-Restaurant. Speisekarte, Standort und klare Conversion.',
    url: 'https://star-doner-website.vercel.app/',
  },
];

function ReferenzCard({ img, kategorie, name, desc, url }) {
  const [h, setH] = useState(false);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ textDecoration: 'none', display: 'block' }}>
      <div className="ref-card-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))',
        gap: 0, borderRadius: 20, overflow: 'hidden',
        background: '#F5F2EB',
        transition: 'transform .25s cubic-bezier(0.4,0,0.2,1), box-shadow .25s',
        transform: h ? 'translateY(-4px)' : 'none',
        boxShadow: h ? '0 16px 48px rgba(14,12,8,0.12)' : '0 4px 20px rgba(14,12,8,0.06)',
      }}>
        <div className="ref-card-img" style={{ position: 'relative', minHeight: 280, overflow: 'hidden', background: 'transparent' }}>
          <img src={img} alt={name} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            transform: h ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform .5s cubic-bezier(0.4,0,0.2,1)',
          }} onError={e => { e.currentTarget.style.display = 'none'; }} />
        </div>
        <div className="ref-card-text" style={{
          padding: '40px 36px', display: 'flex',
          flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: B.ocker, marginBottom: 10,
          }}>{kategorie}</div>
          <div style={{
            fontSize: 'clamp(1.2rem,2vw,1.6rem)', fontWeight: 900,
            color: B.black, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 14,
          }}>{name}</div>
          <p style={{ fontSize: 15, color: 'rgba(14,12,8,0.62)', lineHeight: 1.75, margin: '0 0 24px' }}>
            {desc}
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 700,
            color: h ? B.ocker : 'rgba(14,12,8,0.38)',
            transition: 'color .2s',
          }}>
            Projekt ansehen <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </a>
  );
}

function Referenzen() {
  return (
    <Frame id="referenzen" bg={B.cream} padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>Referenzen</Eyebrow>
          <h2 style={{
            marginTop: 20,
            fontSize: 'clamp(1.6rem,5vw,3rem)',
            fontWeight: 900, lineHeight: 1.1,
            letterSpacing: '-0.02em', color: B.black,
          }}>
            Projekte, die für sich <Serif color={B.ocker}>sprechen.</Serif>
          </h2>
          <p style={{
            marginTop: 16, fontSize: 15,
            color: 'rgba(14,12,8,0.52)', lineHeight: 1.75,
            maxWidth: 440, marginInline: 'auto',
          }}>
            Echte Projekte, echte Ergebnisse — von Fundraising bis Gastronomie.
          </p>
        </div>
      </Reveal>

      <div style={{ maxWidth: 920, margin: '48px auto 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {PROJEKTE.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ReferenzCard {...p} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={240}>
        <div style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}>
          <BtnPrimary label="Jetzt Kontakt aufnehmen" href="#kontakt" />
        </div>
      </Reveal>
    </Frame>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: 'Von der ersten Idee bis zur finalen Umsetzung alles auf sehr hohem professionellen Niveau. Meine Wünsche wurden vollständig berücksichtigt und sinnvolle Vorschläge eingebracht. Die Website ist modern, funktional und optisch sehr ansprechend.',
      name: 'Oksana Hettinger',
    },
    {
      quote: 'Ich kann Leon uneingeschränkt weiterempfehlen. Die Zusammenarbeit ist immer kooperativ, effektiv und zielführend.',
      name: 'Dominic Hildebrandt',
    },
  ];

  return (
    <Frame id="stimmen" bg={B.cream} padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>Stimmen</Eyebrow>
          <h2 style={{
            marginTop: 18,
            fontSize: 'clamp(1.8rem,5vw,3.25rem)',
            fontWeight: 900, lineHeight: 1.08,
            letterSpacing: '-0.025em', color: B.ink,
          }}>
            Was Kunden <Serif color={B.ocker}>sagen.</Serif>
          </h2>
        </div>
      </Reveal>

      <div style={{
        maxWidth: 920, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
        gap: 24,
      }}>
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <div style={{
              padding: '32px 32px', background: '#fff',
              borderRadius: 20, boxShadow: '0 2px 16px rgba(26,23,18,0.06)',
              border: '1px solid rgba(26,23,18,0.05)',
              position: 'relative', textAlign: 'left', minHeight: '100%',
            }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 18 }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC05">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(26,23,18,0.72)', margin: '0 0 24px' }}>
                &bdquo;{t.quote}&ldquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${B.yellow}, ${B.ocker})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 900, color: B.ink,
                }}>
                  {t.name[0]}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: B.ink }}>{t.name}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA Banner */}
      <Reveal delay={180}>
        <div id="kontakt" style={{
          maxWidth: 720, margin: '64px auto 0',
          padding: '32px 40px', borderRadius: 22,
          background: B.ink, color: B.cream,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: B.cream, marginBottom: 6 }}>
              Bereit in 24h?
            </div>
            <div style={{ fontSize: 13, color: 'rgba(245,242,235,0.55)' }}>
              Du zahlst nur, wenns dir gefällt. Kein Risiko.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="https://wa.me/4916095757167?text=Hi%20Leon%2C%0A%0AIch%20war%20auf%20der%20Messe%20und%20m%C3%B6chte%20mehr%20erfahren."
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 22px', borderRadius: 100,
                background: '#25D366', color: '#fff',
                fontSize: 13, fontWeight: 700, textDecoration: 'none',
              }}>
              <Icon.WA /> WhatsApp
            </a>
            <a href="mailto:hello@leonseitz.com?subject=Messe%20Anfrage"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 22px', borderRadius: 100,
                border: '1px solid rgba(245,242,235,0.20)',
                color: 'rgba(245,242,235,0.75)',
                fontSize: 13, fontWeight: 700, textDecoration: 'none',
              }}>
              <Mail size={14} /> E-Mail
            </a>
          </div>
        </div>
      </Reveal>

      <Footer />
    </Frame>
  );
}

function Footer() {
  return (
    <div style={{
      maxWidth: 960, margin: '72px auto 0',
      paddingTop: 28, borderTop: '1px solid rgba(14,12,8,0.07)',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexWrap: 'wrap', gap: 12,
    }}>
      <span style={{ fontSize: 14, fontWeight: 900, color: B.black }}>Leon Seitz</span>
      <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'rgba(14,12,8,0.38)', flexWrap: 'wrap' }}>
        {[
          ['Instagram', 'https://www.instagram.com/leonnseitz'],
          ['AGB', '/agb'],
          ['Impressum', '/impressum'],
          ['Datenschutz', '/datenschutz'],
        ].map(([l, h]) => (
          <a key={l} href={h} style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
        ))}
      </div>
      <span style={{ fontSize: 12, color: 'rgba(14,12,8,0.26)' }}>© 2026</span>
    </div>
  );
}

/* ─── PAGE ─── */
export default function MessePage() {
  return (
    <div style={{ fontFamily: FONTS.sans, overflowX: 'hidden', position: 'relative', maxWidth: '100vw' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=DM+Serif+Display:ital@1&family=Caveat:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; min-width: 0; }
        html, body { scroll-behavior: smooth; overflow-x: hidden; max-width: 100vw; width: 100%; background: #000; }
        img, svg { max-width: 100%; }
        @media (max-width: 760px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
          h1, h2 { word-break: normal; }
        }
        @media (max-width: 600px) {
          .ref-card-grid { grid-template-columns: 1fr !important; }
          .ref-card-img  { min-height: 220px !important; }
          .ref-card-text { padding: 24px 20px !important; }
        }
      `}</style>

      <ScrollBar />
      <Hero />
      <Dashboard />
      <Referenzen />
      <Testimonials />
    </div>
  );
}
