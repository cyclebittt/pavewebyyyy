'use client'

import { Testimonials } from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, ArrowUpRight, ChartPie, CodeXml, Flame, LayoutDashboard, Pencil, Plus, Sun } from "lucide-react";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="font-proxima">
      <Navbar />

      <div className="px-5 pb-5">
        <div className="relative h-screen flex flex-col items-center pt-40 px-4 gap-12 rounded-3xl overflow-hidden">
          <video autoPlay muted loop
            className="absolute inset-0 w-full h-full object-cover -z-10"
            src="https://videos.pexels.com/video-files/1957727/1957727-hd_1920_1080_30fps.mp4"
          />

          <div data-aos="fade-up" data-aos-duration="500" className="flex text-white flex-col items-center justify-center gap-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-medium text-center">Paving Your Path to the Digital Future</h1>
            <p className="text-lg text-center">Our comprehensive tool offers small business owners a one-stop-shop solution to manage their accounting, sales, marketing, outreach efforts, CRM, financial models, email campaigns.</p>
          </div>

          <div className="flex items-center relative group">
            <button className="px-8 py-3 bg-violet-600 text-white rounded-full font-medium transition-all group-hover:rounded-r-none z-10">
              Request Operation
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-violet-600 text-white rounded-full transition-all duration-500 z-10 -ml-2 group-hover:rounded-l-none group-hover:-ml-6">
              <ArrowUpRight />
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-20 py-6 md:py-14 flex flex-col gap-14">
        <div data-aos="fade-up" data-aos-duration="500" className="flex gap-4">
          <Sun className="min-w-[16px]"/>
          <div className="flex flex-col gap-8">
            <h2 className="font-medium text-xl md:text-2xl">About Us</h2>
            <p className="font-medium text-3xl md:text-5xl">Flatter is property website that has been helping of pluto people to find their dream homes</p>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="500" className="bg-gray-900 rounded-3xl p-5 flex md:flex-row flex-col gap-8 items-center justify-between">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-14">
            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-4xl md:text-6xl text-violet-400 flex items-center">90k<Plus size={30} /></h3>
              <p className="text-2xl font-medium text-white">Customers</p>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="font-medium text-4xl md:text-6xl text-violet-400 flex items-center">50k<Plus size={30} /></h3>
              <p className="text-2xl font-medium text-white">Units Ready</p>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="font-medium text-4xl md:text-6xl text-violet-400 flex items-center">5k<Plus size={30} /></h3>
              <p className="text-2xl font-medium text-white">Units Sold</p>
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
      </div>

      <div className="px-5 py-10">
        <div className="bg-neutral-800 rounded-3xl px-5 py-8 md:p-14 flex flex-col items-center justify-center gap-14">
          <div data-aos="fade-up" data-aos-duration="500" className="text-white flex flex-col items-center justify-center gap-3 max-w-2xl">
            <div className="flex flex-col items-center justify-center gap-3">
              <Sun />
              <h2 className="font-medium text-xl md:text-2xl text-center">Services</h2>
            </div>
            <p className="font-medium text-3xl md:text-5xl text-center">The most popular neighborhoods in Dubai</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            <div data-aos="fade-right" data-aos-duration="500" data-aos-offset="500" className="relative bg-neutral-100 px-6 pt-6 rounded-lg w-full rounded-2xl flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="h-12 w-12 aspect-square rounded-full text-violet-500 bg-neutral-200 flex items-center justify-center">
                  <Flame size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-2xl">Branding</h2>
                  <p className="text-neutral-600 text-2xl">Developing and refining brand identities, including logo design, brand guidelines, and visual storytelling.</p>
                </div>
              </div>
              <div className="w-full relative md:absolute left-1/2 -translate-x-1/2 bottom-0">
                <img src="/img/iphone.png" alt="" className="w-full" />
              </div>
            </div>

            <div data-aos="fade-right" data-aos-duration="500" className="flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-5 p-6 bg-violet-300 rounded-2xl">
                <div className="h-12 w-12 aspect-square rounded-full text-violet-500 bg-white flex items-center justify-center">
                  <ChartPie size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-2xl">Digital Marketing</h2>
                  <p className="text-neutral-600">Creating and managing digital marketing strategies, including SEO, PPC, social media management, and email marketing.</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 p-6 bg-rose-200 rounded-2xl">
                <div className="h-12 w-12 aspect-square rounded-full text-rose-500 bg-white flex items-center justify-center">
                  <Pencil size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-2xl">UX/UI Design</h2>
                  <p className="text-neutral-600">Crafting intuitive and engaging user interfaces and experiences for web and mobile applications.</p>
                </div>
                <div className="w-32">
                  <img src="/img/clients.png" alt="" className="w-full" />
                </div>
              </div>
            </div>

            <div data-aos="fade-right" data-aos-duration="500" data-aos-offset="500" className="flex flex-col gap-8 w-full">
              <div className="h-full flex flex-col gap-5 p-6 bg-neutral-100 rounded-2xl">
                <div className="h-12 w-12 aspect-square rounded-full text-neutral-600 bg-white flex items-center justify-center">
                  <CodeXml size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-2xl">Web Development</h2>
                  <p className="text-neutral-600">Building and maintaining websites, from front-end design to back-end functionality and e-commerce solutions.</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 p-6 bg-yellow-200 rounded-2xl">
                <div className="h-12 w-12 aspect-square rounded-full text-yellow-500 bg-white flex items-center justify-center">
                  <LayoutDashboard size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-2xl">Content Creation</h2>
                  <p className="text-neutral-600">Producing high-quality content such as blog posts, videos, and graphics to support marketing efforts and engage audiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-14 flex flex-col items-center justify-center gap-14">
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
      </div>

      <div className="px-5 py-10">
        <div className="bg-neutral-800 rounded-3xl px-5 py-8 md:p-14 flex flex-col gap-14">
          <div data-aos="fade-up" data-aos-duration="500" className="text-white flex gap-4 max-w-6xl">
            <Sun className="min-w-[16px]"/>
            <div className="flex flex-col gap-8">
              <h2 className="font-medium text-xl md:text-2xl">Why Us</h2>
              <p className="font-medium text-3xl md:text-5xl">Understand why we are the top choice for exceptional service</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            <div data-aos="fade-right" data-aos-duration="500" className="w-full h-full rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover" />
            </div>
            <div data-aos="fade-right" data-aos-duration="500" data-aos-offset="500" className="w-full flex flex-col gap-8 w-full">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="w-full bg-neutral-100 rounded-2xl flex flex-col p-8 gap-5 items-center justify-center">
                  <span className="text-red-500 bg-red-100 px-4 py-2 rounded-full">Retention Rate</span>
                  <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <h3 className="font-bold text-6xl">96%</h3>
                    <p className="text-center text-neutral-600">With over 90% client retention, our work has consistently delivered outstanding results.</p>
                  </div>
                </div>

                <div className="w-full bg-neutral-100 rounded-2xl flex flex-col p-8 gap-5 items-center justify-center">
                  <span className="text-violet-500 bg-violet-100 px-4 py-2 rounded-full">Experience</span>
                  <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <h3 className="font-bold text-6xl">3+</h3>
                    <p className="text-center text-neutral-600">Year of expertise in integrating AI with user interfaces has a 40% increase in user engagement.</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-neutral-100 rounded-2xl flex flex-col p-8 gap-5 items-center justify-center">
                <span className="text-yellow-500 bg-yellow-100 px-4 py-2 rounded-full">Global Clientele</span>
                <div className="w-full flex flex-col gap-3 items-center justify-center">
                  <h3 className="font-bold text-6xl">500+</h3>
                  <p className="text-center text-neutral-600">Having collaborated with leading companies like DP World and innovative startups such as Uniflow, our portfolio is a testament to our ability to deliver top-tier solutions, earning us recognition in the industry.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-20 py-6 md:py-24 flex flex-col md:flex-row gap-20">
        <div data-aos="fade-up" data-aos-duration="500" className="w-full md:w-2/5 flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <h2 className="font-medium text-3xl md:text-5xl">Get in touch with us for more information or support.</h2>
            <p className="text-neutral-600">We’re here to help you every step of the way. Whether you have questions, need support, or just want to chat, our team is ready to assist you. Reach out to us through our contact form, email, or phone, and we&apos;ll get back to you as soon as possible.</p>
            <button className="w-fit px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
                Book an Appointment
              </span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xl font-medium">We look forward to connecting with you</p>
            <ArrowRight />
          </div>
        </div>

        <div data-aos="fade-right" data-aos-duration="500" data-aos-offset="500" className="flex flex-col md:flex-row items-center md:items-end gap-5 w-full md:w-3/5">
          <div className="w-full md:w-72 aspect-square rounded-2xl overflow-hidden relative">
            <div className="absolute bottom-2 left-2 flex items-center group">
              <button className="px-4 py-1 bg-violet-600 text-white rounded-full font-medium transition-all group-hover:rounded-r-none z-10">
                Founder
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-violet-600 text-white rounded-full transition-all duration-500 z-10 -ml-2 group-hover:rounded-l-none group-hover:-ml-4">
                <ArrowUpRight />
              </button>
            </div>
            <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center group">
              <button className="px-4 py-2 bg-violet-600 text-white rounded-full font-medium transition-all group-hover:rounded-r-none z-10">
                Meet our Team
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-violet-600 text-white rounded-full transition-all duration-500 z-10 -ml-2 group-hover:rounded-l-none group-hover:-ml-4">
                <ArrowUpRight />
              </button>
            </div>
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
