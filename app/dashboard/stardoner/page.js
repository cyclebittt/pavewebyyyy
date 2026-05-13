"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const B = {
  red: "#E83A00",
  redDark: "#B82D00",
  black: "#0C0A07",
  cream: "#F5F0E8",
  dark: "#211A15",
};

const INITIAL_PROJECT = {
  client: "Star Döner",
  contact: "Ertan Sahin",
  name: "Sprint 01 – Digitale Präsenz",
  budget: 680,
  plannedHours: 15,
  hourlyRateExtra: 50,
  startDate: "2026-04-24",
  deadline: "2026-09-30",
  overallProgress: 0,

  phases: [
    {
      id: "s1",
      label: "Sprint 01",
      title: "Digitale Präsenz",
      status: "active",
      progress: 0,
      startDate: "2026-04-24",
      endDate: "2026-05-31",
      payment: null,
      tasks: [
        { id: "t1", title: "Website-Grundstruktur, Design, Deployment", status: "done", priority: "high" },
        { id: "t2", title: "Zahlung Auftraggeber", status: "done", priority: "high" },
        { id: "t3", title: "Fotoshooting koordinieren (Termin, Kamera, Ort)", status: "open", priority: "high" },
        { id: "t4", title: "Bilder nachbearbeiten und auf Website einpflegen", status: "open", priority: "high" },
        { id: "t5", title: "Feedbackschleife und Einarbeitung der Rückmeldungen", status: "open", priority: "medium" },
        { id: "t6", title: "Abnahme durch Auftraggeber", status: "open", priority: "high" },
        { id: "t7", title: "Projektabschluss & Übergabe", status: "open", priority: "medium" },
      ],
    },
    {
      id: "s2",
      label: "Sprint 02",
      title: "Markenidentität",
      status: "pending",
      progress: 0,
      startDate: "2026-06-01",
      endDate: "2026-06-30",
      payment: null,
      tasks: [
        { id: "t8", title: "Logo-Konzeption: 3 Varianten entwickeln", status: "open", priority: "high" },
        { id: "t9", title: "Logo Finalversion in allen Formaten ausarbeiten", status: "open", priority: "high" },
        { id: "t10", title: "Brand Guidelines erstellen (Farbe, Typo, Bildsprache)", status: "open", priority: "high" },
        { id: "t11", title: "Markensystem auf Website & Kanäle übertragen", status: "open", priority: "medium" },
      ],
    },
    {
      id: "s3",
      label: "Sprint 03",
      title: "Erlebnis vor Ort",
      status: "pending",
      progress: 0,
      startDate: "2026-07-01",
      endDate: "2026-07-31",
      payment: null,
      tasks: [
        { id: "t12", title: "Display-Konzept & Bildschirmarchitektur entwickeln", status: "open", priority: "high" },
        { id: "t13", title: "Motion-Design-Templates erstellen (3–5 Templates)", status: "open", priority: "high" },
        { id: "t14", title: "Analoge Speisekarte im Markensystem gestalten", status: "open", priority: "medium" },
        { id: "t15", title: "Druckfreigabe & Übergabe", status: "open", priority: "medium" },
      ],
    },
    {
      id: "s4",
      label: "Sprint 04",
      title: "Reichweite & Kanal",
      status: "pending",
      progress: 0,
      startDate: "2026-08-01",
      endDate: "2026-08-31",
      payment: null,
      tasks: [
        { id: "t16", title: "Social-Media-Grundsystem & Kanal-Setup", status: "open", priority: "high" },
        { id: "t17", title: "4–6 Content-Formate & Redaktionsplan-Vorlage", status: "open", priority: "high" },
        { id: "t18", title: "Content-Kickstart: 6–8 fertige Beiträge erstellen", status: "open", priority: "medium" },
        { id: "t19", title: "Fotokonzept für Eigenproduktion übergeben", status: "open", priority: "medium" },
      ],
    },
    {
      id: "s5",
      label: "Sprint 05",
      title: "System & Skalierung",
      status: "pending",
      progress: 0,
      startDate: "2026-09-01",
      endDate: "2026-09-30",
      payment: null,
      tasks: [
        { id: "t20", title: "Kassenintegration – Speisekarte & Kassensystem verknüpfen", status: "open", priority: "high" },
        { id: "t21", title: "Online-Bestellfunktion einrichten (optional)", status: "open", priority: "medium" },
        { id: "t22", title: "Newsletter & Stammkunden-Mechanismen aufsetzen", status: "open", priority: "medium" },
        { id: "t23", title: "Automatisierte Aktionskommunikation konfigurieren", status: "open", priority: "medium" },
      ],
    },
  ],

  milestones: [
    { id: "m1", label: "Website live auf star-doner.vercel.app", date: "2026-04-30", done: true },
    { id: "m2", label: "Zahlung Sprint 01 bestätigt", date: "2026-05-01", done: true },
    { id: "m3", label: "Fotoshooting durchgeführt", date: "2026-05-20", done: false },
    { id: "m4", label: "Produktbilder auf Website eingespielt", date: "2026-05-23", done: false },
    { id: "m5", label: "Feedbackschleife & Korrekturen abgeschlossen", date: "2026-05-27", done: false },
    { id: "m6", label: "Abnahme durch Auftraggeber", date: "2026-05-29", done: false },
    { id: "m7", label: "Sprint 01 Projektabschluss & Übergabe", date: "2026-05-31", done: false },
  ],

  timeEntries: [
    {
      id: "time-1",
      date: "2026-04-24",
      title: "Projektstart & Anforderungsanalyse",
      duration: 1.0,
      note: "Angebot erstellt, Umfang definiert, Struktur geplant.",
    },
    {
      id: "time-2",
      date: "2026-04-28",
      title: "Website-Grundstruktur & Design",
      duration: 4.5,
      note: "Next.js Setup, Design-System, Startseite, Menü-Struktur umgesetzt.",
    },
    {
      id: "time-3",
      date: "2026-04-30",
      title: "Deployment & CMS-Integration",
      duration: 2.0,
      note: "Vercel Deployment, Domain-Konfiguration, CMS-Backend eingerichtet.",
    },
  ],
};

