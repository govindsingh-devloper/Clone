import { IPostDocument } from '@/models/Post';
import React from 'react'
import Comment from './Comment'

const Comments = ({ post }: { post: IPostDocument }) => {
  return (
    <div>
      {
        // Ensure that post.comments is defined and map over it
        post.comments?.map((comment: any) => {
          // Ensure there's a valid key available for each comment
          const key = comment.id || comment._id; // Use comment.id or comment._id, depending on your data

          return (
            <Comment 
              key={key}  // Use a valid and unique key for each comment
              comment={comment}
            />
          )
        })
      }
    </div>
  );
}

export default Comments;
