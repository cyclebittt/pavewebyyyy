'use client';

import { useState, useRef, useEffect, useCallback } from "react";

/* ─── BRAND TOKENS ─── */
const B = {
  yellow: '#E8A800', ocker: '#C68F00',
  black:  '#0E0C08', cream: '#F5F2EB', dark: '#2A2720',
};

/* ─── PROJECT DATA ─── */
const INITIAL_PROJECT = {
  client: "Kunde 1",
  name: "Webdesign + Branding",
  budget: 700,
  startDate: "2025-03-01",
  deadline: "2025-03-20",
  overallProgress: 40,

  phases: [
    {
      id: "p0",
      label: "Phase 0",
      title: "Analyse — kostenlos",
      status: "done",
      progress: 100,
      startDate: "2025-03-01",
      endDate: "2025-03-03",
      payment: null,
      tasks: [
        { id: "t1", title: "Auftritts-Analyse & Briefing", status: "done", priority: "high" },
        { id: "t2", title: "Moodboard + Referenzen", status: "done", priority: "medium" },
        { id: "t3", title: "Strukturvorschlag", status: "done", priority: "high" },
      ],
    },
    {
      id: "p1",
      label: "Phase 1",
      title: "Erste Umsetzung",
      status: "active",
      progress: 55,
      startDate: "2025-03-04",
      endDate: "2025-03-10",
      payment: { label: "Zahlung nur wenn es dir gefällt", amount: 210 },
      tasks: [
        { id: "t4", title: "Startseite – Desktop", status: "done", priority: "high" },
        { id: "t5", title: "Startseite – Mobile", status: "in-progress", priority: "high" },
        { id: "t6", title: "Über uns – Layout", status: "in-progress", priority: "medium" },
        { id: "t7", title: "Kontaktseite", status: "open", priority: "low" },
      ],
    },
    {
      id: "p2",
      label: "Phase 2",
      title: "Feinschliff",
      status: "pending",
      progress: 0,
      startDate: "2025-03-11",
      endDate: "2025-03-16",
      payment: { label: "Nach Fertigstellung", amount: 350 },
      tasks: [
        { id: "t8", title: "Feedback einarbeiten", status: "open", priority: "high" },
        { id: "t9", title: "Animationen + Hover-States", status: "open", priority: "medium" },
        { id: "t10", title: "SEO Meta-Tags", status: "open", priority: "medium" },
        { id: "t11", title: "Performance-Check", status: "open", priority: "low" },
      ],
    },
    {
      id: "p3",
      label: "Phase 3",
      title: "Go-Live & Übergabe",
      status: "pending",
      progress: 0,
      startDate: "2025-03-17",
      endDate: "2025-03-20",
      payment: { label: "Nach Übergabe", amount: 140 },
      tasks: [
        { id: "t12", title: "Go-Live auf Domain", status: "open", priority: "high" },
        { id: "t13", title: "Zugänge + Übergabe", status: "open", priority: "high" },
        { id: "t14", title: "Abschlussdoku", status: "open", priority: "low" },
      ],
    },
  ],

  milestones: [
    { id: "m1", label: "Entwurf freigegeben", date: "2025-03-03", done: true },
    { id: "m2", label: "Phase 1 live zum Testen", date: "2025-03-10", done: false },
    { id: "m3", label: "Feinschliff freigegeben", date: "2025-03-16", done: false },
    { id: "m4", label: "Go-Live", date: "2025-03-20", done: false },
  ],
};

/* ─── UTILS ─── */
function cx(...args) { return args.filter(Boolean).join(" "); }
function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
function formatDate(str) { return new Date(str).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }); }
function daysUntil(str) { return daysBetween(new Date().toISOString().slice(0, 10), str); }

