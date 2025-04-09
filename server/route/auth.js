import express from "express"
import {loginUser, registerUser}from "../controller/auth.js"
import { verifyToken, isAdmin } from "../middleware/auth.js"

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)

export default router