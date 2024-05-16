import express from "express"
import { addOrders, getAllOrders } from "../Controller/Order.controller";
const router = express.Router();


router.post('/addOrder', addOrders);
router.get('/:orderId?', getAllOrders);


export default router;