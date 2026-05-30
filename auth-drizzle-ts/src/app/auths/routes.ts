import express from "express"
import type {Router} from "express"
import { AuthenticationController } from "./controller.js"
import { authenticationMiddleware, restrictUnAuthicatedUser } from "./middleware/middleware.js"


export const authRouter:Router = express.Router()

const authenticationController = new AuthenticationController

authRouter.post('/sign-up', authenticationController.handleSignUp.bind(authenticationController))

authRouter.post('/sign-in', authenticationController.handleSignIn.bind(authenticationController))


authRouter.get('/me', authenticationMiddleware, restrictUnAuthicatedUser, authenticationController.handleMe.bind(authenticationController))