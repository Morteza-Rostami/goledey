//import mongoose
import mongoose from "mongoose";

export const connect = () => {
  // connect to mongodb:
  mongoose.connect(process.env.DB_CONNECTION, 
    // run this if successed:
    () => console.log(`connected to DB.`),
    // run this in case of error!
    (err) => console.log(err) 
  );
}