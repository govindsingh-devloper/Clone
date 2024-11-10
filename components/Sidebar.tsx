import Image from 'next/image'
import React from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import { getAllPosts } from '@/lib/serverActions'

const Sidebar = async({user}:{user:any}) => {
  const posts=await getAllPosts()
  return (
    <div className='hidden md:block w-[20%] h-fit border border-gray-300 bg-white rounded-lg'>
      <div className='flex relative flex-col items-center'>
        <div className='w-full h-16 overflow-hidden'>
          {
            user &&(
              <Image 
              src={"/banner.jpg"}
              alt="Banner"
              width={200}
              height={200}
              className='w-full h-full rounded-t'
              />
            )
          }

        </div>

        {/* USer ICon */}
        <div className='my-1 absolute top-10 left-[40%]'>
          <ProfilePhoto src={user ? user?.imageUrl : "/banner.jpg"}/>

        </div>

        {/* USer Details */}
        <div className='border-b border-b-gray-300'>
          <div className='p-2 mt-5 text-center'>
            <h1 className='font-bold hover:underline cursor-pointer'>
              {user? `${user?.firstName} ${user?.lastName}`:"Govind Full Stack"}</h1>
              <p className='text-xs'>@{user? `${user?.username}`:"UserName"}</p>

          </div>

        </div>
       

      </div>
       {/* Impression */}
       <div className='text-xs'>
          <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200'>
            <p>Post Impression</p>
            <p className='text-blue-500 font-bold'>0</p>

          </div>
          {/* TotalPost */}
          <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200'>
            <p>Post</p>
            <p className='text-blue-500 font-bold'>{posts?.length}</p>

          </div>
        </div>
    </div>
  )
}

export default Sidebar