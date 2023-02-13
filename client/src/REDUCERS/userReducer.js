import { GET_AUTH_LS, IS_LOADING_REGISTER, IS_USER_COMPLETE, LOGOUT, REGISTER, UPDATE_ADDRESS, UPDATE_USER, VERIFYOTP } from "../CONSTANTS/CONST";

// initial state:
const init = {
  token: '', //undefined
  user: {}, // undefined

  // is form loading
  isLoading: false,
  //isSuccess: false,
  isUserComplete: false,
}

const userReducer = (state=init, action) => {
  switch (action.type) {
    case REGISTER:
      return {...state};
    case VERIFYOTP:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT:
      return {
        ...state,
        token: '',
        user: {} 
      };
    case GET_AUTH_LS:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_ADDRESS:
      return { 
        ...state,
        ...action.payload 
      };

    /* signup loading */
    case IS_LOADING_REGISTER:
      return {
        ...state,
        isLoading: action.payload,
      };

    // check if user infos are complete
    case IS_USER_COMPLETE:
      return { ...state, isUserComplete: action.payload };

    default:
      return state; 
  }
}

export default userReducer;