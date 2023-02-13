// constant:

// product:
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const PRODUTC_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS';
export const FETCH_ONE_PRODUCT = 'FETCH_ONE_PRODUCT';
export const LOADING = 'LOADING';
export const LOADED = 'LOADED';
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
export const UPDATE_ONE_ITEM_IMG = 'UPDATE_ONE_ITEM_IMG';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const PRODUCTS_LIMIT = 20;

// categories
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SET_CAT_SUB = 'SET_CAT_SUB';
export const FETCH_ONE_CAT = 'FETCH_ONE_CAT';
export const SET_ACTIVE_CAT = 'SET_ACTIVE_CAT';
export const FORCE_REPAINT = 'FORCE_REPAINT';

// add and remove category chips.
export const SELECT_CATEGORY_CHIP = 'SELECT_CATEGORY_CHIP';
export const REMOVE_CATEGORY_CHIP = 'REMOVE_CATEGORY_CHIP'
// clear selectedCats
export const CLEAR_CATS = 'CLEAR_CATS';

// search
export const ADD_SEARCHED_TERM = 'ADD_SEARCHED_TERM';
export const DELETE_SEARCHED_TERM = 'DELETE_SEARCHED_TERM';

// review
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const CREATE_REVIEW = 'CREATE_REVIEW';
export const REFRESH_REVIEW_INFO = 'REFRESH_REVIEW_INFO';
export const IS_LOADING_REVIEWS = 'IS_LOADING_REVIEWS';
export const CLEAR_REVIEWS = 'CLEAR_REVIEWS';

// cart

export const UPDATE_CART_STORE_DB = 'UPDATE_CART_STORE_DB';
export const GET_CART_DB = 'GET_CART_DB';
export const GET_OR_CONCAT_DB = "GET_OR_CONCAT_DB";


export const ADD_TO_CART = 'ADD_TO_CART';
// get cart from localStorage:
export const GET_CART_LS = 'GET_CART_LS';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const INCREMENT_AMOUNT = 'INCREMENT_AMOUNT';
export const DECREMENT_AMOUNT = 'DECREMENT_AMOUNT';
export const CALC_TOTALS = 'CALC_TOTALS';
export const CALC_ITEMS_COUNT = 'CALC_ITEMS_COUNT';

export const STORE_CART_DB = 'STORE_CART_DB';
//export const GET_CART_DB = 'GET_CART_DB';
export const CLEAR_CART = 'CLEAR_CART';

export const IS_IN_CART = 'IS_IN_CART';
export const IS_CART_LOADING = 'IS_CART_LOADING';

//user **********************************************
export const REGISTER = 'REGISTER';
export const VERIFYOTP = 'VERIFYOTP';
export const LOGOUT = 'LOGOUT';
export const GET_AUTH_LS = 'GET_AUTH_LS';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const IS_LOADING_REGISTER = 'IS_LOADING_REGISTER';
export const IS_USER_COMPLETE = 'IS_USER_COMPLETE';

export const SUCCEED = 'SUCCEED';
export const FAILED = 'FAILED';

// cities
export const GET_CITIES = 'GET_CITIES';

// orders
export const CREATE_ORDER = 'CREATE_ORDER';
export const FETCH_ORDERS_BY_USER = 'FETCH_ORDERS_BY_USER';
export const RESET_ORDERS = 'RESET_ORDERS';
export const SET_ORDERS_LOADING = "SET_ORDERS_LOADING";

// msg
export const CREATE_CARD_MSG = 'CREATE_CARD_MSG';
export const REMOVE_CARD_MSG = 'REMOVE_CARD_MSG';
export const SET_SNACK_OBJ = 'SET_SNACK_OBJ';

/* screen load */
export const SCREEN_LOAD = 'SCREEN_LOAD';

export const START_SCREEN_LOAD = 'START_SCREEN_LOAD';
export const SET_SCREEN_LOAD = 'SET_SCREEN_LOAD';
export const DONE_SCREEN_LOAD = 'DONE_SCREEN_LOAD';

/* open register dialog */
export const STORE_OPEN_REGISTER = 'STORE_OPEN_REGISTER';
export const OPEN_REGISTER = 'OPEN_REGISTER';

// home page data
export const GET_HOME_DATA = 'GET_HOME_DATA';

// admin
export const ADMIN_FETCH_ITEMS = "ADMIN_FETCH_ITEMS";
export const UPDATE_ITEM_CATS = 'UPDATE_ITEM_CATS';
export const UPDATE_ITEM_IMGS = "UPDATE_ITEM_IMGS"; 
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADMIN_FETCH_ORDERS = 'ADMIN_FETCH_ORDERS';
export const ADMIN_MAKE_ORDER_MSG = 'ADMIN_MAKE_ORDER_MSG';

// toast
export const ADD_TOAST = 'ADD_TOAST';

/* icon sizes */
export const ICON_SIZE_MOB = 24;

// break points
const CONST = {

  /* break points */
  MOBILE400: 400,
  MOBILE_90: 600,
  TABLET: 1000,
  DESKTOP: 1200,
  // icons sizes

  MOBILE__90: 600,
  MOBILE: 800, // MOBILE_100
  TABLET__100: 1000,
  DESKTOP__100: 1200,


  mobIconSize: 17,

  icon20: 7,
  icon100: 20,

  // roles
  ADMIN: 'ADMIN',
  
  // status
  UNPAID : 'UNPAID',
  ONGOING : 'ONGOING',
  DELIVERED : 'DELIVERED',
  CANCELED : 'CANCELED',

  // card names 
  TCARDONE: 'TCARDONE',
  TCARDTWO: 'TCARDTWO',
  
  // category type
  CAT: 'cat',
  OCC: '0cc',
  
  // url
  HOME: '/',
  SHOP: '/shop',

  // url params
  MCAT: 'mCat',
  SCAT: 'sCat',
  TERM: 'term',

  PAGE: 1,

  reviewsLim: 10,
  ordersLim: 5,

  SUCCESS_SNACK: 'success',
  ERROR_SNACK: 'error',
  WARNING_SNACK: 'warning',
  INFO_SNACK: 'info',


  /* login page errors */
  phone: 'cellPhone',
  otp: 'otp',

  /* use profile links */
  dashboard: 'dashboard',
  orders: 'orders',
  settings: 'settings',
  address: 'address',

  /* address form: user page */
  fullAddress: 'fullAddress',

  AUTH: 'auth',
  CART: 'cart',
  CARD_MSG: 'cardMsg',

}



export default CONST;