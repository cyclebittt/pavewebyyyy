'use client'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowRight, ArrowUpRight, Sun } from 'lucide-react';
import Link from 'next/link';

const Blogs = () => {
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

            <div className="px-5">
                <div className="bg-neutral-800 rounded-3xl px-5 py-8 md:py-20 md:px-36 flex flex-col gap-10">
                    <div className="text-white flex flex-col items-center justify-center gap-4 md:gap-8 mx-auto max-w-3xl">
                        <h2 className="font-medium text-3xl md:text-5xl">Blogs</h2>
                        <p className="font-regular text-center text-base md:text-xl">How Pave’s Innovative IT Solutions Can Boost Efficiency, Reduce Costs, and Drive Sustainable Growth for Your Business.</p>
                    </div>
                    <div className="flex items-center justify-center relative group">
                        <button className="px-8 py-3 bg-violet-600 text-white rounded-full font-medium transition-all duration-500 group-hover:scale-105">
                            Create New Blogs
                        </button>
                        {/* <button className="w-12 h-12 flex items-center justify-center bg-violet-600 text-white rounded-full transition-all duration-500 z-10 -ml-2 group-hover:rounded-l-none group-hover:-ml-6">
                            <ArrowUpRight />
                        </button> */}
                    </div>
                </div>
            </div>

            <div className="px-5 py-10">
                <div className="bg-neutral-100 rounded-3xl px-5 py-8 md:p-14 flex flex-col gap-10">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-3xl md:text-5xl text-center">Latest Post</p>
                        <button className="w-fit px-4 py-2 text-violet-700 rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden">
                            4 Articles
                        </button>
                    </div>

                    <Link href='/blogs/1'>
                        <div data-aos={animationRight} data-aos-duration="500" className='w-full bg-white rounded-xl p-6 flex flex-col md:flex-row gap-6'>
                            <div className='w-full md:w-[440px] md:min-h-full rounded-xl overflow-hidden'>
                                <img src="/img/blogs/1.jpg" alt="" className='w-full h-full object-cover' />
                            </div>

                            <div className='w-full flex flex-col gap-7'>
                                <div className='w-full flex flex-col gap-5'>
                                    <div className='w-full flex items-center justify-between'>
                                        <span className='px-4 py-1 bg-violet-100 text-violet-600 rounded-full'>Content Marketing</span>
                                        <span>25 Sep, 2024</span>
                                    </div>
                                    <div className='flex flex-col gap-2 md:gap-3'>
                                        <h3 className='text-2xl md:text-3xl font-bold'>Content That Converts: How to Tell Stories Your Audience Can’t Ignore</h3>
                                        <p className='text-base md:text-lg text-neutral-700'>Ever wonder why some content sticks with you while others feel like white noise? Here’s the secret: it’s not just about what you say—it’s how you say it. In today’s digital age, content isn’t just king—it’s the entire kingdom. It connects, captivates, and convinces.</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 md:gap-4'>
                                    <div className='w-11 h-11 aspect-square rounded-full overflow-hidden'>
                                        <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-bold'>Leon Seitz</h4>
                                        <p className='text-xs'>CEO Pave</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="px-5">
                <div className="rounded-3xl px-0 py-8 md:p-14 flex flex-col gap-10">
                    <div className="hidden md:flex items-center justify-between">
                        <p className="font-medium text-3xl md:text-5xl text-center">Popular Post</p>
                        <button className="w-fit px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group">
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
                                See More Articles
                            </span>
                            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                        </button>
                    </div>

                    <div className="md:hidden flex flex-col items-center justify-center gap-3 mx-auto max-w-3xl">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <Sun />
                            <h2 className="font-medium text-xl md:text-2xl text-center">More Blogs</h2>
                        </div>
                        <p className="font-medium text-3xl md:text-5xl text-center">Popular Post</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        <Link href='/blogs/2' className='flex'>
                            <div className='w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4'>
                                <div className='w-full h-56 rounded-xl overflow-hidden'>
                                    <img src="/img/blogs/2.jpg" alt="" className='w-full h-full object-cover' />
                                </div>

                                <div className='w-full flex flex-col gap-5'>
                                    <div className='w-full flex flex-col gap-4'>
                                        <div className='w-full flex items-center justify-between'>
                                            <span className='px-4 py-1 bg-violet-100 text-violet-600 rounded-full'>Web Developement</span>
                                            <span>12 Oct, 2024</span>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h3 className='text-2xl font-bold'>First Impressions Matter: How to Create Stunning Websites That Actually Work</h3>
                                            <p className='text-base text-neutral-700'>You never get a second chance to make a first impression—especially online. Imagine a potential customer landing on your website. Within seconds, they’ve decided if your business feels professional, trustworthy, and worth their time. No pressure, right?</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-11 h-11 aspect-square rounded-full overflow-hidden'>
                                            <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <h4 className='font-bold'>Leon Seitz</h4>
                                            <p className='text-xs'>CEO Pave</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href='/blogs/3' className='flex'>
                            <div className='w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4'>
                                <div className='w-full h-56 rounded-xl overflow-hidden'>
                                    <img src="/img/blogs/3.jpg" alt="" className='w-full h-full object-cover' />
                                </div>

                                <div className='w-full flex flex-col gap-5'>
                                    <div className='w-full flex flex-col gap-4'>
                                        <div className='w-full flex items-center justify-between'>
                                            <span className='px-4 py-1 bg-violet-100 text-violet-600 rounded-full'>Smart Tools</span>
                                            <span>17 Nov, 2024</span>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h3 className='text-2xl font-bold'>Stop Email Overload! How Smarter Collaboration Tools Can Save Your Sanity (and Your Team’s)</h3>
                                            <p className='text-base text-neutral-700'>Be honest: how many unread emails are sitting in your inbox right now? If your answer is “too many to count,” you’re not alone. We’ve all been there—lost in a sea of CCs, searching for that one update buried under an avalanche of “quick check-ins.”</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-11 h-11 aspect-square rounded-full overflow-hidden'>
                                            <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <h4 className='font-bold'>Leon Seitz</h4>
                                            <p className='text-xs'>CEO Pave</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href='/blogs/4' className='flex'>
                            <div className='w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4'>
                                <div className='w-full h-56 rounded-xl overflow-hidden'>
                                    <img src="/img/blogs/4.jpg" alt="" className='w-full h-full object-cover' />
                                </div>

                                <div className='w-full flex flex-col gap-5'>
                                    <div className='w-full flex flex-col gap-4'>
                                        <div className='w-full flex items-center justify-between'>
                                            <span className='px-4 py-1 bg-violet-100 text-violet-600 rounded-full'>Market Strategy</span>
                                            <span>18 Dec, 2024</span>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h3 className='text-2xl font-bold'>Your Brand, Your Story: How to Stand Out in a Crowded Market</h3>
                                            <p className='text-base text-neutral-700'>Imagine walking into a crowded room filled with competitors—and all eyes are on you. Why? Because your brand doesn’t just exist—it owns the space. It speaks volumes about who you are, what you stand for, and why you’re unforgettable.</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-11 h-11 aspect-square rounded-full overflow-hidden'>
                                            <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <h4 className='font-bold'>Leon Seitz</h4>
                                            <p className='text-xs'>CEO Pave</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className='md:hidden flex items-center justify-center'>
                        <button className="w-fit px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group">
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
                                See More Articles
                            </span>
                            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                        </button>
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
                        <p className="text-xl font-medium">We look forward to connecting with you</p>
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
    )
}

export default Blogs