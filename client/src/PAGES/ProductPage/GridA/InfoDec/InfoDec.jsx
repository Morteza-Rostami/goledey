import React from "react";
import { useState, useEffect, useRef } from 'react';
// css
import styles from './InfoDec.module.scss';
import { Button } from "@mui/material";

// redux
import { useDispatch, useSelector } from 'react-redux';


// material ui
import Skeleton from "@mui/material/Skeleton";
import FrontHelp from "../../../../HELPERS/frontHelp";
import TomanIco from "../../../../SVG/TomanIco";
import { BsExclamationCircle } from "react-icons/bs";
import { CheckIco } from "../../../../SVG/CheckIco";
import { CarIco } from "../../../../SVG/CarIco";
import AddToCart from "../../../../COMPONENTS/AddToCart/AddToCart";

const InfoDec = ({ 
  itemSlug,
  product,
  cssName 
}) => { 

  return (
    <div
      className={`${cssName.infodec} ${styles.info_dec}`}
    >
      <div
        className={`${styles.card}`}
      >

      <div
        className={`${styles.in_stock}`}
      >
        <CheckIco/>
        <span>
          موجود در شاپ
        </span>
      </div>

      <div
        className={`${styles.car}`}
      > 
        <CarIco/>
        <span>
          ارسال به کرج و تهران
        </span>

      </div>

      <div
        className={`${styles.sec_1}`}
      >
        <div
          className={`${styles.subtext}`}
        >
          <BsExclamationCircle className={`${styles.ico}`}/>
          <p>
            قیمت نهایی کالا
          </p>
        </div>
        <p 
          className={`${styles.price}`}
        >
          <span>
            { product?.price && FrontHelp.formatMoney(product.price) }
          </span>
          <TomanIco />
        </p>

        
      </div> {/* sec_1 */}
      
      <div
        className={`${styles.sec_2}`}
      >
        <AddToCart itemSlug={itemSlug} product={product}/>
      </div> {/* sec_2 */}

      </div>{/* card */}
    
    </div> // footer
  )
}

export default InfoDec;
