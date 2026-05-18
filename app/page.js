'use client';

import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const B = {
  yellow: '#E8A800',
  ocker: '#C68F00',
  rust: '#9F5A2A',
  black: '#0E0C08',
  ink: '#0E0C08',
  cream: '#F5F2EB',
  dark: '#2A2720',
  muted: 'rgba(26,23,18,0.55)',
};

const FONTS = {
  sans: "'Plus Jakarta Sans',system-ui,sans-serif",
  serif: "'DM Serif Display',Georgia,serif",
  hand: "'Caveat',cursive",
  mono: "'Plus Jakarta Sans',system-ui,sans-serif",
};

/* ─── HOOKS ─── */
function useReveal(ref, threshold = 0.08) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      e => {
        if (e.some(x => x.isIntersecting)) setShown(true);
      },
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

function useCountUp({ target, durationMs = 1200 }) {
  const [v, setV] = useState(0);
  const raf = useRef(null);

  const start = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);

    const t0 = performance.now();

    const tick = t => {
      const e = 1 - Math.pow(1 - Math.min(1, (t - t0) / durationMs), 3);
      setV(Math.round(target * e));

      if (e < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
  }, [target, durationMs]);

  useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  return { v, start };
}

/* ─── PRIMITIVES ─── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(18px)',
        transition: `opacity .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Frame({ bg, padding = '96px 24px', children, style = {}, id }) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function Eyebrow({ children, color }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: color || B.ocker,
        padding: '5px 14px',
        borderRadius: 100,
        border: `1px solid ${color ? 'rgba(232,168,0,0.25)' : 'rgba(14,12,8,0.12)'}`,
        background: color ? 'rgba(232,168,0,0.06)' : 'rgba(14,12,8,0.035)',
      }}
    >
      {children}
    </span>
  );
}

function Serif({ children, color }) {
  return (
    <em
      style={{
        fontFamily: FONTS.serif,
        fontStyle: 'italic',
        fontWeight: 400,
        color: color || 'inherit',
      }}
    >
      {children}
    </em>
  );
}

function HandLine({ d, stroke, strokeWidth = 2, opacity = 1, dash }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash}
    />
  );
}

function StickyNote({ children, color = B.yellow, rotate = -2, style = {} }) {
  return (
    <div
      style={{
        display: 'inline-block',
        background: color,
        color: B.black,
        padding: '10px 14px',
        borderRadius: 4,
        fontFamily: FONTS.hand,
        fontSize: 18,
        lineHeight: 1.1,
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 8px 18px rgba(0,0,0,0.16)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ScrollBar() {
  const p = useScrollProgress();

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80, pointerEvents: 'none' }}>
      <div style={{ height: 3, background: 'rgba(232,168,0,0.12)' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round(p * 100)}%`,
            background: B.yellow,
            transition: 'width 80ms linear',
          }}
        />
      </div>
    </div>
  );
}

function BtnPrimary({ label, href, target }) {
  const [h, setH] = useState(false);

  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 28px',
        borderRadius: 100,
        background: h ? B.ocker : B.yellow,
        color: B.black,
        fontWeight: 800,
        fontSize: 14,
        textDecoration: 'none',
        boxShadow: h ? '0 4px 20px rgba(232,168,0,0.28)' : '0 2px 10px rgba(232,168,0,0.15)',
        transition: 'background .18s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {label}
      <ArrowRight size={15} />
    </a>
  );
}

/* ─── ICONS ─── */
const Icon = {
  Prozesse: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M22 8l-6 4 6 4V8z" />
    </svg>
  ),
  Automation: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  WA: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
};

/* ─── FORM ─── */
const INTAKE_STEPS = [
  {
    key: 'goal',
    type: 'select',
    question: 'Was ist dein Ziel?',
    options: [
      { value: 'Neue Website', label: 'Neue Website' },
      { value: 'Mehr Anfragen', label: 'Mehr Anfragen' },
      { value: 'Besseres Branding', label: 'Besseres Branding' },
      { value: 'Social Media', label: 'Social Media' },
      { value: 'Kompletter Neustart', label: 'Kompletter Neustart' },
    ],
  },
  {
    key: 'website_status',
    type: 'select',
    question: 'Wie ist dein aktueller Stand?',
    options: [
      { value: 'Es gibt schon etwas, aber es wirkt nicht professionell', label: 'Es gibt schon etwas, aber es wirkt nicht professionell' },
      { value: 'Website vorhanden, aber nicht überzeugend', label: 'Website vorhanden, aber nicht überzeugend' },
      { value: 'Social / Print / Website passen nicht zusammen', label: 'Social / Print / Website passen nicht zusammen' },
      { value: 'Noch kein klarer Auftritt', label: 'Noch kein klarer Auftritt' },
    ],
  },
  {
    key: 'timeline',
    type: 'select',
    question: 'Wann kann es losgehen?',
    options: [
      { value: 'So bald wie möglich', label: 'So bald wie möglich' },
      { value: 'In 1–2 Wochen', label: 'In 1–2 Wochen' },
      { value: 'In etwa 1 Monat', label: 'In etwa 1 Monat' },
      { value: 'Noch offen', label: 'Noch offen' },
    ],
  },
  {
    key: 'url',
    type: 'input',
    inputType: 'url',
    question: 'Deine Website-URL',
    placeholder: 'https://deinunternehmen.de',
    hint: 'Optional — falls du schon eine Seite hast.',
    optional: true,
  },
  {
    key: 'notes',
    type: 'textarea',
    question: 'Noch etwas, das ich wissen sollte?',
    placeholder: 'Z.B. Branche, aktueller Auftritt, Zielgruppe, Budget-Vorstellung, besondere Anforderungen …',
    hint: 'Optional — alles was mir hilft, deine Situation besser zu verstehen.',
    optional: true,
  },
];

const INP_STYLE = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  border: '1.5px solid rgba(14,12,8,0.12)',
  background: '#FAFAF8',
  color: '#0E0C08',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: FONTS.sans,
};

