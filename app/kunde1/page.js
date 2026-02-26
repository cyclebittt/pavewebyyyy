'use client'; // Remove if not using Next.js

import { useState, useRef, useEffect, useMemo, useCallback } from "react";

/* ─── DEMO PROJECT DATA ─────────────────────────────────────────────────────── */
// Replace this with your actual client data

const INITIAL_PROJECT = {
  client: "Kunde 1",
  name: "Webdesign + Branding",
  package: "Standard",
  budget: 700,
  startDate: "2025-03-01",
  deadline: "2025-03-20",
  overallProgress: 40,

  sprints: [
    {
      id: "s0",
      label: "Sprint 0",
      title: "Analyse + Entwurf",
      status: "done",
      progress: 100,
      startDate: "2025-03-01",
      endDate: "2025-03-03",
      payment: null,
      tasks: [
        { id: "t1", title: "Website-Analyse & Briefing", status: "done", priority: "high" },
        { id: "t2", title: "Moodboard + Referenzen", status: "done", priority: "medium" },
        { id: "t3", title: "Strukturvorschlag Seiten", status: "done", priority: "high" },
      ],
    },
    {
      id: "s1",
      label: "Sprint 1",
      title: "Erste Version",
      status: "active",
      progress: 55,
      startDate: "2025-03-04",
      endDate: "2025-03-10",
      payment: { label: "Zahlungsziel 1 (30%)", amount: 210 },
      tasks: [
        { id: "t4", title: "Startseite – Desktop", status: "done", priority: "high" },
        { id: "t5", title: "Startseite – Mobile", status: "in-progress", priority: "high" },
        { id: "t6", title: "Über uns – Layout", status: "in-progress", priority: "medium" },
        { id: "t7", title: "Kontaktseite", status: "open", priority: "low" },
      ],
    },
    {
      id: "s2",
      label: "Sprint 2",
      title: "Feinschliff",
      status: "pending",
      progress: 0,
      startDate: "2025-03-11",
      endDate: "2025-03-16",
      payment: { label: "Zahlungsziel 2 (50%)", amount: 350 },
      tasks: [
        { id: "t8", title: "Feedback einarbeiten", status: "open", priority: "high" },
        { id: "t9", title: "Animationen + Hover-States", status: "open", priority: "medium" },
        { id: "t10", title: "SEO Meta-Tags", status: "open", priority: "medium" },
        { id: "t11", title: "Performance-Check", status: "open", priority: "low" },
      ],
    },
    {
      id: "s3",
      label: "Sprint 3",
      title: "Go-Live & Übergabe",
      status: "pending",
      progress: 0,
      startDate: "2025-03-17",
      endDate: "2025-03-20",
      payment: { label: "Zahlungsziel 3 (20%)", amount: 140 },
      tasks: [
        { id: "t12", title: "Go-Live auf Domain", status: "open", priority: "high" },
        { id: "t13", title: "Zugänge + Übergabe", status: "open", priority: "high" },
        { id: "t14", title: "Abschlussdoku", status: "open", priority: "low" },
      ],
    },
  ],

  milestones: [
    { id: "m1", label: "Entwurf freigegeben", date: "2025-03-03", done: true },
    { id: "m2", label: "Version 1 live zum Testen", date: "2025-03-10", done: false },
    { id: "m3", label: "Feinschliff freigegeben", date: "2025-03-16", done: false },
    { id: "m4", label: "Go-Live", date: "2025-03-20", done: false },
  ],
};

/* ─── UTILS ──────────────────────────────────────────────────────────────────── */

