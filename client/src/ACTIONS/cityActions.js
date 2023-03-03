import API from "../API/api";
import { 
  
  GET_CITIES,
 } from "../CONSTANTS/CONST";


export const getCities = () => async (dispatch) => {

  try {
    const {data} = await API.getCities();
    dispatch({ type: GET_CITIES, payload: data });
  } catch(err) {
    console.log({ message: 'action: getCities', err: err.message });
  }
}

/* export const updateShippingCost = () => async (dispatch) => {

  try {
    const {data} = await API.getCities();
    dispatch({ type: GET_CITIES, payload: data });
  } catch(err) {
    console.log({ message: 'action: getCities', err: err.message });
  }
} */