import express from 'express';
import payController from '../controllers/payController.js';
import { accessAuth } from '../middlewares/accessMiddle.js';

const router = express.Router();

// make payment to zarinpal
router.post('/pay', 
accessAuth,
payController.pay);
// verify payment (callback for zarinpal)
router.post('/verify-pay', 
accessAuth,
payController.verifyPay);



export default router;