import connectDB from "@/lib/db";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

//fetch All comments
export const GET = async (req:NextRequest,{params}:{params:{postId:string}})=>{
    try {
        await connectDB();
        const post=await Post.findById({_id:params.postId});
        if(!post){
            return NextResponse.json({
                messsage:"Post not Found"
            })
        }

        //post gotted
        const comments=await post.populate({
            path:'comments',
            options:{sort:{createdAt:-1}},
        });
        return NextResponse.json(comments)
    } catch (error) {
        return NextResponse.json({error:'An Error Occured.'})
        
    }
}