'use client';

import { useState, useRef, useEffect, useCallback } from "react";

/* ─── TRANSLATIONS ───────────────────────────────────────────────────────────── */

const T = {
  de: {
    headerSub: "profiplanet.de",
    editOn: "Bearbeiten aktiv",
    editOff: "Bearbeiten",
    reset: "Reset",
    banner: { bold: "Messe Düsseldorf: 20.–22. März.", rest: " Produkte werden danach eingepflegt — Sprint 2 startet ab 23.03." },
    overall: "Gesamtfortschritt",
    stats: ["Fortschritt", "Aktiver Sprint", "Deadline", "Budget"],
    tasks: "Aufgaben",
    days: "Tage",
    tabs: ["Sprints", "Gantt", "Meilensteine", "Zahlungen"],
    today: "Heute",
    timeline: "Zeitplan",
    milestones: "Meilensteine",
    editHint: "Klick zum Abhaken",
    payments: "Zahlungsziele",
    overview: "Übersicht",
    total: "Gesamt",
    statusLabels: { done: "Erledigt", active: "Aktiv", "in-progress": "In Arbeit", pending: "Ausstehend", open: "Offen" },
    sprintStatuses: ["Erledigt", "Aktiv", "Ausstehend"],
    toastClose: "Schließen",
    toastMail: "E-Mail öffnen",
    footer: "Projekt-Dashboard",
    emailSubject: (label, name) => `${label} abgeschlossen – ${name}`,
    emailBody: (label, title) => `Hallo Oksana,\n\n${label} – „${title}" ist abgeschlossen.\n\nDu kannst den aktuellen Stand im Projektdashboard ansehen.\n\nViele Grüße,\nLeon`,
  },
  ru: {
    headerSub: "profiplanet.de",
    editOn: "Редактирование активно",
    editOff: "Редактировать",
    reset: "Сброс",
    banner: { bold: "Выставка Дюссельдорф: 20–22 марта.", rest: " Товары будут добавлены после — Спринт 2 начинается с 23.03." },
    overall: "Общий прогресс",
    stats: ["Прогресс", "Активный спринт", "Дедлайн", "Бюджет"],
    tasks: "задач",
    days: "дней",
    tabs: ["Спринты", "Диаграмма", "Этапы", "Платежи"],
    today: "Сегодня",
    timeline: "Расписание",
    milestones: "Контрольные точки",
    editHint: "Нажми чтобы отметить",
    payments: "Цели платежей",
    overview: "Обзор",
    total: "Итого",
    statusLabels: { done: "Готово", active: "Активно", "in-progress": "В работе", pending: "Ожидает", open: "Открыто" },
    sprintStatuses: ["Готово", "Активно", "Ожидает"],
    toastClose: "Закрыть",
    toastMail: "Открыть e-mail",
    footer: "Панель проекта",
    emailSubject: (label, name) => `${label} завершён – ${name}`,
    emailBody: (label, title) => `Привет, Оксана,\n\n${label} – «${title}» готов.\n\nПосмотри в панели проекта и напиши мне — идём дальше.\n\nС уважением,\nLeon`,
  },
};

/* ─── DATA ───────────────────────────────────────────────────────────────────── */

