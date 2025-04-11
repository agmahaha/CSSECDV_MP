import express from "express"
import {getAllUsers, updateUser, changePassword} from "../controller/users.js"
import {isAdmin } from "../middleware/auth.js"

const router = express.Router()

router.get("/adminGetAllUser", isAdmin, getAllUsers)
router.post("/updateProfile", updateUser)
router.post("/changePassword", changePassword)

export default router