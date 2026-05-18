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
function Reveal({ children, delay = 0, style: extraStyle = {} }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(18px)',
        transition: `opacity .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform .65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        ...extraStyle,
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
      style={{ background: bg, padding, position: 'relative', overflow: 'hidden', width: '100%', ...style }}
    >
      {children}
    </section>
  );
}

function Eyebrow({ children, color }) {
  return (
    <span
      style={{
        display: 'inline-block', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: color || B.ocker, padding: '5px 14px', borderRadius: 100,
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
    <em style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontWeight: 400, color: color || 'inherit' }}>
      {children}
    </em>
  );
}

function HandLine({ d, stroke, strokeWidth = 2, opacity = 1, dash }) {
  return (
    <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth}
      opacity={opacity} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} />
  );
}

function StickyNote({ children, color = B.yellow, rotate = -2, style = {} }) {
  return (
    <div style={{
      display: 'inline-block', background: color, color: B.black,
      padding: '10px 14px', borderRadius: 4, fontFamily: FONTS.hand,
      fontSize: 18, lineHeight: 1.1, transform: `rotate(${rotate}deg)`,
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
        padding: '14px 28px', borderRadius: 100,
        background: h ? B.ocker : B.yellow, color: B.black,
        fontWeight: 800, fontSize: 14, textDecoration: 'none',
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
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
    </svg>
  ),
  Automation: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
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
    question: 'Wo liegt das größte Problem?',
    options: [
      { value: 'Zu viel manuelle Arbeit', label: 'Zu viel manuelle Arbeit' },
      { value: 'Kein Überblick über Zahlen & Prozesse', label: 'Kein Überblick über Zahlen & Prozesse' },
      { value: 'Anfragen gehen verloren', label: 'Anfragen gehen verloren' },
      { value: 'Interne Abläufe zu langsam', label: 'Interne Abläufe zu langsam' },
      { value: 'Ich weiß es noch nicht genau', label: 'Ich weiß es noch nicht genau' },
    ],
  },
  {
    key: 'tools',
    type: 'select',
    question: 'Was nutzt du aktuell?',
    options: [
      { value: 'Excel / Google Sheets', label: 'Excel / Google Sheets' },
      { value: 'Papier & Stift', label: 'Papier & Stift' },
      { value: 'Einzelne Tools ohne Verbindung', label: 'Einzelne Tools ohne Verbindung' },
      { value: 'Noch gar nichts Digitales', label: 'Noch gar nichts Digitales' },
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
    hint: 'Optional — hilft mir, deinen Betrieb besser einzuschätzen.',
    optional: true,
  },
  {
    key: 'notes',
    type: 'textarea',
    question: 'Noch etwas, das ich wissen sollte?',
    placeholder: 'Z.B. Branche, Teamgröße, konkrete Abläufe die nicht funktionieren, besondere Anforderungen …',
    hint: 'Optional — je mehr Kontext, desto konkreter die Analyse.',
    optional: true,
  },
];

const INP_STYLE = {
  width: '100%', padding: '12px 14px', borderRadius: 12,
  border: '1.5px solid rgba(14,12,8,0.12)', background: '#FAFAF8',
  color: '#0E0C08', fontSize: 14, outline: 'none',
  boxSizing: 'border-box', fontFamily: FONTS.sans,
};

function LeadFormLight() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const totalSteps = INTAKE_STEPS.length;
  const isEmailStep = step === totalSteps;
  const currentStep = INTAKE_STEPS[step];

  const pick = (key, value) => { setAnswers(a => ({ ...a, [key]: value })); setStep(s => s + 1); };
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
          goal: [answers.goal, answers.tools, answers.notes].filter(Boolean).join(' · '),
          timeline: answers.timeline || '',
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 0', textAlign: 'center' }}>
        <CheckCircle2 size={36} color={B.ocker} />
        <div style={{ fontSize: 17, fontWeight: 900, color: B.black }}>Erhalten.</div>
        <p style={{ fontSize: 14, color: 'rgba(14,12,8,0.52)', lineHeight: 1.65 }}>
          Ich melde mich innerhalb von 24 Stunden mit einer konkreten Einschätzung.
        </p>
      </div>
    );
  }

  const progressPct = ((isEmailStep ? totalSteps : step) / (totalSteps + 1)) * 100;
  const BackBtn = () => (
    <button type="button" onClick={() => setStep(s => s - 1)}
      style={{ marginTop: 12, background: 'none', border: 'none', display: 'block',
        fontSize: 12, color: 'rgba(14,12,8,0.35)', cursor: 'pointer', fontFamily: FONTS.sans, padding: 0 }}>
      ← Zurück
    </button>
  );

  return (
    <div>
      <div style={{ height: 3, borderRadius: 99, background: 'rgba(14,12,8,0.07)', marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 99, background: B.ocker, width: `${progressPct}%`, transition: 'width .35s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>

      {!isEmailStep && currentStep.type === 'select' && (
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: B.black, marginBottom: 14 }}>{currentStep.question}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {currentStep.options.map(opt => (
              <button key={opt.value} type="button" onClick={() => pick(currentStep.key, opt.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, textAlign: 'left',
                  border: '1.5px solid rgba(14,12,8,0.10)', background: '#FAFAF8', color: B.black,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: FONTS.sans,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = B.ocker; e.currentTarget.style.background = 'rgba(232,168,0,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(14,12,8,0.10)'; e.currentTarget.style.background = '#FAFAF8'; }}
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
            {currentStep.optional && <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(14,12,8,0.35)', marginLeft: 8 }}>optional</span>}
          </div>
          {currentStep.hint && <p style={{ fontSize: 13, color: 'rgba(14,12,8,0.42)', marginBottom: 12, lineHeight: 1.55 }}>{currentStep.hint}</p>}
          {currentStep.type === 'input'
            ? <input type={currentStep.inputType || 'text'} placeholder={currentStep.placeholder}
                value={answers[currentStep.key] || ''} onChange={e => setAnswers(a => ({ ...a, [currentStep.key]: e.target.value }))}
                autoFocus style={{ ...INP_STYLE, marginBottom: 10 }} />
            : <textarea placeholder={currentStep.placeholder} value={answers[currentStep.key] || ''}
                onChange={e => setAnswers(a => ({ ...a, [currentStep.key]: e.target.value }))}
                rows={4} autoFocus style={{ ...INP_STYLE, resize: 'none', lineHeight: 1.6, marginBottom: 10 }} />
          }
          <button type="button" onClick={advance}
            style={{ width: '100%', padding: '12px 24px', borderRadius: 100, background: B.black, color: B.cream,
              border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: FONTS.sans }}>
            Weiter →
          </button>
          <BackBtn />
        </div>
      )}

      {isEmailStep && (
        <form onSubmit={handleSubmit}>
          <div style={{ fontSize: 15, fontWeight: 800, color: B.black, marginBottom: 6 }}>Wohin soll die Analyse?</div>
          <p style={{ fontSize: 13, color: 'rgba(14,12,8,0.45)', marginBottom: 14, lineHeight: 1.6 }}>Ich schicke dir meine Einschätzung direkt per E-Mail.</p>
          <input type="email" required autoFocus placeholder="deine@email.de" value={email}
            onChange={e => setEmail(e.target.value)} style={{ ...INP_STYLE, marginBottom: 10 }} />
          <button type="submit" disabled={status === 'loading'}
            style={{ width: '100%', padding: '13px 24px', borderRadius: 100,
              background: status === 'loading' ? 'rgba(232,168,0,0.6)' : B.yellow, color: B.black,
              border: 'none', cursor: status === 'loading' ? 'default' : 'pointer', fontWeight: 800, fontSize: 14, fontFamily: FONTS.sans }}>
            {status === 'loading' ? 'Wird gesendet…' : 'Analyse anfragen →'}
          </button>
          <button type="button" onClick={() => setStep(s => s - 1)}
            style={{ marginTop: 10, background: 'none', border: 'none', display: 'block',
              fontSize: 12, color: 'rgba(14,12,8,0.35)', cursor: 'pointer', fontFamily: FONTS.sans, padding: 0 }}>
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

/* ─── HERO ─── */
function HeroV2() {
  return (
    <Frame
      id="hero"
      bg="radial-gradient(1200px 700px at 50% -20%, rgba(232,168,0,.16), transparent 60%), linear-gradient(180deg, #0a0805 0%, #0E0C08 50%, #15110a 100%)"
      padding="0 28px"
      style={{ color: B.cream, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")` }} />

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
        <a href="#next" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '9px 18px', borderRadius: 100,
          border: '1px solid rgba(232,168,0,.32)', background: 'rgba(14,12,8,.55)',
          color: B.yellow, fontSize: 12, fontWeight: 700, textDecoration: 'none', backdropFilter: 'blur(6px)',
        }}>
          Analyse anfragen
        </a>
      </div>

      <Reveal>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem,7.2vw,5.2rem)', fontWeight: 900, lineHeight: 1.02,
            letterSpacing: '-0.035em', color: B.cream, marginBottom: 32 }}>
            Dein Betrieb läuft
            <br />
            noch auf Papier.
            <br />
            <Serif color={B.yellow}>Ich ändere das.</Serif>{' '}In 24 Stunden.
          </h1>

          <div style={{ marginTop: 44 }}>
            <BtnPrimary label="Kostenlose Analyse anfragen" href="#next" />
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}

