'use server'
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { userAgent } from "next/server";

interface params{
    text:string,
    author:string,
    communityId:string | null,
    path:string 
}
export async function createThread({
    text,author,communityId,path
}:params){
    try {
        connectToDB();
        const createdThread=await Thread.create({
        text:text,
        author:author,
        community:null
    });
    console.log('rrrrrrr')
    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id },
      });

    revalidatePath(path);
    } catch (error:any) {
        throw new Error(`error in creatin thread ${error.message}`)
    }
}
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();
  
    // Calculate the number of posts to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;
  
    // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children", // Populate the children field
        populate: {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      });
      const totalPostsCount=await Thread.countDocuments({parentId:{$in :[null,undefined,null]}});
      const posts = await postsQuery.exec();
      const isNext = totalPostsCount > skipAmount + posts.length;
      return {posts,isNext}
}

export async function fetchThreadById(id:string){
    connectToDB();
    try {
        const thread=await Thread.findById(id).
        populate({
            path:'author',
            model:User,
            select:'_id id name image'
        }).populate({
            path:'children',
            populate:[
                {
                    path:'author',
                    model:User,
                    select:'_id id name image'
                },
                {
                    path:'children',
                    model:Thread,
                    populate:{
                        path:'author',
                        model:User,
                        select:'_id id name image'
                    }
                }
            ]
        }).exec()
        return thread
    } catch (error:any) {
        throw new Error (`error fetching threads :${error.message}`)
    }
}

export async function addCommentToThread(
    threadId:string,
    commentText:string,
    userId:string,
    path:string,
    ){
    connectToDB()
    try {
        const originalThread = await Thread.findById(threadId)
        if(!originalThread){
            throw new Error('Could not find thread')
        }
        const CommentSaved = new Thread({
            text: commentText,
            author:userId,
            parentId:threadId,
        })
        const savedCommentThread = await CommentSaved.save();
        originalThread.children.push(savedCommentThread._id)
        await originalThread.save()
        revalidatePath(path)
    } catch (error) {
        
    }
}

export async function fetchThreadByAuthorId(id:string){
    connectToDB();
   
    try {
        const threads= await Thread.find({author:id,parentId: null}).
        populate({
            path:'author',
            model:User,
            select:'id _id name image '
        })
        return threads
    } catch (error) {
        throw new Error(`could not find thread of author :${error}`)
    }
    
}
