import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

// /admin/products
router.get('/products', adminController.getProducts);

// upload one img
router.post('/uploadimg', adminController.uploadImg);

// get all onginin and unpaid orders
router.get('/get-orders', adminController.getOrders);

// make admin order msg
router.post('/order-msg', adminController.createAdminOrderMsg);


export default router;