import React from 'react'

import styles from './EmptCart.module.scss';
import Inner from '../../../COMPONENTS/Inner/Inner'
import { MdOutlineError } from 'react-icons/md';
import { Link } from 'react-router-dom';

const EmptCart = () => {
  return (
    <div className={`${styles.empt__cart}`}>
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
              سبد خرید شما خالی است!
            </span>
          </p>
          <p
            className={`${styles.subtxt}`}
          >
            به پیج <Link to={'/shop?page=1'} style={{ fontSize: '14px' }}>(کالاها)</Link> بروید و تازه ترین گلها رو ببینید.
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

export default EmptCart