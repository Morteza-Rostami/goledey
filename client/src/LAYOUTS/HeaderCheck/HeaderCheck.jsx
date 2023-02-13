import React from 'react'

// css
import styles from './HeaderCheck.module.scss';
import { Link, useParams } from 'react-router-dom';

import CartIco from '../../SVG/CartIco';
import CarDelIco from '../../SVG/checkoutSVG/CarDelIco';
import WalletIco from '../../SVG/checkoutSVG/WalletIco';
import LogoCheckIco from '../../SVG/checkoutSVG/LogoCheckIco';


const HeaderCheck = () => {
  const { userId } = useParams();
  
  //console.log(useParams())

  return (
    <div
      className={`${styles.header__check}`}
    >
      <div
        className={`${styles.inner}`}
      >
        <div
        className={`${styles.top}`}
        >
          <Link
            to={'/'}
          >
            <LogoCheckIco/>
          </Link>
        </div>
        <div
        className={`${styles.bott}`}
        >
          <div
          className={`${styles.wrap}`}
          >
            <Link
              className={`${styles.cart}`}
              to={`/cart/${ userId ? userId : 'guest' }`}
            >
              <CartIco/>
              <p>
                سبد خرید
              </p>
            </Link>
            <div
              className={`${styles.line__box}`}
            >
              <span className={`${styles.line}`}></span>
            </div>
            <Link
              className={`${styles.checkout}`}
              ///to={`/cart/${2}`}
            >
              <CarDelIco/>
              <p>
                زمان و آدرس ارسال
              </p>
            </Link>
            <div
              className={`${styles.line__box}`}
            >
              <span className={`${styles.line}`}></span>
            </div>
            <div
              className={`${styles.wallet}`}
            >
              <WalletIco/>
              <p> 
                پرداخت
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderCheck