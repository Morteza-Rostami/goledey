import React, { useEffect, useState } from 'react'

// css
import styles from './SideCheck.module.scss';

import InfoCard from '../../../COMPONENTS/InfoCard/InfoCard';
import { useMemo } from 'react';
import DangerIco from '../../../SVG/DangerIco';
import FrontHelp from '../../../HELPERS/frontHelp';
import TomanIco from '../../../SVG/TomanIco';
import CarIco from '../../../SVG/CarIco';
import BankBtn from '../BankBtn/BankBtn';
import { useSelector } from 'react-redux';


const SideCheck = ({
  setDateOpen,
  datePicked,
  date,
  shippingCost,
}) => {
  const user = JSON.parse(localStorage.getItem('auth'))?.user;
  // const cart = JSON.parse(localStorage.getItem('cart'));
  const cart = useSelector(state => state.cartStore);

  
  
  const items = useMemo(() => {
    return [
      {
        icon1: <DangerIco/>,
        text: `قیمت کالاها (${cart.itemsCount})`,
        price: FrontHelp.formatMoney(cart.total),
        icon2: <TomanIco/>
      },
      {
        icon1: <CarIco/>,
        text: 'هزینه ارسال',
        price: FrontHelp.formatMoney(shippingCost)
          ,
        icon2: <TomanIco/>
      },
      {
        icon1: <DangerIco/>,
        text: 'قیمت نهایی خرید',
        price: 
          FrontHelp.formatMoney(cart.total + shippingCost ),
        icon2: <TomanIco/>,
        active: true
      },
    ]
  }, [cart, shippingCost]); 

  return (
    <div
      className={`${styles.side__check}`}
    >
      {/* incfo card */}
      <InfoCard/>      

      {/* price and bank btn card */}
      <div
        className={`${styles.bank__card}`}
      >
        <div
          className={`${styles.wrap}`}
        >
          {
            items.length 
            ? (
              items.map((vl, i) => (
                <div className={`${styles.info__item}`} key={i}>
                  <p
                    className={`${styles.text}`}
                  >
                    {vl.icon1}
                    <span>
                      {vl.text}
                    </span>
                  </p>
                  <p
                    className={`${styles.price} ${vl.active ? styles.active : ''}`}
                  >
                    <span>
                      {vl.price}
                    </span>
                    {vl.icon2}
                  </p>
                </div>
              ))
            ) : ''
          }
        </div> {/* wrap */}

        <BankBtn 
        setDateOpen={setDateOpen} 
        datePicked={datePicked} 
        date={date}
        shippingCost={shippingCost}
        />
      </div> {/* bank__card */}
    </div>
  )
}

export default SideCheck