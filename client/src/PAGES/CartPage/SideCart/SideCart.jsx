import React, { useMemo } from 'react'

// css
import styles from './SideCart.module.scss';

import AvatarIco from '../../../SVG/profileSVG/AvatarIco';
import PhoneIco from '../../../SVG/profileSVG/PhoneIco';
import LocIco from '../../../SVG/profileSVG/LocIco';
import { Button } from '@mui/material';
import CheckoutBtn from '../CheckoutBtn/CheckoutBtn';
import TomanIco from '../../../SVG/TomanIco';
import FrontHelp from '../../../HELPERS/frontHelp';
import DangerIco from '../../../SVG/DangerIco';
import InfoCard from '../../../COMPONENTS/InfoCard/InfoCard';
import { useSelector } from 'react-redux';


const SideCart = () => {
  const token = JSON.parse(localStorage.getItem('auth'))?.token;
  const auth = JSON.parse(localStorage.getItem('auth'))?.user;
  //const cart = JSON.parse(localStorage.getItem('cart'));
  const cart = useSelector(state => state.cartStore);
  const profileComplete = true;


  return (
    <div
      className={`${styles.side__cart}`}
    >
      
      <InfoCard/>

      <div
        className={`${styles.buy}`}
      >
        <div
          className={`${styles.price}`}
        >
          <p
            className={`${styles.subtext}`}
          >
            <DangerIco/>
            <span>
              قیمت نهایی خرید
            </span>
          </p>
          <div
            className={`${styles.total}`}
          >
            <p>
              { cart ? FrontHelp.formatMoney(cart.total) : 0 }
            </p>
            <TomanIco/>
          </div>
          
        </div>
        <div
          className={`${styles.checkout}`}
        >
          <CheckoutBtn css={styles.btn}/>
        </div>
      </div>
    </div>
    
  )
}

export default SideCart