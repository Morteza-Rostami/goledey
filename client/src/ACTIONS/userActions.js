import API from "../API/api";
import CONST, { CLEAR_CART, GET_AUTH_LS, IS_LOADING_REGISTER, IS_USER_COMPLETE, LOGOUT, REGISTER, UPDATE_ADDRESS, UPDATE_USER, VERIFYOTP } from "../CONSTANTS/CONST";
import { appendCartToDB, clearCart, getCartDb } from "./cartActions";
// import { storeCartInDb } from "./cartActions";
import { addToast } from "./toastActions";
// import { BrowserHistory } from "@remix-run/router";
// import { createBrowserHistory } from "@remix-run/router";
// useHistory

export const register =
  (user, next, snackObj) =>
  async (dispatch) => {
  
    try {
    // start loading
    dispatch(setAuthLoading(true));
    // user: phone
    const { data } = await API.register(user);

    if (data?.success) {
      // setSuccess(true);
      // toast.setMsg(data.message);
      dispatch(addToast(snackObj, CONST.SUCCESS_SNACK,data.message));
    } else if (data?.CoolDown) {
      // toast.setMsg(data.message);
      dispatch(addToast(snackObj, CONST.ERROR_SNACK,data.message));
    } else {
      // toast.setMsg('registeration failed!');
      dispatch(addToast(snackObj, CONST.ERROR_SNACK, `ثبت نام ناموفق بود! لطفا مجددا تلاش کنید!`));
    }

    // stop loading
    dispatch(setAuthLoading(false));

    // next form
    next();

    // dispatch
    dispatch({ type: REGISTER });

  } catch (err) {
    console.log({ err: err.message, path: err.stack });
  }

}

export const verifyOtp = (user, navigate, snackObj) => async (dispatch, getState) => {
  const { otp, cellPhone } = user;
  const cart = getState().cartStore;

  try {
    // set loading
    dispatch(setAuthLoading(true));

    const { data } = await API.verifyOtp({ otp, cellPhone });
    const user = { token: data.token, user: data.user };

    // stop loading
    dispatch(setAuthLoading(false));

    if (data?.expired) {
      dispatch(addToast(snackObj, CONST.ERROR_SNACK, data.message));
    }

    else if (data?.wrongOtp) {
      dispatch(addToast(snackObj, CONST.ERROR_SNACK, data.message));
    }
    else if (data?.success) {
      // dispatch
      dispatch({ type: VERIFYOTP, payload: user });
      // store user in local storage
      localStorage.setItem('auth', JSON.stringify(user));
      // redirect to home
      navigate('/');

      setTimeout(() => {
        dispatch(addToast(snackObj, CONST.INFO_SNACK, `به (گل دی) خوش آمدید!!`));
      }, 3000);

      // append cartLS to db.cart
      dispatch(appendCartToDB({ userId: data.user._id }));

      // get cart from db
      const obj = { userId: data?.user ? data.user._id : '' }
      dispatch(getCartDb(obj));

    }

  } catch (err) {
    console.log({ err: err.message });
  }

}

// get auth from localStorage
export const getAuthFromLS = () => (dispatch, getState) => {
  if (localStorage.getItem('auth')) {
    const auth = JSON.parse(localStorage.getItem('auth'));
    dispatch({ type: GET_AUTH_LS, payload: auth});
  }
}

export const logout = (navigate) => (dispatch) => {
  // clear localStorage.auth
  localStorage.removeItem('auth');
  localStorage.removeItem('cart');
  // clear userStore
  dispatch({ type: LOGOUT });

  // clear cart state
  dispatch(clearCart());
  //dispatch({ type: CLEAR_CART });

  //redirect home page
  navigate('/');

} 

// update user profile
export const updateUser = (user, id) => async (dispatch, getState) => {
  const snackObj = getState().msgStore.snackObject;

  try {
    const { data } = await API.updateUser(user, id);

    // update locaStorage user
    const auth = JSON.parse(localStorage.getItem('auth'));
    auth.user = data;
    localStorage.setItem('auth', JSON.stringify(auth));
    // update redux
    dispatch({ type: UPDATE_USER, payload: auth });

    if (!data?.err) {
      dispatch(addToast(snackObj, CONST.SUCCESS_SNACK, `اطلاعات شما آپدیت شد!`));
    }

  }catch (err) {
    console.log({message: 'userAction: updateUser ', err: err.message});
  }
}

// update address
export const updateAddress = (address, id) => async (dispatch, getState) => {
  const snackObj = getState().msgStore.snackObject;

  try {
    const { data } = await API.updateAddress(address, id);

    // update locaStorage user
    const auth = JSON.parse(localStorage.getItem('auth'));
    auth.user = data;
    localStorage.setItem('auth', JSON.stringify(auth));
    // update redux
    dispatch({ type: UPDATE_ADDRESS, payload: auth });

    if (!data?.err) {
      dispatch(addToast(snackObj, CONST.SUCCESS_SNACK, `آدرس شما آپدیت شد!`));

    }

  }catch (err) {
    console.log({message: 'userAction: updateAddress ', err: err.message});
  }
}

/* signup loading */
export const setAuthLoading = (isLoading) => (dispatch) => {
  dispatch({ type: IS_LOADING_REGISTER, payload: isLoading });
} 

/* is user info complete */
export const setUserComplete = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;
  let isComplete = false;

  try {
    if (user) {
      // name, credit-cart, user.address.city, full address
      if (user?.name && user?.address?.city?.name && user?.address?.fullAddress) {
        
        isComplete = true;
      }
  
      dispatch({ type: IS_USER_COMPLETE, payload: isComplete });
    }

  } catch(err) {
    console.log(err)
  }
}