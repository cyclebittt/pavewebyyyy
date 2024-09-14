'use client'

import Navbar from '@/components/layout/Navbar'
import React from 'react'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowRight, ArrowUpRight, Sun } from 'lucide-react';
import { Teams } from '@/components/about/Teams';
import Footer from '@/components/layout/Footer';

const About = () => {
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
                <div className="bg-neutral-800 rounded-3xl px-5 py-8 md:p-14 flex flex-col gap-16">
                    <div data-aos="fade-up" data-aos-duration="500" className="text-white flex flex-col gap-6 md:gap-12 max-w-4xl">
                        <h2 className="font-medium text-3xl md:text-5xl">Who We Are?</h2>
                        <p className="font-regular text-base md:text-xl">Our comprehensive tool offers small business owners a one-stop-shop solution to manage their accounting, sales, marketing, outreach efforts, CRM, financial models, email campaigns, </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                        <div data-aos={animationRight} data-aos-duration="500" className="w-full h-full rounded-2xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div data-aos={animationRight} data-aos-duration="500" className="bg-white/20 text-white w-full flex flex-col gap-6 p-4 md:p-10 rounded-2xl">
                            <h2 className="font-bold text-3xl md:text-5xl">Our Story</h2>
                            <div className='flex flex-col gap-4'>
                                <p className="font-medium text-base md:text-xl">Lorem ipsum dolor sit amet consectetur. Varius a adipiscing aliquam parturient leo ullamcorper arcu. Sagittis interdum euismod imperdiet porta est. Commodo enim tellus vulputate mauris ipsum. Tincidunt nulla interdum tempus bibendum lobortis sed facilisi viverra. Mauris risus eget imperdiet sit sit in dui. </p>
                                <p className="font-medium text-base md:text-xl">Id phasellus diam id faucibus mollis odio tempor ipsum amet. In vitae placerat turpis malesuada bibendum non velit velit. Enim eget semper dui dui. Eget faucibus amet bibendum ullamcorper at ultricies nunc. Turpis tincidunt facilisi sollicitudin ac facilisi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 md:px-20 py-6 md:py-24 flex flex-col md:flex-row gap-8">
                <div data-aos="fade-up" data-aos-duration="500" className="w-full md:w-3/5">
                    <div className="flex gap-4">
                        <Sun className="min-w-[16px]" />
                        <div className='flex flex-col gap-6 md:max-w-xl'>
                            <div className="flex flex-col gap-8">
                                <h2 className="font-medium text-xl md:text-2xl">Our Values</h2>
                                <p className="font-medium text-3xl md:text-5xl">Our Values at Pave</p>
                            </div>

                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className="font-bold text-2xl">Innovation</h2>
                                    <p className="text-neutral-600">We strive to stay ahead by leveraging cutting-edge technology, ensuring our clients benefit from the latest advancements in IT solutions.</p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <h2 className="font-bold text-2xl">Client-Centric Approach</h2>
                                    <p className="text-neutral-600">Our clients’ needs are at the heart of everything we do. We tailor solutions that align with their business objectives, fostering lasting partnerships</p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <h2 className="font-bold text-2xl">Retention Rate</h2>
                                    <p className="text-neutral-600">Building and maintaining websites, from front-end design to back-end functionality and e-commerce solutions.</p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <h2 className="font-bold text-2xl">Reliability</h2>
                                    <p className="text-neutral-600">We believe in the power of teamwork, both internally and with our clients. Collaboration drives our ability to create scalable, efficient IT solutions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-aos={animationRight} data-aos-duration="500" className="w-full md:w-2/5 min-h-full rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="px-5 py-10">
                <div className="bg-orange-600 rounded-3xl py-12 md:py-20 flex flex-col items-center justify-center gap-16">
                    <div data-aos="fade-up" data-aos-duration="500" className="text-white flex flex-col items-center justify-center gap-3 max-w-xl">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <Sun />
                            <h2 className="font-medium text-xl md:text-2xl text-center">Teams</h2>
                        </div>
                        <p className="font-medium text-3xl md:text-5xl text-center">Creative Minds Behind Pave</p>
                    </div>

                    <div className='max-w-full'>
                        <Teams direction={"right"} />
                    </div>
                </div>
            </div>

            <div className="px-5 py-10">
                <div className="bg-neutral-100 rounded-3xl px-5 py-12 md:py-20 flex flex-col items-center justify-center gap-16">
                    <div data-aos="fade-up" data-aos-duration="500" className="flex flex-col gap-6 md:gap-12 max-w-3xl">
                        <h2 className="font-medium text-center text-3xl md:text-5xl">Backed By The Best</h2>
                        <p className="font-regular text-center text-base md:text-xl">At Pave, we are proud to have earned the trust of our clients by delivering innovative IT solutions with reliability, integrity, and a client-centric approach, fostering lasting partnerships.</p>
                    </div>

                    <div className='flex items-center justify-center gap-16 flex-wrap max-w-4xl'>
                        <div data-aos="fade-right" data-aos-duration="500" className='w-28 md:w-44 overflow-hidden'>
                            <img src="/img/clients/comp1.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div data-aos="fade-right" data-aos-duration="500" className='w-28 md:w-44 overflow-hidden'>
                            <img src="/img/clients/comp2.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div data-aos="fade-right" data-aos-duration="500" className='w-28 md:w-44 overflow-hidden'>
                            <img src="/img/clients/comp3.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div data-aos="fade-right" data-aos-duration="500" className='w-28 md:w-44 overflow-hidden'>
                            <img src="/img/clients/comp4.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div data-aos="fade-right" data-aos-duration="500" className='w-28 md:w-44 overflow-hidden'>
                            <img src="/img/clients/comp5.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div data-aos="fade-right" data-aos-duration="500" className='w-28 md:w-44 overflow-hidden'>
                            <img src="/img/clients/comp6.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div data-aos="fade-right" data-aos-duration="500" className='w-28 md:w-44 overflow-hidden'>
                            <img src="/img/clients/comp7.png" alt="" className='w-full h-full object-cover' />
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

export default About