const STATUS_META = {
  done:        { label: "Erledigt",    dot: B.yellow },
  active:      { label: "Aktiv",       dot: B.yellow },
  "in-progress":{ label: "In Arbeit",  dot: B.ocker },
  pending:     { label: "Ausstehend",  dot: 'rgba(245,242,235,0.25)' },
  open:        { label: "Offen",       dot: 'rgba(245,242,235,0.20)' },
};

/* ─── HOOKS ─── */
function useReveal(ref, threshold = 0.10) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref?.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold });
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
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

/* ─── SCROLL BAR ─── */
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

/* ─── REVEAL ─── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(16px)',
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── BADGE ─── */
function Badge({ status }) {
  const m = STATUS_META[status] ?? STATUS_META.open;
  const isActive = status === 'active';
  const isDone = status === 'done';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700,
      background: isDone ? 'rgba(232,168,0,0.12)' : isActive ? 'rgba(232,168,0,0.18)' : 'rgba(245,242,235,0.06)',
      border: isDone || isActive ? '1px solid rgba(232,168,0,0.28)' : '1px solid rgba(245,242,235,0.10)',
      color: isDone || isActive ? B.yellow : 'rgba(245,242,235,0.40)',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: m.dot, flexShrink: 0,
        animation: isActive ? 'pulseDot 1.5s ease-in-out infinite' : 'none',
      }} />
      {m.label}
    </span>
  );
}

/* ─── PROGRESS BAR ─── */
function ProgressBar({ value, yellow = false, height = 6 }) {
  return (
    <div style={{ width: '100%', height, borderRadius: 100, background: 'rgba(245,242,235,0.08)', overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: 100,
        width: `${Math.max(0, Math.min(100, value))}%`,
        background: yellow ? B.yellow : 'rgba(232,168,0,0.60)',
        transition: 'width .7s ease',
      }} />
    </div>
  );
}

