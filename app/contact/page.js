'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Sparkles, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [fadeDir, setFadeDir] = useState('fade-right');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const onResize = () => setFadeDir(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await emailjs.send(
        'service_shzfs6c',
        'template_12u0i0n',
        form,
        'BTON8QXiLwUaNT5D4'
      );
      if (res.status === 200) {
        setMsg({ type: 'ok', text: 'Nachricht erfolgreich gesendet!' });
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error('Senden fehlgeschlagen. Bitte erneut versuchen.');
      }
    } catch (err) {
      setMsg({ type: 'err', text: err.message || 'Etwas ist schiefgelaufen. Bitte später erneut versuchen.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-16 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Kontakt
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Lass uns sprechen.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Kurze Nachricht reicht. Wir melden uns zeitnah mit einer klaren Einschätzung.
          </p>
        </div>
      </section>

      {/* INFO + FORM */}
      <section className="px-5 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info Cards */}
          <div
            data-aos={fadeDir}
            className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Phone className="text-indigo-300" />
            </div>
            <div className="text-neutral-300">Mo–Fr, 14:00–20:00</div>
            <div className="text-neutral-100 font-semibold">+49 160 95757167</div>
          </div>

          <div
            data-aos={fadeDir}
            data-aos-delay="100"
            className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Mail className="text-indigo-300" />
            </div>
            <div className="text-neutral-300">Schreib uns jederzeit</div>
            <div className="text-neutral-100 font-semibold">info@paveconsultings.com</div>
          </div>

          <div
            data-aos={fadeDir}
            data-aos-delay="200"
            className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <MapPin className="text-indigo-300" />
            </div>
            <div className="text-neutral-300">63906 Erlenbach am Main</div>
            <div className="text-neutral-100 font-semibold">Am Streitberg 28, Germany</div>
          </div>
        </div>

        {/* Form */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold">Nachricht senden</h2>
          <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={form.name}
              onChange={onChange}
              className="w-full bg-white/5 border border-white/10 outline-none rounded-xl p-3 placeholder:text-neutral-400"
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              required
              value={form.email}
              onChange={onChange}
              className="w-full bg-white/5 border border-white/10 outline-none rounded-xl p-3 placeholder:text-neutral-400"
            />
            <textarea
              name="message"
              rows={6}
              placeholder="Deine Nachricht"
              required
              value={form.message}
              onChange={onChange}
              className="w-full bg-white/5 border border-white/10 outline-none rounded-xl p-3 placeholder:text-neutral-400"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? 'Wird gesendet…' : 'Senden'}
            </button>
            {msg.text && (
              <p className={`text-sm ${msg.type === 'ok' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {msg.text}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FAQ (leichtgewichtig, ohne extra Component) */}
      <section className="px-5 md:px-16 pb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold">FAQs</h2>
          <div className="mt-6 space-y-4">
            {[
              {
                q: 'Wie läuft ein Erstgespräch ab?',
                a: 'Wir klären Ziele, Status quo und priorisieren nächste Schritte. Danach erhältst du ein kurzes Summary + Angebot.',
              },
              {
                q: 'Können Module einzeln gebucht werden?',
                a: 'Ja. Branding, Web, Content und Leads sind modular – du startest dort, wo der größte Hebel liegt.',
              },
              {
                q: 'Was kostet ein Projekt?',
                a: 'Hängt vom Umfang ab. Wir arbeiten mit klaren Paketpreisen oder modularen Angeboten – transparent und planbar.',
              },
            ].map((item, i) => (
              <details
                key={item.q}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="text-neutral-400 group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-neutral-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 pb-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h2 className="text-3xl md:text-4xl font-bold">Schnell & unkompliziert starten?</h2>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Buch dir direkt einen Termin – oder schick uns eine kurze Nachricht.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Termin vereinbaren <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold">
              Nachricht senden
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

