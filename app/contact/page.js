'use client'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import AccordionExample from '@/components/ui/Accordian'
import { ArrowRight, ArrowUpRight, Sun } from 'lucide-react'
import React from 'react'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    const [animationRight, setAnimationRight] = useState('fade-right');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setAnimationRight('fade-down');
            } else {
                setAnimationRight('fade-right');
            }
        };

        // Initialize AOS
        AOS.init({ duration: 500 });

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="font-proxima">
            <Navbar />

            <div className="px-5">
                <div className="bg-neutral-800 rounded-3xl px-5 py-8 md:py-20 md:px-36 flex flex-col gap-16">
                    <div data-aos="fade-up" data-aos-duration="500" className="text-white flex flex-col items-center justify-center gap-4 md:gap-8 mx-auto max-w-4xl">
                        <h2 className="font-medium text-3xl md:text-5xl">Contact Us</h2>
                        <p className="font-regular text-center text-base md:text-xl">Get in touch with us at Pave to explore how our innovative IT solutions can elevate your business. We&apos;re here to assist with any inquiries or support you need.</p>
                    </div>

                    <div className="flex flex-col justify-center items-center md:flex-row flex-wrap gap-5 md:items-start md:justify-between">
                        <div data-aos={animationRight} data-aos-duration="500" className='flex flex-col md:items-start items-center justify-center gap-3 max-w-52 text-white'>
                            <h4 className='uppercase'>Get In Touch</h4>
                            <p className='text-xl md:text-left text-center'>+33 (0)1 59 06 37 10 Contact@pave.agency</p>
                        </div>

                        <div data-aos={animationRight} data-aos-duration="500" className='flex flex-col md:items-start items-center justify-center gap-3 max-w-52 text-white'>
                            <h4 className='uppercase'>Our Address</h4>
                            <p className='text-xl md:text-left text-center'>8301 Preston Rd. Ingle, Maine 93831, Germany</p>
                        </div>

                        <div data-aos={animationRight} data-aos-duration="500" className='flex flex-col md:items-start items-center justify-center gap-3 max-w-52 text-white'>
                            <h4 className='uppercase'>Time</h4>
                            <p className='text-xl md:text-left text-center'>Monday-Friday 8:00 am to 5:00 pm</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 py-10">
                <div className="bg-neutral-100 rounded-3xl px-5 py-8 md:p-14 flex flex-col items-center justify-center gap-10">
                    <div data-aos="fade-up" data-aos-duration="500" className="flex flex-col items-center justify-center gap-3 max-w-3xl">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <Sun />
                            <h2 className="font-medium text-xl md:text-2xl text-center">Services</h2>
                        </div>
                        <p className="font-medium text-3xl md:text-5xl text-center">Send us a message</p>
                    </div>

                    <div className='w-full md:w-[720px] flex flex-col gap-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                            <input type="text" placeholder='Name' className='w-full bg-white border-none outline-none p-4 rounded-xl' />
                            <input type="email" placeholder='Email' className='w-full bg-white border-none outline-none p-4 rounded-xl' />
                        </div>
                        <div className='grid grid-cols-1'>
                            <textarea placeholder='Message' className='w-full bg-white border-none outline-none p-4 rounded-xl' />
                        </div>
                        <button className="w-full px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group">
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
                                Send
                            </span>
                            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-5 md:px-20 md:py-10 flex flex-col items-center justify-center gap-3 md:gap-10">
                <div data-aos="fade-up" data-aos-duration="500" className="flex flex-col items-center justify-center gap-3 max-w-2xl">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <Sun />
                        <h2 className="font-medium text-xl md:text-2xl text-center">FAQs</h2>
                    </div>
                    <p className="font-medium text-3xl md:text-5xl text-center">Common Questions</p>
                </div>

                <div className="w-full md:w-[720px]">
                    <AccordionExample />
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

                <div data-aos={animationRight} data-aos-duration="500" data-aos-offset="500" className="flex flex-col md:flex-row items-center md:items-end gap-5 w-full md:w-3/5">
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
    )
}

export default Contact