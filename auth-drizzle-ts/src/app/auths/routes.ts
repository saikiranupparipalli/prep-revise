import express from "express"
import type {Router} from "express"
import { AuthenticationController } from "./controller.js"


export const authRouter:Router = express.Router()

const authenticationController = new AuthenticationController

authRouter.post('/sign-up', authenticationController.handleSignUp.bind(authenticationController))

 authRouter.get('/me',(_, res)=>{
    res.json({message:  "working"})
 })