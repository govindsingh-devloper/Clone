import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./User";

export interface IComment{
    textMessage:string,
    user:IUser,
}
//Schema k Lyie
export interface ICommentDocument extends IComment, Document{
    createdAt:Date,
    updatedAt:Date,
}
const commentSchema=new mongoose.Schema<ICommentDocument>({
    textMessage:{
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
    


},{timestamps:true})

export const Comment:Model<ICommentDocument>=mongoose.models?.Comment || mongoose.model<ICommentDocument>("Comment",commentSchema)