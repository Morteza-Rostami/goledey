import React, { useEffect } from 'react'

// css
import styles from './OrderDate.module.scss';

import CalendIco from '../../../SVG/checkoutSVG/CalendIco';

// parsian date
import persianDate from 'persian-date';
import MyDatePicker from '../../../COMPONENTS/DatePicker/DatePicker';

persianDate.toLocale('fa');

const OrderDate = (props) => {
  //const day = 60 * 60 * 24 * 1000;

  // props
  const {
    date,
    setDate,
    dateOpen,
    setDateOpen,
    setDatePicked,
  } = props;
  
  // persion date convert
  //const oneDay = new Date(date.getTime() + day)
  const persian = new persianDate(date);
  const currentDate = 
  `${persian.format('dddd')} ${persian.date()} ${persian.format('MMMM')} ${persian.year()}`;
  
  // useEffect(() => {
  // }, []);

  return (
    <div
      className={`${styles.order__date}`}
    >
      <div
        className={`${styles.wrap}`}
      >
        <p
          className={`${styles.uptext}`}
        >
          تاریخ تحویل سفارش
        </p>
        <p
          className={`${styles.date}`}
        >
          <CalendIco/>
          <span>

            {currentDate}
          </span>
        </p>
        <p
          className={`${styles.hour}`}
        >
          ساعت 9 الی 18
        </p>
      </div> {/* wrap */}      

      <div 
        className={`${styles.action}`}
      >
        <MyDatePicker 
        //getDateVal={getDateVal}
        date={date}
        setDate={setDate}
        dateOpen={dateOpen}
        setDateOpen={setDateOpen}
        setDatePicked={setDatePicked}
        />
      </div> {/* action */}

    </div>
  )
}

export default OrderDate