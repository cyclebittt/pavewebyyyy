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
                        <span className='px-4 py-1 bg-[#4ED83C1F] text-[#08E5D8] rounded-full'>Smart Tools</span>
                        <span className='text-white'>17 Nov, 2024</span>
                    </div>
                    <div className="text-white flex flex-col gap-6 md:gap-12 max-w-4xl">
                        <h1 className="font-medium text-3xl md:text-5xl">Stop Email Overload! How Smarter Collaboration Tools Can Save Your Sanity (and Your Team’s)</h1>
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
                        Be honest: how many unread emails are sitting in your inbox right now? If your answer is “too many to count,” you’re not alone. We’ve all been there—lost in a sea of CCs, searching for that one update buried under an avalanche of “quick check-ins.”
                    </h2>
                    <div className="flex flex-col gap-4">
                        <p className="text-neutral-600">
                            But here’s the good news: it doesn’t have to be this way. Imagine a workplace where communication is clear, organized, and dare we say, even enjoyable. At Pave, we’re on a mission to make teamwork smarter, faster, and maybe even a little fun, using tools like Slack, Asana, and SharePoint. Let’s explore how you can ditch the chaos and revolutionize the way your team collaborates.
                        </p>

                        <h3 className="font-bold text-lg md:text-xl">Why Collaboration Tools Matter</h3>
                        <p className="text-neutral-600">
                            They say, “Teamwork makes the dream work,” but try telling that to a team drowning in endless email threads. The truth is, great collaboration doesn’t happen by accident—it needs the right tools.
                        </p>
                        <p className="text-neutral-600">
                            With solutions like Slack and SharePoint, you can replace cluttered inboxes with real-time communication, organized workflows, and instant access to the information you need. The result? Fewer headaches, faster decisions, and a team that actually enjoys working together.
                        </p>

                        <h3 className="font-bold text-lg md:text-xl">Find Your Perfect Collaboration Match</h3>
                        <p className="text-neutral-600">
                            Not every tool fits every team. Picking the right one is like choosing the perfect pair of shoes—it has to fit just right. At Pave, we specialize in tailoring tools to suit your unique needs. Here’s a quick rundown of our favorites:
                        </p>
                        <ul className="list-disc pl-5 text-neutral-600">
                            <li><strong>Slack:</strong> Think of Slack as the virtual office watercooler. It keeps conversations organized in channels, integrates with apps like Google Drive and Zoom, and makes file sharing a breeze. Ideal for teams that want a communication hub they’ll actually enjoy using.</li>
                            <li><strong>Asana:</strong> When communication meets project management, magic happens. Assign tasks, track deadlines, and stay connected—all in one place. It’s like having a project manager who never takes a day off.</li>
                            <li><strong>SharePoint:</strong> For larger organizations, SharePoint is the powerhouse that keeps everything running smoothly. With robust document management and secure data sharing, it’s perfect for teams juggling complex projects and workflows.</li>
                        </ul>

                        <h3 className="font-bold text-lg md:text-xl">We Don’t Just Install Tools—We Build Confidence</h3>
                        <p className="text-neutral-600">
                            Here’s the thing: even the best tools are useless if no one knows how to use them. That’s why we go beyond setup to ensure your team feels confident and capable.
                        </p>
                        <ul className="list-disc pl-5 text-neutral-600">
                            <li><strong>Customized Setup:</strong> From organizing Slack channels to building intuitive SharePoint sites, we create systems that work for you.</li>
                            <li><strong>Seamless Integration:</strong> We connect your tools to existing platforms, so everything plays nicely together.</li>
                            <li><strong>Team Training:</strong> Whether your team is new to these tools or looking to level up, our training programs (complete with step-by-step guides and videos) have you covered.</li>
                            <li><strong>Ongoing Support:</strong> We’re here for the long haul, ready to troubleshoot, optimize, and keep everything running smoothly.</li>
                        </ul>

                        <h3 className="font-bold text-lg md:text-xl">Training: Because Everyone Needs a Little Help Sometimes</h3>
                        <p className="text-neutral-600">
                            Picture this: you’ve got your shiny new tools set up, but now your team’s staring at their screens like they’re defusing a bomb. Don’t worry, we’ve got you covered.
                        </p>
                        <ul className="list-disc pl-5 text-neutral-600">
                            <li><strong>Essentials Training:</strong> Great for beginners. We cover the basics—like managing channels, integrating apps, and getting everyone up to speed.</li>
                            <li><strong>Mastery Training:</strong> Perfect for the pros. Dive into advanced workflows, automations, and even custom bots (your team will be so efficient, you’ll wonder if they’re secretly superheroes).</li>
                        </ul>

                        <h3 className="font-bold text-lg md:text-xl">The Emotional ROI of Better Collaboration</h3>
                        <p className="text-neutral-600">
                            This isn’t just about tech—it’s about people. When communication improves, so does everything else: trust, accountability, and even morale. A team that collaborates well is a team that feels connected, empowered, and ready to take on the world (or at least the next big project).
                        </p>
                        <p className="text-neutral-600">
                            And let’s be real—fewer “lost email” arguments in your life is priceless.
                        </p>

                        <h3 className="font-bold text-lg md:text-xl">Let’s Build the Workplace of Your Dreams</h3>
                        <p className="text-neutral-600">
                            At Pave, we’re not just setting up tools; we’re setting the stage for better teamwork, stronger relationships, and measurable success. Whether you’re a startup looking for your first collaboration platform or a big player ready to upgrade, we’re here to help.
                        </p>
                        <p className="text-neutral-600">
                            So, what are you waiting for? Let’s ditch the chaos, embrace the clarity, and make teamwork your secret weapon. Together, we’ll create a workplace where every day feels a little less like work and a lot more like progress.
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