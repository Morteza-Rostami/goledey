import React from "react";
import { useState, useEffect, useRef } from 'react';
// css
import styles from './FooterMobB.module.scss';


import FrontHelp from "../../../HELPERS/frontHelp";
import { BsExclamationCircle } from "react-icons/bs";
import TomanIco from "../../../SVG/TomanIco";
import AddToCart from "../../../COMPONENTS/AddToCart/AddToCart";


const FooterMobB = ({ itemSlug, product }) => { 
  
  

  return (
    <div
      className={`${styles.footer}`}
    >
      <div
        className={`${styles.inner}`}
      >







        <div
          className={`${styles.sec_2}`}
        >
          <AddToCart itemSlug={itemSlug} product={product}/>
        </div> {/* sec_2 */}








        <div
          className={`${styles.sec_1}`}
        >
          <p 
            className={`${styles.price}`}
          >
            <span>
              { product?.price && FrontHelp.formatMoney(product.price) }
            </span>
            <TomanIco />
          </p>

          <p
            className={`${styles.subtext}`}
          >
            <BsExclamationCircle className={`${styles.ico}`}/>
            <span>
              قیمت نهایی کالا
            </span>
          </p>
        </div> {/* sec_1 */}
      </div> {/* inner */}
     
    </div> // footer
  )
}

export default FooterMobB;
