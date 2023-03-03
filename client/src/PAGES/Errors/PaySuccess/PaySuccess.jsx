import React from 'react'

import styles from './PaySuccess.module.scss';
import Inner from '../../../COMPONENTS/Inner/Inner';
import { Link } from 'react-router-dom';
import LogoCheckIco from '../../../SVG/checkoutSVG/LogoCheckIco';

import SuccessIco from '../../../SVG/checkoutSVG/SuccessIco'
import FailedIco from '../../../SVG/checkoutSVG/FailedIco'

import {MdOutlineKeyboardArrowLeft} from 'react-icons/md'
import CONST from '../../../CONSTANTS/CONST';


const PaySuccess = () => {

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
            سفارش با موفقیت ثبت شد!
          </h1>
          
        </div>

        <div
          className={`${styles.msg}`}
        >
          <h3 className={`${styles.toptxt}`}>
            <SuccessIco/>
            <span>
            از انتخاب شما سپاسگذاریم.
            </span>
          </h3>
          <p
            className={`${styles.subtxt}`}
          >
            پیام تایید سفارش تا لحظاتی دیگر به شماره همراه {user?.cellPhone} ارسال خواهد شد.
          </p>
        </div>

        <div
          className={`${styles.link}`}
        >
          
          <Link
            to={'/'}
          >
            بازگشت به خانه
            <MdOutlineKeyboardArrowLeft/>
          </Link>

        </div>

        <section
          className={`${styles.pic_wrap}`}
        >
          <div
            className={`${styles.pic}`}
            style={{
              background: 'url("/images/errors/success_big.svg")' 
            }}
          >
          </div>
        </section>
        
      </Inner>
      
    </div>
  )
}

export default PaySuccess