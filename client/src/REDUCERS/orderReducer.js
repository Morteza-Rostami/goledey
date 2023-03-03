import { CREATE_ORDER, FETCH_ORDERS_BY_USER, GET_ORDERS_COUNT, RESET_ORDERS, SET_ORDERS_LOADING } from "../CONSTANTS/CONST";

// initial state:
const init = {
  orders: [],
  order: {},
  pagObj: {
    // next
    // prev
    // total
  },
  doneLoading: false,
  orderCounts: {},
}

// reducer(currentStateOfStore, action_object)
const orderReducer = (state=init, action) => {
  switch (action.type) {

    /* create order */
    case CREATE_ORDER:
      return {...state, order: action.payload};

    /* fetch orders by user */
    case FETCH_ORDERS_BY_USER:
      
      return {
        ...state, 
        //[...state.orders, ...JSON.parse(JSON.stringify(action.payload.results))]
        orders: noRepeatedOrder(state.orders, action.payload.results), 
        pagObj: {
          next: action.payload?.next ? {...action.payload.next} : {},
          prev: action.payload?.prev ? {...action.payload.prev} : {},
          total: action.payload.total,
        }
      }

    /* reset orders */
    case RESET_ORDERS:
      return {...state, orders: [], pagObj: {}}

    /* set is loading */
    case SET_ORDERS_LOADING:
      return {...state, doneLoading: action.payload}

    // orders status counts
    case GET_ORDERS_COUNT:
      return {...state, orderCounts: action.payload}

    default:
      return state; 
  }
}

function noRepeatedOrder(oldOrders, newOrders) {



  let orders = [];

  if (oldOrders?.length) {
    orders.push(...oldOrders)
  
    orders.push(...newOrders.filter((vl, i) => {
      return vl._id !== orders[i]._id;
    }))
  } else {
    orders.push(...newOrders)
  } 

  return JSON.parse(JSON.stringify(orders));
}

export default orderReducer;