/* ─── LEISTUNGEN ─── */
function LeistungCard({ n, icon, kicker, title, desc, visual, url }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ border: `1px solid ${h ? 'rgba(232,168,0,0.22)' : 'rgba(245,242,235,0.06)'}`,
        background: h ? '#211c14' : B.dark, textAlign: 'left', position: 'relative',
        overflow: 'hidden', transition: 'border-color .22s, background .22s', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: B.yellow,
        opacity: h ? 1 : 0, transition: 'opacity .22s' }} />
      {visual && visual}
      <div style={{ padding: '28px 32px', flex: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 16, right: 24, fontSize: 72, fontWeight: 900, lineHeight: 1,
          color: h ? 'rgba(232,168,0,0.09)' : 'rgba(245,242,235,0.04)', letterSpacing: '-0.04em', userSelect: 'none' }}>
          {n}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, marginBottom: 20,
          background: h ? 'rgba(232,168,0,0.13)' : 'rgba(245,242,235,0.05)',
          border: `1px solid ${h ? 'rgba(232,168,0,0.22)' : 'rgba(245,242,235,0.09)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: h ? B.yellow : 'rgba(245,242,235,0.45)' }}>
          {icon}
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em',
          color: B.yellow, marginBottom: 10, opacity: h ? 1 : 0.65 }}>
          {kicker}
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: B.cream, lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: 14 }}>
          {title}
        </div>
        <p style={{ fontSize: 13, color: 'rgba(245,242,235,0.48)', lineHeight: 1.72, maxWidth: 340 }}>{desc}</p>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12,
              fontWeight: 700, color: h ? B.yellow : 'rgba(245,242,235,0.35)', textDecoration: 'none', transition: 'color .2s' }}>
            Live ansehen <ArrowRight size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

function LeistungenV2() {
  const dotBg = { position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(232,168,0,.12) 1px, transparent 0)', backgroundSize:'18px 18px', opacity:.4, pointerEvents:'none' };
  const vizBase = { position:'relative', height:200, background:'linear-gradient(180deg,#15110a,#0E0C08)', borderBottom:'1px solid rgba(245,242,235,.06)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', padding:24 };

  const visual1 = (
    <div style={vizBase}>
      <div style={dotBg} />
      {/* Papier → digitales System */}
      <div style={{ width:56, height:72, background:'#F5F2EB', borderRadius:3, transform:'rotate(-5deg)', boxShadow:'0 8px 20px rgba(0,0,0,.4)', padding:'8px 7px', display:'flex', flexDirection:'column', gap:5, position:'relative' }}>
        {[60,90,75,85,50,70].map((w,i) => <span key={i} style={{ display:'block', height:2.5, borderRadius:2, background:'#0E0C08', opacity:.4, width:`${w}%` }} />)}
        <div style={{ position:'absolute', top:-3, right:-3, width:13, height:13, background:'#E8A800', borderRadius:'50%' }} />
      </div>
      <svg style={{ margin:'0 14px', color:'rgba(232,168,0,.7)', flexShrink:0 }} width="32" height="14" viewBox="0 0 32 14" fill="none">
        <path d="M2 7h26M22 2l6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
      </svg>
      <div style={{ width:92, height:72, background:'#1B1812', border:'1px solid rgba(232,168,0,.3)', borderRadius:8, padding:8, display:'flex', flexDirection:'column', gap:5, boxShadow:'0 10px 28px rgba(232,168,0,.18)' }}>
        <div style={{ display:'flex', gap:3, marginBottom:3 }}>{[0,1,2].map(i => <span key={i} style={{ width:4, height:4, borderRadius:'50%', background:'rgba(232,168,0,.5)', display:'block' }} />)}</div>
        <span style={{ height:3, borderRadius:2, background:'#E8A800', width:'60%', display:'block' }} />
        <span style={{ height:3, borderRadius:2, background:'rgba(245,242,235,.18)', display:'block' }} />
        <span style={{ height:3, borderRadius:2, background:'rgba(245,242,235,.18)', width:'45%', display:'block' }} />
        <span style={{ height:3, borderRadius:2, background:'rgba(245,242,235,.18)', display:'block' }} />
      </div>
    </div>
  );

  const visual2 = (
    <div style={vizBase}>
      <div style={dotBg} />
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible' }} viewBox="0 0 280 140" preserveAspectRatio="none">
        <path d="M 56 70 Q 100 30, 140 70 T 224 70" fill="none" stroke="rgba(232,168,0,.45)" strokeWidth="1.4" strokeDasharray="3 4"/>
        <path d="M 56 70 Q 100 110, 140 70 T 224 70" fill="none" stroke="rgba(232,168,0,.25)" strokeWidth="1.4" strokeDasharray="3 4"/>
      </svg>
      <div style={{ display:'flex', gap:48, alignItems:'center', position:'relative', zIndex:2 }}>
        {[
          <svg key={0} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
          <svg key={1} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
          <svg key={2} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
        ].map((icon, i) => (
          <div key={i} style={{ width: i===1?54:46, height: i===1?54:46, borderRadius:'50%',
            background: i===1?'#E8A800':'#1B1812', border:`1.5px solid ${i===1?'#E8A800':'rgba(232,168,0,.4)'}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            color: i===1?'#0E0C08':'#E8A800',
            boxShadow: i===1?'0 0 0 6px rgba(232,168,0,.12), 0 0 0 14px rgba(232,168,0,.05)':'none' }}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );

  const visual3 = (
    <div style={vizBase}>
      <div style={dotBg} />
      <div style={{ width:'100%', maxWidth:280, background:'#15110a', border:'1px solid rgba(245,242,235,.08)', borderRadius:10, padding:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, boxShadow:'0 14px 36px rgba(0,0,0,.4)' }}>
        {[{lbl:'Umsatz',val:'12.4k',gold:true},{lbl:'Anfragen',val:'38',gold:false}].map(s => (
          <div key={s.lbl} style={{ background:'#1B1812', border:'1px solid rgba(245,242,235,.06)', borderRadius:6, padding:'8px 10px' }}>
            <div style={{ fontSize:7.5, color:'rgba(245,242,235,.4)', letterSpacing:'.08em', textTransform:'uppercase', fontWeight:700, marginBottom:4 }}>{s.lbl}</div>
            <div style={{ fontSize:15, fontWeight:900, color: s.gold?'#E8A800':'#F5F2EB', letterSpacing:'-.01em' }}>{s.val}</div>
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
      n: '01', icon: <Icon.Prozesse />, kicker: 'Digitale Prozesse',
      title: 'Weniger Papier. Weniger Fehler.',
      desc: 'Anfragen, Bestellungen, Kommunikation — ich analysiere, welche Abläufe in deinem Betrieb digitalisiert werden können, und setze die sinnvollsten zuerst um.',
      visual: visual1,
    },
    {
      n: '02', icon: <Icon.Automation />, kicker: 'KI-Workflows',
      title: 'Abläufe, die von selbst laufen.',
      desc: 'Automatische Antworten, CRM-Synchronisierung, Buchungssysteme, interne Benachrichtigungen — ohne manuellen Aufwand, gebaut mit modernen KI-Tools.',
      visual: visual2,
    },
    {
      n: '03', icon: <Icon.Dashboard />, kicker: 'Dashboard',
      title: 'Dein Betrieb auf einen Blick.',
      desc: 'Umsatz, Ausgaben, offene Projekte — alles in einem System. Kein Spreadsheet-Chaos. Kein Raten. Nur Klarheit über das, was gerade läuft.',
      url: 'https://ls-plum-alpha.vercel.app',
      visual: visual3,
    },
  ];

  return (
    <Frame id="leistungen" bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <Eyebrow color={B.yellow}>Was ich anbiete</Eyebrow>
          <h2 style={{ marginTop: 18, fontSize: 'clamp(1.8rem,5vw,3.25rem)', fontWeight: 900,
            lineHeight: 1.08, letterSpacing: '-0.025em', color: B.cream }}>
            Systeme, die deinen Betrieb <Serif color={B.yellow}>entlasten.</Serif>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(245,242,235,0.52)', maxWidth: 520, margin: '16px auto 56px', lineHeight: 1.72 }}>
            Kein Paket. Erst verstehen, wo Zeit und Geld verloren gehen — dann gezielt umsetzen.
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 2, alignItems: 'stretch' }}>
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} style={{ height: '100%' }}><LeistungCard {...s} /></Reveal>
          ))}
        </div>
        <Reveal delay={260}>
          <div style={{ marginTop: 28, padding: '18px 26px', border: '1px solid rgba(245,242,235,0.07)',
            borderRadius: 14, background: 'rgba(245,242,235,0.02)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 15, color: 'rgba(245,242,235,0.50)' }}>Webdesign? Dafür gibt es Paveo.</span>
            <a href="https://paveo360.de" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 15, fontWeight: 700, color: B.yellow, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              paveo360.de <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </Frame>
  );
}

