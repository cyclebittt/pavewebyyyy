'use client'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Linkedin, Sun, Twitter } from 'lucide-react';

const BlogId = () => {
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
                <div className="bg-neutral-800 rounded-3xl px-5 py-8 md:p-14 flex flex-col gap-6">
                    <div className='w-full flex items-center gap-5'>
                        <span className='px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full'>UI Designer</span>
                        <span className='text-white'>19 Jan, 2024</span>
                    </div>
                    <div className="text-white flex flex-col gap-6 md:gap-12 max-w-4xl">
                        <h1 className="font-medium text-3xl md:text-5xl">How Innovative IT Solutions Are Transforming Businesses</h1>
                        <div className='flex items-center gap-4'>
                            <div className='w-11 h-11 aspect-square rounded-full overflow-hidden'>
                                <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='font-bold text-xl'>Badal Kumar</h4>
                                <p>UX Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 py-10">
                <div className="bg-neutral-100 rounded-3xl px-5 py-8 md:p-14 flex flex-col gap-10">
                    <h2 className='text-xl md:text-3xl font-medium'>Technology is constantly evolving, transforming industries and reshaping the way we live, work, and connect. As we look ahead, several key trends are emerging that promise to revolutionize the tech landscape. Here’s a glimpse into the future of technology and the innovations driving change.</h2>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-bold text-lg md:text-xl'>Artificial Intelligence (AI) and Machine Learning (ML)</h3>
                        <p className='text-neutral-600'>AI and ML are no longer just buzzwords. They are becoming integral to various sectors, from healthcare and finance to transportation and retail. With AI’s ability to analyze massive datasets, predict trends, and even simulate human decision-making, it’s changing everything from customer service to medical diagnoses. In the coming years, we can expect AI to become more intuitive, accessible, and deeply embedded into everyday life, enabling smarter solutions and automating complex processes.</p>
                        <p className='text-neutral-600'>The introduction of 5G is set to revolutionize connectivity. With faster data transmission and lower latency, 5G will enable advancements in the Internet of Things (IoT), smart cities, autonomous vehicles, and enhanced mobile experiences. Businesses and consumers will benefit from faster internet speeds, seamless streaming, and real-time data transmission, paving the way for new innovations in virtual and augmented reality, remote work, and telemedicine.</p>
                        <p className='text-neutral-600'>Quantum computing is on the horizon and promises to solve problems that traditional computers cannot. While still in its infancy, quantum computing has the potential to revolutionize fields like cryptography, drug discovery, and climate modeling. With its ability to process data at speeds unimaginable today, industries could see breakthroughs in everything from financial modeling to artificial intelligence, bringing solutions to complex global challenges.</p>
                        <div className='my-4 w-full max-h-[460px] overflow-hidden rounded-2xl'>
                            <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                        </div>
                        <p className='text-neutral-600'>Blockchain technology, initially synonymous with cryptocurrencies like Bitcoin, is expanding beyond finance. Its decentralized, secure nature makes it ideal for industries like supply chain management, healthcare, and voting systems. Blockchain is being used to track the provenance of goods, ensure data security, and create transparent systems that can’t be tampered with. As blockchain adoption grows, it will likely play a crucial role in ensuring privacy, security, and transparency across industries.</p>
                        <p className='text-neutral-600'>With growing concerns about climate change and resource depletion, technology focused on sustainability is gaining traction. Innovations in renewable energy, electric vehicles, and energy-efficient data centers are at the forefront. Companies are adopting greener practices by leveraging AI for energy optimization, and tech firms are prioritizing sustainable production methods. The integration of technology into sustainability efforts will help reduce environmental impacts while fostering economic growth.
                            AR and VR are transforming industries like gaming, education, and real estate. With the development of more immersive experiences, AR and VR are poised to reshape the way we interact with both digital and physical worlds. From virtual offices to augmented navigation systems, these technologies will drive new experiences in entertainment, learning, and professional collaboration, breaking down the barriers between reality and the virtual.</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-start md:items-center gap-4 py-5'>
                        <p className='text-xl font-bold'>Check it Out : </p>
                        <div className='flex items-center gap-4'>
                            <button className='flex items-center rounded border border-sky-500 text-sky-500 py-1 px-4 gap-2'><Linkedin size={20} />Linkedin</button>
                            <button className='flex items-center rounded border border-neutral-900 text-neutral-900 py-1 px-4 gap-2'><Twitter size={20} />Twitter</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5">
                <div className="rounded-3xl px-0 py-8 md:p-14 flex flex-col gap-10">
                    <div className="hidden md:flex items-center justify-between">
                        <p className="font-medium text-3xl md:text-5xl text-center">Related Post</p>
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
                        <p className="font-medium text-3xl md:text-5xl text-center">Related Post</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        <div className='w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4'>
                            <div className='w-full h-56 rounded-xl overflow-hidden'>
                                <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                            </div>

                            <div className='w-full flex flex-col gap-5'>
                                <div className='w-full flex flex-col gap-4'>
                                    <div className='w-full flex items-center justify-between'>
                                        <span className='px-4 py-1 bg-violet-100 text-violet-600 rounded-full'>UI Designer</span>
                                        <span>19 Jan, 2024</span>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='text-2xl font-bold'>The Future of Tech: Trends Shaping Tomorrow</h3>
                                        <p className='text-base text-neutral-700'>Technology is constantly evolving, transforming industries and reshaping the way we live, work...</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='w-11 h-11 aspect-square rounded-full overflow-hidden'>
                                        <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-bold'>Benjamin Roche</h4>
                                        <p className='text-xs'>CEO et Fondateur</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4'>
                            <div className='w-full h-56 rounded-xl overflow-hidden'>
                                <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                            </div>

                            <div className='w-full flex flex-col gap-5'>
                                <div className='w-full flex flex-col gap-4'>
                                    <div className='w-full flex items-center justify-between'>
                                        <span className='px-4 py-1 bg-violet-100 text-violet-600 rounded-full'>UI Designer</span>
                                        <span>19 Jan, 2024</span>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='text-2xl font-bold'>The Future of Tech: Trends Shaping Tomorrow</h3>
                                        <p className='text-base text-neutral-700'>Technology is constantly evolving, transforming industries and reshaping the way we live, work...</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='w-11 h-11 aspect-square rounded-full overflow-hidden'>
                                        <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-bold'>Benjamin Roche</h4>
                                        <p className='text-xs'>CEO et Fondateur</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4'>
                            <div className='w-full h-56 rounded-xl overflow-hidden'>
                                <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                            </div>

                            <div className='w-full flex flex-col gap-5'>
                                <div className='w-full flex flex-col gap-4'>
                                    <div className='w-full flex items-center justify-between'>
                                        <span className='px-4 py-1 bg-violet-100 text-violet-600 rounded-full'>UI Designer</span>
                                        <span>19 Jan, 2024</span>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='text-2xl font-bold'>The Future of Tech: Trends Shaping Tomorrow</h3>
                                        <p className='text-base text-neutral-700'>Technology is constantly evolving, transforming industries and reshaping the way we live, work...</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='w-11 h-11 aspect-square rounded-full overflow-hidden'>
                                        <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-bold'>Benjamin Roche</h4>
                                        <p className='text-xs'>CEO et Fondateur</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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

            <Footer />
        </div>
    )
}

export default BlogId