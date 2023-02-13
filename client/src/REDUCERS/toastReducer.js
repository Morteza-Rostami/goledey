import { ADD_TOAST } from "../CONSTANTS/CONST";

// initial state:
const init = {
  toasts: []
}

// reducer(currentStateOfStore, action_object)
const toastReducer = (state=init, action) => {
  switch (action.type) {
    /* add snackbar */
    // case ADD_TOAST:
    //   return {
    //     ...state,
    //     toasts: [...state.toasts, action.payload]
    //   }

    default:
      return state; 
  }
}

export default toastReducer;