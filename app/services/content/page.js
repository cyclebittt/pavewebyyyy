import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProofBlocks from "@/components/services/ProofBlocks";
import Link from "next/link";

export default function Content() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F,#0E0E15,#0B0B0F)]" />
        <div className="relative px-5 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16 max-w-4xl">
          <span className="inline-flex text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">Content Creation</span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight">
            Content, der zieht.
            <span className="block text-indigo-300">Reels. Posts. Snippets.</span>
          </h1>
          <p className="mt-4 text-neutral-300 max-w-2xl">
            Format‑Mix & Redaktionsplan, zugeschnitten auf Zielgruppe & Funnel‑Stufe – ready‑to‑post.
          </p>
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
            "Content‑Strategie & Redaktionsplan",
            "Short‑Form Video (Reels/Shorts)",
            "Design‑Snippets & Carousels",
            "Copy & Hooks (Psychologie‑basiert)",
            "Posting‑Setup + Hashtags",
            "Community‑Management (optional)",
            "Reporting & Learnings",
          ].map((t) => (
            <div key={t} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">{t}</div>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-16 pb-12 md:pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">So zeigen wir Wirkung</h2>
        <ProofBlocks
          items={[
            { type: "kpi", eyebrow: "KPI", title: "Reichweite", value: "+180%", note: "durch Hook/Format‑Mix in 6–8 Wochen" },
            { type: "video", eyebrow: "Demo", caption: "Cut‑Down: Hook → Value → CTA", src: "/video/demo-content.mp4", poster: "/img/video-poster-content.png" },
            { type: "image", eyebrow: "Template", title: "Carousel‑Vorlage", src: "/img/content-carousel.png", caption: "Systematisierte Slides für schnellere Produktion" },
            { type: "quote", eyebrow: "Feedback", text: "Konstant Anfragen – ohne täglich improvisieren zu müssen.", author: "E. Krauß", role: "Beratung" },
          ]}
        />
      </section>

      <Footer />
    </div>
  );
}
