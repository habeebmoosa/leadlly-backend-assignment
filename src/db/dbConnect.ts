import mongoose from "mongoose";

const dbConnect = async () =>{
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if(connection){
        console.log("Database is running");
    }
}

export default dbConnect;