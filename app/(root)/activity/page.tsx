import ThreadCard from "@/components/cards/ThreadCard"
import { fetchPosts } from "@/lib/actions/thread.actions"
import { fetchActivity, fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

 
export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id)
  const activities = await fetchActivity(userInfo._id)
  console.log(activities)
  return (
    <section>
      <h1 className=" head-text">
        Activity
      </h1>
      <div className="mt-10 flex flex-col gap-5  rounded-2xl ">
        {fetchActivity.length>0 ?(
          <>
          {activities.map((activity)=>(
            <Link key={activity._id} href={`/thread/${activity.parentId}`} className="flex gap-5 items-center bg-dark-4 p-6 rounded-xl">
                <Image
                src={activity.author.image}
                alt="profile"
                width={48}
                height={48}
                className="rounded-full object-cover"
                />
                <p className="text-base-regular text-light-1">
                  <span className="mt-1 text-primary-500">
                    {activity.author.name}
                  </span>
                  {" "}
                     has commented to your thread
                </p>
            </Link>
          ))}
          </>
        ):(
          <p className="text-head">no activity yet</p>
        )}
      </div>
    </section>
  )
}