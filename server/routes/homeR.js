import express from 'express';
import homeController from '../controllers/homeController.js';

const router = express.Router();

// get all data shown on home page:
router.get('/get', homeController.get);



export default router;