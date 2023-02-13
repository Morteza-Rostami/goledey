import { 
  CLEAR_REVIEWS,
  CREATE_REVIEW,
  FETCH_REVIEWS,
  IS_LOADING_REVIEWS,
  REFRESH_REVIEW_INFO,
} from "../CONSTANTS/CONST";
import FrontHelp from "../HELPERS/frontHelp";

// initial state:
const init = {
  reviews: [],
  pagObj: {
    // next
    // prev
    // total
  },
  isLoading: false,
}

const reviewReducer = (state=init, action) => {
  switch (action.type) {

    /* fetch all reviews: by products */
    case FETCH_REVIEWS:
      return {
        ...state,
        // append to have all reviews:
        //[...state.reviews, ...action.payload.results]
        reviews: FrontHelp.noRepeatedItem(state.reviews, action.payload.results), 
        pagObj: {
          next: action.payload?.next ? {...action.payload.next} : {},
          prev: action.payload?.prev ? {...action.payload.prev} : {},
          total: action.payload.total,
        }
      };

    /* create new reviews */
    case CREATE_REVIEW:
      // push new review to begining of array.
      const arr = [...state.reviews];
      arr.unshift(action.payload);
      return { 
        ...state,
        reviews: 
        state?.reviews 
          ? JSON.parse(JSON.stringify([...arr]))
          : [{...action.payload}]
      }
    
    /* is loading reviews */
    case IS_LOADING_REVIEWS:
      return {
        ...state,
        isLoading: action.payload,
      }

    /* clear reviews */
    case CLEAR_REVIEWS:
      return {...state, reviews: []};

    default:
      return state; 
  }
}

export default reviewReducer;