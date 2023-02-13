import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
// css
import styles from './ProductCard.module.scss';

// swiper js
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from "swiper/react";
// siwper css
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from "swiper";

// material ui and icons
import { IconButton } from "@mui/material";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useRef } from "react";
import { MdStarRate } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';

import { useSelector } from "react-redux";
import FrontHelp from "../../../../HELPERS/frontHelp";

import TomanIco from '../../../../SVG/TomanIco';

// skeleton loading
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductCard = ({ product }) => {
  // reference to swiper:
  const swiperRef = useRef();
  const isLoading = useSelector(state => state.productsStore.isLoading);
  const [isImgLoaded, setImgLoaded] = useState(false);

  
  return (
    
    <div 
      className={`${styles.card}`}>
      {/* swiper image */}
      <div
        className={`${styles.wrap}`}
      >
        <Link
          className={styles.img__box}
          to={`/product/${product.slug}`}
        >
          <img 
          className={styles.skelet}
          src={product.pictures[0]} 
          alt="" />
        </Link>
        
      </div> {/* wrap */}
      
      {/* card infos */}

      <div
        className={`${styles.info}`}
      >

        <Link 
          className={`${styles.name}`}
          to={`/product/${product.slug}`}
        >
          { product.name ? FrontHelp.truncate(product.name, 20) : <Skeleton baseColor="red"/> }
        </Link>

        <div
          className={`${styles.star_price}`}
        >

          <p 
            className={`${styles.star}`}
          >
            <span>{product.aveRate}</span> 
            {<MdStarRate className={`${styles.ico}`}/> }
          </p>
          <p
            className={`${styles.price}`}
          >
            { FrontHelp.formatMoney(product.price) }
            <TomanIco/> 
          </p>
        </div>

      </div>{/* info */}

    </div>
  )
}

export default ProductCard;