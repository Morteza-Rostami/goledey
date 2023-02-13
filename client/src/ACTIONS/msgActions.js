// import API from "../API/api";
import { CREATE_CARD_MSG, DONE_SCREEN_LOAD, OPEN_REGISTER, REMOVE_CARD_MSG, SCREEN_LOAD, SET_SCREEN_LOAD, SET_SNACK_OBJ, START_SCREEN_LOAD, STORE_OPEN_REGISTER } from "../CONSTANTS/CONST";


export const createCardMsg = (cardMsg) => (dispatch) => {
  dispatch({ type: CREATE_CARD_MSG, payload: cardMsg });
}

export const removeCardMsg = () => (dispatch) => {
  dispatch({ type: REMOVE_CARD_MSG, payload: ''});
}

/* action to store openRegister method in redux */
export const storeOpenRegister = (func) => (dispatch) => {
  dispatch({ type: STORE_OPEN_REGISTER, payload: func });
}

/* action to open register form */
export const openRegister = () => (dispatch, getState) => {
  const func = getState().msgStore.openRegister;
  func.current();
  dispatch({ type: OPEN_REGISTER });
} 

/* is screen loading */
/* export const setScreenLoading = () => (dispatch) => {
  //dispatch({ type: SCREEN_LOAD, payload: doneScreenLoad });
}  */

// start screen load
/* export const startScreenLoad = 
  () => (dispatch) => dispatch({ type: START_SCREEN_LOAD}); */

// one more screen load
export const setScreenLoad = 
  () => (dispatch) => dispatch({ type: SET_SCREEN_LOAD});

// one less screen load
export const doneScreenLoad = 
  () => (dispatch) => dispatch({ type: DONE_SCREEN_LOAD});


/* store snackObj global */
export const setSnackObj = (snack) => (dispatch) => {
  dispatch({ type: SET_SNACK_OBJ, payload: snack });
}