'use client'

import { AlignRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const path = usePathname()
  const pathname = path.split('/')[1];

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setOpenMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative'>
      <div className='py-4 w-full px-5 overflow-x-hidden text-center text-sm md:text-base font-medium flex items-center justify-center bg-[#FFDC67] text-neutral-900'>
        <div className='scroll-text'>
          🎊 Celebrate with Pave: Enjoy 20% Off Every Service!
          {/* Your Path to the Digital Future Starts Here - */}
        </div>
      </div>

      <nav className='relative z-50 bg-white font-proxima flex items-center justify-between gap-10 px-5 md:px-20 py-5'>
        <Link href={'/'}>
          <div className='flex items-center gap-3'>
            <Image src='/img/logoc.png' width={500} height={500} alt='logo' className='w-7' />
          </div>
        </Link>

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-neutral-600 hidden md:flex items-center gap-10'>
          <div className='relative group'>
            <Link href={'/'}>Home</Link>
            <div className={`absolute -bottom-1 left-0 ${pathname === '' ? 'w-full ' : 'w-0'} h-[3px] bg-neutral-500 transition-all duration-500 group-hover:w-full`}></div>
          </div>
          <div className='relative group'>
            <Link href={'/about'}>About</Link>
            <div className={`absolute -bottom-1 left-0 ${pathname === 'about' ? 'w-full ' : 'w-0'} h-[3px] bg-neutral-500 transition-all duration-500 group-hover:w-full`}></div>
          </div>
          <div className='relative group'>
            <Link href={'/blogs'}>Blogs</Link>
            <div className={`absolute -bottom-1 left-0 ${pathname === 'blogs' ? 'w-full ' : 'w-0'} h-[3px] bg-neutral-500 transition-all duration-500 group-hover:w-full`}></div>
          </div>
          <div className='relative group'>
            <Link href={'/contact'}>Contact Us</Link>
            <div className={`absolute -bottom-1 left-0 ${pathname === 'contact' ? 'w-full ' : 'w-0'} h-[3px] bg-neutral-500 transition-all duration-500 group-hover:w-full`}></div>
          </div>
        </div>

        <Link href='/request'>
          <button className="hidden md:block px-4 py-2 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-all duration-500 ease-out group">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-violet-700">
              Request cooperation
            </span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
          </button>
        </Link>

        <button
          ref={buttonRef}
          className='flex md:hidden oultine-none border-none'
          onClick={(e) => {
            e.stopPropagation();
            setOpenMobileMenu(!openMobileMenu);
          }}
        >
          {openMobileMenu ? <X size={28} /> : <AlignRight size={28} />}
        </button>
      </nav>

      <div
        ref={menuRef}
        className={`absolute top-0 left-0 w-full pb-3 bg-white font-medium text-neutral-600 md:hidden flex flex-col gap-4 transition-transform duration-500 ease-in-out ${openMobileMenu ? 'translate-y-16' : '-translate-y-full'} z-20`}
      >
        <div className='w-fit relative group px-5 py-2'>
          <Link href='/'>Home</Link>
          <div className="absolute bottom-1 left-5 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
        <div className='w-fit relative group px-5 py-2'>
          <Link href='/about'>About</Link>
          <div className="absolute bottom-1 left-5 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
        <div className='w-fit relative group px-5 py-2'>
          <Link href='/blogs'>Blogs</Link>
          <div className="absolute bottom-1 left-5 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
        <div className='w-fit relative group px-5 py-2'>
          <Link href='/contact'>Contact Us</Link>
          <div className="absolute bottom-1 left-5 w-0 h-[2px] bg-neutral-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar