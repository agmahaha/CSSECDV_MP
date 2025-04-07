import express from "express"
import {adminGetUser, getUser, updateUser} from "../controller/users.js"
import {verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/:id", verifyToken, getUser)
router.get("/adminGet/:id", adminGetUser)
router.post("/updateProfile", updateUser)

export default router