import express from 'express';
import orderController from '../controllers/orderController.js';

import paginatedResults from '../middlewares/paginatedApi.js';

const router = express.Router();

// get all orders: by status
router.get('/get/:status', orderController.getByStatus);

// get orders by user
router.get('/get/:user/:status', 
  orderController.getByUser,
  paginatedResults(),
);

router.post('/create', orderController.create);

// update order status
router.patch('/update/:order', orderController.update);


// test 
router.get('/test', orderController.test);



export default router;