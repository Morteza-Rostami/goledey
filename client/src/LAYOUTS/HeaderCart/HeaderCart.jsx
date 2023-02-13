import React from 'react'

//css
import styles from './HeaderCart.module.scss';
import { Badge, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { IoMdCart } from 'react-icons/io';
import { useSelector } from 'react-redux';

const HeaderCart = () => {
  const itemsCount = useSelector(state => state.cartStore.itemsCount);

  return (
    <div
      className={`${styles.header__cart} header-cart`}
    > 
      <div
        className={`${styles.inner}`}
      >
        <div
          className={`${styles.title}`}
        >
          <h4>
            سبد خرید شما 
          </h4>
          <span
            className={`${styles.badge}`}
          >
          <Badge
            color="secondary" 
            badgeContent={itemsCount}>
          </Badge>
          </span>
        </div>

        <div
          className={`${styles.close}`}
        >
          <IconButton 
        className={`${styles.btn}`}
        component={Link}
        to={`/shop?page=1`}
        >
          <MdClose/>
        </IconButton>
        </div>
      </div>

    </div>
  )
}

export default HeaderCart