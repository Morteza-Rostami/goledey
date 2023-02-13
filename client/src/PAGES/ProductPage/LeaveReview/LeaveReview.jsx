import React from 'react'
import ReviewCrud from './ReviewCrud/ReviewCrud'

import styles from './LeaveReview.module.scss';
import HorizLine from '../../../COMPONENTS/HorizLine/HorizLine';

const LeaveReview = ({
  product,
}) => {
  return (
    <div
      className={`${styles.leaver} leave-rate center-contain`}
    >
      <div
        className={`${styles.inner} contain`}
      >
        <h5
          className={`${styles.head}`}
        >
          به این کالا امتیاز دهید
        </h5>
        <p
          className={`${styles.subtext}`}
        >
          نظر خود را به بقیه منتقل کنید
        </p>
        <ReviewCrud
          classn={`${styles.starbtn}`}
          product={product}
        />

        <HorizLine/>
      </div> {/* inner */}
    </div>
  )
}

export default LeaveReview