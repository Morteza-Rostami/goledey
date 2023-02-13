import express from 'express';
import reviewController from '../controllers/reviewController.js';
import paginatedResults from '../middlewares/paginatedApi.js';

const router = express.Router();

// get all by productId
router.get('/get/:slug', reviewController.get, paginatedResults());

// create
router.post('/create', reviewController.create);

export default router;