const INITIAL_PROJECT = {
  client: { de: "Oksana Hettinger", ru: "Оксана Хеттингер" },
  name: { de: "Shopify Online-Shop · profiplanet.de", ru: "Shopify интернет-магазин · profiplanet.de" },
  package: "Shopify Setup",
  budget: 450,
  startDate: "2026-03-04",
  deadline: "2026-04-12",
  overallProgress: 5,
  sprints: [
    {
      id: "s0",
      label: "Sprint 1",
      title: { de: "Setup & Design", ru: "Настройка и дизайн" },
      status: "active", progress: 10,
      startDate: "2026-03-04", endDate: "2026-03-08",
      payment: { de: "Цель оплаты 1 (30 %) — уже оплачено ✓", ru: "Цель оплаты 1 (30 %) — уже оплачено ✓", amount: 135 },
      tasks: [
        { id: "t1", title: { de: "Domain profiplanet.de mit Shopify verbinden", ru: "Подключить домен profiplanet.de к Shopify" }, status: "open" },
        { id: "t2", title: { de: "Shopify-Store anlegen & Grundkonfiguration", ru: "Создать Shopify-магазин и базовая настройка" }, status: "open" },
        { id: "t3", title: { de: "Farbschema + Typografie festlegen", ru: "Определить цветовую схему и типографику" }, status: "open" },
        { id: "t4", title: { de: "Startseite – Layout & Struktur", ru: "Главная страница — макет и структура" }, status: "open" },
        { id: "t5", title: { de: "Navigationsstruktur & Kategorien", ru: "Структура навигации и категории" }, status: "open" },
        { id: "t6", title: { de: "Mobile Ansicht prüfen", ru: "Проверить мобильную версию" }, status: "open" },
      ],
    },
    {
      id: "s1",
      label: "Sprint 2",
      title: { de: "Produkte & Inhalte", ru: "Товары и контент" },
      status: "pending", progress: 0,
      startDate: "2026-03-23", endDate: "2026-04-05",
      payment: { de: "Zahlungsziel 2 (50 %)", ru: "Цель оплаты 2 (50 %)", amount: 225 },
      tasks: [
        { id: "t7",  title: { de: "Erste Produkte einpflegen (nach Messe)", ru: "Добавить первые товары (после выставки)" }, status: "open" },
        { id: "t8",  title: { de: "Produktseiten-Template & Beschreibungen", ru: "Шаблон страниц товаров и описания" }, status: "open" },
        { id: "t9",  title: { de: "Instagram & TikTok verknüpfen", ru: "Подключить Instagram и TikTok" }, status: "open" },
        { id: "t10", title: { de: "Zahlungsmethoden aktivieren", ru: "Активировать способы оплаты" }, status: "open" },
        { id: "t11", title: { de: "Versandoptionen & Lieferzeiten einrichten", ru: "Настроить доставку и сроки" }, status: "open" },
      ],
    },
    {
      id: "s2",
      label: "Sprint 3",
      title: { de: "Go-Live & Übergabe", ru: "Запуск и передача" },
      status: "pending", progress: 0,
      startDate: "2026-04-06", endDate: "2026-04-12",
      payment: { de: "Zahlungsziel 3 (20 %)", ru: "Цель оплаты 3 (20 %)", amount: 90 },
      tasks: [
        { id: "t12", title: { de: "Go-Live auf profiplanet.de", ru: "Запуск на profiplanet.de" }, status: "open" },
        { id: "t13", title: { de: "Schulung: Produkte selbst einpflegen", ru: "Обучение: самостоятельное добавление товаров" }, status: "open" },
        { id: "t14", title: { de: "Zugänge & Dateien übergeben", ru: "Передача доступов и файлов" }, status: "open" },
      ],
    },
  ],
  milestones: [
    { id: "m1", label: { de: "Kickoff-Meeting & Domain verbunden",   ru: "Кикофф-встреча и домен подключён" },  date: "2026-03-04", done: false },
    { id: "m2", label: { de: "Shop-Design freigegeben",              ru: "Дизайн магазина одобрен" },            date: "2026-03-08", done: false },
    { id: "m3", label: { de: "Messe Düsseldorf (20.–22.03.)",        ru: "Выставка Дюссельдорф (20–22.03)" },    date: "2026-03-22", done: false },
    { id: "m4", label: { de: "Produkte live im Shop",                ru: "Товары опубликованы в магазине" },     date: "2026-04-05", done: false },
    { id: "m5", label: { de: "Go-Live profiplanet.de",               ru: "Запуск profiplanet.de" },              date: "2026-04-12", done: false },
  ],
};

const STORAGE_KEY  = "paveo_project_oksana_hettinger";
const CLIENT_EMAIL = "oksanahettinger@gmail.com";

/* ─── UTILS ──────────────────────────────────────────────────────────────────── */

function cx(...a) { return a.filter(Boolean).join(" "); }
function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
function formatDate(s) { return new Date(s).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }); }
function daysUntil(s) { return daysBetween(new Date().toISOString().slice(0, 10), s); }
function t(obj, lang) { return typeof obj === "object" && obj !== null && (obj.de || obj.ru) ? (obj[lang] ?? obj.de) : obj; }

/* ─── HOOKS ──────────────────────────────────────────────────────────────────── */

function useReveal(ref) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref?.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [ref]);
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

