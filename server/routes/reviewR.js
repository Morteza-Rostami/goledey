import express from 'express';
import reviewController from '../controllers/reviewController.js';
import paginatedResults from '../middlewares/paginatedApi.js';
import { accessAuth } from '../middlewares/accessMiddle.js';

const router = express.Router();

// get all by productId
router.get('/get/:slug', 
accessAuth,
reviewController.get, paginatedResults());

// create
router.post('/create', 
accessAuth,
reviewController.create);

export default router;