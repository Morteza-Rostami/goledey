import { GET_CITIES } from "../CONSTANTS/CONST";

// initial state:
const init = {
  cities: []
}

// reducer(currentStateOfStore, action_object)
const cityReducer = (state=init, action) => {
  switch (action.type) {
    case GET_CITIES:
      return {...state, cities: action.payload};
    default:
      return state; 
  }
}

export default cityReducer;