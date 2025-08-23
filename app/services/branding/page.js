import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import ProofBlocks from "@/components/services/ProofBlocks";

export default function Branding() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F,#0E0E15,#0B0B0F)]" />
        <div className="relative px-5 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16 max-w-4xl">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            Branding & Positionierung
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight">
            Fundament, das greift.
            <span className="block text-indigo-300">Kernbotschaft. System. Konsistenz.</span>
          </h1>
          <p className="mt-4 text-neutral-300 max-w-2xl">
            Wir schärfen Positionierung, Tonalität & visuelles System – modular aufgebaut, ready für Web, Social & Ads.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/request" className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold">Erstes Sparring</Link>
            <Link href="/contact" className="px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:border-white/30">Kontakt</Link>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="px-5 md:px-16 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-semibold">Das ist drin</h2>
        <p className="mt-2 text-neutral-300 max-w-3xl">Modular wählbar – wir bauen schlank und erweiterbar.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            "Brand Core (Leitbild, Werte, Nutzenversprechen)",
            "Positionierung & Zielgruppen‑Segmente",
            "Naming, Claim & Tonalität",
            "Logo‑System (Primär/Secondary/Monogram)",
            "Farbwelt, Typografie, Komponenten",
            "Brand‑Guidelines (PDF + Figma‑Bibliothek)",
            "Anwendungs‑Beispiele (Web, Print, Ads)",
            "Rollout‑Plan & Begleitung",
            "Social‑Templates (Posts/Reels/Stories)",
          ].map((t) => (
            <div key={t} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* PROOF / CASE-NUggets */}
      <section className="px-5 md:px-16 pb-12 md:pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">So zeigen wir Wirkung</h2>

        <ProofBlocks
          items={[
            { type: "kpi", eyebrow: "KPI", title: "Wiedererkennung", value: "x2", note: "gestützte Markenbekanntheit nach 8–12 Wochen" },
            { type: "quote", eyebrow: "Feedback", text: "Endlich wirkt alles wie aus einem Guss – und unsere Anfragen sind messbar gestiegen.", author: "M. Richter", role: "Inhaber, Café" },
            { type: "beforeAfter", eyebrow: "Vorher/Nachher", title: "Logo‑System & Farbwelt", before: "/img/placeholder-before.png", after: "/img/placeholder-after.png" },
            { type: "steps", eyebrow: "Vorgehen", title: "Kompakt‑Ablauf", steps: [
              { title: "Kickoff & Research", desc: "Ziele, Zielgruppen, Wettbewerb." },
              { title: "Core & Messaging", desc: "Positionierung, Kernbotschaft, Tonalität." },
              { title: "Design‑System", desc: "Logo, Typo, Farben, Komponenten." },
              { title: "Guides & Rollout", desc: "PDF/Figma + Launch‑Plan." },
            ]},
          ]}
        />
      </section>

      <Footer />
    </div>
  );
}
