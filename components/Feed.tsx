import React from 'react'
import PostInput from './PostInput'
import Posts from './Posts'
import { getAllPosts } from '@/lib/serverActions'

const Feed = async({user}:{user:any}) => {
  //Hm direct plan object nhi bhej skte from server to client
  const userData=JSON.parse(JSON.stringify(user))
  //Get ALL Post
  const posts= await getAllPosts();
  // console.log("All Posts",posts)
  return (
    <div className='flex-1 border'>
      <PostInput user={userData}/>
      <Posts posts={posts}/>
    </div>
  )
}

export default Feed