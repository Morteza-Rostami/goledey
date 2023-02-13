import API from "../API/api";
import CONST, { 
  CLEAR_REVIEWS,
  CREATE_REVIEW, FETCH_REVIEWS, IS_LOADING_REVIEWS, REFRESH_REVIEW_INFO
} from "../CONSTANTS/CONST";
import { doneScreenLoad, setScreenLoad } from "./msgActions";
import { addToast } from "./toastActions";

// get all reviews by product
export const readReviews = (slug, page, limit) => async (dispatch) => {
  try {

    // set loading true
    dispatch(setIsLoadingReviews(true));

    dispatch(setScreenLoad());

    const { data } = await API.getReviews(slug, page,limit);

    dispatch(setIsLoadingReviews(false));

    dispatch({ type: FETCH_REVIEWS, payload: data });
    // dispatch(refreshReviewINfo());

    dispatch(doneScreenLoad());

  } catch(err) {
    console.log({ message: 'action: /reviews/get?productId', err: err.message });
  }
}

// create new review
export const createReview = (review, snackObj) => async (dispatch) => {
  const reviewLim = 10;
  const reviewLen = review.content.length;

  try {
    dispatch(setIsLoadingReviews(true));

    // if review is empty or less than 100 chars
    if (!reviewLen || reviewLen <= reviewLim) {
      dispatch(addToast(snackObj, CONST.ERROR_SNACK, `نظر شما باید بیشتر از (${reviewLim}) کاراکتر باشد.`));
      dispatch(setIsLoadingReviews(false))
      return;
    }

    const { data } = await API.createReview(review);

    dispatch(setIsLoadingReviews(false));
    dispatch(addToast(snackObj, CONST.SUCCESS_SNACK, 'نظر شما با موفقیت ارسال شد!'));
    // update store with new product
    dispatch({ type: CREATE_REVIEW, payload: data });
    // update review related data
    // dispatch(refreshReviewINfo());
  } catch (err) {
    console.log({ message: 'action: /reviews/create', err: err.message });
  }
}

/* are you loading reviews: true, false */
export const setIsLoadingReviews = (isLoading) => (dispatch) => {
  dispatch({ type: IS_LOADING_REVIEWS, payload: isLoading});
}

/* clear reviews */
export const clearReviews = () => (dispatch) => {
  dispatch({ type: CLEAR_REVIEWS});
}

export const refreshReviewINfo = () => (dispatch, getState) => {
  const reviews = getState().reviewsStore?.reviews;
  let totalReviews = reviews.length;
  let reviewInfo = {};

  // if: no reviews
  if (!totalReviews) {
    reviewInfo = {average: 0, reviewsLen: totalReviews};
  }
  else {
    const ratingsArr = 
      reviews.map(({rating}) => rating );
    // average review for product:
    let average = 
      ratingsArr.reduce((init , currentVal) => init = init + currentVal) / reviews.length; 
  
    // rounding to 2 decimals
    // Math.round((num + Number.EPSILON) * 100) / 100
    average = Math.round((average + Number.EPSILON) * 100) / 100;
  
    reviewInfo = {average: average, reviewsLen: totalReviews};
  }


  // dispatch: average and total number of reviews
  dispatch({ type: REFRESH_REVIEW_INFO, payload: reviewInfo });
}