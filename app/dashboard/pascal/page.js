"use client";

import { useEffect, useState } from "react";

const B = {
  yellow: "#E8A800",
  ocker: "#C68F00",
  black: "#0E0C08",
  cream: "#F5F2EB",
  dark: "#2A2720",
};

function formatDate(str) {
  return new Date(str).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
  });
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function daysUntil(str) {
  return daysBetween(new Date().toISOString().slice(0, 10), str);
}

function Card({ children, highlight = false }) {
  return (
    <div
      style={{
        borderRadius: 20,
        border: highlight
          ? "1px solid rgba(232,168,0,0.28)"
          : "1px solid rgba(245,242,235,0.08)",
        background: highlight ? "rgba(232,168,0,0.06)" : B.dark,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function Badge({ status }) {
  const label =
    status === "done"
      ? "Erledigt"
      : status === "active"
      ? "Aktiv"
      : status === "pending"
      ? "Ausstehend"
      : "Offen";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 10px",
        borderRadius: 100,
        fontSize: 11,
        fontWeight: 800,
        background:
          status === "done" || status === "active"
            ? "rgba(232,168,0,0.13)"
            : "rgba(245,242,235,0.06)",
        border:
          status === "done" || status === "active"
            ? "1px solid rgba(232,168,0,0.28)"
            : "1px solid rgba(245,242,235,0.10)",
        color:
          status === "done" || status === "active"
            ? B.yellow
            : "rgba(245,242,235,0.42)",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background:
            status === "done" || status === "active"
              ? B.yellow
              : "rgba(245,242,235,0.25)",
        }}
      />
      {label}
    </span>
  );
}

function ProgressBar({ value }) {
  return (
    <div
      style={{
        width: "100%",
        height: 7,
        borderRadius: 100,
        background: "rgba(245,242,235,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          height: "100%",
          background: B.yellow,
          borderRadius: 100,
          transition: "width .4s ease",
        }}
      />
    </div>
  );
}

export default function PascalDashboard() {
  const [project, setProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadProject() {
    const res = await fetch("/api/project-dashboard/pascal", {
      cache: "no-store",
    });

    const data = await res.json();
    setProject(data);
  }

  async function saveProject(nextProject) {
    setProject(nextProject);
    setSaving(true);

    await fetch("/api/project-dashboard/pascal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nextProject),
    });

    setSaving(false);
  }

  useEffect(() => {
    loadProject();
  }, []);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: B.black,
          color: B.cream,
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Dashboard wird geladen...
      </div>
    );
  }

  const allTasks = project.phases.flatMap((p) => p.tasks);
  const doneTasks = allTasks.filter((t) => t.status === "done").length;
  const overallProgress = Math.round((doneTasks / allTasks.length) * 100);

  const totalHours = project.timeEntries.reduce(
    (sum, entry) => sum + Number(entry.duration || 0),
    0
  );

  function toggleTask(phaseId, taskId) {
    const nextPhases = project.phases.map((phase) => {
      if (phase.id !== phaseId) return phase;

      const nextTasks = phase.tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "done" ? "open" : "done" }
          : task
      );

      const done = nextTasks.filter((t) => t.status === "done").length;

      return {
        ...phase,
        tasks: nextTasks,
        progress: Math.round((done / nextTasks.length) * 100),
      };
    });

    const all = nextPhases.flatMap((p) => p.tasks);
    const done = all.filter((t) => t.status === "done").length;

    saveProject({
      ...project,
      phases: nextPhases,
      overallProgress: Math.round((done / all.length) * 100),
    });
  }

  function setPhaseStatus(phaseId, status) {
    saveProject({
      ...project,
      phases: project.phases.map((phase) =>
        phase.id === phaseId ? { ...phase, status } : phase
      ),
    });
  }

  function addTimeEntry() {
    const title = prompt("Was wurde gemacht?");
    if (!title) return;

    const duration = Number(prompt("Wie viele Stunden? Beispiel: 1.5"));
    if (!duration) return;

    const note = prompt("Kurze Notiz, optional") || "";

    saveProject({
      ...project,
      timeEntries: [
        ...project.timeEntries,
        {
          id: `time-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          title,
          duration,
          note,
        },
      ],
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: B.black,
        color: B.cream,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        button { font-family: inherit; }
      `}</style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(14,12,8,0.82)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(245,242,235,0.08)",
        }}
      >
        <div style={{ height: 3, background: B.yellow }} />

        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: "rgba(245,242,235,0.45)" }}>
              Leon Seitz / {project.client}
            </div>
            <div style={{ fontSize: 15, fontWeight: 900 }}>
              {project.name}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setEditMode(!editMode)}
              style={{
                border: "1px solid rgba(232,168,0,0.32)",
                background: editMode ? B.yellow : "rgba(232,168,0,0.08)",
                color: editMode ? B.black : B.yellow,
                padding: "7px 14px",
                borderRadius: 999,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {editMode ? "Bearbeiten aktiv" : "Bearbeiten"}
            </button>

            {saving && (
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(245,242,235,0.4)",
                  alignSelf: "center",
                }}
              >
                speichert...
              </div>
            )}
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "34px 20px 70px",
        }}
      >
        <section style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              padding: "5px 12px",
              borderRadius: 999,
              background: "rgba(232,168,0,0.08)",
              border: "1px solid rgba(232,168,0,0.22)",
              color: B.yellow,
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Projekt-Dashboard
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(30px, 5vw, 52px)",
              lineHeight: 1,
              letterSpacing: "-0.055em",
            }}
          >
            Angelo Landingpage
          </h1>

          <p
            style={{
              maxWidth: 650,
              marginTop: 14,
              color: "rgba(245,242,235,0.54)",
              lineHeight: 1.7,
              fontSize: 14,
            }}
          >
            Übersicht für Designabstimmung, Figma-Umsetzung, mobile Kontrolle,
            Feedback und Übergabe. Projektpreis: 250 €. Mehraufwand nur nach
            vorheriger transparenter Absprache mit 50 €/h.
          </p>
        </section>

        <section style={{ marginBottom: 22 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              fontSize: 13,
            }}
          >
            <span style={{ color: "rgba(245,242,235,0.52)" }}>
              Gesamtfortschritt
            </span>
            <strong>{overallProgress}%</strong>
          </div>

          <ProgressBar value={overallProgress} />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 26,
          }}
        >
          {[
            {
              label: "Aufgaben",
              value: `${doneTasks}/${allTasks.length}`,
              sub: "erledigt",
            },
            {
              label: "Zeit",
              value: `${totalHours.toFixed(1)}h`,
              sub: `von ca. ${project.plannedHours}h geplant`,
            },
            {
              label: "Übergabe",
              value: formatDate(project.deadline),
              sub: `${daysUntil(project.deadline)} Tage`,
            },
            {
              label: "Preis",
              value: `${project.budget} €`,
              sub: "vereinbart",
            },
          ].map((item) => (
            <Card key={item.label}>
              <div style={{ padding: 18 }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(245,242,235,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </div>

                <div
                  style={{
                    fontSize: 25,
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {item.value}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(245,242,235,0.38)",
                    marginTop: 2,
                  }}
                >
                  {item.sub}
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>Phasen</h2>

          <div style={{ display: "grid", gap: 14 }}>
            {project.phases.map((phase) => (
              <Card key={phase.id} highlight={phase.status === "active"}>
                {phase.status === "active" && (
                  <div style={{ height: 3, background: B.yellow }} />
                )}

                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      flexWrap: "wrap",
                      marginBottom: 14,
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                        <Badge status={phase.status} />
                        <span
                          style={{
                            fontSize: 11,
                            color: "rgba(245,242,235,0.35)",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: ".08em",
                            alignSelf: "center",
                          }}
                        >
                          {phase.label}
                        </span>
                      </div>

                      <h3 style={{ margin: 0, fontSize: 17 }}>
                        {phase.title}
                      </h3>

                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 12,
                          color: "rgba(245,242,235,0.35)",
                        }}
                      >
                        {formatDate(phase.startDate)} –{" "}
                        {formatDate(phase.endDate)}
                      </div>
                    </div>

                    {editMode && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {["active", "pending", "done"].map((status) => (
                          <button
                            key={status}
                            onClick={() => setPhaseStatus(phase.id, status)}
                            style={{
                              border:
                                phase.status === status
                                  ? `1px solid ${B.yellow}`
                                  : "1px solid rgba(245,242,235,0.12)",
                              background:
                                phase.status === status
                                  ? "rgba(232,168,0,0.12)"
                                  : "rgba(245,242,235,0.04)",
                              color:
                                phase.status === status
                                  ? B.yellow
                                  : "rgba(245,242,235,0.45)",
                              padding: "5px 10px",
                              borderRadius: 999,
                              cursor: "pointer",
                              fontSize: 11,
                            }}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <ProgressBar value={phase.progress} />

                  <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
                    {phase.tasks.map((task) => {
                      const done = task.status === "done";

                      return (
                        <div
                          key={task.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "11px 13px",
                            borderRadius: 13,
                            border: done
                              ? "1px solid rgba(232,168,0,0.16)"
                              : "1px solid rgba(245,242,235,0.08)",
                            background: done
                              ? "rgba(232,168,0,0.06)"
                              : "rgba(245,242,235,0.04)",
                          }}
                        >
                          <button
                            disabled={!editMode}
                            onClick={() => toggleTask(phase.id, task.id)}
                            style={{
                              width: 21,
                              height: 21,
                              borderRadius: 7,
                              border: done
                                ? `1.5px solid ${B.yellow}`
                                : "1.5px solid rgba(245,242,235,0.22)",
                              background: done
                                ? "rgba(232,168,0,0.17)"
                                : "transparent",
                              cursor: editMode ? "pointer" : "default",
                              color: B.yellow,
                              fontWeight: 900,
                            }}
                          >
                            {done ? "✓" : ""}
                          </button>

                          <span
                            style={{
                              flex: 1,
                              fontSize: 13,
                              color: done
                                ? "rgba(245,242,235,0.38)"
                                : "rgba(245,242,235,0.78)",
                              textDecoration: done ? "line-through" : "none",
                            }}
                          >
                            {task.title}
                          </span>

                          <Badge status={task.status} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 26 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <h2 style={{ fontSize: 18, margin: 0 }}>Zeiterfassung</h2>

            {editMode && (
              <button
                onClick={addTimeEntry}
                style={{
                  border: "1px solid rgba(232,168,0,0.30)",
                  background: "rgba(232,168,0,0.10)",
                  color: B.yellow,
                  padding: "7px 13px",
                  borderRadius: 999,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Zeit hinzufügen
              </button>
            )}
          </div>

          <Card>
            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    padding: 16,
                    borderRadius: 16,
                    background: "rgba(232,168,0,0.07)",
                    border: "1px solid rgba(232,168,0,0.18)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(245,242,235,0.35)",
                      marginBottom: 6,
                    }}
                  >
                    Bisher gearbeitet
                  </div>

                  <div
                    style={{
                      fontSize: 30,
                      fontWeight: 900,
                      color: B.yellow,
                    }}
                  >
                    {totalHours.toFixed(1)}h
                  </div>
                </div>

                <div
                  style={{
                    padding: 16,
                    borderRadius: 16,
                    background: "rgba(245,242,235,0.04)",
                    border: "1px solid rgba(245,242,235,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(245,242,235,0.35)",
                      marginBottom: 6,
                    }}
                  >
                    Geplant
                  </div>

                  <div style={{ fontSize: 30, fontWeight: 900 }}>
                    {project.plannedHours}h
                  </div>
                </div>

                <div
                  style={{
                    padding: 16,
                    borderRadius: 16,
                    background: "rgba(245,242,235,0.04)",
                    border: "1px solid rgba(245,242,235,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(245,242,235,0.35)",
                      marginBottom: 6,
                    }}
                  >
                    Mehraufwand
                  </div>

                  <div style={{ fontSize: 14, fontWeight: 900 }}>
                    nur nach Absprache
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: "rgba(245,242,235,0.40)",
                    }}
                  >
                    {project.hourlyRateExtra} €/h
                  </div>
                </div>
              </div>

              <ProgressBar
                value={Math.round((totalHours / project.plannedHours) * 100)}
              />

              <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                {project.timeEntries.map((entry) => (
                  <div
                    key={entry.id}
                    style={{
                      padding: "13px 15px",
                      borderRadius: 15,
                      border: "1px solid rgba(245,242,235,0.08)",
                      background: "rgba(245,242,235,0.04)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 900, fontSize: 13 }}>
                          {entry.title}
                        </div>

                        <div
                          style={{
                            fontSize: 11,
                            color: "rgba(245,242,235,0.35)",
                            marginTop: 3,
                          }}
                        >
                          {formatDate(entry.date)}
                        </div>
                      </div>

                      <div
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: "rgba(232,168,0,0.10)",
                          border: "1px solid rgba(232,168,0,0.20)",
                          color: B.yellow,
                          fontSize: 12,
                          fontWeight: 900,
                        }}
                      >
                        {Number(entry.duration).toFixed(1)}h
                      </div>
                    </div>

                    {entry.note && (
                      <div
                        style={{
                          marginTop: 8,
                          color: "rgba(245,242,235,0.48)",
                          fontSize: 12,
                          lineHeight: 1.6,
                        }}
                      >
                        {entry.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>Preis & Hinweis</h2>

          <Card>
            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(245,242,235,0.35)",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                      marginBottom: 5,
                    }}
                  >
                    Vereinbarter Projektpreis
                  </div>

                  <div style={{ fontSize: 15, fontWeight: 900 }}>
                    Landingpage Design & Development
                  </div>

                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "rgba(245,242,235,0.50)",
                    }}
                  >
                    Falls der Aufwand deutlich über die geplanten ca. 5 Stunden
                    hinausgeht, wird das vorher transparent abgestimmt.
                  </p>
                </div>

                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: B.yellow,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {project.budget} €
                </div>
              </div>
            </div>
          </Card>
        </section>

        <footer
          style={{
            marginTop: 60,
            textAlign: "center",
            fontSize: 11,
            color: "rgba(245,242,235,0.25)",
          }}
        >
          Leon Seitz · Projekt-Dashboard · leonseitz.com
        </footer>
      </main>
    </div>
  );
}
