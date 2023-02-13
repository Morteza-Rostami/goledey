import React from "react";

import { useState, useEffect } from 'react'


const useValidateLogin = () => {
  const [errors, setErrors] = useState({})


  const validate = (formD) => {
    const phone = 'cellPhone';
    const otp = 'otp';
    const phoneDigNum = 11;

    // clear errors
    setErrors({});

    console.log('validate', formD)
    /* only numbers */
    function containsOnlyNumbers(str) {
      return /^\d+$/.test(str);
    }
    console.log(formD[phone].length)

    /* phone input not empty */
    if (!formD[phone].length) {
      console.log(formD[phone])
      setErrors(c => ({...c, [phone]: 'لطفا تلفن خود را وارد کنید.'}));

    } 
    /* only digits */
    else if (!containsOnlyNumbers(formD[phone])) {
      console.log(formD[phone])

      setErrors(c => ({...c, [phone]: 'تنها اعداد مجاز میباشد.'}));
    } 
    /* valid phone format */
    else if (formD[phone].length !== phoneDigNum) {
      console.log(formD[phone])

      setErrors(c => ({...c, [phone]: 'شماره تلفن معتبر نمیباشد.'}));
    }

    /* validate otp */
    if (!formD[otp].length) {
      setErrors(c => ({...c, [otp]: 'کد تایید خود را وارد کنید!'}));
    }


  }

  return {
    errors,
    validate,
  }
}

export default useValidateLogin