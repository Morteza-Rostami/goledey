import { ADMIN_FETCH_ITEMS, ADMIN_FETCH_ORDERS, ADMIN_MAKE_ORDER_MSG, DELETE_PRODUCT, GET_CITIES, UPDATE_ITEM_CATS, UPDATE_ITEM_IMGS } from "../CONSTANTS/CONST";

// initial state:
const init = {
  products: [],
  orders: []
}

const adminReducer = (state=init, action) => {
  let upCats = {};
  switch (action.type) {
    
    /* get list of all products */
    case ADMIN_FETCH_ITEMS:
      return {...state, products:  [...action.payload]};

    
    /* delete a product and update list */
    case DELETE_PRODUCT:
      return {...state, products: [...JSON.parse(JSON.stringify(action.payload))]}

    // admin get all orders
    case ADMIN_FETCH_ORDERS:
      return { ...state,  orders: action.payload};

    // admin make order msg
    case ADMIN_MAKE_ORDER_MSG:
      return { ...state, orders: action.payload };

    default:
      return state; 
  }
}

export default adminReducer;