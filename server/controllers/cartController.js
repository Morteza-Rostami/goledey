
// model
import { ACTION_FAILED, ADD_ITEM_SUCCESS } from "../CONST/CONSTBACK.js";
import cartHelper from "../helpers/cartHelper.js";
import HELPER from "../helpers/helpers.js";
import Cart from "../models/Cart.js";
import Product from '../models/Product.js';

import mongoose from "mongoose";
const objectId = mongoose.Types.ObjectId;

const cartController = {


  // add item to cart:
  addToCart: async (req, res) => {
    const { userId, itemSlug, cardMsg } = req.body;
    let imgUrl = HELPER.getImgUrl(req);
    

    try {

      const product = await Product.findOne({ slug: itemSlug }).populate('categories');

      // edit product
      const edProducts = await HELPER.editProducts([product], imgUrl)

      const item = {
        product: edProducts[0],
        amount: 1,
        total: product.price,
        cardMsg: cardMsg || '',
        diff: {price: 0, txt: ''},
      }

      // if: cart exist
      const cart = await Cart.findOne({ user: userId });
      

      if (cart) {

        /* // if item is in cart
        if (cart.products) {

        } else {
          // item not in cart

        } */

        // cart exist => find product in cart.products.product 
        // increment item.amount, item.total, cart.itemsCount, cart.total

        // adding a item that is not in cart => cause: addToCartBtn is disabled: if: itemIsInCard
        cart.products.push(item);
        cart.itemsCount += 1;
        cart.total += edProducts[0].price;
        const model = await cart.save();

        return res.status(200).json({
          success: true,
          message: ADD_ITEM_SUCCESS,
          result: model,
        });



      } else {
        // if: no cart

        

        // create new card:
        const newcart = new Cart({
          user: userId,
          products: [item],
          itemsCount: 1,
          total: product.price,
        });

        const model = await newcart.save();

        return res.status(200).json({
          success: true,
          message: ADD_ITEM_SUCCESS,
          result: model,
        });

      }


    } catch(err) {
      return res.status(400).json({
        err: err.message,
        message: ACTION_FAILED,
        path: err.stack
      })
    }
  },

  // add item to cart:=======================================================>>>
  incItem: async (req, res) => {
    const { userId, itemSlug } = req.body;

    

    try {

      // cart.prodcuts[i].item.amount += 1
      // cart.itemsCount += 1

      // cart.products.item.total = product.price * amount;
      // cart.total += product.price.
      
      const cart = await Cart.findOne({ user: userId });
      const product = await Product.findOne({ slug: itemSlug }).populate('categories');

      if (cart) {
        cart.products.forEach(
          (item, i) => { 
            if (item.product._id.toString() === product._id.toString()) {
              item.amount += 1;
              item.total = item.product.price * item.amount;
            }
          }
        )

        cart.itemsCount += 1;
        cart.total += product.price;

        // save to db
        const upCart = await cart.save();

        return res.status(200).json({
          success: true,
          message: 'item was incremented.',
          result: upCart,
        })
      }


    } catch(err) {
      return res.status(400).json({
        err: err,
        message: err.message,
        path: err.stack
      })
    }
  },

  // add item to cart:=======================================================>>>
  decItem: async (req, res) => {
    const { userId, itemSlug } = req.body;

    try {

      const cart = await Cart.findOne({ user: userId });
      const product = await Product.findOne({ slug: itemSlug }).populate('categories');

      if (cart) {
        cart.products.forEach(
          (item, i) => { 
            if (item.product._id.toString() === product._id.toString()) {
              if (item.amount > 1) {
                item.amount -= 1;
              }
              item.total = item.product.price * item.amount;
            }
          }
        )

        if (cart.itemsCount > 1) {
          cart.itemsCount -= 1;
          cart.total -= product.price;
        }

        // save to db
        const upCart = await cart.save();

        return res.status(200).json({
          success: true,
          message: 'item was decremented.',
          result: upCart,
        })
      }

    } catch(err) {
      return res.status(400).json({
        err: err,
        message: err.message,
        path: err.stack
      })
    }
  },

  // add item to cart:=======================================================>>>
  removeItem: async (req, res) => {
    const { userId, itemSlug } = req.body;

   
    try {

      const cart = await Cart.findOne({ user: userId });
      const product = await Product.findOne({ slug: itemSlug });

      cart.products = cart.products.filter((item, i) => {
        // cart.itemsCount - item.amount
        if (item.product.slug === product.slug) {
          cart.itemsCount -= item.amount;
          cart.total -= item.total;
        }
        // returen other items.
        return item.product.slug !== product.slug;
      });

      // if: cart empty => delete the db.cart
      if (!cart.products.length) {
        const done = await Cart.deleteOne({ user: userId });
        
        if (done.deletedCount > 0) {

          return res.status(200).json({
            success: true,
            message: 'cart was deleted!',
            deleted: true,
          });


        } else {
          return res.status(200).json({
            success: true,
            message: 'deleting cart failed!',
            deleted: false,
          });
        }
      } else { // update the cart
        const upCart = await cart.save();


        return res.status(200).json({
          success: true,
          message: 'item was removed.',
          updated: true,
          result: upCart,
        });

      }


    } catch(err) {
      return res.status(400).json({
        err: err,
        message: err.message,
        path: err.stack
      })
    }
  },

  // add item to cart:=======================================================>>>
  isInCart: async (req, res) => {
    const { userId, itemSlug } = req.body;
    let isIn = false;

    try {

      // if there is a cart
      const cart = await Cart.findOne({ user:  userId});
      // product
      const product = await Product.findOne({ slug: itemSlug });

      if (cart) {
        // cart has the product:
        
        if (cart.products.some((item, i) => item.product._id.toString() === product._id.toString())) {
          isIn = true;
        }
      }

      return res.status(200).json({
        success: true,
        message: '',
        result: isIn,
      });

    } catch(err) {
      return res.status(400).json({
        err: err,
        message: err.message,
        path: err.stack
      })
    }
  },

  // add item to cart:=======================================================>>>
  getCart: async (req, res) => {
    const userId = req.params.id;
    let imgUrl = HELPER.getImgUrl(req);

    try {

      // get cart
      const cart = await Cart.findOne({ user: userId });
      
      if (cart){
        // update cart -> by new products
        const upCart = await cartHelper.updateCart(cart, imgUrl);
        
        
        const copy = JSON.parse(JSON.stringify({...upCart.toObject()}));
        // order count
        copy.ordersCount = await HELPER.countOrders(userId);
        
        // response cart
        return res.status(200).json({
          success: true,
          message: '',
          result: copy,
        }) 
      } else {
        // there is not cart:
        return res.status(200).json({
          success: true,
          message: 'there is no cart.',
          result: {
            products: [],
            itemsCount: 0,
            total: 0,
          }
        });
      }

    } catch(err) {
      return res.status(400).json({
        err: err,
        message: err.message,
        path: err.stack
      })
    }
  },

  // add item to cart:=======================================================>>>

  // data: userId, LS.cart
  getOrConcat: async (req, res) => {
    const { userId, cartLS } = req.body;

    try {

      const cart = await Cart.findOne({ user: userId });

      const newItems = [];

      if (cart) {

        // check if cartLS.item exist in cart
        /* const inCartOrWhat = 
          (itemLS) =>  
          cart.products.some(
            (itemDB, i) => 
              itemDB.product.slug === itemLS.product.slug
          ); */

        const inCartOrWhat = (itemLS) =>
          cart.products
            .map((item, i) => item.product.slug)
            .indexOf(itemLS.product.slug);

        cartLS.products.forEach((itemLS, i) => {
          // the item already exist => do not push at all
          let inx = inCartOrWhat(itemLS);
          if (inx !== -1) {
            // does exist => increment: item 

            // inc => cart.amount and cart.total
            cart.products[inx].amount += itemLS.amount;
            cart.products[inx].total += itemLS.total;

            return;
          }

          // does not exist push it
          newItems.push(itemLS);
        });

        
        // if there is a new item -> cart.products.push(...newItems)
        if (newItems.length) {
          cart.products.push(...newItems);
        }
         
        // cart.itemsCount and cart.total
        cart.itemsCount += cartLS.itemsCount;
        cart.total += cartLS.total;
        
        // save
        const upCart = await cart.save();


        return res.status(200).json({
          success: true,
          message: 'localstorage items was added.',
          result: upCart,
        });

      } else {
        // cart does not exist
        const cartModel = new Cart({
          user: userId,
          products: cartLS.products,
          itemsCount: Number(cartLS.itemsCount),
          total: Number(cartLS.total),
        });

        const newCart = await cartModel.save();

        return res.status(200).json({
          success: true,
          message: 'localstorage items was added. cart created!',
          result: newCart,
        });
      }

    } catch(err) {
      return res.status(400).json({
        err: err,
        message: err.message,
        path: err.stack
      })
    }
  },










}

export default cartController;