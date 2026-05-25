import mongoose from "mongoose";
import dotenv from "dotenv"

console.log(process.env.MONGODB_URI)
const db = async()=>{
   const connect = await mongoose.connect(process.env.MONGODB_URI)
   console.log(`MONGODB is connected ${connect.connection.host}`)
}

 


export default db