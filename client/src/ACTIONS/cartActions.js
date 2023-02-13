import API from "../API/api";
import CONST, { 
  ADD_TO_CART, 
  CALC_ITEMS_COUNT, 
  DECREMENT_AMOUNT, 
  GET_CART_LS, 
  INCREMENT_AMOUNT, 
  REMOVE_CART_ITEM,
  CALC_TOTALS,
  GET_CART_DB,
  STORE_CART_DB,
  IS_IN_CART,
  IS_CART_LOADING,
  UPDATE_CART_STORE_DB
} from "../CONSTANTS/CONST";
import { doneScreenLoad, removeCardMsg, setScreenLoad, setScreenLoading } from "./msgActions";
import { addToast } from "./toastActions";



// add to cart DB

export const addToCart = (obj) => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem(CONST.AUTH))?.token;

  // if: authUser
  if (token) {
    const snackObj = getState().msgStore.snackObject;
    let message = '';

    

    try {
      
      // start load:
      dispatch(setCartLoading(true))

      const {data} = await API.addToCart(obj);
      message = data.message;

      if (data.success) {
        dispatch({ type: UPDATE_CART_STORE_DB, payload: data.result });
        dispatch(addToast(snackObj, CONST.SUCCESS_SNACK, message));

        // clear cardmsg
        localStorage.removeItem(CONST.CARD_MSG);
      }

      // if item is in cart
      dispatch(isItemInCart({
        userId: obj.userId, 
        itemSlug: obj.itemSlug
      }));

      

      
    } catch(err) {
      console.log({
        message: err.message,
      })
      dispatch(addToast(snackObj, CONST.ERROR_SNACK, message));
      // clear cardmsg
      localStorage.removeItem(CONST.CARD_MSG);
    }
  } else { // guest user
    


  }
  

} 

// isInCart DB
export const isItemInCart = (
  { 
    userId, 
    itemSlug, 
    setAddCartReqDone,

  }) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem(CONST.AUTH))?.token;

  if (token) {
    try {

      
      
      // load if not already loading
      dispatch(setCartLoading(true));

      const {data} = await API.isInCart({ userId, itemSlug });
  
      dispatch({ type: IS_IN_CART, payload: data.result });
  
      // stop load
      dispatch(setCartLoading(false));

      if (typeof setAddCartReqDone === 'function')
        setAddCartReqDone(true)
      
    } catch(err) {
      console.log({
        message: err.message,
      })
    }

  } else { // guest
    
  }
} 

// cart is loading
export const setCartLoading = (isLoading) => (dispatch) => {
  dispatch({ type: IS_CART_LOADING, payload: isLoading });
}




export const getCartDb = ({ userId, setRequestDone }) => async (dispatch) => {
  try {

    // loading
    dispatch(setCartLoading(true));

    dispatch(setScreenLoad());

    const { data } = await API.getCart({userId});


    if (data.success) {
      dispatch({ type: UPDATE_CART_STORE_DB, payload: data.result })
      dispatch(setCartLoading(false));
      dispatch(doneScreenLoad());


      if (typeof setRequestDone === 'function')
        setRequestDone(true);
    }

     
  } catch(err) {
    console.log({
      message: err.message,
    })
    dispatch(setCartLoading(false));

  }
} 

// **** increment
export const incItem = ({ 
  userId, 
  itemSlug, 
  setAmountLoading 
}) => async (dispatch) => {

  try {
    // start load
    dispatch(setCartLoading(true));

    if (typeof setAmountLoading === 'function')
      setAmountLoading(true);

    const {data} = await API.incItem({ userId, itemSlug });

    if (data.success) {
      dispatch({ type: UPDATE_CART_STORE_DB, payload: data.result });
      dispatch(setCartLoading(false));

    }

    if (typeof setAmountLoading === 'function')
      setAmountLoading(false);
    
  } catch(err) {
    console.log({
      message: err.message,
    })
  }
} 

// **** decrement
export const decItem = ({ 
  userId, 
  itemSlug ,
  setAmountLoading
}) => async (dispatch) => {

  try {
    // start load
    dispatch(setCartLoading(true));

    if (typeof setAmountLoading === 'function')
      setAmountLoading(true);

    const {data} = await API.decItem({ userId, itemSlug });

    if (data.success) {
      dispatch({ type: UPDATE_CART_STORE_DB, payload: data.result });
      dispatch(setCartLoading(false));

    }

    if (typeof setAmountLoading === 'function')
      setAmountLoading(false);
    
  } catch(err) {
    console.log({
      message: err.message,
    })
  }
}

// ***** remove item
export const removeItem = ({ 
  userId, 
  itemSlug, 
  setAmountLoading, 

}) => async (dispatch) => {
  
  try {

    // start: load
    dispatch(setCartLoading(true));

    // amount load
    if (typeof setAmountLoading === 'function')
      setAmountLoading(true);

    const { data } = await API.removeItem({ userId, itemSlug });

    if (data.updated) {
      dispatch({ type: UPDATE_CART_STORE_DB, payload: data.result });
      
    } else {
      // we remove the last item and deleted the db.cart
      dispatch({ type: UPDATE_CART_STORE_DB, payload: {
        products: [],
        itemsCount: 0,
        total: 0,
        isInCart: null,

      } });
    }

    // check item is in cart then -> stop loading:
    dispatch(isItemInCart({
      userId: userId, 
      itemSlug: itemSlug
    }));

    // set amount loading => loading for button in cartPage
    if (typeof setAmountLoading === 'function')
      setAmountLoading(false);
    
  } catch(err) {
    console.log({
      message: err.message,
    })
  }
} 

