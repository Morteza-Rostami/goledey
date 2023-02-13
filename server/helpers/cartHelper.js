import Product from "../models/Product.js";
import HELPER from "./helpers.js";


const cartHelper = {

  updateCart: async (cart, imgUrl) => {


    // update cart products
    for (let i=0; i < cart.products.length; i++) {
      const item = await Product
        .findOne({ _id: cart.products[i].product._id })
        .populate('categories');
      const edItem = await HELPER.editProducts([item], imgUrl);
      cart.products[i].product = edItem[0];
    }


    // calc cart.products.item.total
    cartHelper.calcTotalEach(cart);



    // calc cart.total
    cartHelper.calcTotalAll(cart);

    // save
    const upCart = await cart.save();
    return upCart;
  },

  calcTotalEach: (cart) => {
    cart.products.forEach(( item, i ) => {
      item.total = item.product.price * item.amount;
    });  
  },

  calcTotalAll: (cart) => {
    cart.total = 0;
    cart.products.forEach((item, i) => {
      cart.total += item.total;
    });
  },

  countItems: () => {

  },
}

export default cartHelper;