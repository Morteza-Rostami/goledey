import { Button, CircularProgress, TextField } from "@mui/material";

// css
import styles from './Signup.module.scss';

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../ACTIONS/userActions";
import { useSnackbar } from "notistack";
import LoadingButton from '@mui/lab/LoadingButton';
import useValidateLogin from "../../../HOOKS/useValidateLogin";

import { useState, useEffect } from "react";
import CONST from "../../../CONSTANTS/CONST";

const SignupForm = ({ 
  formD, 
  setFormD, 
  next,

}) => {
  const isLoading = useSelector(state => state.userStore.isLoading);
  const dispatch = useDispatch();
  const snackObj = useSnackbar();
  const [isSubmited, setIsSubmited] = useState(false);

  const {
    errors,
    validate
  } = useValidateLogin();
  

  function handChange(e) {
    setFormD(cu => ({ 
      ...cu, 
      [e.target.name]: e.target.value 
    }));
  }

  function handSubmit(e) {
    e.preventDefault();

    // validate input:
    validate(formD);

    setIsSubmited(true);
    
  }

  useEffect(() => {
    // form is submited and there is no
    if (!errors[CONST.phone] && isSubmited) {
      dispatch(register(
        formD, 
        next,
        snackObj,
      ));

    }
    setIsSubmited(false);
  }, [isSubmited, errors]);

  return (
    <form
    className={`${styles.form}`}
    onSubmit={(e) => handSubmit(e)}
    >
      {/* <Steps/> */}
      
      <h2
        className={`${styles.heading}`}
      >
        ثبت نام | ورود
      </h2>

      <section
        className={`${styles.content_wrap}`}
      >
        <p 
          className={`${styles.toptext}`}
        >
          سلام!
        </p>
        <p
          className={`${styles.toptext}`}
        >
          لطفا شماره موبایل خود را وارد کنید.
        </p>
        <p
          className={`${styles.subtext}`}
        >
          (کیبورد خود را انگیلسی کنید)
        </p>
      </section>
      
      <input
        className={`${styles.phone}`}
        type={'text'}
        name='cellPhone'
        sx={{
          width: '100%'
        }}
        value={formD.cellPhone}
        onChange={(e) => handChange(e)}
        autoComplete={'off'}
        placeholder="09363456789"
      />
      <p
        className={`${styles.errors}`}
      >
        { errors['cellPhone'] ? errors['cellPhone'] : '' }
      </p>

      <LoadingButton
        className={`${styles.btn}`}
        type='submit'
        variant='outlined'
        loading={ isLoading ? true : false }
        // disabled={ isLoading ? true : false }
        //loadingPosition="start"
        loadingIndicator={<CircularProgress size={16} sx={{color: '#71EE5A'}}/>}
      >

        ثبت نام
      </LoadingButton>
    </form>
  )
}

export default SignupForm;


{/* <TextField
      id="outlined-basic" 
      label="شماره تلفن" 
      name='cellPhone'
      variant="outlined" 
      width={'100%'}
      sx={{
        width: '100%'
      }}
      // fullWidth=''
      value={formD.cellPhone}
      onChange={(e) => handChange(e)}
      /> */}