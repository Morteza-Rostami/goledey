import React, { useMemo } from 'react'

// css
import styles from './OrderCard.module.scss';
import CONST from '../../../../CONSTANTS/CONST';
import OngoingIco from '../../../../SVG/profileSVG/OngoingIco';
import DeliveredIco from '../../../../SVG/profileSVG/DeliveredIco';
import UnpaidIco from '../../../../SVG/profileSVG/UnpaidIco';
import CancelIco from '../../../../SVG/profileSVG/CancelIco';

import TomanIco from '../../../../SVG/TomanIco';
import OrderImgs from './OrderImgs/OrderImgs';

import FrontHelp from '../../../../HELPERS/frontHelp'
import { Button } from '@mui/material';

const OrderCard = ({
  order,
}) => {

  // persian status
  const card = useMemo(() => {
    let status = '';
    let icon = {};

    if (order.status === CONST.ONGOING) {
      status = 'جاری';
      icon = <OngoingIco/>
    }
    else if (order.status === CONST.UNPAID) {
      status = 'پرداخت ناموفق';
      icon = <UnpaidIco/>;
    }
    else if (order.status === CONST.DELIVERED){
      status = 'تحویل شده';
      icon = <DeliveredIco/>;
    } 
    else if (order.status === CONST.CANCELED) {
      status = 'مرجوع شده';
      icon = <CancelIco/>;
    }

    // all pictures
    let pictures = [];
    pictures.push(...order.products.map((item, i) => item.product.pictures[0]))

    return {status, icon, pictures};
  }, []);

  return (
    <div
      className={`${styles.card}`}
    >
      <div
        className={`${styles.head}`}
      >
        <div
          className={`${styles.info}`}
        >
          {card.icon}
          <span className={`${styles.title}`}>
            وضعیت سفارش: 
          </span>
          <span className={`${styles.stat}`}>
            {card.status}
          </span>
        </div>
        
        {
          order.status === CONST.UNPAID
          ? (
            <Button
              className={`${styles.pay__btn}`}
              size='small'
              variant='outlined'
            >
              
              پرداخت (بانک)
            </Button>
          ) : <></>
        }
      </div>

      <p
        className={`${styles.code}`}
      >
        <span
          className={`${styles.text}`}
        >
          کد سفارش: 
        </span>
        <span
          className={`${styles.number}`}
        >
          {order.number}
        </span>
      </p>

      <div
        className={`${styles.date__price}`}
      >
        <p
          className={`${styles.date}`}
        >
          {order.date}
        </p>
        <p
          className={`${styles.price}`}
        >
          <span>
            {
              FrontHelp.formatMoney(order.total)
            } 
          </span>
          <TomanIco/>
        </p>
      </div>

      <div
        className={`${styles.pics}`}
      >
        <OrderImgs
          pictures={card.pictures}
        />
      </div>

      <p
        className={`${styles.admin__msg}`}
      >
        <span className={`${styles.title}`}>
          پیام ادمین:
        </span>
        <span className={`${styles.msg}`}>
          { order?.adminMsg }
        </span>
      </p>

    </div>
  )
}

export default OrderCard