/* ─── PHASE ZERO ─── */
function PhaseZeroV2() {
  const dotBg = { position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(232,168,0,.10) 1px, transparent 0)', backgroundSize:'16px 16px', opacity:.5, pointerEvents:'none' };

  const phases = [
    {
      n: '0', label: 'Phase 0', title: 'Analyse', badge: 'Kostenlos', time: 'in 24–72h', highlight: true,
      desc: 'Ich schaue mir deinen Betrieb an — welche Abläufe existieren, wo Zeit verloren geht, was sich automatisieren lässt. Du bekommst eine ehrliche Einschätzung, schriftlich.',
      visual: (
        <div style={{ height:160, background:'linear-gradient(180deg,#1B1812,#15110a)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
          <div style={dotBg} />
          <div style={{ width:64, height:80, background:'#F5F2EB', borderRadius:3, transform:'rotate(-4deg)', boxShadow:'0 8px 20px rgba(0,0,0,.5)', padding:'10px 8px', display:'flex', flexDirection:'column', gap:5, position:'relative' }}>
            {[60,90,75,85,50].map((w,i) => <span key={i} style={{ display:'block', height:3, borderRadius:2, background:'#0E0C08', opacity:.55, width:`${w}%` }} />)}
            <div style={{ position:'absolute', top:-3, right:-3, width:14, height:14, background:'#E8A800', borderRadius:'50%', boxShadow:'0 0 0 4px rgba(232,168,0,.25)' }} />
          </div>
        </div>
      ),
    },
    {
      n: '1', label: 'Phase 1', title: 'Erste Umsetzung', badge: 'Zahlung nur bei Zufriedenheit', time: '1–3 Wochen',
      desc: 'Das erste konkrete Ergebnis — ein Workflow, ein Dashboard, ein automatisierter Ablauf. Du siehst es live und entscheidest dann, ob du zahlst.',
      visual: (
        <div style={{ height:160, background:'linear-gradient(180deg,#1B1812,#15110a)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
          <div style={dotBg} />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[{done:true,label:'Analyse abgeschlossen'},{done:true,label:'Workflow gebaut'},{done:false,label:'Feedback eingeholt'},{done:false,label:'Live geschaltet'}].map((item,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:14, height:14, borderRadius:3, border:`1.5px solid ${item.done?'#E8A800':'rgba(245,242,235,.2)'}`, background:item.done?'#E8A800':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {item.done && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#0E0C08" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize:11, fontWeight:600, color:item.done?'rgba(245,242,235,.7)':'rgba(245,242,235,.3)', letterSpacing:'0.01em' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: '2+', label: 'Phase 2+', title: 'Weitere Schritte', badge: 'Immer nach Fertigstellung', time: 'on demand',
      desc: 'Kein Vertrag. Kein Paket. Wir bauen weiter, was sinnvoll ist — Schritt für Schritt, immer nach Fertigstellung.',
      visual: (
        <div style={{ height:160, background:'linear-gradient(180deg,#1B1812,#15110a)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
          <div style={dotBg} />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[{done:true,label:'Prozess 1 digitalisiert'},{done:true,label:'Workflow aktiv'},{done:false,label:'Dashboard eingerichtet'},{done:false,label:'Automatisierung'}].map((item,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:14, height:14, borderRadius:3, border:`1.5px solid ${item.done?'#E8A800':'rgba(245,242,235,.2)'}`, background:item.done?'#E8A800':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {item.done && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#0E0C08" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize:11, fontWeight:600, color:item.done?'rgba(245,242,235,.7)':'rgba(245,242,235,.3)', letterSpacing:'0.01em' }}>{item.label}</span>
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
          <h2 style={{ marginTop: 18, fontSize: 'clamp(1.8rem,5vw,3.25rem)', fontWeight: 900,
            lineHeight: 1.08, letterSpacing: '-0.025em', color: B.cream }}>
            Du zahlst erst,
            <br />
            wenn es dir <Serif color={B.yellow}>gefällt.</Serif>
          </h2>
          <p style={{ marginTop: 18, fontSize: 16, color: 'rgba(245,242,235,0.55)', lineHeight: 1.7, maxWidth: 460, marginInline: 'auto' }}>
            Phase 0 ist kostenlos. Du siehst, was möglich ist — und entscheidest dann.
          </p>
        </div>
      </Reveal>

      <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))', gap: 20 }}>
          {phases.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden',
                background: p.highlight ? 'linear-gradient(145deg, rgba(232,168,0,0.10), rgba(232,168,0,0.03))' : 'rgba(245,242,235,0.02)',
                border: p.highlight ? '1.5px solid rgba(232,168,0,0.35)' : '1px solid rgba(245,242,235,0.07)',
                display: 'flex', flexDirection: 'column', zIndex: 1 }}>
                {p.highlight && (
                  <div style={{ position:'absolute', top:14, right:14, zIndex:3 }}>
                    <StickyNote color={B.yellow} rotate={4} style={{ fontSize:12, padding:'5px 10px' }}>Hier steigen wir ein</StickyNote>
                  </div>
                )}
                {p.visual}
                <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width:34, height:34, borderRadius:'50%',
                      background: p.highlight ? B.yellow : 'rgba(245,242,235,0.06)',
                      border: p.highlight ? 'none' : '1.5px solid rgba(245,242,235,.15)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:14, fontWeight:900, color: p.highlight ? B.ink : 'rgba(245,242,235,.45)', flexShrink:0 }}>
                      {p.n}
                    </div>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
                        color: p.highlight ? B.yellow : 'rgba(245,242,235,.3)', marginBottom:2 }}>{p.label}</div>
                      <div style={{ fontSize:17, fontWeight:800, letterSpacing:'-0.01em',
                        color: p.highlight ? B.cream : 'rgba(245,242,235,.7)', lineHeight:1.2 }}>{p.title}</div>
                    </div>
                  </div>
                  <p style={{ fontSize:13.5, lineHeight:1.7, color: p.highlight ? 'rgba(245,242,235,.62)' : 'rgba(245,242,235,.42)', margin:0 }}>
                    {p.desc}
                  </p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'auto',
                    paddingTop:12, borderTop:'1px solid rgba(245,242,235,.06)', flexWrap:'wrap', gap:8 }}>
                    <span style={{ padding:'4px 12px', borderRadius:100, fontSize:11, fontWeight:700,
                      background: p.highlight ? B.yellow : 'rgba(245,242,235,0.04)',
                      color: p.highlight ? B.ink : 'rgba(245,242,235,.45)',
                      border: p.highlight ? 'none' : '1px solid rgba(245,242,235,.08)' }}>{p.badge}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:'rgba(245,242,235,.3)', letterSpacing:'0.04em' }}>{p.time}</span>
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

/* ─── REFERENZEN ─── */
const PROJEKTE = [
  {
    id: 'kfa',
    img: '/projekte/kfa.png',
    kategorie: 'Gesamtprojekt — Fundraising',
    name: 'KFA Aschaffenburg',
    desc: 'Konzept, Branding und Landing Page für eine Spendenkampagne — komplett ohne Werbebudget. Als Teil des Umsetzungsteams.',
    url: 'https://kfa-fundraising.vercel.app/',
  },
  {
    id: 'star-doener',
    img: '/projekte/star-doener.png',
    kategorie: 'Gesamtprojekt — Gastronomie',
    name: 'Star Döner',
    desc: 'Digitaler Auftritt und klare Conversion für ein lokales Restaurant. Als Teil des Umsetzungsteams.',
    url: 'https://star-doner-website.vercel.app/',
  },
  {
    id: 'angelo',
    img: '/projekte/angelo.png',
    kategorie: 'Gesamtprojekt — Booking',
    name: 'Angelo DJ',
    desc: 'Direkte Buchungsstrecke und Branding für einen DJ — keine Formulare, klares Auftreten. Als Teil des Umsetzungsteams.',
    url: 'https://angelo-site.vercel.app/',
  },
  {
    id: 'dashboard',
    img: '/projekte/dashboard.png',
    kategorie: 'Eigenes Tool',
    name: 'Finance & Strategy Dashboard',
    desc: 'Ein digitales Betriebssystem für Solo-Unternehmer. Finanzen, Projekte, Zeit — alles an einem Ort, ohne Spreadsheet-Chaos.',
    url: 'https://ls-plum-alpha.vercel.app',
  },
];

function ReferenzCard({ id, img, kategorie, name, desc, url, isEven }) {
  const [h, setH] = useState(false);
  const bgMap = { kfa:'#F5F2EB', 'star-doener':'#0E0C08', angelo:'#15110a', dashboard:'#F0EDE6' };
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ textDecoration: 'none', display: 'block' }}>
      <div className="ref-card-grid" style={{ display:'grid', gridTemplateColumns: isEven?'.95fr 1.05fr':'1.05fr .95fr',
        gap:0, borderRadius:20, overflow:'hidden', background:'#F5F2EB',
        transition:'transform .25s, box-shadow .25s',
        transform: h?'translateY(-4px)':'none',
        boxShadow: h?'0 16px 48px rgba(14,12,8,0.12)':'0 4px 20px rgba(14,12,8,0.06)' }}>
        <div className="ref-card-img" style={{ position:'relative', minHeight:280, overflow:'hidden',
          background: bgMap[id]||'#F5F2EB', display:'flex', alignItems:'center', justifyContent:'center',
          order: isEven?2:0 }}>
          <img src={img} alt={name} style={{ position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'cover', objectPosition:'center top',
            transform: h?'scale(1.04)':'scale(1)', transition:'transform .5s' }}
            onError={e => { e.currentTarget.style.display='none'; }} />
        </div>
        <div className="ref-card-text" style={{ padding:'40px 36px', display:'flex', flexDirection:'column', justifyContent:'center', gap:0 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:B.ocker, marginBottom:10 }}>{kategorie}</div>
          <div style={{ fontSize:'clamp(1.2rem,2vw,1.6rem)', fontWeight:900, color:B.black, letterSpacing:'-0.02em', lineHeight:1.15, marginBottom:14 }}>{name}</div>
          <p style={{ fontSize:15, color:'rgba(14,12,8,0.62)', lineHeight:1.75, margin:0, marginBottom:24 }}>{desc}</p>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700,
            color: h?B.ocker:'rgba(14,12,8,0.38)', transition:'color .2s' }}>
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
        <div style={{ maxWidth:720, margin:'0 auto', textAlign:'center' }}>
          <Eyebrow>Referenzen</Eyebrow>
          <h2 style={{ marginTop:20, fontSize:'clamp(1.6rem,5vw,3rem)', fontWeight:900, lineHeight:1.1,
            letterSpacing:'-0.02em', color:B.black }}>
            Projekte, bei denen ich <Serif color={B.ocker}>dabei war.</Serif>
          </h2>
          <p style={{ marginTop:16, fontSize:15, color:'rgba(14,12,8,0.52)', lineHeight:1.75, maxWidth:480, marginInline:'auto' }}>
            Keine reinen Webdesign-Aufträge — Projekte, bei denen ich als Teil des Teams von Konzept bis Umsetzung mitgemacht habe.
          </p>
        </div>
      </Reveal>
      <div style={{ maxWidth:920, margin:'48px auto 0', display:'flex', flexDirection:'column', gap:20 }}>
        {PROJEKTE.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}><ReferenzCard {...p} isEven={i % 2 === 1} /></Reveal>
        ))}
      </div>
      <Reveal delay={240}>
        <div style={{ marginTop:44, display:'flex', justifyContent:'center' }}>
          <BtnPrimary label="Kostenlose Analyse anfragen" href="#next" />
        </div>
      </Reveal>
    </Frame>
  );
}

