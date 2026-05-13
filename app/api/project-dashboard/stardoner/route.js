import { NextResponse } from "next/server";
import { put, get } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BLOB_PATH = "dashboards/stardoner-dashboard.json";

const INITIAL_PROJECT = {
  client: "Star Döner",
  contact: "Ertan Sahin",
  name: "Sprint 01 – Digitale Präsenz",
  budget: 680,
  plannedHours: 15,
  hourlyRateExtra: 50,
  startDate: "2026-04-24",
  deadline: "2026-05-31",
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

export async function GET() {
  try {
    const blob = await get(BLOB_PATH);

    if (!blob) return NextResponse.json(INITIAL_PROJECT);

    const res = await fetch(blob.url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(INITIAL_PROJECT);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await put(BLOB_PATH, JSON.stringify(body), {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
