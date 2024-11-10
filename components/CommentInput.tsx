"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import ProfilePhoto from './shared/ProfilePhoto';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { createCommentAction } from '@/lib/serverActions';

const CommentInput = ({postId}:{postId:string}) => {
    const {user}=useUser();
    const commentActionHandler= async(formData:FormData)=>{
        try {
            if(!user){
                throw new Error('User not Authenticated')
            }
            //creation of Comment
            await createCommentAction(postId,formData)
        } catch (error) {
            throw new Error("An error Occured while add a comment")
            
        }
    }

  return (
   <form action={(formData)=>commentActionHandler(formData)}>
     <div className='flex items-center gap-2'>
        <ProfilePhoto 
        src={user?.imageUrl!}  
        />

        <Input
        type='text'
        name='inputText'
        placeholder='add a comment'
        className='rounded-full'
        />
        <Button
        type='submit' 
        variant={'outline'}
        className='rounded-full'
        >
            Add
        </Button>

     </div>
   </form>
  )
}

export default CommentInput