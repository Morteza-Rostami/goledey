import React from 'react'

// css
import styles from './FooterCheck.module.scss';
import BankBtn from '../../PAGES/CheckoutPage/BankBtn/BankBtn';

const FooterCheck = ({
  setDateOpen,
  datePicked,
}) => {
  return (
    <div 
      className={`${styles.footer__check}`}
    >
      <div
        className={`${styles.inner}`}
      >
        <BankBtn setDateOpen={setDateOpen} datePicked={datePicked}/>
      </div>
      
    </div>
  )
}

export default FooterCheck