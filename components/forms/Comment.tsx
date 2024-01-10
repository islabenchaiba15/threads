'use client'
import React from 'react'
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
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { Textarea } from "../ui/textarea"
import * as z from "zod"
import { CommentValidation, ThreadValidation } from "@/lib/validations/thread"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions"
import Image from 'next/image'
interface Props{
    threadId:string,
    currentUserImg:string,
    currentUserId:string
}

function Comment({threadId,currentUserImg,currentUserId}:Props) {
    const pathanme=usePathname()
    const router=useRouter();
    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver:zodResolver(CommentValidation),
        defaultValues:{
            thread:'',
        }
    })
    const onSubmit=async(values: z.infer<typeof CommentValidation>)=>{
        await addCommentToThread(threadId,values.thread,JSON.parse(currentUserId),pathanme)
        form.reset();
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4 flex items-end gap-10" >
            <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                <FormItem className="flex w-full items-center gap-3">
                    <FormLabel className='w-12 h-12 relative'>
                    <Image 
                        src={currentUserImg}
                        alt="islam"
                        fill
                        className='rounded-3xl'
                        />
                    </FormLabel>
                    <FormControl className="w-full border-none bg-transparent">
                        <input
                        type='text'
                        placeholder='comment....'
                        className='no focus text-light-1 outline-none '
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

export default Comment