const SPRINT_META = {
  s1: {
    icon: "🌐",
    description: "Website, digitale Speisekarte, dynamisches Aktionssystem.",
    budget: 680,
  },
  s2: {
    icon: "🎨",
    description: "Logo, Farbwelt, Typografie, Brand Guidelines.",
    budget: null,
  },
  s3: {
    icon: "🖥️",
    description: "Displays, Motion Design, analoge Speisekarte.",
    budget: null,
  },
  s4: {
    icon: "📱",
    description: "Social Media Struktur, Formate, Content-Kickstart.",
    budget: null,
  },
  s5: {
    icon: "⚙️",
    description: "Kassenintegration, Online-Bestellung, Automatisierung.",
    budget: null,
  },
};

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function formatDate(str) {
  return new Date(str).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
  });
}

function daysUntil(str) {
  return daysBetween(new Date().toISOString().slice(0, 10), str);
}

const STATUS_META = {
  done: { label: "Erledigt", dot: B.red },
  active: { label: "Aktiv", dot: B.red },
  "in-progress": { label: "In Arbeit", dot: B.redDark },
  pending: { label: "Geplant", dot: "rgba(245,240,232,0.25)" },
  open: { label: "Offen", dot: "rgba(245,240,232,0.20)" },
};

function useReveal(ref, threshold = 0.1) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
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

function ScrollBar() {
  const p = useScrollProgress();
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, pointerEvents: "none" }}>
      <div style={{ height: 3, background: "rgba(232,58,0,0.15)" }}>
        <div style={{ height: "100%", width: `${Math.round(p * 100)}%`, background: B.red, transition: "width 80ms linear" }} />
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(16px)", transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Badge({ status }) {
  const m = STATUS_META[status] ?? STATUS_META.open;
  const isActive = status === "active";
  const isDone = status === "done";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 100,
      fontSize: 11, fontWeight: 700,
      background: isDone ? "rgba(232,58,0,0.12)" : isActive ? "rgba(232,58,0,0.18)" : "rgba(245,240,232,0.06)",
      border: isDone || isActive ? "1px solid rgba(232,58,0,0.28)" : "1px solid rgba(245,240,232,0.10)",
      color: isDone || isActive ? B.red : "rgba(245,240,232,0.40)",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot, flexShrink: 0, animation: isActive ? "pulseDot 1.5s ease-in-out infinite" : "none" }} />
      {m.label}
    </span>
  );
}

function ProgressBar({ value, accent = false, height = 6 }) {
  return (
    <div style={{ width: "100%", height, borderRadius: 100, background: "rgba(245,240,232,0.08)", overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 100, width: `${Math.max(0, Math.min(100, value || 0))}%`, background: accent ? B.red : "rgba(232,58,0,0.60)", transition: "width .7s ease" }} />
    </div>
  );
}

