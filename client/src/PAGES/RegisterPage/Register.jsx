import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// css
import styles from './Register.module.scss';

// material ui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, IconButton } from "@mui/material";
import { useMultiStepsForm } from "../../HOOKS/useMultiStepForm";

// icons
import { MdClose, MdKeyboardArrowRight } from 'react-icons/md';
import { ICON_SIZE_MOB } from "../../CONSTANTS/CONST";
import { lightGreen } from "@mui/material/colors";

// action
import { register, verifyOtp } from "../../ACTIONS/userActions";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Steps from "./Steps/Steps";
import SignupForm from "./Signup/Signup";
import SignupVerify from "./Verify/Verify";

import { addToast } from "../../ACTIONS/toastActions";

import { useSnackbar } from 'notistack';

import HorizLine from '../../COMPONENTS/HorizLine/HorizLine';

const Register = ({ closeModal }) => {

  // both forms dsata:
  const [formD, setFormD] = useState({
    cellPhone: '',
    otp: ''
  });

  const dispatch = useDispatch();
  const snackObj = useSnackbar();

  // custom hook for changing form state => passing an array of steps
  const { 
    steps, 
    currentStepInx, 
    step,
    next,
    back,
    activeStep,
   } = useMultiStepsForm([
    <SignupForm 
    formD={formD} 
    setFormD={setFormD} 
    />,
    <SignupVerify 
    formD={formD} 
    setFormD={setFormD}
    />,
  ]);

  /* useEffect(() => {
    
    return () => {
      //cleanup
    };
  }, [formD]); */

  return (
    <div
      className={`${styles.register} register`}
    >
      <div className={`${styles.inner}`}>
        {/* <Button
          onClick={() => dispatch(addToast(snackObj, 'info', `برای صدور کد تایید دیگر ${4} دقیقه صبر کنید!`))}
        >
          get snack
        </Button> */}

        <div 
          className={`${styles.head}`}
        >
          {
            activeStep === 0
            ? (
              <IconButton
                className={``}
                onClick={() => closeModal()}
              >
                <MdClose className={`${styles.ico}`}/>
              </IconButton>
            ) : (
              <IconButton
                onClick={back}
              >
                <MdClose className={`${styles.ico}`}/>
              </IconButton>
            )
          }
          <Steps activeStep={activeStep}/>

        </div>
        <HorizLine/>

        <div
          className={`${styles.formwrap}`}
        >
          {step}
        </div>

        
        
      </div> {/* inner */}

    </div> /* register */
  )
}

export default Register