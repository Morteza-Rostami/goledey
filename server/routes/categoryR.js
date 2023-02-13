import express from 'express';
import categoryController from '../controllers/categoryController.js';

const router = express.Router();

// get all
router.get('/get', categoryController.get);
// get one category
router.get('/get/:slug', categoryController.getBySlug);

export default router;