import UserCard from '@/components/cards/UserCard';
import { fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image';
import React from 'react'

async function page() {
    const user = await currentUser();
    if(!user) return null
    const results =await fetchUsers({
        userId:user.id,
        searchString:'',
        pageNumber:1,
        pageSize:25,
    })
    console.log("islaaaaam")
    console.log(results.users)
  return (
    <section>
        <div className="head-text mb-10">
            <div className="">Search</div>
            <div className="mt-5 gap-5 flex bg-dark-4 w-full p-3" >
                <Image 
                src={"/assets/search.svg"}
                alt="search"
                width={24}
                height={24}
                className=""
                />
                <p className="text-gray-1 text-small-regular">search communties</p>
            </div>
           <div className="mt-14 flex flex-col gap-9">
            {results.users.length===0 ? (
                <p className="no-result">no users</p>
            ):(
                <>
                    {results.users.map((person)=>(
                        <UserCard
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        username={person.username}
                        imgUrl={person.image}
                        personType='User'
                        />
                    ))}
                </>
            )}
           </div>
        </div>
    </section>
  )
}

export default page