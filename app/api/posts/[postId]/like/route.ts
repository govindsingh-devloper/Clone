import connectDB from "@/lib/db";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

// get likes
export const GET = async (req:NextRequest, {params}:{params:{postId:string}}) => {
    try {
        await connectDB();
        const post = await Post.findById({_id:params.postId});
        if(!post) return NextResponse.json({error:'Post not found.'});
        return NextResponse.json(post.likes);
    } catch (error:any) {
        return NextResponse.json({error:'An error occurred.'});
    }
}
// post likes



export const POST = async (req: NextRequest, { params }: { params: { postId: string } }) => {
    try {
        // Connect to the database
        await connectDB();

        // Ensure params is awaited
        const { postId } = await params;

        // Get userId from the request body (assuming it's sent as JSON)
        const { userId } = await req.json();

        // Find the post by its ID
        const post = await Post.findById(postId);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Ensure post.likes is always an array (using default empty array if undefined)
        const likes = post.likes ?? [];

        // Check if the user has already liked the post
        if (likes.includes(userId)) {
            return NextResponse.json({ message: "You already liked this post" });
        }

        // Add the user ID to the likes array
        await Post.updateOne(
            { _id: postId },
            { $addToSet: { likes: userId } }
        );

        // Respond with a success message
        return NextResponse.json({ message: "Post liked successfully" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" });
    }
};

