import React from 'react'

import styles from './PayFailed.module.scss';
import Inner from '../../../COMPONENTS/Inner/Inner';
import { Link } from 'react-router-dom';
import LogoCheckIco from '../../../SVG/checkoutSVG/LogoCheckIco';

import SuccessIco from '../../../SVG/checkoutSVG/SuccessIco'
import FailedIco from '../../../SVG/checkoutSVG/FailedIco'

import {MdOutlineKeyboardArrowLeft} from 'react-icons/md'
import CONST from '../../../CONSTANTS/CONST';


const PayFailed = () => {

  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;

  return (
    <div
      className={`${styles.pay_success} center-contain`}
    >
      <Inner
        css={`${styles.inner} contain-2`}
      > 
        <div
          className={`${styles.header}`}
        >
          <Link
            to={'/'}
          >
            <LogoCheckIco/> 
          </Link>
          
        </div>

        <div
          className={`${styles.heading}`}
        >
          <h1>
            سفارش شما ثبت نشد!!!
          </h1>
          
        </div>

        <div
          className={`${styles.msg}`}
        >
          <h3 className={`${styles.toptxt}`}>
            <FailedIco/>
            <span>
            لطفا مجدد تلاش کنید.
            </span>
          </h3>
          <p
            className={`${styles.subtxt}`}
          >
            ۱. اتصال اینترنت خود را چک کنید.
          </p>
          <p
            className={`${styles.subtxt}`}
          >
            ۲. ممکن است خطایی در سرورِ بانک رخ داده باشد.
          </p>
        </div>

        {/* `‍/users/orders/${user?._id}/UNPAID` */}
        <div
          className={`${styles.link}`}

        >

          <Link
            to={`/users/orders/${user._id}/UNPAID`}
          >
            پرداختِ دوباره
            <MdOutlineKeyboardArrowLeft/>
          </Link>

        </div>

        <section
          className={`${styles.pic_wrap}`}
        >
          <div
            className={`${styles.pic}`}
            style={{
              background: 'url("/images/errors/failed_big.svg")' 
            }}
          >
          </div>
        </section>
        
      </Inner>
      
    </div>
  )
}

export default PayFailed