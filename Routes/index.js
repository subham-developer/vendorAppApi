import express from "express";

const router = express.Router();

import excelToPdfRoute from './ExcelRoute';
import userRoutes from './UserRoute';
import productRoutes from './ProductRoute';
import orderRoutes from './OrderRoute';

router.use('/excelToPdf', excelToPdfRoute);
router.use('/excelToPdf', excelToPdfRoute);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;
// module.exports = router;