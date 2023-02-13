import API from "../API/api";
import CONST, { CREATE_ORDER, FETCH_ORDERS_BY_USER, RESET_ORDERS, SET_ORDERS_LOADING } from "../CONSTANTS/CONST";
import { doneScreenLoad, setScreenLoad, setScreenLoading, startScreenLoad } from "./msgActions";


// create order
export const createOrder = (order) => async (dispatch) => {

  try {
    const {data} = await API.createOrder(order);

    console.log(data);
    dispatch({ type: CREATE_ORDER, payload: data });

  } catch(err) {
    console.log({ message: 'action: /orders/create', err: err.message });
  }
}

// fetch orders by user
export const fetchOrdersByUser = ({id, status, page, limit, setRequesting}) => async (dispatch, getState) => {
  try {
    console.log('action===:: ');
    dispatch(setOrdersLoading(false));
    dispatch(setScreenLoad());

    const {data} = await API.fetchOrdersByUser(id, status, page, CONST.ordersLim);

    
    console.log('SEX----------------------------------------- ++')
    console.log(data);
    dispatch({ type: FETCH_ORDERS_BY_USER, payload: data });
    dispatch(setOrdersLoading(true));


    // we stop loading when store.orders is set.
    dispatch(doneScreenLoad());

    // request is done
    setRequesting(false);

  } catch(err) {
    console.log({ 
      message: 'action: /orders/get/byUserAndStatus', 
      err: err.message,
      path: err.stack,
    });
  }
} 


// reset orders
export const resetOrders = () => (dispatch) => {
  dispatch({ type: RESET_ORDERS })
}

// set orders are loading
export const setOrdersLoading = (isLoading) => (dispatch) => {
  dispatch({ type: SET_ORDERS_LOADING, payload: isLoading });
}