function cx(...args) {
  return args.filter(Boolean).join(" ");
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function formatDate(str) {
  return new Date(str).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

function daysUntil(str) {
  return daysBetween(new Date().toISOString().slice(0, 10), str);
}

const STATUS_META = {
  done: { label: "Erledigt", color: "text-emerald-300", bg: "bg-emerald-500/15 border-emerald-300/25", dot: "bg-emerald-400" },
  active: { label: "Aktiv", color: "text-violet-300", bg: "bg-violet-500/15 border-violet-300/25", dot: "bg-violet-400 animate-pulse" },
  "in-progress": { label: "In Arbeit", color: "text-cyan-300", bg: "bg-cyan-500/15 border-cyan-300/25", dot: "bg-cyan-400" },
  pending: { label: "Ausstehend", color: "text-white/50", bg: "bg-white/5 border-white/10", dot: "bg-white/30" },
  open: { label: "Offen", color: "text-white/50", bg: "bg-white/5 border-white/10", dot: "bg-white/25" },
};


/* ─── HOOKS ──────────────────────────────────────────────────────────────────── */

function useReveal(ref, threshold = 0.15) {
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

function useMousePos() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const raf = useRef(null);
  useEffect(() => {
    const fn = (e) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => { window.removeEventListener("mousemove", fn); cancelAnimationFrame(raf.current); };
  }, []);
  return pos;
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

/* ─── BACKGROUND ─────────────────────────────────────────────────────────────── */

const SCENE = {
  base: "#070312",
  g1: `radial-gradient(1200px 700px at 18% 18%, rgba(168,85,247,0.28), transparent 60%),
       radial-gradient(900px 700px at 82% 25%, rgba(56,189,248,0.14), transparent 55%)`,
  g2: `linear-gradient(135deg, #070312 0%, #0b0b1a 50%, #03040e 100%)`,
  blobs: [
    { cls: "bg-violet-500/16", x: "-20%", y: "-18%", s: "56rem", blur: 140, anim: "blob" },
    { cls: "bg-cyan-500/11", x: "70%", y: "10%", s: "54rem", blur: 150, anim: "blob2" },
    { cls: "bg-fuchsia-500/9", x: "20%", y: "80%", s: "46rem", blur: 150, anim: "blob3" },
  ],
};

function GlobalBg() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: SCENE.base, backgroundImage: `${SCENE.g1}, ${SCENE.g2}` }}
      />
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundSize: "220px 220px",
          animation: "noiseMove 7s linear infinite",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,transparent_0%,rgba(0,0,0,0.38)_65%,rgba(0,0,0,0.70)_100%)]" />
      {SCENE.blobs.map((b, i) => (
        <div
          key={i}
          className={cx("absolute rounded-full", b.cls)}
          style={{
            left: b.x, top: b.y, width: b.s, height: b.s,
            filter: `blur(${b.blur}px)`,
            animation: `${b.anim} ${10 + i * 2}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function CursorHalo() {
  const { x, y } = useMousePos();
  return (
    <div className="hidden md:block fixed inset-0 z-[5] pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(700px 500px at ${x}px ${y}px, rgba(255,255,255,0.04), transparent 70%)`,
          filter: "blur(16px)", opacity: 0.55, mixBlendMode: "screen",
          transition: "background 80ms linear",
        }}
      />
    </div>
  );
}

function ScrollBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none h-[2px] bg-white/8">
      <div
        className="h-full bg-gradient-to-r from-violet-300 via-cyan-300 to-emerald-300"
        style={{ width: `${Math.round(p * 100)}%`, transition: "width 80ms linear" }}
      />
    </div>
  );
}

