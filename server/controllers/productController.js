
// import model:
import { SUCCEED, FAILED } from '../CONST/CONSTBACK.js';
import HELPER from '../helpers/helpers.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

import Randomstring from 'randomstring';

import { inspect } from 'util';
import path from 'path';
import fs from 'fs';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';


const productController = {
  

  /* ********************** read all and filter ************************ */

  get: async (req, res, next) => {
    let imgUrl = HELPER.getImgUrl(req);
    const TERM = req.query?.term;
    const FILTERS = req.query?.filters;
    // check if it's empty string:
    const catFilters = 
      req.query.categories 
      ? req.query?.categories.split(',')
      : '';
    const LIMIT = req.query?.limit;
    const PAGE = req.query?.page;
    const CAT = 'cat';
    const OCC = 'occ';
    let products = [];
    let categories = [];

    const makeObjectId = mongoose.Types.ObjectId;

    console.log(req.query)
    console.log(catFilters)
    //console.log(req.params)
    
    try {

      // if there is search term:
      if (TERM) {
        products = await Product.find({ $text: { $search: TERM } });
      } else if (catFilters.length) {

        // categories = await Product.find({ slug: catFilters });

        // get all categories:
        for (let i=0; i < catFilters.length; i++) {
          let categ = await Category.findOne({ slug: catFilters[i] });
          categories.push(categ);
        }

    
        const cats = categories.filter(item => item.type === CAT) || [];
        const occs = categories.filter(item => item.type === OCC) || [];

        // any products: (catA or catB) and (catC or catD)

        console.log('^^^^^^^^^^^^^^^^^^^')
        console.log(cats, occs);

        // query objects:
        const catsQueries = 
          cats?.length
            ? cats.map(cat => ({
              "categories": makeObjectId(cat._id)
            }))
            : [];

        // "categories": {_id: makeObjectId(occ._id) }
        const occsQueries = 
        occs?.length
          ? occs.map(occ => ({
            "categories": makeObjectId(occ._id)
          }))
          : [];

        console.log('********************')
        console.log(catsQueries)
        console.log(occsQueries)

        /* if (catsQueries.length) {
          const procats = await Product.find({
            $or: catsQueries,
          })
          products.push(...procats)
        }

        if (occsQueries.length) {
          const prooccs = await Product.find({
            $or: occsQueries,
          });
        } */

        /* const fCatsQue = '';
        if (catsQueries.length) {
          fCatsQue = { '$or': catsQueries };
        } */
/* 
        products = 
          await Product
            .find({
              $and: [
                catsQueries?.length 
                  ?
                  { 
                    $or: catsQueries
                  }
                  : { name: 'sex78' },
                occsQueries?.length 
                  ?
                  { 
                    $or: occsQueries
                  }
                  : { name: 'sex78' }
              ]
            });

                 */

        const productModels = await Product.find().populate('categories');

        let productObjs = productModels.map(item => item.toObject());

        categories.forEach((cat, i) => {
          productObjs = 
            productObjs
            .filter(item => 
              item.categories.some(catObj => catObj._id.toString() === cat._id.toString()));
        });

        products = [...productObjs];

        console.log('--', products.map(item => item.name))
              
      } else {
        // all products:
        products = await Product.find().populate('categories');
      } 


      // adding pictures url
      const customProducts = await HELPER.editProducts(products, imgUrl);
      
      // send response:
      req.customData = customProducts;
      next();
      // setTimeout(() => {
      //   res.status(200).json(customProducts);
      // }, 5000);

    } catch(err) {
      console.log(err.message);
      console.log(err.stack);
      return res.json({ message: 'controller: products/get failed!', err: err.message });
    }

  },

  /* ********************** read one ************************ */

  getOne: async (req, res) => {
    // res.send({
    //   message: 'getting porduct',
    //   req: req.params
    // });
    const slug = req.params.slug;
    const imgUrl = HELPER.getImgUrl(req);
    let product = [];
    let customProducts = [];


    try {
      product = await Product.find({ slug: slug }).populate('categories');
      const categories = product[0].categories;

      

      if (product) {
        customProducts = await HELPER.editProducts(product, imgUrl);
        let productObj = customProducts[0];

        
        // related products:

        // mongoose query:
        const relatedQueries = 
        categories?.length
          ? categories.map(cat => ({"categories": {_id: cat._id }}))
          : [];

        const relateds = await Product.find({
          $or: [...relatedQueries]
        })
        
        
        // edit relateds
        const editedRelated = await HELPER.editProducts(relateds, imgUrl);

        productObj.relateds = editedRelated; 

      //   res.status(200).send(productObj);
      // return
        return res.status(200).json(productObj);
      }
      else throw 'product not found!';

    } catch(err) {
      return res.json({message: 'controller: /product/get/:slug', err: err.message});
    }

  },

  /* ********************** create ************************ */

  create: async (req, res) => {
    // find categories:
    const categoriesStr = req.body.categories.split(',');
    let categoriesArr = [];
    //const categoriesArr = categoriesStr.map(cat => Category.find({ slug:  }));


    
    try {
      // get categories Modles:
      for (let i=0; i < categoriesStr.length; i++) {
        let category = await Category.findOne({ slug: categoriesStr[i] });
        categoriesArr.push(category);
      }

      
  
      // make a model:
      const product = new Product({
        code: req.randStr,
        name: req.body.name.length ? req.body.name : req.randStr,
        shortDesc: req.body.shortDesc,
        longDesc: req.body.longDesc,
        slug: req.slug,
        inStock: req.body.inStock,
        price: req.body.price,
        pictures: req.imgInfos,
        categories: categoriesArr,
        tags: req.body.tags,
      });

      // save to db:
      const newProduct = await product.save();

      return res.status(200).json(newProduct);
    } catch (err) {
      return res.status(400).json({ 
        message: 'controller: /product/create', 
        err: err.message,
        path: err.stack 
      });
    }

  },

  /* ********************** update ************************ */






  update: async (req, res) => {
    const id = req.params.id;
    const imgUrl = HELPER.getImgUrl(req);

    // categories
    const categories = req.body.categories;
    
    try {
      // find post by id 
      const product = await Product.findOne({_id: id});
      // update and save to db
      const aName = req.body.name;
      
      if (aName && !/^\s+$/.test(aName)) {
        product.name = req.body.name;
      } else {
        product.name = product.code;
      }

      product.price = req.body.price;
      product.shortDesc = req.body.shortDesc;
      product.inStock = req.body.inStock;
      product.hasCardMsg = req.body.hasCardMsg;
      product.categories = categories;

      await product.save();

      // get updated product with categories
      const items = await Product.find({ _id: id }).populate('categories');

      const edited = await HELPER.editProducts(items, imgUrl);

      // response with updated model
      return res.status(200).json(edited[0]);

    } catch(err) {
      return res.status(400).json({
        message: 'controller: products/update', 
        err: err.message,
        path: err.stack,
      });
    }
  },

  updateImg: async (req, res) => {
    const id = req.params.id;
    const index = req.body.index;
    const imgUrl = HELPER.getImgUrl(req);

    try {
     
      const updated = await Product.findByIdAndUpdate(
        {_id: id},
        {$set: {[`pictures.${index}`]: req.imgInfo}},
        {new: true}
      ).populate('categories');

      const edited = await HELPER.editProducts([updated], imgUrl);

      return res.status(200).json(edited[0]);

    } catch(err) {
      return res.status(400).json({message: 'controller: products/updateImg', err: err.message});
    }
  },








  /* ********************** delete ************************ */

  delete: async (req, res) => {
    // for front end
    const imgUrl = HELPER.getImgUrl(req);

    // product id
    const id = req.params.id;
    const __dirname = path.resolve('./');
    const imgPath = path.join(__dirname, `/public/images`);

    

    try {

      // get the product model
      const product = await Product.findOne({ _id: id })


      // remove deleted products from carts:


      const resu = await Cart.updateMany(
        {},
        { $pull: {'products': { product: id }} }
      );

      //return res.json(resu.modifiedCount)

      if (resu.modifiedCount > 0) {
        const carts = await Cart.find();

        // remove product from: cart.products[i].product
        for (let i =0; i < carts.length; i++) {
          let amount = 0;
          let total = 0;
          for (let j=0; j < carts[i].products.length; j++) {
            amount += carts[i].products[j].amount;
            total += carts[i].products[j].total;
  
            carts[i].itemsCount = amount;
            carts[i].total = total;
  
            await carts[i].save();
  
          }
        }

      }

      // remove deleted product from orders
      

      const resu2 = await Order.updateMany(
        {},
        { $pull: {'products': { product: id }} }
      );

      // if: order was modified calc total
      if (resu2.modifiedCount > 0) {
        
        const orders = await Order.find();
  
        // remove product from: Order.products[i].product
        for (let i =0; i < orders.length; i++) {
          //let amount = 0;
          let total = 0;
          for (let j=0; j < orders[i].products.length; j++) {
            //amount += orders[i].products[j].amount;
            total += orders[i].products[j].total;
  
            //orders[i].itemsCount = amount;
            orders[i].total = total;
  
            await orders[i].save();
  
          }
        }
      }


      // delete the pictures from disk
      product.pictures.map((pic, i) => {
        fs.unlinkSync(imgPath + '/' + pic);
      })

      // delete product reference from  cart

      

      // delete product from order

      // delete the doc
      await Product.deleteOne({ _id: id });

      // get all products:
      const products = await Product.find().populate('categories');
    
      const customProducts = await HELPER.editProducts(products, imgUrl);

      return res.status(200).json(customProducts);

      // remove doc and return info about delete:
      //const removedPost = await Post.remove({'_id': req.params.id});

      // response
      //return res.json(removedPost);
    } catch(err) {
      return res.json({
        err: err.message,
        path: err.stack,

      });
    }
  },















  /* search */
  /*  
  search: async (req, res, next) => {
    const term = req.query.term;
    let imgUrl = req.protocol + '://' + req.get('host');
    imgUrl = imgUrl + '/' + `public/images/`;

    try {
      // search for product.name.includes() = term
      //const products = await Product.find({ name: term });
      // MyModel.find({$text: {$search: searchString}})
      const products = await Product.find({ $text: { $search: term } });

      const customProducts = HELPER.editProducts(products, imgUrl);

      req.customData = customProducts;
      next();

    } catch (err) {
      res.status(401).json({ message: 'controller: products/search', err });
    }

  }
  */
};

export default productController;