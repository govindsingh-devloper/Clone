"use server"

import { Post } from "@/models/Post";
import { IUser } from "@/models/User";
import { currentUser } from "@clerk/nextjs/server"
import {v2 as cloudinary} from 'cloudinary'
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import { Comment } from "@/models/Comment";


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
//create Post using Server Actions
export const createPostAction=async(inputState:string,selectedFile:string)=>{
    await connectDB();
    const user=await currentUser();
    if(!user){
        throw new Error('User Not authenticated')
    }
    if(!inputState){
        throw new Error('Input Fiels is required')
    }
    const image=selectedFile;
    //Fetch from clerk
    const userDetails:IUser={
        firstName:user.firstName || "Govind",
        lastName:user.lastName || "Singh",
        userId:user.id,
        profilePhoto:user.imageUrl

    }

    let uploadResponse;

    try {
        //create post with Image

        if(image){
            uploadResponse=await cloudinary.uploader.upload(image)
            await Post.create({
                description:inputState,
                user:userDetails,
                imageUrl:uploadResponse?.secure_url,
            })

        }else{
              //create post with text  only
              await Post.create({
                description:inputState,
                user:userDetails
              })
        }
        //Nextjs m caching hoti h,ye use krte h because konse route pr data updated show krana h
       revalidatePath("/")
        
    } catch (error:any) {
        throw new Error(error)
        
    }

}


//get ALL Post using ServerAction

export const getAllPosts=async()=>{
    await connectDB();

    try {
        const post= await Post.find().sort({createdAt:-1}).populate({
            path:"comments",
            options:{sort:{createdAt:-1}}
        }) 
        if(!post){
            return [];
        }
        // console.log("Post is Here",post);
        //Plane object cant sent that why
        return  JSON.parse(JSON.stringify(post));
        
    } catch (error) {
        console.log(error)
        
    }

}


//Delete Post

export const deletePost=async(postId:string)=>{
    await connectDB();
    //Current User
    const user=await currentUser();
    if(!user){
        throw new Error("User Not Authenticated")

    }

    const post=await Post.findById(postId);
    if(!post){
        throw new Error("Cant find Post with that Id")
    }

    //delete post only respected user
    if(post.user.userId !== user.id){
        throw new Error("You are not delete this post")
    }

    try {
        await Post.deleteOne({_id:postId});
        revalidatePath("/");
        
    } catch (error:any) {
        throw new Error("An error Occured",error)
        
    }
}


//creation OF Comments

export const createCommentAction=async(postId:string,formData:FormData)=>{
    try {
        const user=await currentUser();
        console.log("User h",user)
        if(!user){
            throw new Error("User Not Found")
        }

        const inputText=formData.get('inputText') as string
        if(!inputText){
            throw new Error("Field is required")
        }
        if(!postId){
            throw new Error("Post Not Found")
        }
        const userData:IUser={
            firstName:user.firstName || "Govind",
            lastName:user.lastName || "Singh",
            userId:user.id,
            profilePhoto:user.imageUrl
    
        }

        const post=await Post.findById({_id:postId});
        if(!post){
            throw new Error ("Post Not Found")
        }
        const comment=await Comment.create({
            textMessage:inputText,
            user:userData
        })

        post.comments?.push(comment.id)
        await post.save();
        

        revalidatePath("/");
        
    } catch (error) {
        throw new Error('An Error Occured')
        
    }
}