// append LS.cart in db and remove LS.cart
export const appendCartToDB = ({ userId }) => async (dispatch) => {
  const cartLS = JSON.parse(localStorage.getItem(CONST.CART));

  try {

    if (cartLS) {
      const {data} = await API.getOrConcat({ userId, cartLS });
  
      if (data.success) {
        dispatch({ type: UPDATE_CART_STORE_DB, payload: data.result })
      }
    }
    // remove LS.cart
    localStorage.removeItem(CONST.CART);

  } catch(err) {
    console.log(err);
    // remove LS.cart
    localStorage.removeItem(CONST.CART);
  }
} 

//==========================================

export const addToCartLS = ({ itemSlug, cardMsg='' }) => async (dispatch) => {
  let cart = {};
  try {
    // start load
    dispatch(setCartLoading(true));

    // get product
    const { data } = await API.getProduct(itemSlug);

    const item = {
      product: data,
      amount: 1,
      total: data.price,
      cardMsg: cardMsg,
      diff: { price: 0, txt: '' }
    }

    // cart does not exist in LS
    if (localStorage.getItem(CONST.CART) === null) {
      cart = {
        products: [item], 
        itemsCount: 1,
        total: item.product.price,
      }
        
    } else {
      // cart does exist in ls
      cart = JSON.parse(localStorage.getItem(CONST.CART));

      cart.products.push(item);
      cart.itemsCount += 1;
      cart.total += item.product.price;
    }

    // save in localStorage
    localStorage.setItem(CONST.CART, JSON.stringify(cart));
    
    dispatch({ type: UPDATE_CART_STORE_DB, payload: cart });

    dispatch(isItemInLS({itemSlug}))
    
  } catch(err) {
    console.log({
      message: err.message,
    })
  }
}  

// is item in localStorage
export const isItemInLS = ({ itemSlug, setAddCartReqDone }) => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem(CONST.CART));
  let isIn = false;

  // start load
  dispatch(setCartLoading(true));

  if (cart) {
    isIn = cart.products.some((item, i) => {
      return item.product.slug === itemSlug;
    });

    dispatch({ type: IS_IN_CART, payload: isIn });
    dispatch(setCartLoading(false));

    if (typeof setAddCartReqDone === 'function')
      setAddCartReqDone(true);

  } else {
    // no  cart 
    dispatch({ type: IS_IN_CART, payload: isIn });
    dispatch(setCartLoading(false));

    if (typeof setAddCartReqDone === 'function')
      setAddCartReqDone(true);
  }

}

// get cart from  localStorage
export const getCartLS = () => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem(CONST.CART));
  if (cart) {
    dispatch({ type: UPDATE_CART_STORE_DB, payload: cart });
  }
}

// increment item
export const incItemLS = ({ itemSlug }) => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem(CONST.CART));
  if (cart) {

    cart.products.forEach((item, i) => {
      if (item.product.slug === itemSlug) {
        item.amount += 1;
        item.total = item.product.price * item.amount;


        cart.itemsCount += 1;
        cart.total += item.product.price; 
      }
    });

    localStorage.setItem(CONST.CART, JSON.stringify(cart));

    dispatch({ type: UPDATE_CART_STORE_DB, payload: cart });
  }
}

// decrement item
export const decItemLS = ({ itemSlug }) => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem(CONST.CART));
  if (cart) {

    cart.products.forEach((item, i) => {
      if (item.product.slug === itemSlug) {

        if (item.amount > 1) {
          item.amount -= 1;
          item.total = item.product.price * item.amount;

          cart.itemsCount -= 1;
          cart.total -= item.product.price; 
        }

      }
    });

    localStorage.setItem(CONST.CART, JSON.stringify(cart));

    dispatch({ type: UPDATE_CART_STORE_DB, payload: cart });
  }
}

// remove item
export const removeItemLS = ({ itemSlug }) => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem(CONST.CART));
  if (cart) {

    cart.products = cart.products.filter((item, i) => item.product.slug !== itemSlug);

    if (!cart.products.length) {
      localStorage.removeItem(CONST.CART);
      dispatch({ 
        type: UPDATE_CART_STORE_DB, 
        payload: {
          products: [],
          itemsCount: 0,
          total: 0,
          isInCart: null,  
        } });
    } else {
      // cart not empty
      localStorage.setItem(CONST.CART, JSON.stringify(cart));
      dispatch({ type: UPDATE_CART_STORE_DB, payload: cart });

    }

    dispatch(isItemInLS({itemSlug}))

  }
}

// clear store.cart
export const clearCart = () => (dispatch) => {
  dispatch({ type: UPDATE_CART_STORE_DB, payload: {
    products: [],
    itemsCount: 0,
    total: 0,
    isInCart: null,
  } });
}