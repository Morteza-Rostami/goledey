import { CREATE_CARD_MSG, DONE_SCREEN_LOAD, OPEN_REGISTER, REMOVE_CARD_MSG, SCREEN_LOAD, SET_SCREEN_LOAD, SET_SNACK_OBJ, START_SCREEN_LOAD, STORE_OPEN_REGISTER } from "../CONSTANTS/CONST";

const init = {
  cardMsg: '',

  openRegister: () => {},

  screenLoading: 0,

  /* snack object */
  snackObject: {},
}

const msgReducer = (state=init, action) => {
  switch (action.type) {

    /* message for postal card */
    case CREATE_CARD_MSG:
      return {...state, cardMsg: action.payload};

    /* remove card massage */
    case REMOVE_CARD_MSG:
      return { ...state, cardMsg: action.payload };
    
    /* store open register dialog */
    case STORE_OPEN_REGISTER:
      return {...state, openRegister: action.payload}

    /* open register */
    case OPEN_REGISTER:
      return {...state};

    /* screen loader */
    // case SCREEN_LOAD:
    //   return {...state, doneScreenLoading: action.payload};

    /* set snackobj globaly */
    case SET_SNACK_OBJ:
      return {...state, snackObject: action.payload};

    // start screen load => -1 to 1
    /* case START_SCREEN_LOAD:
      return { ...state, screenLoading: state.screenLoading + 2} */
    
    // incrment => 1 state of loading
    case SET_SCREEN_LOAD:
      // first time after referesh the state (page) => set -1 to 0 
      // if (state.screenLoading === -1) state.screenLoading = 0;
      return { ...state, screenLoading: state.screenLoading + 1}

    case DONE_SCREEN_LOAD:
      return { ...state, screenLoading: state.screenLoading - 1}

    


    default:
      return state; 
  }
}

export default msgReducer;