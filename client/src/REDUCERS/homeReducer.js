import { GET_HOME_DATA } from "../CONSTANTS/CONST";

// initial state:
const init = {
  // topSabadGol
  // topDasteGol
  // topPayeGol
}

// reducer(currentStateOfStore, action_object)
const homeReducer = (state=init, action) => {
  switch (action.type) {
    case GET_HOME_DATA:
      return {...action.payload};
    default:
      return state; 
  }
}

export default homeReducer;