import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

// find by user -> create if not exist, else: update
//router.post('/create-update', cartController.createOrUpdate);

// get cart by user
//router.get('/get/:userid', cartController.get);

// add to cart
router.post('/add-to-cart/:id', cartController.addToCart);

// increment
router.patch('/inc-item/:id', cartController.incItem);

// decrement
router.patch('/dec-item/:id', cartController.decItem);

// remove item
router.delete('/remove-item/:id', cartController.removeItem);

// is in cart
router.post('/is-in-cart/:id', cartController.isInCart);

// get cart
router.get('/get-cart/:id', cartController.getCart);

// get cart or append
router.post('/get-or-concat/:id', cartController.getOrConcat);










export default router;