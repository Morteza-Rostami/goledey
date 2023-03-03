import React from 'react'
import { useState, useEffect } from 'react';
// css
import styles from './Checkout.module.scss';
import { Button } from '@mui/material';
import MyDatePicker from '../../COMPONENTS/DatePicker/DatePicker';

import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../ACTIONS/orderActions';
import CONST from '../../CONSTANTS/CONST';
import Header from '../../LAYOUTS/Header/Header';
import Footer from '../../LAYOUTS/Footer/Footer';

import AutoLayout from '../../LAYOUTS/AutoLayout/AutoLayout';
import HeaderCheck from '../../LAYOUTS/HeaderCheck/HeaderCheck';
import FooterCheck from '../../LAYOUTS/FooterCheck/FooterCheck';

import LocIco from '../../SVG/profileSVG/LocIco';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import OrderDate from './OrderDate/OrderDate';
import Ordered from './Ordered/Ordered';

import TomanIco from '../../SVG/TomanIco'
import DangerIco from '../../SVG/DangerIco'
import CarIco from '../../SVG/CarIco'

import FrontHelp from '../../HELPERS/frontHelp';
import COLOR from '../../COLORS/COLORS';
import SideCheck from './SideCheck/SideCheck';
import { getCartDb } from '../../ACTIONS/cartActions';
import { useMemo } from 'react';
import { getCities } from '../../ACTIONS/cityActions';


/* date of tomorrow */
const day = 60 * 60 * 24 * 1000;
const now = new Date();
const tomorrow = new Date(now.getTime() + day)

const Checkout = () => {
  const user = JSON.parse(localStorage.getItem('auth'))?.user;
  // const cart = JSON.parse(localStorage.getItem('cart'));
  const cart = useSelector(state => state.cartStore);

  // const tomorrow = useMemo(() => {

  // }, []);
 
  
  /* DatePicker state */
  const [datePicked, setDatePicked] = useState(false);
  const [date, setDate] = useState(tomorrow);
  const [dateOpen, setDateOpen] = useState(false); 


  const dispatch = useDispatch();

  function getDateVal(date) {setDate(date);}

  // update cart on each checkout
  useEffect(() => {
    if ( user ) {
      const data = { userId: user._id }
      dispatch(getCartDb(data));

      // update shipping cost:
      dispatch(getCities());

    }
  }, []);

  /* shippingCost */
  const cities = useSelector(state => state.cityStore.cities);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    if (cities.length) {
      const city = cities.filter((vl, i) => vl.name === user.address?.city?.name );

      setShippingCost(city[0].shippingCost);

      
    }
  }, [cities]);


  return (
    <AutoLayout
      headerMob={<HeaderCheck/>}
      headerDec={<HeaderCheck/>}
      footerMob={<FooterCheck setDateOpen={setDateOpen} datePicked={datePicked}/>}
      footerDec={<Footer/>}
    >
      <div className={`${styles.checkout} center-contain`}>

        <div
          className={`${styles.inner} contain-2`}
        >
          <div
            className={`${styles.grid}`}
          >

            <section
              className={`${styles.main}`}
            >

              {/* head */}
              <div
                className={`${styles.head}`}
              >
                <h2>
                  نهایی کردن سفارش
                </h2>
              </div>

              {/* address */}
              <div
                className={`${styles.address}`}
              >
                <div
                  className={`${styles.wrap}`}
                >
                  <p
                    className={`${styles.uptext}`}
                  >
                    آدرس تحویل سفارش
                  </p>
                  <div
                    className={`${styles.fullad}`}
                  >
                    <LocIco/>
                    <p>
                      { `${user?.address?.city?.name}, ${user?.address?.fullAddress}` }
                    </p>
                  </div>
                  <div
                    className={`${styles.subtext}`}
                  >
                    به نام: {user.name}
                  </div>
                </div> {/* wrap */}

                <div
                  className={`${styles.action}`}
                >
                  <Button
                    className={`${styles.btn}`}
                    component={Link}
                    variant='text'
                    size='medium'
                    to={`/users/address/${user ? user._id : ''}`}
                  >
                    <span>
                      تغییر | ویرایش
                    </span>
                    <MdOutlineKeyboardArrowLeft className={`${styles.ico}`}/>
                  </Button>
                </div>

              </div> {/* address */}

              {/* orderDate */}
              <div
                className={`${styles.order__date__out}`}
              >
                <OrderDate 
                  date={date}
                  setDate={setDate}  
                  dateOpen={dateOpen}
                  setDateOpen={setDateOpen}
                  setDatePicked={setDatePicked}
                />
                
              </div>

              {/* ordered products */}
              <div
                className={`${styles.ordered__items}`}
              >
                <Ordered/>
              </div>

              {/* prices */}
              <div
                className={`${styles.prices}`}
              >
                <PriceInfo
                  icon={<DangerIco/>}
                  text={`قیمت کالاها (${cart.itemsCount})`}
                  price={ FrontHelp.formatMoney(cart.total) }
                />
                <PriceInfo
                  icon={<CarIco/>}
                  text={`هزینه ارسال`}
                  price={ FrontHelp.formatMoney(shippingCost)}
                />
                <PriceInfo
                  icon={<DangerIco/>}
                  text={`قیمت نهایی خرید`}
                  price={ FrontHelp.formatMoney(cart.total + shippingCost) }
                  active={styles.active}
                />
              </div>

            </section> {/* main */}

            {/* side checkout */}
            <section
              className={`${styles.checkbar}`}
            >
              <SideCheck 
              setDateOpen={setDateOpen} 
              datePicked={datePicked} 
              date={date}
              shippingCost={shippingCost}
              /> 
            </section>
          </div> {/* grid */}

        </div> {/* inner */}
      </div> {/* checkout */}
    </AutoLayout>
  )
}

export default Checkout

/* price info item */
const PriceInfo = ({
  icon,
  text, 
  price,
  active,
}) => {

  return (
    <p
      className={styles.tag}
    >
      <span
        className={`${styles.text}`}
      >
        {icon}
        <span>
        {text}
        </span>
      </span>
      <span
        className={`${styles.total} ${active}`}
      >
        <span 
        
        >
          {price}
        </span>
        <TomanIco 
        
        />
      </span>
    </p>
  )
}

/* 

<MyDatePicker 
          getDateVal={getDateVal}
          dateOpen={dateOpen}
          setDateOpen={setDateOpen}
          />

          <div className={`${styles.user_info}`}>
            name: 
            <p>
              {user ? user.name : ''}
            </p>
            user address: 
            <p>
              {user ? user?.address.city.name : ''}
              {user ? user?.address.fullAddress : ''}
            </p>
          </div>

          <div className={`${styles.cart_info}`}>
            <ul>
              {
                cart?.products.length
                ? (
                  cart?.products.map(item => (
                    <li key={item.product._id}>
                      {item.product.name} 
                    </li>
                  ))
                ) : ''
              }
            </ul>
          </div>

          <div className={`${styles.bank}`}>
          
          </div>
*/