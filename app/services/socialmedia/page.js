'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Sparkles, Video, Megaphone, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SocialMediaPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative px-5 md:px-16 pt-20 md:pt-28 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Social Media Management, das <span className="text-indigo-300">funktioniert</span>.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-neutral-300 text-lg">
          Maßgeschneiderte Strategien, die Reichweite schaffen, Vertrauen aufbauen 
          und Leads in Kunden verwandeln.
        </p>
      </section>

      {/* ENTHALTEN */}
      <section className="px-5 md:px-16 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Video size={26} />, title: 'Content Creation', desc: 'Foto, Video & Design speziell für deine Zielgruppe.' },
          { icon: <Megaphone size={26} />, title: 'Performance Ads', desc: 'Kampagnen, die messbar Reichweite & Leads generieren.' },
          { icon: <Users size={26} />, title: 'Community Management', desc: 'Antworten, Interaktionen und Aufbau echter Beziehungen.' },
        ].map((item, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition">
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl text-indigo-300">
              {item.icon}
            </div>
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-neutral-300">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* BEISPIEL */}
      <section className="px-5 md:px-16 py-14 flex flex-col md:flex-row gap-10 items-center">
        <img 
          src="/img/social-example.jpg" 
          alt="Social Media Beispiel" 
          className="rounded-2xl w-full md:w-1/2 object-cover"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold">So könnte es aussehen</h2>
          <p className="mt-3 text-neutral-300">
            Beispiel-Content, der direkt performt: Storytelling, visuelle Hooks 
            und ein Funnel, der deine Interessenten weiterleitet.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold">Bereit, deine Reichweite zu skalieren?</h2>
        <p className="mt-3 text-neutral-300">Starte mit einem kostenlosen Erstgespräch.</p>
        <Link href="/request">
          <button className="mt-6 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition font-semibold inline-flex items-center gap-2">
            Termin vereinbaren <ArrowRight size={18} />
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  )
}
