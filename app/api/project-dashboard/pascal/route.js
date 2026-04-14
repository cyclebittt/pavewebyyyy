import { NextResponse } from "next/server";
import { put, get } from "@vercel/blob";

export const runtime = "nodejs";

const BLOB_PATH = "dashboards/pascal-dashboard.json";

const INITIAL_PROJECT = {
  client: "Pascal Hagelgans",
  name: "Angelo Landingpage",
  budget: 250,
  plannedHours: 5,
  hourlyRateExtra: 50,
  startDate: "2026-04-14",
  deadline: "2026-04-20",
  overallProgress: 0,
  phases: [
    {
      id: "p1",
      label: "Phase 1",
      title: "Design & Figma",
      status: "active",
      progress: 0,
      startDate: "2026-04-14",
      endDate: "2026-04-17",
      tasks: [
        { id: "t1", title: "Design festlegen & abstimmen", status: "open" },
        { id: "t2", title: "Design in Figma umsetzen", status: "open" },
        { id: "t3", title: "Mobile Ansicht kontrollieren", status: "open" },
      ],
    },
    {
      id: "p2",
      label: "Phase 2",
      title: "Feedback & Übergabe",
      status: "pending",
      progress: 0,
      startDate: "2026-04-18",
      endDate: "2026-04-20",
      tasks: [
        { id: "t4", title: "Feedback-Meeting", status: "open" },
        { id: "t5", title: "Korrekturen einarbeiten", status: "open" },
        { id: "t6", title: "Domain verknüpfen bzw. Code übergeben", status: "open" },
      ],
    },
  ],
  timeEntries: [
    {
      id: "time1",
      date: "2026-04-14",
      title: "Projektstart & Materialsichtung",
      duration: 0.5,
      note: "CI, Instagram-Inspiration und Projektumfang geprüft.",
    },
  ],
};

async function saveDashboard(data) {
  await put(BLOB_PATH, JSON.stringify(data, null, 2), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });
}

export async function GET() {
  try {
    const result = await get(BLOB_PATH, { access: "private" });

    if (!result || result.statusCode === 404) {
      await saveDashboard(INITIAL_PROJECT);
      return NextResponse.json(INITIAL_PROJECT);
    }

    const text = await result.text();
    const data = JSON.parse(text);

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    await saveDashboard(INITIAL_PROJECT);
    return NextResponse.json(INITIAL_PROJECT);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await saveDashboard(body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Dashboard konnte nicht gespeichert werden.",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
