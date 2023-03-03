import express from 'express';
import adminController from '../controllers/adminController.js';
import { accessAdmin, accessAuth } from '../middlewares/accessMiddle.js';

const router = express.Router();

// /admin/products
router.get('/products', 
accessAuth,
accessAdmin,
adminController.getProducts);

// upload one img
router.post('/uploadimg', 
accessAuth,
accessAdmin,

adminController.uploadImg);

// get all onginin and unpaid orders
router.get('/get-orders', 
accessAuth,
accessAdmin,
adminController.getOrders);

// make admin order msg
router.post('/order-msg', 
accessAuth,
accessAdmin,
adminController.createAdminOrderMsg);


export default router;