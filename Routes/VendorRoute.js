import express from "express";
import { registerVendor } from "../Controller/Vendor.Controller";
const router = express.Router();

router.post('/add-vendor',registerVendor);


export default router;