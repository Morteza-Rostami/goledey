import React from 'react';
import { useState, useEffect, useRef } from 'react';

// css
import styles from './PicMob.module.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";

const PicMob = ({
  product,
  cssName
}) => {

  

  return (
    <div 
      className={`${styles.pic_mob} ${cssName.picmob}`}
    >
      <div
        className={`${styles.inner}`}
      >
       
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {
            product
            ? (
              product?.pictures?.map((pic, i) => (
                <SwiperSlide key={i}>
                  <img src={pic} alt="" />
                </SwiperSlide>
              ))
            ) : ''
          }
         
        </Swiper>




          
        

      </div>
    </div>
  )
}

export default PicMob