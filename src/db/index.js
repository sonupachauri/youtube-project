import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

export const connectDB = async () => {

    try{
      const connInstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
      console.log(`MongoDB connected: ${connInstance.connection.host}`);
      
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}

