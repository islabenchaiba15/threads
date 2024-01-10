import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import React from 'react'


async function page() {
   
  
    const user =await currentUser();
    if(!user) return null;
    const userInfo=await fetchUser(user.id);
  return (
    <>
        <h1 className='text-white head-text'>
            create thread
        </h1>
        <PostThread userId={userInfo._id}/>
    </>
 
  )
}

export default page