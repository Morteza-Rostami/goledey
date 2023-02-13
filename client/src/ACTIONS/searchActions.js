// import API from "../API/api";
import { 
  ADD_SEARCHED_TERM,
  DELETE_SEARCHED_TERM
} from "../CONSTANTS/CONST";

// adding search term chip.
export const addSearchedTerm = 
  (term) => (dispatch) => dispatch({ type: ADD_SEARCHED_TERM, payload: `searched: ${term}` });

// remove search term chip
export const deleteSearchedTerm = 
  () => (dispatch) => dispatch({ type: DELETE_SEARCHED_TERM, payload: '' });