'use client'
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

function ButtomBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="fixed bottom-0 z-10 w-full bg-dark-2 p-4 xs:px-7 sm:hidden ">
      <div className="flex items-center justify-between gap-1 xs:gap-1 ">
        {sidebarLinks.map(link =>{
            const isActive=(pathname.includes(link.route) && link.route.length>1) || pathname===link.route;
          return(
            <Link href={link.route} key={link.label} className={`flex flex-col justify-between items-center gap-2 p-2 rounded-lg sm:flex-1 ${isActive && 'bg-primary-500'}`}>
              <Image src={link.imgURL} alt='ooo' width={20} height={20}/>
              <p className="text-light-1 text-subtle-medium ">{link.label.split(' ')[0]}</p>
            </Link>
          )})}
      </div>
    </section>
  )
}

export default ButtomBar