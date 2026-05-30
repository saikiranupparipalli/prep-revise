import express from "express"
import type { Express } from "express"
import { authRouter } from "./auths/routes.js"
 


export function createApp(): Express{
    const app = express()
    app.use(express.json())
    app.use('/auth', authRouter)
    return app
}