'use client'

import CalendlyEmbed from '@/components/contact/CalendlyEmbed';
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Calendar, Check, Clock, Edit, Hourglass } from 'lucide-react';
import React, { useState } from 'react'
import { InlineWidget } from 'react-calendly';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import "react-day-picker/style.css";

const Request = () => {
    const [step, setStep] = useState(1);
    const defaultClassNames = getDefaultClassNames();
    const [slot, setSlot] = useState({ date: '', time: '', duration: '' });
    const [details, setDetails] = useState({ fname: '', lname: '', email: '', company: '', whatsapp: '', message: '', notification: false })

    const nextStep = () => {
        if (slot.date && slot.time && slot.duration) setStep(step + 1);
        else alert('Please fill all the details')
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Slot:', slot);
        console.log('Details:', details);
    };

    return (
        <div className="font-proxima">
            <Navbar />

            {/* <div className="p-5 md:px-20 md:py-10 flex flex-col items-center justify-center gap-10">
                <div className='flex flex-col items-center'>
                    <div className='flex items-center gap-0 md:gap-8'>
                        <div className='flex flex-col items-center gap-2'>
                            <span className={`border-4 border-[#6200EE] font-semibold w-12 text-lg aspect-square rounded-full flex items-center justify-center ${step === 2 && 'bg-[#6200EE] text-white'}`}>01</span>
                            <span className={`font-semibold flex items-center justify-center text-center ${step === 1 && 'text-[#6200EE]'}`}>Choose Slot</span>
                        </div>
                        <span className={`w-40 md:w-72 h-1 mb-12 sm:mb-6 ${step === 1 ? 'bg-[#A1AEBE]' : 'bg-[#6200EE]'}`}></span>
                        <div className='flex flex-col items-center gap-2'>
                            <span className={`border-4 font-semibold w-12 text-lg aspect-square rounded-full flex items-center justify-center ${step === 2 ? 'border-[#6200EE]' : 'border-[#A1AEBE]'}`}>02</span>
                            <span className={`font-semibold flex items-center justify-center text-center ${step === 2 ? 'text-[#6200EE]' : 'text-[#A1AEBE]'}`}>Enter Details</span>
                        </div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="bg-neutral-100 rounded-3xl p-5 flex flex-col md:flex-row gap-10 w-full">
                        <div className='p-8 bg-neutral-800 rounded-2xl flex flex-col items-center gap-8'>
                            <div className='flex w-full items-center gap-4'>
                                <div className='w-12 h-12 aspect-square rounded-full overflow-hidden'>
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                                </div>
                                <div className='flex flex-col text-white'>
                                    <p>Meet With</p>
                                    <h4 className='font-bold text-xl'>Badal Kumar</h4>
                                </div>
                            </div>
                            <div className='scale-[.8] sm:scale-100'>
                                <DayPicker
                                    mode="single"
                                    selected={slot.date}
                                    onSelect={(date) => setSlot({ ...slot, date })}
                                    hideWeekdays
                                    classNames={{
                                        today: `bg-[#6200EE5B] border-none rounded-xl`,
                                        selected: `bg-[#6200EE] border-none rounded-xl text-white`,
                                        root: `${defaultClassNames.root} text-[#999]`,
                                        chevron: `fill-neutral-300 size-4`,
                                        month_caption: `text-white text-lg pt-3`,
                                        month_grid: `${defaultClassNames.root} mt-4 max-w-full`
                                    }}
                                />
                            </div>
                        </div>

                        <div className='w-full flex flex-col gap-9'>
                            <div className='flex flex-col gap-7'>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-xl font-bold text-[#4d4d4d] text-center md:text-left'>How long do you need?</p>
                                    <div className='grid grid-cols-3 w-fit divide-x border rounded-full overflow-hidden'>
                                        <p
                                            className={`cursor-pointer py-2 w-28 text-center font-medium flex items-center justify-center gap-2 ${slot.duration === '15 mins' ? 'bg-gray-300' : ''}`}
                                            onClick={() => setSlot({ ...slot, duration: '15 mins' })}
                                        >
                                            {slot.duration === '15 mins' && <Check size={18} />} 15 mins
                                        </p>
                                        <p
                                            className={`cursor-pointer py-2 w-28 text-center font-medium flex items-center justify-center gap-2 ${slot.duration === '30 mins' ? 'bg-gray-300' : ''}`}
                                            onClick={() => setSlot({ ...slot, duration: '30 mins' })}
                                        >
                                            {slot.duration === '30 mins' && <Check size={18} />} 30 mins
                                        </p>
                                        <p
                                            className={`cursor-pointer py-2 w-28 text-center font-medium flex items-center justify-center gap-2 ${slot.duration === '1 hr' ? 'bg-gray-300' : ''}`}
                                            onClick={() => setSlot({ ...slot, duration: '1 hr' })}
                                        >
                                            {slot.duration === '1 hr' && <Check size={18} />} 1 hr
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-center md:items-start gap-2'>
                                    <p className='text-xl font-bold text-[#4d4d4d]'>What time works best?</p>
                                    <div className='flex items-center gap-2 text-xl'>
                                        <p>Selected Date</p>
                                        <p className='font-bold'>
                                            {slot.date ? slot.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No date selected'}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2 w-full'>
                                    <p className='text-xl font-bold text-[#4d4d4d]'>What time slot are you available?</p>
                                    <div className='grid grid-cols-3 gap-2'>
                                        {['10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '05:00 pm', '06:00 pm', '07:00 pm'].map((time) => (
                                            <p
                                                key={time}
                                                className={`border py-2 text-center rounded-xl cursor-pointer ${slot.time === time ? 'bg-gray-300' : ''}`}
                                                onClick={() => setSlot({ ...slot, time })}
                                            >
                                                {time}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex justify-end'>
                                <button
                                    className="w-fit px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group"
                                    onClick={nextStep}
                                >
                                    <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
                                        Next
                                    </span>
                                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {step === 2 && (
                    <div className="bg-neutral-100 rounded-3xl p-5 flex flex-col md:flex-row gap-10 w-full">
                        <div className='p-8 w-full md:max-w-[384px] text-white bg-neutral-800 rounded-2xl flex flex-col gap-8'>
                            <div className='flex w-full items-center gap-4'>
                                <div className='w-12 h-12 aspect-square rounded-full overflow-hidden'>
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
                                </div>
                                <div className='flex flex-col text-white'>
                                    <p>Meet With</p>
                                    <h4 className='font-bold text-xl'>Badal Kumar</h4>
                                </div>
                            </div>
                            <div className='flex gap-4 justify-between'>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex items-center gap-4'><Hourglass size='18' /> {slot.duration}</div>
                                    <div className='flex items-center gap-4'><Calendar size='18' /> {slot.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                    <div className='flex items-center gap-4'><Clock size='18' /> {slot.time}</div>
                                </div>
                                <Edit size='20' className='cursor-pointer' onClick={prevStep} />
                            </div>
                        </div>

                        <div className='w-full flex flex-col gap-9'>
                            <div className='flex flex-col gap-5'>
                                <p className='text-xl font-semibold text-center md:text-left'>Your Information</p>
                                <div className='flex flex-col gap-5'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-medium'>First Name*</label>
                                            <input
                                                type="text"
                                                className='border bg-white p-2 rounded-xl outline-none'
                                                value={details.fname}
                                                onChange={(e) => setDetails({ ...details, fname: e.target.value })}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-medium'>Last Name*</label>
                                            <input
                                                type="text"
                                                className='border bg-white p-2 rounded-xl outline-none'
                                                value={details.lname}
                                                onChange={(e) => setDetails({ ...details, lname: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 gap-4'>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-medium'>Your Email*</label>
                                            <input
                                                type="email"
                                                className='border bg-white p-2 rounded-xl outline-none'
                                                value={details.email}
                                                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-medium'>Company Name*</label>
                                            <input
                                                type="text"
                                                className='border bg-white p-2 rounded-xl outline-none'
                                                value={details.company}
                                                onChange={(e) => setDetails({ ...details, company: e.target.value })}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-medium'>Whatsapp Number*</label>
                                            <input
                                                type="tel"
                                                className='border bg-white p-2 rounded-xl outline-none'
                                                value={details.whatsapp}
                                                onChange={(e) => setDetails({ ...details, whatsapp: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 gap-4'>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-medium'>Any Message</label>
                                            <textarea
                                                rows='4'
                                                className='border bg-white p-2 rounded-xl outline-none'
                                                value={details.message}
                                                onChange={(e) => setDetails({ ...details, message: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 gap-4'>
                                        <div className='flex gap-2 items-start'>
                                            <input
                                                type="checkbox"
                                                className='appearance-none mt-1 min-w-4 h-4 border-2 border-[#6200ee] rounded cursor-pointer checked:bg-[#6200ee] checked:border-transparent'
                                                checked={details.notification}
                                                onChange={(e) => setDetails({ ...details, notification: e.target.checked })}
                                            />
                                            <label className='text-[#6a6a6a] font-medium'>
                                                You can unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex items-center gap-4 justify-end'>
                                <button
                                    className="w-fit px-4 py-2 rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group"
                                    onClick={prevStep}
                                >
                                    <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
                                        Back
                                    </span>
                                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                </button>
                                <button
                                    className="w-fit px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group"
                                    onClick={handleSubmit}
                                >
                                    <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
                                        Confirm
                                    </span>
                                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div> */}

            <div className="p-5 md:px-20 flex flex-col items-center justify-center gap-10">
                {/* <h1>Schedule an Appointment</h1> */}
                <CalendlyEmbed url="https://calendly.com/leonseitz-paveconsultings/30min?hide_gdpr_banner=1&primary_color=8133f1" />
                {/* <InlineWidget url="https://calendly.com/hellodeepakkumar12/30min" /> */}
            </div>

            <Footer />
        </div>
    )
}

export default Request