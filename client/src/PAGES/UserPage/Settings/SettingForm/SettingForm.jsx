import React from 'react'
import { useState, useEffect } from 'react';
import { Button, FormControlLabel, FormGroup, InputLabel, TextField } from '@mui/material';

// css
import styles from './SettingForm.module.scss';

import { useDispatch, useSelector } from 'react-redux';

// hooks
import useUserSettingsValidator from '../../../../HOOKS/useUserSettingsValidator'; 
import { red } from '@mui/material/colors';
import { updateUser } from '../../../../ACTIONS/userActions';
import DatePick from '../DatePick/DatePick';


const SettingForm = () => {
  const BIRTHDAY = 'birthday';
  const CREDIT = 'creditCard';
  // open date modal
  const [dateOpen, setDateOpen] = useState(false); 

  const user = JSON.parse(localStorage.getItem('auth'))?.user;
  const [formD, setFormD] = useState({
    name: user?.name || '',
    email: user?.email || '',
    creditCard: user?.creditCard || '',
    birthday: user?.birthday || ''
  });
  // current active field:
  const [activeField, setActiveField] = useState('');
  // validate hook
  const { errors, validateForm, onBlurField } = useUserSettingsValidator(formD);

  const dispatch = useDispatch();

  // creditCart space each 4 char
  const formatAndSetCcNumber = (name, value) => {
    //remove all the empty spaces in the input
    const inputVal = value.replace(/ /g, ""); 
    let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits

    if (inputNumbersOnly.length > 16) {
      //If entered value has a length greater than 16 then take only the first 16 digits
      inputNumbersOnly = inputNumbersOnly.substr(0, 16);
    }

    // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
    const splits = inputNumbersOnly.match(/.{1,4}/g);

    let spacedNumber = "";
    if (splits) {
      spacedNumber = splits.join(" "); // Join all the splits with an empty space
    }
    setFormD(c => {
      return {...c, [name]: spacedNumber};
    }); // Set the new CC number
  };

  /* get the date event out of date dialog */
  const handChangeDate = (newVl, name=BIRTHDAY) => {
    setFormD(c => {
      return {...c, [name]: newVl}
    })
  }

  function handChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let nextFormState = {};
    
    if (name === CREDIT) {
      formatAndSetCcNumber(name, value);
    } else {
      
      setFormD(c => {
        return {...c, [name]: value}
      })
    }

    // setActive field
    if (name !== BIRTHDAY)
    setActiveField(name);
    
  }


  function handSubmit(e) {
    e.preventDefault();

    // upon submit => validate
    const { isValid } = validateForm({ 
      form: formD, 
      errors, 
      forceTouchErrors: true });

    // if: invalid do not dispatch request.
    if (!isValid) return;

    // dispatch
    dispatch(updateUser(formD, user?._id));

  }

  useEffect(() => {
    // if: filed touched => validate
    if (activeField) {
      if (errors[activeField].dirty) {
        validateForm({
          form: formD,
          errors,
          activeField
        });
      }
    }

  }, [formD]);

  console.log(formD);
  return (
    <div className={`${styles.settings} settings-form`}>

      <form 
        className={`${styles.form}`}
        onSubmit={handSubmit}
      >

        <FormGroup>
          <InputLabel 
          className={`${styles.label}`}
          id="fullAddress"
          >
            نام و نام خانوادگی.
          </InputLabel>
          <TextField 
          id="name" 
          label="نام و نام خانوادگی" 
          name='name'
          variant="filled" 
            value={formD.name}
            onChange={(e) => handChange(e)}
            onBlur={(e) => onBlurField(e)}
          autoComplete='off'
          />
          {
            errors.name.dirty && errors.name.error 
              ? <p 
                className={`${styles.errors}`}
              >
                {errors.name.message }
                </p> 
              : ''
          }
        </FormGroup>

        <FormGroup>
          <InputLabel 
          className={`${styles.label}`}
          id="fullAddress"
          >
            تلفن همراه (غیر فعال).
          </InputLabel>
          <TextField 
          id="cellPhone" 
          name='cellPhone'
          disabled 
          label="" 
          variant="filled" 
          value={user?.cellPhone}
          />
          
        </FormGroup>

        <FormGroup>
          <InputLabel 
          className={`${styles.label}`}
          id="fullAddress"
          >
            ایمیل.
          </InputLabel>
          <TextField 
          id="email" 
          name='email'
          label="" 
          variant="filled" 
            value={formD.email}
            onChange={(e) => handChange(e)}
            onBlur={(e) => onBlurField(e)}
            autoComplete='off'

          />
          {
            errors.email.dirty && errors.email.error 
              ? <p 
              className={`${styles.errors}`}
              >
                {errors.email.message }
                </p> 
              : ''
          }
        </FormGroup>

        <FormGroup>
          <InputLabel 
          className={`${styles.label}`}
          id="fullAddress"
          >
            شماره کارت بانکی.
          </InputLabel>
          <TextField 
          id="creditCard" 
          name='creditCard'
          label="creditCard" 
          type={'text'}
          variant="filled" 
            value={formD.creditCard}
            onChange={(e) => handChange(e)}
            // any time click out of a input => out of focous
            onBlur={(e) => onBlurField(e)}
            autoComplete='off'
            
          />
          {
            errors.creditCard.dirty && errors.creditCard.error 
              ? <p 
              className={`${styles.errors}`}
              >
                {errors.creditCard.message }
                </p> 
              : ''
          }
          
        </FormGroup>

        {/* <FormGroup>
          <InputLabel 
          className={`${styles.label}`}
          id="fullAddress"
          >
            تاریخ تولد (اختیاری).
          </InputLabel>
          
          <DatePick
            getDateVal={handChangeDate}
          />
          
        </FormGroup> */}

        <FormGroup>
          <Button 
          className={`${styles.btn}`}
          type='submit'
          variant='filled'
          >
            تایید
          </Button>
        </FormGroup>

      </form>
      </div>


  )
}

export default SettingForm

/* 
name
email
phone
creditcard
birthday

*/