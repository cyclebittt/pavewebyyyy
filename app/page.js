'use client'

import { Testimonials } from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, ChartPie, ChevronDown, CodeXml, PenTool, Sun, Users, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";

export default function Home() {
  const [animationRight, setAnimationRight] = useState('fade-right');
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAnimationRight('fade-down');
      } else {
        setAnimationRight('fade-right');
      }
    };

    // Initialize AOS
    AOS.init({ duration: 500, once: true });

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="font-proxima">
      <Navbar />

      {/* HERO */}
      <div className="md:px-5 md:pb-12">
        <div className="relative flex flex-col items-center py-8 md:pt-40 md:pb-52 px-4 gap-4 md:gap-12 md:rounded-3xl overflow-hidden">
          <img src="/img/bg.png" alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />

          <div className="flex text-white flex-col items-center justify-center gap-2 md:gap-4 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-center">
              Paving <span className="text-violet-950">Your</span> Path <br /> to the Digital Future.
            </h1>
            <p className="text-xs md:text-lg text-center">
              From strategy to implementation – empowering your digital transformation journey.
            </p>
          </div>

          <Link href='/request' className="flex items-center relative group">
            <button className="px-4 py-2 md:px-8 md:py-3 text-sm md:text-base bg-violet-950 text-white rounded-full font-medium transition-all duration-500 group-hover:scale-105">
              Let&apos;s get started
            </button>
          </Link>
        </div>
      </div>

      {/* SERVICES */}
      <div className="px-0 md:px-5 pb-10">
        <div className="bg-neutral-800 md:rounded-3xl px-5 py-8 md:p-14 flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col items-center gap-14">
            <div className="text-white flex flex-col items-center gap-3 max-w-2xl">
              <Sun />
              <h2 className="font-medium text-xl md:text-2xl text-center">Services</h2>
              <p className="font-medium text-3xl md:text-5xl text-center">
                Your Path Out of Paperwork
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              {/* Service 1 */}
              <div data-aos={animationRight} onClick={() => toggleCard(0)} className="relative bg-[#353088] p-6 rounded-2xl flex flex-col gap-10 min-h-[420px] md:min-h-[540px]">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#353088] bg-neutral-200 flex items-center justify-center">
                      <Users size={24} />
                    </div>
                    <ChevronDown className="text-white md:hidden" />
                  </div>
                  <div className="flex flex-col gap-2 text-white">
                    <h2 className="font-bold text-2xl">Internal Collaboration Solutions</h2>
                    <p className={`transition-all duration-700 overflow-hidden ${activeCard === 0 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>
                      Empower your team with tools that streamline workflows, eliminate bottlenecks, and create a culture of collaboration.
                    </p>
                  </div>
                </div>
                <img src="/img/insight.png" alt="" className="w-full" />
              </div>

              {/* Service 2 & 3 */}
              <div className="flex flex-col gap-8 w-full">
                <div onClick={() => toggleCard(1)} className="flex flex-col gap-5 p-6 bg-[#7569AD] rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#4B3A98] bg-white flex items-center justify-center">
                      <ChartPie size={24} />
                    </div>
                    <ChevronDown className="text-white md:hidden" />
                  </div>
                  <div className="flex flex-col gap-2 text-white">
                    <h2 className="font-bold text-2xl">Branding & Identity</h2>
                    <p className={`transition-all duration-500 overflow-hidden ${activeCard === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>
                      More than a logo – it’s the heartbeat of your business. We craft a brand identity that truly connects with your audience.
                    </p>
                  </div>
                </div>

                <div onClick={() => toggleCard(2)} className="flex flex-col gap-5 p-6 bg-[#B6B0D6] rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#222] bg-white flex items-center justify-center">
                      <PenTool size={24} />
                    </div>
                    <ChevronDown className="text-neutral-900 md:hidden" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">UX/UI Design</h2>
                    <p className={`text-neutral-600 transition-all duration-500 overflow-hidden ${activeCard === 2 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>
                      Intuitive and beautiful interfaces that turn first-time visitors into loyal fans.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 4 & 5 */}
              <div className="flex flex-col gap-8 w-full">
                <div onClick={() => toggleCard(3)} className="flex flex-col gap-5 p-6 bg-white rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#222] bg-neutral-200 flex items-center justify-center">
                      <CodeXml size={24} />
                    </div>
                    <ChevronDown className="text-neutral-900 md:hidden" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">Web Development</h2>
                    <p className={`text-neutral-600 transition-all duration-500 overflow-hidden ${activeCard === 3 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>
                      Your website is the first impression – let’s make it unforgettable.
                    </p>
                  </div>
                </div>

                <div onClick={() => toggleCard(4)} className="flex flex-col gap-5 p-6 bg-[#F5F4FC] rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#222] bg-neutral-200 flex items-center justify-center">
                      <LayoutDashboard size={24} />
                    </div>
                    <ChevronDown className="text-neutral-900 md:hidden" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">Content Creation</h2>
                    <p className={`text-neutral-600 transition-all duration-500 overflow-hidden ${activeCard === 4 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>
                      Great content doesn’t just inform – it inspires action.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href='/request'>
            <button className="px-8 py-3 bg-violet-600 text-white rounded-full font-medium transition-all duration-500 hover:scale-105">
              Boost your efficiency – discover our digital solutions now!
            </button>
          </Link>
        </div>
      </div>

      {/* WHY US */}
      <div className="px-5 py-10">
        <div className="bg-white rounded-3xl p-8 md:p-14 flex flex-col gap-14">
          <div className="flex gap-4 max-w-6xl">
            <Sun className="min-w-[16px]" />
            <div className="flex flex-col gap-8">
              <h2 className="font-medium text-xl md:text-2xl">Why Us</h2>
              <p className="font-medium text-3xl md:text-5xl">
                Tailored digital solutions that deliver measurable, long-lasting results.
              </p>
              <Link href='/request'>
                <button className="px-8 py-3 bg-violet-600 text-white rounded-full font-medium transition-all duration-500 hover:scale-105">
                  See Our Solutions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="px-5 md:px-20 py-24 flex flex-col md:flex-row gap-20">
        <div className="w-full md:w-2/5 flex flex-col gap-12">
          <h2 className="font-medium text-3xl md:text-5xl">
            Pave the way and get in touch with us.
          </h2>
          <p className="text-neutral-600">
            Whether you need answers, support, or just a quick chat, our team is ready to assist.
          </p>
          <Link href='/request'>
            <button className="w-fit px-4 py-2 bg-violet-700 text-white rounded-full font-semibold">
              Book an Appointment
            </button>
          </Link>
        </div>

        <div className="w-full md:w-3/5 flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-72 aspect-square rounded-2xl overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1470" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Link href='/about' className="absolute top-4 right-4">
              <button className="px-4 py-2 bg-violet-600 text-white rounded-full font-medium hover:scale-105 transition-all">
                Meet our Team
              </button>
            </Link>
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1484" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
