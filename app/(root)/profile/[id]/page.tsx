import ThreadCard from '@/components/cards/ThreadCard'
import { fetchPosts, fetchThreadByAuthorId } from '@/lib/actions/thread.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { userInfo } from 'os'
import React from 'react'

async function page({ params }: { params: { id: string } }) {
    const user = await currentUser();
    if(!user) return null;
    const userInfo = await fetchUser(params.id)
    const threads = await fetchThreadByAuthorId(userInfo._id)

  return (
    <div className='text-white'>
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-5 ">
                <div className="relative h-24 w-24">
                    <Image 
                    src={userInfo.image} 
                    alt="profile"
                    fill 
                    className="rounded-full cursor-pointer"
                    />
                </div>
                <div className=" items-center">
                    <h1 className="text-light-2 text-heading3-bold">{userInfo.name}</h1>
                    <p className="text-gray-500 small-medium">{userInfo.username}</p>
                </div>
            </div>
            <div className="p-6">
                <p className="text-light-2 text-small-medium">{userInfo.bio}</p>
            </div>
        </div> 
        <div className="mt-10 bg-dark-4 rounded-xl">
            <div className="flex flex-row justify-between items-center">
                <Link href={'/threads'} className='flex flex-row  gap-4 justify-between items-center p-3'>
                    <Image
                    src={'/assets/reply.svg'}
                    alt='threads'
                    height={48}
                    width={48}
                    className=''
                    />
                    <h1 className="text-light-1 text-small-medium max-sm:hidden">Threads</h1>
                    <h1 className="px-3 py-1 rounded-md w-fit bg-gray-800">5</h1>
                </Link>
                <Link href={'/threads'} className='flex flex-row  gap-4 justify-between items-center p-3'>
                    <Image
                    src={'/assets/members.svg'}
                    alt='replies'
                    height={48}
                    width={48}
                    className=''
                    />
                    <h1 className="text-light-1 text-small-medium max-sm:hidden">replies</h1>
                    <h1 className="px-3 py-1 rounded-xl w-fit bg-gray-800">5</h1>
                </Link>
                <Link href={'/threads'} className='flex flex-row gap-4 justify-between items-center p-3'>
                    <Image
                    src={'/assets/tag.svg'}
                    alt='tag'
                    height={48}
                    width={48}
                    className=''
                    />
                    <h1 className="text-light-1 text-small-medium max-sm:hidden">tags</h1>
                    <h1 className="px-3 py-1 rounded-xl w-fit bg-gray-800">5</h1>
                </Link>
            </div>
        </div>
        <div className="mt-10">
            {threads.map((thread)=>(
            <div className="py-4">
                 <ThreadCard
                 key={thread._id}
                id={thread._id}
                currentUserId={user.id}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
            />   
            </div>        
            ))}
        </div>
    </div>
  )
}

export default page