"use server"

import { UNSTABLE_REVALIDATE_RENAME_ERROR } from "next/dist/lib/constants"
import User from "../models/user.model"
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache"
import { getJsPageSizeInKb } from "next/dist/build/utils"
import { UserValidation } from "../validations/user"
import { FilterQuery, SortOrder } from "mongoose"
import Thread from "../models/thread.model"
interface Props{
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,
}
interface params{
    userId:string,
    searchString?:string,
    pageNumber?:number,
    pageSize?:number,
    sortBy?:SortOrder
}
export async function UpdateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}:Props
   
): Promise<void>{
    connectToDB()
    await User.findOneAndUpdate(
        {id:userId},
        {
            username:username.toLowerCase(),
            name,
            bio,
            image,
            onboarrded:true
        },
        {
            upsert:true,
            maxTimeMS: 20000
        }
    )
    if(path==='/profile/edit'){
        revalidatePath(path)
    }
    try {
        
    } catch (error:any) {
        throw new Error(`failed to create or update user :${error.message}`)
    }
}

export async function fetchUser(userId:string){
    try {
        connectToDB()
        return await User.findOne({id:userId})
    } catch (error) {
        throw new Error(`failed to fetch user: ${error}`)
    }
}

export async function fetchUsers({
    userId,
    searchString="",
    pageNumber=1,
    pageSize=20,
    sortBy="desc"
}:params){
    try {
        connectToDB();
        const skipamount =(pageNumber - 1)*pageSize
        const regex = new RegExp(searchString,"i")
        const query:FilterQuery<typeof User> = {
            id :{$ne:userId}
        }
        if(searchString.trim()!==''){
            query.$or = [
                {username:{$regex:regex}},
                {name:{$regex:regex}},
            ]
        }
        const sortOptions = {createdAt:sortBy}
        const userQuery =User.find(query).
        sort(sortOptions).
        skip(skipamount).
        limit(pageSize)
        const users = await userQuery.exec()
        const totalUsersCount = await User.countDocuments(query)
        const isNext =totalUsersCount > skipamount + users.length
        return {users,isNext}
    } catch (error:any) {
        throw new Error(`failed to fetch users :${error.message}`)
    }
}

export async function fetchActivity(userId:string){
    try {
        connectToDB()
        const userThreads=await Thread.find({author:userId})
        const childThreadIds=userThreads.reduce((acc,userThreads)=>{
            return acc.concat(userThreads.children)
        },[])
        const replies = await Thread.find({
            _id:{$in:childThreadIds},
            author:{$ne:userId}
        }).populate({
            path:'author',
            model:User,
            select:'name image _id'
        })
        return replies
    } catch (error) {
        throw new Error(`failed to fetch activities: ${error}`)
    }
}