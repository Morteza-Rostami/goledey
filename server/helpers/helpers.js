
import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
const __dirname = path.resolve('./');
const asyncReadFile = promisify(readFile);
import mongoose from 'mongoose';

import City from '../models/City.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import { CANCELED, DELIVERED, ONGOING, UNPAID } from '../CONST/CONSTBACK.js';


const HELPER = {

  // return svg file content:
  getSvg: async (svgName) => {
    const svgPath = __dirname + `/public/images/${svgName}`;

    const data = await asyncReadFile(svgPath); 
    return data.toString();
  },

  /* ***********************************************************8 */
  /* ***********************************************************8 */

  // calc average:
  calcAverage: (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = (sum / arr.length) || 0;
    const rounded = Math.round(avg * 10) / 10;
    return rounded;
  },

  /* ***********************************************************8 */
  /* ***********************************************************8 */

  // edit products:
  editProducts: async (products, imgUrl) => {
    let averating = 0;

    const customProducts = 
      products
      .map(item => {
          let pictures = item.pictures.map(pic => imgUrl + pic);
          return {
            _id: item._id,
            name: item.name,
            slug: item.slug,
            shortDesc: item.shortDesc,
            longDesc: item.longDesc,
            inStock: item.inStock,
            hasCardMsg: item?.hasCardMsg,
            price: item.price,
            createdAt: item.createdAt,
            pictures: pictures,
            categories: item?.categories
          };
      });

    // add rating to each product:

    for (let i=0; i < customProducts.length; i++) {
      const item = customProducts[i];
      const reviews = await Review.find({ productId: item._id });
      // number of reviews per product
      customProducts[i].numOfReviews = reviews?.length || 0;
      const ratings = reviews.map(val => val.rating);
      const aveRating = HELPER.calcAverage(ratings);
      customProducts[i].aveRate = aveRating;
    }

    return customProducts;
  },

  /* ***********************************************************8 */
  /* ***********************************************************8 */

  // get path to image
  getImgUrl: (req) => {
    let imgUrl = req.protocol + '://' + req.get('host');
    imgUrl = imgUrl + '/' + `public/images/`;
    return imgUrl;
  },

  /* ***********************************************************8 */
  /* ***********************************************************8 */

  // edit user
  formatUser: async (user) => {
    let editedUser = {};

    // take password out.
    const {password, ...rest} = user._doc || user;

    // number of user orders
    // editedUser.ordersCount = await HELPER.countOrders(user._id);

    // get city
    if (rest?.address?.city) {
      const city = await City.findOne(rest.address.city);
      
      // copy:
      editedUser = JSON.parse(JSON.stringify(rest));
      editedUser.address.city = city;
      editedUser.ordersCount = await HELPER.countOrders(user._id);

      return editedUser;
    } 

    rest.ordersCount = await HELPER.countOrders(user._id);

    return rest;
  },

  /* ***********************************************************8 */
  /* ***********************************************************8 */


  // get top selling products
  getTopSell: async (catId, req) => {

    const imgUrl = HELPER.getImgUrl(req);
    const productsArr = [];
    const sells = {
      // name: += amount
    };
    const sellsArr = [];
    const limit = 20;

    // get all orders
    const orders = await Order.find({});

    // all products
    const products = await Product.find();

    for (let i=0; i < orders.length; i++) {
      for (let j=0; j < orders[i].products.length; j++) {
        const item = orders[i].products[j];
        // if: order not deleted.
        //if (products.some((vl, i) => vl._id === item.product))
        // get product model by id
        const model = await Product.findById(item.product);
        item.product = model;

        // get product by category:
        if (item.product.categories.some(cat => 
          cat._id.toString() === catId)) {
            productsArr.push(item);
          }
      }
    }



    // loop and get the amuont of each product sold:
    productsArr.forEach((item) => {
      sells[item.product.slug] = 0;
      sells[item.product.slug] += item.amount;
    });

    // make an array we can sort:
    for (const [key, val] of Object.entries(sells)) {
      sellsArr.push({ [key]: val });
    }


    // sort
    sellsArr.sort((a, b) => {
      // 4 - 2 = 2 pos so: a > b or: 2 - 4 = -2 => neg so: b > a or: 4 - 4 = 0 so: a = b
      // return (a[Object.keys(a)[0]] - b[Object.keys(b)[0]]); ascending
      return ( b[Object.keys(b)[0]] - a[Object.keys(a)[0]] ); // descending
    })



    // take first 20
    const topItemNames = sellsArr.slice(0, limit).map(item => Object.keys(item)[0]);


    // ===============================================

    // if: not enough products in orders => just return some products
    if (topItemNames.length <= limit) {
      // get some products with given category
      const catProducts = await Product.find({
        categories: {_id: catId}
      });

      let editedCProducts = await HELPER.editProducts(catProducts, imgUrl);
      // take 4
      editedCProducts =  editedCProducts.slice(0, limit);
   
      return editedCProducts;
    } 

    // ===============================================


    const topItems = [];

    for (let i=0; i < topItemNames.length; i++) {
      const pModel = await Product.find({ slug: topItemNames[i] });

      const editedM = await HELPER.editProducts(pModel, imgUrl);

      topItems.push(editedM[0]);
    }

    return topItems;
  },

  /* ********************************************************* */

  // get svg for each category and send it with response:
  editCategories: async (categories) =>  {
    let customCategories = [];
    let catObj = {};

    for (let i=0; i < categories.length; i++) {
      const subCatIds = categories[i].subCatIds;
      let subCats = [];
      if (subCatIds.length) {
        subCats.push(...await Category.find().where('_id').in(subCatIds));
      }

      catObj = {
        _id: categories[i]._id,
        name: categories[i].name,
        slug: categories[i].slug,
        // icon: categories[i].icon,
        type: categories[i].type,
        subCats: [...subCats],
      }
      // let svg = await HELPER.getSvg(categories[i].icon);
      // catObj.svg = svg
      customCategories.push(catObj);
    }

    return customCategories;
  },

  /* edit cart */
  editCart: async (cart, imgUrl) => {
    // get all productModels into cart
    //|| cart[0]._doc

    let cartM = Object.assign({}, cart[0]._doc);

    let cartE = {
      products: [],
      itemsCount: cartM.itemsCount,
      total: cartM.total,
    };
       
    for (let i=0; i < cartM.products.length; i++) {
      const productModel = await Product.find({ _id: cartM.products[i].product });
      const customProducts = await HELPER.editProducts(productModel, imgUrl);
      const product = {
        _id: cartM.products[i]._id,
        product: customProducts[0],
        amount: cartM.products[i].amount,
        total: cartM.products[i].total,
        cardMsg: cartM.products[i]?.cardMsg,
      }
      cartE.products.push(product);
    }

    return cartE;
  },

  /* count number of orders by status */
  countOrders: async (userId) => {
    let ongoingCount = 0;
    let deliveredCount = 0;
    let canceledCount = 0;
    let unpaidCount = 0;
    // get all user orders
    const ongoing = await Order.find({ $and: [{user: userId}, {status: ONGOING}]});
    const delivered = await Order.find({ $and: [{user: userId}, {status: DELIVERED}]});
    const unpaid = await Order.find({ $and: [{user: userId}, {status: UNPAID}]});
    const canceled = await Order.find({ $and: [{user: userId}, {status: CANCELED}]});

    // how many ongoing and so on:
    ongoingCount = ongoing.length;
    deliveredCount = delivered.length;
    unpaidCount = unpaid.length;
    canceledCount = canceled.length;

    const orderCounts = {ongoingCount, deliveredCount, unpaidCount, canceledCount};
    return orderCounts;
  },

}

export default HELPER;