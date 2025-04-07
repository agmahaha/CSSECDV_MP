import  express  from "express"
import {getAllOrders, updateOrder, userOrder, getUserOrders} from "../controller/checkout.js"
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/orderService", userOrder);
router.get("/userOrders/:userId", getUserOrders);
router.put("/update/:id", updateOrder);
router.get("/adminOrder", isAdmin, getAllOrders);

export default router