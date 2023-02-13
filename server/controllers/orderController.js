
import Order from '../models/Order.js';
import HELPER from '../helpers/helpers.js';

import randomstring from 'randomstring';
import Product from '../models/Product.js';

//import moment from 'moment';
import persianDate from 'persian-date';

import moment from 'jalali-moment';
import User from '../models/User.js';

moment.locale('fa');

const orderController = {

  create: async (req, res) => {
    const order = req.body;
    let orderCode = generateOrderCode();
      

    function generateOrderCode() {
      return randomstring.generate({
        length: 10,
        charset: 'numeric'
      });
    }
      
    try {

      // check in case our random number exist in db 
      const orderDB = await Order.find({ number: orderCode });
      if (orderDB.length) {orderCode = generateOrderCode()}

      order.number = orderCode;
      console.log('==========>>>>> order: ', order);

      if (order) {
        // generate a unique order number
        const newOrder = new Order(order);
        const orderM = await newOrder.save();
        return res.status(200).json(orderM);
      }
      


    } catch(err) {
      return res.status(400).json({ message: 'controller: orders/create', err: err.message });
    }
  },


  /* get orders by user and status */


  getByUser: async (req, res, next) => {
    const userId = req.params.user;
    const status = req.params.status;
    const imgUrl = HELPER.getImgUrl(req);

    console.log(req.params)
    console.log(req.query)
   
    try {

      const orders = await Order.find({
        $and: [
          {user: userId},
          {status: status}
        ]
      });      

      //console.log(orders);
      // get an array of all products:
      const editedOrders = JSON.parse(JSON.stringify(orders));
      for (let i=0; i < editedOrders.length; i++) {
        // order date:
        //editedOrders[i].date = moment(editedOrders[i].createdAt).format('YYYY/MM/DD');

        let pDate = new persianDate(editedOrders[i].createdAt);
        let date = pDate.toLocale('fa').format('YYYY/MM/DD');
        editedOrders[i].date = date;

        for (let j=0; j < editedOrders[i].products.length; j++) {
          let product = await Product.find({_id: editedOrders[i].products[j].product});
          product = await HELPER.editProducts(product, imgUrl);
          product = product[0];
          editedOrders[i].products[j].product = product;
        }
     
      }

      
      req.customData = editedOrders;

      

      next();


      //return res.status(200).json(editedOrders);

    } catch(err) {
      return res.status(400).json({ 
        message: 'controller: orders/get/:user/:status' ,
        err: err.message,
        path: err.stack
      });
    }
  },







  
  getByStatus: async (req, res) => {
    const order = req.body?.order;
   
    try {

      if (order) {
        // generate a unique order number


      }
      

      return res.status(200).json(cities);

    } catch(err) {
      return res.status(400).json({ message: 'controller: orders/get/:status' });
    }
  },


  test: async (req, res) => {
    let userId = '63ac6ec2e4c1f08b76f328c1'; 
    try {

      const user = await User.find({ _id: userId });

      const edited = await HELPER.formatUser(user[0]);
      

      return res.status(200).json(edited);

    } catch(err) {
      return res.status(400).json({ message: 'controller: orders/get/:status' });
    }
  },











  update: async (req, res) => {
    const order = req.body?.order;
   
    try {

      if (order) {
        // generate a unique order number


      }
      

      return res.status(200).json(cities);

    } catch(err) {
      return res.status(400).json({ message: 'controller: orders/update' });
    }
  },


}

export default orderController;