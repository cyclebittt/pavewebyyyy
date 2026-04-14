import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "pascal-dashboard.json");

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

async function ensureFile() {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(INITIAL_PROJECT, null, 2));
  }
}

export async function GET() {
  await ensureFile();

  const data = await fs.readFile(filePath, "utf8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req) {
  const body = await req.json();

  await ensureFile();
  await fs.writeFile(filePath, JSON.stringify(body, null, 2));

  return NextResponse.json({ ok: true });
}
