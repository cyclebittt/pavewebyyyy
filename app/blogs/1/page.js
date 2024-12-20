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
            <span className='px-4 py-1 bg-[#4ED83C1F] text-[#08E5D8] rounded-full'>Content Marketing</span>
            <span className='text-white'>25 Sep, 2024</span>
          </div>
          <div className="text-white flex flex-col gap-6 md:gap-12 max-w-4xl">
            <h1 className="font-medium text-3xl md:text-5xl">Content That Converts: How to Tell Stories Your Audience Can’t Ignore</h1>
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
            Ever wonder why some content sticks with you while others feel like white noise? Here’s the secret: it’s not just about what you say—it’s how you say it. In today’s digital age, content isn’t just king—it’s the entire kingdom. It connects, captivates, and convinces.
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-neutral-600">
              At Pave, we believe that great content isn’t just a one-way conversation—it’s a shared experience that sparks engagement and builds relationships. Let’s dive into the art of content creation and how we can help you craft stories that truly resonate.
            </p>

            <h3 className="font-bold text-lg md:text-xl">What Is Content Creation Really About?</h3>
            <p className="text-neutral-600">
              Content Creation is where creativity meets strategy. It’s not just about filling up a blog post or a social feed—it’s about building connections. At Pave, we take this a step further. For us, Content Creation means crafting experiences:
            </p>
            <ul className="list-disc pl-5 text-neutral-600">
              <li>Text that inspires action.</li>
              <li>Visuals that grab attention.</li>
              <li>Videos that leave a lasting impression.</li>
            </ul>
            <p className="text-neutral-600">
              Think of it as storytelling that’s designed to inform, entertain, and convert.
            </p>

            <h3 className="font-bold text-lg md:text-xl">The Secret Sauce: Creating with Purpose</h3>
            <p className="text-neutral-600">
              Here’s the thing: content without a purpose is like spaghetti without sauce—messy and unmemorable. Every piece of content we create is rooted in your brand’s identity and goals. Whether it’s a blog post, an Instagram story, or a product video, it’s all about telling your story in a way that hits home with your audience.
            </p>

            <h3 className="font-bold text-lg md:text-xl">The Elements of Exceptional Content</h3>
            <p className="text-neutral-600">
              Not all content is created equal. Here’s what we bring to the table:
            </p>
            <ul className="list-disc pl-5 text-neutral-600">
              <li>
                <strong>Text That Speaks Volumes:</strong> From witty taglines to in-depth articles, we write words that capture attention and build trust.
              </li>
              <li>
                <strong>Visuals That Pop:</strong> A picture might be worth a thousand words, but we make sure those words are impactful. Eye-catching graphics, sleek banners, and thumb-stopping social media posts are our specialty.
              </li>
              <li>
                <strong>Videos That Connect:</strong> Whether it’s a heartfelt brand story, a snappy tutorial, or a product showcase, we create videos your audience will want to share—and rewatch.
              </li>
            </ul>

            <h3 className="font-bold text-lg md:text-xl">Why Does Content Creation Matter?</h3>
            <p className="text-neutral-600">
              Here’s a fact: people buy from brands they trust. Great content builds that trust by showing your audience you understand their needs, challenges, and aspirations. It’s not just about filling up space—it’s about starting conversations and creating connections.
            </p>
            <p className="text-neutral-600">
              Done right, content is your brand’s superpower. It turns curious browsers into loyal customers and casual followers into your biggest advocates.
            </p>

            <h3 className="font-bold text-lg md:text-xl">Our Content Creation Process</h3>
            <p className="text-neutral-600">
              We don’t believe in cookie-cutter strategies. Here’s how we work:
            </p>
            <ul className="list-disc pl-5 text-neutral-600">
              <li><strong>Discovery:</strong> We dive deep into your brand—your mission, your audience, and your goals.</li>
              <li><strong>Strategy & Planning:</strong> We map out a content plan tailored to your voice and objectives.</li>
              <li><strong>Creation & Collaboration:</strong> Our team of writers, designers, and videographers bring your vision to life, with your feedback guiding every step.</li>
              <li><strong>Distribution:</strong> We optimize and share your content across the platforms that matter most to your audience.</li>
            </ul>

            <p className="text-neutral-600">
              Content isn’t about shouting into the void—it’s about creating a dialogue. Every blog post, graphic, or video is an opportunity to connect with your audience, invite engagement, and build a community.
            </p>
            <p className="text-neutral-600">
              At Pave, we see content as more than just marketing—it’s the bridge between your brand and the people who believe in it.
            </p>

            <h3 className="font-bold text-lg md:text-xl">Ready to Create Stories That Matter?</h3>
            <p className="text-neutral-600">
              If you’re tired of content that falls flat, we’re here to help. Whether you need a full-blown content strategy or just a little boost for your next campaign, we’ve got your back.
            </p>
            <p className="text-neutral-600">
              Let’s craft stories that inspire, visuals that captivate, and videos that convert. Together, we’ll pave the way to your brand’s success.
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