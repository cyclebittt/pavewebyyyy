'use client'

import { Testimonials } from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, ArrowUpRight, ChartPie, ChevronDown, CodeXml, Flame, LayoutDashboard, Pencil, PenTool, Plus, Sun, Users } from "lucide-react";
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

  // useEffect(() => {
  //   AOS.init();
  // }, [])

  return (
    <div className="font-proxima">
      <Navbar />

    

      { <div className="px-5 md:px-20 py-6 md:py-14 flex flex-col gap-14">
        <div data-aos="fade-up" data-aos-duration="500" className="flex gap-4">
          <Sun className="min-w-[16px]" />
          <div className="flex flex-col gap-8">
            <h2 className="font-medium text-xl md:text-2xl">About Us</h2>
            <p className="font-medium text-3xl md:text-5xl">Flatter is property website that has been helping of pluto people to find their dream homes</p>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="500" className="bg-gray-900 rounded-3xl p-5 flex md:flex-row flex-col gap-8 items-center justify-between">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-14">
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="font-medium text-4xl md:text-6xl text-violet-400 flex items-center">4<Plus size={30} /></h3>
              <p className="text-2xl font-medium text-white">Jahre Erfahrung</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-5">
              <h3 className="font-medium text-4xl md:text-6xl text-violet-400 flex items-center">100M<Plus size={30} /></h3>
              <p className="text-2xl font-medium text-white">Klicks generiert</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-5">
              <h3 className="font-medium text-4xl md:text-6xl text-violet-400 flex items-center">100<Plus size={30} /></h3>
              <p className="text-2xl font-medium text-white">Erfolgreiche Projekte</p>
            </div>
          </div>

          <div className="w-20 md:w-28 aspect-square border-2 border-white rounded-full flex items-center justify-center text-white cursor-pointer relative overflow-hidden group">
            <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-gray-900">
              <ArrowRight size={40} />
            </span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
          </div>

          <div className="w-full md:w-96 md:h-32 rounded-3xl overflow-hidden">
            <img src="https://images.pexels.com/photos/5990042/pexels-photo-5990042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full object-cover" alt="" />
          </div>
        </div>
      </div> }

      <div className="px-0 md:px-5 pb-10">
        <div className="bg-neutral-800 rounded-none md:rounded-3xl px-5 py-8 md:p-14 flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col items-center justify-center gap-14">
            <div className="text-white flex flex-col items-center justify-center gap-3 max-w-2xl">
              <div className="flex flex-col items-center justify-center gap-3">
                <Sun />
                <h2 className="font-medium text-xl md:text-2xl text-center">Services</h2>
              </div>
              <p className="font-medium text-3xl md:text-5xl text-center">
                Ihr Weg in die Zukunft
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div data-aos={animationRight} data-aos-duration="500" onClick={() => toggleCard(0)} className="relative bg-[#353088] px-6 pt-6 rounded-lg w-full min-h-[420px] md:min-h-[540px] rounded-2xl flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  <div className='flex justify-between items-center'>
                    <div className="h-12 w-12 aspect-square rounded-full text-[#353088] bg-neutral-200 flex items-center justify-center">
                      <Users size={24} />
                    </div>
                    <ChevronDown className='text-white md:hidden' />
                  </div>
                  <div className="flex flex-col gap-2 text-white">
                    <h2 className="font-bold text-2xl">Internal Collaboration Solutions</h2>
                    <p className={`text-xl transition-all duration-700 linear overflow-hidden ${activeCard === 0 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>Empower your team to work smarter, not harder. With tailored communication tools designed to streamline workflows and enhance teamwork, we help you eliminate bottlenecks and create a culture of collaboration.</p>
                  </div>
                </div>
                <div className="w-full">
                  <img src="/img/insight.png" alt="" className="w-full" />
                </div>
              </div>

              <div data-aos={animationRight} data-aos-duration="500" className="flex flex-col gap-8 w-full h-full">
                <div onClick={() => toggleCard(1)} className="md:h-1/2 flex flex-col gap-5 p-6 bg-[#7569AD] rounded-2xl">
                  <div className='flex justify-between items-center'>
                    <div className="h-12 w-12 aspect-square rounded-full text-[#4B3A98] bg-white flex items-center justify-center">
                      <ChartPie size={24} />
                    </div>
                    <ChevronDown className='text-white md:hidden' />
                  </div>
                  <div className="flex flex-col gap-2 text-white">
                    <h2 className="font-bold text-2xl">Branding & Identity</h2>
                    <p className={`transition-all duration-500 linear overflow-hidden ${activeCard === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>Your brand is more than a logo—it’s the heartbeat of your business. We help you craft a brand identity that not only stands out but connects deeply with your audience.</p>
                  </div>
                </div>

                <div onClick={() => toggleCard(2)} className="md:h-1/2 flex flex-col gap-5 p-6 bg-[#B6B0D6] rounded-2xl">
                  <div className='flex justify-between items-center'>
                    <div className="h-12 w-12 aspect-square rounded-full text-[#222] bg-white flex items-center justify-center">
                      <PenTool size={24} />
                    </div>
                    <ChevronDown className='text-neutral-900 md:hidden' />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">UX/UI Design</h2>
                    <p className={`text-neutral-600 transition-all duration-500 linear overflow-hidden ${activeCard === 2 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>We help your customers fall in love with your brand through intuitive and beautiful interfaces. By combining functionality and creativity, we create designs that turn first-time visitors into loyal fans of your business.</p>
                  </div>
                </div>
              </div>

              <div data-aos={animationRight} data-aos-duration="500" className="flex flex-col gap-8 w-full h-full">
                <div onClick={() => toggleCard(3)} className="md:h-1/2 flex flex-col gap-5 p-6 bg-white rounded-2xl">
                  <div className='flex justify-between items-center'>
                    <div className="h-12 w-12 aspect-square rounded-full text-[#222] bg-neutral-200 flex items-center justify-center">
                      <CodeXml size={24} />
                    </div>
                    <ChevronDown className='text-neutral-900 md:hidden' />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">Web Development</h2>
                    <p className={`text-neutral-600 transition-all duration-500 linear overflow-hidden ${activeCard === 3 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>Your website is often the first impression of your business—let’s make it unforgettable. From elegant designs to cutting-edge functionality, we build websites that attract, engage, and convert.</p>
                  </div>
                </div>

                <div onClick={() => toggleCard(4)} className="md:h-1/2 flex flex-col gap-5 p-6 bg-[#F5F4FC] rounded-2xl">
                  <div className='flex justify-between items-center'>
                    <div className="h-12 w-12 aspect-square rounded-full text-[#222] bg-neutral-200 flex items-center justify-center">
                      <LayoutDashboard size={24} />
                    </div>
                    <ChevronDown className='text-neutral-900 md:hidden' />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">Content Creation</h2>
                    <p className={`text-neutral-600 transition-all duration-500 linear overflow-hidden ${activeCard === 4 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>Great content doesn’t just inform—it inspires action. From engaging blogs to attention-grabbing videos, we create storytelling that resonates with your audience and drives results.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href='/request' className="flex items-center relative group">
            <button className="px-8 py-3 bg-violet-600 text-white rounded-full font-medium flex items-center gap-1 transition-all duration-500 group-hover:scale-105">
              Boost your efficiency <span className="hidden md:flex items-center">– discover our digital solutions now!</span>
            </button>
            {/* <button className="w-12 h-12 flex items-center justify-center bg-violet-600 text-white rounded-full transition-all duration-500 z-10 -ml-2 group-hover:rounded-l-none group-hover:-ml-6">
              <ArrowUpRight />
            </button> */}
          </Link>
        </div>
      </div>

      { <div className="py-14 flex flex-col items-center justify-center gap-14">
        <div data-aos="fade-up" data-aos-duration="500" className="flex flex-col items-center justify-center gap-3 max-w-2xl">
          <div className="flex flex-col items-center justify-center gap-3">
            <Sun />
            <h2 className="font-medium text-xl md:text-2xl text-center">Testimonials</h2>
          </div>
          <p className="font-medium text-3xl md:text-5xl text-center">Client Success Stories</p>
        </div>

        <div className="w-full flex flex-col gap-4 md:gap-8">
          <Testimonials direction={"right"} />
          <Testimonials direction={"left"} />
        </div>
      </div> }

      <div className="px-5 py-10">
        <div className="bg-white rounded-3xl px-0 md:px-5 py-8 md:p-14 flex flex-col gap-14">
          <div className="flex gap-4 max-w-6xl">
            <Sun className="min-w-[16px]" />
            <div className="flex flex-col gap-8">
              <h2 className="font-medium text-xl md:text-2xl">Warum wir?</h2>
              <p className="font-medium text-3xl md:text-5xl">Maßgeschneiderte digitale Lösungen, die messbare und nachhaltige Ergebnisse liefern</p>
              <Link href='/request' className="flex items-center relative group">
                <button className="px-8 py-3 bg-violet-600 text-white rounded-full font-medium transition-all duration-500 group-hover:scale-105">
                  See Our Solutions
                </button>
                {/* <button className="w-12 h-12 flex items-center justify-center bg-violet-600 text-white rounded-full transition-all duration-500 z-10 -ml-2 group-hover:rounded-l-none group-hover:-ml-6">
                  <ArrowUpRight />
                </button> */}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            <div data-aos={animationRight} data-aos-duration="500" className="w-full h-full rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover" />
            </div>
            <div data-aos={animationRight} data-aos-duration="500" data-aos-offset="300" className="w-full flex flex-col gap-8 w-full">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="w-full bg-[#353088] rounded-2xl flex flex-col p-8 gap-5 items-center justify-center">
                  <span className="text-white bg-[#FFFFFF1F] px-4 py-2 rounded-full">Retention Rate</span>
                  <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <h3 className="font-bold text-6xl text-[#FFDD67]">96%</h3>
                    <p className="text-center text-[#E9E9E9]">You benefit from our 96% client retention rate, backed by annual feedback and customer loyalty analysis over the past 3 years.</p>
                  </div>
                </div>

                <div className="w-full bg-[#7569AD] rounded-2xl flex flex-col p-8 gap-5 items-center justify-center">
                  <span className="text-white bg-[#FFFFFF1F] px-4 py-2 rounded-full">Experience</span>
                  <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <h3 className="font-bold text-6xl text-white">3+</h3>
                    <p className="text-center text-[#E9E9E9]">Benefit from 3+ years of social media expertise that’s driven growth for 50+ clients across industries.</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-[#EAEAEA] rounded-2xl flex flex-col p-8 gap-5 items-center justify-center">
                <span className="text-[#353088] bg-[#7569AD1F] px-4 py-2 rounded-full">Global Clientele</span>
                <div className="w-full flex flex-col gap-3 items-center justify-center">
                  <h3 className="font-bold text-6xl text-[500+]">500+</h3>
                  <p className="text-center text-[#000]">Manage your social media and content creation with our tailored strategies, trusted by 500+ international clients across gaming, tech, and lifestyle brands. We focus on delivering measurable results aligned with your unique goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-20 py-6 md:py-24 flex flex-col md:flex-row gap-20">
        <div data-aos="fade-up" data-aos-duration="500" className="w-full md:w-2/5 flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <h2 className="font-medium text-3xl md:text-5xl">Pave the way and get in touch with us.</h2>
            <p className="text-neutral-600">We&apos;re here to pave the way for you. Whether you need answers, support, or just a quick chat, our team is ready to assist. Reach out via contact form, email, or phone, and we’ll get back to you promptly.</p>
            <Link href='/request'>
              <button className="w-fit px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group">
                <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
                  Book an Appointment
                </span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xl font-medium">We look forward to paving the way together!</p>
            <ArrowRight />
          </div>
        </div>

        <div data-aos={animationRight} data-aos-duration="500" data-aos-offset="300" className="flex flex-col md:flex-row items-center md:items-end gap-5 w-full md:w-3/5">
          <div className="w-full md:w-72 aspect-square rounded-2xl overflow-hidden relative">
            <div className="absolute bottom-2 left-2 flex items-center group">
              <button className="px-4 py-1 bg-violet-600 text-white rounded-full font-medium transition-all duration-500 group-hover:scale-105">
                Founder
              </button>
              {/* <button className="w-8 h-8 flex items-center justify-center bg-violet-600 text-white rounded-full transition-all duration-500 z-10 -ml-2 group-hover:rounded-l-none group-hover:-ml-4">
                <ArrowUpRight />
              </button> */}
            </div>
            <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Link href='/about' className="absolute top-4 right-4 flex items-center group">
              <button className="px-4 py-2 bg-violet-600 text-white rounded-full font-medium transition-all duration-500 group-hover:scale-105">
                Meet our Team
              </button>
              {/* <button className="w-10 h-10 flex items-center justify-center bg-violet-600 text-white rounded-full transition-all duration-500 z-10 -ml-2 group-hover:rounded-l-none group-hover:-ml-4">
                <ArrowUpRight />
              </button> */}
            </Link>
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
