import React from 'react'

import Inner from '../../../COMPONENTS/Inner/Inner';

// css 
import styles from './NotFound.module.scss';
import { MdOutlineError } from 'react-icons/md';

const NotFound = () => {
  return (
    <div
      className={`${styles.not__found}`}
    >
      <Inner
        css={styles.inner}
      >
        <div
          className={`${styles.msg}`}
        >
          <p
            className={`${styles.uptxt}`}
          >
            <span className={`${styles.ico}`}>
              <MdOutlineError/>
            </span>
            <span className={`${styles.txt}`}>
              نتیجه ای برای جستجوی شما یافت نشد!
            </span>
          </p>
          <p
            className={`${styles.subtxt}`}
          >
            از عبارت های متداول تر استفاده کنید و یا املای عبارت وارد شده را بررسی کنید.
          </p>
        </div>
        <div
          className={`${styles.pic}`}
          style={{
            background: 'url("/images/errors/results_not_found.svg")' 
          }}
        >
        </div>
      </Inner>
    </div>
  )
}

export default NotFound