function useScrollPct() {
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

const BLOBS = [
  { cls: "bg-violet-500/16", x: "-20%", y: "-18%", s: "56rem", blur: 140, anim: "blob" },
  { cls: "bg-cyan-500/11",   x: "70%",  y: "10%",  s: "54rem", blur: 150, anim: "blob2" },
  { cls: "bg-fuchsia-500/9", x: "20%",  y: "80%",  s: "46rem", blur: 150, anim: "blob3" },
];

function GlobalBg() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#070312",
          backgroundImage:
            "radial-gradient(1200px 700px at 18% 18%,rgba(168,85,247,0.28),transparent 60%),radial-gradient(900px 700px at 82% 25%,rgba(56,189,248,0.14),transparent 55%),linear-gradient(135deg,#070312 0%,#0b0b1a 50%,#03040e 100%)"
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundSize: "220px",
          animation: "noiseMove 7s linear infinite"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,transparent_0%,rgba(0,0,0,0.38)_65%,rgba(0,0,0,0.70)_100%)]" />
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className={cx("absolute rounded-full", b.cls)}
          style={{
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            filter: `blur(${b.blur}px)`,
            animation: `${b.anim} ${10 + i * 2}s ease-in-out infinite`
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
          background: `radial-gradient(700px 500px at ${x}px ${y}px,rgba(255,255,255,0.04),transparent 70%)`,
          filter: "blur(16px)",
          opacity: 0.55,
          mixBlendMode: "screen",
          transition: "background 80ms linear"
        }}
      />
    </div>
  );
}

