import { combineReducers } from 'redux';
// reducers:
import products from './productReducer.js';
import categories from './categoryReducer.js';
import search from './searchReducer';
import review from './reviewReducer.js';
import cart from './cartReducer.js';
import user from './userReducer.js';
import city from './cityReducer.js';
import order from './orderReducer.js';
import msg from './msgReducer.js';
import home from './homeReducer.js';
import admin from './adminReducer.js';
import toast from './toastReducer.js';
import payment from './payReducer.js';

// combine all reducers:
const rootReducer = combineReducers({
  productsStore: products,
  categoriesStore: categories,
  searchStore: search,
  reviewsStore: review,
  cartStore: cart,
  userStore: user,
  cityStore: city,
  orderStore: order,
  msgStore: msg,
  homeStore: home,
  adminStore: admin,
  toastStore: toast,
  paymentStore: payment,
});

export default rootReducer;