import express from "express"
import { addProduct, getProducts, updateProductById, deleteProductById } from "../Controller/Product.controller";
const router = express.Router();

router.post('/add-product', addProduct);
router.get('/get-all-products/:prodId?', getProducts);
router.put('/update-product/:prodId', updateProductById);
router.delete('/delete-product/:prodId', deleteProductById);


export default router;