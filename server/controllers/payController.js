
import Payment from '../models/Payment.js';
import HELPER from '../helpers/helpers.js';
import Order from '../models/Order.js';
import { MERCHANT_ID, ONGOING, ZPAL_CALLBACK, ZPAL_CHECK, ZPAL_PAY, ZPAL_VERIFY } from '../CONST/CONSTBACK.js';
import User from '../models/User.js';

import randomstring from 'randomstring';
import axios from 'axios';
import persianDate from 'persian-date';
import UserHelp from '../helpers/userHelp.js';
import City from '../models/City.js';
import Cart from '../models/Cart.js';


// toman to rial:
const tomanTorial = (toman) => {
  let rial = 0;

  rial = toman.toString() + 0;
  rial = Number(rial);

  return rial;

}

const payController = {

  // post =: info for payment to zarinpal:
  pay: async (req, res) => {
    // userId, amount to pay, order object, orderId if already exist.
    const { userId, orderObj, orderId } = req.body;
    let orderModel = {};

    let amount = 0;
    let shippingCost = 0;


    try {

      // get user
      const user = await User.findOne({ _id: userId });
      let city = await City.findOne({ _id: user?.address?.city });
      // calc amount and shippingCost
      //cities = cities.map((vl, i) => vl.toObject());
      // const city = 
      //   cities.filter((vl, i) => vl.name === user.address?.city?.name );

      console.log(user, city)
      shippingCost = city.shippingCost;
      
      // make an unpaid order:
      if (!orderId) {
        // make a new order:
        if (Object.keys(orderObj).length) {
          let orderCode = generateOrderCode();
          
          function generateOrderCode() {
            return randomstring.generate({
              length: 10,
              charset: 'numeric'
            });
          }
          
          // check in case our random number exist in db 
          const orderDB = await Order.find({ number: orderCode });
          if (orderDB.length) {orderCode = generateOrderCode()}

          orderObj.number = orderCode;
          orderObj.total = orderObj.total + shippingCost;
          //console.log('==========>>>>> order: ', orderObj);

          // make a new order: (unpaid)
          //if (Object.keys(orderObj).length) {
          const newOrder = new Order(orderObj);
          orderModel = await newOrder.save();
          //return res.status(200).json(orderM);
          //}

          
          // remove cart:
          const removedCart = await Cart.findOne({ user: user._id }).remove();
          amount = newOrder.total;
        }
      } else {

        // calc amount and shippingCost
        const order = await Order.findOne({ _id: orderId });
        amount = order.total;
      }

      // toman to rial
      amount = tomanTorial(amount);

      console.log('total amount: ', amount);
      

      // data to send to zarinpal:
      const zData = {
        // code for goledey_darghah
        merchant_id : MERCHANT_ID,
        // price to pay in toman
        amount : 1000,
        // route to call after: fail or success
        callback_url : ZPAL_CALLBACK,
        description : "خرید از فروشگاه اینترنتیِ (گلِ دِی).",
        // email and phone number of customer.
        metadata : { 
          email : user.email ? user.email : '',
          mobile: user.cellPhone,
        },
        //SandBox: true,
    
      }

      // post pay info to zarinpal:
      console.log('making req to apal...')
      const response = 
        await axios.post(ZPAL_PAY, zData);

      // response.data from zarinpal:

      // if success: go to zarinpal checkout:
      //console.log(response)
      const {data} = response;

      if (data.data.code && data.data.code === 100) {
        // success:
        
        // create an payment object and store authority-code in DB:

        const newPayment = new Payment({
          user: userId,
          order: orderId || orderModel._id,
          resnumber: data.data.authority,
          amount: 1000,
        })

        const saved = await newPayment.save();


        // send data to zarinpal checkout:
        // it's a redirect to get
        //res.redirect(ZPAL_CHECK + data.data.authority);

        return res.status(200).json({
          success: true,
          redirect: ZPAL_CHECK + data.data.authority,
        });

        
      } else {
        //  failed:
        return res.status(200).json({
          success: false,
        });
      }


    } catch(err) {
      console.log(err)
      return res.status(400).json({ message: 'controller: /transaction/pay' });
    }
  },






























  // (callback) => zarinpal calls after payment done!
  verifyPay: async (req, res) => {
    const { Authority, Status } = req.body;
   
    console.log('verify start ...');
    try {
      
      //# payment success:

      //# check if this payment exist in our DB:
      const payment = await Payment.findOne({ resnumber: Authority });

      //# if payment does not exist => return: this payment does not exist.
      if (!payment) {
        return res.status(200).json({
          success: false,
          message: 'payment does not exist in db!'
        });
      } 
      

      //# if: payment exist and is in DB:

      //# go for verify payment from zarinpal:

      //# data
      const vData = {
        merchant_id: MERCHANT_ID,
        amount: payment.amount,
        authority: Authority,
      }

      console.log(vData)
      const response = 
        await axios.post(ZPAL_VERIFY, vData);

      const {data} = response;

      console.log('verify ****---------------------------------', response);
      console.log(data.errors)
      console.log(data.errors.validations)
      //# if: success:
      if (data?.data?.code && (data.data.code === 100 || data.data.code === 101)) {
        //# set payment = true
        payment.payment = true;

        //# find and set order: to ONGOING.
        const order = await Order.findOne({ _id: payment.order });
        order.status = ONGOING;

        await payment.save();
        await order.save();

        // send message of order paid success:
        const user = await User.findOne({ _id: payment.user });

        // order date:
        let pDate = new persianDate(order.createdAt);
        let date = pDate.toLocale('fa').format('YYYY/MM/DD');

        const smsRes = 
          await UserHelp
          .sendSms('', user.cellPhone, `${user?.name.split(' ')[0]} ; ${order.number} ; ${date}`, 126572);

        console.log('sms response ... ', smsRes)

        

        //# success to react:
        return res.status(200).json({
          success: true,
          message: 'payment has been verified!',
        });
        
      } else {
        //# failed to react:
        return res.status(200).json({
          success: false,
          message: 'order was not verified!!',
        });
      }

    } catch(err) {
      console.log(err);
      return res.status(400).json({ message: 'controller: /transaction/verifyPay' });
    }
  },
}

export default payController;