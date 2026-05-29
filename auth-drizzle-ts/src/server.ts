 
import http from "node:http"
import dotenv from "dotenv/config"
import { createApp } from "./app/app.js"

async function main(){
try {
        const server = http.createServer(createApp())
    const PORT = process.env.PORT || 5000
   
    server.listen(PORT, ()=>{
        console.log(`server is running on port 
            ${process.env.PORT}`)
    })
} catch (error) {
    console.log(`error in server`, error)
}
}

main()