function Card({ children, highlight = false, style = {} }) {
  return (
    <div style={{
      borderRadius: 20, overflow: "hidden",
      border: highlight ? "1px solid rgba(232,58,0,0.28)" : "1px solid rgba(245,240,232,0.07)",
      background: highlight ? "rgba(232,58,0,0.06)" : B.dark,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SprintCard({ phase, editMode, onTaskToggle, onStatusChange, filterStatus }) {
  const [collapsed, setCollapsed] = useState(phase.status !== "active");
  const isActive = phase.status === "active";
  const isDone = phase.status === "done";
  const meta = SPRINT_META[phase.id] ?? {};
  const filteredTasks = phase.tasks.filter((t) => filterStatus === "all" || t.status === filterStatus);
  const doneCount = phase.tasks.filter((t) => t.status === "done").length;

  return (
    <Reveal>
      <Card highlight={isActive}>
        {isActive && <div style={{ height: 3, background: B.red }} />}

        <div onClick={() => setCollapsed((c) => !c)} style={{ padding: "20px 22px", cursor: "pointer", userSelect: "none" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <Badge status={phase.status} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(245,240,232,0.30)" }}>
                {phase.label}
              </span>
              {meta.budget && (
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 100, background: "rgba(232,58,0,0.10)", border: "1px solid rgba(232,58,0,0.20)", color: B.red, fontWeight: 700 }}>
                  {meta.budget} €
                </span>
              )}
            </div>

            <div style={{ width: 24, height: 24, borderRadius: 8, border: "1px solid rgba(245,240,232,0.10)", background: "rgba(245,240,232,0.04)", display: "flex", alignItems: "center", justifyContent: "center", transform: collapsed ? "none" : "rotate(180deg)", transition: "transform .25s" }}>
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(245,240,232,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: B.cream, letterSpacing: "-0.01em" }}>{phase.title}</div>
            {meta.description && (
              <div style={{ marginTop: 4, fontSize: 12, color: "rgba(245,240,232,0.38)" }}>{meta.description}</div>
            )}

            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}><ProgressBar value={phase.progress} accent={isDone} /></div>
              <span style={{ fontSize: 11, color: "rgba(245,240,232,0.40)", flexShrink: 0 }}>{phase.progress}%</span>
            </div>

            <div style={{ marginTop: 6, fontSize: 11, color: "rgba(245,240,232,0.30)" }}>
              {formatDate(phase.startDate)} – {formatDate(phase.endDate)} · {doneCount}/{phase.tasks.length} Aufgaben
            </div>
          </div>
        </div>

        {!collapsed && (
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.07)", padding: "16px 22px 20px" }}>
            {editMode && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {["done", "active", "pending"].map((s) => (
                  <button key={s} onClick={() => onStatusChange(phase.id, s)} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 100, cursor: "pointer", border: phase.status === s ? `1px solid ${B.red}` : "1px solid rgba(245,240,232,0.12)", background: phase.status === s ? "rgba(232,58,0,0.12)" : "rgba(245,240,232,0.04)", color: phase.status === s ? B.red : "rgba(245,240,232,0.45)" }}>
                    {STATUS_META[s].label}
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredTasks.length === 0 && (
                <div style={{ fontSize: 12, color: "rgba(245,240,232,0.30)", padding: "8px 0" }}>Keine Aufgaben für diesen Filter.</div>
              )}
              {filteredTasks.map((task) => {
                const isDoneTask = task.status === "done";
                return (
                  <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, border: isDoneTask ? "1px solid rgba(232,58,0,0.15)" : "1px solid rgba(245,240,232,0.07)", background: isDoneTask ? "rgba(232,58,0,0.06)" : "rgba(245,240,232,0.04)" }}>
                    <button onClick={() => editMode && onTaskToggle(phase.id, task.id)} disabled={!editMode} style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, border: isDoneTask ? `1.5px solid ${B.red}` : "1.5px solid rgba(245,240,232,0.20)", background: isDoneTask ? "rgba(232,58,0,0.18)" : "rgba(245,240,232,0.04)", display: "flex", alignItems: "center", justifyContent: "center", cursor: editMode ? "pointer" : "default" }}>
                      {isDoneTask && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5.5L4 7.5L8.5 3" stroke={B.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span style={{ flex: 1, fontSize: 13, color: isDoneTask ? "rgba(245,240,232,0.35)" : "rgba(245,240,232,0.80)", textDecoration: isDoneTask ? "line-through" : "none" }}>
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

function MilestoneTimeline({ milestones = [], editMode, onToggle }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 18, top: 20, bottom: 20, width: 1, background: "linear-gradient(to bottom,rgba(232,58,0,0.40),rgba(245,240,232,0.06))" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {milestones.map((m) => {
          const days = daysUntil(m.date);
          const past = days < 0;
          return (
            <div key={m.id} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <button onClick={() => editMode && onToggle(m.id)} disabled={!editMode} style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, zIndex: 1, border: m.done ? "1px solid rgba(232,58,0,0.35)" : past ? "1px solid rgba(232,58,0,0.18)" : "1px solid rgba(245,240,232,0.12)", background: m.done ? "rgba(232,58,0,0.14)" : "rgba(245,240,232,0.04)", display: "flex", alignItems: "center", justifyContent: "center", cursor: editMode ? "pointer" : "default" }}>
                {m.done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke={B.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: past ? B.redDark : "rgba(245,240,232,0.25)" }} />
                )}
              </button>
              <div style={{ flex: 1, padding: "10px 14px", borderRadius: 14, border: m.done ? "1px solid rgba(232,58,0,0.14)" : "1px solid rgba(245,240,232,0.07)", background: m.done ? "rgba(232,58,0,0.06)" : "rgba(245,240,232,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: m.done ? "rgba(245,240,232,0.40)" : B.cream, textDecoration: m.done ? "line-through" : "none" }}>
                    {m.label}
                  </span>
                  <span style={{ fontSize: 11, color: m.done ? "rgba(245,240,232,0.28)" : past ? B.redDark : "rgba(245,240,232,0.38)" }}>
                    {formatDate(m.date)}
                    {!m.done && !past && days <= 14 && <span style={{ color: B.red }}> · {days}d</span>}
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

function GanttChart({ phases, projectStart, projectEnd }) {
  const totalDays = daysBetween(projectStart, projectEnd) || 1;
  const today = new Date().toISOString().slice(0, 10);
  const todayPct = Math.max(0, Math.min(100, (daysBetween(projectStart, today) / totalDays) * 100));

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: 460 }}>
        <div style={{ display: "flex", paddingLeft: 96, marginBottom: 12 }}>
          {[0, 25, 50, 75, 100].map((p) => {
            const d = new Date(new Date(projectStart).getTime() + (p / 100) * totalDays * 86400000);
            return (
              <div key={p} style={{ flex: 1, fontSize: 10, color: "rgba(245,240,232,0.30)", textAlign: "center" }}>
                {formatDate(d.toISOString().slice(0, 10))}
              </div>
            );
          })}
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 1, background: "rgba(232,58,0,0.55)", zIndex: 10, left: `calc(96px + ${todayPct}% * (100% - 96px) / 100)` }}>
            <div style={{ position: "absolute", top: -16, left: 4, fontSize: 9, color: B.red, whiteSpace: "nowrap" }}>Heute</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {phases.map((phase) => {
              const left = Math.max(0, (daysBetween(projectStart, phase.startDate) / totalDays) * 100);
              const width = Math.max(2, (daysBetween(phase.startDate, phase.endDate) / totalDays) * 100);
              const isDone = phase.status === "done";
              const isActive = phase.status === "active";

              return (
                <div key={phase.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 80, flexShrink: 0, fontSize: 11, color: "rgba(245,240,232,0.45)", textAlign: "right", paddingRight: 8 }}>
                    {phase.label}
                  </div>
                  <div style={{ flex: 1, position: "relative", height: 32 }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: 100, background: B.dark, border: "1px solid rgba(245,240,232,0.07)" }} />
                    <div style={{ position: "absolute", top: 4, bottom: 4, borderRadius: 100, left: `${left}%`, width: `${width}%`, minWidth: 32, background: isDone ? "rgba(232,58,0,0.50)" : isActive ? B.red : "rgba(245,240,232,0.08)" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: isDone || isActive ? B.black : "rgba(245,240,232,0.45)", overflow: "hidden", padding: "0 8px" }}>
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

function TimeTracking({ project, editMode, onAddTime, onSetManualHours }) {
  const entries = project.timeEntries ?? [];
  const totalHours = entries.reduce((sum, e) => sum + Number(e.duration || 0), 0);
  const planned = Number(project.plannedHours || 1);
  const percent = Math.round((totalHours / planned) * 100);
  const extraHours = Math.max(0, totalHours - planned);

  return (
    <Card>
      <div style={{ padding: "20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(245,240,232,0.35)", marginBottom: 4 }}>Zeiterfassung</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: B.cream }}>Aufwand transparent dokumentiert</div>
          </div>
          {editMode && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={onAddTime} style={{ padding: "7px 14px", borderRadius: 100, border: "1px solid rgba(232,58,0,0.28)", background: "rgba(232,58,0,0.10)", color: B.red, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                Zeit hinzufügen
              </button>
              <button onClick={() => { const v = Number(prompt("Wie viele Stunden wurden bisher gearbeitet? Beispiel: 2.5")); if (!Number.isFinite(v) || v < 0) return; onSetManualHours(v); }} style={{ padding: "7px 14px", borderRadius: 100, border: "1px solid rgba(245,240,232,0.12)", background: "rgba(245,240,232,0.05)", color: "rgba(245,240,232,0.65)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                Stunden setzen
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 18 }}>
          <div style={{ padding: 16, borderRadius: 16, background: "rgba(232,58,0,0.07)", border: "1px solid rgba(232,58,0,0.18)" }}>
            <div style={{ fontSize: 10, color: "rgba(245,240,232,0.35)", marginBottom: 6 }}>Bisher gearbeitet</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: B.red }}>{totalHours.toFixed(1)}h</div>
          </div>
          <div style={{ padding: 16, borderRadius: 16, background: "rgba(245,240,232,0.04)", border: "1px solid rgba(245,240,232,0.08)" }}>
            <div style={{ fontSize: 10, color: "rgba(245,240,232,0.35)", marginBottom: 6 }}>Geplant (Sprint 01)</div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>{project.plannedHours}h</div>
          </div>
          <div style={{ padding: 16, borderRadius: 16, background: extraHours > 0 ? "rgba(232,58,0,0.07)" : "rgba(245,240,232,0.04)", border: extraHours > 0 ? "1px solid rgba(232,58,0,0.18)" : "1px solid rgba(245,240,232,0.08)" }}>
            <div style={{ fontSize: 10, color: "rgba(245,240,232,0.35)", marginBottom: 6 }}>Mehraufwand</div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>{extraHours > 0 ? `${extraHours.toFixed(1)}h` : "kein Mehraufwand"}</div>
            <div style={{ marginTop: 4, fontSize: 11, color: "rgba(245,240,232,0.38)" }}>nur nach Absprache · {project.hourlyRateExtra} €/h</div>
          </div>
        </div>

        <ProgressBar value={percent} accent height={6} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          {entries.map((entry) => (
            <div key={entry.id} style={{ padding: "13px 15px", borderRadius: 15, border: "1px solid rgba(245,240,232,0.07)", background: "rgba(245,240,232,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>{entry.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(245,240,232,0.35)", marginTop: 3 }}>{formatDate(entry.date)}</div>
                </div>
                <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(232,58,0,0.10)", border: "1px solid rgba(232,58,0,0.20)", color: B.red, fontSize: 12, fontWeight: 900 }}>
                  {Number(entry.duration).toFixed(1)}h
                </div>
              </div>
              {entry.note && <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.6, color: "rgba(245,240,232,0.48)" }}>{entry.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function OverallStats({ project }) {
  const allTasks = project.phases.flatMap((s) => s.tasks);
  const doneTasks = allTasks.filter((t) => t.status === "done").length;
  const activeSprint = project.phases.find((s) => s.status === "active");
  const totalHours = (project.timeEntries ?? []).reduce((sum, e) => sum + Number(e.duration || 0), 0);
  const daysLeft = daysUntil(project.phases.find((s) => s.status === "active")?.endDate ?? project.deadline);

  const stats = [
    { label: "Sprint-Fortschritt", value: `${project.overallProgress}%`, sub: `${doneTasks}/${allTasks.length} Aufgaben` },
    { label: "Aktiver Sprint", value: activeSprint?.label ?? "–", sub: activeSprint?.title ?? "Kein Sprint aktiv" },
    { label: "Zeitaufwand", value: `${totalHours.toFixed(1)}h`, sub: `von ca. ${project.plannedHours}h geplant` },
    { label: "Sprint 01", value: `${project.budget} €`, sub: daysLeft >= 0 ? `noch ${daysLeft} Tage` : "abgelaufen" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(160px,100%),1fr))", gap: 12 }}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 60}>
          <div style={{ padding: "16px 18px", borderRadius: 16, border: "1px solid rgba(245,240,232,0.07)", background: B.dark }}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(245,240,232,0.35)", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: B.cream, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(245,240,232,0.38)", marginTop: 2 }}>{s.sub}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function FilterBar({ filterStatus, setFilterStatus }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(245,240,232,0.30)" }}>Filter:</span>
      {["all", "done", "open"].map((s) => (
        <button key={s} onClick={() => setFilterStatus(s)} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 100, cursor: "pointer", border: filterStatus === s ? `1px solid ${B.red}` : "1px solid rgba(245,240,232,0.10)", background: filterStatus === s ? B.red : "rgba(245,240,232,0.04)", color: filterStatus === s ? B.black : "rgba(245,240,232,0.45)", fontWeight: filterStatus === s ? 700 : 400 }}>
          {s === "all" ? "Alle" : STATUS_META[s]?.label ?? s}
        </button>
      ))}
    </div>
  );
}

function mergeProject(data) {
  const base = structuredClone(INITIAL_PROJECT);
  const incoming = data && !data.error ? data : {};

  return {
    ...base,
    ...incoming,
    phases: base.phases.map((basePhase) => {
      const oldPhase = incoming.phases?.find((p) => p.id === basePhase.id);
      if (!oldPhase) return basePhase;
      return {
        ...basePhase,
        ...oldPhase,
        tasks: basePhase.tasks.map((baseTask) => {
          const oldTask = oldPhase.tasks?.find((t) => t.id === baseTask.id || t.title === baseTask.title);
          return oldTask ? { ...baseTask, status: oldTask.status ?? baseTask.status } : baseTask;
        }),
      };
    }),
    milestones: incoming.milestones?.length ? incoming.milestones : base.milestones,
    timeEntries: incoming.timeEntries?.length ? incoming.timeEntries : base.timeEntries,
  };
}

export default function StarDoenerDashboard() {
  const [project, setProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("sprints");
  const [saving, setSaving] = useState(false);

  const recalcProgress = useCallback((phases) => {
    const allTasks = phases.flatMap((s) => s.tasks);
    const done = allTasks.filter((t) => t.status === "done").length;
    return Math.round((done / Math.max(1, allTasks.length)) * 100);
  }, []);

  const saveProject = useCallback(async (nextProject) => {
    setProject(nextProject);
    setSaving(true);
    await fetch("/api/project-dashboard/stardoner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextProject),
    });
    setSaving(false);
  }, []);

  useEffect(() => {
    async function loadProject() {
      const res = await fetch("/api/project-dashboard/stardoner", { cache: "no-store" });
      const data = await res.json();
      const merged = mergeProject(data);
      merged.overallProgress = recalcProgress(merged.phases);
      setProject(merged);
      await fetch("/api/project-dashboard/stardoner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged),
      });
    }
    loadProject();
  }, [recalcProgress]);

  const handleTaskToggle = useCallback((phaseId, taskId) => {
    setProject((prev) => {
      const phases = prev.phases.map((s) => {
        if (s.id !== phaseId) return s;
        const tasks = s.tasks.map((t) => t.id !== taskId ? t : { ...t, status: t.status === "done" ? "open" : "done" });
        const doneCount = tasks.filter((t) => t.status === "done").length;
        return { ...s, tasks, progress: Math.round((doneCount / tasks.length) * 100) };
      });
      const next = { ...prev, phases, overallProgress: recalcProgress(phases) };
      saveProject(next);
      return next;
    });
  }, [recalcProgress, saveProject]);

  const handlePhaseStatus = useCallback((phaseId, status) => {
    setProject((prev) => {
      const phases = prev.phases.map((s) => s.id === phaseId ? { ...s, status } : s);
      const next = { ...prev, phases };
      saveProject(next);
      return next;
    });
  }, [saveProject]);

  const handleMilestoneToggle = useCallback((id) => {
    setProject((prev) => {
      const next = { ...prev, milestones: prev.milestones.map((m) => m.id === id ? { ...m, done: !m.done } : m) };
      saveProject(next);
      return next;
    });
  }, [saveProject]);

  const handleAddTimeEntry = useCallback(() => {
    const title = prompt("Was wurde gemacht?");
    if (!title) return;
    const duration = Number(prompt("Wie viele Stunden? Beispiel: 1.5"));
    if (!duration) return;
    const note = prompt("Kurze Notiz, optional") || "";
    setProject((prev) => {
      const next = {
        ...prev,
        timeEntries: [...(prev.timeEntries ?? []), { id: `time-${Date.now()}`, date: new Date().toISOString().slice(0, 10), title, duration, note }],
      };
      saveProject(next);
      return next;
    });
  }, [saveProject]);

  const handleSetManualHours = useCallback((hours) => {
    setProject((prev) => {
      const next = {
        ...prev,
        timeEntries: [{ id: "manual-hours", date: new Date().toISOString().slice(0, 10), title: "Manuell gesetzter Gesamtaufwand", duration: hours, note: "Direkt im Dashboard manuell angepasst." }],
      };
      saveProject(next);
      return next;
    });
  }, [saveProject]);

  const tabs = [
    { id: "sprints", label: "Sprints" },
    { id: "gantt", label: "Zeitplan" },
    { id: "milestones", label: "Meilensteine" },
    { id: "time", label: "Zeiterfassung" },
    { id: "payments", label: "Angebot" },
  ];

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", background: B.black, color: B.cream, display: "grid", placeItems: "center", fontFamily: "system-ui,sans-serif" }}>
        Dashboard wird geladen...
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", color: B.cream, minHeight: "100vh", background: B.black, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;min-width:0}
        html,body{overflow-x:hidden;max-width:100%}
        button{font-family:inherit}
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.4}}
      `}</style>

      <ScrollBar />

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(800px 600px at 20% 20%, rgba(232,58,0,0.07), transparent 60%)" }} />
      </div>

      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(20px)", background: "rgba(12,10,7,0.75)", borderBottom: "1px solid rgba(245,240,232,0.07)" }}>
        <div style={{ height: 3, background: B.red }} />
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 900, color: B.cream, textDecoration: "none", flexShrink: 0 }}>Leon Seitz</a>
            <span style={{ color: "rgba(245,240,232,0.20)", fontSize: 14 }}>/</span>
            <span style={{ fontSize: 13, color: "rgba(245,240,232,0.50)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {project.client} · {project.contact}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {saving && <span style={{ fontSize: 11, color: "rgba(245,240,232,0.35)" }}>speichert...</span>}
            <button onClick={() => setEditMode((e) => !e)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 700, border: editMode ? "1px solid rgba(232,58,0,0.35)" : "1px solid rgba(245,240,232,0.12)", background: editMode ? B.red : "rgba(245,240,232,0.05)", color: editMode ? B.black : "rgba(245,240,232,0.55)", cursor: "pointer" }}>
              {editMode ? "Bearbeiten aktiv" : "Bearbeiten"}
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px 64px", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "inline-flex", padding: "5px 12px", borderRadius: 999, background: "rgba(232,58,0,0.08)", border: "1px solid rgba(232,58,0,0.22)", color: B.red, fontSize: 11, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14 }}>
              Projekt-Dashboard
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(28px,5vw,50px)", lineHeight: 1, letterSpacing: "-0.05em" }}>
              Star Döner
            </h1>
            <p style={{ maxWidth: 660, marginTop: 14, color: "rgba(245,240,232,0.54)", lineHeight: 1.7, fontSize: 14 }}>
              Strategischer Fahrplan in 5 Sprints — von der digitalen Präsenz bis zur vollständigen System-Integration. Jeder Sprint ist in sich abgeschlossen und erzeugt messbaren Mehrwert. Auftraggeber: Ertan Sahin · Obernburg am Main.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: "rgba(245,240,232,0.50)" }}>Gesamtfortschritt</span>
              <span style={{ fontWeight: 800, color: B.cream }}>{project.overallProgress}%</span>
            </div>
            <ProgressBar value={project.overallProgress} accent height={6} />
          </div>
        </Reveal>

        <OverallStats project={project} />

        <Reveal delay={100}>
          <div style={{ margin: "28px 0 24px", display: "flex", gap: 4, background: B.dark, border: "1px solid rgba(245,240,232,0.08)", borderRadius: 16, padding: 4, width: "fit-content", flexWrap: "wrap" }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "8px 16px", borderRadius: 12, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", background: activeTab === t.id ? B.red : "transparent", color: activeTab === t.id ? B.black : "rgba(245,240,232,0.40)" }}>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {activeTab === "sprints" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Reveal delay={60}>
              <FilterBar filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
            </Reveal>
            {project.phases.map((phase) => (
              <SprintCard key={phase.id} phase={phase} editMode={editMode} onTaskToggle={handleTaskToggle} onStatusChange={handlePhaseStatus} filterStatus={filterStatus} />
            ))}
          </div>
        )}

        {activeTab === "gantt" && (
          <Reveal>
            <Card>
              <div style={{ padding: "20px 22px" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(245,240,232,0.35)", marginBottom: 4 }}>Zeitplan</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: B.cream, marginBottom: 24 }}>
                  5 Sprints · {formatDate(project.startDate)} – {formatDate(project.deadline)}
                </div>
                <GanttChart phases={project.phases} projectStart={project.startDate} projectEnd={project.deadline} />
              </div>
            </Card>
          </Reveal>
        )}

        {activeTab === "milestones" && (
          <Reveal>
            <Card>
              <div style={{ padding: "20px 22px" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(245,240,232,0.35)", marginBottom: 4 }}>Meilensteine</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: B.cream, marginBottom: 24 }}>
                  Sprint 01 – Projektfortschritt
                  {editMode && <span style={{ fontSize: 11, fontWeight: 400, color: B.red, marginLeft: 10 }}>Klick zum Abhaken</span>}
                </div>
                <MilestoneTimeline milestones={project.milestones} editMode={editMode} onToggle={handleMilestoneToggle} />
              </div>
            </Card>
          </Reveal>
        )}

        {activeTab === "time" && (
          <Reveal>
            <TimeTracking project={project} editMode={editMode} onAddTime={handleAddTimeEntry} onSetManualHours={handleSetManualHours} />
          </Reveal>
        )}

        {activeTab === "payments" && (
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card highlight>
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(245,240,232,0.35)", marginBottom: 4 }}>Angebot 2026-004</div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "flex-start", marginTop: 14 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: B.cream }}>Sprint 01 – Digitale Präsenz</div>
                      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                          { title: "Digitale Speisekarte & Website", desc: "Website mit CMS-Backend, digitaler Speisekarte, Hero-Section, Google Maps, Öffnungszeiten, Kontaktbereich. Übergabe inkl. Einweisung.", price: "380 €" },
                          { title: "Fotoshooting vor Ort", desc: "Produktfotos aller Hauptgerichte. Vorbereitung, Durchführung, Nachbearbeitung. Optimiert für Website, Speisekarte, Social Media.", price: "150 €" },
                          { title: "Equipment-Miete (Kamera & Objektiv)", desc: "Professionelle Systemkamera mit Objektiv für Produktfotografie (Tagesmiete inkl. Versand).", price: "150 €" },
                          { title: "Social Media Setup", desc: "Einrichtung Instagram & TikTok. Bio, Profilbild, Highlights, Verknüpfung mit Website. Übergabe inkl. Einweisung.", price: "inklusive" },
                          { title: "Hosting & Wartung", desc: "Vollständiges Hosting, technische Updates, Sicherheitsüberprüfung, Performance-Monitoring. Domain separat (ca. 12 € im ersten Jahr).", price: "inklusive" },
                        ].map((item) => (
                          <div key={item.title} style={{ padding: "13px 15px", borderRadius: 14, border: "1px solid rgba(245,240,232,0.07)", background: "rgba(245,240,232,0.03)", display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
                            <div style={{ flex: 1, minWidth: 200 }}>
                              <div style={{ fontSize: 13, fontWeight: 800, color: B.cream }}>{item.title}</div>
                              <div style={{ fontSize: 12, color: "rgba(245,240,232,0.45)", marginTop: 4, lineHeight: 1.6 }}>{item.desc}</div>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 900, color: item.price === "inklusive" ? "rgba(245,240,232,0.35)" : B.red, flexShrink: 0, paddingTop: 2 }}>{item.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(245,240,232,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 13, color: "rgba(245,240,232,0.45)" }}>Gesamtbetrag Sprint 01 · Kleinunternehmer §19 UStG · keine USt.</div>
                    <div style={{ fontSize: 36, fontWeight: 900, color: B.red, letterSpacing: "-0.04em" }}>{project.budget} €</div>
                  </div>
                </div>
              </Card>

              <Card>
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(245,240,232,0.35)", marginBottom: 14 }}>Strategischer Fahrplan – alle 5 Sprints</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { sprint: "Sprint 01", title: "Digitale Präsenz", desc: "Website, digitale Speisekarte, dynamisches Aktionssystem." },
                      { sprint: "Sprint 02", title: "Markenidentität", desc: "Logo, Farbwelt, Typografie, Brand Guidelines." },
                      { sprint: "Sprint 03", title: "Erlebnis vor Ort", desc: "Displays, Motion Design, analoge Speisekarte." },
                      { sprint: "Sprint 04", title: "Reichweite & Kanal", desc: "Social Media Struktur, Formate, Content-Kickstart." },
                      { sprint: "Sprint 05", title: "System & Skalierung", desc: "Kassenintegration, Online-Bestellung, Automatisierung." },
                    ].map((s, i) => (
                      <div key={s.sprint} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(245,240,232,0.05)" : "none" }}>
                        <div style={{ width: 70, flexShrink: 0, fontSize: 11, fontWeight: 700, color: i === 0 ? B.red : "rgba(245,240,232,0.30)", paddingTop: 2 }}>{s.sprint}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: i === 0 ? B.cream : "rgba(245,240,232,0.55)" }}>{s.title}</div>
                          <div style={{ fontSize: 12, color: "rgba(245,240,232,0.38)", marginTop: 2 }}>{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, fontSize: 12, color: "rgba(245,240,232,0.35)", lineHeight: 1.6 }}>
                    Jeder Sprint wird separat angeboten und abgerechnet. Die Beauftragung eines Sprints schließt keine weiteren Sprints ein. Mehraufwand wird vorab transparent abgesprochen. Stundensatz: {project.hourlyRateExtra} €/h.
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div style={{ marginTop: 64, textAlign: "center", fontSize: 11, color: "rgba(245,240,232,0.22)" }}>
            Leon Seitz · Paveo · <a href="https://leonseitz.com" style={{ color: "rgba(245,240,232,0.35)", textDecoration: "underline" }}>leonseitz.com</a>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
