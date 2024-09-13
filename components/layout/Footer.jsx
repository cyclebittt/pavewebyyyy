'use client'

import { ArrowUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div className='pt-14 relative'>
            <button className='absolute group left-1/2 -translate-x-1/2 top-0 w-24 h-24 aspect-square flex items-center justify-center border-white border-[12px] bg-violet-600 text-white rounded-full'>
                <ArrowUp size={40} className='transition-all duration-300 ease-out group-hover:mb-4' />

                <div className='absolute top-[44px] -left-[38px] w-[40px] h-[40px] rounded-tr-[40px] aspect-square bg-neutral-800  shadow-[0px_-20px_0px_0px_white]'></div>
                <div className='absolute top-[44px] -right-[38px] w-[40px] h-[40px] rounded-tl-[40px] aspect-square bg-neutral-800  shadow-[0px_-20px_0px_0px_white]'></div>
            </button>

            <div className="bg-neutral-800 rounded-t-3xl py-14 md:py-16 px-5 md:px-20 flex flex-col gap-14">
                <div data-aos="fade-up" data-aos-duration="500" className='flex flex-col md:flex-row gap-6 items-center justify-between md:justify-between'>
                    <h2 className="font-medium text-white text-center text-3xl md:text-4xl max-w-xs">Have something to talk about ?</h2>

                    <button className="px-4 py-2 bg-white rounded-full font-semibold border-2 border-white relative overflow-hidden transition-all duration-500 ease-out group">
                        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                            Book an Appointment
                        </span>
                        <div className="absolute inset-0 bg-neutral-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                    </button>
                </div>

                <div data-aos="fade-up" data-aos-duration="500" className='flex flex-col md:flex-row gap-14 md:gap-6 items-center justify-between md:justify-between'>
                    <div className='flex flex-wrap items-center justify-center gap-6 text-white'>
                        <button className='w-fit px-5 py-3 border border-white bg-none rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-neutral-800'>About</button>
                        <button className='w-fit px-5 py-3 border border-white bg-none rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-neutral-800'>Services</button>
                        <button className='w-fit px-5 py-3 border border-white bg-none rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-neutral-800'>Testimonials</button>
                        <button className='w-fit px-5 py-3 border border-white bg-none rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-neutral-800'>Contact Us</button>
                    </div>

                    <div className='flex items-center justify-center flex-col gap-5'>
                        <div className='w-28'>
                            <Image src='/img/logo.png' width={500} height={500} alt='logo' className='w-full h-full invert' />
                        </div>
                        <p className='text-white'>© Copyright 2024, All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer