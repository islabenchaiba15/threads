'use client'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { Textarea } from "../ui/textarea"
import * as z from "zod"
import { ThreadValidation } from "@/lib/validations/thread"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { createThread } from "@/lib/actions/thread.actions"
interface Params{
    userId:string
}
function PostThread({userId}:Params){
    const router=useRouter()
    const pathname=usePathname()
    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver:zodResolver(ThreadValidation),
        defaultValues:{
            thread:'',
            accountId:userId
        }
    })
    const onSubmit=async(values: z.infer<typeof ThreadValidation>)=>{
        await createThread({

       
            text:values.thread,
            author:userId,
            communityId:null,
            path:pathname
        })
        router.push('/')
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10 flex flex-col justify-start gap-10" >
            <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className='text-base-semibold text-light-2'>tread content</FormLabel>
                    <FormControl className="no-focus border border-dark-4 bg-dark-4 text-light-1">
                        <textarea
                        rows={15} 
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
          )}
        />
            <Button type="submit" className='bg-primary-500'>Submit</Button>
            </form>
        </Form>
    )
   
}
export default PostThread