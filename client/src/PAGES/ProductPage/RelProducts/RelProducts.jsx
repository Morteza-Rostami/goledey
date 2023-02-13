import React from "react";
import { useState, useRef } from "react";
import ContainerA from "../../../COMPONENTS/containers/ContainerA";

// components 
import RelCard from './RelCard/RelCard';

//css
import styles from './RelProducts.module.scss';
// icons
import { IconButton } from "@mui/material";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

// swiper js
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from "swiper/react";
// siwper css
import 'swiper/css';
import "swiper/css/free-mode";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, FreeMode } from "swiper";
import CONST from "../../../CONSTANTS/CONST";
import Inner from "../../../COMPONENTS/Inner/Inner";


const ICON_SIZE = 15;

const RelProducts = ({ products }) => {
  const swiperRef = useRef();

  return (
    <div
      className={`${styles.relateds} related center-contain`}
    >
     
      <div 
        className={`${styles.inner} contain`}
      >
        <div
          className={`${styles.head}`}
        >
          <h2>
            کالاهای مشابه
          </h2>
        </div>

        <Inner
          css={styles.in}
        >
        <Swiper
        slidesPerView={2}
        spaceBetween={10}
        //loop={true}
        mousewheel={true}
        //cssMode={true}
        pagination={false}
        freeMode={true}
        modules={[Navigation, FreeMode]}
        className="swiper-container"
        //onSlideChange={() => console.log('slide change')}
        /* store swiper ref */
        onSwiper={(swiper) => swiperRef.current = swiper}

        /* responsive */
        breakpoints={{
          [400]: {
            slidesPerView: 3
          },
          [600]: {
            slidesPerView: 4
          },
          [CONST.MOBILE]: {
            slidesPerView: 5
          },
          [1000]: {
            slidesPerView: 6
          },
          [1200]: {
            slidesPerView: 8
          }
        }}
        >
          {
            products?.length 
              ?
              products.map((product, inx) => {
                return (
                <SwiperSlide 
                  key={inx} 
                  virtualIndex={inx}
                >
                  <RelCard related={product} />
                </SwiperSlide>
                )
              })
            : ''
          }

        </Swiper>
      </Inner>

      </div>

    </div>
  )
}

// default props
RelProducts.defaultProps = {
  product : {}
}

export default RelProducts;
