'use client'

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle } from "lucide-react";

export default function Webdesign() {
  return (
    <div className="font-proxima bg-gradient-to-br from-violet-900 via-neutral-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-center py-24 px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Webdesign, das <span className="text-violet-400">begeistert</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-neutral-300">
          Wir gestalten Webseiten, die nicht nur gut aussehen, sondern
          funktionieren. Klare Strukturen, modernes Design und optimale
          Performance für deine Marke.
        </p>
      </div>

      {/* Packages */}
      <div className="px-6 md:px-20 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Starter */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Starter</h2>
          <p className="text-neutral-400">Perfekt für kleine Unternehmen</p>
          <p className="text-4xl font-bold">499€</p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> 1 Landing Page
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> Responsive Design
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> Basis SEO
            </li>
          </ul>
          <button className="mt-auto bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold">
            Paket wählen
          </button>
        </div>

        {/* Business */}
        <div className="bg-violet-700 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Business</h2>
          <p className="text-neutral-200">Für wachsende Unternehmen</p>
          <p className="text-4xl font-bold">999€</p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-white" /> bis 5 Unterseiten
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-white" /> Performance Optimierung
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-white" /> Erweiterte SEO
            </li>
          </ul>
          <button className="mt-auto bg-white text-violet-700 hover:bg-neutral-100 transition-colors rounded-full px-6 py-3 font-semibold">
            Paket wählen
          </button>
        </div>

        {/* Premium */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Premium</h2>
          <p className="text-neutral-400">Für maximale Wirkung</p>
          <p className="text-4xl font-bold">1499€</p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> bis 10 Unterseiten
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> Individuelles Design
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> CMS Integration
            </li>
          </ul>
          <button className="mt-auto bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold">
            Paket wählen
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-6 md:px-20 py-20 text-center flex flex-col gap-6 items-center">
        <h2 className="text-3xl md:text-5xl font-bold">
          Bereit für deine neue Website?
        </h2>
        <p className="text-neutral-300 max-w-2xl">
          Buche jetzt dein passendes Paket oder vereinbare einen Termin mit uns,
          um dein Projekt zu starten.
        </p>
        <a
          href="/request"
          className="bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-8 py-4 font-semibold"
        >
          Termin vereinbaren
        </a>
      </div>

      <Footer />
    </div>
  );
}