function LeadFormLight() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const totalSteps = INTAKE_STEPS.length;
  const isEmailStep = step === totalSteps;
  const currentStep = INTAKE_STEPS[step];

  const pick = (key, value) => {
    setAnswers(a => ({ ...a, [key]: value }));
    setStep(s => s + 1);
  };

  const advance = () => setStep(s => s + 1);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          url: answers.url || '',
          goal: [answers.goal, answers.website_status, answers.notes].filter(Boolean).join(' · '),
          timeline: answers.timeline || '',
        }),
      });

      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 0', textAlign: 'center' }}>
        <CheckCircle2 size={36} color={B.ocker} />
        <div style={{ fontSize: 17, fontWeight: 900, color: B.black }}>Erhalten.</div>
        <p style={{ fontSize: 14, color: 'rgba(14,12,8,0.52)', lineHeight: 1.65 }}>
          Ich melde mich innerhalb von 24 Stunden bei dir.
        </p>
      </div>
    );
  }

  const totalProgress = totalSteps + 1;
  const progressPct = ((isEmailStep ? totalSteps : step) / totalProgress) * 100;

  const BackBtn = () => (
    <button
      type="button"
      onClick={() => setStep(s => s - 1)}
      style={{
        marginTop: 12,
        background: 'none',
        border: 'none',
        display: 'block',
        fontSize: 12,
        color: 'rgba(14,12,8,0.35)',
        cursor: 'pointer',
        fontFamily: FONTS.sans,
        padding: 0,
      }}
    >
      ← Zurück
    </button>
  );

  return (
    <div>
      <div style={{ height: 3, borderRadius: 99, background: 'rgba(14,12,8,0.07)', marginBottom: 24, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            borderRadius: 99,
            background: B.ocker,
            width: `${progressPct}%`,
            transition: 'width .35s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>

      {!isEmailStep && currentStep.type === 'select' && (
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: B.black, marginBottom: 14 }}>
            {currentStep.question}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {currentStep.options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => pick(currentStep.key, opt.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 12,
                  textAlign: 'left',
                  border: '1.5px solid rgba(14,12,8,0.10)',
                  background: '#FAFAF8',
                  color: B.black,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: FONTS.sans,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = B.ocker;
                  e.currentTarget.style.background = 'rgba(232,168,0,0.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(14,12,8,0.10)';
                  e.currentTarget.style.background = '#FAFAF8';
                }}
              >
                {opt.label}
                <ArrowRight size={14} style={{ opacity: 0.28, flexShrink: 0 }} />
              </button>
            ))}
          </div>

          {step > 0 && <BackBtn />}
        </div>
      )}

      {!isEmailStep && (currentStep.type === 'input' || currentStep.type === 'textarea') && (
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: B.black, marginBottom: 4 }}>
            {currentStep.question}
            {currentStep.optional && (
              <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(14,12,8,0.35)', marginLeft: 8 }}>
                optional
              </span>
            )}
          </div>

          {currentStep.hint && (
            <p style={{ fontSize: 13, color: 'rgba(14,12,8,0.42)', marginBottom: 12, lineHeight: 1.55 }}>
              {currentStep.hint}
            </p>
          )}

          {currentStep.type === 'input' ? (
            <input
              type={currentStep.inputType || 'text'}
              placeholder={currentStep.placeholder}
              value={answers[currentStep.key] || ''}
              onChange={e => setAnswers(a => ({ ...a, [currentStep.key]: e.target.value }))}
              autoFocus
              style={{ ...INP_STYLE, marginBottom: 10 }}
            />
          ) : (
            <textarea
              placeholder={currentStep.placeholder}
              value={answers[currentStep.key] || ''}
              onChange={e => setAnswers(a => ({ ...a, [currentStep.key]: e.target.value }))}
              rows={4}
              autoFocus
              style={{ ...INP_STYLE, resize: 'none', lineHeight: 1.6, marginBottom: 10 }}
            />
          )}

          <button
            type="button"
            onClick={advance}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: 100,
              background: B.black,
              color: B.cream,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 14,
              fontFamily: FONTS.sans,
            }}
          >
            Weiter →
          </button>

          <BackBtn />
        </div>
      )}

      {isEmailStep && (
        <form onSubmit={handleSubmit}>
          <div style={{ fontSize: 15, fontWeight: 800, color: B.black, marginBottom: 6 }}>
            Wohin soll die Analyse?
          </div>

          <p style={{ fontSize: 13, color: 'rgba(14,12,8,0.45)', marginBottom: 14, lineHeight: 1.6 }}>
            Ich schicke dir meine Einschätzung direkt per E-Mail.
          </p>

          <input
            type="email"
            required
            autoFocus
            placeholder="deine@email.de"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ ...INP_STYLE, marginBottom: 10 }}
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              width: '100%',
              padding: '13px 24px',
              borderRadius: 100,
              background: status === 'loading' ? 'rgba(232,168,0,0.6)' : B.yellow,
              color: B.black,
              border: 'none',
              cursor: status === 'loading' ? 'default' : 'pointer',
              fontWeight: 800,
              fontSize: 14,
              fontFamily: FONTS.sans,
            }}
          >
            {status === 'loading' ? 'Wird gesendet…' : 'Analyse anfragen →'}
          </button>

          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            style={{
              marginTop: 10,
              background: 'none',
              border: 'none',
              display: 'block',
              fontSize: 12,
              color: 'rgba(14,12,8,0.35)',
              cursor: 'pointer',
              fontFamily: FONTS.sans,
              padding: 0,
            }}
          >
            ← Zurück
          </button>

          {status === 'error' && (
            <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(14,12,8,0.40)', textAlign: 'center' }}>
              Fehler — schreib direkt an <strong>hello@leonseitz.com</strong>
            </p>
          )}
        </form>
      )}

      <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(14,12,8,0.25)', textAlign: 'center' }}>
        Kein Spam. Kein Paket. Nur eine ehrliche Einschätzung.
      </p>
    </div>
  );
}

