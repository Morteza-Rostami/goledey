import React from 'react'

// css
import styles from './HeaderDash.module.scss';

import Inner from '../../COMPONENTS/Inner/Inner'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import CONST from '../../CONSTANTS/CONST';

const HeaderDash = () => {
  const user = JSON.parse(localStorage.getItem(CONST.AUTH));

  return (
    <div
      className={`${styles.header__dash}`}
    >
      <Inner css={styles.inner}>

      <h5 className={`${styles.title}`}>
        خلاصه سفارشات
      </h5>
      <Button 
        className={`${styles.link}`}
        component={Link}
        to={`/users/orders/${user && user._id}/${CONST.ONGOING}`}
        endIcon={<MdOutlineKeyboardArrowLeft/>}
        >
          مشاهده جزئیات
      </Button>
      </Inner>
    </div>
  )
}

export default HeaderDash