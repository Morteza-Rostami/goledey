import { MAKE_PAYMENT } from "../CONSTANTS/CONST";

// initial state:
const init = {
  paySuccess: false,
}

// reducer(currentStateOfStore, action_object)
const payReducer = (state=init, action) => {
  switch (action.type) {

    /* create order */
    case MAKE_PAYMENT:
      return {...state, paySuccess: action.payload};

    

    default:
      return state; 
  }
}


export default payReducer;