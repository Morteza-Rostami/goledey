import React, { useState, useEffect } from "react";
// material ui
//import Skeleton from "@mui/material/Skeleton";
import useWindowDimensions from "../../../../HOOKS/useWindowDimensions";
import CONST from "../../../../CONSTANTS/CONST";

// skeleton loading
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// css
import styles from './CardSkeleton.module.scss';
import { Link } from "react-router-dom";
import { MdStarRate } from "react-icons/md";
import TomanIco from "../../../../SVG/TomanIco";

const CardSkeleton = () => {
  const [h, setH] = useState(50);
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    if (width > CONST.MOBILE) {
      setH(200);
    }
  }, [width]);

  /* useEffect(() => {
    const el = document.querySelector('#name');
    const dims = window.getComputedStyle(el);
    console.log(dims);
  }, []); */


  return (
    
    <div 
      className={`${styles.card}`}>
      
      <div
        className={`${styles.wrap}`}
      >
        <div
          className={styles.img__box}
          //to={`/product/${product.slug}`}
        >
          <Skeleton 
          className={styles.skelet}
          direction="rtl"
          />
        </div>
        
      </div> 
      

      <div
        className={`${styles.info}`}
      >

        <p 
          id="name"
          className={`${styles.name}`}
          //to={`/product/${product.slug}`}
        >
          <Skeleton 
          height={20}
          direction="rtl"/>
        </p>

        <div
          className={`${styles.star_price}`}
        >
          <p 
            className={`${styles.star}`}
          >
            <span>
              <Skeleton 
              height={20}
              direction="rtl"/>
            </span> 
            {/* <p className={`${styles.ico}`}>
              <Skeleton />
            </p> */}
          </p>
          <p
            className={`${styles.price}`}
          >
            <Skeleton 
              direction="rtl"
              height={20}
            />
             
          </p>
        </div>

      </div>

    </div>

  )

  /* return (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <Skeleton 
        variant="rectangular" 
        // width={210} 
        height={h} 
        sx={{
          borderRadius: 2
        }}
      />
      <Skeleton 
        variant="rectangular"
        width={200} 
        
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Skeleton 
          variant="rectangular" 
          width={100}
          // sx={{
          //   alignSelf: 'flex-end'
          // }}
        />
        <Skeleton 
          variant="rectangular" 
          width={50}
          // sx={{
          //   alignSelf: 'flex-end'
          // }}
        />
      </div>
    </div>
  ) */
}

export default CardSkeleton;