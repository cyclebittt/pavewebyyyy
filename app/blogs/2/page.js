import React from 'react'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Linkedin, Sun, Twitter } from 'lucide-react';
import Link from 'next/link';

const page = () => {
    return (
        <div className="font-proxima">
            <Navbar />



            <div className="px-5">
                <div className="bg-neutral-800 rounded-3xl px-5 py-8 md:p-14 flex flex-col gap-6">
                    <div className='w-full flex items-center gap-5'>
                        <span className='px-4 py-1 bg-[#4ED83C1F] text-[#08E5D8] rounded-full'>Web Developement</span>
                        <span className='text-white'>12 Oct, 2024</span>
                    </div>
                    <div className="text-white flex flex-col gap-6 md:gap-12 max-w-4xl">
                        <h1 className="font-medium text-3xl md:text-5xl">First Impressions Matter: How to Create Stunning Websites That Actually Work</h1>
                        <div className='flex items-center gap-4'>
                            <div className='w-11 h-11 aspect-square rounded-full overflow-hidden'>
                                <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='font-bold text-xl'>Leo Seitz</h4>
                                <p>CEO Pave</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 py-10">
                <div className="bg-neutral-100 rounded-3xl px-5 py-8 md:p-14 flex flex-col gap-10">
                    <h2 className="text-lg md:text-2xl font-medium">
                        You never get a second chance to make a first impression—especially online. Imagine a potential customer landing on your website. Within seconds, they’ve decided if your business feels professional, trustworthy, and worth their time. No pressure, right?
                    </h2>
                    <div className="flex flex-col gap-4">
                        <p className="text-neutral-600">
                            At Pave, we get it. Your website isn’t just a digital placeholder—it’s the heart of your online presence. That’s why we combine the artistic flair of webdesign with the strategic brilliance of UI/UX design to create sites that are visually captivating and effortlessly functional. Let’s explore how we bring your digital vision to life and keep visitors coming back for more.
                        </p>

                        <h3 className="font-bold text-lg md:text-xl">The Magic of Blending Webdesign & UI/UX</h3>
                        <p className="text-neutral-600">
                            Great webdesign makes your site beautiful. Great UI/UX design makes it usable. When you combine the two? You get a site that not only wows your audience but also keeps them engaged and converts them into loyal customers.
                        </p>
                        <ul className="list-disc pl-5 text-neutral-600">
                            <li><strong>Template Websites:</strong> Quick and affordable for businesses that need a polished online presence—fast.</li>
                            <li><strong>Custom Websites:</strong> Fully personalized designs tailored to your brand’s identity and goals.</li>
                        </ul>

                        <h3 className="font-bold text-lg md:text-xl">Template Websites: Fast, Efficient, and Professional</h3>
                        <p className="text-neutral-600">
                            Perfect for startups or small businesses, our template websites provide the perfect blend of speed and quality. Here’s what you can expect:
                        </p>
                        <ul className="list-disc pl-5 text-neutral-600">
                            <li><strong>Professional Designs:</strong> Choose from a variety of industry-specific templates that don’t look “cookie-cutter.”</li>
                            <li><strong>Brand Integration:</strong> We adapt colors, fonts, and layouts to reflect your unique identity.</li>
                            <li><strong>Responsive Design:</strong> Every site is optimized for flawless performance on mobile, tablet, and desktop.</li>
                            <li><strong>CMS Integration:</strong> Platforms like WordPress, Wix, or Squarespace empower you to update content effortlessly.</li>
                        </ul>

                        <h3 className="font-bold text-lg md:text-xl">Custom Websites: Make a Statement</h3>
                        <p className="text-neutral-600">
                            Sometimes, a template just won’t cut it—and that’s where our custom websites shine. Built from scratch, they’re designed to reflect your vision and help you stand out online.
                        </p>
                        <ul className="list-disc pl-5 text-neutral-600">
                            <li><strong>Bespoke Design:</strong> From layout to typography, every detail is tailored to your brand.</li>
                            <li><strong>Advanced Features:</strong> E-commerce platforms, member areas, dynamic animations—you dream it, we build it.</li>
                            <li><strong>Enhanced UX:</strong> Fast load times, intuitive navigation, and seamless interactivity for a world-class experience.</li>
                            <li><strong>Future-Ready:</strong> Scalable architecture that grows alongside your business.</li>
                        </ul>

                        <h3 className="font-bold text-lg md:text-xl">Why the Blend Matters: Webdesign Meets UI/UX</h3>
                        <p className="text-neutral-600">
                            A beautiful website means nothing if users can’t figure out how to navigate it. That’s why our webdesigners and UI/UX experts work together to ensure your site isn’t just pretty—it’s also practical.
                        </p>
                        <ul className="list-disc pl-5 text-neutral-600">
                            <li>Engaging Visuals to grab attention instantly.</li>
                            <li>Intuitive Navigation to guide users effortlessly.</li>
                            <li>Strategic Layouts that drive conversions.</li>
                        </ul>
                        <p className="text-neutral-600">
                            With this combination, your website becomes more than a digital brochure—it’s a tool that works for you 24/7.
                        </p>

                        <h3 className="font-bold text-lg md:text-xl">Our Process: From Vision to Launch</h3>
                        <p className="text-neutral-600">
                            We believe in a collaborative approach that turns your ideas into reality. Here’s how we do it:
                        </p>
                        <ul className="list-disc pl-5 text-neutral-600">
                            <li><strong>Initial Consultation:</strong> We start by getting to know you, your business, and your goals.</li>
                            <li><strong>Concept Development:</strong> Your vision takes shape as we create a functional and visual blueprint.</li>
                            <li><strong>Design & Development:</strong> Using cutting-edge tools, we bring your concept to life.</li>
                            <li><strong>Testing & Feedback:</strong> Every detail is reviewed to ensure flawless performance.</li>
                            <li><strong>Launch & Support:</strong> Your site goes live, and we’re here for ongoing assistance as needed.</li>
                        </ul>

                        <h3 className="font-bold text-lg md:text-xl">Why Choose Pave?</h3>
                        <p className="text-neutral-600">
                            We don’t just build websites—we craft digital experiences that make an impact.
                        </p>
                        <ul className="list-disc pl-5 text-neutral-600">
                            <li><strong>Stand Out Online:</strong> Unique designs that set you apart from competitors.</li>
                            <li><strong>User-Centric Design:</strong> A focus on functionality and seamless user journeys.</li>
                            <li><strong>Future-Ready:</strong> Scalable technologies that evolve with your business.</li>
                            <li><strong>SEO Optimization:</strong> Better rankings, more traffic, and stronger engagement.</li>
                        </ul>

                        <h3 className="font-bold text-lg md:text-xl">Ready to Build Your Digital Presence?</h3>
                        <p className="text-neutral-600">
                            At Pave, we’re passionate about creating websites that reflect the innovation and dynamism of the businesses behind them. Whether you’re looking for a sleek template site or a one-of-a-kind custom build, we’re here to make it happen.
                        </p>
                        <p className="text-neutral-600">
                            Let’s craft a digital presence that leaves a lasting impression. Ready to pave the way? Let’s <span className="font-bold">#PaveIt</span>!
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-5">
                        <p className="text-xl font-bold">Check it Out :</p>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center rounded border border-sky-500 text-sky-500 py-1 px-4 gap-2">
                                <Linkedin size={20} />Linkedin
                            </button>
                            <button className="flex items-center rounded border border-neutral-900 text-neutral-900 py-1 px-4 gap-2">
                                <Twitter size={20} />Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5">
                <div className="rounded-3xl px-0 py-8 md:p-14 flex flex-col gap-10">
                    <div className="hidden md:flex items-end justify-between">
                        <div className="flex gap-4">
                            <Sun className="min-w-[16px] pt-1" />
                            <div className="flex flex-col gap-8">
                                <h2 className="font-medium text-xl md:text-2xl">More Blogs</h2>
                                <p className="font-medium text-3xl md:text-5xl">Related Post</p>
                            </div>
                        </div>
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
                        <Link href='/blogs/1' className='flex'>
                            <div className='w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4'>
                                <div className='w-full h-56 rounded-xl overflow-hidden'>
                                    <img src="/img/blogs/1.jpg" alt="" className='w-full h-full object-cover' />
                                </div>

                                <div className='w-full flex flex-col gap-5'>
                                    <div className='w-full flex flex-col gap-4'>
                                        <div className='w-full flex items-center justify-between'>
                                            <span className='px-4 py-1 bg-violet-100 text-violet-600 rounded-full'>Content Marketing</span>
                                            <span>25 Sep, 2024</span>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h3 className='text-2xl font-bold'>Content That Converts: How to Tell Stories Your Audience Can’t Ignore</h3>
                                            <p className='text-base text-neutral-700'>Ever wonder why some content sticks with you while others feel like white noise? Here’s the secret: it’s not just about what you say—it’s how you say it. In today’s digital age, content isn’t just king—it’s the entire kingdom. It connects, captivates, and convinces.</p>
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

                    <Link href='/request' className='flex items-center justify-center'>
                        <button className="w-fit px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group">
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
                                Request cooperation
                            </span>
                            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                        </button>
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page