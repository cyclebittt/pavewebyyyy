import React from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Linkedin, Sun, Twitter } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="font-proxima">
      <Navbar />

      <div className="px-5">
        <div className="bg-neutral-800 rounded-3xl px-5 py-8 md:p-14 flex flex-col gap-6">
          <div className="w-full flex items-center gap-5">
            <span className="px-4 py-1 bg-[#4ED83C1F] text-[#08E5D8] rounded-full">
              Market Strategy
            </span>
            <span className="text-white">18 Dec, 2025</span>
          </div>
          <div className="text-white flex flex-col gap-6 md:gap-12 max-w-4xl">
            <h1 className="font-medium text-3xl md:text-5xl">
              Your Brand, Your Story: How to Stand Out in a Crowded Market
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 aspect-square rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-xl">Leo Seitz</h4>
                <p>CEO Pave</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-10">
        <div className="bg-neutral-100 rounded-3xl px-5 py-8 md:p-14 flex flex-col gap-10">
          <h2 className="text-lg md:text-2xl font-medium">
            Imagine walking into a crowded room filled with competitors—and all
            eyes are on you. Why? Because your brand doesn’t just exist—it owns
            the space. It speaks volumes about who you are, what you stand for,
            and why you’re unforgettable.
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-neutral-600">
              At Pave, we believe branding isn’t just about looking good. It’s
              about creating an emotional connection with your audience, telling
              your story in a way that resonates, and making a lasting
              impression. Let’s dive into how a powerful Branding & Identity
              strategy sets the stage for your business success.
            </p>

            <h3 className="font-bold text-lg md:text-xl">
              What Is Branding & Why Does It Matter?
            </h3>
            <p className="text-neutral-600">
              Branding is more than just a logo or a color palette—it’s the soul
              of your business. It’s the way people feel when they see your
              name, the trust you build through consistency, and the memories
              you create with every interaction.
            </p>
            <p className="text-neutral-600">Think of your brand as:</p>
            <ul className="list-disc pl-5 text-neutral-600">
              <li>
                <strong>Your Handshake:</strong> The first impression that
                lingers long after the introduction.
              </li>
              <li>
                <strong>Your Promise:</strong> A reflection of your values and
                what customers can expect from you.
              </li>
              <li>
                <strong>Your Personality:</strong> The tone of voice, style, and
                visuals that set you apart from the rest.
              </li>
            </ul>
            <p className="text-neutral-600">
              When done right, your brand becomes your most valuable asset,
              fostering loyalty, enhancing recognition, and driving long-term
              success.
            </p>

            <h3 className="font-bold text-lg md:text-xl">
              Crafting a Brand That Feels Like You
            </h3>
            <p className="text-neutral-600">
              Every business has a unique story to tell, and our mission is to
              help you tell it with clarity and confidence. At Pave, we go
              beyond visuals to craft a brand identity that captures your
              essence and connects with your audience.
            </p>
            <p className="text-neutral-600">
              Here’s what goes into creating your one-of-a-kind brand
              personality:
            </p>
            <ul className="list-disc pl-5 text-neutral-600">
              <li>
                <strong>A Color Palette That Speaks Volumes:</strong> Whether
                it’s calm and trustworthy blues or bold and energetic reds,
                colors set the emotional tone for your brand.
              </li>
              <li>
                <strong>Typography That Matches Your Vibe:</strong> Elegant
                scripts for sophistication? Clean sans-serif fonts for
                innovation? Every detail matters.
              </li>
              <li>
                <strong>A Logo That’s Instantly Recognizable:</strong> Your logo
                is more than a design—it’s your brand’s signature and calling
                card.
              </li>
            </ul>

            <h3 className="font-bold text-lg md:text-xl">
              The Pave Process: Bringing Your Brand to Life
            </h3>
            <p className="text-neutral-600">
              Creating a memorable brand doesn’t happen by accident. We take a
              structured, strategic approach to ensure every element aligns with
              your goals and values.
            </p>
            <ol className="list-decimal pl-5 text-neutral-600">
              <li>
                <strong>Discover:</strong> We start by listening—deeply. What
                are your business’s goals? Who is your audience? What makes you
                unique?
              </li>
              <li>
                <strong>Strategize:</strong> Next, we define your mission,
                vision, and unique selling proposition, creating the foundation
                for your brand identity.
              </li>
              <li>
                <strong>Design:</strong> Collaborating with top designers, we
                craft logos, color palettes, typography, and marketing templates
                that embody your brand.
              </li>
              <li>
                <strong>Deliver:</strong> We provide everything you need for
                consistency—logos, social media templates, and detailed brand
                guidelines.
              </li>
            </ol>

            <h3 className="font-bold text-lg md:text-xl">
              Why Consistency Is Key
            </h3>
            <p className="text-neutral-600">
              Here’s a little-known branding truth: Repetition builds
              recognition. Consistency across all touchpoints—your website,
              social media, and marketing materials—cements your identity in
              your audience’s minds.
            </p>
            <p className="text-neutral-600">
              Think about the brands you love most. Whether it’s their
              unmistakable logo or their signature tone of voice, you recognize
              them instantly. That’s the power of consistency, and we’ll help
              you achieve it.
            </p>

            <h3 className="font-bold text-lg md:text-xl">
              Ready to Create a Brand That Turns Heads?
            </h3>
            <p className="text-neutral-600">
              At Pave, we’re passionate about building brands that tell
              authentic stories, create emotional connections, and leave lasting
              impressions. Whether you’re launching something new or breathing
              life into an existing brand, we’re here to help.
            </p>
            <p className="text-neutral-600">Let’s create a brand that:</p>
            <ul className="list-disc pl-5 text-neutral-600">
              <li>Captures attention in a crowded market.</li>
              <li>Builds trust with your audience.</li>
              <li>Stands the test of time.</li>
            </ul>
            <p className="text-neutral-600">
              Are you ready to make your mark? Let’s #PaveIt and build a brand
              that’s as unforgettable as the business behind it.
            </p>
          </div>

          <Link href="/request" className="flex items-center justify-center">
            <button className="w-fit px-4 py-2 bg-neutral-800 text-white rounded-full font-semibold border-2 border-neutral-800 relative overflow-hidden transition-all duration-500 ease-out group">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-neutral-800">
                Request cooperation
              </span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            </button>
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-5">
            <p className="text-xl font-bold">Check it Out :</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center rounded border border-sky-500 text-sky-500 py-1 px-4 gap-2">
                <Linkedin size={20} />
                Linkedin
              </button>
              <button className="flex items-center rounded border border-neutral-900 text-neutral-900 py-1 px-4 gap-2">
                <Twitter size={20} />
                Twitter
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
              <h2 className="font-medium text-xl md:text-2xl text-center">
                More Blogs
              </h2>
            </div>
            <p className="font-medium text-3xl md:text-5xl text-center">
              Related Post
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link href="/blogs/1" className="flex">
              <div className="w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4">
                <div className="w-full h-56 rounded-xl overflow-hidden">
                  <img
                    src="/img/blogs/1.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex items-center justify-between">
                      <span className="px-4 py-1 bg-violet-100 text-violet-600 rounded-full">
                        Content Marketing
                      </span>
                      <span>25 Sep, 2024</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold">
                        Content That Converts: How to Tell Stories Your Audience
                        Can’t Ignore
                      </h3>
                      <p className="text-base text-neutral-700">
                        Ever wonder why some content sticks with you while
                        others feel like white noise? Here’s the secret: it’s
                        not just about what you say—it’s how you say it. In
                        today’s digital age, content isn’t just king—it’s the
                        entire kingdom. It connects, captivates, and convinces.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-11 h-11 aspect-square rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">Leon Seitz</h4>
                      <p className="text-xs">CEO Pave</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/blogs/2" className="flex">
              <div className="w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4">
                <div className="w-full h-56 rounded-xl overflow-hidden">
                  <img
                    src="/img/blogs/2.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex items-center justify-between">
                      <span className="px-4 py-1 bg-violet-100 text-violet-600 rounded-full">
                        Web Developement
                      </span>
                      <span>12 Oct, 2024</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold">
                        First Impressions Matter: How to Create Stunning
                        Websites That Actually Work
                      </h3>
                      <p className="text-base text-neutral-700">
                        You never get a second chance to make a first
                        impression—especially online. Imagine a potential
                        customer landing on your website. Within seconds,
                        they’ve decided if your business feels professional,
                        trustworthy, and worth their time. No pressure, right?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-11 h-11 aspect-square rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">Leon Seitz</h4>
                      <p className="text-xs">CEO Pave</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/blogs/3" className="flex">
              <div className="w-full shadow-lg bg-white rounded-xl p-3 flex flex-col gap-4">
                <div className="w-full h-56 rounded-xl overflow-hidden">
                  <img
                    src="/img/blogs/3.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex items-center justify-between">
                      <span className="px-4 py-1 bg-violet-100 text-violet-600 rounded-full">
                        Smart Tools
                      </span>
                      <span>17 Nov, 2024</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold">
                        Stop Email Overload! How Smarter Collaboration Tools Can
                        Save Your Sanity (and Your Team’s)
                      </h3>
                      <p className="text-base text-neutral-700">
                        Be honest: how many unread emails are sitting in your
                        inbox right now? If your answer is “too many to count,”
                        you’re not alone. We’ve all been there—lost in a sea of
                        CCs, searching for that one update buried under an
                        avalanche of “quick check-ins.”
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-11 h-11 aspect-square rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">Leon Seitz</h4>
                      <p className="text-xs">CEO Pave</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
