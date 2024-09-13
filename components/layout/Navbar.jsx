'use client'

import { AlignRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative'>
      <nav className='z-50 bg-white font-proxima flex items-center justify-between gap-10 px-5 md:px-20 py-5'>
        <div className='w-28'>
          <Image src='/img/logo.png' width={500} height={500} alt='logo' className='w-full h-full' />
        </div>

        <div className='font-medium text-neutral-600 hidden md:flex items-center gap-10'>
          <div className='relative group'>
            <Link href={'/about'}>About</Link>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
          <div className='relative group'>
            <Link href={'/pages'}>Pages</Link>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
          <div className='relative group'>
            <Link href={'/blogs'}>Blogs</Link>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
          <div className='relative group'>
            <Link href={'/templates'}>Templates</Link>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>

        <button className="hidden md:block px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group">
          <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
            Request Operation
          </span>
          <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
        </button>

        <button className='flex md:hidden oultine-none border-none' onClick={() => setOpenMobileMenu(!openMobileMenu)}>
          <AlignRight size={28} />
        </button>
      </nav>

      <div
        ref={menuRef}
        className={`absolute top-0 left-0 w-full bg-white font-medium text-neutral-600 md:hidden flex flex-col gap-4 transition-transform duration-500 ease-in-out ${openMobileMenu ? 'translate-y-16' : '-translate-y-full'} z-20`}
      >
        <div className='w-fit relative group px-5 py-2'>
          <Link href='/about'>About</Link>
          <div className="absolute bottom-1 left-5 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
        <div className='w-fit relative group px-5 py-2'>
          <Link href='/pages'>Pages</Link>
          <div className="absolute bottom-1 left-5 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
        <div className='w-fit relative group px-5 py-2'>
          <Link href='/blogs'>Blogs</Link>
          <div className="absolute bottom-1 left-5 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
        <div className='w-fit relative group px-5 py-2'>
          <Link href='/templates'>Templates</Link>
          <div className="absolute bottom-1 left-5 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar