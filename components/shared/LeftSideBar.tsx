'use client'
import Link from 'next/link'
import React from 'react'
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';

function LeftSideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const {userId} = useAuth()
  return (
    <section className="custom-scrollbar sticky flex flex-col h-screen justify-between w-fit  border-r border-r-dark-4 overflow-auto bg-dark-2 pb-5 pt-28 max-sm:hidden">
      <div className='flex flex-col justify-between px-6 flex-1'>
      <div className="">
        {sidebarLinks.map(link =>{
          const isActive=(pathname.includes(link.route) && link.route.length>1) || pathname===link.route;
          if (link.route==='/profile') {link.route=`${link.route}/${userId}`}
        return(
          
            <Link href={link.route} key={link.label} className={`relative flex justify-start gap-4 p-4 rounded-lg ${isActive && 'bg-primary-500'}`}>
              <Image src={link.imgURL} alt='ooo' width={20} height={20}/>
              <p className="text-light-1 hidden lg:inline">{link.label}</p>
            </Link>
        )})}
         </div>
           <div className="mt-10 px-4">
            <SignedIn>
                <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
                  <div className="flex cursor-pointer gap-4">
                    <Image src="/assets/logout.svg" alt='too' width={24} height={24}/>
                    <p className="text-light-2 hidden lg:inline">logout</p>
                  </div>
                </SignOutButton>
              </SignedIn>
           </div>
      </div>
    </section>
  )
}

export default LeftSideBar