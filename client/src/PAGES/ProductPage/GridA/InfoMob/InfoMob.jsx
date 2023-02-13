import React from 'react'

// css 
import styles from './InfoMob.module.scss';

import {CheckIco} from '../../../../SVG/CheckIco';
import {CarIco} from '../../../../SVG/CarIco';

const InfoMob = ({
  product,
  cssName
}) => {
  return (
    <div
      className={`${styles.info_mob} ${cssName.infomob}`}
    >
      <p
        className={`${styles.in_stock}`}
      >
        {
          product.inStock 
            ? <> <CheckIco /><span>موجود در شاپ</span></>
            : '' 
        }
      </p>
      <p
        className={`${styles.car}`}
      >
        <CarIco />
        <span>ارسال به کرج و تهران</span>
      </p>
    </div>
  )
}

export default InfoMob