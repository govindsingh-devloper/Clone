import React from 'react'
import Post from './Post'
import { IPost, IPostDocument } from '@/models/Post'

const Posts = ({posts}:{posts:IPostDocument[]}) => {
  return (
    <div>
      {
        posts?.map((post,index)=>{
          return(
            <Post  post={post}/>
          )
        })
      }
    </div>
  )
}

export default Posts