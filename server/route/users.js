import express from "express"
import {getAllUsers, updateUser} from "../controller/users.js"
import {isAdmin } from "../middleware/auth.js"

const router = express.Router()

router.get("/adminGetAllUser", isAdmin, getAllUsers)
router.post("/updateProfile", updateUser)

export default router