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
import { UserValidation } from '@/lib/validations/user';
import Image from "next/image"
import { Textarea } from "../ui/textarea"
import * as z from "zod"
import { isBase64Image } from "@/lib/utils"
import  {useUploadThing} from "@/lib/uploadthing"
import { UpdateUser } from "@/lib/actions/user.actions"
import { usePathname,useRouter } from "next/navigation"
interface Props{
    user:{
        id:string;
        objectId:string;
        username:string;
        name:string;
        bio:string;
        image:string;
    };
    btnTitle:string;
}


function AccountProfile({user,btnTitle}:Props) {
    const [files,setFiles]=useState<File[]>([])
    const {startUpload} =useUploadThing("media")
    const pathname=usePathname();
    const router=useRouter();

    async function onSubmit(values: z.infer<typeof UserValidation>): Promise<void> {
        const blob = values.profile_photo;
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
          const imgRes = await startUpload(files);
          if (imgRes && imgRes[0].url) {
            values.profile_photo = imgRes[0].url;
          }
        }
        await UpdateUser({
          username:values.username, 
          name:values.name, 
          bio:values.bio, 
          image:values.profile_photo,
          userId:user.id,
          path:pathname 
        });
        if(pathname==='/profile/edit'){
          router.back()
        } else {
          router.push('/')
        }
          
      }
  const form =useForm({
    resolver:zodResolver(UserValidation),
    defaultValues:{
        profile_photo:user?.image || "",
        name:user?.name || "",
        username:user?.username || "",
        bio:user?.bio || "",
    }
  });
    const handleImage=(e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string)=>void)=>{
        e.preventDefault();
        const fileReader= new FileReader();
        if(e.target.files && e.target.files.length>0){
            const file=e.target.files[0];
            setFiles(Array.from(e.target.files))
            fileReader.onload =async(event)=>{
                const imageDataUrl=event.target?.result?.toString() || ''
                fieldChange(imageDataUrl)

            }
            fileReader.readAsDataURL(file);
        }
    }
    
    return (
     <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex items-center ">
                <FormLabel className="flex h-24 w-24 text-light-2  items-center justify-center rounded-full bg-dark-3 !important ">
                    {field.value ? (
                        <Image
                            src={field.value}
                            alt="profile photo"
                            width={96}
                            height={96}
                            priority
                            className="rounded-full object-contain" 
                        />
                    ):(
                        <Image
                        src={"/assets/profile.svg"}
                        alt="profile photo"
                        width={24}
                        height={24}
                        className="object-contain"
                        />
                    )}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="file"
                    accept="image/*"
                    className='account-form_image-input'
                    placeholder="upload a photo"
                    onChange={(e)=>handleImage(e,field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base-semibold text-light-2'>name</FormLabel>
              <FormControl>
                <Input 
                type="text"
                className='account-form_input no-focus'
                 {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base-semibold text-light-2'>Username</FormLabel>
              <FormControl>
                <Input 
                    type="text"
                    className='account-form_input no-focus'
                    {...field}
                    />          
               </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"  // This is the name of the field
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base-semibold text-light-2'>bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={10} 
                  className='account-form_input no-focus'
                  {...field}
                />          
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit" className="bg-primary-500 w-full">Submit</Button>
        </form>
      </Form>
  )
}
export default AccountProfile