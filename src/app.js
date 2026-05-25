import express from "express"
import cookieParser from "cookie-parser"
import router from "./modules/auth/routes.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("api/auth", router)

//catch all undefined routes
export default app