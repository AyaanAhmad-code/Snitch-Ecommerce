import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validator.js";
import { login, register, googleAuthCallback, getMe, updateAddress, logout, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import passport from "passport";
import { config } from "../config/config.js";

const authRouter = Router()

authRouter.post("/register", validateRegisterUser, register)
authRouter.post("/login", validateLoginUser, login)
authRouter.post("/logout", authenticateUser, logout)
authRouter.get("/me", authenticateUser, getMe)
authRouter.put("/address", authenticateUser, updateAddress)
authRouter.post("/password/forgot", forgotPassword)
authRouter.put("/password/reset/:token", resetPassword)
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
authRouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/login" }), googleAuthCallback) 

export default authRouter