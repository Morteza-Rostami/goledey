import API from "../API/api";
import { 
  CLEAR_CATS, 
  FETCH_CATEGORIES, 
  FETCH_ONE_CAT, 
  FETCH_PRODUCTS, 
  REMOVE_CATEGORY_CHIP, 
  SELECT_CATEGORY_CHIP, 
  SET_CAT_SUB ,
  SET_ACTIVE_CAT,
  FORCE_REPAINT,

} from "../CONSTANTS/CONST";

// action
import { readProducts } from "./productActions";
import { deleteSearchedTerm } from "./searchActions";

export const readCategories = () => async (dispatch) => {
 try {
  const { data } = await API.getCategories(); 
  dispatch({ type: FETCH_CATEGORIES, payload: data });
 } catch (err) {
  console.log({ message: 'action: /categories/get', err });
 } 
} 

// select category chip
export const selectCatChip = (slug) => async (dispatch, getState) => {
  let selectedCats = getState().categoriesStore?.selectedCats;
  let catObj = {};

  try {
    // fetch catObj:
    const {data} = await API.getOneCat(slug);
    catObj = {...data};

    // dispatch: remove searchTerm
    dispatch(deleteSearchedTerm());

    // clear old filters
    dispatch(clearSelectedCats());

    // if: mainCat does not have any subCat
    if (!(catObj.subCats.length)) {
      // selected cat empty:
      if (!selectedCats?.length) {
        dispatch({ type: SELECT_CATEGORY_CHIP, payload: {...catObj} });
      } else {
        // check if category already exist in state
        if (!selectedCats.some(cat => cat._id === catObj._id.toString())) {
          console.log('dick');
          dispatch({ type: SELECT_CATEGORY_CHIP, payload: {...catObj} });
        }
      }
    } 

    // new state
    selectedCats = getState().categoriesStore?.selectedCats;

    // dispatch action filter by category:
    dispatch(readProducts(1, selectedCats));
    
  } catch(err) {
    console.log({ messsage: 'action: selectCatChip', err: err.message });
  }

  
} 

// remove category chip
export const removeCategoryChip = (catId) => (dispatch, getState) => {

  // dispatch: remove searchTerm
  dispatch(deleteSearchedTerm());

  let selectedCats = getState().categoriesStore.selectedCats;
  const filteredCats = selectedCats.filter(cat => cat._id !== catId);
  dispatch({ type: REMOVE_CATEGORY_CHIP, payload: filteredCats });

  selectedCats = getState().categoriesStore?.selectedCats;

  // dispatch an action filter by category request:
  dispatch(readProducts(1, selectedCats));
}

// select mainCat and subCat
export const setMainAndSubCat = (mSlug, sSlug) => async (dispatch, getState) => {
  let catAndSub = getState().categoriesStore?.catAndSub;
  let selectedCats = [];
  let mainCat = {};
  let subCat = {};

  try {
    const {data} = await API.getOneCat(mSlug);
    mainCat = data;

    const {data: sData} = await API.getOneCat(sSlug);
    subCat = sData;

    dispatch(deleteSearchedTerm());

    // clear old filters
    dispatch(clearSelectedCats());
  
    // if: main and sub already selected to not dispatch
    if (catAndSub?.main?._id === mainCat._id &&
      catAndSub?.sub?._id === subCat._id) {
        // skip
    } else {
      // set catAndsub
      // push main and sub into selectedCats
      dispatch({type: SET_CAT_SUB,  payload: [mainCat, subCat]})
      // dispatch action filter by category:
      selectedCats = getState().categoriesStore?.selectedCats;
      dispatch(readProducts(1, selectedCats));
    }



  }catch (err) {
    console.log({ message: 'action: setMainAndSubCat', err: err.message });
  }
  



  
} 

// clear selectedCats
export const clearSelectedCats = 
  () => 
  (dispatch) => dispatch({ type: CLEAR_CATS, payload: [] });

// get one category 
export const fetchOneCat = (slug) => async (dispatch) => {
  try {
    const {data} = await API.getOneCat(slug);
    dispatch({ type: FETCH_ONE_CAT, payload: data });
  } catch(err) {
    console.log({ message: 'action: fetchOneCat', err: err.message });
  }
} 

// set mainCat active tab
export const setActiveTab = (mCatObj) => (dispatch) => {
  console.log(mCatObj)

  //dispatch({ type: SET_ACTIVE_CAT, payload: {} });
  dispatch({ type: SET_ACTIVE_CAT, payload: mCatObj});
}

// force repaint subcat
export const ForceRepaint = (style) => (dispatch) => {
  dispatch({ type: FORCE_REPAINT, payload: style });
}