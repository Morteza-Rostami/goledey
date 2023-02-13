import React from 'react'

import styles from './EmptOrder.module.scss';
import Inner from '../../../../COMPONENTS/Inner/Inner';
import { MdOutlineError } from 'react-icons/md';
import { Link } from 'react-router-dom';

const EmptOrder = () => {
  return (
    <div className={`${styles.empt__order}`}>
      <Inner
        css={`${styles.inner}`}
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
              فعلا هیچ سفارشی ندارید!
            </span>
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

export default EmptOrder