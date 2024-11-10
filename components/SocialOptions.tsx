import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react'
import { IPostDocument } from '@/models/Post';
import { useUser } from '@clerk/nextjs';
import CommentInput from './CommentInput';
import Comments from './Comments';

const SocialOptions = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<string[]>([]); // Always initialize as an array
  const [commentOpen, setCommentOpen] = useState(false);

  // Fetch likes data when the component mounts
  useEffect(() => {
    if (user && post.likes) {
      setLiked(post.likes.includes(user.id));
      setLikes(post.likes); // Initialize with post's likes data
    }

    const fetchLikes = async () => {
      const res = await fetch(`/api/posts/${post._id}/like`);
      if (res.ok) {
        const data = await res.json();
        setLikes(data);
      } else {
        console.error('Failed to fetch likes');
      }
    };

    fetchLikes(); // Fetch the likes on page load
  }, []); // Refetch if post changes or user changes

  const likeAndDisLikeHandler = async () => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Toggle like state
    const tempLiked = liked;
    const tempLikes = [...likes];
    const dislike = likes.filter((userId) => userId !== user.id);
    const like = [...likes, user.id];
    const newLike = liked ? dislike : like;

    setLiked(!liked);
    setLikes(newLike); // Update likes locally

    // Make API call to like/dislike the post
    const res = await fetch(`/api/posts/${post._id}/${liked ? 'dislike' : 'like'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user.id }),
    });

    if (!res.ok) {
      // Rollback state if the API call fails
      setLiked(tempLiked);
      setLikes(tempLikes);
      throw new Error('Failed to like or dislike the post');
    }

    // Fetch all likes after successful update
    const fetchLikes = await fetch(`/api/posts/${post._id}/like`);
    if (!fetchLikes.ok) {
      // Rollback state if fetching all likes fails
      setLikes(tempLikes);
      throw new Error('Failed to fetch likes');
    }

    const likeData = await fetchLikes.json();
    setLikes(likeData); // Update likes with the correct data from the server
  };

  return (
    <div>
      <div className="text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300">
        {likes.length > 0 && (
          <p className="text-xs text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer">
            Likes {likes.length}
          </p>
        )}
        {/* Comments */}
        {post.comments && post.comments.length > 0 && (
          <p
            onClick={() => setCommentOpen(!commentOpen)}
            className="text-xs text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer"
          >
            {post.comments.length} Comments
          </p>
        )}
      </div>

      <div className="flex items-center m-1 justify-between">
        <Button
          onClick={likeAndDisLikeHandler}
          variant={'ghost'}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <ThumbsUp className={`${liked && 'fill-[#378FE9]'}`} />
          <p className={`${liked && 'text-[#378FE9]'}`}>Like</p>
        </Button>

        <Button
          onClick={() => setCommentOpen(!commentOpen)}
          variant={'ghost'}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <MessageCircleMore />
          <p>Message</p>
        </Button>

        <Button variant={'ghost'} className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black">
          <Repeat />
          <p>Repost</p>
        </Button>

        <Button variant={'ghost'} className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black">
          <Send />
          <p>Send</p>
        </Button>
      </div>

      {/* Comments Section */}
      {commentOpen && (
        <div className="p-4">
          <CommentInput postId={post._id} />
          <Comments post={post} />
        </div>
      )}
    </div>
  );
};

export default SocialOptions;
