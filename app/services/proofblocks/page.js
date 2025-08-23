'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Quote, Sparkles, Image as ImageIcon, LayoutTemplate, LineChart, Wand2
} from 'lucide-react';

/* ---------- Helpers ---------- */

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 ${className}`}>
      {children}
    </div>
  );
}

/* ---------- KPI (count-up) ---------- */
function useCountUp(target = 0, duration = 1200, inView = true) {
  const [val, setVal] = useState(0);
  const start = useRef(null);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const step = (ts) => {
      if (start.current == null) start.current = ts;
      const p = Math.min(1, (ts - start.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, inView]);
  return val;
}

export function KPIGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(({ label, value }, i) => (
        <KPI key={i} label={label} value={value} />
      ))}
    </div>
  );
}

function KPI({ label, value }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(value, 1100, v);
  return (
    <Card ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-indigo-300">{n.toLocaleString('de-DE')}</div>
      <div className="mt-2 text-neutral-300">{label}</div>
    </Card>
  );
}

/* ---------- Mini Case Study ---------- */
export function CaseStudy({ title, problem, approach, results = [], badge = 'Kurz-Case' }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
        <Sparkles size={14} /> {badge}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid md:grid-cols-3 gap-4 text-neutral-200">
        <div><p className="text-sm text-neutral-400">Problem</p><p>{problem}</p></div>
        <div><p className="text-sm text-neutral-400">Vorgehen</p><p>{approach}</p></div>
        <div>
          <p className="text-sm text-neutral-400">Ergebnis</p>
          <ul className="list-disc pl-5">
            {results.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      </div>
    </Card>
  );
}

/* ---------- Before / After Slider ---------- */
export function BeforeAfter({ before = '/img/before.jpg', after = '/img/after.jpg', labelBefore='Vorher', labelAfter='Nachher' }) {
  const [v, setV] = useState(50);
  return (
    <Card className="overflow-hidden">
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black/40">
        <img src={before} alt="before" className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 overflow-hidden" style={{clipPath: `inset(0 ${100 - v}% 0 0)`}}>
            <img src={after} alt="after" className="w-full h-full object-cover" />
          </div>
        </div>
        <input
          type="range" min="0" max="100" value={v}
          onChange={(e)=>setV(Number(e.target.value))}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3"
        />
        <div className="absolute top-3 left-3 text-xs bg-white/10 px-2 py-1 rounded-full">{labelBefore}</div>
        <div className="absolute top-3 right-3 text-xs bg-white/10 px-2 py-1 rounded-full">{labelAfter}</div>
      </div>
    </Card>
  );
}

/* ---------- Output Grid (Thumbnails) ---------- */
export function OutputGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((src, i) => (
        <div key={i} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
          <img src={src} alt="" className="w-full h-44 object-cover" />
        </div>
      ))}
    </div>
  );
}

/* ---------- Testimonial ---------- */
export function Testimonial({ quote, name, role }) {
  return (
    <Card className="relative">
      <Quote className="absolute -top-4 -left-4 w-8 h-8 text-white/10" />
      <blockquote className="text-neutral-100">{quote}</blockquote>
      <p className="mt-3 text-sm text-neutral-400"><span className="text-white font-medium">{name}</span> · {role}</p>
    </Card>
  );
}

/* ---------- Process Steps ---------- */
export function Process({ steps = [] }) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {steps.map((s, i) => (
        <Card key={i}>
          <div className="text-sm text-indigo-300 font-semibold">{String(i+1).padStart(2,'0')}</div>
          <h4 className="mt-1 text-lg font-semibold">{s.title}</h4>
          <p className="mt-1 text-neutral-300">{s.text}</p>
        </Card>
      ))}
    </div>
  );
}

/* ---------- Deliverables list ---------- */
export function Deliverables({ items = [] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((d, i) => (
        <Card key={i} className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
            {d.icon ?? <Wand2 size={18} />}
          </div>
          <div>
            <h4 className="font-semibold">{d.title}</h4>
            {d.desc && <p className="text-neutral-300">{d.desc}</p>}
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ---------- Generic Service Template ---------- */
export default function ServiceTemplate({
  NavbarCmp,
  FooterCmp,
  heroTitle,
  heroSub,
  ctaHref = '/request',
  deliverables = [],
  caseStudy,
  beforeAfter,
  outputs = [],
  process = [],
  testimonials = [],
}) {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      {NavbarCmp}

      {/* HERO */}
      <section className="relative px-5 md:px-16 pt-20 md:pt-28 pb-12 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(700px_500px_at_110%_-10%,rgba(56,189,248,.20),transparent_55%)]" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold">{heroTitle}</h1>
          <p className="mt-4 text-lg text-neutral-300">{heroSub}</p>
          <Link href={ctaHref} className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition font-semibold">
            Projekt starten <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* DELIVERABLES */}
      {!!deliverables.length && (
        <section className="px-5 md:px-16 py-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Das ist enthalten</h2>
          <Deliverables items={deliverables} />
        </section>
      )}

      {/* PROOF: CASE + KPIs */}
      {(caseStudy || outputs.length) && (
        <section className="px-5 md:px-16 py-10 grid md:grid-cols-2 gap-6">
          {caseStudy && <CaseStudy {...caseStudy} />}
          {!!outputs.length && (
            <Card>
              <div className="mb-4 inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
                <ImageIcon size={14} /> Beispiel‑Output
              </div>
              <OutputGrid items={outputs} />
            </Card>
          )}
        </section>
      )}

      {/* BEFORE/AFTER */}
      {beforeAfter && (
        <section className="px-5 md:px-16 py-6">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Vorher / Nachher</h2>
          <BeforeAfter {...beforeAfter} />
        </section>
      )}

      {/* PROCESS */}
      {!!process.length && (
        <section className="px-5 md:px-16 py-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">So arbeiten wir</h2>
          <Process steps={process} />
        </section>
      )}

      {/* TESTIMONIALS */}
      {!!testimonials.length && (
        <section className="px-5 md:px-16 py-10">
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => <Testimonial key={i} {...t} />)}
          </div>
        </section>
      )}

      {FooterCmp}
    </div>
  );
}
