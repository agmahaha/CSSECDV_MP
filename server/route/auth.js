import express from "express"
import {loginUser, registerUser, changePassword}from "../controller/auth.js"

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.put("change", changePassword)

export default router