/* ─── NEXT STEPS ─── */
function NextStepsV2() {
  const steps = [
    { n: '01', title: 'Anfrage schicken', desc: 'Beschreib kurz, wo der Schuh drückt. Was läuft manuell, was kostet Zeit. Das dauert 2 Minuten.' },
    { n: '02', title: 'Kostenlose Analyse', desc: 'Ich schaue mir deinen Betrieb an und zeige konkret, wo der Hebel liegt. Keine versteckte Agenda.' },
    { n: '03', title: 'Erste Umsetzung', desc: 'Du siehst das Ergebnis — und entscheidest dann, ob du zahlst.' },
  ];

  return (
    <Frame id="next" bg="#ffffff" padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth:720, margin:'0 auto', textAlign:'center', marginBottom:56 }}>
          <span style={{ display:'inline-block', padding:'5px 14px', borderRadius:100, background:B.ink,
            color:B.cream, fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:18 }}>
            Phase 0 — Kostenlos
          </span>
          <h2 style={{ fontSize:'clamp(1.8rem,5vw,3.25rem)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.025em', color:B.ink }}>
            Lass uns reden.
            <br />
            <Serif color={B.ocker}>Kein Commitment.</Serif>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div style={{ maxWidth:920, margin:'0 auto 48px', display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap:28, position:'relative' }}>
          {steps.map(s => (
            <div key={s.n} style={{ textAlign:'center', padding:'0 16px' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:B.yellow,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:18, fontWeight:900, color:B.ink, margin:'0 auto 18px',
                boxShadow:'0 0 0 6px rgba(232,168,0,0.10)' }}>{s.n}</div>
              <div style={{ fontSize:18, fontWeight:800, color:B.ink, marginBottom:8, letterSpacing:'-0.01em' }}>{s.title}</div>
              <p style={{ fontSize:13, color:'rgba(26,23,18,0.55)', lineHeight:1.65, margin:0, maxWidth:220, marginInline:'auto' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div style={{ maxWidth:580, margin:'0 auto', background:'#fff', borderRadius:22, padding:'36px 36px',
          boxShadow:'0 4px 32px rgba(26,23,18,0.07)', border:'1px solid rgba(26,23,18,0.06)' }}>
          <div style={{ fontSize:13, fontWeight:800, color:B.ink, marginBottom:20, letterSpacing:'-0.01em' }}>
            Analyse anfragen — kostenlos &amp; unverbindlich
          </div>
          <LeadFormLight />
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div style={{ display:'flex', justifyContent:'center', gap:12, marginTop:28, flexWrap:'wrap' }}>
          <a href="https://wa.me/4916095757167?text=Hi%20Leon%2C%0A%0AProblem%3A%0AKontext%3A%0A%0AKurzer%20%C3%9Cberblick%3A"
            target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 22px', borderRadius:100,
              background:'#25D366', color:'#fff', fontSize:13, fontWeight:700, textDecoration:'none' }}>
            <Icon.WA /> WhatsApp
          </a>
          <a href="mailto:hello@leonseitz.com?subject=Kostenlose Analyse&body=Problem: %0D%0ABetrieb: %0D%0AKontext: %0D%0A"
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 22px', borderRadius:100,
              border:'1px solid rgba(26,23,18,0.16)', color:'rgba(26,23,18,0.62)', fontSize:13, fontWeight:700, textDecoration:'none' }}>
            <Mail size={14} /> E-Mail
          </a>
        </div>
      </Reveal>
    </Frame>
  );
}

