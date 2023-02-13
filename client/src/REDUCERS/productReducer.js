import { 
  CREATE_PRODUCT, 
  FETCH_PRODUCTS, 
  PRODUTC_CREATE_SUCCESS,
  FETCH_ONE_PRODUCT,
  LOADING,
  LOADED,
  SEARCH_PRODUCT,
  UPDATE_ONE_ITEM_IMG,
  UPDATE_PRODUCT
} from "../CONSTANTS/CONST";

// initial state:
const state = {
  products: [],
  isLoading: false,
  pagObj: {},
  product: {},
}

// reducer(currentStateOfStore, action_object)
const productReducer = (currentState=state, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      console.log('reducer createProduct: ', action.payload);
      // reducer must be: pure function -> so: return a new obj and array, instead of modifying the initial state. 
      return Object.assign({}, currentState, {
        product: JSON.parse(JSON.stringify(action.payload)),
        products: currentState.products.concat(action.payload),
      });
    // case PRODUTC_CREATE_SUCCESS:
    //   console.log( action.payload );
    //   return currentState;
    case FETCH_PRODUCTS:
      return {
        ...currentState, 
        products: [...action.payload.results], 
        pagObj: {
          next: action.payload.next ? action.payload.next : {}, 
          prev: action.payload.prev ? action.payload.prev : {}, 
          total: action.payload.total
        }
      };
    case FETCH_ONE_PRODUCT:
      return {...currentState, product: {...action.payload}};
    case LOADING:
      return {...currentState, isLoading: action.payload};
    case LOADED:
      return {...currentState, isLoading: action.payload};
    case SEARCH_PRODUCT:
      return {...currentState, products: [...action.payload]}
    
    /* update one product img */
    case UPDATE_ONE_ITEM_IMG:
      return {...currentState, product: action.payload};

    /* update product */
    case UPDATE_PRODUCT:
      return {...currentState, product: action.payload};
    default:
      return currentState; 
  }
}

export default productReducer;