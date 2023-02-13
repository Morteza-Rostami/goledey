import { ADD_SEARCHED_TERM, DELETE_SEARCHED_TERM } from "../CONSTANTS/CONST";

// initial state:
const init = {
  searchedTerm: ''
}

// reducer(currentStateOfStore, action_object)
const searchReducer = (state=init, action) => {
  switch (action.type) {
    case ADD_SEARCHED_TERM:
      return {...state, searchedTerm: action.payload};
    case DELETE_SEARCHED_TERM:
      return {...state, searchedTerm: action.payload} 
    default:
      return state; 
  }
}

export default searchReducer;