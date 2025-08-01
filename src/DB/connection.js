import mongoose from "mongoose";



const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to MongoDB!");
    }catch(error){
        console.log("Error Connecting DB", error);
    }
};


export default connectDB;