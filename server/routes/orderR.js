import express from 'express';
import orderController from '../controllers/orderController.js';

import paginatedResults from '../middlewares/paginatedApi.js';
import { accessAdmin, accessAuth } from '../middlewares/accessMiddle.js';


const router = express.Router();

// get all orders: by status
router.get('/get/:status', 
accessAuth,
orderController.getByStatus);

// get orders by user
router.get('/get/:user/:status', 
  accessAuth,
  orderController.getByUser,
  paginatedResults(),
);

router.post('/create', 
accessAuth,
orderController.create);

// update order status
router.patch('/update/:order', 
accessAuth,
accessAdmin,
orderController.update);


// test 
router.get('/test', 
accessAuth,
accessAdmin,
orderController.test);

// get order count
router.post('/order-counts', orderController.getOrderCounts);



export default router;