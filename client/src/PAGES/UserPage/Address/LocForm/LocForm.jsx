import React from 'react'

// css
import styles from './LocForm.module.scss';
// import SelectDrop from '../../../../COMPONENTS/SelectInput/SelectInput';

import { useState, useEffect } from 'react';
import { Button, FormGroup, IconButton, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {getCities} from '../../../../ACTIONS/cityActions';
import { updateAddress } from '../../../../ACTIONS/userActions';
import NavBar from '../../Dashboard/NavBar/NavBar';
import useAddressValidator from '../../../../HOOKS/useAddressValidator';

import FormHelperText from '@mui/material/FormHelperText';
import CONST from '../../../../CONSTANTS/CONST';
import { MdClose } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';


const LocForm = () => {
  const { userId: authUser } = useParams();
  const user = JSON.parse(localStorage.getItem('auth'))?.user;
  // all cities: 
  const cities = useSelector(state => state.cityStore?.cities);
  let firstRender = true;
  //const cityId = user?.address?.city?._id;
  const [formD, setFormD] = useState({
    city: user?.address?.city?._id || '',
    fullAddress: user?.address?.fullAddress || '',
    phone: user?.address?.phone || ''
  });

  // for validation
  const [activeField, setActiveField] = useState('');
  // validation hook
  const { errors, validateForm, onBlurField } = useAddressValidator(formD);


  const dispatch = useDispatch();

  function handChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormD(c => ({...c, [name]: value}));

    // set acitve field only for full address
    if (name === CONST.fullAddress)
      setActiveField(name);
  } 

  function handSubmit(e) {  
    e.preventDefault();

    const { isValid } = validateForm({ 
      form: formD, 
      errors, 
      forceTouchErrors: true });

    // if: invalid do not dispatch request.
    if (!isValid) return;

    // dispatch
    dispatch(updateAddress(formD, user._id));


  }

  useEffect(() => {
    // get cities on first render
    if (firstRender) dispatch(getCities());
    firstRender = false;
  }, []);

  // if input is touched and is invalid -> set errors
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

  return (

    <section
      className={`${styles.loc__form} locform`}
    >
      

      <form 
        className={`${styles.form}`}
        onSubmit={handSubmit}
      >

        <FormGroup>
          <InputLabel 
          className={`${styles.label}`}
          id="city"
          >
            شهرستان محل ارسال سفارش را انتخاب کنید.
          </InputLabel>
          <Select
            labelId="city"
            id="demo-simple-select"
            value={formD.city}
            name='city'
            label="شهرستان"
            variant='filled'
            onChange={handChange}
          >
            {
              cities.length > 0 &&
              (
                cities.map((city) => (
                  <MenuItem value={city._id} key={city._id}>
                    {city.name}
                  </MenuItem>
                ))
              )
            }
          </Select>
        </FormGroup>

        {/* textarea */}
        <FormGroup>
          <InputLabel 
          className={`${styles.label}`}
          id="fullAddress"
          >
            آدرس کامل محل ارسال را بنویسید.
          </InputLabel>
          <TextareaAutosize
            className={`${styles.full}`}
            name='fullAddress'
            labelId={'fullAddress'}
            aria-label="empty textarea"
            //style={{ width: 200 }}
            value={formD.fullAddress}
            onChange={(e) => handChange(e) }
            placeholder='البرز-خیابان ۴۵ متری-...'
            onBlur={(e) => onBlurField(e)}
          />
          <FormHelperText>
            {
              errors.fullAddress.dirty && errors.fullAddress.error 
                ? <p 
                  className={`${styles.err}`}
                  style={{ color: 'red' }}
                >
                  {errors.fullAddress.message }
                  </p> 
                : ''
            }
          </FormHelperText>
        </FormGroup>


        <FormGroup>
          <InputLabel 
          className={`${styles.label}`}
          id="phone"
          >
            تلفن منزل (اختیاری)
          </InputLabel>
          <TextField 
          id="phone" 
          label="تلفن" 
          labelId='phone'
          name='phone'
          variant="filled" 
            value={formD.phone}
            onChange={(e) => handChange(e)}
            // onBlur={(e) => onBlurField(e)}
          autoComplete='off'
         
          />
          {/* {
            errors.name.dirty && errors.name.error 
              ? <p 
                style={{ color: 'red' }}
              >
                {errors.name.message }
                </p> 
              : ''
          } */}
        </FormGroup>

        

        

        <FormGroup>
          <Button
          className={`${styles.btn}`}
          type='submit'
          variant='outlined'
          size='large'
          >
            تایید
          </Button>
        </FormGroup>

      </form>

    </section>

  )
}

export default LocForm