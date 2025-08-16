'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Sun } from 'lucide-react';

export default function Blogs() {
  const [aosDir, setAosDir] = useState('fade-right');

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true, easing: 'ease-out' });
      cleanup = () => {};
    })();

    const onResize = () => setAosDir(window.innerWidth < 768 ? 'fade-up' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      cleanup();
    };
  }, []);

  return (
    <div className="font-proxima bg-[#0B0C10] text-white">
      <Navbar />

      {/* HERO – im Stil von Home/About/Blog */}
      <section
        className="
          relative overflow-hidden
          px-5 md:px-20 pt-16 md:pt-24 pb-16 md:pb-20
        "
        aria-labelledby="blogs-hero"
      >
        <div
          className="
            absolute inset-0 -z-10
            bg-[radial-gradient(1200px_500px_at_10%_10%,#1E1B4B_0%,transparent_60%),
                radial-gradient(1000px_500px_at_90%_30%,#0EA5E9_0%,transparent_60%),
                linear-gradient(135deg,#0B0C10_10%,#0F172A_60%,#0B0C10)]
          "
        />
        <div className="pointer-events-none absolute -left-32 top-28 h-40 w-[120%] -rotate-6 blur-2xl opacity-60"
             style={{background: 'linear-gradient(90deg, rgba(129,51,241,.22), rgba(14,165,233,.18))'}}/>
        <div className="pointer-events-none absolute -right-40 bottom-10 h-40 w-[120%] rotate-6 blur-2xl opacity-60"
             style={{background: 'linear-gradient(90deg, rgba(14,165,233,.2), rgba(129,51,241,.22))'}}/>

        <div className="max-w-6xl">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/70 bg-white/5 rounded-full px-3 py-1 ring-1 ring-white/10">
            <Sun size={14} className="opacity-70" />
            Insights & Playbooks für Marken, die wirken
          </span>

          <h1 id="blogs-hero" className="mt-6 text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Blog
          </h1>

          <p className="mt-4 max-w-2xl text-white/70 text-base md:text-lg">
            Praktische Artikel zu Branding, Webdesign, Content & Systemen – klar, modular, wirkungsorientiert.
          </p>

          <div className="mt-8">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Projekt starten <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST POST */}
      <section className="px-5 md:px-20 pb-12 md:pb-16">
        <div className="max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-4xl font-semibold">Aktuell</h2>
            <span className="text-sm bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">4 Artikel</span>
          </div>

          <Link href="/blogs/1" className="block mt-6 group">
            <article
              data-aos={aosDir}
              className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#1A1E2D] to-[#111521] ring-1 ring-white/10 hover:ring-white/20 transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
                <div className="relative w-full aspect-[16/10] md:col-span-2 md:aspect-video overflow-hidden rounded-2xl">
                  <Image
                    src="/img/blogs/1.jpg"
                    alt="Content that converts"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 40vw, 100vw"
                    priority
                  />
                </div>

                <div className="md:col-span-3 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                        Content Marketing
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                        25. Sep 2024
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">
                      Content That Converts: How to Tell Stories Your Audience Can’t Ignore
                    </h3>
                    <p className="mt-3 text-white/70">
                      Ever wonder why some content sticks while others verschwinden im Rauschen?
                      Es ist nicht nur <em>was</em> du sagst, sondern <em>wie</em>.
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=256&auto=format&fit=crop"
                        alt="Autor"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Leon Seitz</p>
                      <p className="text-white/60">CEO Pave</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* POPULAR POSTS */}
      <section className="px-5 md:px-20 pb-20">
        <div className="max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-4xl font-semibold">Beliebt</h2>
            <Link
              href="/blogs"
              className="text-sm px-4 py-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition-all"
            >
              Alle Artikel
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 2 */}
            <Link href="/blogs/2" className="group">
              <article className="rounded-2xl p-5 bg-gradient-to-br from-[#1B1E2F] to-[#121624] ring-1 ring-white/10 hover:ring-white/20 transition-all h-full flex flex-col">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                  <Image src="/img/blogs/2.jpg" alt="Webdesign" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-full">Web Development</span>
                    <span>12. Okt 2024</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">First Impressions Matter: Stunning Websites That Actually Work</h3>
                  <p className="mt-2 text-white/70">
                    Der erste Eindruck entscheidet. Modern, klar und conversion-stark – so baust du Seiten, die wirken.
                  </p>
                </div>
                <div className="mt-auto pt-3 flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=128&auto=format&fit=crop" alt="Autor" fill className="object-cover" />
                  </div>
                  <span className="text-sm">Leon Seitz · CEO Pave</span>
                </div>
              </article>
            </Link>

            {/* Card 3 */}
            <Link href="/blogs/3" className="group">
              <article className="rounded-2xl p-5 bg-gradient-to-br from-[#191C2A] to-[#111521] ring-1 ring-white/10 hover:ring-white/20 transition-all h-full flex flex-col">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                  <Image src="/img/blogs/3.jpg" alt="Smart Tools" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-full">Smart Tools</span>
                    <span>17. Nov 2024</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">Stop Email Overload! Smarter Collaboration Tools, weniger Chaos</h3>
                  <p className="mt-2 text-white/70">
                    Weg vom Mail-Pingpong, hin zu klaren Workflows. So rettest du Nerven – und Zeit.
                  </p>
                </div>
                <div className="mt-auto pt-3 flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=128&auto=format&fit=crop" alt="Autor" fill className="object-cover" />
                  </div>
                  <span className="text-sm">Leon Seitz · CEO Pave</span>
                </div>
              </article>
            </Link>

            {/* Card 4 */}
            <Link href="/blogs/4" className="group">
              <article className="rounded-2xl p-5 bg-gradient-to-br from-[#202238] to-[#17192C] ring-1 ring-white/10 hover:ring-white/20 transition-all h-full flex flex-col">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                  <Image src="/img/blogs/4.jpg" alt="Market Strategy" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-full">Market Strategy</span>
                    <span>18. Dez 2024</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">Your Brand, Your Story: So stichst du im vollen Markt heraus</h3>
                  <p className="mt-2 text-white/70">
                    Positionierung mit Kante – damit deine Marke Raum einnimmt und erinnerbar bleibt.
                  </p>
                </div>
                <div className="mt-auto pt-3 flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=128&auto=format&fit=crop" alt="Autor" fill className="object-cover" />
                  </div>
                  <span className="text-sm">Leon Seitz · CEO Pave</span>
                </div>
              </article>
            </Link>
          </div>

          <div className="mt-8 flex justify-center md:justify-start">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Mehr Artikel <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* KONTAKT-CTA */}
      <section className="px-5 md:px-20 pb-24" aria-labelledby="cta-heading">
        <div className="max-w-7xl relative overflow-hidden rounded-3xl p-8 md:p-14 ring-1 ring-white/10">
          <div
            className="
              absolute inset-0 -z-10
              bg-[radial-gradient(800px_200px_at_20%_30%,rgba(129,51,241,.25),transparent_70%),
                  radial-gradient(700px_200px_at_80%_70%,rgba(14,165,233,.22),transparent_70%),
                  linear-gradient(135deg,#10121A_0%,#0F1420_60%,#0B0F17)]
            "
          />
          <h2 id="cta-heading" className="text-3xl md:text-5xl font-semibold">
            Pave the way and get in touch with us.
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl">
            We&apos;re here to pave the way for you. Reach out – wir melden uns schnell mit einer klaren Einschätzung.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/request"
              className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Book an Appointment
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 md:px-6 md:py-3 rounded-full ring-1 ring-white/15 hover:ring-white/30 text-white/85 transition-all font-medium"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

