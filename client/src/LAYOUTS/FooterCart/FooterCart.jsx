import React from 'react'

// css
import styles from './FooterCart.module.scss';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import TomanIco from '../../SVG/TomanIco';
import DangerIco from '../../SVG/DangerIco';

import FrontHelp from '../../HELPERS/frontHelp';
import CheckoutBtn from '../../PAGES/CartPage/CheckoutBtn/CheckoutBtn';
import { useSelector } from 'react-redux';

const FooterCart = () => {
  // const token = JSON.parse(localStorage.getItem('auth'))?.token;
  // const auth = JSON.parse(localStorage.getItem('auth'))?.user;
  //const cart = JSON.parse(localStorage.getItem('cart'));
  const cart = useSelector(state => state.cartStore);
  // const profileComplete = true;


  console.log(cart);
  return (
    <div
      className={`${styles.footer__cart}`}
    > 
      <div
        className={`${styles.inner}`}
      >
        <div
          className={`${styles.checkout}`}
        >
          <CheckoutBtn/>
        </div>

        <div
          className={`${styles.price}`}
        > 
          <div
            className={`${styles.total}`}
          >
            <p>
              { cart ? FrontHelp.formatMoney(cart.total) : 0 }
            </p>
            <TomanIco/>
          </div>
          <p
            className={`${styles.subtext}`}
          >
            <DangerIco/>
            <span>
              قیمت نهایی خرید
            </span>
          </p>

        </div>
      </div>
      
    </div>
  )
}

export default FooterCart