function ScrollBar() {
  const p = useScrollPct();
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

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  return (
    <div
      ref={ref}
      className={cx(
        "transition-all duration-700 will-change-transform",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Card({ children, className = "", glow = false }) {
  return (
    <div className={cx("relative rounded-3xl border border-white/14 bg-black/20 backdrop-blur-md overflow-hidden", glow && "ring-1 ring-inset ring-violet-300/20", className)}>
      {glow && (
        <div
          className="pointer-events-none absolute -inset-px blur-2xl opacity-40"
          style={{ background: "radial-gradient(60% 80% at 25% 0%,rgba(168,85,247,0.12),transparent 60%)" }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

function Badge({ status, lang }) {
  const SM = {
    done:          { color: "text-emerald-300", bg: "bg-emerald-500/15 border-emerald-300/25", dot: "bg-emerald-400" },
    active:        { color: "text-violet-300",  bg: "bg-violet-500/15 border-violet-300/25",  dot: "bg-violet-400 animate-pulse" },
    "in-progress": { color: "text-cyan-300",    bg: "bg-cyan-500/15 border-cyan-300/25",      dot: "bg-cyan-400" },
    pending:       { color: "text-white/50",    bg: "bg-white/5 border-white/10",             dot: "bg-white/30" },
    open:          { color: "text-white/50",    bg: "bg-white/5 border-white/10",             dot: "bg-white/25" },
  };
  const m = SM[status] ?? SM.open;
  const label = T[lang].statusLabels[status] ?? status;
  return (
    <span className={cx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", m.bg, m.color)}>
      <span className={cx("w-1.5 h-1.5 rounded-full shrink-0", m.dot)} />
      {label}
    </span>
  );
}

function ProgressBar({ value, color = "from-violet-400 to-cyan-400", h = "h-2" }) {
  return (
    <div className={cx("w-full rounded-full bg-white/10 overflow-hidden", h)}>
      <div
        className={cx("h-full rounded-full bg-gradient-to-r transition-all duration-700", color)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function SLabel({ children }) {
  return <div className="text-[11px] uppercase tracking-widest text-white/45 font-semibold">{children}</div>;
}

/* ─── GANTT ──────────────────────────────────────────────────────────────────── */

function GanttChart({ sprints, start, end, lang }) {
  const total = daysBetween(start, end) || 1;
  const today = new Date().toISOString().slice(0, 10);
  const tPct  = Math.max(0, Math.min(100, (daysBetween(start, today) / total) * 100));
  const bc = {
    done: "bg-gradient-to-r from-emerald-500/60 to-emerald-400/50 border-emerald-300/30",
    active: "bg-gradient-to-r from-violet-500/70 to-cyan-500/60 border-violet-300/40",
    pending: "bg-gradient-to-r from-white/8 to-white/5 border-white/10"
  };
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[460px]">
        <div className="flex items-center mb-3 pl-28">
          {[0,25,50,75,100].map(p => {
            const d = new Date(new Date(start).getTime() + (p/100) * total * 86400000);
            return (
              <div key={p} className="flex-1 text-[10px] text-white/30 text-center">
                {formatDate(d.toISOString().slice(0,10))}
              </div>
            );
          })}
        </div>
        <div className="relative space-y-2">
          <div
            className="absolute top-0 bottom-0 w-px bg-violet-400/60 z-10"
            style={{ left: `calc(7rem + ${tPct}% * (100% - 7rem) / 100)` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] text-violet-300 whitespace-nowrap">
              {T[lang].today}
            </div>
          </div>
          {sprints.map(s => {
            const left = Math.max(0, (daysBetween(start, s.startDate) / total) * 100);
            const width = Math.max(2, (daysBetween(s.startDate, s.endDate) / total) * 100);
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-24 shrink-0 text-xs text-white/60 text-right pr-2 truncate">{s.label}</div>
                <div className="flex-1 relative h-8">
                  <div className="absolute inset-0 rounded-full bg-white/5 border border-white/8" />
                  <div
                    className={cx("absolute top-1 bottom-1 rounded-full border", bc[s.status] ?? bc.pending)}
                    style={{ left: `${left}%`, width: `${width}%`, minWidth: "2rem" }}
                  >
                    {s.progress > 0 && (
                      <div className="h-full rounded-full bg-white/20" style={{ width: `${s.progress}%` }} />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-white/80 truncate px-2">{t(s.title, lang)}</span>
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

/* ─── MILESTONES ─────────────────────────────────────────────────────────────── */

function Milestones({ milestones, editMode, onToggle, lang }) {
  return (
    <div className="relative">
      <div className="absolute left-[18px] top-5 bottom-5 w-px bg-gradient-to-b from-violet-400/40 via-cyan-400/25 to-white/10" />
      <div className="space-y-3">
        {milestones.map(m => {
          const days = daysUntil(m.date);
          const past = days < 0;
          return (
            <div key={m.id} className="relative flex items-start gap-4">
              <button
                onClick={() => editMode && onToggle(m.id)}
                disabled={!editMode}
                className={cx(
                  "relative z-10 shrink-0 w-9 h-9 rounded-2xl border flex items-center justify-center transition-all",
                  m.done ? "border-emerald-300/40 bg-emerald-500/20" : past ? "border-amber-300/25 bg-amber-500/10" : "border-white/14 bg-white/7",
                  editMode && "cursor-pointer hover:scale-110"
                )}
              >
                {m.done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="rgb(110,231,183)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className={cx("w-2 h-2 rounded-full", past ? "bg-amber-400" : "bg-white/25")} />
                )}
              </button>

              <div className={cx("flex-1 rounded-2xl border px-4 py-3", m.done ? "border-emerald-300/18 bg-emerald-500/6" : "border-white/9 bg-white/4")}>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={cx("text-sm font-semibold", m.done ? "text-white/50 line-through" : "text-white/88")}>{t(m.label, lang)}</span>
                  <span className={cx("text-xs", m.done ? "text-white/35" : past ? "text-amber-300/80" : "text-white/45")}>
                    {formatDate(m.date)}
                    {!m.done && !past && days <= 7 && <span className="text-amber-300"> · {days}d</span>}
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

/* ─── SPRINT CARD ────────────────────────────────────────────────────────────── */

function SprintCard({ sprint, editMode, onTaskToggle, onStatusChange, lang }) {
  const [collapsed, setCollapsed] = useState(sprint.status !== "active");
  const doneCount = sprint.tasks.filter(tk => tk.status === "done").length;
  const tr = T[lang];

  return (
    <Reveal>
      <Card glow={sprint.status === "active"} className="overflow-hidden">
        <div className="p-5 md:p-6 cursor-pointer select-none" onClick={() => setCollapsed(c => !c)}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge status={sprint.status} lang={lang} />
              <span className="text-xs text-white/40">{sprint.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {sprint.payment && (
                <span className="text-xs text-white/45 bg-white/6 border border-white/10 rounded-full px-2.5 py-1">
                  {t(sprint.payment, lang)} · {sprint.payment.amount} €
                </span>
              )}
              <div className={cx("w-6 h-6 rounded-lg flex items-center justify-center border border-white/12 bg-white/6 transition-transform duration-300", !collapsed && "rotate-180")}>
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-base md:text-lg font-bold text-white/90">{t(sprint.title, lang)}</div>
            <div className="mt-2 flex items-center gap-3">
              <ProgressBar
                value={sprint.progress}
                h="h-1.5"
                color={
                  sprint.status === "done"
                    ? "from-emerald-400 to-emerald-300"
                    : sprint.status === "active"
                    ? "from-violet-400 to-cyan-400"
                    : "from-white/20 to-white/10"
                }
              />
              <span className="text-xs text-white/45 shrink-0">{sprint.progress}%</span>
            </div>
            <div className="mt-1 text-xs text-white/35">
              {formatDate(sprint.startDate)} – {formatDate(sprint.endDate)} · {doneCount}/{sprint.tasks.length} {tr.tasks}
            </div>
          </div>
        </div>

        {!collapsed && (
          <div className="border-t border-white/8 px-5 md:px-6 pb-5 pt-4">
            {editMode && (
              <div className="mb-4 flex flex-wrap gap-2">
                {["done", "active", "pending"].map((s, i) => (
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
                    {tr.sprintStatuses[i]}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {sprint.tasks.map(task => (
                <div
                  key={task.id}
                  className={cx(
                    "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all",
                    task.status === "done" ? "border-emerald-300/15 bg-emerald-500/6" : "border-white/9 bg-white/4"
                  )}
                >
                  <button
                    onClick={() => editMode && onTaskToggle(sprint.id, task.id)}
                    disabled={!editMode}
                    className={cx(
                      "shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                      task.status === "done" ? "border-emerald-300/50 bg-emerald-500/25" : "border-white/20 bg-white/5",
                      editMode && "cursor-pointer hover:scale-110"
                    )}
                  >
                    {task.status === "done" && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.5L4 7.5L8.5 3" stroke="rgb(110,231,183)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>

                  <span className={cx("flex-1 text-sm", task.status === "done" ? "text-white/40 line-through" : "text-white/80")}>
                    {t(task.title, lang)}
                  </span>

                  <Badge status={task.status} lang={lang} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </Reveal>
  );
}

/* ─── TOAST ──────────────────────────────────────────────────────────────────── */

function Toast({ sprint, project, onClose, lang }) {
  if (!sprint) return null;
  const tr = T[lang];
  const name = t(project.name, lang);
  const title = t(sprint.title, lang);
  const subject = encodeURIComponent(tr.emailSubject(sprint.label, name));
  const body    = encodeURIComponent(tr.emailBody(sprint.label, title));

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
            <div className="text-sm font-semibold text-white/90">{sprint.label} {lang === "de" ? "abgeschlossen" : "завершён"}</div>
            <div className="text-xs text-white/55 mt-0.5">{title}</div>
            <div className="mt-3 flex gap-2">
              <a
                href={`mailto:${CLIENT_EMAIL}?subject=${subject}&body=${body}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/30 border border-emerald-300/30 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/40 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                {tr.toastMail}
              </a>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-full border border-white/12 bg-white/6 text-xs text-white/50 hover:bg-white/10 transition-colors"
              >
                {tr.toastClose}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────────── */

export default function OksanaHettingerPage() {
  // FIX: initial ohne localStorage (SSR-safe), load in useEffect
  const [project, setProject] = useState(INITIAL_PROJECT);

  const [editMode,  setEditMode]  = useState(false);
  const [activeTab, setActiveTab] = useState("sprints");
  const [toast,     setToast]     = useState(null);
  const [lang,      setLang]      = useState("de");

  // Load from localStorage on mount (client only)
  useEffect(() => {
    try {
      const s = window.localStorage.getItem(STORAGE_KEY);
      if (s) setProject(JSON.parse(s));
    } catch {}
  }, []);

  // Persist changes
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(project)); } catch {}
  }, [project]);

  const recalc = useCallback((sprints) => {
    const all = sprints.flatMap(s => s.tasks);
    return Math.round((all.filter(tk => tk.status === "done").length / Math.max(1, all.length)) * 100);
  }, []);

  const handleTaskToggle = useCallback((sprintId, taskId) => {
    setProject(prev => {
      const sprints = prev.sprints.map(s => {
        if (s.id !== sprintId) return s;
        const tasks = s.tasks.map(tk => tk.id !== taskId ? tk : { ...tk, status: tk.status === "done" ? "open" : "done" });
        return { ...s, tasks, progress: Math.round((tasks.filter(tk => tk.status === "done").length / tasks.length) * 100) };
      });
      return { ...prev, sprints, overallProgress: recalc(sprints) };
    });
  }, [recalc]);

  const handleSprintStatus = useCallback((sprintId, status) => {
    setProject(prev => {
      const sprint = prev.sprints.find(s => s.id === sprintId);
      if (status === "done" && sprint?.status !== "done") {
        setTimeout(() => setToast({ ...sprint, status: "done" }), 100);
      }
      return { ...prev, sprints: prev.sprints.map(s => s.id === sprintId ? { ...s, status } : s) };
    });
  }, []);

  const handleMilestone = useCallback((id) => {
    setProject(prev => ({ ...prev, milestones: prev.milestones.map(m => m.id === id ? { ...m, done: !m.done } : m) }));
  }, []);

  const tr         = T[lang];
  const allTasks   = project.sprints.flatMap(s => s.tasks);
  const doneTasks  = allTasks.filter(tk => tk.status === "done").length;
  const activeSpr  = project.sprints.find(s => s.status === "active");

  return (
    <div className="font-sans text-white min-h-screen antialiased">
      <style>{`
        @keyframes blob{0%{transform:translate3d(0,0,0) scale(1)}35%{transform:translate3d(40px,-30px,0) scale(1.08)}70%{transform:translate3d(-30px,20px,0) scale(0.96)}100%{transform:translate3d(0,0,0) scale(1)}}
        @keyframes blob2{0%{transform:translate3d(0,0,0) scale(1)}40%{transform:translate3d(-45px,35px,0) scale(1.06)}80%{transform:translate3d(25px,-20px,0) scale(0.96)}100%{transform:translate3d(0,0,0) scale(1)}}
        @keyframes blob3{0%{transform:translate3d(0,0,0) scale(1)}45%{transform:translate3d(35px,25px,0) scale(1.10)}85%{transform:translate3d(-30px,-18px,0) scale(0.94)}100%{transform:translate3d(0,0,0) scale(1)}}
        @keyframes noiseMove{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(90px,60px,0)}}
      `}</style>

      <GlobalBg />
      <CursorHalo />
      <ScrollBar />

      <Toast sprint={toast} project={project} onClose={() => setToast(null)} lang={lang} />

      {/* HEADER */}
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
              <span className="text-sm font-bold text-white/90">{t(project.client, lang)}</span>
              <span className="mx-2 text-white/20 text-sm">/</span>
              <span className="text-sm text-white/55">{tr.headerSub}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLang(l => l === "de" ? "ru" : "de")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-white/15 bg-white/6 text-white/70 hover:bg-white/12 transition-all"
              title="Sprache wechseln / Сменить язык"
            >
              <span className={cx("transition-all", lang === "de" ? "text-white" : "text-white/35")}>DE</span>
              <span className="text-white/25">·</span>
              <span className={cx("transition-all", lang === "ru" ? "text-white" : "text-white/35")}>RU</span>
            </button>

            <button
              onClick={() => setEditMode(e => !e)}
              className={cx(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all",
                editMode ? "border-violet-300/40 bg-violet-500/20 text-violet-200" : "border-white/12 bg-white/6 text-white/60 hover:bg-white/10"
              )}
            >
              <span className={cx("w-1.5 h-1.5 rounded-full", editMode ? "bg-violet-400 animate-pulse" : "bg-white/30")} />
              {editMode ? tr.editOn : tr.editOff}
            </button>

            {editMode && (
              <button
                onClick={() => {
                  setProject(INITIAL_PROJECT);
                  try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
                }}
                className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/4 text-white/35 hover:bg-white/8 transition-colors"
              >
                {tr.reset}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-12 space-y-8">

        <Reveal>
          <div className="rounded-2xl border border-amber-300/20 bg-amber-500/8 px-5 py-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <p className="text-sm text-white/75">
              <span className="font-semibold text-white/90">{tr.banner.bold}</span>
              {tr.banner.rest}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/55">{tr.overall}</span>
              <span className="font-bold text-white/90">{project.overallProgress}%</span>
            </div>
            <ProgressBar value={project.overallProgress} h="h-2.5" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: tr.stats[0], value: `${project.overallProgress}%`, sub: `${doneTasks}/${allTasks.length} ${tr.tasks}` },
            { label: tr.stats[1], value: activeSpr?.label ?? "–",      sub: t(activeSpr?.title, lang) ?? "–" },
            { label: tr.stats[2], value: formatDate(project.deadline), sub: `${daysUntil(project.deadline)} ${tr.days}` },
            { label: tr.stats[3], value: `${project.budget} €`,        sub: project.package },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <Card className="p-4 md:p-5">
                <SLabel>{s.label}</SLabel>
                <div className="mt-2 text-xl md:text-2xl font-extrabold text-white/90 tracking-tight">{s.value}</div>
                <div className="mt-0.5 text-xs text-white/45">{s.sub}</div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 w-fit flex-wrap">
            {tr.tabs.map((label, i) => {
              const ids = ["sprints","gantt","milestones","payments"];
              return (
                <button
                  key={ids[i]}
                  onClick={() => setActiveTab(ids[i])}
                  className={cx(
                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                    activeTab === ids[i] ? "bg-white/15 text-white shadow-sm" : "text-white/45 hover:text-white/70"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {activeTab === "sprints" && (
          <div className="space-y-4">
            {project.sprints.map(s => (
              <SprintCard
                key={s.id}
                sprint={s}
                editMode={editMode}
                onTaskToggle={handleTaskToggle}
                onStatusChange={handleSprintStatus}
                lang={lang}
              />
            ))}
          </div>
        )}

        {activeTab === "gantt" && (
          <Reveal>
            <Card className="p-5 md:p-7">
              <SLabel>{tr.timeline}</SLabel>
              <div className="mt-1 text-lg font-bold text-white/88 mb-6">
                {formatDate(project.startDate)} – {formatDate(project.deadline)}
              </div>
              <GanttChart sprints={project.sprints} start={project.startDate} end={project.deadline} lang={lang} />
            </Card>
          </Reveal>
        )}

        {activeTab === "milestones" && (
          <Reveal>
            <Card className="p-5 md:p-7">
              <SLabel>{tr.milestones}</SLabel>
              <div className="mt-1 text-lg font-bold text-white/88 mb-6">
                {editMode && <span className="text-xs text-violet-300 font-normal ml-2">{tr.editHint}</span>}
              </div>
              <Milestones milestones={project.milestones} editMode={editMode} onToggle={handleMilestone} lang={lang} />
            </Card>
          </Reveal>
        )}

        {activeTab === "payments" && (
          <Reveal>
            <Card className="p-5 md:p-7">
              <SLabel>{tr.payments}</SLabel>
              <div className="mt-1 text-lg font-bold text-white/88 mb-6">{tr.overview}</div>

              <div className="space-y-3">
                {project.sprints.filter(s => s.payment).map(s => (
                  <div
                    key={s.id}
                    className={cx(
                      "rounded-2xl border px-4 py-4 flex items-center justify-between gap-3",
                      s.status === "done" ? "border-emerald-300/20 bg-emerald-500/8"
                        : s.id === "s0"    ? "border-amber-300/20 bg-amber-500/8"
                        : "border-white/10 bg-white/4"
                    )}
                  >
                    <div>
                      <div className="text-xs text-white/40">{s.label}</div>
                      <div className="text-sm text-white/80 font-semibold mt-0.5">{t(s.payment, lang)}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-extrabold text-white/90">{s.payment.amount} €</span>
                      <Badge status={s.status} lang={lang} />
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl border border-white/14 bg-white/6 px-4 py-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/75">{tr.total}</span>
                  <span className="text-lg font-extrabold text-white/90">{project.budget} €</span>
                </div>
              </div>
            </Card>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className="text-xs text-white/25 text-center pb-8">
            Leon Seitz · {tr.footer} ·{" "}
            <a href="https://leonseitz.com" className="underline underline-offset-2 hover:text-white/45 transition-colors">
              leonseitz.com
            </a>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
