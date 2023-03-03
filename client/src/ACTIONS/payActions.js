import API from "../API/api";
import CONST, { MAKE_PAYMENT } from "../CONSTANTS/CONST";
import { deleteCart } from "./cartActions";
import { doneScreenLoad, setScreenLoad, setScreenLoading, startScreenLoad } from "./msgActions";


// create order
export const makePayment = ({ userId, amount, orderObj={}, orderId='' }) => async (dispatch) => {

  try {

    dispatch(setScreenLoad());

    const {data} = await API.makePayment({userId, amount, orderObj, orderId});


    if (data.success) {
      
      // redirect to zarinpal checkout:
      window.location.replace(data.redirect);

      //dispatch({ type: MAKE_PAYMENT, payload: data });
    } else {
      // redirect to shopping failed page:
      window.location.replace('/payment/failed');
    }
    
    // if: first time paying order delete cart:
    if (!orderId) {
      // delete cart:
      dispatch(deleteCart());
    }
    // stop screen load
    dispatch(doneScreenLoad());

    // fail or success -> redirect.


  } catch(err) {
    console.log({ message: 'action: /transactions/pay', err: err.message });
  }
}

// action for verifing payment after zarinpal checkout:
export const verifyPayment = ( params, navigate ) => async (dispatch) => {

  try {


    
    dispatch(setScreenLoad());

    const {data} = await API.verifyPayment(params);

    //console.log(data);

    if (data.success) {
      
      // redirect to zarinpal checkout:
      //window.location.replace(data.redirect);

      navigate('/payment/success');

      

      //dispatch({ type: MAKE_PAYMENT, payload: data });
    } else {
      // redirect to shopping failed page:
      navigate('/payment/failed');
      
    }
    
    dispatch(doneScreenLoad());

    // fail or success -> redirect.


  } catch(err) {
    console.log({ message: 'action: /transactions/pay', err: err.message });
  }
}