/* ─── FAQ ─── */
function FAQV2() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: 'Was kostet die kostenlose Analyse wirklich?',
      a: 'Nichts. Du bekommst eine ehrliche schriftliche Einschätzung, welche Abläufe in deinem Betrieb digitalisiert werden können und wo der größte Hebel liegt. Wenn du danach mit mir arbeiten willst, klären wir den Preis im zweiten Schritt.' },
    { q: 'Ich bin kein Tech-Betrieb. Ist das trotzdem relevant für mich?',
      a: 'Ja — gerade dann. Handwerksbetriebe, Gastronomie, Dienstleister: überall entstehen die gleichen Zeitfresser durch manuelle Abläufe. Ich spreche kein Tech-Jargon, sondern schaue auf konkrete Abläufe und was sich sinnvoll verbessern lässt.' },
    { q: 'Muss ich vorher zahlen?',
      a: 'Nein. Phase 0 ist kostenlos. Phase 1 zahlst du erst, wenn dir das Ergebnis gefällt. Kein Vertrag, keine Vorauskasse.' },
    { q: 'Wie unterscheidet sich das von einer Agentur?',
      a: 'Du sprichst direkt mit mir. Kein Account-Manager, kein Overhead. Ich schaue mir deinen Betrieb konkret an — nicht als abstraktes Projekt, sondern als Abfolge von Abläufen, die ich verstehe und dann verbessere.' },
    { q: 'Was, wenn ich gar nicht weiß, was ich brauche?',
      a: 'Genau dafür ist Phase 0 da. Ich stelle die richtigen Fragen, schaue mir an was existiert, und sage dir, wo ich anfangen würde. Du musst vorher nichts wissen.' },
    { q: 'Baust du auch Websites?',
      a: 'Nein. Für Webdesign gibt es Paveo — paveo360.de. Ich konzentriere mich auf Prozesse, Workflows und Systeme dahinter.' },
  ];

  return (
    <Frame id="faq" bg={B.ink} padding="96px 24px" style={{ color: B.cream }}>
      <Reveal>
        <div style={{ maxWidth:720, margin:'0 auto', textAlign:'center', marginBottom:56 }}>
          <Eyebrow color={B.yellow}>Noch Fragen?</Eyebrow>
          <h2 style={{ marginTop:18, fontSize:'clamp(1.8rem,5vw,3.25rem)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.025em', color:B.cream }}>
            Was Kunden vorher <Serif color={B.yellow}>wissen wollen.</Serif>
          </h2>
        </div>
      </Reveal>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} style={{ borderTop: i===0?'1px solid rgba(245,242,235,0.10)':'none',
              borderBottom:'1px solid rgba(245,242,235,0.10)', padding:'24px 4px',
              background: isOpen?'rgba(232,168,0,0.04)':'transparent' }}>
              <button type="button" onClick={() => setOpen(isOpen?-1:i)}
                style={{ width:'100%', background:'transparent', border:'none', padding:0,
                  display:'flex', justifyContent:'space-between', alignItems:'flex-start',
                  gap:24, textAlign:'left', cursor:'pointer', fontFamily:FONTS.sans }}>
                <div style={{ fontSize:18, fontWeight:800, color:B.cream, letterSpacing:'-0.01em', lineHeight:1.35, flex:1 }}>{f.q}</div>
                <div style={{ width:32, height:32, borderRadius:'50%',
                  background: isOpen?B.yellow:'rgba(245,242,235,0.06)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color: isOpen?B.ink:'rgba(245,242,235,0.5)',
                  fontSize:16, fontWeight:900, flexShrink:0,
                  transform: isOpen?'rotate(45deg)':'none', transition:'transform .2s' }}>+</div>
              </button>
              {isOpen && <p style={{ marginTop:14, fontSize:15, lineHeight:1.7, color:'rgba(245,242,235,0.62)', maxWidth:620 }}>{f.a}</p>}
            </div>
          );
        })}
      </div>
      <Reveal delay={140}>
        <div style={{ maxWidth:580, margin:'48px auto 0', textAlign:'center', padding:'24px 28px',
          border:'1px solid rgba(232,168,0,0.20)', background:'rgba(232,168,0,0.04)', borderRadius:16 }}>
          <div style={{ fontSize:14, color:'rgba(245,242,235,0.65)', marginBottom:12 }}>Noch was Konkretes?</div>
          <a href="mailto:hello@leonseitz.com?subject=Kurze Frage"
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 24px',
              borderRadius:100, background:B.yellow, color:B.ink, fontSize:14, fontWeight:800, textDecoration:'none' }}>
            Kurz nachfragen →
          </a>
        </div>
      </Reveal>
      <Footer />
    </Frame>
  );
}

