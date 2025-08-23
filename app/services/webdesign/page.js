import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import ProofBlocks from "@/components/services/ProofBlocks";

export default function Webdesign() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F,#0E0E15,#0B0B0F)]" />
        <div className="relative px-5 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16 max-w-4xl">
          <span className="inline-flex text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">Webdesign & Performance</span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight">
            Seiten, die konvertieren.
            <span className="block text-indigo-300">Schnell. Klar. Verlässlich.</span>
          </h1>
          <p className="mt-4 text-neutral-300 max-w-2xl">Wir verbinden klares Layout, schnelle Technik und Conversion‑Struktur – für Vertrauen & Leads.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/request" className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold">Projekt starten</Link>
            <Link href="/contact" className="px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:border-white/30">Kontakt</Link>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-16 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-semibold">Das ist drin</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            "UX‑Struktur & Wireframes",
            "High‑Fidelity UI (mobil‑first)",
            "CMS/Headless (z. B. Next.js)",
            "SEO‑Basics + PageSpeed",
            "Tracking & Events (Consent‑ready)",
            "Landingpages für Kampagnen",
            "Copy‑Support (Value Props, CTAs)",
          ].map((t) => (
            <div key={t} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">{t}</div>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-16 pb-12 md:pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">So zeigen wir Wirkung</h2>
        <ProofBlocks
          items={[
            { type: "kpi", eyebrow: "KPI", title: "PageSpeed", value: "90–100", note: "Core Web Vitals (mobil) bei Launch" },
            { type: "video", eyebrow: "Demo", caption: "Kurzdemo: Navigations‑Flow & Above‑the‑Fold", src: "/video/demo-web.mp4", poster: "/img/video-poster-web.png" },
            { type: "beforeAfter", eyebrow: "Vorher/Nachher", title: "Above the Fold + CTA", before: "/img/placeholder-before.png", after: "/img/placeholder-after.png" },
            { type: "quote", eyebrow: "Feedback", text: "Bessere Klarheit + 28% mehr Anfragen innerhalb von 6 Wochen.", author: "S. Wagner", role: "Geschäftsführer, Handwerk" },
          ]}
        />
      </section>

      <Footer />
    </div>
  );
}