/* ─── CARD ─── */
function Card({ children, highlight = false, style = {} }) {
  return (
    <div style={{
      borderRadius: 20, overflow: 'hidden',
      border: highlight ? `1px solid rgba(232,168,0,0.28)` : '1px solid rgba(245,242,235,0.08)',
      background: highlight ? 'rgba(232,168,0,0.05)' : 'rgba(245,242,235,0.03)',
      backdropFilter: 'blur(8px)',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── PHASE CARD ─── */
function PhaseCard({ phase, editMode, onTaskToggle, onStatusChange, filterStatus }) {
  const [collapsed, setCollapsed] = useState(phase.status !== 'active');
  const isActive = phase.status === 'active';
  const isDone = phase.status === 'done';

  const filteredTasks = phase.tasks.filter(t =>
    filterStatus === 'all' || t.status === filterStatus
  );
  const doneCount = phase.tasks.filter(t => t.status === 'done').length;

  return (
    <Reveal>
      <Card highlight={isActive}>
        {/* Top accent for active */}
        {isActive && <div style={{ height: 3, background: B.yellow }} />}

        <div
          onClick={() => setCollapsed(c => !c)}
          style={{ padding: '20px 22px', cursor: 'pointer', userSelect: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <Badge status={phase.status} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(245,242,235,0.30)' }}>
                {phase.label}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {phase.payment && (
                <span style={{
                  fontSize: 11, padding: '3px 10px', borderRadius: 100,
                  border: isDone ? '1px solid rgba(232,168,0,0.22)' : '1px solid rgba(245,242,235,0.08)',
                  color: isDone ? B.yellow : 'rgba(245,242,235,0.35)',
                  background: isDone ? 'rgba(232,168,0,0.06)' : 'transparent',
                }}>
                  {phase.payment.label}
                  {phase.payment.amount ? ` · ${phase.payment.amount} €` : ''}
                </span>
              )}
              {/* Chevron */}
              <div style={{
                width: 24, height: 24, borderRadius: 8, border: '1px solid rgba(245,242,235,0.10)',
                background: 'rgba(245,242,235,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: collapsed ? 'none' : 'rotate(180deg)', transition: 'transform .25s',
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(245,242,235,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: B.cream, letterSpacing: '-0.01em' }}>{phase.title}</div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}><ProgressBar value={phase.progress} yellow={isDone} /></div>
              <span style={{ fontSize: 11, color: 'rgba(245,242,235,0.40)', flexShrink: 0 }}>{phase.progress}%</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(245,242,235,0.30)' }}>
              {formatDate(phase.startDate)} – {formatDate(phase.endDate)} · {doneCount}/{phase.tasks.length} Aufgaben
            </div>
          </div>
        </div>

        {!collapsed && (
          <div style={{ borderTop: '1px solid rgba(245,242,235,0.07)', padding: '16px 22px 20px' }}>

            {/* Edit mode: status selector */}
            {editMode && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {['done', 'active', 'pending'].map(s => (
                  <button key={s}
                    onClick={() => onStatusChange(phase.id, s)}
                    style={{
                      fontSize: 11, padding: '4px 12px', borderRadius: 100, cursor: 'pointer',
                      border: phase.status === s ? `1px solid ${B.yellow}` : '1px solid rgba(245,242,235,0.12)',
                      background: phase.status === s ? 'rgba(232,168,0,0.12)' : 'rgba(245,242,235,0.04)',
                      color: phase.status === s ? B.yellow : 'rgba(245,242,235,0.45)',
                    }}>
                    {STATUS_META[s].label}
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredTasks.length === 0 && (
                <div style={{ fontSize: 12, color: 'rgba(245,242,235,0.30)', padding: '8px 0' }}>Keine Aufgaben für diesen Filter.</div>
              )}
              {filteredTasks.map(task => {
                const isDoneTask = task.status === 'done';
                return (
                  <div key={task.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 14px', borderRadius: 12,
                    border: isDoneTask ? '1px solid rgba(232,168,0,0.15)' : '1px solid rgba(245,242,235,0.07)',
                    background: isDoneTask ? 'rgba(232,168,0,0.05)' : 'rgba(245,242,235,0.03)',
                    transition: 'all .2s',
                  }}>
                    {/* Checkbox */}
                    <button
                      onClick={() => editMode && onTaskToggle(phase.id, task.id)}
                      disabled={!editMode}
                      style={{
                        flexShrink: 0, width: 20, height: 20, borderRadius: 6,
                        border: isDoneTask ? `1.5px solid ${B.yellow}` : '1.5px solid rgba(245,242,235,0.20)',
                        background: isDoneTask ? 'rgba(232,168,0,0.18)' : 'rgba(245,242,235,0.04)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: editMode ? 'pointer' : 'default',
                        transition: 'all .15s',
                      }}>
                      {isDoneTask && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5.5L4 7.5L8.5 3" stroke={B.yellow} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    <span style={{
                      flex: 1, fontSize: 13,
                      color: isDoneTask ? 'rgba(245,242,235,0.35)' : 'rgba(245,242,235,0.80)',
                      textDecoration: isDoneTask ? 'line-through' : 'none',
                    }}>
                      {task.title}
                    </span>
                    <Badge status={task.status} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </Reveal>
  );
}

/* ─── MILESTONE TIMELINE ─── */
function MilestoneTimeline({ milestones, editMode, onToggle }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute', left: 18, top: 20, bottom: 20,
        width: 1, background: 'linear-gradient(to bottom,rgba(232,168,0,0.40),rgba(245,242,235,0.06))',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {milestones.map(m => {
          const days = daysUntil(m.date);
          const past = days < 0;
          return (
            <div key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <button
                onClick={() => editMode && onToggle(m.id)}
                disabled={!editMode}
                style={{
                  flexShrink: 0, width: 36, height: 36, borderRadius: 10, zIndex: 1,
                  border: m.done ? `1px solid rgba(232,168,0,0.35)` : past ? '1px solid rgba(232,168,0,0.18)' : '1px solid rgba(245,242,235,0.12)',
                  background: m.done ? 'rgba(232,168,0,0.14)' : 'rgba(245,242,235,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: editMode ? 'pointer' : 'default',
                  transition: 'all .2s',
                }}>
                {m.done
                  ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 4" stroke={B.yellow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ width: 6, height: 6, borderRadius: '50%', background: past ? B.ocker : 'rgba(245,242,235,0.25)' }} />
                }
              </button>
              <div style={{
                flex: 1, padding: '10px 14px', borderRadius: 14,
                border: m.done ? '1px solid rgba(232,168,0,0.14)' : '1px solid rgba(245,242,235,0.07)',
                background: m.done ? 'rgba(232,168,0,0.04)' : 'rgba(245,242,235,0.03)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: m.done ? 'rgba(245,242,235,0.40)' : B.cream, textDecoration: m.done ? 'line-through' : 'none' }}>
                    {m.label}
                  </span>
                  <span style={{ fontSize: 11, color: m.done ? 'rgba(245,242,235,0.28)' : past ? B.ocker : 'rgba(245,242,235,0.38)' }}>
                    {formatDate(m.date)}{!m.done && !past && days <= 7 && <span style={{ color: B.yellow }}> · {days}d</span>}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── DEADLINE WIDGET ─── */
function DeadlineWidget({ phases, projectDeadline }) {
  const now = new Date().toISOString().slice(0, 10);
  const upcoming = phases.filter(s => s.status !== 'done' && s.endDate >= now)
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate)).slice(0, 3);
  const projDays = daysUntil(projectDeadline);
  const urgentColor = projDays <= 3 ? '#ef4444' : projDays <= 7 ? B.ocker : 'rgba(245,242,235,0.60)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        padding: '14px 16px', borderRadius: 14,
        border: projDays <= 7 ? `1px solid rgba(232,168,0,0.28)` : '1px solid rgba(245,242,235,0.08)',
        background: projDays <= 7 ? 'rgba(232,168,0,0.06)' : 'rgba(245,242,235,0.03)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'rgba(245,242,235,0.35)' }}>Gesamt-Deadline</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: B.cream, marginTop: 2 }}>{formatDate(projectDeadline)}</div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, color: urgentColor, letterSpacing: '-0.03em' }}>{projDays}d</div>
      </div>
      {upcoming.map(s => {
        const d = daysUntil(s.endDate);
        return (
          <div key={s.id} style={{
            padding: '12px 16px', borderRadius: 14,
            border: '1px solid rgba(245,242,235,0.07)',
            background: 'rgba(245,242,235,0.03)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(245,242,235,0.30)' }}>{s.label}</div>
              <div style={{ fontSize: 13, color: 'rgba(245,242,235,0.70)', marginTop: 2 }}>{s.title}</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: d <= 2 ? '#ef4444' : d <= 5 ? B.ocker : 'rgba(245,242,235,0.45)', letterSpacing: '-0.02em' }}>{d}d</div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── GANTT ─── */
function GanttChart({ phases, projectStart, projectEnd }) {
  const totalDays = daysBetween(projectStart, projectEnd) || 1;
  const today = new Date().toISOString().slice(0, 10);
  const todayPct = Math.max(0, Math.min(100, (daysBetween(projectStart, today) / totalDays) * 100));

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: 460 }}>
        {/* Date axis */}
        <div style={{ display: 'flex', paddingLeft: 96, marginBottom: 12 }}>
          {[0, 25, 50, 75, 100].map(p => {
            const d = new Date(new Date(projectStart).getTime() + (p / 100) * totalDays * 86400000);
            return (
              <div key={p} style={{ flex: 1, fontSize: 10, color: 'rgba(245,242,235,0.30)', textAlign: 'center' }}>
                {formatDate(d.toISOString().slice(0, 10))}
              </div>
            );
          })}
        </div>

        <div style={{ position: 'relative' }}>
          {/* Today line */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, width: 1,
            background: 'rgba(232,168,0,0.55)', zIndex: 10,
            left: `calc(96px + ${todayPct}% * (100% - 96px) / 100)`,
          }}>
            <div style={{ position: 'absolute', top: -16, left: 4, fontSize: 9, color: B.yellow, whiteSpace: 'nowrap' }}>Heute</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {phases.map(phase => {
              const left = Math.max(0, (daysBetween(projectStart, phase.startDate) / totalDays) * 100);
              const width = Math.max(2, (daysBetween(phase.startDate, phase.endDate) / totalDays) * 100);
              const isDone = phase.status === 'done';
              const isActive = phase.status === 'active';

              return (
                <div key={phase.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 80, flexShrink: 0, fontSize: 11, color: 'rgba(245,242,235,0.45)', textAlign: 'right', paddingRight: 8 }}>
                    {phase.label}
                  </div>
                  <div style={{ flex: 1, position: 'relative', height: 32 }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 100, background: 'rgba(245,242,235,0.04)', border: '1px solid rgba(245,242,235,0.07)' }} />
                    <div style={{
                      position: 'absolute', top: 4, bottom: 4, borderRadius: 100,
                      left: `${left}%`, width: `${width}%`, minWidth: 32,
                      background: isDone ? 'rgba(232,168,0,0.50)' : isActive ? B.yellow : 'rgba(245,242,235,0.08)',
                      border: isDone || isActive ? 'none' : '1px solid rgba(245,242,235,0.10)',
                    }}>
                      {phase.progress > 0 && isActive && (
                        <div style={{ height: '100%', width: `${phase.progress}%`, borderRadius: 100, background: 'rgba(232,168,0,0.40)' }} />
                      )}
                      <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, color: isDone || isActive ? B.black : 'rgba(245,242,235,0.45)',
                        overflow: 'hidden', padding: '0 8px',
                      }}>
                        {phase.title}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── NOTIFICATION TOAST ─── */
const CLIENT_EMAIL = "leonseitz9@gmail.com";

function NotificationToast({ phase, project, onClose }) {
  if (!phase) return null;
  const subject = encodeURIComponent(`${phase.label} abgeschlossen – ${project.name}`);
  const body = encodeURIComponent(
`Hallo,

${phase.label} – „${phase.title}" ist abgeschlossen.

Du kannst den aktuellen Stand jederzeit im Projekt-Dashboard einsehen.

Sobald du dir alles angeschaut hast, meld dich kurz — dann gehen wir in die nächste Phase.

Viele Grüße
Leon`
  );

  return (
    <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'calc(100% - 40px)', maxWidth: 420 }}>
      <div style={{
        borderRadius: 18, border: '1px solid rgba(232,168,0,0.30)',
        background: 'rgba(14,12,8,0.85)', backdropFilter: 'blur(20px)',
        padding: '16px 18px', boxShadow: '0 8px 40px rgba(0,0,0,0.60)',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'rgba(232,168,0,0.14)', border: '1px solid rgba(232,168,0,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 4" stroke={B.yellow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: B.cream }}>{phase.label} abgeschlossen</div>
            <div style={{ fontSize: 11, color: 'rgba(245,242,235,0.50)', marginTop: 2 }}>{phase.title}</div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <a href={`mailto:${CLIENT_EMAIL}?subject=${subject}&body=${body}`}
                onClick={onClose}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700,
                  background: 'rgba(232,168,0,0.16)', border: '1px solid rgba(232,168,0,0.28)',
                  color: B.yellow, textDecoration: 'none',
                }}>
                E-Mail öffnen
              </a>
              <button onClick={onClose} style={{
                padding: '6px 12px', borderRadius: 100, fontSize: 12,
                border: '1px solid rgba(245,242,235,0.10)', background: 'rgba(245,242,235,0.04)',
                color: 'rgba(245,242,235,0.45)', cursor: 'pointer',
              }}>
                Schließen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── STATS ─── */
function OverallStats({ project }) {
  const allTasks = project.phases.flatMap(s => s.tasks);
  const doneTasks = allTasks.filter(t => t.status === 'done').length;
  const activePhase = project.phases.find(s => s.status === 'active');

  const stats = [
    { label: 'Gesamtfortschritt', value: `${project.overallProgress}%`, sub: `${doneTasks}/${allTasks.length} Aufgaben` },
    { label: 'Aktive Phase', value: activePhase?.label ?? '–', sub: activePhase?.title ?? 'Keine Phase aktiv' },
    { label: 'Deadline', value: formatDate(project.deadline), sub: `${daysUntil(project.deadline)} Tage` },
    { label: 'Budget', value: `${project.budget} €`, sub: 'Gesamt' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(160px,100%),1fr))', gap: 12 }}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 60}>
          <div style={{
            padding: '16px 18px', borderRadius: 16,
            border: '1px solid rgba(245,242,235,0.07)',
            background: 'rgba(245,242,235,0.03)',
          }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,242,235,0.35)', marginBottom: 8 }}>
              {s.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: B.cream, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'rgba(245,242,235,0.38)', marginTop: 2 }}>{s.sub}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ─── FILTER BAR ─── */
function FilterBar({ filterStatus, setFilterStatus }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,242,235,0.30)' }}>Filter:</span>
      {['all', 'done', 'in-progress', 'open'].map(s => (
        <button key={s}
          onClick={() => setFilterStatus(s)}
          style={{
            fontSize: 11, padding: '4px 12px', borderRadius: 100, cursor: 'pointer',
            border: filterStatus === s ? `1px solid ${B.yellow}` : '1px solid rgba(245,242,235,0.10)',
            background: filterStatus === s ? 'rgba(232,168,0,0.12)' : 'rgba(245,242,235,0.04)',
            color: filterStatus === s ? B.yellow : 'rgba(245,242,235,0.45)',
            fontWeight: filterStatus === s ? 700 : 400,
            transition: 'all .15s',
          }}>
          {s === 'all' ? 'Alle' : STATUS_META[s]?.label ?? s}
        </button>
      ))}
    </div>
  );
}

/* ─── PAGE ─── */
const STORAGE_KEY = "leon_project_kunde1";

export default function ProjectDashboard() {
  const [project, setProject] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PROJECT;
    } catch { return INITIAL_PROJECT; }
  });
  const [editMode, setEditMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("phases");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(project)); } catch {}
  }, [project]);

  const recalcProgress = useCallback((phases) => {
    const allTasks = phases.flatMap(s => s.tasks);
    const done = allTasks.filter(t => t.status === 'done').length;
    return Math.round((done / Math.max(1, allTasks.length)) * 100);
  }, []);

  const handleTaskToggle = useCallback((phaseId, taskId) => {
    setProject(prev => {
      const phases = prev.phases.map(s => {
        if (s.id !== phaseId) return s;
        const tasks = s.tasks.map(t => {
          if (t.id !== taskId) return t;
          return { ...t, status: t.status === 'done' ? 'open' : 'done' };
        });
        const doneCount = tasks.filter(t => t.status === 'done').length;
        return { ...s, tasks, progress: Math.round((doneCount / tasks.length) * 100) };
      });
      return { ...prev, phases, overallProgress: recalcProgress(phases) };
    });
  }, [recalcProgress]);

  const handlePhaseStatus = useCallback((phaseId, status) => {
    setProject(prev => {
      const phase = prev.phases.find(s => s.id === phaseId);
      if (status === 'done' && phase?.status !== 'done') {
        setTimeout(() => setNotification({ phase: { ...phase, status: 'done' } }), 100);
      }
      return { ...prev, phases: prev.phases.map(s => s.id === phaseId ? { ...s, status } : s) };
    });
  }, []);

  const handleMilestoneToggle = useCallback((id) => {
    setProject(prev => ({ ...prev, milestones: prev.milestones.map(m => m.id === id ? { ...m, done: !m.done } : m) }));
  }, []);

  const tabs = [
    { id: 'phases',     label: 'Phasen' },
    { id: 'gantt',      label: 'Zeitplan' },
    { id: 'milestones', label: 'Meilensteine' },
    { id: 'payments',   label: 'Zahlungen' },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", color: B.cream, minHeight: '100vh', background: B.black, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;min-width:0}
        html,body{overflow-x:hidden;max-width:100%}
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes noiseMove{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(90px,60px,0)}}
      `}</style>

      <ScrollBar />

      {/* Subtle background glow */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(800px 600px at 20% 20%, rgba(232,168,0,0.07), transparent 60%)` }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, mixBlendMode: 'overlay',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'300\' height=\'300\' filter=\'url(%23n)\' opacity=\'0.35\'/%3E%3C/svg%3E")',
          backgroundSize: '220px 220px', animation: 'noiseMove 7s linear infinite',
        }} />
      </div>

      <NotificationToast phase={notification?.phase} project={project} onClose={() => setNotification(null)} />

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(20px)', background: 'rgba(14,12,8,0.75)',
        borderBottom: '1px solid rgba(245,242,235,0.07)',
      }}>
        {/* Yellow tagesstreifen */}
        <div style={{ height: 3, background: B.yellow }} />
        <div style={{
          maxWidth: 960, margin: '0 auto', padding: '12px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 900, color: B.cream, textDecoration: 'none', flexShrink: 0 }}>Leon Seitz</a>
            <span style={{ color: 'rgba(245,242,235,0.20)', fontSize: 14 }}>/</span>
            <span style={{ fontSize: 13, color: 'rgba(245,242,235,0.50)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {project.client} · {project.name}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => setEditMode(e => !e)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700,
                border: editMode ? `1px solid rgba(232,168,0,0.35)` : '1px solid rgba(245,242,235,0.12)',
                background: editMode ? 'rgba(232,168,0,0.12)' : 'rgba(245,242,235,0.05)',
                color: editMode ? B.yellow : 'rgba(245,242,235,0.55)',
                cursor: 'pointer', transition: 'all .18s',
              }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: editMode ? B.yellow : 'rgba(245,242,235,0.30)', animation: editMode ? 'pulseDot 1.5s infinite' : 'none' }} />
              {editMode ? 'Bearbeiten' : 'Bearbeiten'}
            </button>
            {editMode && (
              <button
                onClick={() => { setProject(INITIAL_PROJECT); try { localStorage.removeItem(STORAGE_KEY); } catch {} }}
                style={{
                  padding: '6px 12px', borderRadius: 100, fontSize: 11, cursor: 'pointer',
                  border: '1px solid rgba(245,242,235,0.08)', background: 'rgba(245,242,235,0.04)',
                  color: 'rgba(245,242,235,0.30)',
                }}>
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 64px', position: 'relative', zIndex: 1 }}>

        {/* Overall progress */}
        <Reveal>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: 'rgba(245,242,235,0.50)' }}>Gesamtfortschritt</span>
              <span style={{ fontWeight: 800, color: B.cream }}>{project.overallProgress}%</span>
            </div>
            <ProgressBar value={project.overallProgress} yellow height={6} />
          </div>
        </Reveal>

        {/* Stats */}
        <OverallStats project={project} />

        {/* Tabs */}
        <Reveal delay={100}>
          <div style={{ margin: '28px 0 24px', display: 'flex', gap: 4, background: 'rgba(245,242,235,0.04)', border: '1px solid rgba(245,242,235,0.08)', borderRadius: 16, padding: 4, width: 'fit-content', flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '8px 16px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                  border: 'none', cursor: 'pointer', transition: 'all .18s',
                  background: activeTab === t.id ? 'rgba(245,242,235,0.12)' : 'transparent',
                  color: activeTab === t.id ? B.cream : 'rgba(245,242,235,0.40)',
                }}>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tab: Phasen */}
        {activeTab === 'phases' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Reveal delay={60}>
              <FilterBar filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
            </Reveal>
            {project.phases.map((phase, i) => (
              <PhaseCard key={phase.id} phase={phase} editMode={editMode}
                onTaskToggle={handleTaskToggle} onStatusChange={handlePhaseStatus}
                filterStatus={filterStatus} />
            ))}
          </div>
        )}

        {/* Tab: Zeitplan */}
        {activeTab === 'gantt' && (
          <Reveal>
            <Card>
              <div style={{ padding: '20px 22px' }}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,242,235,0.35)', marginBottom: 4 }}>Zeitplan</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: B.cream, marginBottom: 24 }}>
                  {formatDate(project.startDate)} – {formatDate(project.deadline)}
                </div>
                <GanttChart phases={project.phases} projectStart={project.startDate} projectEnd={project.deadline} />
              </div>
            </Card>
          </Reveal>
        )}

        {/* Tab: Meilensteine */}
        {activeTab === 'milestones' && (
          <Reveal>
            <Card>
              <div style={{ padding: '20px 22px' }}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,242,235,0.35)', marginBottom: 4 }}>Meilensteine</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: B.cream, marginBottom: 24 }}>
                  {editMode && <span style={{ fontSize: 11, fontWeight: 400, color: B.yellow, marginLeft: 10 }}>Klick zum Abhaken</span>}
                </div>
                <MilestoneTimeline milestones={project.milestones} editMode={editMode} onToggle={handleMilestoneToggle} />
              </div>
            </Card>
          </Reveal>
        )}

        {/* Tab: Zahlungen */}
        {activeTab === 'payments' && (
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 16 }}>
              <Card>
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,242,235,0.35)', marginBottom: 4 }}>Fristen</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: B.cream, marginBottom: 20 }}>Nächste Deadlines</div>
                  <DeadlineWidget phases={project.phases} projectDeadline={project.deadline} />
                </div>
              </Card>
              <Card>
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,242,235,0.35)', marginBottom: 4 }}>Zahlungsstruktur</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: B.cream, marginBottom: 20 }}>Übersicht</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {project.phases.filter(s => s.payment).map(s => (
                      <div key={s.id} style={{
                        padding: '12px 14px', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                        border: s.status === 'done' ? '1px solid rgba(232,168,0,0.20)' : '1px solid rgba(245,242,235,0.07)',
                        background: s.status === 'done' ? 'rgba(232,168,0,0.05)' : 'rgba(245,242,235,0.03)',
                      }}>
                        <div>
                          <div style={{ fontSize: 10, color: 'rgba(245,242,235,0.30)' }}>{s.label}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: B.cream, marginTop: 2 }}>{s.payment.label}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {s.payment.amount && <span style={{ fontSize: 18, fontWeight: 900, color: B.cream }}>{s.payment.amount} €</span>}
                          <Badge status={s.status} />
                        </div>
                      </div>
                    ))}
                    <div style={{
                      padding: '12px 14px', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      border: `1px solid rgba(232,168,0,0.20)`, background: 'rgba(232,168,0,0.05)',
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: B.cream }}>Gesamt</span>
                      <span style={{ fontSize: 20, fontWeight: 900, color: B.yellow }}>{project.budget} €</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        )}

        {/* Footer */}
        <Reveal delay={200}>
          <div style={{ marginTop: 64, textAlign: 'center', fontSize: 11, color: 'rgba(245,242,235,0.22)' }}>
            Leon Seitz · Projekt-Dashboard · <a href="https://leonseitz.com" style={{ color: 'rgba(245,242,235,0.35)', textDecoration: 'underline' }}>leonseitz.com</a>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
