'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
interface Props{
    id: string
    name: string
    username: string
    imgUrl: string
    personType: string
}
function UserCard({
    id,
    name,
    username,
    imgUrl,
    personType,
}:Props) {
    const router = useRouter();
  return (
    <div className='flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center'>
        <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
            <Image
                src={imgUrl}
                alt="logo"
                width={48}
                height={48}
                className="rounded-full"
            />
            <div className="flex-1 text-ellipsis">
                <h4 className="text-heading3-bold text-light-1">
                    {name}
                </h4>
                <p className="text-base-semibold text-gray-1">
                    @{username}
                </p>
            </div>
        </div>
        <Button className=' min-w-[70px] rounded-lg bg-primary-500 text-[14px] text-light-1' onClick={()=>router.push(`/profile/${id}`)}>
            View
        </Button>
    </div>
  )
}

export default UserCard