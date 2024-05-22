import express from 'express';
const router = express.Router();
import { addEproduct, getEProducts } from '../../Controller/Ecommerce/Eproduct.controller.js';
import upload from '../../config/uploadImg.js';

router.post('/', upload.single('productImage'), addEproduct);
router.get('/',getEProducts);

export default router;