import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function TopBar() {
  return (
    <nav className='flex z-30 w-full fixed justify-between items-center px-6 py-3 bg-dark-2'>
      <Link href="/" className='flex items-center gap-4'>
        <Image alt="logoo"src="/assets/logo.svg" height={28} width={28} className=''/>
        <p className="max-xs:hidden text-light-1 text-heading3-bold">Threads</p>
      </Link>
      <div className="flex items-center ">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src="/assets/logout.svg" alt='too' width={24} height={24}/>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
         appearance={{
          baseTheme:dark,
          elements:{
            organizationSwitcherTrigger:"py-2 px-4"
          }
        }} />
      </div>
    </nav>
  )
}

export default TopBar