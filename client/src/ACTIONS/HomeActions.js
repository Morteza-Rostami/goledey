import API from "../API/api";
import { GET_HOME_DATA } from "../CONSTANTS/CONST";
import { doneScreenLoad, setScreenLoad, setScreenLoading } from "./msgActions";


// get home data
export const getHomeData = () => async (dispatch) => {
  
  try {

    // screen loading
    // dispatch(setScreenLoading(true));
    dispatch(setScreenLoad());

    const { data } = await API.getHomeData();

    // dispatch(setScreenLoading(false));

    dispatch(doneScreenLoad());

    
    dispatch({ type: GET_HOME_DATA, payload: data });
  } catch(err) {
    console.log({ message: 'action: getHomeData', err: err.message });
  }
}