import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./User";
import { IComment } from "./Comment";

export interface IPost{
    description:string,
    user:IUser,
    imageUrl?:string,
    likes?:string[],
    comments?:IComment[]
}
//Schema k Lyie
export interface IPostDocument extends IPost, Document{
    createdAt:Date,
    updatedAt:Date,
}
const postSchema=new mongoose.Schema<IPostDocument>({
    description:{
        type:String,
        required:true,
    },
    user:{
        userId:{
              type:String,
              required:true,
        },
        profilePhoto:{
            type:String,
            default:""
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    imageUrl:{
        type:String,
        default:""
        
    },
   
   
    likes:{
        type:[String],
        default: []  
    },
    comments:[
        {
        type:mongoose.Types.ObjectId,
        ref:'Comment'

    },
   
]


},{timestamps:true})

export const Post:Model<IPostDocument>=mongoose.models?.Post || mongoose.model<IPostDocument>("Post",postSchema)