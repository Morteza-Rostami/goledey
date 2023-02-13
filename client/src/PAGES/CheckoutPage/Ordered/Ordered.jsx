import React from 'react'

// css
import styles from './Ordered.module.scss';
import OrderedPics from './OrderedPics/OrderedPics';
import CarDelIco from '../../../SVG/checkoutSVG/CarDelIco';
import { useSelector } from 'react-redux';

const Ordered = () => {
  //const cart = JSON.parse(localStorage.getItem('cart'));
  const cart = useSelector(state => state.cartStore);

  return (
    <div
      className={`${styles.ordered}`}
    >
      <div
        className={`${styles.head}`}
      >
        <CarDelIco/>
        <span
          className={`${styles.text}`}
        >
          ارسال
        </span>
        <span
          className={`${styles.count}`}
        >
          { cart ? cart.itemsCount : 0 }
        </span>
      </div>
      <p
        className={`${styles.infos}`}
      >

      </p>

      <div
        className={`${styles.pictures}`}
      >
        <OrderedPics/>
      </div>

    </div>
  )
}

export default Ordered