import mongoose from "mongoose"

export const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/graphDataBase");
        console.log("connection created successfully");
    }catch(error){
        console.error(`Error in connecting mongoDB, ${error}`);
        process.exit(1);
    }
}
