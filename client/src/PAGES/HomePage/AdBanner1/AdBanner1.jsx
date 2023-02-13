import React from 'react'

//css
import styles from './AdBanner1.module.scss';

import useWindowDimensions from '../../../HOOKS/useWindowDimensions';
import CONST from '../../../CONSTANTS/CONST';
import { Link } from 'react-router-dom';

const AdBanner1 = () => {
  const valentine = 'valentine';
  const {width, height} = useWindowDimensions();

  return (
    <div
      className={`${styles.adbanner1} center-contain`}
    >
      <div
        className={`${styles.inner} contain`}
      >
      {/* <img 
      src="./images/ad_banner.png" 
      alt="" 
      style={{
        maxWidth: '100%',
        objectFit: 'cover',
      }}
      /> */}

      <Link
        to={`/shop?sCat=${valentine}&page=1`}
        style={{ width: '100%' }}
      >
        <div 
          className={`${styles.banner_mob}`}
          style={{
            background: 'url("/images/banners/Small-ad-banner-21.png")' 
          }}
        > 
        </div>
      </Link>


{/* 
      {
        width <= CONST.MOBILE && (
          <div 
            className={`${styles.banner_mob}`}
            style={{
              background: 'url("/images/banners/Small-ad-banner-21.png")' 
            }}
          > 
          </div>
        )
      }

      {
        width > CONST.MOBILE && (
          <div 
            className={`${styles.banner_dec}`}
            style={{
              background: 'url("/images/banners/home-ad-dec.svg")' 
            }}
          >
          </div>
        )
      } */}
      </div>
    </div>
  )
}

export default AdBanner1