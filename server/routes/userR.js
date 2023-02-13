import express from 'express';
// get Router object
const router = express.Router();

// import controller:
import userController from '../controllers/userController.js';
import makeSlug from '../middlewares/makeSlugMiddle.js';
import paginatedResults from '../middlewares/paginatedApi.js';
import { accessAdmin, accessAuth } from '../middlewares/accessMiddle.js';

// signup
router.post('/register', userController.register);

// login
router.post('/verifyOtp', userController.verifyOtp);

// using: controller
//router.get('/get', userController.get, paginatedResults());

// get one user
//router.get('/get/:slug', userController.getOne);

// create: 
//router.post('/create', userController.create);

// update
router.patch('/update/:id', 
  // accessAuth,
  userController.update);

// update user address
router.patch('/address/:id', userController.updateAddress);

// delete
//router.delete('/delete/:id', userController.delete);

// search:
// router.get('/search', userController.search, paginatedResults());


export default router;