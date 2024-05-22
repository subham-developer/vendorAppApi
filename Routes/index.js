import express from "express";

const router = express.Router();

// import excelToPdfRoute from './ExcelRoute';
import userRoutes from './UserRoute.js';
import vendorRoutes from './VendorRoute.js';
import productRoutes from './ProductRoute.js';
import orderRoutes from './OrderRoute.js';
import ecommerceRoute from './Ecommerce/EprodctRoute.js';
import LoginRoute from './Auth/LoginRoute.js';

// router.use('/excelToPdf', excelToPdfRoute);
// router.use('/excelToPdf', excelToPdfRoute);
router.use('/users', userRoutes);
router.use('/vendors', vendorRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/auth', LoginRoute);

// Ecommerce API's Starts Here
router.use('/eProduct', ecommerceRoute);

export default router;
// module.exports = router;