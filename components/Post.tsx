"use client"
import React from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import { useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import PostContent from './PostContent'
import SocialOptions from './SocialOptions'
import { IPostDocument } from '@/models/Post'
import ReactTimeago from 'react-timeago'
import { deletePost } from '@/lib/serverActions'

const Post = ({post}:{post:IPostDocument}) => {
    const {user}=useUser();
    const fullName=post?.user?.firstName+ " "+ post?.user?.lastName
    const loggedInUser=user?.id === post?.user?.userId;


  return (
    <div className='bg-white my-2 m-2 md:mx-0 rounded-lg border border-gray-300'>
        <div className='flex gap-2 p-4'>
            <ProfilePhoto 
            src={post?.user?.profilePhoto!}
            />
            <div className='flex items-center justify-between w-full'>
                <div>
                    <h1 className='text-sm font-bold'>{fullName} <Badge variant={'secondary'} className='ml-2'>You</Badge></h1>
                    <p className='text-xs text-gray-500'>@{user? user?.username:"username"}</p>
                    <p className='text-xs text-gray-500'>
                        <ReactTimeago date={new Date(post.createdAt)}/>
                    </p>
                    
                </div>

            </div>
            <div>
                {
                    loggedInUser &&(
                            // {/* //Delete Button */}
                        <Button 
                             onClick={()=>{
                             const res=deletePost(post._id);
                               }}
                              size={'icon'} 
                              className='rounded-full'>
                              <Trash2/>
                         </Button>
                    )
                }
              
            </div>
        </div>
           {/* PostContent */}
           <PostContent post={post}/>
            {/* Social Options */}
            <SocialOptions post={post}/>


    </div>
  )
}

export default Post