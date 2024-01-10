import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface params{
    id:string
    currentUserId:string
    parentId:string | null
    content:string
    author:{
        name:string
        image:string
        id:string
    }
    community:{
        id:string
        name:string
        image:string
    } | null
    createdAt:string
    comments:{
        author:{
            image:string
        }
    }[]
    isComment?:boolean
}
function ThreadCard({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment
}:params
) {
  return (
    <article className={`p-5 w-ful rounded-xl ${isComment ? 'px-0 xs:px-7' :'bg-dark-4 p-8'} `}>
        <div className="flex flex-row gap-4 flex-1 items-start">
            <div className="flex flex-col ">
                <Link href={`/profile/${author.id}`} className='w-11 h-11 relative '>
                    <Image
                        src={author.image}
                        alt="Picture of the author"
                       fill
                        className="rounded-full cursor-pointer"
                    />
                </Link>
                <div className='thread-card_bar' />
            </div>
            <div className="flex flex-col items-start gap-2">
                <Link href={`/profile/${author.id}`}>
                    <h1 className="text-body-semibold text-light-2">{author.name}</h1>
                </Link>
                <p className="text-base-regular text-light-2">{content}</p>
                <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3 items-center`}>
                    <div className="flex gap-3.5">
                        <div className="flex flex-row gap-6 ">
                            <Image src={"/assets/heart-gray.svg"} alt="like" width={24} height={24}/>
                        </div>
                        <Link href={`/thread/${id}`}> 
                            <div className="flex flex-row gap-6 ">
                                <Image src={"/assets/reply.svg"} alt="like" width={24} height={24}/>
                            </div>
                        </Link>                  
                        <div className="flex flex-row gap-6 ">
                            <Image src={"/assets/repost.svg"} alt="like" width={24} height={24}/>
                        </div>
                        <div className="flex flex-row gap-6 ">
                            <Image src={"/assets/share.svg"} alt="like" width={24} height={24}/>
                        </div>
                    </div>
                    {isComment && comments.length > 0 && (
                    <Link href={`/thread/${id}`}>
                        <p className='mt-1 text-subtle-medium text-gray-1'>
                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                        </p>
                    </Link>
              )}
                </div>
            </div>
        </div>
        <div>
    </div>
    </article>
  )
}

export default ThreadCard