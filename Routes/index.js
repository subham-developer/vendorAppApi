import express from "express";

const router = express.Router();

// import excelToPdfRoute from './ExcelRoute';
import userRoutes from './UserRoute.js';
import productRoutes from './ProductRoute.js';
import orderRoutes from './OrderRoute.js';

// router.use('/excelToPdf', excelToPdfRoute);
// router.use('/excelToPdf', excelToPdfRoute);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;
// module.exports = router;