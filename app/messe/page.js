'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Design tokens ──────────────────────────────────────────────────────── */
const B = {
  black:  '#0E0C08',
  cream:  '#F5F2EB',
  yellow: '#E8A800',
  ocker:  '#C68F00',
  dark:   '#2A2720',
  muted:  'rgba(245,242,235,0.5)',
  border: 'rgba(245,242,235,0.1)',
}

const FONTS = {
  sans:  "'Plus Jakarta Sans', system-ui, sans-serif",
  serif: "'DM Serif Display', Georgia, serif",
}

/* ── Scroll-reveal ──────────────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => { if (entries.some(e => e.isIntersecting)) setShown(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, shown }
}

function Reveal({ children, delay = 0 }) {
  const { ref, shown } = useReveal()
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(22px)',
      transition: `opacity .7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

function Eyebrow({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: B.yellow,
      padding: '5px 14px',
      borderRadius: 100,
      border: '1px solid rgba(232,168,0,0.3)',
      background: 'rgba(232,168,0,0.07)',
      fontFamily: FONTS.sans,
    }}>
      {children}
    </span>
  )
}

function WAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function MessePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: B.black,
      color: B.cream,
      fontFamily: FONTS.sans,
      overflowX: 'hidden',
    }}>

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(80px,12vh,120px) clamp(24px,6vw,80px)',
        maxWidth: 860,
        margin: '0 auto',
      }}>
        <Reveal>
          <Eyebrow>Leon Seitz · Webdesign &amp; Entwicklung</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h1 style={{
            fontSize: 'clamp(40px, 8.5vw, 78px)',
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            margin: '28px 0 0',
            fontFamily: FONTS.sans,
          }}>
            Innerhalb 24h{' '}
            <em style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontWeight: 400, color: B.yellow }}>
              besser
            </em>
            <br />
            als deine Konkurrenz.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p style={{
            fontSize: 'clamp(17px, 2.5vw, 21px)',
            color: B.muted,
            marginTop: 28,
            lineHeight: 1.6,
            maxWidth: 460,
          }}>
            Du zahlst nur, wenns dir gefällt.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 44 }}>
            <a
              href="https://wa.me/49160957571672"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '15px 28px', borderRadius: 100,
                background: B.yellow, color: B.black,
                fontWeight: 800, fontSize: 14, textDecoration: 'none',
                boxShadow: '0 2px 20px rgba(232,168,0,0.25)',
              }}
            >
              <WAIcon /> Jetzt schreiben
            </a>
            <a
              href="#dashboard"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 24px', borderRadius: 100,
                background: 'transparent', color: B.cream,
                fontWeight: 600, fontSize: 14, textDecoration: 'none',
                border: `1px solid ${B.border}`,
              }}
            >
              Mehr sehen ↓
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── 2. DASHBOARD ─────────────────────────────────────────────────── */}
      <section id="dashboard" style={{
        padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: `1px solid ${B.border}`,
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          <Reveal>
            <div style={{ marginBottom: 48, maxWidth: 560 }}>
              <Eyebrow>Kein Mock. Läuft live.</Eyebrow>
              <h2 style={{
                fontSize: 'clamp(28px, 5vw, 46px)',
                fontWeight: 800, lineHeight: 1.08,
                letterSpacing: '-0.02em', margin: '20px 0 18px',
              }}>
                Das baue ich für meine Kunden —{' '}
                <em style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontWeight: 400, color: B.muted }}>
                  und für mich selbst.
                </em>
              </h2>
              <p style={{ fontSize: 16, color: B.muted, lineHeight: 1.75, margin: 0 }}>
                Finanzen, Leads, Angebote, Rechnungen — alles in einem System.
                Kein WordPress, keine Vorlage. Gebaut weil ich es selbst brauchte.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{
              borderRadius: 14, overflow: 'hidden',
              border: `1px solid ${B.border}`,
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
                  flex: 1, marginLeft: 12,
                  background: '#2a2720', borderRadius: 5,
                  padding: '5px 12px', fontSize: 11,
                  color: 'rgba(245,242,235,0.25)', maxWidth: 260,
                }}>
                  ls-plum-alpha.vercel.app
                </div>
              </div>
              <iframe
                src="https://ls-plum-alpha.vercel.app/"
                style={{ width: '100%', height: 500, border: 'none', display: 'block', background: '#000' }}
                title="Dashboard Live-Demo"
                loading="lazy"
              />
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <a
                href="https://ls-plum-alpha.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 20px',
                  background: 'rgba(245,242,235,0.06)',
                  border: `1px solid ${B.border}`,
                  borderRadius: 100, color: B.cream,
                  fontSize: 13, fontWeight: 600, textDecoration: 'none',
                }}
              >
                Live-Demo öffnen →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. REFERENZEN ────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: `1px solid ${B.border}`,
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          <Reveal>
            <Eyebrow>Referenzen</Eyebrow>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 46px)',
              fontWeight: 800, lineHeight: 1.08,
              letterSpacing: '-0.02em', margin: '20px 0 52px',
            }}>
              Drei Projekte.{' '}
              <em style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontWeight: 400, color: B.yellow }}>
                Echte
              </em>{' '}
              Ergebnisse.
            </h2>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: 14,
          }}>
            {[
              {
                name: 'KFA',
                category: 'Kälte- & Klimatechnik',
                result: '+40 % mehr Anfragen im ersten Monat nach Launch.',
                delay: 0,
              },
              {
                name: 'Star Döner',
                category: 'Gastronomie',
                result: 'Neue Website in 48h live — seitdem deutlich mehr Laufkundschaft über Google.',
                delay: 80,
              },
              {
                name: 'Angelo Daylight',
                category: 'Kreativwirtschaft',
                result: 'Portfolio neu aufgesetzt — erste Anfragen bereits in der Startwoche.',
                delay: 160,
              },
            ].map(ref => (
              <Reveal key={ref.name} delay={ref.delay}>
                <div style={{
                  background: B.dark,
                  border: `1px solid ${B.border}`,
                  borderRadius: 14, padding: '28px 24px', height: '100%',
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: B.yellow, marginBottom: 16,
                  }}>
                    {ref.category}
                  </div>
                  <div style={{
                    width: 32, height: 2,
                    background: B.yellow, borderRadius: 1,
                    marginBottom: 16, opacity: 0.6,
                  }} />
                  <div style={{
                    fontSize: 22, fontWeight: 800,
                    letterSpacing: '-0.02em', marginBottom: 12,
                  }}>
                    {ref.name}
                  </div>
                  <p style={{ fontSize: 14, color: B.muted, lineHeight: 1.7, margin: 0 }}>
                    {ref.result}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TESTIMONIALS + CTA ────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,80px) clamp(100px,12vh,140px)',
        borderTop: `1px solid ${B.border}`,
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>

          <Reveal>
            <Eyebrow>Was Kunden sagen</Eyebrow>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 44, marginBottom: 72, textAlign: 'left' }}>
            {[
              {
                quote: 'Leon hat unsere Website in zwei Tagen komplett umgebaut. Seitdem kommen mehr Anfragen als vorher in einem Monat.',
                name: 'Inhaber, KFA',
                delay: 0,
              },
              {
                quote: 'Schnell, unkompliziert, und das Ergebnis übertrifft was andere für das Dreifache anbieten.',
                name: 'Geschäftsführer, Star Döner',
                delay: 100,
              },
            ].map((t, i) => (
              <Reveal key={i} delay={t.delay}>
                <div style={{
                  background: B.dark,
                  border: `1px solid ${B.border}`,
                  borderRadius: 14, padding: '28px 32px',
                }}>
                  <p style={{
                    fontSize: 'clamp(15px, 2.2vw, 17px)',
                    lineHeight: 1.7, color: B.cream,
                    margin: '0 0 20px',
                    fontStyle: 'italic',
                    fontFamily: FONTS.serif, fontWeight: 400,
                  }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 2, background: B.yellow, borderRadius: 1, opacity: 0.7 }} />
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: B.muted,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>
                      {t.name}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 46px)',
              fontWeight: 900, letterSpacing: '-0.025em',
              lineHeight: 1.08, margin: '0 0 14px',
            }}>
              Bereit in{' '}
              <em style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontWeight: 400, color: B.yellow }}>
                24h?
              </em>
            </h2>
            <p style={{ fontSize: 16, color: B.muted, margin: '0 0 40px', lineHeight: 1.6 }}>
              Du zahlst nur, wenns dir gefällt. Kein Risiko.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/49160957571672"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '15px 28px', borderRadius: 100,
                  background: B.yellow, color: B.black,
                  fontWeight: 800, fontSize: 14, textDecoration: 'none',
                  boxShadow: '0 2px 20px rgba(232,168,0,0.25)',
                }}
              >
                <WAIcon /> WhatsApp
              </a>
              <a
                href="mailto:hello@leonseitz.com"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '15px 24px', borderRadius: 100,
                  background: 'transparent', color: B.cream,
                  fontWeight: 600, fontSize: 14, textDecoration: 'none',
                  border: `1px solid ${B.border}`,
                }}
              >
                hello@leonseitz.com
              </a>
            </div>
          </Reveal>

          <div style={{
            marginTop: 64, fontSize: 10,
            color: 'rgba(245,242,235,0.18)',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            Leon Seitz · Webdesign &amp; Entwicklung
          </div>
        </div>
      </section>
    </div>
  )
}
