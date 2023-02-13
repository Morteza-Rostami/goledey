import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { MdKeyboardArrowRight } from "react-icons/md";

// css
import styles from './Verify.module.scss';

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../../ACTIONS/userActions";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import useValidateLogin from "../../../HOOKS/useValidateLogin";
import CONST from "../../../CONSTANTS/CONST";
import { useSnackbar } from "notistack";


const SignupVerify = ({ 
  formD, 
  setFormD, 
  back,
}) => {
  const isLoading = useSelector(state => state.userStore.isLoading);
  const [isSubmited, setIsSubmited] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const snackObj = useSnackbar();

  const {
    errors,
    validate
  } = useValidateLogin();

  function handChange(e) {
    setFormD(cu => ({ ...cu, [e.target.name]: e.target.value }));
  }

  function handSubmit(e) {
    e.preventDefault();
    // validate input:
    validate(formD);

    console.log('submit')
    setIsSubmited(true);
   

  }

  useEffect(() => {

    // be sure user did not delete the phone number
    if (errors[CONST.phone]) {
      back();
      return;
    }

    // form is submited and there is no
    console.log(errors)
    if (!Object.keys(errors).length && isSubmited) {
      //dispatch
      dispatch(verifyOtp(formD, navigate, snackObj));
    }
    setIsSubmited(false);
  }, [isSubmited, errors]);

  return (
    <form
    className={`${styles.verify}`}
    onSubmit={(e) => handSubmit(e)}
  
    >
      <h2 
        className={`${styles.heading}`}
      >
        کد تایید را وارد کنید
      </h2>

      <p
        className={`${styles.toptext}`}
      >
        کد تایید برای شماره <span>({formD.cellPhone})</span> پیامک شد.
      </p>
      <p
        className={`${styles.subtext}`}
      >
        (کیبورد خود را انگیلسی کنید)
      </p>

      <input
        name={'otp'}
        sx={{width: '100%'}}
        value={formD.otp}
        onChange={(e) => handChange(e)}
        type={'text'}
      />

      <p
        className={`${styles.errors}`}
      >
        { errors['otp'] ? errors['otp'] : '' }
      </p>

      <LoadingButton
        className={`${styles.btn}`}
        type='submit'
        variant='outlined'
        color='secondary'
        loading={ isLoading ? true : false }
        loadingPosition="start"
        loadingIndicator={<CircularProgress size={16} sx={{color: '#71EE5A'}}/>}
      >
        ورود
      </LoadingButton>
    </form>
  )
}


export default SignupVerify;