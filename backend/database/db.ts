import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
    const MONGO_URI = process.env.NODE_ENV === 'prod' ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_LOCAL;
    if(!MONGO_URI) {
        console.log("Unable to find DB");
        return;
    }
    try{
        await mongoose.connect(MONGO_URI, {});
        console.log(`Connected to ${MONGO_URI}`)
    } catch (err: unknown){
        if(err instanceof Error) {
            console.error('Error connecting to db', err);
            process.exit(1);
        }
    }
}
export default connectDB;