/* ─── SHARED UI ──────────────────────────────────────────────────────────────── */

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div
      ref={ref}
      className={cx("transition-all duration-700 will-change-transform", shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Card({ children, className = "", glow = false }) {
  return (
    <div className={cx(
      "relative rounded-3xl border border-white/14 bg-black/20 backdrop-blur-md overflow-hidden",
      glow && "ring-1 ring-inset ring-violet-300/20",
      className
    )}>
      {glow && (
        <div className="pointer-events-none absolute -inset-px blur-2xl opacity-40"
          style={{ background: "radial-gradient(60% 80% at 25% 0%, rgba(168,85,247,0.12), transparent 60%),radial-gradient(60% 80% at 85% 0%, rgba(56,189,248,0.08), transparent 60%)" }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

function Badge({ status }) {
  const m = STATUS_META[status] ?? STATUS_META.open;
  return (
    <span className={cx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", m.bg, m.color)}>
      <span className={cx("w-1.5 h-1.5 rounded-full shrink-0", m.dot)} />
      {m.label}
    </span>
  );
}

function ProgressBar({ value, color = "from-violet-400 to-cyan-400", height = "h-2" }) {
  return (
    <div className={cx("w-full rounded-full bg-white/10 overflow-hidden", height)}>
      <div
        className={cx("h-full rounded-full bg-gradient-to-r transition-all duration-700", color)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function SectionLabel({ children }) {
  return <div className="text-[11px] uppercase tracking-widest text-white/45 font-semibold">{children}</div>;
}

/* ─── GANTT CHART ────────────────────────────────────────────────────────────── */

function GanttChart({ sprints, projectStart, projectEnd }) {
  const totalDays = daysBetween(projectStart, projectEnd) || 1;
  const today = new Date().toISOString().slice(0, 10);
  const todayPct = Math.max(0, Math.min(100, (daysBetween(projectStart, today) / totalDays) * 100));

  const barColors = {
    done: "bg-gradient-to-r from-emerald-500/60 to-emerald-400/50 border-emerald-300/30",
    active: "bg-gradient-to-r from-violet-500/70 to-cyan-500/60 border-violet-300/40",
    pending: "bg-gradient-to-r from-white/8 to-white/5 border-white/10",
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="min-w-[460px]">
        {/* Date axis */}
        <div className="flex items-center mb-3 pl-28">
          {[0, 25, 50, 75, 100].map((p) => {
            const d = new Date(new Date(projectStart).getTime() + (p / 100) * totalDays * 86400000);
            return (
              <div key={p} className="flex-1 text-[10px] text-white/30 text-center"
                style={{ position: "relative", left: p === 0 ? "0" : undefined }}>
                {formatDate(d.toISOString().slice(0, 10))}
              </div>
            );
          })}
        </div>

        {/* Rows */}
        <div className="relative space-y-2">
          {/* Today line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-violet-400/60 z-10 pointer-events-none"
            style={{ left: `calc(7rem + ${todayPct}% * (100% - 7rem) / 100)` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] text-violet-300 whitespace-nowrap">Heute</div>
          </div>

          {sprints.map((sprint) => {
            const left = Math.max(0, (daysBetween(projectStart, sprint.startDate) / totalDays) * 100);
            const width = Math.max(2, (daysBetween(sprint.startDate, sprint.endDate) / totalDays) * 100);
            const color = barColors[sprint.status] ?? barColors.pending;

            return (
              <div key={sprint.id} className="flex items-center gap-3">
                <div className="w-24 shrink-0 text-xs text-white/60 text-right pr-2 truncate">{sprint.label}</div>
                <div className="flex-1 relative h-8">
                  {/* Track */}
                  <div className="absolute inset-0 rounded-full bg-white/5 border border-white/8" />
                  {/* Bar */}
                  <div
                    className={cx("absolute top-1 bottom-1 rounded-full border", color)}
                    style={{ left: `${left}%`, width: `${width}%`, minWidth: "2rem" }}
                  >
                    {sprint.progress > 0 && (
                      <div
                        className="h-full rounded-full bg-white/20"
                        style={{ width: `${sprint.progress}%` }}
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-white/80 truncate px-2">
                        {sprint.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── MILESTONE TIMELINE ─────────────────────────────────────────────────────── */

function MilestoneTimeline({ milestones, editMode, onToggle }) {
  return (
    <div className="relative">
      <div className="absolute left-[18px] top-5 bottom-5 w-px bg-gradient-to-b from-violet-400/40 via-cyan-400/25 to-white/10" />
      <div className="space-y-3">
        {milestones.map((m, i) => {
          const days = daysUntil(m.date);
          const past = days < 0;
          return (
            <div key={m.id} className="relative flex items-start gap-4">
              <button
                onClick={() => editMode && onToggle(m.id)}
                className={cx(
                  "relative z-10 shrink-0 w-9 h-9 rounded-2xl border flex items-center justify-center transition-all duration-300",
                  m.done
                    ? "border-emerald-300/40 bg-emerald-500/20 shadow-[0_0_16px_rgba(52,211,153,0.2)]"
                    : past
                      ? "border-amber-300/25 bg-amber-500/10"
                      : "border-white/14 bg-white/7",
                  editMode && "cursor-pointer hover:scale-110"
                )}
                disabled={!editMode}
              >
                {m.done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="rgb(110,231,183)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span className={cx("w-2 h-2 rounded-full", past ? "bg-amber-400" : "bg-white/25")} />
                )}
              </button>
              <div className={cx(
                "flex-1 rounded-2xl border px-4 py-3 transition-all duration-300",
                m.done ? "border-emerald-300/18 bg-emerald-500/6" : "border-white/9 bg-white/4"
              )}>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={cx("text-sm font-semibold", m.done ? "text-white/50 line-through" : "text-white/88")}>{m.label}</span>
                  <span className={cx("text-xs", m.done ? "text-white/35" : past ? "text-amber-300/80" : "text-white/45")}>
                    {formatDate(m.date)} {!m.done && !past && days <= 7 && <span className="text-amber-300">· {days}d</span>}
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

/* ─── DEADLINE WIDGET ────────────────────────────────────────────────────────── */

function DeadlineWidget({ sprints, projectDeadline }) {
  const now = new Date().toISOString().slice(0, 10);

  const upcoming = sprints
    .filter((s) => s.status !== "done" && s.endDate >= now)
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
    .slice(0, 3);

  const projDays = daysUntil(projectDeadline);

  return (
    <div className="space-y-3">
      {/* Overall deadline */}
      <div className={cx(
        "rounded-2xl border p-4 flex items-center justify-between gap-3",
        projDays <= 3 ? "border-rose-300/30 bg-rose-500/10" : projDays <= 7 ? "border-amber-300/25 bg-amber-500/8" : "border-white/12 bg-white/5"
      )}>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40">Gesamt-Deadline</div>
          <div className="text-sm font-semibold text-white/88 mt-0.5">{formatDate(projectDeadline)}</div>
        </div>
        <div className={cx(
          "text-2xl font-extrabold tabular-nums",
          projDays <= 3 ? "text-rose-300" : projDays <= 7 ? "text-amber-300" : "text-white/70"
        )}>
          {projDays}d
        </div>
      </div>

      {/* Sprint deadlines */}
      {upcoming.map((s) => {
        const d = daysUntil(s.endDate);
        return (
          <div key={s.id} className="rounded-2xl border border-white/10 bg-white/4 p-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-white/40">{s.label}</div>
              <div className="text-sm text-white/75 mt-0.5">{s.title}</div>
            </div>
            <div className={cx("text-lg font-bold tabular-nums shrink-0", d <= 2 ? "text-rose-300" : d <= 5 ? "text-amber-300" : "text-white/55")}>
              {d}d
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── SPRINT CARD ────────────────────────────────────────────────────────────── */

function SprintCard({ sprint, editMode, onTaskToggle, onStatusChange, filterStatus }) {
  // Active sprint is open by default, all others closed
  const [collapsed, setCollapsed] = useState(sprint.status !== "active");

  const filteredTasks = sprint.tasks.filter((t) => {
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    return true;
  });

  const doneCount = sprint.tasks.filter((t) => t.status === "done").length;
  const totalCount = sprint.tasks.length;

  const sprintGlow = sprint.status === "active";

  return (
    <Reveal>
      <Card glow={sprintGlow} className="overflow-hidden">
        <div
          className="p-5 md:p-6 cursor-pointer select-none"
          onClick={() => setCollapsed((c) => !c)}
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge status={sprint.status} />
              <span className="text-xs text-white/40">{sprint.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {sprint.payment && (
                <span className="text-xs text-white/45 bg-white/6 border border-white/10 rounded-full px-2.5 py-1">
                  {sprint.payment.label} · {sprint.payment.amount} €
                </span>
              )}
              <div className={cx("w-6 h-6 rounded-lg flex items-center justify-center border border-white/12 bg-white/6 transition-transform duration-300", !collapsed && "rotate-180")}>
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 3.5L5 6.5L8 3.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-base md:text-lg font-bold text-white/90">{sprint.title}</div>
            <div className="mt-2 flex items-center gap-3">
              <ProgressBar value={sprint.progress} height="h-1.5"
                color={sprint.status === "done" ? "from-emerald-400 to-emerald-300" : sprint.status === "active" ? "from-violet-400 to-cyan-400" : "from-white/20 to-white/10"}
              />
              <span className="text-xs text-white/45 shrink-0">{sprint.progress}%</span>
            </div>
            <div className="mt-1 text-xs text-white/35">
              {formatDate(sprint.startDate)} – {formatDate(sprint.endDate)} · {doneCount}/{totalCount} Aufgaben
            </div>
          </div>
        </div>

        {!collapsed && (
          <div className="border-t border-white/8 px-5 md:px-6 pb-5 pt-4">
            {editMode && (
              <div className="mb-4 flex flex-wrap gap-2">
                {["done", "active", "pending"].map((s) => (
                  <button
                    key={s}
                    onClick={() => onStatusChange(sprint.id, s)}
                    className={cx(
                      "text-xs px-3 py-1 rounded-full border transition-colors",
                      sprint.status === s
                        ? "border-white/30 bg-white/15 text-white"
                        : "border-white/10 bg-white/4 text-white/50 hover:bg-white/10"
                    )}
                  >
                    {STATUS_META[s].label}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {filteredTasks.length === 0 && (
                <div className="text-xs text-white/35 py-2">Keine Aufgaben für diesen Filter.</div>
              )}
              {filteredTasks.map((task) => (
                <div key={task.id} className={cx(
                  "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-200",
                  task.status === "done" ? "border-emerald-300/15 bg-emerald-500/6" : "border-white/9 bg-white/4"
                )}>
                  <button
                    onClick={() => editMode && onTaskToggle(sprint.id, task.id)}
                    className={cx(
                      "shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                      task.status === "done"
                        ? "border-emerald-300/50 bg-emerald-500/25"
                        : "border-white/20 bg-white/5",
                      editMode && "cursor-pointer hover:scale-110"
                    )}
                    disabled={!editMode}
                  >
                    {task.status === "done" && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.5L4 7.5L8.5 3" stroke="rgb(110,231,183)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                  <span className={cx("flex-1 text-sm", task.status === "done" ? "text-white/40 line-through" : "text-white/80")}>
                    {task.title}
                  </span>
                  <Badge status={task.status} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </Reveal>
  );
}

/* ─── FILTER BAR ─────────────────────────────────────────────────────────────── */

function FilterBar({ filterStatus, setFilterStatus }) {
  const statuses = ["all", "done", "in-progress", "open"];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs text-white/35 uppercase tracking-wide">Status:</span>
      {statuses.map((s) => (
        <button
          key={s}
          onClick={() => setFilterStatus(s)}
          className={cx(
            "text-xs px-3 py-1.5 rounded-full border transition-colors",
            filterStatus === s
              ? "border-white/30 bg-white/15 text-white font-semibold"
              : "border-white/10 bg-white/4 text-white/50 hover:bg-white/8"
          )}
        >
          {s === "all" ? "Alle" : STATUS_META[s]?.label ?? s}
        </button>
      ))}
    </div>
  );
}

/* ─── OVERALL STATS ──────────────────────────────────────────────────────────── */

function OverallStats({ project }) {
  const allTasks = project.sprints.flatMap((s) => s.tasks);
  const doneTasks = allTasks.filter((t) => t.status === "done").length;
  const activeSprint = project.sprints.find((s) => s.status === "active");

  const stats = [
    { label: "Gesamtfortschritt", value: `${project.overallProgress}%`, sub: `${doneTasks}/${allTasks.length} Aufgaben` },
    { label: "Aktiver Sprint", value: activeSprint?.label ?? "–", sub: activeSprint?.title ?? "Kein Sprint aktiv" },
    { label: "Deadline", value: formatDate(project.deadline), sub: `${daysUntil(project.deadline)} Tage` },
    { label: "Budget", value: `${project.budget} €`, sub: project.package },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 60}>
          <Card className="p-4 md:p-5">
            <SectionLabel>{s.label}</SectionLabel>
            <div className="mt-2 text-xl md:text-2xl font-extrabold text-white/90 tracking-tight">{s.value}</div>
            <div className="mt-0.5 text-xs text-white/45">{s.sub}</div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

/* ─── NOTIFICATION TOAST ─────────────────────────────────────────────────────── */

const CLIENT_EMAIL = "kunde@example.com"; // ← Kunden-E-Mail hier eintragen

function NotificationToast({ sprint, project, onClose }) {
  if (!sprint) return null;

  const subject = encodeURIComponent(`${sprint.label} abgeschlossen – ${project.name}`);
  const body = encodeURIComponent(
`Hallo,

${sprint.label} – „${sprint.title}" ist abgeschlossen.

Du kannst dir den aktuellen Stand jederzeit im Projektdashboard ansehen.

Sobald du dir alles angeschaut hast, meld dich kurz – dann gehen wir in den nächsten Schritt.

Viele Grüße
Leon`
  );
  const mailHref = `mailto:${CLIENT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2.5rem)] max-w-md">
      <div className="rounded-2xl border border-emerald-300/30 bg-black/70 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-9 h-9 rounded-xl bg-emerald-500/25 border border-emerald-300/30 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6 11.5L13 5" stroke="rgb(110,231,183)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white/90">{sprint.label} abgeschlossen</div>
            <div className="text-xs text-white/55 mt-0.5 truncate">{sprint.title}</div>
            <div className="mt-3 flex gap-2">
              <a
                href={mailHref}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/30 border border-emerald-300/30 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/40 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                E-Mail öffnen
              </a>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-full border border-white/12 bg-white/6 text-xs text-white/50 hover:bg-white/10 transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN DASHBOARD ─────────────────────────────────────────────────────────── */

const STORAGE_KEY = "paveo_project_kunde1";

export default function ProjectDashboard() {
  const [project, setProject] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PROJECT;
    } catch {
      return INITIAL_PROJECT;
    }
  });
  const [editMode, setEditMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("sprints");
  const [notification, setNotification] = useState(null); // { sprint }

  // Persist to localStorage on every project change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(project)); } catch {}
  }, [project]);

  const recalcProgress = useCallback((sprints) => {
    const allTasks = sprints.flatMap((s) => s.tasks);
    const done = allTasks.filter((t) => t.status === "done").length;
    return Math.round((done / Math.max(1, allTasks.length)) * 100);
  }, []);

  const handleTaskToggle = useCallback((sprintId, taskId) => {
    setProject((prev) => {
      const sprints = prev.sprints.map((s) => {
        if (s.id !== sprintId) return s;
        const tasks = s.tasks.map((t) => {
          if (t.id !== taskId) return t;
          const next = t.status === "done" ? "open" : "done";
          return { ...t, status: next };
        });
        const doneCount = tasks.filter((t) => t.status === "done").length;
        return { ...s, tasks, progress: Math.round((doneCount / tasks.length) * 100) };
      });
      return { ...prev, sprints, overallProgress: recalcProgress(sprints) };
    });
  }, [recalcProgress]);

  const handleSprintStatus = useCallback((sprintId, status) => {
    setProject((prev) => {
      const sprint = prev.sprints.find((s) => s.id === sprintId);
      if (status === "done" && sprint?.status !== "done") {
        // Trigger notification after state update
        setTimeout(() => setNotification({ sprint: { ...sprint, status: "done" } }), 100);
      }
      return {
        ...prev,
        sprints: prev.sprints.map((s) => s.id === sprintId ? { ...s, status } : s),
      };
    });
  }, []);

  const handleMilestoneToggle = useCallback((milestoneId) => {
    setProject((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => m.id === milestoneId ? { ...m, done: !m.done } : m),
    }));
  }, []);

  const tabs = [
    { id: "sprints", label: "Sprints" },
    { id: "gantt", label: "Gantt" },
    { id: "milestones", label: "Meilensteine" },
    { id: "deadlines", label: "Deadlines" },
  ];

  return (
    <div className="font-sans text-white min-h-screen antialiased">
      <style>{keyframes}</style>

      <GlobalBg />
      <CursorHalo />
      <ScrollBar />

      <NotificationToast sprint={notification?.sprint} project={project} onClose={() => setNotification(null)} />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/25 border-b border-white/8">
        <div className="max-w-6xl mx-auto px-5 md:px-10 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-400 to-cyan-400 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1.5" fill="white"/>
                <rect x="8" y="1" width="5" height="5" rx="1.5" fill="white" opacity=".6"/>
                <rect x="1" y="8" width="5" height="5" rx="1.5" fill="white" opacity=".6"/>
                <rect x="8" y="8" width="5" height="5" rx="1.5" fill="white" opacity=".35"/>
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-white/90">{project.client}</span>
              <span className="mx-2 text-white/20 text-sm">/</span>
              <span className="text-sm text-white/55">{project.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditMode((e) => !e)}
              className={cx(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all",
                editMode
                  ? "border-violet-300/40 bg-violet-500/20 text-violet-200"
                  : "border-white/12 bg-white/6 text-white/60 hover:bg-white/10"
              )}
            >
              <span className={cx("w-1.5 h-1.5 rounded-full", editMode ? "bg-violet-400 animate-pulse" : "bg-white/30")} />
              {editMode ? "Bearbeiten aktiv" : "Bearbeiten"}
            </button>
            {editMode && (
              <button
                onClick={() => { setProject(INITIAL_PROJECT); try { localStorage.removeItem(STORAGE_KEY); } catch {} }}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/4 text-white/35 hover:bg-white/8 transition-colors"
                title="Daten zurücksetzen"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-12 space-y-8">
        {/* Overall progress bar */}
        <Reveal>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/55">Gesamtfortschritt</span>
              <span className="font-bold text-white/90">{project.overallProgress}%</span>
            </div>
            <ProgressBar value={project.overallProgress} height="h-2.5" />
          </div>
        </Reveal>

        {/* Stats */}
        <OverallStats project={project} />

        {/* Tab nav */}
        <Reveal delay={100}>
          <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 w-fit flex-wrap">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cx(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                  activeTab === t.id
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/45 hover:text-white/70"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tab: Sprints */}
        {activeTab === "sprints" && (
          <div className="space-y-4">
            <Reveal delay={80}>
              <FilterBar
                filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
              />
            </Reveal>
            {project.sprints.map((sprint, i) => (
              <SprintCard
                key={sprint.id}
                sprint={sprint}
                editMode={editMode}
                onTaskToggle={handleTaskToggle}
                onStatusChange={handleSprintStatus}
                filterStatus={filterStatus}
                />
            ))}
          </div>
        )}

        {/* Tab: Gantt */}
        {activeTab === "gantt" && (
          <Reveal>
            <Card className="p-5 md:p-7">
              <SectionLabel>Zeitplan</SectionLabel>
              <div className="mt-1 text-lg font-bold text-white/88 mb-6">{formatDate(project.startDate)} – {formatDate(project.deadline)}</div>
              <GanttChart
                sprints={project.sprints}
                projectStart={project.startDate}
                projectEnd={project.deadline}
              />
            </Card>
          </Reveal>
        )}

        {/* Tab: Milestones */}
        {activeTab === "milestones" && (
          <Reveal>
            <Card className="p-5 md:p-7">
              <SectionLabel>Meilensteine</SectionLabel>
              <div className="mt-1 text-lg font-bold text-white/88 mb-6">
                {editMode && <span className="text-xs text-violet-300 ml-2 font-normal">Klick zum Abhaken</span>}
              </div>
              <MilestoneTimeline
                milestones={project.milestones}
                editMode={editMode}
                onToggle={handleMilestoneToggle}
              />
            </Card>
          </Reveal>
        )}

        {/* Tab: Deadlines */}
        {activeTab === "deadlines" && (
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-5 md:p-6">
                <SectionLabel>Fristen</SectionLabel>
                <div className="mt-1 text-lg font-bold text-white/88 mb-4">Nächste Deadlines</div>
                <DeadlineWidget sprints={project.sprints} projectDeadline={project.deadline} />
              </Card>
              <Card className="p-5 md:p-6">
                <SectionLabel>Zahlungsziele</SectionLabel>
                <div className="mt-1 text-lg font-bold text-white/88 mb-4">Übersicht</div>
                <div className="space-y-3">
                  {project.sprints.filter((s) => s.payment).map((s) => (
                    <div key={s.id} className={cx(
                      "rounded-2xl border px-4 py-3 flex items-center justify-between gap-3",
                      s.status === "done" ? "border-emerald-300/20 bg-emerald-500/8" : "border-white/10 bg-white/4"
                    )}>
                      <div>
                        <div className="text-xs text-white/40">{s.label}</div>
                        <div className="text-sm text-white/80 font-semibold mt-0.5">{s.payment.label}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-extrabold text-white/88">{s.payment.amount} €</span>
                        <Badge status={s.status} />
                      </div>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-white/14 bg-white/6 px-4 py-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/75">Gesamt</span>
                    <span className="text-lg font-extrabold text-white/90">{project.budget} €</span>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        )}

        {/* Footer note */}
        <Reveal delay={200}>
          <div className="text-xs text-white/25 text-center pb-8">
            Leon Seitz · Projekt-Dashboard · <a href="https://leonseitz.com" className="underline underline-offset-2 hover:text-white/45 transition-colors">leonseitz.com</a>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

/* ─── KEYFRAMES ──────────────────────────────────────────────────────────────── */

const keyframes = `
@keyframes blob {
  0%   { transform: translate3d(0,0,0) scale(1); }
  35%  { transform: translate3d(40px,-30px,0) scale(1.08); }
  70%  { transform: translate3d(-30px,20px,0) scale(0.96); }
  100% { transform: translate3d(0,0,0) scale(1); }
}
@keyframes blob2 {
  0%   { transform: translate3d(0,0,0) scale(1); }
  40%  { transform: translate3d(-45px,35px,0) scale(1.06); }
  80%  { transform: translate3d(25px,-20px,0) scale(0.96); }
  100% { transform: translate3d(0,0,0) scale(1); }
}
@keyframes blob3 {
  0%   { transform: translate3d(0,0,0) scale(1); }
  45%  { transform: translate3d(35px,25px,0) scale(1.10); }
  85%  { transform: translate3d(-30px,-18px,0) scale(0.94); }
  100% { transform: translate3d(0,0,0) scale(1); }
}
@keyframes noiseMove {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
