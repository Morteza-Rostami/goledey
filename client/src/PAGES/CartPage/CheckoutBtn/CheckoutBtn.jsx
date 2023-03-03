import React, { useEffect, useState } from 'react'

// css
import styles from './CheckoutBtn.module.scss';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserComplete } from '../../../ACTIONS/userActions';
import { openRegister } from '../../../ACTIONS/msgActions';



const CheckoutBtn = ({
  css
}) => {
  const token = JSON.parse(localStorage.getItem('auth'))?.token;
  const user = JSON.parse(localStorage.getItem('auth'))?.user;
  //const cart = JSON.parse(localStorage.getItem('cart'));
  const cart = useSelector(state => state.cartStore);
  //const [userComplete, setUserComplete] = useState(false);
  const isUserComplete = useSelector(state => state.userStore.isUserComplete);

  const dispatch = useDispatch();


  // first render
  useEffect(() => {
    if (user) {
      dispatch(setUserComplete());

    }
  }, []);

  return (
    <>
      {
        token
        ? (
          <Button
            className={`${styles.btn} ${css}`}
            variant="contained"
            size='large'

            //color={"success"}
            component={Link}
            to={
              token && !isUserComplete
              ? (
                `/checkout/${user?._id}`
              ) 
              : (
                `/users/dashboard/${user?._id}`
              )
            }
          >
            ادامه خرید
          </Button>

        ) : (
          /* no auth user */
          <Button
            className={`${styles.btn} ${css}`}
            variant='contained'
            size='large'
            onClick={() => dispatch(openRegister())}
          >
            ادامه خرید
          </Button>
        )
      }

      
    </>
  )
}

export default CheckoutBtn