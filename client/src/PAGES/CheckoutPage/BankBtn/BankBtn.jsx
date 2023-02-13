import { Button } from '@mui/material'
import React from 'react'

// css
import styles from './BankBtn.module.scss';
import CONST from '../../../CONSTANTS/CONST';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../ACTIONS/orderActions';

const BankBtn = ({
  setDateOpen,
  datePicked,
  date,
}) => {
  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;
  const cart = useSelector(state => state.cartStore);

  const dispatch = useDispatch();  

  // create order and go to bank
  function handOrderBank() {

    // send only product._id
    const products = cart?.products.map(item => {
      const object = JSON.parse(JSON.stringify(item));
      const {_id, ...rest} = object;
      rest.product = rest.product._id;
      return rest;
    });

    const order = {
      user: user?._id,
      products: products,
      deliveryTime: date,
      status: CONST.UNPAID,
      total: cart?.total,
    }

    dispatch(createOrder(order));
  }
  
  return (
    <>
      {
        datePicked
        ? (
          <Button
          className={`${styles.btn}`}
            variant='contained'
            color='error'
            onClick={handOrderBank}
            style={{ width: '100%' }}
          >
            پرداخت (بانک)
          </Button>
        ) : (
          <Button
            className={`${styles.btn}`}
            variant='contained'
            color='error'
            onClick={() => setDateOpen(true)}
            size='large'
            style={{ width: '100%' }}
          >
            انتخاب زمان
          </Button>
        )
      }
    </>
  )
}

export default BankBtn