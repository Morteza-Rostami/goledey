import React from 'react'
import { styled } from '@mui/material/styles';
// css
import styles from './Welcome.module.scss';
import { Button } from '@mui/material';
import COLOR from '../../../COLORS/COLORS';

// const slogan = 'زیبا ترین گلها رو فقط تو (گل دی) می تونی پیدا کنی! همین الان سفارش بده و با خیال راحت در خونه تحویل بگیر...'

const Welcome = ({  }) => {
  return (
    <div
      className={`${styles.welcome} center-contain`}
    >
      <div className={`${styles.inner} contain`}>
        <h1 className={`${styles.heading}`}>
          به آنلاین شاپ <span className={`${styles.colo__green}`}>گل دی</span> خوش آمدید!
        </h1>
        <div className={`${styles.slogan}`}>
          <span className={`${styles.top}`}>
            زیبا ترین گلها رو فقط تو <span className={`${styles.colo__green}`}>(اینجا)</span> میتونی پیدا کنی!!
          </span>
          <p>
            همین الان سفارش بده و با خیال راحت در خونه تحویل بگیر...
          </p>
        </div>

        <Button
          className={`${styles.btn}`}
          variant='contained'
          size='large'
        >
          ثبت نام/ورود به اکانت
        </Button>
      </div> {/* inner */}
    </div>
  )
}

/* stypling button */
// const Btn = styled(Button)(({ theme }) => ({
//   color: COLOR.offWhite,
//   backgroundColor: COLOR.secondary_300,
//   // '&:hover': {
//   //   backgroundColor: ,
//   // },
// }));

export default Welcome