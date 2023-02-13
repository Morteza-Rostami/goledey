import API from "../API/api";
import CONST, { 
  FETCH_PRODUCTS, 
  CREATE_PRODUCT, 
  FETCH_ONE_PRODUCT, 
  LOADING, 
  LOADED, 
  SEARCH_PRODUCT,
  UPDATE_ONE_ITEM_IMG,
  UPDATE_PRODUCT
} from "../CONSTANTS/CONST";
import { doneScreenLoad, setScreenLoad, setScreenLoading } from "./msgActions";
import { addToast } from "./toastActions";

// read all

// filters => are categories
// mFilters => are filters
export const readProducts = ({
  mCat,
  sCat,
  page,
  filters,
  term,
  setShopReqDone
}) => async (dispatch) => {

  try {

    // dispatch and action: loading = true
    dispatch({ type: LOADING, payload: true });
    // screen loading
    // dispatch(setScreenLoading(true));

    // request
    const { data } = await API.getProducts(
      mCat, 
      sCat, 
      page,
      filters,
      term
    );

    // dispatch action to update store.
    dispatch({ type: FETCH_PRODUCTS, payload: data });
    // loading is done
    dispatch({ type: LOADED, payload: false });
    // dispatch(setScreenLoading(false));
    
    // shopPage can show stuff
    if (typeof setShopReqDone === 'function')
      setShopReqDone(true);

  } catch (err) {
    console.log({ message: 'action: /products/get ', err });
  }
}

// get one:
export const readProduct = (slug) => async (dispatch) => {
  try {

    dispatch(setScreenLoad())

    const { data } = await API.getProduct(slug);
    // store response_product in store:
    dispatch({ type: FETCH_ONE_PRODUCT, payload: data });

    dispatch(doneScreenLoad());


  } catch (err) {
    console.log({ message: 'action: /products/get/:slug ', err });
  }
}  

// create:
export const createProduct = (entries) => async (dispatch, getState) => {
  const snackObj = getState().msgStore.snackObject;

  try {
    // api call t0 db
    // response: object.data
    const {data} = await API.createProduct(entries);
    // dispatch action
    if (!data?.err) {
      dispatch({ type: CREATE_PRODUCT, payload: data});
      dispatch(addToast(snackObj, CONST.SUCCESS_SNACK, `محصول در سیستم ثبت شد.`));

    }
  } catch (err) {
    console.log({ message: 'action: /product/create ', err });
  }
}



// filter products

// update 
export const updateProduct = (formD, id) => async (dispatch, getState) => {
  const snackObj = getState().msgStore.snackObject;

  try {
    const {data} = await API.updateProduct(formD, id);
    
    if (!data?.err) {
      dispatch({ type: UPDATE_PRODUCT, payload: data });
      dispatch(addToast(snackObj, CONST.SUCCESS_SNACK, `محصول آپدیت شد.`));

    }

  } catch(err) {
    /* console.log({
      message: 'action: updateProduct',
      err: err.message
    }); */
    dispatch(addToast(snackObj, CONST.ERROR_SNACK, `آپدیت محصول ممکن نمیباشد.`));

  }
}

// update single product img
export const updateOneItemImg = (pic, id) => async (dispatch) => {

  try {
    const {data} = await API.updateOneItemImg(pic, id);
    
    dispatch({ type: UPDATE_ONE_ITEM_IMG, payload: data });

  } catch(err) {
    console.log({
      message: 'action: updateOneImg',
      err: err.message
    });
  }
}

// delete
/* export const deleteProductAction = (id) => async (dispatch) => {

} */

// search products:
// export const searchProduct = (page, term) => async (dispatch) => {
  
//   try {
//     // request
//     const { data } = await API.searchProduct(page, term);
//     console.log('search aaction: ', data);
//     // dispatch
//     dispatch({ type: SEARCH_PRODUCT, payload: data.results });
//   } catch(err) {
//     console.log({ message: 'action: /products/search', err:  err.message})
//   }

// }
