import API from "../API/api";
import MySnackbar from "../COMPONENTS/MySnackbar/MySnackbar";
import { ADD_TOAST } from "../CONSTANTS/CONST";
import { Button } from "@mui/material";

// add a toast message to: toast stack:
export const addToast = (snackObj, variant, message='') => (dispatch) => {
  const { enqueueSnackbar, closeSnackbar } = snackObj;

  try {
    enqueueSnackbar(message, {
      variant: variant,
      key: new Date().getTime() + Math.random(),
      action: key => (
        <Button 
        style={{
          alignSelf: 'flex-end',
          color: '#F4F6F2'
        }}
        onClick={() => closeSnackbar(key)}>
          ببند
        </Button>
      ),
    });
    
    // const snack = <MySnackbar/>
    // dispatch({ type: ADD_TOAST, payload: snack });

  } catch(err) {
    console.log({ message: 'action: addToast', err: err.message });
  }
}