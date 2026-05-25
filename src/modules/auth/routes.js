import {Router} from "express"
import validate from "../../common/middleware/validate.middleware.js"
import * as controller from "../auth/controller.js"
import { authenticate } from "./middleware.js"
import loginDto from "./Dto/login.dto.js"
import registerDto from "./Dto/register.dto.js"

const router = Router()

router.post("/register", validate(registerDto), controller.register)
router.post("/login", validate(loginDto), controller.login)
router.get("/profile", authenticate, controller.getMe)
//complete verify-email, forgotPassword, reset-password
export   default router
