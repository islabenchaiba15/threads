import ThreadCard from "@/components/cards/ThreadCard"
import { fetchPosts } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs";

 
export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const result = await fetchPosts(1,30)
  return (
    <>
      <h1 className=" head-text">
        home
      </h1>
    <section className="mt-9 flex flex-col gap-10">
      {result.posts.length===0 ? (
        <p className="no-result">no threads found</p>  
    ):(
      <>
        {result.posts.map((post)=>(
          <ThreadCard
              key={post.id}
              id={post._id}
              currentUserId={user?.id ||""}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
           />
        ))}
      </>
    )}
    </section>
    </>
  )
}