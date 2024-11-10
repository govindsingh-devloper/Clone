import connectDB from "@/lib/db";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";


//post disLiked

export const POST=async (req:NextRequest,{params}:{params:{postId:string}})=>{
    try {
        await connectDB();
        const userId=await req.json();
        const post=await Post.findById({_id:params.postId});
        if(!post){
            throw new Error("Error occured while liking the Post")
        }
        await Post.updateOne({
            $pull:{likes:userId}
        })
        return NextResponse.json({
            message:"Post disliked successFully"
        })
        
    } catch (error:any) {
        return NextResponse.json({
            error:"An error occured"
        })
        
    }
}