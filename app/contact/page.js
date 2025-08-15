'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AccordionExample from '@/components/ui/Accordian';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function ContactPage() {
  // UI State
  const [animationRight, setAnimationRight] = useState('fade-right');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const onChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // AOS (nur Client)
  useEffect(() => {
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true, easing: 'ease-out' });
    })();

    const onResize = () => setAnimationRight(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Submit via EmailJS (IDs über ENV; fallen sonst auf deine bisherigen Defaults zurück)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_shzfs6c';
      const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_12u0i0n';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'BTON8QXiLwUaNT5D4';

      const emailjs = (await import('@emailjs/browser')).default;
      const res = await emailjs.send(service, template, formData, publicKey);

      if (res?.status === 200) {
        setSuccess('Danke! Deine Nachricht wurde erfolgreich gesendet.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Senden fehlgeschlagen – bitte später erneut versuchen.');
      }
    } catch (err) {
      setError(err?.message || 'Unerwarteter Fehler – bitte später erneut versuchen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-proxima bg-[#0A0A10] text-[#EDEDF2] antialiased">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_0%_0%,rgba(138,174,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#12101f_0%,#0f1320_50%,#0a0d17_100%)]" />
        <div className="relative z-10 px-5 md:px-20 pt-16 md:pt-24 pb-10">
          <div className="mx-auto max-w-4xl text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#C0C6D8]">
              <Sparkles size={14} /> Kontakt
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-bold leading-[1.1]">
              Lass uns sprechen – kurz, klar, zielführend.
            </h1>
            <p className="mt-4 text-[#BFC6D8] md:text-lg">
              Ob konkrete Anfrage oder erstes Sparring: Schreib uns kurz, was du vorhast – wir melden uns zeitnah.
            </p>
          </div>
        </div>
      </section>

      {/* INFO-ZEILE */}
      <section className="px-5 md:px-20 -mt-4 md:-mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="tel:+4916095757167"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:bg-white/10 transition"
            data-aos="fade-up"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-600/20 p-2 border border-violet-500/30">
                <Phone size={18} className="text-violet-300" />
              </div>
              <div>
                <p className="text-sm text-[#AAB1C2]">Telefon</p>
                <p className="font-medium">+49 160 95757167</p>
              </div>
            </div>
          </a>

          <a
            href="mailto:info@paveconsultings.com"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:bg-white/10 transition"
            data-aos="fade-up"
            data-aos-delay="60"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-600/20 p-2 border border-violet-500/30">
                <Mail size={18} className="text-violet-300" />
              </div>
              <div>
                <p className="text-sm text-[#AAB1C2]">E-Mail</p>
                <p className="font-medium">info@paveconsultings.com</p>
              </div>
            </div>
          </a>

          <div
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-600/20 p-2 border border-violet-500/30">
                <MapPin size={18} className="text-violet-300" />
              </div>
              <div>
                <p className="text-sm text-[#AAB1C2]">Adresse</p>
                <p className="font-medium">Am Streitberg 28, 63906 Erlenbach a. Main</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAR */}
      <section className="px-5 md:px-20 py-10 md:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-b from-[#151a2a] to-[#0e1321] p-5 md:p-8">
          <div className="text-center mb-6" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-semibold">Schreib uns eine Nachricht</h2>
            <p className="text-[#AAB1C2] mt-1">Wir antworten in der Regel innerhalb von 24 Stunden.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" data-aos={animationRight}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Dein Name"
                value={formData.name}
                onChange={onChange}
                required
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/60"
              />
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                value={formData.email}
                onChange={onChange}
                required
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/60"
              />
            </div>

            <textarea
              name="message"
              rows={7}
              placeholder="Worum geht’s? (Ziele, Status, Budgetrahmen – alles hilft!)"
              value={formData.message}
              onChange={onChange}
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/60"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
            >
              {isSubmitting ? 'Wird gesendet…' : 'Senden'} <Send size={18} />
            </button>

            {success && (
              <p className="mt-2 inline-flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={18} /> {success}
              </p>
            )}
            {error && (
              <p className="mt-2 inline-flex items-center gap-2 text-rose-400">
                <AlertCircle size={18} /> {error}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 md:px-20 py-6 md:py-12">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#C0C6D8]">
            <Sparkles size={14} /> FAQs
          </span>
        </div>
        <div className="mx-auto max-w-2xl mt-6">
          <AccordionExample />
        </div>
      </section>

      {/* CTA unten */}
      <section className="px-5 md:px-20 py-10 md:py-16">
        <div
          className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(138,174,255,0.12),rgba(16,14,32,0.7))] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          data-aos="fade-up"
        >
          <div>
            <h4 className="text-2xl md:text-3xl font-semibold">Bereit, loszulegen?</h4>
            <p className="text-[#AAB1C2] mt-2">
              Kurzer Kennenlern-Call, klare Ziele, nächster Schritt – unkompliziert & verbindlich.
            </p>
          </div>
          <Link
            href="/request"
            className="inline-flex items-center justify-center rounded-full bg-white text-neutral-900 font-semibold px-6 py-3 hover:bg-neutral-200 transition"
          >
            Termin anfragen
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
