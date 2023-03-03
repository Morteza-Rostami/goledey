import axios from 'axios';
import CONST, { PRODUCTS_LIMIT } from '../CONSTANTS/CONST';


// set auth token for all axios requests:
const token = JSON.parse(localStorage.getItem(CONST.AUTH))?.token;

if (token) {
  axios.defaults.headers.common["x-auth-token"] = token;
} else {
  delete axios.defaults.headers.common["x-auth-token"];
}

const AXIOS = axios.create({ 
  baseURL: `${process.env.REACT_APP_API_URL}`
});



/* const header = {
  headers: {
    "content-type": "application/json"
  }
}; */

// config for uploading images
const axiosConfig = {
  headers: {
    'content-type': 'multipart/form-data',
  }
}


const API = {
  // get all
  getProducts: (
    mCat, sCat, page, filters, term
  ) => {
    // getProducts url:
    // const catFilters = 
    // (filters) 
    //   ? filters.map((cat, inx) => `filters[${inx}]=${cat.slug}`).join('&') 
    //   : '';
    const qPage = `?page=${page}`;
    const limit = `&limit=${PRODUCTS_LIMIT}`;
    const qCategories = `&categories=${[mCat, sCat].filter(i => i !== null).toString()}`;
    const qFilters = `&filters=${filters ? filters.toString() : ''}`;
    const qTerm = `&term=${term}`;
    return AXIOS.get(
      `/products/get${qPage}${limit}${qCategories}${qFilters}${qTerm}`)
  },
  // get one
  getProduct: (slug) => {
    return AXIOS.get(`/products/get/${slug}`);
  }, 
  // create
  createProduct: (data) => AXIOS.post('/products/create', data, axiosConfig),
  // update
  updateProduct: (formD, id) => AXIOS.patch(`/products/update/${id}`, formD),

  // update one product img
  updateOneItemImg: (pic, id) => AXIOS.patch(`/products/updateImg/${id}`, pic, axiosConfig),

  // delete

  // search product
  // searchProduct: (page, term) => AXIOS.get(
  //   `/products/search?page=${page}&limit=${PRODUCTS_LIMIT}&term=${term}`),

  // ** categories

  // read all
  getCategories: () => AXIOS.get('/categories/get'),
  getOneCat: (slug) => AXIOS.get(`/categories/get/${slug}`), 

  // ** reviews

  // get all reviews
  getReviews: (productSlug, page, limit) => 
  AXIOS.get(`/reviews/get/${productSlug}?page=${page}&limit=${limit}`),
  // create new reviews
  createReview: (review) => AXIOS.post('/reviews/create', review),

  // ** users:
  register: (user) => AXIOS.post('/users/register', user),
  verifyOtp: (user) => AXIOS.post('/users/verifyOtp', user), 
  updateUser: (user, id) => AXIOS.patch(`/users/update/${id}`, user),
  updateAddress: (address, id) => AXIOS.patch(`/users/address/${id}`, address),

  // cart **

  // create or update cart
  // createCart: (data) => AXIOS.post('/cart/create-update', data),
  // getCart: (userId) => AXIOS.get(`/cart/get/${userId}`),

  addToCart: (data) => AXIOS.post(`/cart/add-to-cart/${data.userId}`, data),
  incItem: (data) => AXIOS.patch(`/cart/inc-item/${data.userId}`, data),
  decItem: (data) => AXIOS.patch(`/cart/dec-item/${data.userId}`, data),
  removeItem: (data) => AXIOS.delete(`/cart/remove-item/${data.userId}`, { data: data }),
  isInCart: (data) => AXIOS.post(`/cart/is-in-cart/${data.userId}`, data),
  getCart: (data) => AXIOS.get(`/cart/get-cart/${data.userId}`, data),
  getOrConcat: (data) => AXIOS.post(`/cart/get-or-concat/${data.userId}`, data),


  // cities:
  getCities: () => AXIOS.get('/cities/get'),
  //updateShippingCost: () => AXIOS.post('/cities/shippingCost'),

  // orders: **

  createOrder: (order) => AXIOS.post('/orders/create', order),
  fetchOrdersByUser: (id, status, page=1, limit=1) => 
    AXIOS.get(`/orders/get/${id}/${status}?page=${page}&limit=${limit}`),

  getOrderCounts: (data) => AXIOS.post('/orders/order-counts', data),
  
  // homepage: **
  getHomeData: () => AXIOS.get('/home/get'),

  // admin **

  // get all products
  adminFetchProducts: () => AXIOS.get('/admin/products'),
  removeProduct: (id) => AXIOS.delete(`/products/delete/${id}`),
  adminFetchOrders: () => AXIOS.get(`/admin/get-orders`),
  adminMakeOrderMsg: (data) => AXIOS.post(`/admin/order-msg`, data),

  // payment **:
  makePayment: (data) => AXIOS.post(`/transactions/pay`, data),
  verifyPayment: (data) => AXIOS.post('/transactions/verify-pay', data),
}


export default API;