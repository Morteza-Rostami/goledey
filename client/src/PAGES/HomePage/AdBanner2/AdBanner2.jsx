import React from 'react'

// css
import styles from './AdBanner2.module.scss';

import Inner from '../../../COMPONENTS/Inner/Inner'
import { Link } from 'react-router-dom';

const AdBanner2 = () => {
  return (
    <div
      className={`${styles.ad__banner2} center-contain`}
    >
      <Inner
        css={`${styles.inner} contain`}
      >
        <Link 
          className={`${styles.banner1}`}
          style={{
            background: 'url("/images/banners/Banner-Medium21.png")' 
          }}
          to={`/shop?mCat=${'tarhim'}&page=1`}
        >

        </Link>
        <Link
          className={`${styles.banner2}`}
          style={{
            background: 'url("/images/banners/Banner-Medium11.png")' 
          }}
          to={`/shop?mCat=${'jame-gole'}&page=1`}

        >

        </Link>
      </Inner>
    </div>
  )
}

export default AdBanner2