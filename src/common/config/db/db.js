import mongoose from "mongoose";
import dotenv from "dotenv"

console.log(process.env.MONGODB_URI)
const db = async()=>{
   const connect = await mongoose.connect(process.env.MONGODB_URI)
   console.log(`MONGODB is connected ${process.env.MONGODB_URI}`)
}

db().catch((err)=>{
    console.log("error spotted", err)
})

export default db