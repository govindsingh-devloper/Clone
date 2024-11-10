import mongoose, { Connection } from "mongoose";

let isConnected:Connection | boolean=false;

const connectDB=async()=>{
    if(isConnected){
        console.log("MongoDB Already Connected")
        return isConnected;
    }
    try {
       const response= await mongoose.connect(process.env.MONGODB_URL!)
       isConnected=response.connection;
       console.log("MongoDB Connected")
       return isConnected;
    } catch (error) {
        console.log(error)
        
    }

}

export default connectDB;