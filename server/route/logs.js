import  express  from "express"
import { isAdmin } from "../middleware/auth.js";
import { getAllLogs } from "../controller/logs.js";

const router = express.Router();

router.get("/adminLogs", isAdmin, getAllLogs);

export default router