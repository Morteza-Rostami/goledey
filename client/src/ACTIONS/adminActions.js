import API from "../API/api";
import CONST, { ADMIN_FETCH_ITEMS, ADMIN_FETCH_ORDERS, ADMIN_MAKE_ORDER_MSG, DELETE_PRODUCT, UPDATE_ITEM_CATS } from "../CONSTANTS/CONST";
import { addToast } from "./toastActions";

// get all products:
export const adminGetItems = () => async (dispatch) => {

  try {
    const {data} = await API.adminFetchProducts();
    dispatch({ type: ADMIN_FETCH_ITEMS, payload: data });
  } catch(err) {
    console.log({ message: 'action: adminGetItems', err: err.message });
  }
}

// delete a product
export const deleteProduct = (id) => async (dispatch, getState) => {
  const snackObj = getState().msgStore.snackObject;

  console.log('-___')
  try {
    const {data} = await API.removeProduct(id);

    if (!data?.err) {
      // update product list
      dispatch({ type: DELETE_PRODUCT, payload: data });
      // snack
      dispatch(addToast(snackObj, CONST.SUCCESS_SNACK, `محصول با موفقیت حذف شد!`));
    } 

  } catch(err) {
    //console.log({ message: 'action: deleteProduct', err: err.message });
    // delete failed
    dispatch(addToast(snackObj, CONST.ERROR_SNACK, `حذف محصول امکان پذیر نبود!`));
  }
} 

// get orders
export const adminGetOrders = () => async (dispatch, getState) => {
  // const snackObj = getState().msgStore.snackObject;

  console.log('-___')
  try {
    const {data} = await API.adminFetchOrders();

    if (data.success) {
      // update product list
      dispatch({ type: ADMIN_FETCH_ORDERS, payload: data.result });
    } 

  } catch(err) {
    console.log({ message: 'action: admin/get-orders', err: err.message });
  }
} 

// make order msg
export const makeAdminOrderMsg = ({ orderId, status, adminMsg }) => async (dispatch, getState) => {
  const snackObj = getState().msgStore.snackObject;

  try {
    const {data} = await API.adminMakeOrderMsg({ orderId, status, adminMsg });

    if (data.success) {
      // update product list
      dispatch({ type: ADMIN_MAKE_ORDER_MSG, payload: data.result });
      // snack
      dispatch(addToast(snackObj, CONST.SUCCESS_SNACK, data.message));
    } 

  } catch(err) {
    //console.log({ message: 'action: deleteProduct', err: err.message });
    // delete failed
    dispatch(addToast(snackObj, CONST.ERROR_SNACK, 'پیام ارسال نشد!'));
  }
}