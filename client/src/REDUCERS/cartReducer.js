import { 
  ADD_TO_CART, 
  CALC_ITEMS_COUNT, 
  DECREMENT_AMOUNT, 
  GET_CART_LS, 
  INCREMENT_AMOUNT, 
  REMOVE_CART_ITEM,
  CALC_TOTALS,
  STORE_CART_DB,
  GET_CART_DB,
  CLEAR_CART,
  IS_IN_CART,
  IS_CART_LOADING,
  UPDATE_CART_STORE_DB
} from "../CONSTANTS/CONST";

// initial state:
const init = {
  products: [
    // {
    //   product: {},
    //   amount: 1,
    //   total: 0,
    // }
  ],
  itemsCount: 0,
  total: 0,

  // before: dispatching action and setting false=> is not in cart and true => is in . null => means: no dispatch yet
  isInCart: null,

  /* productPage addToCart */
  isCartLoading: false,

  /* load for  */
  // isAmountLoading: false,

  ordersCount: {},
}

const cartReducer = (state=init, action) => {
  switch (action.type) {

    // db.cart to store.cart
    case UPDATE_CART_STORE_DB:
      return {...state, ...action.payload};

    // is item in cart 
    case IS_IN_CART:
      return { ...state, isInCart: action.payload }

    // loading cart stuff
    case IS_CART_LOADING:
      return { ...state, isCartLoading: action.payload };


    











    /* // add item
    case ADD_TO_CART:
      // deep copy the object to trigger useEffect based on changing redux value.
      return {...state, ...JSON.parse(JSON.stringify(action.payload))};

    case GET_CART_LS:
      return {...state, ...action.payload};

    // remove item
    case REMOVE_CART_ITEM:
      return {...state, ...JSON.parse(JSON.stringify(action.payload))};
    case INCREMENT_AMOUNT:
      return { ...state, ...action.payload };
    case DECREMENT_AMOUNT:
      return { ...state, ...action.payload };
    case CALC_ITEMS_COUNT:
      return { ...state, itemsCount: action.payload };
    case CALC_TOTALS:
      return { ...state, ...action.payload };
    case STORE_CART_DB:
      return { ...state, ...action.payload };
    case GET_CART_DB:
      return { ...state, ...action.payload };
    case CLEAR_CART:
      return {
        products: [],
        itemsCount: 0,
        total: 0,
        isInCart: null,
        isCartLoading: false,
      };
    
    // check if item is in cart
    case IS_IN_CART:
      return {...state, isInCart: action.payload};

    // cart is loading
    case IS_CART_LOADING:
      return {...state, isCartLoading: action.payload}; */

    default:
      return state; 
  }
}

export default cartReducer;