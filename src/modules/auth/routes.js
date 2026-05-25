import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import * as controller from "../auth/controller.js";
import { authenticate } from "./middleware.js";
import loginDto from "./Dto/login.dto.js";
import registerDto from "./Dto/register.dto.js";
import forgotPassword from "./Dto/forgotPassword.dto.js";
import resetPassword from "./Dto/resetPassword.dto.js";

const router = Router();

router.post("/register", validate(registerDto), controller.register);
router.post("/login", validate(loginDto), controller.login);
router.get("/profile", authenticate, controller.getMe);
//complete verify-email, forgotPassword, reset-password
router.post("/logout", authenticate, controller.logOut);
router.get("/verify-email/:token", controller.verifyEmail);
router.post(
  "/forgot-password",
  validate(forgotPassword),
  controller.forgotPassword,
);
router.put(
  "/reset-password/:token",
  validate(resetPassword),
  controller.resetPassword,
);

export default router;
