import React, { useMemo } from 'react'
import { useState, useEffect } from 'react';

import OrderTab from '../OrderTab/OrderTab';
//css 
import styles from './Brief.module.scss';

// icons
import OngoingIco from '../../../../SVG/profileSVG/OngoingIco';
import CancelIco from '../../../../SVG/profileSVG/CancelIco';
import DeliveredIco from '../../../../SVG/profileSVG/DeliveredIco';
import UnpaidIco from '../../../../SVG/profileSVG/UnpaidIco';
import HorizLine from '../../../../COMPONENTS/HorizLine/HorizLine';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useSelector } from 'react-redux';
import CONST from '../../../../CONSTANTS/CONST';


const Brief = ({
  cssName,
}) => {
  const counts = useSelector(state => state.cartStore.ordersCount);
  const { userId: authUser } = useParams();

  const tabs = useMemo(() => {
    return  [
      {
        id: 1, 
        icon: <OngoingIco/>,
        status: 'جاری',
        count: counts?.ongoingCount || 0,
        activeTab: false  
      }, 
      {
        id: 2, 
        icon: <DeliveredIco/>,
        status: 'تحویل شده',
        count: counts?.deliveredCount || 0,
        activeTab: false  
      },
      {
        id: 3, 
        icon: <UnpaidIco/>,
        status: 'پرداخت ناموفق',
        count: counts?.unpaidCount || 0,
        activeTab: false  
      },
      {
        id: 4, 
        icon: <CancelIco/>,
        status: 'مرجوع شده',
        count: counts?.canceledCount || 0,
        activeTab: false  
      },
    ] 
  }, []);

  return (
    <section
    className={`${styles.brief} ${cssName}`}
  >
    <section
      className={`${styles.orders}`}
    >
      <div
        className={`${styles.head}`}
      >
        <h5>
          خلاصه سفارشات
        </h5>
        <Button 
          className={`${styles.btn}`}
          component={Link}
          to={`/users/orders/${authUser}/${CONST.ONGOING}`}
          endIcon={<MdOutlineKeyboardArrowLeft/>}
        >
            مشاهده جزئیات
        </Button>
      </div>
      <HorizLine css={`${styles.line}`}/>
      <div
        className={`${styles.inwrap}`}
      >
        {
          tabs.map((tab, i) => (
          <OrderTab 
            id={tab.id}
            key={i}
            icon={tab.icon}
            status={tab.status}
            count={tab.count}
            activeTab={tab.activeTab}
          />))
        }  

      </div>
    </section> {/* orders */}
  </section> /* brief */
  )
}

export default Brief