/* ─── SECTIONS ─── */
function HeroV2() {
  return (
    <Frame
      id="hero"
      bg="radial-gradient(1200px 700px at 50% -20%, rgba(232,168,0,.16), transparent 60%), linear-gradient(180deg, #0a0805 0%, #0E0C08 50%, #15110a 100%)"
      padding="140px 28px 120px"
      style={{ color: B.cream, minHeight: '100vh' }}
    >
      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
      }} />

      {/* Grid ornament */}
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
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '24px 36px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5,
      }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: B.cream, textDecoration: 'none', fontWeight: 900, letterSpacing: '-0.01em' }}>
          Leon Seitz
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: B.yellow, boxShadow: '0 0 0 3px rgba(232,168,0,.2)', display: 'inline-block' }} />
          <small style={{ fontWeight: 600, color: 'rgba(245,242,235,.5)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', marginLeft: 6 }}>Phase 0</small>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(245,242,235,.55)', fontWeight: 600, letterSpacing: '0.04em' }}>
            <span className="live-dot" />
            Verfügbar — Antwort in 24h
          </span>
          <a href="#next" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '9px 18px', borderRadius: 100,
            border: '1px solid rgba(232,168,0,.32)', background: 'rgba(14,12,8,.55)',
            color: B.yellow, fontSize: 12, fontWeight: 700, textDecoration: 'none',
            backdropFilter: 'blur(6px)',
          }}>
            Termin buchen
          </a>
        </div>
      </div>

      {/* Corner label */}
      <div style={{
        position: 'absolute', top: 90, left: 36,
        color: 'rgba(232,168,0,.35)', fontSize: 10, fontWeight: 700,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 24, height: 1, background: 'rgba(232,168,0,.35)', display: 'inline-block' }} />
        Phase 0 · Analyse
      </div>

      <Reveal>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          {/* Eyebrow badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: B.yellow, padding: '7px 16px 7px 12px', borderRadius: 100,
            border: '1px solid rgba(232,168,0,.28)', background: 'rgba(232,168,0,.06)',
            marginBottom: 36,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: B.yellow, boxShadow: '0 0 0 3px rgba(232,168,0,.2)', display: 'inline-block' }} />
            Phase 0 — Kostenlos · Kein Commitment
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem,7.2vw,5.2rem)',
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              color: B.cream,
              marginBottom: 32,
            }}
          >
            Dein Betrieb läuft
            <br />
            noch auf Papier.
            <br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <Serif color={B.yellow}>Ich ändere das.</Serif>{' '}In 24 Stunden.
              <svg
                style={{ position: 'absolute', left: '-2%', bottom: '-0.18em', width: '104%', height: '0.32em', overflow: 'visible' }}
                viewBox="0 0 600 14"
                preserveAspectRatio="none"
              >
                <HandLine d="M 8 9 Q 150 3, 300 7 T 592 6" stroke={B.yellow} strokeWidth={3} opacity={0.85} />
                <HandLine d="M 16 12 Q 200 7, 400 11 T 588 10" stroke={B.yellow} strokeWidth={1.6} opacity={0.5} />
              </svg>
            </span>
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: 'rgba(245,242,235,0.62)',
              maxWidth: 620,
              margin: '0 auto 44px',
              textAlign: 'center',
            }}
          >
            Prozesse, Abläufe, interne Systeme — die meisten Betriebe lassen täglich Zeit und Geld
            liegen, weil nichts digital läuft. Ich zeige dir, wo der Hebel liegt. Kostenlos. Ohne Commitment.
          </p>

          <BtnPrimary label="Kostenlose Analyse anfragen" href="#next" />

          <div
            style={{
              marginTop: 42,
              display: 'flex',
              justifyContent: 'center',
              gap: 32,
              fontSize: 12,
              color: 'rgba(245,242,235,0.45)',
              fontWeight: 500,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(232,168,0,.15)', color: B.yellow, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900 }}>✓</span>
              Antwort in 24h
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(232,168,0,.15)', color: B.yellow, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900 }}>✓</span>
              Keine Vorauskasse
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(232,168,0,.15)', color: B.yellow, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900 }}>✓</span>
              Kein Vertrag
            </span>
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}

function ProblemV2() {
  const points = [
    {
      n: '01',
      title: 'Kein Auftritt, der wirkt',
      desc: 'Flyer, Website, Instagram — alles irgendwie vorhanden, aber nichts zieht in eine Richtung. Potenzielle Kunden kommen vorbei und gehen wieder.',
    },
    {
      n: '02',
      title: 'Marketing kostet Zeit, die du nicht hast',
      desc: 'Du weißt, dass etwas fehlt. Aber zwischen Tagesgeschäft und Feierabend bleibt nichts übrig, um es anzugehen.',
    },
    {
      n: '03',
      title: 'Agenturen lösen das Problem nicht',
      desc: 'Lange Laufzeiten, Vorauskasse, keine Garantie auf Ergebnis. Das Risiko liegt immer bei dir.',
    },
  ];

  return (
    <Frame id="problem" bg={B.cream} padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>Das eigentliche Problem</Eyebrow>

          <h2
            style={{
              marginTop: 18,
              fontSize: 'clamp(1.8rem,5vw,3.25rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: B.ink,
            }}
          >
            Viele Betriebe sind gut.
            <br />
            <Serif color={B.ocker}>Aber nach außen wirkt es nicht so.</Serif>
          </h2>

          <p
            style={{
              marginTop: 18,
              fontSize: 16,
              color: 'rgba(26,23,18,0.55)',
              lineHeight: 1.7,
              maxWidth: 540,
              marginInline: 'auto',
            }}
          >
            Ein guter Laden, ein gutes Produkt — aber Visitenkarte, Flyer, Website und Instagram erzählen
            drei verschiedene Geschichten. Das kostet Vertrauen und Aufträge, die nie ankommen.
          </p>
        </div>
      </Reveal>

      <div
        style={{
          maxWidth: 920,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))',
          gap: 24,
        }}
      >
        {points.map((p, i) => (
          <Reveal key={p.n} delay={i * 90}>
            <div
              style={{
                background: '#fff',
                borderRadius: 18,
                padding: '32px 28px',
                border: '1px solid rgba(26,23,18,0.06)',
                boxShadow: '0 4px 24px rgba(26,23,18,0.04)',
                position: 'relative',
                textAlign: 'left',
                minHeight: '100%',
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.serif,
                  fontStyle: 'italic',
                  fontSize: 56,
                  lineHeight: 0.9,
                  color: B.yellow,
                  marginBottom: 16,
                  letterSpacing: '-0.03em',
                }}
              >
                {p.n}
              </div>

              <div
                style={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: B.ink,
                  marginBottom: 10,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                }}
              >
                {p.title}
              </div>

              <p style={{ fontSize: 14, color: 'rgba(26,23,18,0.55)', lineHeight: 1.7, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={220}>
        <div
          style={{
            maxWidth: 580,
            margin: '56px auto 0',
            textAlign: 'center',
            position: 'relative',
            padding: '32px 28px',
            background: '#FBF8F1',
            border: '1px solid rgba(26,23,18,0.07)',
            borderRadius: 18,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '4px 14px',
              borderRadius: 100,
              background: B.ink,
              color: B.cream,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Echte Kundenstimme
          </div>

          <p
            style={{
              fontFamily: FONTS.serif,
              fontStyle: 'italic',
              fontSize: 22,
              lineHeight: 1.4,
              color: B.ink,
              margin: 0,
            }}
          >
            „Ich kann Leon uneingeschränkt weiterempfehlen. Die Zusammenarbeit ist immer kooperativ, effektiv und zielführend.“
          </p>

          <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: B.ocker }}>
            — Dominic Hildebrandt
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}

function LeistungCard({ n, icon, kicker, title, desc, visual, url }) {
  const [h, setH] = useState(false);

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        border: `1px solid ${h ? 'rgba(232,168,0,0.22)' : 'rgba(245,242,235,0.06)'}`,
        background: h ? '#211c14' : B.dark,
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color .22s cubic-bezier(0.4,0,0.2,1), background .22s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: B.yellow,
          opacity: h ? 1 : 0,
          transition: 'opacity .22s cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {visual && visual}

      <div style={{ padding: '28px 32px', flex: 1, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 24,
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1,
            color: h ? 'rgba(232,168,0,0.09)' : 'rgba(245,242,235,0.04)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
        >
          {n}
        </div>

        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            marginBottom: 20,
            background: h ? 'rgba(232,168,0,0.13)' : 'rgba(245,242,235,0.05)',
            border: `1px solid ${h ? 'rgba(232,168,0,0.22)' : 'rgba(245,242,235,0.09)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: h ? B.yellow : 'rgba(245,242,235,0.45)',
          }}
        >
          {icon}
        </div>

        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.09em',
            color: B.yellow,
            marginBottom: 10,
            opacity: h ? 1 : 0.65,
          }}
        >
          {kicker}
        </div>

        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: B.cream,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            marginBottom: 14,
          }}
        >
          {title}
        </div>

        <p style={{ fontSize: 13, color: 'rgba(245,242,235,0.48)', lineHeight: 1.72, maxWidth: 340 }}>
          {desc}
        </p>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              marginTop: 20,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 700,
              color: h ? B.yellow : 'rgba(245,242,235,0.35)',
              textDecoration: 'none',
              transition: 'color .2s',
            }}
          >
            Live ansehen <ArrowRight size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

function LeistungenV2() {
  const visual1 = (
    <div style={{ position:'relative', height:200, background:'linear-gradient(180deg,#15110a,#0E0C08)', borderBottom:'1px solid rgba(245,242,235,.06)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(232,168,0,.12) 1px, transparent 0)', backgroundSize:'18px 18px', opacity:.4, pointerEvents:'none' }} />
      <div style={{ width:64, height:80, background:'#F5F2EB', borderRadius:3, position:'relative', transform:'rotate(-6deg)', boxShadow:'0 8px 20px rgba(0,0,0,.4)', padding:'10px 8px', display:'flex', flexDirection:'column', gap:5 }}>
        {[60,90,75,85,50].map((w,i) => <span key={i} style={{ display:'block', height:3, borderRadius:2, background:'#0E0C08', opacity:.55, width:`${w}%` }} />)}
        <div style={{ position:'absolute', top:-3, right:-3, width:14, height:14, background:'#E8A800', borderRadius:'50%', boxShadow:'0 0 0 4px rgba(232,168,0,.18)' }} />
      </div>
      <svg style={{ margin:'0 14px', color:'rgba(232,168,0,.7)', flexShrink:0 }} width="32" height="14" viewBox="0 0 32 14" fill="none">
        <path d="M2 7h26M22 2l6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
      </svg>
      <div style={{ width:96, height:80, background:'#1B1812', border:'1px solid rgba(232,168,0,.3)', borderRadius:8, padding:8, display:'flex', flexDirection:'column', gap:5, boxShadow:'0 10px 28px rgba(232,168,0,.18)' }}>
        <div style={{ display:'flex', gap:3, marginBottom:3 }}>{[0,1,2].map(i => <span key={i} style={{ width:4, height:4, borderRadius:'50%', background:'rgba(232,168,0,.5)', display:'block' }} />)}</div>
        <span style={{ height:3, borderRadius:2, background:'#E8A800', width:'60%', display:'block' }} />
        <span style={{ height:3, borderRadius:2, background:'rgba(245,242,235,.18)', display:'block' }} />
        <span style={{ height:3, borderRadius:2, background:'rgba(245,242,235,.18)', width:'45%', display:'block' }} />
        <span style={{ height:3, borderRadius:2, background:'rgba(245,242,235,.18)', display:'block' }} />
      </div>
    </div>
  );

  const visual2 = (
    <div style={{ position:'relative', height:200, background:'linear-gradient(180deg,#15110a,#0E0C08)', borderBottom:'1px solid rgba(245,242,235,.06)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(232,168,0,.12) 1px, transparent 0)', backgroundSize:'18px 18px', opacity:.4, pointerEvents:'none' }} />
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible' }} viewBox="0 0 280 140" preserveAspectRatio="none">
        <path d="M 56 70 Q 100 30, 140 70 T 224 70" fill="none" stroke="rgba(232,168,0,.45)" strokeWidth="1.4" strokeDasharray="3 4"/>
        <path d="M 56 70 Q 100 110, 140 70 T 224 70" fill="none" stroke="rgba(232,168,0,.25)" strokeWidth="1.4" strokeDasharray="3 4"/>
      </svg>
      <div style={{ display:'flex', gap:48, alignItems:'center', position:'relative', zIndex:2 }}>
        <div style={{ width:46, height:46, borderRadius:'50%', background:'#1B1812', border:'1.5px solid rgba(232,168,0,.4)', display:'flex', alignItems:'center', justifyContent:'center', color:'#E8A800' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        </div>
        <div style={{ width:54, height:54, borderRadius:'50%', background:'#E8A800', border:'1.5px solid #E8A800', display:'flex', alignItems:'center', justifyContent:'center', color:'#0E0C08', boxShadow:'0 0 0 6px rgba(232,168,0,.12), 0 0 0 14px rgba(232,168,0,.05)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div style={{ width:46, height:46, borderRadius:'50%', background:'#1B1812', border:'1.5px solid rgba(232,168,0,.4)', display:'flex', alignItems:'center', justifyContent:'center', color:'#E8A800' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
      </div>
    </div>
  );

  const visual3 = (
    <div style={{ position:'relative', height:200, background:'linear-gradient(180deg,#15110a,#0E0C08)', borderBottom:'1px solid rgba(245,242,235,.06)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(232,168,0,.12) 1px, transparent 0)', backgroundSize:'18px 18px', opacity:.4, pointerEvents:'none' }} />
      <div style={{ width:'100%', maxWidth:280, background:'#15110a', border:'1px solid rgba(245,242,235,.08)', borderRadius:10, padding:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, boxShadow:'0 14px 36px rgba(0,0,0,.4)' }}>
        {[{lbl:'Umsatz',val:'12.4k',gold:true},{lbl:'Anfragen',val:'38',gold:false}].map(s => (
          <div key={s.lbl} style={{ background:'#1B1812', border:'1px solid rgba(245,242,235,.06)', borderRadius:6, padding:'8px 10px' }}>
            <div style={{ fontSize:7.5, color:'rgba(245,242,235,.4)', letterSpacing:'.08em', textTransform:'uppercase', fontWeight:700, marginBottom:4 }}>{s.lbl}</div>
            <div style={{ fontSize:15, fontWeight:900, color: s.gold ? '#E8A800' : '#F5F2EB', letterSpacing:'-.01em' }}>{s.val}</div>
          </div>
        ))}
        <div style={{ gridColumn:'1/-1', height:46, background:'#1B1812', border:'1px solid rgba(245,242,235,.06)', borderRadius:6, padding:'6px 8px', display:'flex', alignItems:'flex-end', gap:3 }}>
          {[30,55,40,70,50,85,65,95].map((h,i) => <div key={i} style={{ flex:1, background:'linear-gradient(180deg,#E8A800,rgba(232,168,0,.4))', borderRadius:'2px 2px 0 0', height:`${h}%` }} />)}
        </div>
      </div>
    </div>
  );

  const services = [
    {
      n: '01',
      icon: <Icon.Prozesse />,
      kicker: 'Prozesse',
      title: 'Abläufe, die Zeit sparen.',
      desc: 'Anfragen, Bestellungen, Kommunikation und interne Abläufe: Wir schauen, was sich digitalisieren, vereinfachen oder automatisieren lässt.',
      visual: visual1,
    },
    {
      n: '02',
      icon: <Icon.Automation />,
      kicker: 'Automatisierte Workflows',
      title: 'Prozesse, die von selbst laufen.',
      desc: 'CRM-Synchronisierung, automatisierte E-Mail-Sequenzen, Buchungssysteme und Benachrichtigungen — alles ohne manuellen Aufwand.',
      visual: visual2,
    },
    {
      n: '03',
      icon: <Icon.Dashboard />,
      kicker: 'Dashboard',
      title: 'Dein Betrieb auf einen Blick.',
      desc: 'Umsatz, Ausgaben, Zeit und Projekte — alles in einem System. Kein Spreadsheet-Chaos, kein Raten, nur Klarheit.',
      url: 'https://ls-plum-alpha.vercel.app',
      visual: visual3,
    },
  ];

  return (
    <Frame id="leistungen" bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <Eyebrow color={B.yellow}>Was ich anbiete</Eyebrow>

          <h2
            style={{
              marginTop: 18,
              fontSize: 'clamp(1.8rem,5vw,3.25rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: B.cream,
            }}
          >
            Systeme, die deinen Betrieb <Serif color={B.yellow}>entlasten.</Serif>
          </h2>

          <p style={{ fontSize: 15, color: 'rgba(245,242,235,0.52)', maxWidth: 520, margin: '16px auto 56px', lineHeight: 1.72 }}>
            Kein Paket. Erst verstehen, wo der Hebel liegt — dann gezielt umsetzen.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 2 }}>
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <LeistungCard {...s} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={260}>
          <div
            style={{
              marginTop: 28,
              padding: '18px 26px',
              border: '1px solid rgba(245,242,235,0.07)',
              borderRadius: 14,
              background: 'rgba(245,242,235,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 15, color: 'rgba(245,242,235,0.50)' }}>
              Webdesign? Dafür gibt es Paveo.
            </span>
            <a
              href="https://paveo360.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: B.yellow,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              paveo360.de <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </Frame>
  );
}

function PhaseZeroV2() {
  const phases = [
    {
      n: '0',
      label: 'Phase 0',
      title: 'Analyse',
      badge: 'Kostenlos',
      time: 'in 24–72h',
      desc: 'Ich schaue mir alles an. Website, Print, Social, Prozesse. Du bekommst eine ehrliche Einschätzung — schriftlich.',
      highlight: true,
      visual: (
        <div style={{ height: 160, background: 'linear-gradient(180deg,#1B1812,#15110a)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(232,168,0,.10) 1px, transparent 0)', backgroundSize:'16px 16px', opacity:.5, pointerEvents:'none' }} />
          <div style={{ width:64, height:80, background:'#F5F2EB', borderRadius:3, position:'relative', transform:'rotate(-4deg)', boxShadow:'0 8px 20px rgba(0,0,0,.5)', padding:'10px 8px', display:'flex', flexDirection:'column', gap:5 }}>
            {[60,90,75,85,50].map((w,i) => <span key={i} style={{ display:'block', height:3, borderRadius:2, background:'#0E0C08', opacity:.55, width:`${w}%` }} />)}
            <div style={{ position:'absolute', top:-3, right:-3, width:14, height:14, background:'#E8A800', borderRadius:'50%', boxShadow:'0 0 0 4px rgba(232,168,0,.25)' }} />
          </div>
        </div>
      ),
    },
    {
      n: '1',
      label: 'Phase 1',
      title: 'Erste Umsetzung',
      badge: 'Zahlung nur bei Zufriedenheit',
      time: '1–3 Wochen',
      desc: 'Das erste konkrete Ergebnis. Du siehst es fertig — und entscheidest dann, ob du zahlst.',
      visual: (
        <div style={{ height: 160, background: 'linear-gradient(180deg,#1B1812,#15110a)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(232,168,0,.10) 1px, transparent 0)', backgroundSize:'16px 16px', opacity:.5, pointerEvents:'none' }} />
          <div style={{ width:120, height:80, background:'#1B1812', border:'1px solid rgba(245,242,235,.10)', borderRadius:8, overflow:'hidden', boxShadow:'0 8px 24px rgba(0,0,0,.4)' }}>
            <div style={{ height:18, background:'rgba(245,242,235,.04)', display:'flex', alignItems:'center', paddingInline:8, gap:4, borderBottom:'1px solid rgba(245,242,235,.06)' }}>
              {[0,1,2].map(i => <span key={i} style={{ width:5, height:5, borderRadius:'50%', background:'rgba(245,242,235,.15)', display:'inline-block' }} />)}
            </div>
            <div style={{ padding:'8px 10px', display:'flex', flexDirection:'column', gap:5 }}>
              <span style={{ height:3, borderRadius:2, background:'#E8A800', width:'70%', display:'block' }} />
              <span style={{ height:3, borderRadius:2, background:'rgba(245,242,235,.15)', display:'block' }} />
              <span style={{ height:3, borderRadius:2, background:'rgba(245,242,235,.15)', width:'55%', display:'block' }} />
            </div>
          </div>
          <div style={{ position:'absolute', bottom:14, right:14, background:B.yellow, borderRadius:6, padding:'4px 10px', fontFamily:FONTS.hand, fontSize:14, color:B.ink, fontWeight:700, transform:'rotate(-3deg)' }}>
            Fertig!
          </div>
        </div>
      ),
    },
    {
      n: '2+',
      label: 'Phase 2+',
      title: 'Weitere Schritte',
      badge: 'Immer nach Fertigstellung',
      time: 'on demand',
      desc: 'Kein Vertrag. Kein Paket. Wir arbeiten so lange, wie es sinnvoll ist.',
      visual: (
        <div style={{ height: 160, background: 'linear-gradient(180deg,#1B1812,#15110a)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(232,168,0,.10) 1px, transparent 0)', backgroundSize:'16px 16px', opacity:.5, pointerEvents:'none' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[{done:true,label:'Website live'},{done:true,label:'CRM verknüpft'},{done:false,label:'Automation'},{done:false,label:'Dashboard'}].map((item,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:14, height:14, borderRadius:3, border:`1.5px solid ${item.done ? '#E8A800' : 'rgba(245,242,235,.2)'}`, background: item.done ? '#E8A800' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {item.done && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#0E0C08" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize:11, fontWeight:600, color: item.done ? 'rgba(245,242,235,.7)' : 'rgba(245,242,235,.3)', letterSpacing:'0.01em' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Frame id="phase-zero" bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 64 }}>
          <Eyebrow color={B.yellow}>Wie wir arbeiten</Eyebrow>

          <h2
            style={{
              marginTop: 18,
              fontSize: 'clamp(1.8rem,5vw,3.25rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: B.cream,
            }}
          >
            Du zahlst erst,
            <br />
            wenn es dir <Serif color={B.yellow}>gefällt.</Serif>
          </h2>

          <p
            style={{
              marginTop: 18,
              fontSize: 16,
              color: 'rgba(245,242,235,0.55)',
              lineHeight: 1.7,
              maxWidth: 460,
              marginInline: 'auto',
            }}
          >
            Das ist keine Floskel. Phase 0 ist kostenlos. Du siehst, was möglich ist — und entscheidest dann.
          </p>
        </div>
      </Reveal>

      <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
        {/* Dashed connector line behind cards */}
        <div style={{
          position: 'absolute', top: 80, left: 'calc(33.33% - 10px)', right: 'calc(33.33% - 10px)',
          height: 1, borderTop: '2px dashed rgba(232,168,0,.2)', pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))', gap: 20 }}>
          {phases.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                background: p.highlight ? 'linear-gradient(145deg, rgba(232,168,0,0.10), rgba(232,168,0,0.03))' : 'rgba(245,242,235,0.02)',
                border: p.highlight ? '1.5px solid rgba(232,168,0,0.35)' : '1px solid rgba(245,242,235,0.07)',
                display: 'flex', flexDirection: 'column',
                zIndex: 1,
              }}>
                {p.highlight && (
                  <div style={{ position:'absolute', top:14, right:14, zIndex:3 }}>
                    <StickyNote color={B.yellow} rotate={4} style={{ fontSize:12, padding:'5px 10px' }}>
                      Hier steigen wir ein
                    </StickyNote>
                  </div>
                )}

                {/* Visual mockup */}
                {p.visual}

                {/* Card body */}
                <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: p.highlight ? B.yellow : 'rgba(245,242,235,0.06)',
                      border: p.highlight ? 'none' : '1.5px solid rgba(245,242,235,.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 900,
                      color: p.highlight ? B.ink : 'rgba(245,242,235,.45)',
                      flexShrink: 0,
                    }}>
                      {p.n}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.highlight ? B.yellow : 'rgba(245,242,235,.3)', marginBottom: 2 }}>
                        {p.label}
                      </div>
                      <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.01em', color: p.highlight ? B.cream : 'rgba(245,242,235,.7)', lineHeight: 1.2 }}>
                        {p.title}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: 13.5, lineHeight: 1.7, color: p.highlight ? 'rgba(245,242,235,.62)' : 'rgba(245,242,235,.42)', margin: 0 }}>
                    {p.desc}
                  </p>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(245,242,235,.06)', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                      background: p.highlight ? B.yellow : 'rgba(245,242,235,0.04)',
                      color: p.highlight ? B.ink : 'rgba(245,242,235,.45)',
                      border: p.highlight ? 'none' : '1px solid rgba(245,242,235,.08)',
                    }}>
                      {p.badge}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(245,242,235,.3)', letterSpacing: '0.04em' }}>
                      {p.time}
                    </span>
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

