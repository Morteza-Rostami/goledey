
import { ONGOING, UNPAID } from '../CONST/CONSTBACK.js';
import HELPER from '../helpers/helpers.js';
import Order from '../models/Order.js';

// model
import Product from '../models/Product.js';

import persianDate from 'persian-date';
import User from '../models/User.js';

const getOrdersDB = async (imgUrl) => {
  const orders = [];
      
  // get all ongoing orders
  const ongoing = await Order.find({ status: ONGOING})
    .populate('user')
  // get all unpaid orders
  const unpaid = await Order.find({ status: UNPAID })
    .populate('user')

  // also convert docs to object:
  orders.push(...ongoing.map(item => item.toObject()))
  orders.push(...unpaid.map(item => item.toObject()))

  // get: user.address.city
  for (let i=0; i < orders.length; i++) {
    const order = orders[i];
    order.user = await User.findOne({ _id: order.user._id }).populate('address.city')
  }

  // get products
  for (let i=0; i < orders.length; i++) {
    const order = orders[i];
    const products = orders[i].products;

    let pDate = new persianDate(order.deliveryTime);
    let date = pDate.toLocale('fa').format('YYYY/MM/DD');
    order.deliverDate = date;

    for (let j=0; j < products.length; j++) {
      const item = products[j];
      const product = await Product.findOne({ _id: item.product }).populate('categories');
      const edProducts = await HELPER.editProducts([product], imgUrl);
      item.product = edProducts[0];
    }
  }

  return orders;
}

const adminController = {

  // get all products
  getProducts: async (req, res) => {
    let imgUrl = HELPER.getImgUrl(req);
   
    try {
      
      const products = await Product.find().populate('categories');

      // data to send:
      const customData = await HELPER.editProducts(products, imgUrl);
      
      // get first picture
      const data = customData.map((item) => ({...item, pic: item.pictures[0]}));

      return res.status(200).json(data);

    } catch(err) {
      return res.status(400).json({ message: 'controller: admin/getProducts', err: err.message });
    }
  },

  /* uploading one image */
  uploadImg: async (req, res) => {
    try {
      
      console.log(req);

    } catch(err) {
      return res.status(400).json({ message: 'controller: admin/uploadImg', 
        err: err.message });
    }
  },

  // get orders 
  getOrders: async (req, res) => {
    const imgUrl = HELPER.getImgUrl(req);
    const orders = [];

    try {
      
      const orders = await getOrdersDB(imgUrl);

      return res.status(200).json({
        success: true,
        message: 'admin orders fetched.',
        result: orders,
      });
      

    } catch(err) {
      return res.status(400).json({ 
        message: 'controller: admin/getOrders', 
        err: err.message,
        path: err.stack, 
      });
    }
  },

  // send order message
  createAdminOrderMsg: async (req, res) => {
    const { orderId, status, adminMsg } = req.body;
    const imgUrl = HELPER.getImgUrl(req);


    try {
        
      const order = await Order.findOne({ _id: orderId });

      if (status) {
        order.status = status;
      }

      if (adminMsg) {
        order.adminMsg = adminMsg;
      }

      const upOrder = await order.save();
      
      /* upOrder.user = 
        await User.findOne({ _id: upOrder.user._id })
        .populate('address.city') */


      const orders = await getOrdersDB(imgUrl);
      

/* 
      // also convert docs to object:
      const orderObj = upOrder.toObject();

      
      let pDate = new persianDate(orderObj.deliveryTime);
      let date = pDate.toLocale('fa').format('YYYY/MM/DD');
      orderObj.deliverDate = date;

      // get products
      const products = orderObj.products;

      for (let j=0; j < products.length; j++) {
        const item = products[j];
        const product = 
          await Product.findOne({ _id: item.product }).populate('categories');
        const edProducts = await HELPER.editProducts([product], imgUrl);
        item.product = edProducts[0];
      }

      orderObj.products = products; */
      

      return res.status(200).json({
        success: true,
        message: 'سفارش آپدیت شد.',
        result: orders,
      })

    } catch(err) {
      return res.status(400).json({ 
        message: 'controller: admin/getOrders', 
        err: err.message,
        path: err.stack, 
      });
    }
  },

}



export default adminController;