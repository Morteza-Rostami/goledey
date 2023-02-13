import { 
  FETCH_CATEGORIES,
  SELECT_CATEGORY_CHIP,
  REMOVE_CATEGORY_CHIP,
  CLEAR_CATS,
  SET_CAT_SUB,
  FETCH_ONE_CAT,
  SET_ACTIVE_CAT,
  FORCE_REPAINT
} from "../CONSTANTS/CONST";

// initial state:
const init = {
  categories: [],
  selectedCats: [],
  catAndSub: {
    // main: {},
    // sub: {}
  },

  // active tab: subCats opens
  activeCat: {},
  // hide and show sub-text to render animation.
  catRePaint: 'block',
}

// reducer(currentStateOfStore, action_object)
const categoryReducer = (state=init, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {...state, categories: [...action.payload]};
    case SELECT_CATEGORY_CHIP:
      return {
        ...state, 
        selectedCats: 
        state?.selectedCats 
          ? [...state.selectedCats].concat(action.payload) 
          : [{...action.payload}],
        catAndSub: {}, 
      }
    case REMOVE_CATEGORY_CHIP:
      return {...state, selectedCats: [...action.payload]};
    case CLEAR_CATS:
      return {...state, selectedCats: action.payload};
    case SET_CAT_SUB:
      return { 
        ...state,  
        selectedCats:
        state?.selectedCats
          ? [...state.selectedCats].concat([...action.payload])
          : [...action.payload],
        catAndSub: {main: action.payload[0], 
          sub: action.payload[1]},
      }
    case FETCH_ONE_CAT:
      return {...state, mCat: {...action.payload}};

    /* set active main category */
    case SET_ACTIVE_CAT:
      return {...state, activeCat: JSON.parse(JSON.stringify(action.payload))}

    /* force repaint */
    case FORCE_REPAINT:
      return { ...state, catRePaint: action.payload }

    default:
      return state; 
  }
}

export default categoryReducer;