function WarumLeonV2() {
  const rows = [
    { label: 'Bezahlung', them: 'Vorauskasse — Ergebnis offen', us: 'Erst zahlen, wenn es dir gefällt' },
    { label: 'Erste Ergebnisse', them: 'Wochen Wartezeit', us: 'In 24–72 Stunden' },
    { label: 'Kommunikation', them: 'Account- & Projektmanager', us: 'Direkt mit mir' },
    { label: 'Risiko', them: 'Geld weg, Ergebnis unsicher', us: 'Gefällt es nicht? Kostet nichts.' },
    { label: 'Vertrag', them: '12 Monate Mindestlaufzeit', us: 'Kein Vertrag, kein Paket' },
  ];

  return (
    <Frame id="warum-leon" bg={B.cream} padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>Warum Leon</Eyebrow>

          <h2
            style={{
              marginTop: 18,
              fontSize: 'clamp(1.8rem,5vw,3.25rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: B.ink,
            }}
          >
            Klassische Agentur —
            <br />
            oder einfach <Serif color={B.ocker}>Leon.</Serif>
          </h2>

          <p
            style={{
              marginTop: 18,
              fontSize: 16,
              color: 'rgba(26,23,18,0.55)',
              lineHeight: 1.7,
              maxWidth: 540,
              marginInline: 'auto',
            }}
          >
            Keine Agentur-Struktur bedeutet: kein Overhead, keine Verzögerungen, kein Umweg.
            Du kommunizierst direkt mit der Person, die umsetzt.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="comp-scroll" style={{ maxWidth: 880, margin: '0 auto', overflowX: 'auto' }}>
          <div className="comp-inner" style={{ minWidth: 680 }}>
            <div className="comp-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 4, marginBottom: 4 }}>
              <div />
              <div
                className="comp-them"
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px 14px 0 0',
                  background: 'rgba(26,23,18,0.05)',
                  border: '1px solid rgba(26,23,18,0.08)',
                  borderBottom: 'none',
                  fontSize: 14,
                  fontWeight: 800,
                  color: 'rgba(26,23,18,0.45)',
                  textAlign: 'center',
                }}
              >
                Klassische Agentur
              </div>

              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px 14px 0 0',
                  background: B.ink,
                  color: B.cream,
                  border: `1px solid ${B.ink}`,
                  borderBottom: 'none',
                  fontSize: 14,
                  fontWeight: 800,
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                Leon Seitz
                <span
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 18,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: B.yellow,
                  }}
                />
              </div>
            </div>

            {rows.map((r, i) => {
              const isLast = i === rows.length - 1;

              return (
                <div key={r.label} className="comp-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 4, marginBottom: isLast ? 0 : 4 }}>
                  <div
                    style={{
                      padding: '18px 12px',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(26,23,18,0.45)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {r.label}
                  </div>

                  <div
                    className="comp-them"
                    style={{
                      padding: '18px 20px',
                      background: '#fff',
                      border: '1px solid rgba(26,23,18,0.07)',
                      borderTop: 'none',
                      borderRadius: isLast ? '0 0 0 14px' : 0,
                      fontSize: 14,
                      color: 'rgba(26,23,18,0.50)',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1.5,
                    }}
                  >
                    {r.them}
                  </div>

                  <div
                    style={{
                      padding: '18px 20px',
                      background: '#1f1d18',
                      color: B.cream,
                      border: '1px solid #1f1d18',
                      borderTop: 'none',
                      borderRadius: isLast ? '0 0 14px 0' : 0,
                      fontSize: 14,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      lineHeight: 1.5,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7.5L5.5 11L12 4" stroke={B.yellow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ textAlign: 'left' }}>{r.us}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}

const PROJEKTE = [
  {
    id: 'kfa',
    img: '/projekte/kfa.png',
    kategorie: 'Gesamtprojekt — Fundraising',
    name: 'KFA Aschaffenburg',
    desc: '21.000 € in 2 Monaten. Konzept, Branding und Landing Page — komplett ohne Werbebudget. Als Teil des Umsetzungsteams.',
    url: 'https://kfa-fundraising.vercel.app/',
  },
  {
    id: 'star-doener',
    img: '/projekte/star-doener.png',
    kategorie: 'Gesamtprojekt — Gastronomie',
    name: 'Star Döner',
    desc: 'Digitaler Auftritt, Speisekarte und klare Conversion für ein lokales Restaurant. Als Teil des Umsetzungsteams.',
    url: 'https://star-doner-website.vercel.app/',
  },
  {
    id: 'angelo',
    img: '/projekte/angelo.png',
    kategorie: 'Gesamtprojekt — Booking & Branding',
    name: 'Angelo DJ',
    desc: 'Booking-Seite, Branding und direkte Anfragestrecke für einen DJ. Als Teil des Umsetzungsteams.',
    url: 'https://angelo-site.vercel.app/',
  },
  {
    id: 'dashboard',
    img: '/projekte/dashboard.png',
    kategorie: 'Eigenes Tool',
    name: 'Finance & Strategy Dashboard',
    desc: 'Ein digitales Betriebssystem für Solo-Unternehmer. Finanzen, Zeit, Projekte — alles an einem Ort, ohne Spreadsheet-Chaos.',
    url: 'https://ls-plum-alpha.vercel.app',
  },
];

const FRAME_MOCKS = {
  kfa: { bg: '#F5F2EB', headline: '#0E0C08', sub: 'rgba(14,12,8,.5)' },
  'star-doener': { bg: '#0E0C08', headline: '#E8A800', sub: 'rgba(245,242,235,.4)' },
  angelo: { bg: '#15110a', headline: '#E8A800', sub: 'rgba(245,242,235,.35)' },
  dashboard: { bg: '#F0EDE6', headline: '#0E0C08', sub: 'rgba(14,12,8,.45)', hasGrid: true },
};

function FrameMock({ id, name }) {
  const m = FRAME_MOCKS[id] || FRAME_MOCKS.kfa;
  return (
    <div style={{ width: '85%', maxWidth: 340, background: m.bg, borderRadius: 10, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,.18)', border: '1px solid rgba(0,0,0,.08)' }}>
      {/* Browser bar */}
      <div style={{ height: 28, background: id === 'kfa' || id === 'dashboard' ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', paddingInline: 10, gap: 5 }}>
        {[0,1,2].map(i => <span key={i} style={{ width:7, height:7, borderRadius:'50%', background: id === 'kfa' || id === 'dashboard' ? 'rgba(0,0,0,.18)' : 'rgba(255,255,255,.2)', display:'inline-block' }} />)}
      </div>
      {/* Body */}
      <div style={{ padding: '16px 18px' }}>
        {m.hasGrid ? (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:10 }}>
            {['#E8A800','#4285F4','#34A853','#EA4335'].map((c,i) => (
              <div key={i} style={{ height:28, borderRadius:5, background:c, opacity:.8 }} />
            ))}
          </div>
        ) : null}
        <div style={{ height:10, borderRadius:4, background:m.headline, width:'65%', marginBottom:8, opacity:.9 }} />
        <div style={{ height:6, borderRadius:4, background:m.sub, width:'90%', marginBottom:5 }} />
        <div style={{ height:6, borderRadius:4, background:m.sub, width:'75%', marginBottom:5 }} />
        <div style={{ height:6, borderRadius:4, background:m.sub, width:'55%' }} />
      </div>
    </div>
  );
}

function ReferenzCard({ id, img, kategorie, name, desc, url, isEven }) {
  const [h, setH] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        className="ref-card-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: isEven ? '.95fr 1.05fr' : '1.05fr .95fr',
          gap: 0,
          borderRadius: 20,
          overflow: 'hidden',
          background: '#F5F2EB',
          transition: 'transform .25s cubic-bezier(0.4,0,0.2,1), box-shadow .25s',
          transform: h ? 'translateY(-4px)' : 'none',
          boxShadow: h
            ? '0 16px 48px rgba(14,12,8,0.12)'
            : '0 4px 20px rgba(14,12,8,0.06)',
        }}
      >
        <div
          className="ref-card-img"
          style={{
            position: 'relative',
            minHeight: 280,
            overflow: 'hidden',
            background: FRAME_MOCKS[id]?.bg || '#F5F2EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            order: isEven ? 2 : 0,
          }}
        >
          {/* Category tag */}
          <span style={{
            position: 'absolute', top: 18, left: 18, zIndex: 3,
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: 100,
            background: 'rgba(14,12,8,.12)', color: 'rgba(14,12,8,.65)',
            backdropFilter: 'blur(4px)',
          }}>
            {kategorie.split(' — ')[1] || kategorie}
          </span>

          <FrameMock id={id} name={name} />

          <img
            src={img}
            alt={name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              transform: h ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform .5s cubic-bezier(0.4,0,0.2,1)',
            }}
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div
          className="ref-card-text"
          style={{
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: B.ocker,
              marginBottom: 10,
            }}
          >
            {kategorie}
          </div>

          <div
            style={{
              fontSize: 'clamp(1.2rem,2vw,1.6rem)',
              fontWeight: 900,
              color: B.black,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            {name}
          </div>

          <p
            style={{
              fontSize: 15,
              color: 'rgba(14,12,8,0.62)',
              lineHeight: 1.75,
              margin: 0,
              marginBottom: 24,
            }}
          >
            {desc}
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 700,
              color: h ? B.ocker : 'rgba(14,12,8,0.38)',
              transition: 'color .2s',
            }}
          >
            Projekt ansehen
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </a>
  );
}

function ReferenzenSection() {
  return (
    <Frame id="referenzen" bg={B.cream} padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>Referenzen</Eyebrow>

          <h2
            style={{
              marginTop: 20,
              fontSize: 'clamp(1.6rem,5vw,3rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: B.black,
            }}
          >
            Gesamtprojekte, bei denen ich <Serif color={B.ocker}>dabei war.</Serif>
          </h2>

          <p
            style={{
              marginTop: 16,
              fontSize: 15,
              color: 'rgba(14,12,8,0.52)',
              lineHeight: 1.75,
              maxWidth: 480,
              marginInline: 'auto',
            }}
          >
            Nicht Webdesign-Aufträge — sondern Projekte, bei denen ich als Teil des Teams von Konzept bis Umsetzung mitgemacht habe.
          </p>
        </div>
      </Reveal>

      <div
        style={{
          maxWidth: 920,
          margin: '48px auto 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {PROJEKTE.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ReferenzCard {...p} isEven={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={240}>
        <div style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}>
          <BtnPrimary label="Kostenlose Analyse anfragen" href="#next" />
        </div>
      </Reveal>
    </Frame>
  );
}

function NextStepsV2() {
  const steps = [
    {
      n: '01',
      title: 'Anfrage schicken',
      desc: 'Trag ein, wo du stehst: Ziel, aktueller Stand, gewünschter Beginn. Das dauert 2 Minuten.',
    },
    {
      n: '02',
      title: 'Kostenlose Analyse',
      desc: 'Ich schaue mir deinen Auftritt an und gebe dir eine ehrliche Einschätzung. Keine versteckte Agenda.',
    },
    {
      n: '03',
      title: 'Erste Umsetzung',
      desc: 'Du siehst das Ergebnis — und entscheidest dann, ob du zahlst.',
    },
  ];

  return (
    <Frame id="next" bg={B.cream} padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 56 }}>
          <span
            style={{
              display: 'inline-block',
              padding: '5px 14px',
              borderRadius: 100,
              background: B.ink,
              color: B.cream,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            Phase 0 — Kostenlos
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.8rem,5vw,3.25rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: B.ink,
            }}
          >
            Lass uns reden.
            <br />
            <Serif color={B.ocker}>Kein Commitment.</Serif>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div
          style={{
            maxWidth: 920,
            margin: '0 auto 48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))',
            gap: 28,
            position: 'relative',
          }}
        >
          {steps.map(s => (
            <div key={s.n} style={{ textAlign: 'center', padding: '0 16px', position: 'relative' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: B.yellow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 900,
                  color: B.ink,
                  margin: '0 auto 18px',
                  boxShadow: '0 0 0 6px rgba(232,168,0,0.10)',
                }}
              >
                {s.n}
              </div>

              <div style={{ fontSize: 18, fontWeight: 800, color: B.ink, marginBottom: 8, letterSpacing: '-0.01em' }}>
                {s.title}
              </div>

              <p style={{ fontSize: 13, color: 'rgba(26,23,18,0.55)', lineHeight: 1.65, margin: 0, maxWidth: 220, marginInline: 'auto' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div
          style={{
            maxWidth: 580,
            margin: '0 auto',
            background: '#fff',
            borderRadius: 22,
            padding: '36px 36px',
            boxShadow: '0 4px 32px rgba(26,23,18,0.07)',
            border: '1px solid rgba(26,23,18,0.06)',
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: B.ink, marginBottom: 20, letterSpacing: '-0.01em' }}>
            Analyse anfragen — kostenlos &amp; unverbindlich
          </div>

          <LeadFormLight />
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/4916095757167?text=Hi%20Leon%2C%0A%0AZiel%3A%0ADeadline%3A%0AStand%3A%0A%0AKurzer%20Kontext%3A"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 22px',
              borderRadius: 100,
              background: '#25D366',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <Icon.WA /> WhatsApp
          </a>

          <a
            href="mailto:hello@leonseitz.com?subject=Kostenlose Analyse&body=Meine Website: %0D%0AZiel: %0D%0ADeadline (optional): %0D%0A"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 22px',
              borderRadius: 100,
              border: '1px solid rgba(26,23,18,0.16)',
              color: 'rgba(26,23,18,0.62)',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <Mail size={14} /> E-Mail
          </a>
        </div>
      </Reveal>
    </Frame>
  );
}

function FAQV2() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: 'Was kostet die kostenlose Analyse wirklich?',
      a: 'Nichts. Du bekommst eine ehrliche schriftliche Einschätzung deines Auftritts. Wenn du danach mit mir arbeiten willst, klären wir den Preis im zweiten Schritt. Wenn nicht — kein Problem.',
    },
    {
      q: 'Wie schnell bekomme ich erste Ergebnisse?',
      a: 'Die Analyse landet innerhalb von 24–72 Stunden in deinem Postfach. Erste Umsetzungen sehen wir uns je nach Umfang in 1–3 Wochen an.',
    },
    {
      q: 'Muss ich vorher zahlen?',
      a: 'Nein. Phase 0 ist kostenlos. Phase 1 zahlst du erst, wenn dir das Ergebnis gefällt. Kein Vertrag, keine Vorauskasse.',
    },
    {
      q: 'Wie unterscheidet sich das von einer Agentur?',
      a: 'Du sprichst direkt mit mir. Kein Account-Manager, kein Projektmanager dazwischen. Kein Paket, keine Mindestlaufzeit. Du zahlst für das, was wir machen — nicht für Overhead.',
    },
    {
      q: 'Was, wenn ich gar nicht weiß, was ich brauche?',
      a: 'Genau dafür ist Phase 0 da. Ich schaue mir alles an — Website, Social, Print — und sage dir, wo der Hebel liegt. Du musst vorher nichts wissen.',
    },
    {
      q: 'Kannst du auch nur einzelne Sachen machen, z.B. nur Flyer?',
      a: 'Ja. Wenn du nur einen konkreten Bedarf hast, machen wir das. Wenn ich glaube, dass mehr Sinn ergibt, sage ich es — aber die Entscheidung liegt bei dir.',
    },
  ];

  return (
    <Frame id="faq" bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow color={B.yellow}>Noch Fragen?</Eyebrow>

          <h2
            style={{
              marginTop: 18,
              fontSize: 'clamp(1.8rem,5vw,3.25rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: B.cream,
            }}
          >
            Was Kunden vorher <Serif color={B.yellow}>wissen wollen.</Serif>
          </h2>
        </div>
      </Reveal>

      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {faqs.map((f, i) => {
          const isOpen = open === i;

          return (
            <div
              key={f.q}
              style={{
                borderTop: i === 0 ? '1px solid rgba(245,242,235,0.10)' : 'none',
                borderBottom: '1px solid rgba(245,242,235,0.10)',
                padding: '24px 4px',
                background: isOpen ? 'rgba(232,168,0,0.04)' : 'transparent',
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 24,
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: FONTS.sans,
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: B.cream,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.35,
                    flex: 1,
                  }}
                >
                  {f.q}
                </div>

                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isOpen ? B.yellow : 'rgba(245,242,235,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? B.ink : 'rgba(245,242,235,0.5)',
                    fontSize: 16,
                    fontWeight: 900,
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    transition: 'transform .2s',
                  }}
                >
                  +
                </div>
              </button>

              {isOpen && (
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: 'rgba(245,242,235,0.62)',
                    maxWidth: 620,
                  }}
                >
                  {f.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Reveal delay={140}>
        <div
          style={{
            maxWidth: 580,
            margin: '48px auto 0',
            textAlign: 'center',
            padding: '24px 28px',
            border: '1px solid rgba(232,168,0,0.20)',
            background: 'rgba(232,168,0,0.04)',
            borderRadius: 16,
          }}
        >
          <div style={{ fontSize: 14, color: 'rgba(245,242,235,0.65)', marginBottom: 12 }}>
            Noch was Konkretes?
          </div>

          <a
            href="mailto:hello@leonseitz.com?subject=Kurze Frage"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '11px 24px',
              borderRadius: 100,
              background: B.yellow,
              color: B.ink,
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            Kurz nachfragen →
          </a>
        </div>
      </Reveal>
    </Frame>
  );
}

function TestimonialsV2() {
  const testimonials = [
    {
      quote:
        'Von der ersten Idee bis zur finalen Umsetzung alles auf sehr hohem professionellen Niveau. Meine Wünsche wurden vollständig berücksichtigt und sinnvolle Vorschläge eingebracht. Die Website ist modern, funktional und optisch sehr ansprechend.',
      name: 'Oksana Hettinger',
    },
    {
      quote:
        'Ich kann Leon uneingeschränkt weiterempfehlen. Die Zusammenarbeit ist immer kooperativ, effektiv und zielführend.',
      name: 'Dominic Hildebrandt',
    },
  ];

  return (
    <Frame id="stimmen" bg={B.cream} padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>Stimmen</Eyebrow>

          <h2
            style={{
              marginTop: 18,
              fontSize: 'clamp(1.8rem,5vw,3.25rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: B.ink,
            }}
          >
            Was Kunden <Serif color={B.ocker}>sagen.</Serif>
          </h2>
        </div>
      </Reveal>

      <div
        style={{
          maxWidth: 920,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
          gap: 24,
        }}
      >
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <div
              style={{
                padding: '32px 32px',
                background: '#fff',
                borderRadius: 20,
                boxShadow: '0 2px 16px rgba(26,23,18,0.06)',
                border: '1px solid rgba(26,23,18,0.05)',
                position: 'relative',
                textAlign: 'left',
                minHeight: '100%',
              }}
            >
              <div style={{ display: 'flex', gap: 2, marginBottom: 18 }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC05">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(26,23,18,0.72)', margin: 0, marginBottom: 24 }}>
                „{t.quote}“
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${B.yellow}, ${B.ocker})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 900,
                    color: B.ink,
                  }}
                >
                  {t.name[0]}
                </div>

                <div style={{ fontSize: 14, fontWeight: 800, color: B.ink }}>
                  {t.name}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={180}>
        <div
          style={{
            maxWidth: 720,
            margin: '64px auto 0',
            padding: '32px 40px',
            borderRadius: 22,
            background: B.ink,
            color: B.cream,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: B.cream, marginBottom: 6 }}>
              Bereit für Phase 0?
            </div>

            <div style={{ fontSize: 13, color: 'rgba(245,242,235,0.55)' }}>
              Kostenlose Analyse — Antwort innerhalb von 24h.
            </div>
          </div>

          <a
            href="#next"
            style={{
              padding: '14px 28px',
              borderRadius: 100,
              background: B.yellow,
              color: B.ink,
              fontSize: 14,
              fontWeight: 800,
              boxShadow: '0 4px 20px rgba(232,168,0,0.28)',
              textDecoration: 'none',
            }}
          >
            Jetzt anfragen →
          </a>
        </div>
      </Reveal>

      <Footer />
    </Frame>
  );
}

function Footer() {
  return (
    <div
      style={{
        maxWidth: 960,
        margin: '72px auto 0',
        paddingTop: 28,
        borderTop: '1px solid rgba(14,12,8,0.07)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 900, color: B.black }}>Leon Seitz</span>

      <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'rgba(14,12,8,0.38)', flexWrap: 'wrap' }}>
        {[
          ['Instagram', 'https://www.instagram.com/leonnseitz'],
          ['Prozess', '/prozess'],
          ['AGB', '/agb'],
          ['Impressum', '/impressum'],
          ['Datenschutz', '/datenschutz'],
        ].map(([l, h]) => (
          <a key={l} href={h} style={{ color: 'inherit', textDecoration: 'none' }}>
            {l}
          </a>
        ))}
      </div>

      <span style={{ fontSize: 12, color: 'rgba(14,12,8,0.26)' }}>© 2026</span>
    </div>
  );
}

/* ─── GOOGLE REVIEWS ─── */
const REVIEWS = [
  {
    name: 'Oksana Hettinger',
    initials: 'OH',
    color: '#4285F4',
    rating: 5,
    date: 'vor 3 Monaten',
    text: 'Von der ersten Idee bis zur finalen Umsetzung alles auf sehr hohem professionellen Niveau. Meine Wünsche wurden vollständig berücksichtigt. Die Website ist modern, funktional und optisch sehr ansprechend.',
  },
  {
    name: 'Dominic Hildebrandt',
    initials: 'DH',
    color: '#34A853',
    rating: 5,
    date: 'vor 5 Monaten',
    text: 'Ich kann Leon uneingeschränkt weiterempfehlen. Die Zusammenarbeit ist immer kooperativ, effektiv und zielführend.',
  },
  {
    name: 'Ian',
    initials: 'I',
    color: '#EA4335',
    rating: 5,
    date: 'vor 2 Monaten',
    text: 'Schnelle Antworten, erstellt individuelle Top-Websites, Posts etc.',
  },
  {
    name: 'Laura Janke',
    initials: 'LJ',
    color: '#9C27B0',
    rating: 5,
    date: 'vor 1 Monat',
    text: 'Zuverlässig — hält Fristen wie abgesprochen ein, gute zielführende Ideen, Top-Kommunikation.',
  },
];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function StarsFilled({ n = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= n ? '#FBBC05' : '#e0e0e0'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ r }) {
  return (
    <div style={{
      width: 320,
      flexShrink: 0,
      background: 'rgba(245,242,235,.04)',
      border: '1px solid rgba(245,242,235,.10)',
      borderRadius: 14,
      padding: '20px 22px',
      backdropFilter: 'blur(6px)',
      boxShadow: '0 1px 0 rgba(245,242,235,.04) inset, 0 14px 30px rgba(0,0,0,.25)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: r.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>
          {r.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: B.cream, lineHeight: 1.2 }}>
            {r.name}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(245,242,235,.45)', marginTop: 1 }}>
            {r.date}
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <GoogleIcon />
        </div>
      </div>
      <StarsFilled n={r.rating} />
      <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'rgba(245,242,235,.7)' }}>
        {r.text}
      </p>
    </div>
  );
}

function GoogleReviewsSection() {
  return (
    <Frame bg="linear-gradient(180deg, #15110a 0%, #0E0C08 100%)" padding="56px 0 72px" style={{ color: B.cream, position: 'relative' }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, paddingInline: 36, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <GoogleIcon />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(245,242,235,.6)', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Rezensionen
            </span>
          </div>
          <div style={{ width: 1, height: 18, background: 'rgba(245,242,235,.14)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: B.cream, lineHeight: 1 }}>5,0</span>
            <StarsFilled />
            <span style={{ fontSize: 12, color: 'rgba(245,242,235,.42)', fontWeight: 500 }}>Google</span>
          </div>
        </div>
      </Reveal>

      {/* Marquee with CSS mask */}
      <div style={{
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}>
        <div className="reviews-track" style={{
          display: 'flex',
          gap: 14,
          padding: '6px 36px',
          width: 'max-content',
          animation: 'reviews-scroll 38s linear infinite',
        }}>
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  return (
    <div
      style={{
        fontFamily: FONTS.sans,
        overflowX: 'hidden',
        position: 'relative',
        maxWidth: '100vw',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=DM+Serif+Display:ital@1&family=Caveat:wght@600;700&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          scroll-behavior: smooth;
          overflow-x: hidden;
          max-width: 100vw;
          width: 100%;
          background: #000;
        }

        * {
          min-width: 0;
          box-sizing: border-box;
        }

        img,
        svg {
          max-width: 100%;
        }

        @media (max-width: 760px) {
          section {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          h1,
          h2 {
            word-break: normal;
          }
        }

        @media (max-width: 600px) {
          .ref-card-grid { grid-template-columns: 1fr !important; }
          .ref-card-img  { min-height: 220px !important; }
          .ref-card-text { padding: 24px 20px !important; }
          .leistung-img  { height: 150px !important; }
          .comp-scroll   { overflow-x: visible !important; -webkit-overflow-scrolling: touch; }
          .comp-inner    { min-width: 0 !important; }
          .comp-row      { grid-template-columns: 1fr 1.4fr !important; }
          .comp-them     { display: none !important; }
        }

        @keyframes reviews-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .reviews-track:hover {
          animation-play-state: paused;
        }

        @keyframes live-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(62,196,109,.18); }
          50%       { box-shadow: 0 0 0 7px rgba(62,196,109,.05); }
        }
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #3ec46d;
          box-shadow: 0 0 0 4px rgba(62,196,109,.18);
          animation: live-pulse 1.8s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      <ScrollBar />

      <HeroV2 />
      <GoogleReviewsSection />
      <LeistungenV2 />
      <PhaseZeroV2 />
      <ReferenzenSection />
      <NextStepsV2 />
      <FAQV2 />
      <TestimonialsV2 />
    </div>
  );
}
