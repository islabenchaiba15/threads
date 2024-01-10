import mongoose from "mongoose";
let isConnected = false;
export const connectToDB=async()=>{
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URL) return console.log("mongodb_url not found")
    if(isConnected)return console.log("already connected to mongodb")
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connection established")
    } catch (error) {
        console.log(error)
    }
}