/* ─── TESTIMONIALS ─── */
function TestimonialsV2() {
  const testimonials = [
    { quote: 'Von der ersten Idee bis zur finalen Umsetzung alles auf sehr hohem professionellen Niveau. Meine Wünsche wurden vollständig berücksichtigt und sinnvolle Vorschläge eingebracht. Die Website ist modern, funktional und optisch sehr ansprechend.', name: 'Oksana Hettinger' },
    { quote: 'Ich kann Leon uneingeschränkt weiterempfehlen. Die Zusammenarbeit ist immer kooperativ, effektiv und zielführend.', name: 'Dominic Hildebrandt' },
  ];

  return (
    <Frame id="stimmen" bg={B.cream} padding="96px 24px">
      <Reveal>
        <div style={{ maxWidth:720, margin:'0 auto', textAlign:'center', marginBottom:56 }}>
          <Eyebrow>Stimmen</Eyebrow>
          <h2 style={{ marginTop:18, fontSize:'clamp(1.8rem,5vw,3.25rem)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.025em', color:B.ink }}>
            Was Kunden <Serif color={B.ocker}>sagen.</Serif>
          </h2>
        </div>
      </Reveal>
      <div style={{ maxWidth:920, margin:'0 auto', display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap:24 }}>
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <div style={{ padding:'32px 32px', background:'#fff', borderRadius:20,
              boxShadow:'0 2px 16px rgba(26,23,18,0.06)', border:'1px solid rgba(26,23,18,0.05)',
              textAlign:'left', minHeight:'100%' }}>
              <div style={{ display:'flex', gap:2, marginBottom:18 }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC05">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize:15, lineHeight:1.7, color:'rgba(26,23,18,0.72)', margin:0, marginBottom:24 }}>&#8222;{t.quote}&#8220;</p>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:`linear-gradient(135deg, ${B.yellow}, ${B.ocker})`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:900, color:B.ink }}>
                  {t.name[0]}
                </div>
                <div style={{ fontSize:14, fontWeight:800, color:B.ink }}>{t.name}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={180}>
        <div style={{ maxWidth:720, margin:'64px auto 0', padding:'32px 40px', borderRadius:22,
          background:B.ink, color:B.cream, display:'flex', justifyContent:'space-between',
          alignItems:'center', flexWrap:'wrap', gap:20 }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:B.cream, marginBottom:6 }}>Bereit für Phase 0?</div>
            <div style={{ fontSize:13, color:'rgba(245,242,235,0.55)' }}>Kostenlose Analyse — Antwort innerhalb von 24h.</div>
          </div>
          <a href="#next" style={{ padding:'14px 28px', borderRadius:100, background:B.yellow, color:B.ink,
            fontSize:14, fontWeight:800, boxShadow:'0 4px 20px rgba(232,168,0,0.28)', textDecoration:'none' }}>
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
    <div style={{ maxWidth:960, margin:'72px auto 0', paddingTop:28,
      borderTop:'1px solid rgba(14,12,8,0.07)', display:'flex',
      justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
      <span style={{ fontSize:14, fontWeight:900, color:B.black }}>Leon Seitz</span>
      <div style={{ display:'flex', gap:20, fontSize:13, color:'rgba(14,12,8,0.38)', flexWrap:'wrap' }}>
        {[['Instagram','https://www.instagram.com/leonnseitz'],['Prozess','/prozess'],['AGB','/agb'],['Impressum','/impressum'],['Datenschutz','/datenschutz']].map(([l,h]) => (
          <a key={l} href={h} style={{ color:'inherit', textDecoration:'none' }}>{l}</a>
        ))}
      </div>
      <span style={{ fontSize:12, color:'rgba(14,12,8,0.26)' }}>© 2026</span>
    </div>
  );
}

/* ─── GOOGLE REVIEWS ─── */
const REVIEWS = [
  { name:'Oksana Hettinger', initials:'OH', color:'#4285F4', rating:5, date:'vor 3 Monaten', text:'Von der ersten Idee bis zur finalen Umsetzung alles auf sehr hohem professionellen Niveau. Meine Wünsche wurden vollständig berücksichtigt. Die Website ist modern, funktional und optisch sehr ansprechend.' },
  { name:'Dominic Hildebrandt', initials:'DH', color:'#34A853', rating:5, date:'vor 5 Monaten', text:'Ich kann Leon uneingeschränkt weiterempfehlen. Die Zusammenarbeit ist immer kooperativ, effektiv und zielführend.' },
  { name:'Ian', initials:'I', color:'#EA4335', rating:5, date:'vor 2 Monaten', text:'Schnelle Antworten, erstellt individuelle Top-Websites, Posts etc.' },
  { name:'Laura Janke', initials:'LJ', color:'#9C27B0', rating:5, date:'vor 1 Monat', text:'Zuverlässig — hält Fristen wie abgesprochen ein, gute zielführende Ideen, Top-Kommunikation.' },
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
    <div style={{ display:'flex', gap:2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s<=n?'#FBBC05':'#e0e0e0'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function GoogleReviewsSection() {
  return (
    <Frame bg="linear-gradient(180deg, #15110a 0%, #0E0C08 100%)" padding="56px 0 72px" style={{ color:B.cream, position:'relative' }}>
      <Reveal>
        <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:28, paddingInline:36, flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <GoogleIcon />
            <span style={{ fontSize:12, fontWeight:700, color:'rgba(245,242,235,.6)', letterSpacing:'0.04em' }}>Rezensionen</span>
          </div>
          <div style={{ width:1, height:18, background:'rgba(245,242,235,.14)' }} />
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:26, fontWeight:900, color:B.cream, lineHeight:1 }}>5,0</span>
            <StarsFilled />
            <span style={{ fontSize:12, color:'rgba(245,242,235,.42)', fontWeight:500 }}>Google</span>
          </div>
        </div>
      </Reveal>
      <div style={{ overflow:'hidden', WebkitMaskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', maskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
        <div className="reviews-track" style={{ display:'flex', gap:14, padding:'6px 36px', width:'max-content', animation:'reviews-scroll 38s linear infinite' }}>
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <div key={i} style={{ width:320, flexShrink:0, background:'rgba(245,242,235,.04)', border:'1px solid rgba(245,242,235,.10)', borderRadius:14, padding:'20px 22px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                <div style={{ width:38, height:38, borderRadius:'50%', background:r.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#fff', flexShrink:0 }}>{r.initials}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13.5, fontWeight:700, color:B.cream, lineHeight:1.2 }}>{r.name}</div>
                  <div style={{ fontSize:11, color:'rgba(245,242,235,.45)', marginTop:1 }}>{r.date}</div>
                </div>
                <div style={{ flexShrink:0 }}><GoogleIcon /></div>
              </div>
              <StarsFilled n={r.rating} />
              <p style={{ marginTop:8, fontSize:13, lineHeight:1.65, color:'rgba(245,242,235,.7)' }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  return (
    <div style={{ fontFamily:FONTS.sans, overflowX:'hidden', position:'relative', maxWidth:'100vw' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=DM+Serif+Display:ital@1&family=Caveat:wght@600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { scroll-behavior: smooth; overflow-x: hidden; max-width: 100vw; width: 100%; background: #000; }
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
          .comp-scroll   { overflow-x: auto !important; -webkit-overflow-scrolling: touch; }
          .comp-inner    { min-width: 560px !important; }
          .comp-row      { grid-template-columns: 1fr 1.4fr !important; }
          .comp-them     { display: none !important; }
        }
        @keyframes reviews-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .reviews-track:hover { animation-play-state: paused; }
        @keyframes live-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(62,196,109,.18); }
          50%       { box-shadow: 0 0 0 7px rgba(62,196,109,.05); }
        }
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #3ec46d;
          box-shadow: 0 0 0 4px rgba(62,196,109,.18);
          animation: live-pulse 1.8s ease-in-out infinite; display: inline-block;
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
    </div>
  );
}
