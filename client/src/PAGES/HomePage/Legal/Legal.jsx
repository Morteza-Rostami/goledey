import React, { useEffect, useRef, useState } from 'react'

import styles from './Legal.module.scss';
import Inner from '../../../COMPONENTS/Inner/Inner';

import axios from 'axios'
import Safe from 'react-safe'

import postscribe from 'postscribe'

const Legal = () => {
  const [zpal, setZpal] = useState(null);

  const once = useRef(true);

  useEffect(() => {

    if (once.current) {
      postscribe('#zarinpal', '<script src="https://www.zarinpal.com/webservice/TrustCode" type="text/javascript"></script>')

      once.current = false;
    }


  }, []);


  return (
    <div
      className={`${styles.legal}`}
    >
      <Inner
        css={`${styles.inner}`}
      >
        <div
          className={`${styles.zpal_wrap}`}
        >
          <div
            id='zarinpal'
            className={`${styles.zarinpal} zarinpal`}
          >
          </div>

        </div>

        <div
          className={`${styles.copy_wrap}`}
        >
          <p
            className={`${styles.copy}`}
          >
            برای استفاده از مطالب گل دی، داشتن «هدف غیرتجاری» و ذکر «منبع» کافیست.
          </p>

        </div>

      </Inner>

    </div>
  )
}

export default Legal