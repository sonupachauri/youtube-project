// require('dotenv').config({path:'/.env'});

import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config({path:'/.env'});

connectDB().then(()=>{
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((error)=>{
    console.log("Mongo DB connection failed!!",error);
});


// const app = express();
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Connect to MongoDB
// ( async() =>{
//  try {
//    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//  } catch (error) {
//      console.log(error);
//     throw error;
//     // process.exit(1);
//  }
// })()